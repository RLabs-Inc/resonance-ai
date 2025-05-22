/**
 * File watcher for GuardianAI MVP
 * 
 * Monitors file system changes and triggers incremental index updates
 * with debouncing and intelligent change detection.
 */

import * as fs from 'fs'
import { EventBus } from '../../core/events.js'
import { FileSystemError } from '../../core/errors.js'
import { FileUtils } from '../../utils/file-utils.js'
import type { IndexingService } from './IndexingService.js'

export interface WatchOptions {
  debounceMs: number
  excludePatterns: string[]
  includePatterns: string[]
  recursive: boolean
  followSymlinks: boolean
}

export interface FileChangeEvent {
  type: 'added' | 'modified' | 'deleted' | 'renamed'
  filePath: string
  oldPath?: string
  timestamp: Date
}

export interface WatcherStats {
  isWatching: boolean
  watchedPaths: string[]
  eventsReceived: number
  eventsProcessed: number
  lastChange: Date | null
  debounceActive: boolean
}

/**
 * File system watcher with intelligent change detection and debouncing
 */
export class FileWatcher {
  private eventBus: EventBus
  private indexingService: IndexingService
  private options: WatchOptions
  private watchers: Map<string, fs.FSWatcher> = new Map()
  private pendingChanges: Map<string, FileChangeEvent> = new Map()
  private debounceTimer: NodeJS.Timeout | null = null
  private stats: WatcherStats
  private isWatching = false

  constructor(
    indexingService: IndexingService,
    eventBus: EventBus,
    options: Partial<WatchOptions> = {}
  ) {
    this.indexingService = indexingService
    this.eventBus = eventBus
    this.options = {
      debounceMs: 500,
      excludePatterns: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/coverage/**',
        '**/*.log',
        '**/.DS_Store'
      ],
      includePatterns: [],
      recursive: true,
      followSymlinks: false,
      ...options
    }

    this.stats = {
      isWatching: false,
      watchedPaths: [],
      eventsReceived: 0,
      eventsProcessed: 0,
      lastChange: null,
      debounceActive: false
    }
  }

  /**
   * Start watching a directory for changes
   */
  async startWatching(rootPath: string): Promise<void> {
    if (this.isWatching) {
      throw new FileSystemError('FileWatcher is already watching')
    }

    const emitter = this.eventBus.createScope('FileWatcher')

    try {
      await emitter.emit('watcher.started', { rootPath })

      // Validate path exists
      const exists = await FileUtils.exists(rootPath)
      if (!exists) {
        throw new FileSystemError(`Watch path does not exist: ${rootPath}`)
      }

      // Start watching the root directory
      await this.watchDirectory(rootPath)

      this.isWatching = true
      this.stats.isWatching = true
      this.stats.watchedPaths = [rootPath]

      await emitter.emit('watcher.watching', { 
        rootPath, 
        options: this.options 
      })

    } catch (error) {
      await emitter.emit('watcher.failed', { 
        rootPath, 
        error: error instanceof Error ? error : new Error(String(error))
      })
      
      throw new FileSystemError(
        `Failed to start watching: ${rootPath}`,
        { rootPath },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Stop watching for file changes
   */
  async stopWatching(): Promise<void> {
    if (!this.isWatching) {
      return
    }

    const emitter = this.eventBus.createScope('FileWatcher')

    try {
      // Clear debounce timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
        this.debounceTimer = null
      }

      // Process any pending changes before stopping
      if (this.pendingChanges.size > 0) {
        await this.processPendingChanges()
      }

      // Close all watchers
      for (const [path, watcher] of this.watchers) {
        watcher.close()
        console.log(`Stopped watching: ${path}`)
      }

      this.watchers.clear()
      this.pendingChanges.clear()
      this.isWatching = false
      this.stats.isWatching = false
      this.stats.watchedPaths = []

      await emitter.emit('watcher.stopped', {})

    } catch (error) {
      await emitter.emit('watcher.error', { 
        error: error instanceof Error ? error : new Error(String(error))
      })
      
      throw new FileSystemError(
        'Failed to stop file watcher',
        {},
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Watch a specific directory
   */
  private async watchDirectory(dirPath: string): Promise<void> {
    try {
      const watcher = fs.watch(
        dirPath, 
        { 
          recursive: this.options.recursive,
          persistent: true
        },
        (eventType, filename) => {
          this.handleFileChange(eventType, filename, dirPath)
        }
      )

      watcher.on('error', (error) => {
        console.error(`Watch error for ${dirPath}:`, error)
        this.eventBus.createScope('FileWatcher').emit('watcher.error', { 
          path: dirPath, 
          error 
        })
      })

      this.watchers.set(dirPath, watcher)
      console.log(`Started watching: ${dirPath}`)

    } catch (error) {
      throw new FileSystemError(
        `Failed to watch directory: ${dirPath}`,
        { dirPath },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Handle individual file change events
   */
  private handleFileChange(
    eventType: string, 
    filename: string | null, 
    watchedDir: string
  ): void {
    if (!filename) return

    const filePath = FileUtils.resolvePath(watchedDir, filename)
    
    // Check if file should be ignored
    if (this.shouldIgnoreFile(filePath)) {
      return
    }

    this.stats.eventsReceived++
    this.stats.lastChange = new Date()

    // Determine change type
    const changeType = this.determineChangeType(eventType, filePath)
    
    // Create change event
    const changeEvent: FileChangeEvent = {
      type: changeType,
      filePath: FileUtils.normalizePath(filePath),
      timestamp: new Date()
    }

    // Add to pending changes (overwrites previous change for same file)
    this.pendingChanges.set(filePath, changeEvent)

    // Debounce the processing
    this.debounceProcessing()
  }

  /**
   * Determine the type of file change
   */
  private determineChangeType(eventType: string, filePath: string): FileChangeEvent['type'] {
    // This is a simplified change detection
    // More sophisticated detection could be implemented
    
    switch (eventType) {
      case 'rename':
        // Check if file still exists to distinguish between rename and delete
        return fs.existsSync(filePath) ? 'added' : 'deleted'
      case 'change':
        return 'modified'
      default:
        return 'modified'
    }
  }

  /**
   * Check if a file should be ignored based on patterns
   */
  private shouldIgnoreFile(filePath: string): boolean {
    const relativePath = filePath.replace(/^\/+/, '')
    
    // Check exclude patterns
    for (const pattern of this.options.excludePatterns) {
      if (FileUtils.matchesPattern(relativePath, pattern)) {
        return true
      }
    }

    // Check include patterns (if any specified)
    if (this.options.includePatterns.length > 0) {
      for (const pattern of this.options.includePatterns) {
        if (FileUtils.matchesPattern(relativePath, pattern)) {
          return false
        }
      }
      return true // Not in include patterns
    }

    // Check if it's a source file
    const extension = FileUtils.getExtension(filePath)
    const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.yaml', '.yml']
    
    return !sourceExtensions.includes(extension)
  }

  /**
   * Debounce change processing to avoid excessive updates
   */
  private debounceProcessing(): void {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }

    this.stats.debounceActive = true

    // Set new timer
    this.debounceTimer = setTimeout(async () => {
      this.stats.debounceActive = false
      await this.processPendingChanges()
    }, this.options.debounceMs)
  }

  /**
   * Process all pending file changes
   */
  private async processPendingChanges(): Promise<void> {
    if (this.pendingChanges.size === 0) {
      return
    }

    const emitter = this.eventBus.createScope('FileWatcher')
    const changes = Array.from(this.pendingChanges.values())
    
    try {
      await emitter.emit('watcher.changes.processing', { 
        changes: changes.length 
      })

      // Group changes by type
      const changedFiles = new Set<string>()
      const deletedFiles = new Set<string>()

      for (const change of changes) {
        if (change.type === 'deleted') {
          deletedFiles.add(change.filePath)
        } else {
          changedFiles.add(change.filePath)
        }
      }

      // Process deletions first
      if (deletedFiles.size > 0) {
        await this.indexingService.updateIndex(Array.from(deletedFiles))
      }

      // Process additions and modifications
      if (changedFiles.size > 0) {
        await this.indexingService.updateIndex(Array.from(changedFiles))
      }

      this.stats.eventsProcessed += changes.length
      this.pendingChanges.clear()

      await emitter.emit('watcher.changes.processed', { 
        changes: changes.length,
        added: changedFiles.size,
        deleted: deletedFiles.size
      })

    } catch (error) {
      await emitter.emit('watcher.changes.failed', { 
        changes: changes.length,
        error: error instanceof Error ? error : new Error(String(error))
      })

      // Don't clear pending changes on error - they'll be retried
      console.error('Failed to process file changes:', error)
    }
  }

  /**
   * Force processing of pending changes (useful for testing)
   */
  async flushChanges(): Promise<void> {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }
    
    await this.processPendingChanges()
  }

  /**
   * Get current watcher statistics
   */
  getStats(): WatcherStats {
    return { ...this.stats }
  }

  /**
   * Check if currently watching
   */
  isCurrentlyWatching(): boolean {
    return this.isWatching
  }

  /**
   * Get list of pending changes
   */
  getPendingChanges(): FileChangeEvent[] {
    return Array.from(this.pendingChanges.values())
  }

  /**
   * Add a path to exclusion patterns
   */
  addExcludePattern(pattern: string): void {
    if (!this.options.excludePatterns.includes(pattern)) {
      this.options.excludePatterns.push(pattern)
    }
  }

  /**
   * Remove a path from exclusion patterns
   */
  removeExcludePattern(pattern: string): void {
    const index = this.options.excludePatterns.indexOf(pattern)
    if (index >= 0) {
      this.options.excludePatterns.splice(index, 1)
    }
  }

  /**
   * Update debounce timing
   */
  setDebounceMs(ms: number): void {
    this.options.debounceMs = Math.max(50, ms) // Minimum 50ms
  }

  /**
   * Get current options
   */
  getOptions(): WatchOptions {
    return { ...this.options }
  }

  /**
   * Watch an additional directory
   */
  async addWatchPath(dirPath: string): Promise<void> {
    if (!this.isWatching) {
      throw new FileSystemError('FileWatcher is not currently watching')
    }

    if (this.watchers.has(dirPath)) {
      return // Already watching this path
    }

    await this.watchDirectory(dirPath)
    this.stats.watchedPaths.push(dirPath)
  }

  /**
   * Stop watching a specific directory
   */
  async removeWatchPath(dirPath: string): Promise<void> {
    const watcher = this.watchers.get(dirPath)
    if (!watcher) {
      return // Not watching this path
    }

    watcher.close()
    this.watchers.delete(dirPath)
    
    const index = this.stats.watchedPaths.indexOf(dirPath)
    if (index >= 0) {
      this.stats.watchedPaths.splice(index, 1)
    }
  }
}