/**
 * File system crawler for GuardianAI MVP
 * 
 * Recursively scans project directories, respects include/exclude patterns,
 * and generates comprehensive file metadata for the indexing system.
 */

import { EventBus } from '../../core/events.js'
import { FileSystemError, IndexingError } from '../../core/errors.js'
import { FileUtils } from '../../utils/file-utils.js'
import { HashUtils } from '../../utils/hash-utils.js'
import type { 
  FileInfo, 
  IndexingConfig, 
  ComplexityMetrics,
  HalsteadMetrics 
} from '../../core/types.js'

export interface CrawlOptions {
  includePatterns: string[]
  excludePatterns: string[]
  followSymlinks: boolean
  generateChecksums: boolean
  calculateComplexity: boolean
  maxFileSize: number
  signal?: AbortSignal
}

export interface CrawlResult {
  files: Map<string, FileInfo>
  totalFiles: number
  totalSize: number
  totalLines: number
  languages: Set<string>
  errors: Array<{ file: string; error: Error }>
}

export interface CrawlProgress {
  totalFiles: number
  processedFiles: number
  currentFile: string
  percentage: number
}

/**
 * File system crawler that discovers and analyzes project files
 */
export class FileCrawler {
  private eventBus: EventBus
  private config: IndexingConfig

  constructor(config: IndexingConfig, eventBus: EventBus) {
    this.config = config
    this.eventBus = eventBus
  }

  /**
   * Crawl a directory and return comprehensive file information
   */
  async crawl(
    rootPath: string, 
    options: Partial<CrawlOptions> = {}
  ): Promise<CrawlResult> {
    const opts: CrawlOptions = {
      includePatterns: [],
      excludePatterns: [],
      followSymlinks: false,
      generateChecksums: this.config.generateHashes,
      calculateComplexity: true,
      maxFileSize: this.config.maxFileSize,
      ...options
    }

    const emitter = this.eventBus.createScope('FileCrawler')
    
    try {
      await emitter.emit('crawl.started', { rootPath, options: opts })

      // Discover all files
      const discoveredFiles = await this.discoverFiles(rootPath, opts)
      
      // Process files and generate metadata
      const result = await this.processFiles(discoveredFiles, rootPath, opts)
      
      await emitter.emit('crawl.completed', { 
        rootPath, 
        totalFiles: result.totalFiles,
        totalSize: result.totalSize 
      })
      
      return result

    } catch (error) {
      await emitter.emit('crawl.failed', { 
        rootPath, 
        error: error instanceof Error ? error : new Error(String(error))
      })
      
      throw new IndexingError(
        `Failed to crawl directory: ${rootPath}`,
        { rootPath, options: opts },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Discover all files in the directory tree
   */
  private async discoverFiles(
    rootPath: string, 
    options: CrawlOptions
  ): Promise<string[]> {
    const files: string[] = []
    
    try {
      const walkOptions = {
        includePatterns: options.includePatterns,
        excludePatterns: [
          ...options.excludePatterns,
          // Always exclude common non-source directories
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/coverage/**'
        ],
        followSymlinks: options.followSymlinks,
        signal: options.signal
      }

      for await (const file of FileUtils.walk(rootPath, walkOptions)) {
        const stats = await FileUtils.getStats(file)
        
        // Skip if file is too large
        if (stats.size > options.maxFileSize) {
          continue
        }
        
        // Only include source files
        if (this.isSourceFile(file)) {
          files.push(file)
        }
      }

      return files

    } catch (error) {
      throw new FileSystemError(
        `Failed to discover files in ${rootPath}`,
        { rootPath },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Process discovered files and generate comprehensive metadata
   */
  private async processFiles(
    files: string[],
    rootPath: string,
    options: CrawlOptions
  ): Promise<CrawlResult> {
    const result: CrawlResult = {
      files: new Map(),
      totalFiles: 0,
      totalSize: 0,
      totalLines: 0,
      languages: new Set(),
      errors: []
    }

    const emitter = this.eventBus.createScope('FileCrawler')

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file) continue
      
      try {
        if (options.signal?.aborted) {
          throw new Error('Crawl operation was aborted')
        }

        // Emit progress
        const progress: CrawlProgress = {
          totalFiles: files.length,
          processedFiles: i,
          currentFile: file,
          percentage: Math.round((i / files.length) * 100)
        }
        
        await emitter.emit('crawl.progress', progress)

        // Process individual file
        const fileInfo = await this.processFile(file, rootPath, options)
        
        if (fileInfo) {
          result.files.set(file, fileInfo)
          result.totalSize += fileInfo.size
          result.totalLines += fileInfo.lines
          result.languages.add(this.detectLanguage(file))
        }

      } catch (error) {
        result.errors.push({
          file,
          error: error instanceof Error ? error : new Error(String(error))
        })
      }
    }

    result.totalFiles = result.files.size
    return result
  }

  /**
   * Process a single file and generate comprehensive metadata
   */
  private async processFile(
    filePath: string,
    rootPath: string,
    options: CrawlOptions
  ): Promise<FileInfo | null> {
    try {
      // Get basic file stats
      const stats = await FileUtils.getStats(filePath)
      const relativePath = FileUtils.getRelativePath(rootPath, filePath)
      const language = this.detectLanguage(filePath)

      // Read file content
      const content = await FileUtils.readFile(filePath, {
        maxSize: options.maxFileSize
      })

      // Calculate checksum if requested
      let checksum = ''
      if (options.generateChecksums) {
        checksum = HashUtils.hashContent(content).hash
      }

      // Count lines
      const lines = content.split('\n').length

      // Calculate basic complexity metrics
      const complexity = options.calculateComplexity 
        ? this.calculateBasicComplexity(content)
        : this.getDefaultComplexity()

      const fileInfo: FileInfo = {
        path: filePath,
        relativePath,
        type: language,
        size: stats.size,
        lines,
        lastModified: stats.lastModified,
        checksum,
        
        // These will be populated by language parsers
        imports: [],
        exports: [],
        functions: [],
        classes: [],
        interfaces: [],
        types: [],
        
        // Basic analysis
        patterns: [],
        complexity,
        dependencies: []
      }

      return fileInfo

    } catch (error) {
      throw new FileSystemError(
        `Failed to process file: ${filePath}`,
        { filePath },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Detect programming language from file extension
   */
  private detectLanguage(filePath: string): string {
    const extension = FileUtils.getExtension(filePath)
    
    const languageMap: Record<string, string> = {
      '.ts': 'typescript',
      '.tsx': 'typescript',
      '.js': 'javascript',
      '.jsx': 'javascript',
      '.json': 'json',
      '.md': 'markdown',
      '.yaml': 'yaml',
      '.yml': 'yaml',
      '.html': 'html',
      '.css': 'css',
      '.scss': 'scss',
      '.less': 'less'
    }

    return languageMap[extension] || 'text'
  }

  /**
   * Check if a file is considered a source file
   */
  private isSourceFile(filePath: string): boolean {
    const language = this.detectLanguage(filePath)
    const sourceLanguages = new Set([
      'typescript', 'javascript', 'json', 'markdown', 
      'yaml', 'html', 'css', 'scss', 'less'
    ])
    
    return sourceLanguages.has(language)
  }

  /**
   * Calculate basic complexity metrics for a file
   */
  private calculateBasicComplexity(content: string): ComplexityMetrics {
    // This is a simplified complexity calculation
    // More sophisticated analysis will be done by language parsers
    
    const lines = content.split('\n')
    
    // Simple cyclomatic complexity approximation
    const complexityKeywords = [
      'if', 'else', 'while', 'for', 'switch', 'case', 'catch', 'try'
    ]
    
    let cyclomaticComplexity = 1 // Base complexity
    let cognitiveComplexity = 0
    
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase()
      
      for (const keyword of complexityKeywords) {
        if (trimmed.includes(keyword)) {
          cyclomaticComplexity++
          cognitiveComplexity++
        }
      }
    }

    // Simple Halstead metrics approximation
    const operators = content.match(/[+\-*/%=<>!&|]/g) || []
    const operands = content.match(/\b\w+\b/g) || []
    
    const halstead: HalsteadMetrics = {
      vocabulary: new Set([...operators, ...operands]).size,
      length: operators.length + operands.length,
      difficulty: 1.0,
      effort: 1.0
    }

    // Calculate maintainability index (simplified)
    const maintainability = Math.max(0, 
      171 - 5.2 * Math.log(halstead.length) - 0.23 * cyclomaticComplexity
    )

    return {
      cyclomatic: cyclomaticComplexity,
      cognitive: cognitiveComplexity,
      maintainability,
      halstead
    }
  }

  /**
   * Get default complexity metrics for files that can't be analyzed
   */
  private getDefaultComplexity(): ComplexityMetrics {
    return {
      cyclomatic: 1,
      cognitive: 1,
      maintainability: 100,
      halstead: {
        vocabulary: 0,
        length: 0,
        difficulty: 0,
        effort: 0
      }
    }
  }

  /**
   * Get file statistics for a directory
   */
  async getDirectoryStats(rootPath: string): Promise<{
    totalFiles: number
    totalSize: number
    languageDistribution: Record<string, number>
    lastModified: Date
  }> {
    try {
      const files = await FileUtils.getFiles(rootPath, {
        includePatterns: ['**/*'],
        excludePatterns: ['**/node_modules/**', '**/dist/**', '**/.git/**']
      })

      let totalSize = 0
      let lastModified = new Date(0)
      const languageDistribution: Record<string, number> = {}

      for (const file of files) {
        if (this.isSourceFile(file)) {
          const stats = await FileUtils.getStats(file)
          const language = this.detectLanguage(file)
          
          totalSize += stats.size
          languageDistribution[language] = (languageDistribution[language] || 0) + 1
          
          if (stats.lastModified > lastModified) {
            lastModified = stats.lastModified
          }
        }
      }

      return {
        totalFiles: files.filter(f => this.isSourceFile(f)).length,
        totalSize,
        languageDistribution,
        lastModified
      }

    } catch (error) {
      throw new FileSystemError(
        `Failed to get directory stats for: ${rootPath}`,
        { rootPath },
        error instanceof Error ? error : undefined
      )
    }
  }

}