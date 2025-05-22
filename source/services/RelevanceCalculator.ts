/**
 * RelevanceCalculator - Semantic File Relevance
 * 
 * Calculates how relevant files are to a query using multiple signals.
 * Clean implementation with no workarounds, clear scoring rationale.
 */

import { 
  CodeFile, 
  ContextRequest, 
  RelevantFile,
  ResonanceConfig 
} from '../core/types.js';

interface RelevanceSignals {
  nameMatch: number;
  contentMatch: number;
  pathMatch: number;
  typeRelevance: number;
  recencyBonus: number;
}

export class RelevanceCalculator {
  private readonly config: ResonanceConfig;

  constructor(config: ResonanceConfig) {
    this.config = config;
  }

  /**
   * Calculate relevance for all files and return sorted results
   */
  calculateRelevance(
    files: Record<string, CodeFile>, 
    request: ContextRequest
  ): RelevantFile[] {
    const queryTerms = this.extractQueryTerms(request.query);
    const relevantFiles: RelevantFile[] = [];
    
    Object.values(files).forEach(file => {
      const signals = this.calculateSignals(file, queryTerms);
      const score = this.combineSignals(signals);
      
      if (score >= (request.minRelevance ?? this.config.relevance.defaultThreshold)) {
        relevantFiles.push({
          file,
          relevanceScore: score,
          reasons: this.generateReasons(signals, queryTerms)
        });
      }
    });

    // Sort by relevance score (highest first)
    relevantFiles.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Limit results
    const maxFiles = request.maxFiles ?? this.config.relevance.maxFiles;
    return relevantFiles.slice(0, maxFiles);
  }

  /**
   * Extract meaningful terms from the query
   */
  private extractQueryTerms(query: string): string[] {
    return query
      .toLowerCase()
      .split(/\s+/)
      .map(term => term.replace(/[^\w]/g, ''))
      .filter(term => term.length > 2)
      .filter(term => !this.isStopWord(term));
  }

  /**
   * Calculate all relevance signals for a file
   */
  private calculateSignals(file: CodeFile, queryTerms: string[]): RelevanceSignals {
    return {
      nameMatch: this.calculateNameMatch(file, queryTerms),
      contentMatch: this.calculateContentMatch(file, queryTerms),
      pathMatch: this.calculatePathMatch(file, queryTerms),
      typeRelevance: this.calculateTypeRelevance(file, queryTerms),
      recencyBonus: this.calculateRecencyBonus(file)
    };
  }

  /**
   * Calculate name-based relevance
   */
  private calculateNameMatch(file: CodeFile, queryTerms: string[]): number {
    const fileName = file.name.toLowerCase();
    let matches = 0;
    
    queryTerms.forEach(term => {
      if (fileName.includes(term)) {
        // Exact match gets higher score
        matches += fileName === term ? 2 : 1;
      }
      
      // Check camelCase splitting
      const camelWords = this.splitCamelCase(file.name);
      camelWords.forEach(word => {
        if (word.toLowerCase().includes(term)) {
          matches += 0.5;
        }
      });
    });
    
    return Math.min(1.0, matches / queryTerms.length);
  }

  /**
   * Calculate content-based relevance
   */
  private calculateContentMatch(file: CodeFile, queryTerms: string[]): number {
    const content = file.content.toLowerCase();
    let totalMatches = 0;
    
    queryTerms.forEach(term => {
      const matches = (content.match(new RegExp(term, 'g')) || []).length;
      totalMatches += matches;
    });
    
    // Normalize by content length and query terms
    const normalizedScore = totalMatches / (file.content.length / 1000 + queryTerms.length);
    return Math.min(1.0, normalizedScore);
  }

  /**
   * Calculate path-based relevance
   */
  private calculatePathMatch(file: CodeFile, queryTerms: string[]): number {
    const pathLower = file.path.toLowerCase();
    let pathMatches = 0;
    
    queryTerms.forEach(term => {
      if (pathLower.includes(term)) {
        pathMatches++;
      }
    });
    
    return pathMatches / queryTerms.length;
  }

  /**
   * Calculate type-based relevance
   */
  private calculateTypeRelevance(file: CodeFile, queryTerms: string[]): number {
    // Higher relevance for certain file types based on query
    const typeScores = {
      typescript: 1.0,
      javascript: 0.9,
      json: 0.3,
      markdown: 0.5,
      yaml: 0.2,
      unknown: 0.1
    };
    
    let baseScore = typeScores[file.type];
    
    // Boost score if query mentions the file type
    if (queryTerms.some(term => 
      ['typescript', 'ts', 'javascript', 'js'].includes(term)
    )) {
      if (file.type === 'typescript' || file.type === 'javascript') {
        baseScore += 0.2;
      }
    }
    
    return Math.min(1.0, baseScore);
  }

  /**
   * Calculate recency bonus
   */
  private calculateRecencyBonus(file: CodeFile): number {
    const daysSinceModified = (Date.now() - file.lastModified.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceModified < 1) return 0.2;
    if (daysSinceModified < 7) return 0.1;
    if (daysSinceModified < 30) return 0.05;
    
    return 0;
  }

  /**
   * Combine all signals into final relevance score
   */
  private combineSignals(signals: RelevanceSignals): number {
    const weights = {
      nameMatch: 0.4,      // File name is very important
      contentMatch: 0.3,   // Content relevance matters
      pathMatch: 0.15,     // Path context helpful
      typeRelevance: 0.1,  // File type somewhat important
      recencyBonus: 0.05   // Recent files get small boost
    };
    
    return (
      signals.nameMatch * weights.nameMatch +
      signals.contentMatch * weights.contentMatch +
      signals.pathMatch * weights.pathMatch +
      signals.typeRelevance * weights.typeRelevance +
      signals.recencyBonus * weights.recencyBonus
    );
  }

  /**
   * Generate human-readable reasons for the relevance score
   */
  private generateReasons(signals: RelevanceSignals, queryTerms: string[]): string[] {
    const reasons: string[] = [];
    
    if (signals.nameMatch > 0.5) {
      reasons.push(`File name matches query terms: ${queryTerms.join(', ')}`);
    }
    
    if (signals.contentMatch > 0.3) {
      reasons.push('Content contains relevant terms');
    }
    
    if (signals.pathMatch > 0.5) {
      reasons.push('File path matches query context');
    }
    
    if (signals.typeRelevance > 0.8) {
      reasons.push('File type is highly relevant');
    }
    
    if (signals.recencyBonus > 0.1) {
      reasons.push('Recently modified file');
    }
    
    if (reasons.length === 0) {
      reasons.push('Basic relevance detected');
    }
    
    return reasons;
  }

  /**
   * Split camelCase strings into words
   */
  private splitCamelCase(text: string): string[] {
    return text.split(/(?=[A-Z])/).filter(word => word.length > 0);
  }

  /**
   * Check if word is a common stop word
   */
  private isStopWord(word: string): boolean {
    const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can'];
    return stopWords.includes(word.toLowerCase());
  }
}