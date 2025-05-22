/**
 * ProjectReader - Clean Codebase Understanding
 * 
 * Reads and understands a project's structure without workarounds.
 * Uses Records consistently, no Map conversions, no type abuse.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { 
  CodeFile, 
  FileType, 
  Pattern,
  ProjectUnderstanding,
  ResonanceConfig,
  IndexingProgress,
  ResonanceError 
} from '../core/types.js';

export class ProjectReader {
  private readonly config: ResonanceConfig;
  private onProgress?: (progress: IndexingProgress) => void;

  constructor(config: ResonanceConfig) {
    this.config = config;
  }

  /**
   * Set progress callback for real-time updates
   */
  setProgressCallback(callback: (progress: IndexingProgress) => void): void {
    this.onProgress = callback;
  }

  /**
   * Read and understand a project directory
   */
  async readProject(rootPath: string): Promise<ProjectUnderstanding> {
    this.emitProgress('scanning', 0, 0, 'Starting project scan...');

    try {
      // Phase 1: Discover all files
      const filePaths = this.discoverFiles(rootPath);
      
      // Phase 2: Read and parse files
      const files = this.readFiles(rootPath, filePaths);
      
      // Phase 3: Detect patterns
      this.emitProgress('analyzing', filePaths.length, filePaths.length);
      const patterns = this.detectPatterns(files);

      this.emitProgress('complete', filePaths.length, filePaths.length);

      return {
        rootPath,
        files,
        patterns,
        createdAt: new Date()
      };
    } catch (error) {
      throw new ResonanceError(
        'Failed to read project',
        'PROJECT_READ_FAILED',
        { rootPath, error: error instanceof Error ? error.message : String(error) }
      );
    }
  }

  /**
   * Discover all relevant files in the project
   */
  private discoverFiles(rootPath: string): string[] {
    const allFiles: string[] = [];
    
    const scanDirectory = (dirPath: string): void => {
      try {
        const entries = readdirSync(dirPath);
        
        for (const entry of entries) {
          const fullPath = join(dirPath, entry);
          const relativePath = relative(rootPath, fullPath);
          
          // Skip excluded patterns
          if (this.shouldExcludeFile(relativePath)) {
            continue;
          }
          
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (this.shouldIncludeFile(relativePath)) {
            allFiles.push(fullPath);
          }
        }
      } catch (scanError) {
        // Log warning but continue scanning
        console.warn(`Warning: Could not scan directory ${dirPath}:`, scanError);
      }
    };

    scanDirectory(rootPath);
    return allFiles;
  }

  /**
   * Read files and create CodeFile objects
   */
  private readFiles(rootPath: string, filePaths: string[]): Record<string, CodeFile> {
    const files: Record<string, CodeFile> = {};
    
    filePaths.forEach((filePath, index) => {
      this.emitProgress('parsing', index, filePaths.length, filePath);
      
      try {
        const file = this.readSingleFile(rootPath, filePath);
        if (file) {
          files[file.path] = file;
        }
      } catch (fileError) {
        console.warn(`Warning: Could not read file ${filePath}:`, fileError);
      }
    });
    
    return files;
  }

  /**
   * Read a single file and create CodeFile object
   */
  private readSingleFile(rootPath: string, filePath: string): CodeFile | null {
    try {
      const stat = statSync(filePath);
      
      // Skip files that are too large
      if (stat.size > this.config.indexing.maxFileSize) {
        return null;
      }
      
      const content = readFileSync(filePath, 'utf-8');
      const relativePath = relative(rootPath, filePath);
      
      return {
        path: relativePath,
        name: filePath.split('/').pop() || '',
        content,
        lastModified: stat.mtime,
        size: stat.size,
        type: this.determineFileType(filePath)
      };
    } catch (readError) {
      console.warn(`Could not read file ${filePath}:`, readError);
      return null;
    }
  }

  /**
   * Determine file type from extension
   */
  private determineFileType(filePath: string): FileType {
    const extension = extname(filePath).toLowerCase();
    
    switch (extension) {
      case '.ts':
      case '.tsx':
        return 'typescript';
      case '.js':
      case '.jsx':
        return 'javascript';
      case '.json':
        return 'json';
      case '.md':
        return 'markdown';
      case '.yml':
      case '.yaml':
        return 'yaml';
      default:
        return 'unknown';
    }
  }

  /**
   * Simple pattern detection - can be enhanced later
   */
  private detectPatterns(files: Record<string, CodeFile>) {
    // For now, just detect file type patterns
    const typePatterns = this.detectFileTypePatterns(files);
    return typePatterns;
  }

  /**
   * Detect patterns in file types and organization
   */
  private detectFileTypePatterns(files: Record<string, CodeFile>) {
    const typeCounts: Record<FileType, number> = {
      typescript: 0,
      javascript: 0,
      json: 0,
      markdown: 0,
      yaml: 0,
      unknown: 0
    };

    // Count file types
    Object.values(files).forEach(file => {
      typeCounts[file.type]++;
    });

    // Create patterns for significant file types
    const patterns: Pattern[] = [];
    
    Object.entries(typeCounts).forEach(([fileType, count]) => {
      if (count > 0) {
        patterns.push({
          id: `file-type-${fileType}`,
          name: `${fileType} files`,
          description: `Project contains ${count} ${fileType} files`,
          confidence: 1.0,
          examples: Object.values(files)
            .filter(f => f.type === fileType)
            .slice(0, 3)
            .map(f => f.path)
        });
      }
    });

    return patterns;
  }

  /**
   * Check if file should be included based on patterns
   */
  private shouldIncludeFile(relativePath: string): boolean {
    return this.config.indexing.includePatterns.some(pattern => 
      this.matchesGlob(relativePath, pattern)
    );
  }

  /**
   * Check if file should be excluded based on patterns
   */
  private shouldExcludeFile(relativePath: string): boolean {
    return this.config.indexing.excludePatterns.some(pattern => 
      this.matchesGlob(relativePath, pattern)
    );
  }

  /**
   * Simple glob pattern matching
   */
  private matchesGlob(filePath: string, pattern: string): boolean {
    // Simple implementation - can be enhanced
    if (pattern.includes('*')) {
      const regexPattern = pattern
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
        .replace(/\?/g, '.');
      return new RegExp(`^${regexPattern}$`).test(filePath);
    }
    return filePath.includes(pattern);
  }

  /**
   * Emit progress update
   */
  private emitProgress(
    phase: IndexingProgress['phase'],
    processed: number,
    total: number,
    currentFile?: string
  ): void {
    if (this.onProgress) {
      this.onProgress({
        phase,
        filesProcessed: processed,
        totalFiles: total,
        currentFile
      });
    }
  }
}