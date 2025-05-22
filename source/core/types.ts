/**
 * Core type definitions for GuardianAI MVP
 *
 * This file defines all the fundamental types used throughout the application.
 * These types are designed specifically for Claude's cognitive patterns and needs.
 */

export interface ProjectIndex {
	metadata: ProjectMetadata;
	files: Map<string, FileInfo>;
	dependencies: DependencyGraph;
	patterns: Pattern[];
	exports: Map<string, ExportInfo[]>;
}

export interface ProjectMetadata {
	version: string;
	created: Date;
	lastUpdated: Date;
	rootPath: string;
	totalFiles: number;
	totalLines: number;
	languages: string[];
}

export interface FileInfo {
	path: string;
	relativePath: string;
	type: string;
	size: number;
	lines: number;
	lastModified: Date;
	checksum: string;

	// Parsed structure
	imports: ImportInfo[];
	exports: ExportInfo[];
	functions: FunctionInfo[];
	classes: ClassInfo[];
	interfaces: InterfaceInfo[];
	types: TypeInfo[];

	// Analysis results
	patterns: PatternMatch[];
	complexity: ComplexityMetrics;
	dependencies: string[];
}

export interface ImportInfo {
	module: string;
	imported: string[];
	importType: 'default' | 'named' | 'namespace' | 'side-effect';
	line: number;
	resolvedPath?: string;
}

export interface ExportInfo {
	name: string;
	type: 'function' | 'class' | 'interface' | 'type' | 'variable' | 'default';
	line: number;
	signature?: string;
}

export interface FunctionInfo {
	name: string;
	parameters: ParameterInfo[];
	returnType?: string;
	line: number;
	endLine: number;
	isAsync: boolean;
	isExported: boolean;
	complexity: number;
}

export interface ParameterInfo {
	name: string;
	type?: string;
	isOptional: boolean;
	defaultValue?: string;
}

export interface ClassInfo {
	name: string;
	extends?: string;
	implements: string[];
	methods: FunctionInfo[];
	properties: PropertyInfo[];
	line: number;
	endLine: number;
	isExported: boolean;
}

export interface PropertyInfo {
	name: string;
	type?: string;
	isOptional: boolean;
	isStatic: boolean;
	isReadonly: boolean;
	line: number;
}

export interface InterfaceInfo {
	name: string;
	extends: string[];
	methods: MethodSignature[];
	properties: PropertySignature[];
	line: number;
	endLine: number;
	isExported: boolean;
}

export interface MethodSignature {
	name: string;
	parameters: ParameterInfo[];
	returnType?: string;
	isOptional: boolean;
}

export interface PropertySignature {
	name: string;
	type?: string;
	isOptional: boolean;
	isReadonly: boolean;
}

export interface TypeInfo {
	name: string;
	definition: string;
	line: number;
	isExported: boolean;
}

export interface ComplexityMetrics {
	cyclomatic: number;
	cognitive: number;
	maintainability: number;
	halstead: HalsteadMetrics;
}

export interface HalsteadMetrics {
	vocabulary: number;
	length: number;
	difficulty: number;
	effort: number;
}

export interface PatternMatch {
	patternId: string;
	confidence: number;
	location: CodeLocation;
	evidence: string[];
}

export interface CodeLocation {
	line: number;
	column?: number;
	endLine?: number;
	endColumn?: number;
}

export interface Pattern {
	id: string;
	name: string;
	description: string;
	category: string;
	examples: CodeExample[];
	indicators: PatternIndicator[];
	confidence: number;
}

export interface CodeExample {
	title: string;
	description: string;
	code: string;
	file: string;
	lines: [number, number];
	explanation: string;
}

export interface PatternIndicator {
	type: 'naming' | 'structure' | 'import' | 'usage';
	pattern: string | RegExp;
	weight: number;
}

export interface DependencyGraph {
	nodes: Map<string, DependencyNode>;
	edges: DependencyEdge[];
	cycles: string[][];
	metrics: DependencyMetrics;
}

export interface DependencyNode {
	file: string;
	inDegree: number;
	outDegree: number;
	rank: number;
}

export interface DependencyEdge {
	from: string;
	to: string;
	type: 'import' | 'require' | 'reference';
	weight: number;
}

export interface DependencyMetrics {
	totalNodes: number;
	totalEdges: number;
	cycleCount: number;
	maxDepth: number;
	averageDependencies: number;
}

export interface ContextPackage {
	task: TaskDefinition;
	relevantFiles: RelevantFile[];
	patterns: RelevantPattern[];
	architecture: ArchitectureInfo;
	recommendations: Recommendation[];
	generatedAt: Date;
}

export interface TaskDefinition {
	description: string;
	type: 'feature' | 'bugfix' | 'refactor' | 'test';
	scope: string[];
	constraints: string[];
}

export interface RelevantFile {
	path: string;
	relevance: number;
	reason: string;
	sections: CodeSection[];
	patterns: string[];
}

export interface CodeSection {
	title: string;
	content: string;
	lines: [number, number];
	importance: number;
}

export interface RelevantPattern {
	pattern: Pattern;
	usage: PatternUsage[];
	relevance: number;
	examples: CodeExample[];
}

export interface PatternUsage {
	file: string;
	locations: CodeLocation[];
	confidence: number;
}

export interface ArchitectureInfo {
	overview: string;
	layers: ArchitectureLayer[];
	patterns: string[];
	dependencies: ArchitectureDependency[];
	constraints: string[];
}

export interface ArchitectureLayer {
	name: string;
	description: string;
	files: string[];
	responsibilities: string[];
}

export interface ArchitectureDependency {
	from: string;
	to: string;
	type: 'uses' | 'extends' | 'implements' | 'configures';
	description: string;
}

export interface Recommendation {
	type: 'pattern' | 'architecture' | 'implementation' | 'testing';
	priority: 'high' | 'medium' | 'low';
	title: string;
	description: string;
	rationale: string;
	examples?: CodeExample[];
}

export interface ImplementationBrief {
	task: TaskDefinition;
	context: ContextSummary;
	architecture: ArchitectureGuidance;
	patterns: PatternGuidance[];
	implementation: ImplementationGuidance;
	testing: TestingGuidance;
	generatedAt: Date;
}

export interface ContextSummary {
	totalFiles: number;
	keyFiles: string[];
	mainPatterns: string[];
	architectureOverview: string;
	constraints: string[];
}

export interface ArchitectureGuidance {
	approach: string;
	integration: IntegrationPoint[];
	constraints: ArchitectureConstraint[];
	considerations: string[];
}

export interface IntegrationPoint {
	component: string;
	method: string;
	description: string;
	example?: string;
}

export interface ArchitectureConstraint {
	type: 'dependency' | 'pattern' | 'structure' | 'performance';
	description: string;
	enforcement: string;
}

export interface PatternGuidance {
	pattern: Pattern;
	usage: string;
	implementation: string;
	examples: CodeExample[];
	warnings: string[];
}

export interface ImplementationGuidance {
	suggestedApproach: string;
	steps: ImplementationStep[];
	alternatives: Alternative[];
	considerations: string[];
}

export interface ImplementationStep {
	order: number;
	title: string;
	description: string;
	code?: string;
	files: string[];
	dependencies: string[];
}

export interface Alternative {
	title: string;
	description: string;
	pros: string[];
	cons: string[];
	when: string;
}

export interface TestingGuidance {
	strategy: string;
	unitTestRequirements: TestRequirement[];
	integrationTestRequirements: TestRequirement[];
	mockingGuidance: MockingGuidance[];
	coverageTargets: CoverageTarget[];
}

export interface TestRequirement {
	component: string;
	scenarios: string[];
	assertions: string[];
	setup?: string;
}

export interface MockingGuidance {
	target: string;
	approach: string;
	rationale: string;
	example?: string;
}

export interface CoverageTarget {
	type: 'line' | 'branch' | 'function';
	target: number;
	critical: boolean;
}

// Configuration types
export interface GuardianConfig {
	project: ProjectConfig;
	indexing: IndexingConfig;
	context: ContextConfig;
	patterns: PatternConfig;
	briefing: BriefingConfig;
	interface: InterfaceConfig;
	performance: PerformanceConfig;
}

export interface ProjectConfig {
	name: string;
	rootPath: string;
	exclude: string[];
	include: string[];
}

export interface IndexingConfig {
	languages: string[];
	maxFileSize: number;
	debounceMs: number;
	parseComments: boolean;
	generateHashes: boolean;
}

export interface ContextConfig {
	maxFiles: number;
	maxLinesPerFile: number;
	relevanceThreshold: number;
	includePatterns: boolean;
	includeArchitecture: boolean;
	includeTests: boolean;
}

export interface PatternConfig {
	autoDetect: boolean;
	customPatterns: string;
	confidenceThreshold: number;
	maxPatterns: number;
}

export interface BriefingConfig {
	templatePath: string;
	includeExamples: boolean;
	includeConstraints: boolean;
	verboseGuidance: boolean;
	maxBriefLength: number;
}

export interface InterfaceConfig {
	theme: 'dark' | 'light';
	verbose: boolean;
	autoRefresh: boolean;
	shortcuts: Record<string, string>;
}

export interface PerformanceConfig {
	cacheSize: number;
	maxMemoryMB: number;
	gcIntervalMs: number;
}

// Query and operation types
export interface IndexQuery {
	type: 'files' | 'dependencies' | 'patterns' | 'exports';
	filter?: QueryFilter;
	sort?: QuerySort;
	limit?: number;
}

export interface QueryFilter {
	fileType?: string;
	pattern?: string;
	hasPattern?: string;
	modifiedAfter?: Date;
	complexity?: {min?: number; max?: number};
}

export interface QuerySort {
	field: 'name' | 'size' | 'modified' | 'complexity' | 'relevance';
	direction: 'asc' | 'desc';
}

export interface IndexResult {
	files: FileInfo[];
	patterns: Pattern[];
	dependencies: DependencyEdge[];
	metadata: SearchMetadata;
}

export interface SearchMetadata {
	totalResults: number;
	queryTime: number;
	filters: QueryFilter[];
}

// Event types for the event bus
export interface GuardianEvent {
	type: string;
	timestamp: Date;
	source: string;
	data: any;
}

export interface IndexingEvent extends GuardianEvent {
	type:
		| 'indexing.started'
		| 'indexing.progress'
		| 'indexing.completed'
		| 'indexing.failed';
	data: {
		projectPath?: string;
		filesProcessed?: number;
		totalFiles?: number;
		error?: Error;
	};
}

export interface ContextEvent extends GuardianEvent {
	type: 'context.started' | 'context.completed' | 'context.failed';
	data: {
		task?: TaskDefinition;
		filesAnalyzed?: number;
		relevantFiles?: number;
		error?: Error;
	};
}

export interface BriefingEvent extends GuardianEvent {
	type: 'briefing.started' | 'briefing.completed' | 'briefing.failed';
	data: {
		task?: TaskDefinition;
		briefLength?: number;
		templateUsed?: string;
		error?: Error;
	};
}

// Validation types
export interface ValidationResult {
	score: number;
	issues: ValidationIssue[];
	suggestions: string[];
	approved: boolean;
}

export interface ValidationIssue {
	type: 'pattern' | 'architecture' | 'integration' | 'quality';
	severity: 'error' | 'warning' | 'info';
	message: string;
	line?: number;
	suggestion?: string;
}

// Brief customization types
export interface BriefCustomization {
	includeExamples?: boolean;
	verboseGuidance?: boolean;
	focusAreas?: string[];
	excludePatterns?: string[];
	additionalContext?: string;
}

// Language parser types
export interface LanguageParser {
	language: string;
	extensions: string[];
	parse(content: string, filePath: string): Promise<FileInfo>;
	supports(filePath: string): boolean;
}

export interface ParseResult {
	success: boolean;
	fileInfo?: FileInfo;
	errors: ParseError[];
}

export interface ParseError {
	line: number;
	column: number;
	message: string;
	severity: 'error' | 'warning';
}
