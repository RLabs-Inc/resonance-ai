import {
	FileInfo,
	ContextPackage,
	ContextRequest,
	RelevanceScore,
	ContextPattern,
	ProjectIndex,
} from '../../core/types.js';
import {ResonanceError, ContextError} from '../../core/errors.js';
import {EventBus} from '../../core/events.js';
import {PatternMatcher} from './PatternMatcher.js';
import {RelevanceCalculator, RelevanceFactors} from './RelevanceCalculator.js';
import {TextUtils} from '../../utils/text-utils.js';

export interface ContextOptions {
	maxFiles?: number;
	relevanceThreshold?: number;
	includePatterns?: boolean;
	includeDependencies?: boolean;
	prioritizeRecent?: boolean;
	customWeights?: Partial<import('./RelevanceCalculator.js').RelevanceWeights>;
}

export class ContextService {
	private readonly patternMatcher: PatternMatcher;
	private readonly relevanceCalculator: RelevanceCalculator;
	private readonly eventBus: EventBus;

	constructor(
		eventBus: EventBus,
		options: {
			customWeights?: Partial<
				import('./RelevanceCalculator.js').RelevanceWeights
			>;
		} = {},
	) {
		this.eventBus = eventBus;
		this.patternMatcher = new PatternMatcher();
		this.relevanceCalculator = new RelevanceCalculator(options.customWeights);
	}

	/**
	 * Compile context package for a specific task or query
	 */
	async compileContext(
		request: ContextRequest,
		projectIndex: ProjectIndex,
		options: ContextOptions = {},
	): Promise<ContextPackage> {
		try {
			this.eventBus.emit('context:compilation:started', {request});

			const startTime = Date.now();

			// Parse and analyze the request
			const analyzedRequest = this.analyzeRequest(request);

			// Build relevance factors from the request
			const relevanceFactors = this.buildRelevanceFactors(
				analyzedRequest,
				projectIndex,
			);

			// Get all indexed files
			const allFiles = Object.values(projectIndex.files);

			// Calculate relevance scores
			const relevanceScores = this.relevanceCalculator.calculateBatchRelevance(
				allFiles,
				relevanceFactors,
			);

			// Filter and limit results
			const relevantFiles = this.filterAndLimitFiles(relevanceScores, options);

			// Detect patterns in relevant files
			const detectedPatterns =
				options.includePatterns !== false
					? this.detectRelevantPatterns(relevantFiles, allFiles)
					: [];

			// Build dependency information
			const dependencies =
				options.includeDependencies !== false
					? this.buildDependencyInfo(relevantFiles, projectIndex)
					: {};

			// Create context package
			const contextPackage: ContextPackage = {
				id: this.generateContextId(request),
				request: analyzedRequest,
				summary: this.generateSummary(analyzedRequest, relevantFiles),
				relevantFiles: relevantFiles.map(score => ({
					file: score.file,
					relevance: score.score,
					reason: score.reasons.join('; '),
					keyElements: this.extractKeyElements(
						allFiles.find(f => f.path === score.file)!,
					),
					patterns: allFiles.find(f => f.path === score.file)?.patterns || [],
				})),
				relationships: dependencies,
				detectedPatterns,
				implementationGuidance: this.generateImplementationGuidance(
					analyzedRequest,
					relevantFiles,
					detectedPatterns,
					projectIndex,
				),
				metadata: {
					createdAt: new Date(),
					compilationTime: Date.now() - startTime,
					totalFilesAnalyzed: allFiles.length,
					filesIncluded: relevantFiles.length,
					confidence: this.calculateOverallConfidence(relevantFiles),
				},
			};

			this.eventBus.emit('context:compilation:completed', {
				contextPackage,
				compilationTime: Date.now() - startTime,
			});

			return contextPackage;
		} catch (error) {
			this.eventBus.emit('context:compilation:failed', {request, error});
			throw new ContextError(
				`Failed to compile context for request: ${request.description}`,
				'CONTEXT_COMPILATION_FAILED',
				{request},
				error,
			);
		}
	}

	/**
	 * Update context with new information
	 */
	async updateContext(
		contextId: string,
		updates: Partial<ContextRequest>,
		projectIndex: ProjectIndex,
		options: ContextOptions = {},
	): Promise<ContextPackage> {
		// For MVP, we'll regenerate the full context
		// In future versions, this could be optimized for incremental updates
		const updatedRequest: ContextRequest = {
			description: updates.description || `Updated context ${contextId}`,
			scope: updates.scope,
			taskType: updates.taskType || 'update',
			constraints: updates.constraints,
			examples: updates.examples,
		};

		return this.compileContext(updatedRequest, projectIndex, options);
	}

	/**
	 * Get context suggestions based on current state
	 */
	suggestContext(
		currentFiles: string[],
		projectIndex: ProjectIndex,
		limit: number = 5,
	): string[] {
		const suggestions: string[] = [];

		// Suggest related files through dependencies
		for (const filePath of currentFiles) {
			const file = projectIndex.files[filePath];
			if (!file) continue;

			// Add imported files
			for (const importPath of file.imports || []) {
				const resolvedPath = this.resolveImportPath(importPath, projectIndex);
				if (resolvedPath && !currentFiles.includes(resolvedPath)) {
					suggestions.push(resolvedPath);
				}
			}

			// Add files that import this one
			for (const [path, otherFile] of Object.entries(projectIndex.files)) {
				if (
					otherFile.imports?.some(
						imp => this.resolveImportPath(imp, projectIndex) === filePath,
					)
				) {
					if (!currentFiles.includes(path)) {
						suggestions.push(path);
					}
				}
			}
		}

		// Remove duplicates and limit
		return [...new Set(suggestions)].slice(0, limit);
	}

	private analyzeRequest(request: ContextRequest): ContextRequest {
		// For MVP, return as-is with some basic analysis
		// Future versions could use NLP for deeper analysis
		return {
			...request,
			description: request.description.trim(),
			taskType: request.taskType || this.inferTaskType(request.description),
		};
	}

	private inferTaskType(description: string): string {
		const lowerDesc = description.toLowerCase();

		if (
			lowerDesc.includes('add') ||
			lowerDesc.includes('create') ||
			lowerDesc.includes('implement')
		) {
			return 'feature';
		}
		if (
			lowerDesc.includes('fix') ||
			lowerDesc.includes('bug') ||
			lowerDesc.includes('error')
		) {
			return 'bugfix';
		}
		if (
			lowerDesc.includes('refactor') ||
			lowerDesc.includes('improve') ||
			lowerDesc.includes('optimize')
		) {
			return 'refactor';
		}
		if (lowerDesc.includes('test')) {
			return 'test';
		}
		if (lowerDesc.includes('update') || lowerDesc.includes('modify')) {
			return 'update';
		}

		return 'analysis';
	}

	private buildRelevanceFactors(
		request: ContextRequest,
		projectIndex: ProjectIndex,
	): RelevanceFactors {
		const keywords = TextUtils.extractKeywords(request.description).map(k => k.word);

		// Add scope-based keywords if provided
		if (request.scope) {
			keywords.push(...TextUtils.extractKeywords(request.scope).map(k => k.word));
		}

		// Add constraint-based keywords
		if (request.constraints) {
			for (const constraint of request.constraints) {
				keywords.push(...TextUtils.extractKeywords(constraint).map(k => k.word));
			}
		}

		// Detect relevant patterns from the request
		const relevantPatterns: ContextPattern[] = [];
		if (request.taskType === 'feature') {
			relevantPatterns.push(
				{type: 'structural', name: 'service', confidence: 0.8},
				{type: 'code', name: 'error-handling', confidence: 0.7},
			);
		}

		// Infer target file types based on the request
		const fileTypes: string[] = [];
		if (keywords.some(k => ['test', 'spec'].includes(k.toLowerCase()))) {
			fileTypes.push('ts', 'test.ts', 'spec.ts');
		}
		if (keywords.some(k => ['config', 'setting'].includes(k.toLowerCase()))) {
			fileTypes.push('json', 'yaml', 'yml');
		}
		if (request.taskType === 'feature') {
			fileTypes.push('ts', 'tsx');
		}

		return {
			keywords: [...new Set(keywords)],
			patterns: relevantPatterns,
			fileTypes,
			dependencies: [],
			recency: new Date(),
		};
	}

	private filterAndLimitFiles(
		relevanceScores: RelevanceScore[],
		options: ContextOptions,
	): RelevanceScore[] {
		const threshold = options.relevanceThreshold || 0.3;
		const maxFiles = options.maxFiles || 15;

		return relevanceScores
			.filter(score => score.score >= threshold)
			.slice(0, maxFiles);
	}

	private detectRelevantPatterns(
		relevantFiles: RelevanceScore[],
		allFiles: FileInfo[],
	): ContextPattern[] {
		const patterns: ContextPattern[] = [];
		const relevantFilePaths = new Set(relevantFiles.map(rf => rf.file));

		// Collect patterns from relevant files
		for (const file of allFiles) {
			if (relevantFilePaths.has(file.path)) {
				patterns.push(...(file.patterns || []));
			}
		}

		// Deduplicate and sort by confidence
		const uniquePatterns = new Map<string, ContextPattern>();
		for (const pattern of patterns) {
			const key = `${pattern.type}:${pattern.name}`;
			const existing = uniquePatterns.get(key);
			if (!existing || pattern.confidence > existing.confidence) {
				uniquePatterns.set(key, pattern);
			}
		}

		return Array.from(uniquePatterns.values())
			.sort((a, b) => b.confidence - a.confidence)
			.slice(0, 10); // Limit to top 10 patterns
	}

	private buildDependencyInfo(
		relevantFiles: RelevanceScore[],
		projectIndex: ProjectIndex,
	): Record<string, string[]> {
		const dependencies: Record<string, string[]> = {};

		for (const relevantFile of relevantFiles) {
			const file = projectIndex.files[relevantFile.file];
			if (!file) continue;

			const fileDependencies: string[] = [];

			// Add direct dependencies
			for (const importPath of file.imports || []) {
				const resolvedPath = this.resolveImportPath(importPath, projectIndex);
				if (resolvedPath) {
					fileDependencies.push(resolvedPath);
				}
			}

			// Add reverse dependencies (files that depend on this one)
			for (const [path, otherFile] of Object.entries(projectIndex.files)) {
				if (
					otherFile.imports?.some(
						imp => this.resolveImportPath(imp, projectIndex) === file.path,
					)
				) {
					fileDependencies.push(path);
				}
			}

			if (fileDependencies.length > 0) {
				dependencies[relevantFile.file] = [...new Set(fileDependencies)];
			}
		}

		return dependencies;
	}

	private extractKeyElements(file: FileInfo): string[] {
		const elements: string[] = [];

		// Add main exports
		if (file.exports) {
			elements.push(...file.exports.map(exp => `export: ${exp}`));
		}

		// Add main functions/classes (simplified for MVP)
		if (file.functions) {
			elements.push(...file.functions.slice(0, 3).map(fn => `function: ${fn}`));
		}

		return elements.slice(0, 5); // Limit to top 5 elements
	}

	private generateSummary(
		request: ContextRequest,
		relevantFiles: RelevanceScore[],
	): string {
		const fileCount = relevantFiles.length;
		const taskType = request.taskType || 'task';

		return (
			`Context for ${taskType}: ${request.description}. ` +
			`Found ${fileCount} relevant files with average relevance ${
				fileCount > 0
					? (
							relevantFiles.reduce((sum, f) => sum + f.score, 0) / fileCount
					  ).toFixed(2)
					: '0.00'
			}.`
		);
	}

	private generateImplementationGuidance(
		request: ContextRequest,
		relevantFiles: RelevanceScore[],
		patterns: ContextPattern[],
		projectIndex: ProjectIndex,
	): string {
		const guidance: string[] = [];

		// Basic guidance based on task type
		switch (request.taskType) {
			case 'feature':
				guidance.push(
					'1. Follow existing service patterns for new functionality',
				);
				guidance.push('2. Implement proper error handling and validation');
				guidance.push('3. Add appropriate type definitions');
				break;
			case 'bugfix':
				guidance.push('1. Identify the root cause in the relevant files');
				guidance.push('2. Apply minimal, targeted fixes');
				guidance.push("3. Ensure fix doesn't break existing functionality");
				break;
			case 'refactor':
				guidance.push('1. Maintain existing interfaces and contracts');
				guidance.push('2. Improve code structure while preserving behavior');
				guidance.push('3. Update tests and documentation as needed');
				break;
			default:
				guidance.push(
					'1. Review the relevant files to understand current implementation',
				);
				guidance.push('2. Follow established patterns and conventions');
		}

		// Add pattern-specific guidance
		const servicePattern = patterns.find(p => p.name === 'service');
		if (servicePattern && servicePattern.confidence > 0.7) {
			guidance.push(
				'4. Follow the established service pattern with dependency injection',
			);
		}

		const errorPattern = patterns.find(p => p.name === 'error-handling');
		if (errorPattern && errorPattern.confidence > 0.7) {
			guidance.push(
				'5. Use the established error handling patterns with proper error context',
			);
		}

		return guidance.join('\n');
	}

	private calculateOverallConfidence(relevantFiles: RelevanceScore[]): number {
		if (relevantFiles.length === 0) return 0;

		const avgConfidence =
			relevantFiles.reduce((sum, f) => sum + f.confidence, 0) /
			relevantFiles.length;
		const scoreConfidence =
			relevantFiles.reduce((sum, f) => sum + f.score, 0) / relevantFiles.length;

		return (avgConfidence + scoreConfidence) / 2;
	}

	private resolveImportPath(
		importPath: string,
		projectIndex: ProjectIndex,
	): string | null {
		// Simplified import resolution for MVP
		// In a full implementation, this would handle relative paths, aliases, etc.

		// Try direct match first
		if (projectIndex.files[importPath]) {
			return importPath;
		}

		// Try with common extensions
		for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
			const withExt = importPath + ext;
			if (projectIndex.files[withExt]) {
				return withExt;
			}
		}

		// Try index files
		for (const indexFile of ['/index.ts', '/index.tsx', '/index.js']) {
			const indexPath = importPath + indexFile;
			if (projectIndex.files[indexPath]) {
				return indexPath;
			}
		}

		return null;
	}

	private generateContextId(request: ContextRequest): string {
		const timestamp = Date.now().toString(36);
		const hash = request.description
			.replace(/[^a-zA-Z0-9]/g, '')
			.substring(0, 8)
			.toLowerCase();
		return `ctx_${hash}_${timestamp}`;
	}
}

export default ContextService;
