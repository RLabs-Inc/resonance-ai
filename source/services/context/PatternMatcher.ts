/**
 * Pattern recognition engine for ResonanceAI MVP
 *
 * Identifies naming conventions, structural patterns, and code patterns
 * throughout the codebase to provide intelligent context compilation.
 */

import {TextUtils} from '../../utils/text-utils.js';
import {PatternError} from '../../core/errors.js';
import type {
	FileInfo,
	Pattern,
	PatternMatch,
	CodeExample,
	PatternIndicator,
} from '../../core/types.js';

export interface PatternDetectionOptions {
	confidenceThreshold: number;
	maxPatterns: number;
	categories: string[];
	includeExamples: boolean;
}

export interface NamingConvention {
	type:
		| 'camelCase'
		| 'PascalCase'
		| 'snake_case'
		| 'kebab-case'
		| 'CONSTANT_CASE';
	confidence: number;
	examples: string[];
	usage: 'functions' | 'classes' | 'variables' | 'files' | 'constants';
}

export interface StructuralPattern {
	name: string;
	description: string;
	files: string[];
	indicators: string[];
	confidence: number;
}

export interface CodePattern {
	name: string;
	description: string;
	pattern: RegExp;
	examples: Array<{
		file: string;
		code: string;
		lines: [number, number];
	}>;
	confidence: number;
}

/**
 * Advanced pattern recognition for code analysis
 */
export class PatternMatcher {
	private patterns: Map<string, Pattern> = new Map();
	private namingConventions: Map<string, NamingConvention> = new Map();
	private structuralPatterns: Map<string, StructuralPattern> = new Map();
	private codePatterns: Map<string, CodePattern> = new Map();

	/**
	 * Analyze files to detect patterns across the codebase
	 */
	async analyzePatterns(
		files: Map<string, FileInfo>,
		options: Partial<PatternDetectionOptions> = {},
	): Promise<Pattern[]> {
		const opts: PatternDetectionOptions = {
			confidenceThreshold: 0.6,
			maxPatterns: 50,
			categories: ['naming', 'structural', 'code', 'architectural'],
			includeExamples: true,
			...options,
		};

		try {
			// Reset pattern storage
			this.patterns.clear();
			this.namingConventions.clear();
			this.structuralPatterns.clear();
			this.codePatterns.clear();

			// Detect different types of patterns
			await this.detectNamingConventions(files);
			await this.detectStructuralPatterns(files);
			await this.detectCodePatterns(files);
			await this.detectArchitecturalPatterns(files);

			// Convert to Pattern objects and filter by confidence
			const allPatterns = await this.consolidatePatterns(opts);

			return allPatterns
				.filter(pattern => pattern.confidence >= opts.confidenceThreshold)
				.slice(0, opts.maxPatterns);
		} catch (error) {
			throw new PatternError(
				'Failed to analyze patterns',
				{fileCount: files.size},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Detect naming conventions across the codebase
	 */
	private async detectNamingConventions(
		files: Map<string, FileInfo>,
	): Promise<void> {
		const functionNames: string[] = [];
		const classNames: string[] = [];
		const variableNames: string[] = [];
		const fileNames: string[] = [];

		for (const [filePath, fileInfo] of files) {
			// Collect function names
			functionNames.push(...fileInfo.functions.map(f => f.name));

			// Collect class names
			classNames.push(...fileInfo.classes.map(c => c.name));

			// Collect variable names from exports
			variableNames.push(
				...fileInfo.exports.filter(e => e.type === 'variable').map(e => e.name),
			);

			// Collect file names
			const fileName = filePath.split('/').pop()?.split('.')[0];
			if (fileName) fileNames.push(fileName);
		}

		// Analyze naming patterns
		this.analyzeNamingPattern('functions', functionNames);
		this.analyzeNamingPattern('classes', classNames);
		this.analyzeNamingPattern('variables', variableNames);
		this.analyzeNamingPattern('files', fileNames);
	}

	/**
	 * Analyze naming pattern for a specific category
	 */
	private analyzeNamingPattern(category: string, names: string[]): void {
		if (names.length === 0) return;

		const patterns = {
			camelCase: /^[a-z][a-zA-Z0-9]*$/,
			PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
			snake_case: /^[a-z][a-z0-9_]*$/,
			'kebab-case': /^[a-z][a-z0-9-]*$/,
			CONSTANT_CASE: /^[A-Z][A-Z0-9_]*$/,
		};

		for (const [patternName, regex] of Object.entries(patterns)) {
			const matches = names.filter(name => regex.test(name));
			const confidence = matches.length / names.length;

			if (confidence > 0.3) {
				// Minimum threshold for consideration
				const convention: NamingConvention = {
					type: patternName as any,
					confidence,
					examples: matches.slice(0, 5),
					usage: category as any,
				};

				this.namingConventions.set(`${category}-${patternName}`, convention);
			}
		}
	}

	/**
	 * Detect structural patterns like services, controllers, utilities
	 */
	private async detectStructuralPatterns(
		files: Map<string, FileInfo>,
	): Promise<void> {
		// Service pattern
		this.detectServicePattern(files);

		// Utility pattern
		this.detectUtilityPattern(files);

		// Test pattern
		this.detectTestPattern(files);

		// Configuration pattern
		this.detectConfigPattern(files);

		// Interface/Type pattern
		this.detectTypePattern(files);
	}

	/**
	 * Detect service class pattern
	 */
	private detectServicePattern(files: Map<string, FileInfo>): void {
		const serviceFiles: string[] = [];
		const indicators: string[] = [];

		for (const [filePath, fileInfo] of files) {
			// Check file name
			if (filePath.toLowerCase().includes('service')) {
				serviceFiles.push(filePath);
				indicators.push('Service in filename');
			}

			// Check class names
			for (const classInfo of fileInfo.classes) {
				if (classInfo.name.endsWith('Service')) {
					serviceFiles.push(filePath);
					indicators.push(`Class ${classInfo.name}`);
				}
			}
		}

		if (serviceFiles.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Service Pattern',
				description: 'Files and classes that provide business logic services',
				files: [...new Set(serviceFiles)],
				indicators: [...new Set(indicators)],
				confidence: Math.min(
					0.95,
					serviceFiles.length / Math.max(1, files.size * 0.3),
				),
			};

			this.structuralPatterns.set('service', pattern);
		}
	}

	/**
	 * Detect utility pattern
	 */
	private detectUtilityPattern(files: Map<string, FileInfo>): void {
		const utilFiles: string[] = [];
		const indicators: string[] = [];

		for (const [filePath, fileInfo] of files) {
			const isUtilFile =
				filePath.toLowerCase().includes('util') ||
				filePath.toLowerCase().includes('helper') ||
				filePath.toLowerCase().includes('common');

			if (isUtilFile) {
				utilFiles.push(filePath);
				indicators.push('Utility in filename');
			}

			// Check for many exported functions (utility characteristic)
			if (fileInfo.functions.length > 3 && fileInfo.classes.length === 0) {
				utilFiles.push(filePath);
				indicators.push('Multiple utility functions');
			}
		}

		if (utilFiles.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Utility Pattern',
				description: 'Files containing reusable utility functions and helpers',
				files: [...new Set(utilFiles)],
				indicators: [...new Set(indicators)],
				confidence: Math.min(
					0.9,
					utilFiles.length / Math.max(1, files.size * 0.2),
				),
			};

			this.structuralPatterns.set('utility', pattern);
		}
	}

	/**
	 * Detect test pattern
	 */
	private detectTestPattern(files: Map<string, FileInfo>): void {
		const testFiles: string[] = [];
		const indicators: string[] = [];

		for (const [filePath] of files) {
			if (
				filePath.includes('test') ||
				filePath.includes('spec') ||
				filePath.endsWith('.test.ts') ||
				filePath.endsWith('.spec.ts')
			) {
				testFiles.push(filePath);
				indicators.push('Test file naming');
			}
		}

		if (testFiles.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Test Pattern',
				description: 'Test files and testing utilities',
				files: testFiles,
				indicators: [...new Set(indicators)],
				confidence: Math.min(
					0.95,
					testFiles.length / Math.max(1, files.size * 0.4),
				),
			};

			this.structuralPatterns.set('test', pattern);
		}
	}

	/**
	 * Detect configuration pattern
	 */
	private detectConfigPattern(files: Map<string, FileInfo>): void {
		const configFiles: string[] = [];
		const indicators: string[] = [];

		for (const [filePath] of files) {
			if (
				filePath.toLowerCase().includes('config') ||
				filePath.toLowerCase().includes('settings') ||
				filePath.endsWith('.config.ts') ||
				filePath.endsWith('.config.js')
			) {
				configFiles.push(filePath);
				indicators.push('Configuration file naming');
			}
		}

		if (configFiles.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Configuration Pattern',
				description: 'Configuration and settings files',
				files: configFiles,
				indicators: [...new Set(indicators)],
				confidence: Math.min(
					0.85,
					configFiles.length / Math.max(1, files.size * 0.1),
				),
			};

			this.structuralPatterns.set('configuration', pattern);
		}
	}

	/**
	 * Detect type definition pattern
	 */
	private detectTypePattern(files: Map<string, FileInfo>): void {
		const typeFiles: string[] = [];
		const indicators: string[] = [];

		for (const [filePath, fileInfo] of files) {
			if (
				filePath.toLowerCase().includes('type') ||
				filePath.toLowerCase().includes('interface') ||
				filePath.endsWith('.d.ts')
			) {
				typeFiles.push(filePath);
				indicators.push('Type definition file');
			}

			// High concentration of interfaces and types
			if (fileInfo.interfaces.length > 2 || fileInfo.types.length > 2) {
				typeFiles.push(filePath);
				indicators.push('Multiple type definitions');
			}
		}

		if (typeFiles.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Type Definition Pattern',
				description: 'Files primarily containing TypeScript type definitions',
				files: [...new Set(typeFiles)],
				indicators: [...new Set(indicators)],
				confidence: Math.min(
					0.9,
					typeFiles.length / Math.max(1, files.size * 0.15),
				),
			};

			this.structuralPatterns.set('types', pattern);
		}
	}

	/**
	 * Detect code patterns like error handling, logging, etc.
	 */
	private async detectCodePatterns(
		files: Map<string, FileInfo>,
	): Promise<void> {
		for (const [filePath, fileInfo] of files) {
			try {
				// For actual code pattern detection, we'd need the file content
				// This is a simplified version that works with the metadata we have

				// Error handling pattern
				const hasErrorHandling = fileInfo.functions.some(
					f =>
						f.name.toLowerCase().includes('error') ||
						f.name.toLowerCase().includes('catch') ||
						f.name.toLowerCase().includes('handle'),
				);

				if (hasErrorHandling) {
					this.addCodePattern('error-handling', {
						name: 'Error Handling Pattern',
						description: 'Functions that handle errors and exceptions',
						pattern: /(try|catch|throw|error)/i,
						examples: [
							{
								file: filePath,
								code: '// Error handling detected in function signatures',
								lines: [1, 5] as [number, number],
							},
						],
						confidence: 0.7,
					});
				}

				// Async pattern
				const hasAsyncFunctions = fileInfo.functions.some(f => f.isAsync);
				if (hasAsyncFunctions) {
					this.addCodePattern('async-pattern', {
						name: 'Async/Await Pattern',
						description: 'Usage of asynchronous programming patterns',
						pattern: /(async|await|Promise)/i,
						examples: [
							{
								file: filePath,
								code: '// Async functions detected',
								lines: [1, 5] as [number, number],
							},
						],
						confidence: 0.8,
					});
				}
			} catch (error) {
				// Skip files that can't be analyzed
				continue;
			}
		}
	}

	/**
	 * Add or update a code pattern
	 */
	private addCodePattern(id: string, pattern: CodePattern): void {
		const existing = this.codePatterns.get(id);
		if (existing) {
			existing.examples.push(...pattern.examples);
			existing.confidence = Math.min(0.95, existing.confidence + 0.1);
		} else {
			this.codePatterns.set(id, pattern);
		}
	}

	/**
	 * Detect architectural patterns
	 */
	private async detectArchitecturalPatterns(
		files: Map<string, FileInfo>,
	): Promise<void> {
		// Layered architecture
		this.detectLayeredArchitecture(files);

		// MVC pattern
		this.detectMVCPattern(files);

		// Module pattern
		this.detectModulePattern(files);
	}

	/**
	 * Detect layered architecture pattern
	 */
	private detectLayeredArchitecture(files: Map<string, FileInfo>): void {
		const layers = ['controller', 'service', 'model', 'repository', 'data'];
		const foundLayers: string[] = [];

		for (const layer of layers) {
			const hasLayer = Array.from(files.keys()).some(path =>
				path.toLowerCase().includes(layer),
			);
			if (hasLayer) foundLayers.push(layer);
		}

		if (foundLayers.length >= 2) {
			const pattern: StructuralPattern = {
				name: 'Layered Architecture',
				description: 'Clear separation of concerns into architectural layers',
				files: Array.from(files.keys()).filter(path =>
					foundLayers.some(layer => path.toLowerCase().includes(layer)),
				),
				indicators: foundLayers.map(layer => `${layer} layer detected`),
				confidence: Math.min(0.9, foundLayers.length / layers.length),
			};

			this.structuralPatterns.set('layered-architecture', pattern);
		}
	}

	/**
	 * Detect MVC pattern
	 */
	private detectMVCPattern(files: Map<string, FileInfo>): void {
		const mvcComponents = ['controller', 'model', 'view'];
		const foundComponents: string[] = [];

		for (const component of mvcComponents) {
			const hasComponent = Array.from(files.keys()).some(path =>
				path.toLowerCase().includes(component),
			);
			if (hasComponent) foundComponents.push(component);
		}

		if (foundComponents.length >= 2) {
			const pattern: StructuralPattern = {
				name: 'MVC Pattern',
				description: 'Model-View-Controller architectural pattern',
				files: Array.from(files.keys()).filter(path =>
					foundComponents.some(comp => path.toLowerCase().includes(comp)),
				),
				indicators: foundComponents.map(comp => `${comp} component detected`),
				confidence: Math.min(
					0.85,
					foundComponents.length / mvcComponents.length,
				),
			};

			this.structuralPatterns.set('mvc', pattern);
		}
	}

	/**
	 * Detect module pattern
	 */
	private detectModulePattern(files: Map<string, FileInfo>): void {
		const modules: Map<string, string[]> = new Map();

		for (const [filePath] of files) {
			const pathParts = filePath.split('/');
			if (pathParts.length > 2) {
				const moduleDir = pathParts[pathParts.length - 2];
				if (!modules.has(moduleDir)) {
					modules.set(moduleDir, []);
				}
				modules.get(moduleDir)!.push(filePath);
			}
		}

		// Find modules with multiple files
		const significantModules = Array.from(modules.entries()).filter(
			([_, files]) => files.length > 1,
		);

		if (significantModules.length > 0) {
			const pattern: StructuralPattern = {
				name: 'Module Pattern',
				description: 'Code organized into cohesive modules',
				files: significantModules.flatMap(([_, files]) => files),
				indicators: significantModules.map(
					([name, files]) => `${name} module (${files.length} files)`,
				),
				confidence: Math.min(
					0.8,
					significantModules.length / Math.max(1, modules.size * 0.5),
				),
			};

			this.structuralPatterns.set('modules', pattern);
		}
	}

	/**
	 * Consolidate all detected patterns into Pattern objects
	 */
	private async consolidatePatterns(
		options: PatternDetectionOptions,
	): Promise<Pattern[]> {
		const patterns: Pattern[] = [];
		let patternId = 0;

		// Convert naming conventions
		for (const [key, convention] of this.namingConventions) {
			patterns.push({
				id: `naming-${patternId++}`,
				name: `${convention.usage} ${convention.type}`,
				description: `${convention.usage} follow ${convention.type} naming convention`,
				category: 'naming',
				examples: options.includeExamples
					? convention.examples.map(example => ({
							title: `${convention.type} example`,
							description: `Example of ${convention.type} naming`,
							code: example,
							file: '',
							lines: [1, 1] as [number, number],
							explanation: `This follows ${convention.type} convention`,
					  }))
					: [],
				indicators: [
					{
						type: 'naming',
						pattern: convention.type,
						weight: convention.confidence,
					},
				],
				confidence: convention.confidence,
			});
		}

		// Convert structural patterns
		for (const [key, structural] of this.structuralPatterns) {
			patterns.push({
				id: `structural-${patternId++}`,
				name: structural.name,
				description: structural.description,
				category: 'structural',
				examples: options.includeExamples
					? structural.files.slice(0, 3).map(file => ({
							title: `${structural.name} example`,
							description: structural.description,
							code: `// Found in ${file}`,
							file,
							lines: [1, 10] as [number, number],
							explanation: structural.indicators.join(', '),
					  }))
					: [],
				indicators: structural.indicators.map(indicator => ({
					type: 'structure',
					pattern: indicator,
					weight: structural.confidence,
				})),
				confidence: structural.confidence,
			});
		}

		// Convert code patterns
		for (const [key, codePattern] of this.codePatterns) {
			patterns.push({
				id: `code-${patternId++}`,
				name: codePattern.name,
				description: codePattern.description,
				category: 'code',
				examples: options.includeExamples
					? codePattern.examples.map(example => ({
							title: codePattern.name,
							description: codePattern.description,
							code: example.code,
							file: example.file,
							lines: example.lines,
							explanation: codePattern.description,
					  }))
					: [],
				indicators: [
					{
						type: 'usage',
						pattern: codePattern.pattern,
						weight: codePattern.confidence,
					},
				],
				confidence: codePattern.confidence,
			});
		}

		return patterns;
	}

	/**
	 * Match patterns against a specific file
	 */
	async matchPatterns(
		fileInfo: FileInfo,
		patterns: Pattern[],
	): Promise<PatternMatch[]> {
		const matches: PatternMatch[] = [];

		for (const pattern of patterns) {
			let confidence = 0;
			const evidence: string[] = [];

			// Check pattern indicators against file
			for (const indicator of pattern.indicators) {
				switch (indicator.type) {
					case 'naming':
						if (this.matchesNamingPattern(fileInfo, indicator.pattern)) {
							confidence += indicator.weight * 0.3;
							evidence.push(`Matches ${indicator.pattern} naming`);
						}
						break;

					case 'structure':
						if (this.matchesStructuralPattern(fileInfo, indicator.pattern)) {
							confidence += indicator.weight * 0.5;
							evidence.push(`Contains ${indicator.pattern}`);
						}
						break;

					case 'usage':
						if (this.matchesUsagePattern(fileInfo, indicator.pattern)) {
							confidence += indicator.weight * 0.4;
							evidence.push(`Uses ${indicator.pattern}`);
						}
						break;
				}
			}

			if (confidence > 0.3) {
				// Minimum threshold for a match
				matches.push({
					patternId: pattern.id,
					confidence: Math.min(1.0, confidence),
					location: {line: 1, column: 1},
					evidence,
				});
			}
		}

		return matches;
	}

	/**
	 * Check if file matches naming pattern
	 */
	private matchesNamingPattern(fileInfo: FileInfo, pattern: any): boolean {
		// Check function names, class names, etc.
		const allNames = [
			...fileInfo.functions.map(f => f.name),
			...fileInfo.classes.map(c => c.name),
			...fileInfo.exports.map(e => e.name),
		];

		return allNames.some(name => {
			if (typeof pattern === 'string') {
				return name.includes(pattern);
			}
			return false;
		});
	}

	/**
	 * Check if file matches structural pattern
	 */
	private matchesStructuralPattern(fileInfo: FileInfo, pattern: any): boolean {
		if (typeof pattern === 'string') {
			return (
				fileInfo.path.toLowerCase().includes(pattern.toLowerCase()) ||
				fileInfo.classes.some(c =>
					c.name.toLowerCase().includes(pattern.toLowerCase()),
				)
			);
		}
		return false;
	}

	/**
	 * Check if file matches usage pattern
	 */
	private matchesUsagePattern(fileInfo: FileInfo, pattern: any): boolean {
		if (pattern instanceof RegExp) {
			// This would require file content analysis
			// For now, check function signatures and names
			return fileInfo.functions.some(
				f =>
					pattern.test(f.name) || (f.returnType && pattern.test(f.returnType)),
			);
		}
		return false;
	}

	/**
	 * Get pattern by ID
	 */
	getPattern(patternId: string): Pattern | undefined {
		return this.patterns.get(patternId);
	}

	/**
	 * Get all detected patterns
	 */
	getAllPatterns(): Pattern[] {
		return Array.from(this.patterns.values());
	}

	/**
	 * Get patterns by category
	 */
	getPatternsByCategory(category: string): Pattern[] {
		return Array.from(this.patterns.values()).filter(
			pattern => pattern.category === category,
		);
	}
}
