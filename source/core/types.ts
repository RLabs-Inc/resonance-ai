/**
 * Resonance-AI Core Types
 * 
 * Clean, consistent type definitions with no workarounds.
 * Every type represents a clear concept in our domain.
 */

// ============================================================================
// FILE SYSTEM TYPES - Clean and Simple
// ============================================================================

export interface CodeFile {
  readonly path: string;
  readonly name: string;
  readonly content: string;
  readonly lastModified: Date;
  readonly size: number;
  readonly type: FileType;
}

export type FileType = 
  | 'typescript' 
  | 'javascript' 
  | 'json' 
  | 'markdown' 
  | 'yaml' 
  | 'unknown';

// ============================================================================
// PROJECT UNDERSTANDING - Records, not Maps
// ============================================================================

export interface ProjectUnderstanding {
  readonly rootPath: string;
  readonly files: Record<string, CodeFile>;
  readonly patterns: Pattern[];
  readonly createdAt: Date;
}

export interface Pattern {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly confidence: number;
  readonly examples: string[];
}

// ============================================================================
// CONTEXT AND RELEVANCE - Clear Purpose
// ============================================================================

export interface ContextRequest {
  readonly query: string;
  readonly maxFiles?: number;
  readonly minRelevance?: number;
}

export interface RelevantFile {
  readonly file: CodeFile;
  readonly relevanceScore: number;
  readonly reasons: string[];
}

export interface ContextResponse {
  readonly request: ContextRequest;
  readonly files: RelevantFile[];
  readonly summary: string;
  readonly createdAt: Date;
}

// ============================================================================
// CONFIGURATION - Simple and Typed
// ============================================================================

export interface ResonanceConfig {
  readonly indexing: {
    readonly includePatterns: string[];
    readonly excludePatterns: string[];
    readonly maxFileSize: number;
  };
  readonly relevance: {
    readonly defaultThreshold: number;
    readonly maxFiles: number;
  };
  readonly api?: {
    readonly anthropicKey: string;
  };
}

// ============================================================================
// EVENTS AND ERRORS - Clear Communication
// ============================================================================

export interface IndexingProgress {
  readonly phase: 'scanning' | 'parsing' | 'analyzing' | 'complete';
  readonly filesProcessed: number;
  readonly totalFiles: number;
  readonly currentFile?: string;
}

export class ResonanceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ResonanceError';
  }
}