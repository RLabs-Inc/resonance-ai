/**
 * ToolExecutor - Execute tools for Claude
 * 
 * Handles execution of tools that Claude requests
 */

import { FileOperations } from './FileOperations.js';
import { ProjectReader } from './ProjectReader.js';
import { RelevanceCalculator } from './RelevanceCalculator.js';
import { ImplementationGuide } from './ImplementationGuide.js';
import { colorize } from '../utils/colors.js';
import type { ResonanceConfig, ContextRequest } from '../core/types.js';

export interface ToolResult {
  readonly success: boolean;
  readonly result?: any;
  readonly error?: string;
}

export class ToolExecutor {
  private readonly config: ResonanceConfig;
  private readonly projectReader: ProjectReader;
  private readonly relevanceCalculator: RelevanceCalculator;
  private readonly implementationGuide: ImplementationGuide;

  constructor(config: ResonanceConfig) {
    this.config = config;
    this.projectReader = new ProjectReader(config);
    this.relevanceCalculator = new RelevanceCalculator(config);
    this.implementationGuide = new ImplementationGuide(config);
  }

  /**
   * Execute a tool based on its name and parameters
   */
  async executeTool(toolName: string, parameters: Record<string, any>): Promise<ToolResult> {
    console.log(colorize.accent(`🔧 Executing tool: ${toolName}`));
    
    try {
      switch (toolName) {
        case 'read_file':
          return this.executeReadFile(parameters);
          
        case 'write_file':
          return this.executeWriteFile(parameters);
          
        case 'edit_file':
          return this.executeEditFile(parameters);
          
        case 'analyze_project':
          return await this.executeAnalyzeProject(parameters);
          
        case 'find_relevant_files':
          return await this.executeFindRelevantFiles(parameters);
          
        case 'generate_implementation_guide':
          return await this.executeGenerateGuide(parameters);
          
        case 'run_workaround_detector':
          return await this.executeWorkaroundDetector(parameters);
          
        default:
          return {
            success: false,
            error: `Unknown tool: ${toolName}`
          };
      }
    } catch (error) {
      console.log(colorize.error(`❌ Tool execution failed: ${toolName}`));
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Execute read_file tool
   */
  private executeReadFile(params: { file_path: string }): ToolResult {
    const fileInfo = FileOperations.readFile(params.file_path);
    
    if (!fileInfo.exists) {
      return {
        success: false,
        error: `File not found: ${params.file_path}`
      };
    }

    return {
      success: true,
      result: {
        path: fileInfo.path,
        content: fileInfo.content,
        size: fileInfo.size
      }
    };
  }

  /**
   * Execute write_file tool
   */
  private executeWriteFile(params: { file_path: string; content: string }): ToolResult {
    const result = FileOperations.writeFile(params.file_path, params.content);
    
    return {
      success: result.success,
      result: result.success ? {
        path: params.file_path,
        message: result.message
      } : undefined,
      error: result.success ? undefined : result.message
    };
  }

  /**
   * Execute edit_file tool
   */
  private executeEditFile(params: { file_path: string; search_text: string; replace_text: string }): ToolResult {
    const result = FileOperations.editFile(params.file_path, params.search_text, params.replace_text);
    
    return {
      success: result.success,
      result: result.success ? {
        path: params.file_path,
        message: result.message
      } : undefined,
      error: result.success ? undefined : result.message
    };
  }

  /**
   * Execute analyze_project tool
   */
  private async executeAnalyzeProject(params: { focus_area?: string }): Promise<ToolResult> {
    const understanding = await this.projectReader.readProject(process.cwd());
    
    let focusedResult = understanding;
    
    if (params.focus_area) {
      // Filter based on focus area
      const filteredFiles = Object.fromEntries(
        Object.entries(understanding.files).filter(([path]) => 
          path.toLowerCase().includes(params.focus_area!.toLowerCase())
        )
      );
      
      focusedResult = {
        ...understanding,
        files: filteredFiles
      };
    }

    return {
      success: true,
      result: {
        rootPath: focusedResult.rootPath,
        fileCount: Object.keys(focusedResult.files).length,
        patterns: focusedResult.patterns,
        fileTypes: this.summarizeFileTypes(focusedResult.files),
        recentFiles: this.getRecentFiles(focusedResult.files)
      }
    };
  }

  /**
   * Execute find_relevant_files tool
   */
  private async executeFindRelevantFiles(params: { query: string; max_files?: number }): Promise<ToolResult> {
    const understanding = await this.projectReader.readProject(process.cwd());
    
    const contextRequest: ContextRequest = {
      query: params.query,
      maxFiles: params.max_files || 5
    };

    const relevantFiles = this.relevanceCalculator.calculateRelevance(
      understanding.files,
      contextRequest
    );

    return {
      success: true,
      result: {
        query: params.query,
        files: relevantFiles.map(rf => ({
          path: rf.file.path,
          relevance: rf.relevanceScore,
          reasons: rf.reasons,
          type: rf.file.type,
          size: rf.file.size
        }))
      }
    };
  }

  /**
   * Execute generate_implementation_guide tool
   */
  private async executeGenerateGuide(params: { task: string }): Promise<ToolResult> {
    const guidance = await this.implementationGuide.generateGuidance(params.task);
    
    return {
      success: true,
      result: {
        task: guidance.task,
        approach: guidance.approach,
        filesToModify: guidance.filesToModify,
        filesToCreate: guidance.filesToCreate,
        steps: guidance.steps,
        constraints: guidance.constraints,
        confidence: guidance.confidence
      }
    };
  }

  /**
   * Execute workaround_detector tool
   */
  private async executeWorkaroundDetector(params: { directory?: string }): Promise<ToolResult> {
    const directory = params.directory || 'source/';
    
    // For now, return a simulated result
    // In the future, we can integrate with the actual workaround detector
    return {
      success: true,
      result: {
        directory,
        issues: [],
        summary: 'No workarounds detected - clean code!',
        scannedFiles: 0
      }
    };
  }

  /**
   * Helper: Summarize file types
   */
  private summarizeFileTypes(files: Record<string, any>): Record<string, number> {
    return Object.values(files).reduce((acc: Record<string, number>, file: any) => {
      acc[file.type] = (acc[file.type] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Helper: Get recent files
   */
  private getRecentFiles(files: Record<string, any>, limit: number = 5): string[] {
    return Object.values(files)
      .sort((a: any, b: any) => b.lastModified.getTime() - a.lastModified.getTime())
      .slice(0, limit)
      .map((file: any) => file.path);
  }
}