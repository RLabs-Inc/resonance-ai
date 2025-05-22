/**
 * Main indexing service for ResonanceAI MVP
 *
 * Orchestrates file crawling, parsing, dependency analysis, and pattern detection
 * to build and maintain a comprehensive project index optimized for Claude's needs.
 */

import * as path from 'path';
import {EventBus} from '../../core/events.js';
import {IndexingError} from '../../core/errors.js';
import {FileUtils} from '../../utils/file-utils.js';
import {HashUtils} from '../../utils/hash-utils.js';
import {FileCrawler} from './FileCrawler.js';
import {TypeScriptParser} from './parsers/TypeScriptParser.js';
import {DependencyGraphBuilder} from './DependencyGraph.js';
import type {
	ProjectIndex,
	ProjectMetadata,
	FileInfo,
	IndexingConfig,
	IndexQuery,
	IndexResult,
	QueryFilter,
	QuerySort,
	LanguageParser,
	Pattern,
} from '../../core/types.js';

export interface IndexingOptions {
	incremental?: boolean;
	parseOnly?: string[];
	skipPatterns?: boolean;
	generateHashes?: boolean;
	maxConcurrency?: number;
}

export interface IndexingProgress {
	phase: 'crawling' | 'parsing' | 'dependencies' | 'patterns' | 'finalizing';
	filesProcessed: number;
	totalFiles: number;
	currentFile?: string;
	percentage: number;
}

export interface IndexPersistenceOptions {
	format: 'json' | 'yaml';
	compress: boolean;
	includeContent: boolean;
}

/**
 * Main service for building and maintaining project indexes
 */
export class IndexingService {
	private index: ProjectIndex | null = null;
	private config: IndexingConfig;
	private eventBus: EventBus;
	private crawler: FileCrawler;
	private parsers: Map<string, LanguageParser>;
	private dependencyBuilder: DependencyGraphBuilder;

	constructor(config: IndexingConfig, eventBus: EventBus) {
		this.config = config;
		this.eventBus = eventBus;
		this.crawler = new FileCrawler(config, eventBus);
		this.parsers = new Map();
		this.dependencyBuilder = new DependencyGraphBuilder({
			rootPath: '.',
			resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		});

		this.initializeParsers();
	}

	/**
	 * Initialize language parsers
	 */
	private initializeParsers(): void {
		const typeScriptParser = new TypeScriptParser();
		this.parsers.set('typescript', typeScriptParser);
		this.parsers.set('javascript', typeScriptParser); // TS parser handles JS too
	}

	/**
	 * Index a project from the specified root path
	 */
	async indexProject(
		rootPath: string,
		options: IndexingOptions = {},
	): Promise<ProjectIndex> {
		const emitter = this.eventBus.createScope('IndexingService');

		try {
			await emitter.emit('indexing.started', {projectPath: rootPath});

			const startTime = Date.now();

			// Phase 1: Crawl files
			await this.emitProgress('crawling', 0, 0);
			const crawlResult = await this.crawler.crawl(rootPath, {
				includePatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json', '**/*.md', '**/*.yaml', '**/*.yml'], // Include source files
				excludePatterns: [
					'**/node_modules/**', 
					'**/dist/**', 
					'**/build/**', 
					'**/.git/**',
					'**/coverage/**',
					'**/.nyc_output/**',
					'**/*.log',
					'**/*.tmp'
				],
				generateChecksums: options.generateHashes ?? this.config.generateHashes,
			});

			// Phase 2: Parse files with language-specific parsers
			await this.emitProgress('parsing', 0, crawlResult.totalFiles);
			const enrichedFiles = await this.parseFiles(crawlResult.files, options);

			// Phase 3: Build dependency graph
			await this.emitProgress('dependencies', 0, 0);
			const dependencyGraph = await this.dependencyBuilder.buildGraph(
				enrichedFiles,
			);

			// Phase 4: Detect patterns
			await this.emitProgress('patterns', 0, 0);
			const patterns = options.skipPatterns
				? []
				: await this.detectPatterns(enrichedFiles);

			// Phase 5: Finalize index
			await this.emitProgress('finalizing', 0, 0);
			this.index = {
				metadata: this.createMetadata(rootPath, enrichedFiles, startTime),
				files: enrichedFiles,
				dependencies: dependencyGraph,
				patterns,
				exports: this.buildExportsMap(enrichedFiles),
			};

			await emitter.emit('indexing.completed', {
				projectPath: rootPath,
				totalFiles: enrichedFiles.size,
				totalLines: this.index.metadata.totalLines,
				patterns: patterns.length,
			});

			return this.index;
		} catch (error) {
			await emitter.emit('indexing.failed', {
				projectPath: rootPath,
				error: error instanceof Error ? error : new Error(String(error)),
			});

			throw new IndexingError(
				`Failed to index project: ${rootPath}`,
				{rootPath, options},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Parse files using appropriate language parsers
	 */
	private async parseFiles(
		files: Map<string, FileInfo>,
		options: IndexingOptions,
	): Promise<Map<string, FileInfo>> {
		const enrichedFiles = new Map<string, FileInfo>();
		const filesToProcess = Array.from(files.entries());

		// Filter files if parseOnly is specified
		const targetFiles = options.parseOnly
			? filesToProcess.filter(([filePath]) =>
					options.parseOnly!.some(pattern => filePath.includes(pattern)),
			  )
			: filesToProcess;

		let processed = 0;

		for (const [filePath, fileInfo] of targetFiles) {
			try {
				// Find appropriate parser
				const parser = this.getParserForFile(filePath);

				if (parser) {
					// Parse with language-specific parser
					const content = await FileUtils.readFile(filePath);
					const parsedInfo = await parser.parse(content, filePath);

					// Merge parsed information with basic file info
					const enrichedInfo: FileInfo = {
						...fileInfo,
						...parsedInfo,
						// Preserve original metadata
						path: fileInfo.path,
						relativePath: fileInfo.relativePath,
						size: fileInfo.size,
						lastModified: fileInfo.lastModified,
						checksum: fileInfo.checksum,
					};

					enrichedFiles.set(filePath, enrichedInfo);
				} else {
					// No parser available, keep basic info
					enrichedFiles.set(filePath, fileInfo);
				}

				processed++;
				await this.emitProgress(
					'parsing',
					processed,
					targetFiles.length,
					filePath,
				);
			} catch (error) {
				// Log parsing error but continue with basic file info
				console.warn(`Failed to parse ${filePath}:`, error);
				enrichedFiles.set(filePath, fileInfo);
			}
		}

		return enrichedFiles;
	}

	/**
	 * Get appropriate parser for a file
	 */
	private getParserForFile(filePath: string): LanguageParser | null {
		for (const parser of this.parsers.values()) {
			if (parser.supports(filePath)) {
				return parser;
			}
		}
		return null;
	}

	/**
	 * Detect code patterns across the project
	 */
	private async detectPatterns(
		files: Map<string, FileInfo>,
	): Promise<Pattern[]> {
		const patterns: Pattern[] = [];

		// Basic pattern detection (can be expanded)
		const servicePattern = this.detectServicePattern(files);
		if (servicePattern) patterns.push(servicePattern);

		const utilPattern = this.detectUtilPattern(files);
		if (utilPattern) patterns.push(utilPattern);

		const testPattern = this.detectTestPattern(files);
		if (testPattern) patterns.push(testPattern);

		return patterns;
	}

	/**
	 * Detect service class pattern
	 */
	private detectServicePattern(files: Map<string, FileInfo>): Pattern | null {
		const serviceFiles = Array.from(files.values()).filter(
			file =>
				file.path.includes('service') ||
				file.path.includes('Service') ||
				file.classes.some(cls => cls.name.endsWith('Service')),
		);

		if (serviceFiles.length === 0) return null;

		return {
			id: 'service-pattern',
			name: 'Service Pattern',
			description: 'Classes or files that provide business logic services',
			category: 'architecture',
			examples: serviceFiles.slice(0, 3).map(file => ({
				title: `Service in ${path.basename(file.path)}`,
				description: 'Service class implementation',
				code:
					file.classes.find(cls => cls.name.endsWith('Service'))?.name ||
					'Service',
				file: file.path,
				lines: [1, 10] as [number, number],
				explanation: 'Service classes encapsulate business logic',
			})),
			indicators: [
				{type: 'naming', pattern: /Service/i, weight: 0.8},
				{type: 'structure', pattern: /class.*Service/i, weight: 0.9},
			],
			confidence: Math.min(0.9, serviceFiles.length / 5),
		};
	}

	/**
	 * Detect utility pattern
	 */
	private detectUtilPattern(files: Map<string, FileInfo>): Pattern | null {
		const utilFiles = Array.from(files.values()).filter(
			file =>
				file.path.includes('util') ||
				file.path.includes('Utils') ||
				file.path.includes('helper'),
		);

		if (utilFiles.length === 0) return null;

		return {
			id: 'utility-pattern',
			name: 'Utility Pattern',
			description: 'Utility functions and helper modules',
			category: 'structure',
			examples: utilFiles.slice(0, 3).map(file => ({
				title: `Utilities in ${path.basename(file.path)}`,
				description: 'Utility functions',
				code: file.functions
					.slice(0, 2)
					.map(fn => fn.name)
					.join(', '),
				file: file.path,
				lines: [1, 10] as [number, number],
				explanation: 'Utility modules provide reusable helper functions',
			})),
			indicators: [
				{type: 'naming', pattern: /utils?|helper/i, weight: 0.9},
				{type: 'structure', pattern: /export.*function/i, weight: 0.7},
			],
			confidence: Math.min(0.8, utilFiles.length / 3),
		};
	}

	/**
	 * Detect test pattern
	 */
	private detectTestPattern(files: Map<string, FileInfo>): Pattern | null {
		const testFiles = Array.from(files.values()).filter(
			file =>
				file.path.includes('test') ||
				file.path.includes('spec') ||
				file.path.endsWith('.test.ts') ||
				file.path.endsWith('.spec.ts'),
		);

		if (testFiles.length === 0) return null;

		return {
			id: 'test-pattern',
			name: 'Test Pattern',
			description: 'Test files and testing utilities',
			category: 'testing',
			examples: testFiles.slice(0, 3).map(file => ({
				title: `Tests in ${path.basename(file.path)}`,
				description: 'Test file',
				code: 'test(...)',
				file: file.path,
				lines: [1, 10] as [number, number],
				explanation: 'Test files contain automated tests for the codebase',
			})),
			indicators: [
				{type: 'naming', pattern: /test|spec/i, weight: 0.9},
				{type: 'usage', pattern: /test\(|describe\(|it\(/i, weight: 0.8},
			],
			confidence: Math.min(0.9, testFiles.length / 10),
		};
	}

	/**
	 * Build exports map for easy lookup
	 */
	private buildExportsMap(files: Map<string, FileInfo>): Map<string, any[]> {
		const exportsMap = new Map();

		for (const [filePath, fileInfo] of files) {
			if (fileInfo.exports.length > 0) {
				exportsMap.set(filePath, fileInfo.exports);
			}
		}

		return exportsMap;
	}

	/**
	 * Create project metadata
	 */
	private createMetadata(
		rootPath: string,
		files: Map<string, FileInfo>,
		startTime: number,
	): ProjectMetadata {
		const languages = new Set<string>();
		let totalLines = 0;

		for (const fileInfo of files.values()) {
			languages.add(fileInfo.type);
			totalLines += fileInfo.lines;
		}

		return {
			version: '1.0.0',
			created: new Date(startTime),
			lastUpdated: new Date(),
			rootPath,
			totalFiles: files.size,
			totalLines,
			languages: Array.from(languages),
		};
	}

	/**
	 * Emit indexing progress
	 */
	private async emitProgress(
		phase: IndexingProgress['phase'],
		processed: number,
		total: number,
		currentFile?: string,
	): Promise<void> {
		const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;

		const progress: IndexingProgress = {
			phase,
			filesProcessed: processed,
			totalFiles: total,
			currentFile,
			percentage,
		};

		const emitter = this.eventBus.createScope('IndexingService');
		await emitter.emit('indexing.progress', progress);
	}

	/**
	 * Update index incrementally when files change
	 */
	async updateIndex(changedFiles: string[]): Promise<void> {
		if (!this.index) {
			throw new IndexingError('No index to update. Run indexProject first.');
		}

		const emitter = this.eventBus.createScope('IndexingService');

		try {
			await emitter.emit('indexing.update.started', {files: changedFiles});

			for (const filePath of changedFiles) {
				if (await FileUtils.exists(filePath)) {
					// File was modified or added
					await this.updateSingleFile(filePath);
				} else {
					// File was deleted
					this.removeSingleFile(filePath);
				}
			}

			// Rebuild dependency graph with updated files
			this.index.dependencies = await this.dependencyBuilder.buildGraph(
				this.index.files,
			);

			// Update metadata
			this.index.metadata.lastUpdated = new Date();

			await emitter.emit('indexing.update.completed', {
				files: changedFiles,
				totalFiles: this.index.files.size,
			});
		} catch (error) {
			await emitter.emit('indexing.update.failed', {
				files: changedFiles,
				error: error instanceof Error ? error : new Error(String(error)),
			});
			throw error;
		}
	}

	/**
	 * Update a single file in the index
	 */
	private async updateSingleFile(filePath: string): Promise<void> {
		if (!this.index) return;

		try {
			// Get basic file info
			const stats = await FileUtils.getStats(filePath);
			const content = await FileUtils.readFile(filePath);
			const checksum = this.config.generateHashes
				? HashUtils.hashContent(content).hash
				: '';

			let fileInfo: FileInfo = {
				path: filePath,
				relativePath: FileUtils.getRelativePath(
					this.index.metadata.rootPath,
					filePath,
				),
				type: this.detectFileType(filePath),
				size: stats.size,
				lines: content.split('\n').length,
				lastModified: stats.lastModified,
				checksum,
				imports: [],
				exports: [],
				functions: [],
				classes: [],
				interfaces: [],
				types: [],
				patterns: [],
				complexity: {
					cyclomatic: 1,
					cognitive: 1,
					maintainability: 100,
					halstead: {vocabulary: 0, length: 0, difficulty: 0, effort: 0},
				},
				dependencies: [],
			};

			// Parse with appropriate parser if available
			const parser = this.getParserForFile(filePath);
			if (parser) {
				const parsedInfo = await parser.parse(content, filePath);
				fileInfo = {...fileInfo, ...parsedInfo};
			}

			this.index.files.set(filePath, fileInfo);
		} catch (error) {
			console.warn(`Failed to update file ${filePath}:`, error);
		}
	}

	/**
	 * Remove a file from the index
	 */
	private removeSingleFile(filePath: string): void {
		if (!this.index) return;

		this.index.files.delete(filePath);

		// Remove from exports map
		this.index.exports.delete(filePath);

		// Remove dependency edges
		this.index.dependencies.edges = this.index.dependencies.edges.filter(
			edge => edge.from !== filePath && edge.to !== filePath,
		);

		// Remove dependency node
		this.index.dependencies.nodes.delete(filePath);
	}

	/**
	 * Detect file type from extension
	 */
	private detectFileType(filePath: string): string {
		const ext = path.extname(filePath).toLowerCase();
		const typeMap: Record<string, string> = {
			'.ts': 'typescript',
			'.tsx': 'typescript',
			'.js': 'javascript',
			'.jsx': 'javascript',
			'.json': 'json',
			'.md': 'markdown',
			'.yaml': 'yaml',
			'.yml': 'yaml',
		};

		return typeMap[ext] || 'text';
	}

	/**
	 * Query the index
	 */
	async queryIndex(query: IndexQuery): Promise<IndexResult> {
		if (!this.index) {
			throw new IndexingError('No index available. Run indexProject first.');
		}

		const files = Array.from(this.index.files.values());
		let results: FileInfo[] = [];

		switch (query.type) {
			case 'files':
				results = this.queryFiles(files, query.filter);
				break;
			case 'dependencies':
				results = this.queryDependencies(files);
				break;
			case 'patterns':
				results = this.queryPatterns(files, query.filter);
				break;
			case 'exports':
				results = this.queryExports(files);
				break;
		}

		// Apply sorting
		if (query.sort) {
			results = this.sortResults(results, query.sort);
		}

		// Apply limit
		if (query.limit) {
			results = results.slice(0, query.limit);
		}

		return {
			files: results,
			patterns: this.index.patterns,
			dependencies: [],
			metadata: {
				totalResults: results.length,
				queryTime: 0, // TODO: Measure actual query time
				filters: query.filter ? [query.filter] : [],
			},
		};
	}

	/**
	 * Query files based on filter criteria
	 */
	private queryFiles(files: FileInfo[], filter?: QueryFilter): FileInfo[] {
		if (!filter) return files;

		return files.filter(file => {
			if (filter.fileType && file.type !== filter.fileType) return false;
			if (filter.pattern && !file.path.includes(filter.pattern)) return false;
			if (filter.modifiedAfter && file.lastModified < filter.modifiedAfter)
				return false;
			if (filter.complexity) {
				const complexity = file.complexity.cyclomatic;
				if (filter.complexity.min && complexity < filter.complexity.min)
					return false;
				if (filter.complexity.max && complexity > filter.complexity.max)
					return false;
			}
			return true;
		});
	}

	/**
	 * Query files based on dependency criteria
	 */
	private queryDependencies(files: FileInfo[]): FileInfo[] {
		// Implementation depends on specific dependency query needs
		return files;
	}

	/**
	 * Query files based on pattern criteria
	 */
	private queryPatterns(files: FileInfo[], filter?: QueryFilter): FileInfo[] {
		if (!filter?.hasPattern) return files;

		return files.filter(file =>
			file.patterns.some(pattern =>
				pattern.patternId.includes(filter.hasPattern!),
			),
		);
	}

	/**
	 * Query files based on export criteria
	 */
	private queryExports(files: FileInfo[]): FileInfo[] {
		return files.filter(file => file.exports.length > 0);
	}

	/**
	 * Sort query results
	 */
	private sortResults(files: FileInfo[], sort: QuerySort): FileInfo[] {
		return files.sort((a, b) => {
			let aValue: any, bValue: any;

			switch (sort.field) {
				case 'name':
					aValue = path.basename(a.path);
					bValue = path.basename(b.path);
					break;
				case 'size':
					aValue = a.size;
					bValue = b.size;
					break;
				case 'modified':
					aValue = a.lastModified.getTime();
					bValue = b.lastModified.getTime();
					break;
				case 'complexity':
					aValue = a.complexity.cyclomatic;
					bValue = b.complexity.cyclomatic;
					break;
				default:
					return 0;
			}

			const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			return sort.direction === 'desc' ? -comparison : comparison;
		});
	}

	/**
	 * Save index to file
	 */
	async saveIndex(
		filePath: string,
		options: IndexPersistenceOptions = {
			format: 'json',
			compress: false,
			includeContent: false,
		},
	): Promise<void> {
		if (!this.index) {
			throw new IndexingError('No index to save');
		}

		try {
			const indexData = {
				metadata: this.index.metadata,
				files: Array.from(this.index.files.entries()),
				dependencies: {
					nodes: Array.from(this.index.dependencies.nodes.entries()),
					edges: this.index.dependencies.edges,
					cycles: this.index.dependencies.cycles,
					metrics: this.index.dependencies.metrics,
				},
				patterns: this.index.patterns,
				exports: Array.from(this.index.exports.entries()),
			};

			const content =
				options.format === 'yaml'
					? require('yaml').stringify(indexData)
					: JSON.stringify(indexData, null, 2);

			await FileUtils.writeFile(filePath, content, {createDirectories: true});
		} catch (error) {
			throw new IndexingError(
				`Failed to save index to ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Load index from file
	 */
	async loadIndex(filePath: string): Promise<ProjectIndex> {
		try {
			const content = await FileUtils.readFile(filePath);
			const indexData =
				filePath.endsWith('.yaml') || filePath.endsWith('.yml')
					? require('yaml').parse(content)
					: JSON.parse(content);

			this.index = {
				metadata: indexData.metadata,
				files: new Map(indexData.files),
				dependencies: {
					nodes: new Map(indexData.dependencies.nodes),
					edges: indexData.dependencies.edges,
					cycles: indexData.dependencies.cycles,
					metrics: indexData.dependencies.metrics,
				},
				patterns: indexData.patterns,
				exports: new Map(indexData.exports),
			};

			return this.index;
		} catch (error) {
			throw new IndexingError(
				`Failed to load index from ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Get current index
	 */
	getIndex(): ProjectIndex | null {
		return this.index;
	}

	/**
	 * Add a language parser
	 */
	addParser(language: string, parser: LanguageParser): void {
		this.parsers.set(language, parser);
	}

	/**
	 * Get project statistics
	 */
	getProjectStats(): any {
		if (!this.index) return null;

		const filesByType = new Map<string, number>();
		const complexityDistribution = new Map<string, number>();

		for (const file of this.index.files.values()) {
			filesByType.set(file.type, (filesByType.get(file.type) || 0) + 1);

			const complexity = file.complexity.cyclomatic;
			const range =
				complexity < 5 ? 'low' : complexity < 10 ? 'medium' : 'high';
			complexityDistribution.set(
				range,
				(complexityDistribution.get(range) || 0) + 1,
			);
		}

		return {
			metadata: this.index.metadata,
			filesByType: Object.fromEntries(filesByType),
			complexityDistribution: Object.fromEntries(complexityDistribution),
			dependencies: this.index.dependencies.metrics,
			patterns: this.index.patterns.length,
		};
	}
}
