/**
 * TypeScript parser for ResonanceAI MVP
 *
 * Uses the TypeScript compiler API to extract detailed structural information
 * from TypeScript files, including imports, exports, functions, classes, and interfaces.
 */

import * as ts from 'typescript';
import {IndexingError} from '../../../core/errors.js';
import type {
	FileInfo,
	ImportInfo,
	ExportInfo,
	FunctionInfo,
	ClassInfo,
	InterfaceInfo,
	TypeInfo,
	ParameterInfo,
	PropertyInfo,
	MethodSignature,
	PropertySignature,
	LanguageParser,
	ParseResult,
	ParseError,
} from '../../../core/types.js';

/**
 * TypeScript-specific parser that extracts detailed AST information
 */
export class TypeScriptParser implements LanguageParser {
	readonly language = 'typescript';
	readonly extensions = ['.ts', '.tsx'];

	/**
	 * Check if this parser supports the given file
	 */
	supports(filePath: string): boolean {
		return this.extensions.some(ext => filePath.endsWith(ext));
	}

	/**
	 * Parse a TypeScript file and extract comprehensive structural information
	 */
	async parse(content: string, filePath: string): Promise<FileInfo> {
		try {
			const result = this.parseContent(content, filePath);

			if (!result.success) {
				throw new IndexingError(
					`Failed to parse TypeScript file: ${filePath}`,
					{
						filePath,
						errors: result.errors.map(e => e.message),
					},
				);
			}

			return result.fileInfo!;
		} catch (error) {
			throw new IndexingError(
				`TypeScript parsing failed for: ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Parse content and return detailed results with error handling
	 */
	parseContent(content: string, filePath: string): ParseResult {
		const errors: ParseError[] = [];

		try {
			// Create TypeScript source file
			const sourceFile = ts.createSourceFile(
				filePath,
				content,
				ts.ScriptTarget.Latest,
				true,
				filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
			);

			// Check for syntax errors
			const syntaxErrors = this.getSyntaxErrors(sourceFile);
			if (syntaxErrors.length > 0) {
				errors.push(...syntaxErrors);
			}

			// Extract structural information
			const imports = this.extractImports(sourceFile);
			const exports = this.extractExports(sourceFile);
			const functions = this.extractFunctions(sourceFile);
			const classes = this.extractClasses(sourceFile);
			const interfaces = this.extractInterfaces(sourceFile);
			const types = this.extractTypes(sourceFile);

			// Create base FileInfo (will be enhanced by FileCrawler)
			const fileInfo: Partial<FileInfo> = {
				path: filePath,
				relativePath: '', // Will be set by FileCrawler
				type: 'typescript',
				size: content.length,
				lines: content.split('\n').length,
				lastModified: new Date(),
				checksum: '', // Will be set by FileCrawler

				// Parsed structure
				imports,
				exports,
				functions,
				classes,
				interfaces,
				types,

				// Analysis results (defaults)
				patterns: [],
				complexity: {
					cyclomatic: 1,
					cognitive: 1,
					maintainability: 100,
					halstead: {vocabulary: 0, length: 0, difficulty: 0, effort: 0},
				},
				dependencies: imports.map(imp => imp.module),
			};

			return {
				success: errors.length === 0,
				fileInfo: fileInfo as FileInfo,
				errors,
			};
		} catch (error) {
			errors.push({
				line: 1,
				column: 1,
				message: `Unexpected error during parsing: ${
					error instanceof Error ? error.message : String(error)
				}`,
				severity: 'error' as const,
			});

			return {
				success: false,
				errors,
			};
		}
	}

	/**
	 * Get syntax errors from the source file
	 */
	private getSyntaxErrors(sourceFile: ts.SourceFile): ParseError[] {
		const errors: ParseError[] = [];

		function visit(node: ts.Node) {
			if (node.kind === ts.SyntaxKind.Unknown) {
				const start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
				errors.push({
					line: start.line + 1,
					column: start.character + 1,
					message: 'Unknown syntax element',
					severity: 'error' as const,
				});
			}

			ts.forEachChild(node, visit);
		}

		visit(sourceFile);
		return errors;
	}

	/**
	 * Extract import statements from the source file
	 */
	private extractImports(sourceFile: ts.SourceFile): ImportInfo[] {
		const imports: ImportInfo[] = [];

		const visit = (node: ts.Node) => {
			if (ts.isImportDeclaration(node)) {
				const importInfo = this.parseImportDeclaration(node, sourceFile);
				if (importInfo) {
					imports.push(importInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return imports;
	}

	/**
	 * Parse a single import declaration
	 */
	private parseImportDeclaration(
		node: ts.ImportDeclaration,
		sourceFile: ts.SourceFile,
	): ImportInfo | null {
		if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
			return null;
		}

		const module = node.moduleSpecifier.text;
		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		let imported: string[] = [];
		let importType: ImportInfo['importType'] = 'side-effect';

		if (node.importClause) {
			// Default import
			if (node.importClause.name) {
				imported.push(node.importClause.name.text);
				importType = 'default';
			}

			// Named imports
			if (node.importClause.namedBindings) {
				if (ts.isNamespaceImport(node.importClause.namedBindings)) {
					// import * as name
					imported.push(node.importClause.namedBindings.name.text);
					importType = 'namespace';
				} else if (ts.isNamedImports(node.importClause.namedBindings)) {
					// import { a, b, c }
					const namedImports = node.importClause.namedBindings.elements.map(
						element => {
							return element.propertyName
								? element.propertyName.text
								: element.name.text;
						},
					);
					imported.push(...namedImports);
					importType =
						imported.length === 1 && !node.importClause.name
							? 'named'
							: 'named';
				}
			}
		}

		return {
			module,
			imported,
			importType,
			line,
		};
	}

	/**
	 * Extract export statements from the source file
	 */
	private extractExports(sourceFile: ts.SourceFile): ExportInfo[] {
		const exports: ExportInfo[] = [];

		const visit = (node: ts.Node) => {
			// Export declarations
			if (ts.isExportDeclaration(node)) {
				const exportInfos = this.parseExportDeclaration(node, sourceFile);
				exports.push(...exportInfos);
			}

			// Function declarations with export modifier
			if (ts.isFunctionDeclaration(node) && this.hasExportModifier(node)) {
				const exportInfo = this.createExportInfo(node, 'function', sourceFile);
				if (exportInfo) exports.push(exportInfo);
			}

			// Class declarations with export modifier
			if (ts.isClassDeclaration(node) && this.hasExportModifier(node)) {
				const exportInfo = this.createExportInfo(node, 'class', sourceFile);
				if (exportInfo) exports.push(exportInfo);
			}

			// Interface declarations with export modifier
			if (ts.isInterfaceDeclaration(node) && this.hasExportModifier(node)) {
				const exportInfo = this.createExportInfo(node, 'interface', sourceFile);
				if (exportInfo) exports.push(exportInfo);
			}

			// Type alias declarations with export modifier
			if (ts.isTypeAliasDeclaration(node) && this.hasExportModifier(node)) {
				const exportInfo = this.createExportInfo(node, 'type', sourceFile);
				if (exportInfo) exports.push(exportInfo);
			}

			// Variable statements with export modifier
			if (ts.isVariableStatement(node) && this.hasExportModifier(node)) {
				for (const declaration of node.declarationList.declarations) {
					const exportInfo = this.createExportInfo(
						declaration,
						'variable',
						sourceFile,
					);
					if (exportInfo) exports.push(exportInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return exports;
	}

	/**
	 * Parse export declaration
	 */
	private parseExportDeclaration(
		node: ts.ExportDeclaration,
		sourceFile: ts.SourceFile,
	): ExportInfo[] {
		const exports: ExportInfo[] = [];
		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;

		if (node.exportClause && ts.isNamedExports(node.exportClause)) {
			for (const element of node.exportClause.elements) {
				exports.push({
					name: element.name.text,
					type: 'variable',
					line,
				});
			}
		}

		return exports;
	}

	/**
	 * Create export info for a node
	 */
	private createExportInfo(
		node: ts.Node,
		type: ExportInfo['type'],
		sourceFile: ts.SourceFile,
	): ExportInfo | null {
		const name = this.getNodeName(node);
		if (!name) return null;

		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const signature = this.getNodeSignature(node);

		return {
			name,
			type,
			line,
			signature,
		};
	}

	/**
	 * Extract function declarations
	 */
	private extractFunctions(sourceFile: ts.SourceFile): FunctionInfo[] {
		const functions: FunctionInfo[] = [];

		const visit = (node: ts.Node) => {
			if (
				ts.isFunctionDeclaration(node) ||
				ts.isMethodDeclaration(node) ||
				ts.isArrowFunction(node)
			) {
				const functionInfo = this.parseFunctionDeclaration(node, sourceFile);
				if (functionInfo) {
					functions.push(functionInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return functions;
	}

	/**
	 * Parse function declaration
	 */
	private parseFunctionDeclaration(
		node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ArrowFunction,
		sourceFile: ts.SourceFile,
	): FunctionInfo | null {
		const name = this.getNodeName(node) || 'anonymous';
		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const endLine =
			sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;

		const parameters = node.parameters.map(param => this.parseParameter(param));
		const returnType = node.type ? node.type.getText(sourceFile) : undefined;
		const isAsync =
			node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.AsyncKeyword) ??
			false;
		const isExported = this.hasExportModifier(node);

		// Simple complexity calculation
		const complexity = this.calculateFunctionComplexity(node);

		return {
			name,
			parameters,
			returnType,
			line,
			endLine,
			isAsync,
			isExported,
			complexity,
		};
	}

	/**
	 * Parse function parameter
	 */
	private parseParameter(param: ts.ParameterDeclaration): ParameterInfo {
		const name = param.name.getText();
		const type = param.type?.getText();
		const isOptional = !!param.questionToken;
		const defaultValue = param.initializer?.getText();

		return {
			name,
			type,
			isOptional,
			defaultValue,
		};
	}

	/**
	 * Extract class declarations
	 */
	private extractClasses(sourceFile: ts.SourceFile): ClassInfo[] {
		const classes: ClassInfo[] = [];

		const visit = (node: ts.Node) => {
			if (ts.isClassDeclaration(node)) {
				const classInfo = this.parseClassDeclaration(node, sourceFile);
				if (classInfo) {
					classes.push(classInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return classes;
	}

	/**
	 * Parse class declaration
	 */
	private parseClassDeclaration(
		node: ts.ClassDeclaration,
		sourceFile: ts.SourceFile,
	): ClassInfo | null {
		const name = node.name?.text;
		if (!name) return null;

		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const endLine =
			sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;

		const extendsClause = node.heritageClauses?.find(
			clause => clause.token === ts.SyntaxKind.ExtendsKeyword,
		);
		const extendsType = extendsClause?.types[0]?.getText(sourceFile);

		const implementsClause = node.heritageClauses?.find(
			clause => clause.token === ts.SyntaxKind.ImplementsKeyword,
		);
		const implementsTypes =
			implementsClause?.types.map(type => type.getText(sourceFile)) ?? [];

		const methods: FunctionInfo[] = [];
		const properties: PropertyInfo[] = [];

		for (const member of node.members) {
			if (ts.isMethodDeclaration(member)) {
				const method = this.parseFunctionDeclaration(member, sourceFile);
				if (method) methods.push(method);
			} else if (ts.isPropertyDeclaration(member)) {
				const property = this.parsePropertyDeclaration(member, sourceFile);
				if (property) properties.push(property);
			}
		}

		return {
			name,
			extends: extendsType,
			implements: implementsTypes,
			methods,
			properties,
			line,
			endLine,
			isExported: this.hasExportModifier(node),
		};
	}

	/**
	 * Parse property declaration
	 */
	private parsePropertyDeclaration(
		node: ts.PropertyDeclaration,
		sourceFile: ts.SourceFile,
	): PropertyInfo | null {
		const name = this.getNodeName(node);
		if (!name) return null;

		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const type = node.type?.getText(sourceFile);
		const isOptional = !!node.questionToken;
		const isStatic =
			node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword) ??
			false;
		const isReadonly =
			node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword) ??
			false;

		return {
			name,
			type,
			isOptional,
			isStatic,
			isReadonly,
			line,
		};
	}

	/**
	 * Extract interface declarations
	 */
	private extractInterfaces(sourceFile: ts.SourceFile): InterfaceInfo[] {
		const interfaces: InterfaceInfo[] = [];

		const visit = (node: ts.Node) => {
			if (ts.isInterfaceDeclaration(node)) {
				const interfaceInfo = this.parseInterfaceDeclaration(node, sourceFile);
				if (interfaceInfo) {
					interfaces.push(interfaceInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return interfaces;
	}

	/**
	 * Parse interface declaration
	 */
	private parseInterfaceDeclaration(
		node: ts.InterfaceDeclaration,
		sourceFile: ts.SourceFile,
	): InterfaceInfo {
		const name = node.name.text;
		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const endLine =
			sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;

		const extendsTypes =
			node.heritageClauses
				?.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword)
				?.types.map(type => type.getText(sourceFile)) ?? [];

		const methods: MethodSignature[] = [];
		const properties: PropertySignature[] = [];

		for (const member of node.members) {
			if (ts.isMethodSignature(member)) {
				const method = this.parseMethodSignature(member, sourceFile);
				if (method) methods.push(method);
			} else if (ts.isPropertySignature(member)) {
				const property = this.parsePropertySignature(member, sourceFile);
				if (property) properties.push(property);
			}
		}

		return {
			name,
			extends: extendsTypes,
			methods,
			properties,
			line,
			endLine,
			isExported: this.hasExportModifier(node),
		};
	}

	/**
	 * Parse method signature
	 */
	private parseMethodSignature(
		node: ts.MethodSignature,
		sourceFile: ts.SourceFile,
	): MethodSignature | null {
		const name = this.getNodeName(node);
		if (!name) return null;

		const parameters = node.parameters.map(param => this.parseParameter(param));
		const returnType = node.type?.getText(sourceFile);
		const isOptional = !!node.questionToken;

		return {
			name,
			parameters,
			returnType,
			isOptional,
		};
	}

	/**
	 * Parse property signature
	 */
	private parsePropertySignature(
		node: ts.PropertySignature,
		sourceFile: ts.SourceFile,
	): PropertySignature | null {
		const name = this.getNodeName(node);
		if (!name) return null;

		const type = node.type?.getText(sourceFile);
		const isOptional = !!node.questionToken;
		const isReadonly =
			node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword) ??
			false;

		return {
			name,
			type,
			isOptional,
			isReadonly,
		};
	}

	/**
	 * Extract type alias declarations
	 */
	private extractTypes(sourceFile: ts.SourceFile): TypeInfo[] {
		const types: TypeInfo[] = [];

		const visit = (node: ts.Node) => {
			if (ts.isTypeAliasDeclaration(node)) {
				const typeInfo = this.parseTypeDeclaration(node, sourceFile);
				if (typeInfo) {
					types.push(typeInfo);
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
		return types;
	}

	/**
	 * Parse type alias declaration
	 */
	private parseTypeDeclaration(
		node: ts.TypeAliasDeclaration,
		sourceFile: ts.SourceFile,
	): TypeInfo {
		const name = node.name.text;
		const line =
			sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
		const definition = node.type.getText(sourceFile);
		const isExported = this.hasExportModifier(node);

		return {
			name,
			definition,
			line,
			isExported,
		};
	}

	/**
	 * Get the name of a node
	 */
	private getNodeName(node: ts.Node): string | undefined {
		const nodeWithName = node as any;
		if (
			'name' in nodeWithName &&
			nodeWithName.name &&
			ts.isIdentifier(nodeWithName.name)
		) {
			return nodeWithName.name.text;
		}
		return undefined;
	}

	/**
	 * Get the signature of a node
	 */
	private getNodeSignature(node: ts.Node): string | undefined {
		// Return a simplified signature representation
		const text = node.getText();
		const firstLine = text?.split('\n')[0];
		return firstLine ? firstLine.trim() : undefined;
	}

	/**
	 * Check if a node has an export modifier
	 */
	private hasExportModifier(node: ts.Node): boolean {
		if ('modifiers' in node && Array.isArray((node as any).modifiers)) {
			return (node as any).modifiers.some(
				(modifier: ts.Modifier) =>
					modifier.kind === ts.SyntaxKind.ExportKeyword,
			);
		}
		return false;
	}

	/**
	 * Calculate basic complexity for a function
	 */
	private calculateFunctionComplexity(node: ts.Node): number {
		let complexity = 1; // Base complexity

		function visit(child: ts.Node) {
			// Add complexity for control flow statements
			if (
				ts.isIfStatement(child) ||
				ts.isWhileStatement(child) ||
				ts.isForStatement(child) ||
				ts.isForInStatement(child) ||
				ts.isForOfStatement(child) ||
				ts.isSwitchStatement(child) ||
				ts.isTryStatement(child) ||
				ts.isCatchClause(child)
			) {
				complexity++;
			}

			ts.forEachChild(child, visit);
		}

		visit(node);
		return complexity;
	}
}
