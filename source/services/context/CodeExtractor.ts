import {FileInfo, CodeSection, ExtractionCriteria} from '../../core/types.js';
import {ResonanceError} from '../../core/errors.js';
import * as ts from 'typescript';
import {readFileSync} from 'fs';

export interface ExtractionOptions {
	includeComments?: boolean;
	includeImports?: boolean;
	includeTypes?: boolean;
	maxLinesPerSection?: number;
	contextLines?: number;
}

export class CodeExtractor {
	private readonly defaultOptions: Required<ExtractionOptions> = {
		includeComments: true,
		includeImports: true,
		includeTypes: true,
		maxLinesPerSection: 50,
		contextLines: 3,
	};

	/**
	 * Extract meaningful code sections from a file
	 */
	extractSections(
		file: FileInfo,
		criteria: ExtractionCriteria,
		options: ExtractionOptions = {},
	): CodeSection[] {
		try {
			const opts = {...this.defaultOptions, ...options};
			const content = this.getFileContent(file);

			if (!content) {
				return [];
			}

			const sourceFile = ts.createSourceFile(
				file.path,
				content,
				ts.ScriptTarget.Latest,
				true,
			);

			const sections: CodeSection[] = [];

			// Extract different types of sections based on criteria
			if (criteria.functions) {
				sections.push(
					...this.extractFunctions(
						sourceFile,
						content,
						criteria.functions,
						opts,
					),
				);
			}

			if (criteria.classes) {
				sections.push(
					...this.extractClasses(sourceFile, content, criteria.classes, opts),
				);
			}

			if (criteria.interfaces) {
				sections.push(
					...this.extractInterfaces(
						sourceFile,
						content,
						criteria.interfaces,
						opts,
					),
				);
			}

			if (criteria.exports) {
				sections.push(
					...this.extractExports(sourceFile, content, criteria.exports, opts),
				);
			}

			if (criteria.keywords) {
				sections.push(
					...this.extractByKeywords(
						sourceFile,
						content,
						criteria.keywords,
						opts,
					),
				);
			}

			if (criteria.lineRanges) {
				sections.push(
					...this.extractByLineRanges(content, criteria.lineRanges, opts),
				);
			}

			// Remove duplicates and sort by relevance
			return this.deduplicateAndSort(sections);
		} catch (error) {
			throw new ResonanceError(
				`Failed to extract code sections from ${file.path}`,
				'CODE_EXTRACTION_FAILED',
				{file: file.path, criteria},
				error,
			);
		}
	}

	/**
	 * Extract specific functions by name or pattern
	 */
	extractFunctions(
		sourceFile: ts.SourceFile,
		content: string,
		functionNames: string[],
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');

		const visit = (node: ts.Node) => {
			if (
				ts.isFunctionDeclaration(node) ||
				ts.isMethodDeclaration(node) ||
				ts.isArrowFunction(node)
			) {
				const name = this.getFunctionName(node);
				if (name && this.matchesPattern(name, functionNames)) {
					const section = this.createCodeSection(
						node,
						lines,
						'function',
						name,
						options,
					);
					if (section) {
						sections.push(section);
					}
				}
			}
			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}

	/**
	 * Extract specific classes by name or pattern
	 */
	extractClasses(
		sourceFile: ts.SourceFile,
		content: string,
		classNames: string[],
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');

		const visit = (node: ts.Node) => {
			if (ts.isClassDeclaration(node)) {
				const name = node.name?.text;
				if (name && this.matchesPattern(name, classNames)) {
					const section = this.createCodeSection(
						node,
						lines,
						'class',
						name,
						options,
					);
					if (section) {
						sections.push(section);
					}
				}
			}
			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}

	/**
	 * Extract specific interfaces by name or pattern
	 */
	extractInterfaces(
		sourceFile: ts.SourceFile,
		content: string,
		interfaceNames: string[],
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');

		const visit = (node: ts.Node) => {
			if (ts.isInterfaceDeclaration(node)) {
				const name = node.name.text;
				if (this.matchesPattern(name, interfaceNames)) {
					const section = this.createCodeSection(
						node,
						lines,
						'interface',
						name,
						options,
					);
					if (section) {
						sections.push(section);
					}
				}
			}
			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}

	/**
	 * Extract export statements
	 */
	extractExports(
		sourceFile: ts.SourceFile,
		content: string,
		exportNames: string[],
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');

		const visit = (node: ts.Node) => {
			if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
				const text = node.getFullText(sourceFile).trim();
				if (exportNames.some(name => text.includes(name))) {
					const section = this.createCodeSection(
						node,
						lines,
						'export',
						'export',
						options,
					);
					if (section) {
						sections.push(section);
					}
				}
			}
			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}

	/**
	 * Extract sections containing specific keywords
	 */
	extractByKeywords(
		sourceFile: ts.SourceFile,
		content: string,
		keywords: string[],
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');
		const lowerKeywords = keywords.map(k => k.toLowerCase());

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const lowerLine = line.toLowerCase();

			if (lowerKeywords.some(keyword => lowerLine.includes(keyword))) {
				const startLine = Math.max(0, i - options.contextLines);
				const endLine = Math.min(lines.length - 1, i + options.contextLines);

				const sectionLines = lines.slice(startLine, endLine + 1);
				const code = sectionLines.join('\n');

				if (code.trim() && sectionLines.length <= options.maxLinesPerSection) {
					sections.push({
						type: 'keyword-match',
						name: `Lines ${startLine + 1}-${endLine + 1}`,
						content: code,
						startLine: startLine + 1,
						endLine: endLine + 1,
						relevance: this.calculateKeywordRelevance(line, keywords),
						description: `Code section containing: ${keywords.join(', ')}`,
					});
				}
			}
		}

		return sections;
	}

	/**
	 * Extract specific line ranges
	 */
	extractByLineRanges(
		content: string,
		ranges: Array<{start: number; end: number}>,
		options: Required<ExtractionOptions>,
	): CodeSection[] {
		const sections: CodeSection[] = [];
		const lines = content.split('\n');

		for (const range of ranges) {
			const startLine = Math.max(0, range.start - 1); // Convert to 0-based
			const endLine = Math.min(lines.length - 1, range.end - 1);

			if (startLine <= endLine) {
				const sectionLines = lines.slice(startLine, endLine + 1);
				const code = sectionLines.join('\n');

				if (code.trim()) {
					sections.push({
						type: 'line-range',
						name: `Lines ${range.start}-${range.end}`,
						content: code,
						startLine: range.start,
						endLine: range.end,
						relevance: 1.0,
						description: `Specific line range: ${range.start}-${range.end}`,
					});
				}
			}
		}

		return sections;
	}

	private getFileContent(file: FileInfo): string | null {
		try {
			if (file.content) {
				return file.content;
			}

			// Fallback to reading from disk
			return readFileSync(file.path, 'utf-8');
		} catch {
			return null;
		}
	}

	private getFunctionName(node: ts.Node): string | null {
		if (ts.isFunctionDeclaration(node) && node.name) {
			return node.name.text;
		}

		if (
			ts.isMethodDeclaration(node) &&
			node.name &&
			ts.isIdentifier(node.name)
		) {
			return node.name.text;
		}

		if (
			ts.isVariableDeclaration(node) &&
			ts.isIdentifier(node.name) &&
			node.initializer &&
			ts.isArrowFunction(node.initializer)
		) {
			return node.name.text;
		}

		return null;
	}

	private matchesPattern(text: string, patterns: string[]): boolean {
		const lowerText = text.toLowerCase();
		return patterns.some(pattern => {
			const lowerPattern = pattern.toLowerCase();

			// Exact match
			if (lowerText === lowerPattern) return true;

			// Contains match
			if (lowerText.includes(lowerPattern)) return true;

			// Simple wildcard support
			if (pattern.includes('*')) {
				const regexPattern = pattern.replace(/\*/g, '.*');
				const regex = new RegExp(`^${regexPattern}$`, 'i');
				return regex.test(text);
			}

			return false;
		});
	}

	private createCodeSection(
		node: ts.Node,
		lines: string[],
		type: string,
		name: string,
		options: Required<ExtractionOptions>,
	): CodeSection | null {
		const sourceFile = node.getSourceFile();
		const start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
		const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

		const startLine = Math.max(
			0,
			start.line - (options.includeComments ? options.contextLines : 0),
		);
		const endLine = Math.min(lines.length - 1, end.line + options.contextLines);

		// Check if section is too long
		if (endLine - startLine + 1 > options.maxLinesPerSection) {
			// Try to extract just the core without context
			const coreStartLine = start.line;
			const coreEndLine = end.line;

			if (coreEndLine - coreStartLine + 1 <= options.maxLinesPerSection) {
				const sectionLines = lines.slice(coreStartLine, coreEndLine + 1);
				const code = sectionLines.join('\n');

				return {
					type,
					name,
					content: code,
					startLine: coreStartLine + 1,
					endLine: coreEndLine + 1,
					relevance: 1.0,
					description: `${type}: ${name} (core only - full section too large)`,
				};
			}

			// If even the core is too large, skip it
			return null;
		}

		const sectionLines = lines.slice(startLine, endLine + 1);
		const code = sectionLines.join('\n');

		if (!code.trim()) {
			return null;
		}

		return {
			type,
			name,
			content: code,
			startLine: startLine + 1,
			endLine: endLine + 1,
			relevance: 1.0,
			description: `${type}: ${name}`,
		};
	}

	private calculateKeywordRelevance(line: string, keywords: string[]): number {
		const lowerLine = line.toLowerCase();
		let matches = 0;

		for (const keyword of keywords) {
			const lowerKeyword = keyword.toLowerCase();
			const occurrences = (lowerLine.match(new RegExp(lowerKeyword, 'g')) || [])
				.length;
			matches += occurrences;
		}

		// Simple relevance calculation
		return Math.min(1.0, matches / keywords.length);
	}

	private deduplicateAndSort(sections: CodeSection[]): CodeSection[] {
		// Remove sections with identical content
		const uniqueSections = new Map<string, CodeSection>();

		for (const section of sections) {
			const key = `${section.type}:${section.startLine}:${section.endLine}`;
			const existing = uniqueSections.get(key);

			if (!existing || section.relevance > existing.relevance) {
				uniqueSections.set(key, section);
			}
		}

		// Sort by relevance, then by line number
		return Array.from(uniqueSections.values()).sort((a, b) => {
			if (Math.abs(a.relevance - b.relevance) > 0.01) {
				return b.relevance - a.relevance;
			}
			return a.startLine - b.startLine;
		});
	}

	/**
	 * Extract imports and dependencies
	 */
	extractImports(sourceFile: ts.SourceFile): CodeSection[] {
		const sections: CodeSection[] = [];
		const content = sourceFile.getFullText();
		const lines = content.split('\n');

		const visit = (node: ts.Node) => {
			if (ts.isImportDeclaration(node)) {
				const start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
				const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

				const importText = node.getFullText(sourceFile).trim();

				sections.push({
					type: 'import',
					name: 'import',
					content: importText,
					startLine: start.line + 1,
					endLine: end.line + 1,
					relevance: 0.8,
					description: 'Import statement',
				});
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}

	/**
	 * Extract all exports from a file
	 */
	extractAllExports(sourceFile: ts.SourceFile): CodeSection[] {
		const sections: CodeSection[] = [];
		const content = sourceFile.getFullText();

		const visit = (node: ts.Node) => {
			if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
				const start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
				const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

				const exportText = node.getFullText(sourceFile).trim();

				sections.push({
					type: 'export',
					name: 'export',
					content: exportText,
					startLine: start.line + 1,
					endLine: end.line + 1,
					relevance: 0.9,
					description: 'Export statement',
				});
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return sections;
	}
}

export default CodeExtractor;
