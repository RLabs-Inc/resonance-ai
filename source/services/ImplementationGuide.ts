/**
 * ImplementationGuide - Task-Specific Implementation Guidance
 * 
 * Provides Claude with specific guidance on how to implement features
 * while respecting existing patterns and architecture.
 */

import type { 
  ResonanceConfig, 
  CodeFile, 
  Pattern, 
  ProjectUnderstanding,
  ContextRequest 
} from '../core/types.js';
import { ProjectReader } from './ProjectReader.js';
import { RelevanceCalculator } from './RelevanceCalculator.js';

export interface ImplementationStep {
  readonly step: number;
  readonly action: string;
  readonly description: string;
  readonly files: string[];
  readonly pattern?: string;
}

export interface ImplementationGuidance {
  readonly task: string;
  readonly approach: string;
  readonly filesToModify: string[];
  readonly filesToCreate: string[];
  readonly patternsToFollow: Pattern[];
  readonly steps: ImplementationStep[];
  readonly integrationPoints: string[];
  readonly constraints: string[];
  readonly examples: string[];
  readonly confidence: number;
}

export class ImplementationGuide {
  private readonly config: ResonanceConfig;
  private readonly projectReader: ProjectReader;
  private readonly relevanceCalculator: RelevanceCalculator;

  constructor(config: ResonanceConfig) {
    this.config = config;
    this.projectReader = new ProjectReader(config);
    this.relevanceCalculator = new RelevanceCalculator(config);
  }

  /**
   * Generate implementation guidance for a specific task
   */
  async generateGuidance(
    task: string, 
    projectPath: string = process.cwd()
  ): Promise<ImplementationGuidance> {
    // Step 1: Understand the project
    const understanding = await this.projectReader.readProject(projectPath);
    
    // Step 2: Find relevant context
    const contextRequest: ContextRequest = {
      query: task,
      maxFiles: 10
    };
    const relevantFiles = this.relevanceCalculator.calculateRelevance(
      understanding.files, 
      contextRequest
    );

    // Step 3: Analyze the task and generate guidance
    return this.analyzeTaskAndGenerateGuidance(task, understanding, relevantFiles);
  }

  /**
   * Analyze task and generate specific implementation guidance
   */
  private analyzeTaskAndGenerateGuidance(
    task: string,
    understanding: ProjectUnderstanding,
    relevantFiles: any[]
  ): ImplementationGuidance {
    const taskType = this.determineTaskType(task);
    const patterns = this.identifyRelevantPatterns(task, understanding.patterns);
    const approach = this.determineApproach(taskType, patterns);
    const steps = this.generateImplementationSteps(taskType, patterns, relevantFiles);
    
    return {
      task,
      approach,
      filesToModify: this.identifyFilesToModify(relevantFiles, taskType),
      filesToCreate: this.identifyFilesToCreate(task, understanding),
      patternsToFollow: patterns,
      steps,
      integrationPoints: this.identifyIntegrationPoints(relevantFiles),
      constraints: this.identifyConstraints(patterns, understanding),
      examples: this.findSimilarImplementations(task, understanding),
      confidence: this.calculateConfidence(relevantFiles, patterns)
    };
  }

  /**
   * Determine what type of task this is
   */
  private determineTaskType(task: string): string {
    const taskLower = task.toLowerCase();
    
    if (taskLower.includes('add') || taskLower.includes('create') || taskLower.includes('new')) {
      return 'feature_addition';
    }
    if (taskLower.includes('fix') || taskLower.includes('bug') || taskLower.includes('error')) {
      return 'bug_fix';
    }
    if (taskLower.includes('refactor') || taskLower.includes('improve') || taskLower.includes('optimize')) {
      return 'refactoring';
    }
    if (taskLower.includes('test') || taskLower.includes('spec')) {
      return 'testing';
    }
    
    return 'general_enhancement';
  }

  /**
   * Identify patterns that are relevant to this task
   */
  private identifyRelevantPatterns(task: string, patterns: Pattern[]): Pattern[] {
    const taskTerms = task.toLowerCase().split(/\s+/);
    
    return patterns.filter(pattern => {
      const patternText = `${pattern.name} ${pattern.description}`.toLowerCase();
      return taskTerms.some(term => patternText.includes(term)) || 
             pattern.confidence > 0.8; // Include high-confidence patterns
    }).slice(0, 3); // Limit to top 3 patterns
  }

  /**
   * Determine the overall approach for this task
   */
  private determineApproach(taskType: string, patterns: Pattern[]): string {
    switch (taskType) {
      case 'feature_addition':
        return this.generateFeatureApproach(patterns);
      case 'bug_fix':
        return 'Identify the root cause, create a minimal fix that follows existing patterns, and add tests to prevent regression.';
      case 'refactoring':
        return 'Improve code structure while maintaining existing behavior. Follow established patterns and ensure no breaking changes.';
      case 'testing':
        return 'Create comprehensive tests following the existing test patterns. Focus on edge cases and integration points.';
      default:
        return 'Analyze the existing codebase patterns and implement the enhancement following established conventions.';
    }
  }

  /**
   * Generate approach for feature addition
   */
  private generateFeatureApproach(patterns: Pattern[]): string {
    if (patterns.length === 0) {
      return 'Add the new feature following the existing code organization and naming conventions.';
    }

    const patternNames = patterns.map(p => p.name).join(', ');
    return `Implement the feature following the established ${patternNames} pattern(s). Integrate with existing services and maintain consistent architecture.`;
  }

  /**
   * Generate step-by-step implementation plan
   */
  private generateImplementationSteps(
    taskType: string, 
    patterns: Pattern[], 
    relevantFiles: any[]
  ): ImplementationStep[] {
    const steps: ImplementationStep[] = [];
    let stepNumber = 1;

    // Always start with understanding
    steps.push({
      step: stepNumber++,
      action: 'analyze',
      description: 'Review the relevant files to understand current implementation patterns',
      files: relevantFiles.slice(0, 3).map(f => f.file.path)
    });

    // Task-specific steps
    if (taskType === 'feature_addition') {
      if (patterns.length > 0) {
        steps.push({
          step: stepNumber++,
          action: 'follow_pattern',
          description: `Follow the ${patterns[0].name} pattern used in the codebase`,
          files: patterns[0].examples.slice(0, 2),
          pattern: patterns[0].name
        });
      }

      steps.push({
        step: stepNumber++,
        action: 'implement',
        description: 'Create the core implementation following existing conventions',
        files: []
      });

      steps.push({
        step: stepNumber++,
        action: 'integrate',
        description: 'Integrate with existing services and update related components',
        files: relevantFiles.slice(0, 2).map(f => f.file.path)
      });
    }

    // Always end with testing
    steps.push({
      step: stepNumber++,
      action: 'test',
      description: 'Add tests following the existing test patterns',
      files: []
    });

    return steps;
  }

  /**
   * Identify files that need to be modified
   */
  private identifyFilesToModify(relevantFiles: any[], taskType: string): string[] {
    if (taskType === 'bug_fix') {
      return relevantFiles.slice(0, 2).map(f => f.file.path);
    }
    
    return relevantFiles.slice(0, 3).map(f => f.file.path);
  }

  /**
   * Identify new files that need to be created
   */
  private identifyFilesToCreate(task: string, understanding: ProjectUnderstanding): string[] {
    const taskLower = task.toLowerCase();
    const files: string[] = [];
    
    // Look at existing file patterns to suggest new file names
    const existingFiles = Object.keys(understanding.files);
    const serviceFiles = existingFiles.filter(f => f.includes('Service') || f.includes('service'));
    const testFiles = existingFiles.filter(f => f.includes('.test.') || f.includes('.spec.'));
    
    if (taskLower.includes('service') || taskLower.includes('feature')) {
      // Suggest service file based on existing patterns
      if (serviceFiles.length > 0) {
        const serviceDir = serviceFiles[0].split('/').slice(0, -1).join('/');
        files.push(`${serviceDir}/NewFeatureService.ts`);
      }
    }
    
    // Always suggest tests
    if (testFiles.length > 0) {
      const testPattern = testFiles[0].includes('.test.') ? '.test.ts' : '.spec.ts';
      files.push(`NewFeature${testPattern}`);
    }
    
    return files;
  }

  /**
   * Identify integration points
   */
  private identifyIntegrationPoints(relevantFiles: any[]): string[] {
    return relevantFiles
      .slice(0, 3)
      .map(f => `Integration with ${f.file.path}`)
      .concat(['Update related imports', 'Add to main exports']);
  }

  /**
   * Identify architectural constraints
   */
  private identifyConstraints(patterns: Pattern[], understanding: ProjectUnderstanding): string[] {
    const constraints: string[] = [
      'Follow existing code style and naming conventions',
      'Maintain backward compatibility',
      'Add appropriate error handling'
    ];

    // Add pattern-specific constraints
    patterns.forEach(pattern => {
      constraints.push(`Follow the ${pattern.name} pattern established in the codebase`);
    });

    return constraints;
  }

  /**
   * Find similar implementations for reference
   */
  private findSimilarImplementations(task: string, understanding: ProjectUnderstanding): string[] {
    const taskTerms = task.toLowerCase().split(/\s+/);
    const examples: string[] = [];
    
    Object.values(understanding.files).forEach(file => {
      const fileName = file.path.toLowerCase();
      const hasRelevantTerm = taskTerms.some(term => 
        fileName.includes(term) || 
        file.content.toLowerCase().includes(term)
      );
      
      if (hasRelevantTerm && examples.length < 3) {
        examples.push(file.path);
      }
    });
    
    return examples;
  }

  /**
   * Calculate confidence in the guidance
   */
  private calculateConfidence(relevantFiles: any[], patterns: Pattern[]): number {
    let confidence = 0.5; // Base confidence
    
    // Higher confidence with more relevant files
    confidence += Math.min(relevantFiles.length * 0.1, 0.3);
    
    // Higher confidence with established patterns
    confidence += Math.min(patterns.length * 0.1, 0.2);
    
    // Average pattern confidence
    if (patterns.length > 0) {
      const avgPatternConfidence = patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length;
      confidence = (confidence + avgPatternConfidence) / 2;
    }
    
    return Math.min(confidence, 1.0);
  }
}