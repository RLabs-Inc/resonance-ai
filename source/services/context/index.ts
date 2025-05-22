// Context System - Phase 3 Exports
export { PatternMatcher } from './PatternMatcher.js';
export { RelevanceCalculator, type RelevanceFactors, type RelevanceWeights } from './RelevanceCalculator.js';
export { ContextService, type ContextOptions } from './ContextService.js';
export { CodeExtractor, type ExtractionOptions } from './CodeExtractor.js';

// Re-export core types for convenience
export type {
  ContextPattern,
  ContextRequest,
  ContextPackage,
  RelevanceScore,
  CodeSection,
  ExtractionCriteria
} from '../../core/types.js';