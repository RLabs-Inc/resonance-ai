/**
 * Dependency graph builder for GuardianAI MVP
 * 
 * Analyzes relationships between files, resolves import paths,
 * detects circular dependencies, and calculates dependency metrics.
 */

import * as path from 'path'
import { IndexingError } from '../../core/errors.js'
import { FileUtils } from '../../utils/file-utils.js'
import type { 
  DependencyGraph,
  DependencyNode,
  DependencyEdge,
  DependencyMetrics,
  FileInfo
} from '../../core/types.js'

export interface GraphBuildOptions {
  rootPath: string
  resolveExtensions: string[]
  ignoreExternal: boolean
  includeNodeModules: boolean
}

export interface CycleDetectionResult {
  hasCycles: boolean
  cycles: string[][]
  affectedFiles: Set<string>
}

export interface DependencyAnalysis {
  directDependencies: string[]
  transitiveDependencies: string[]
  dependents: string[]
  depth: number
  rank: number
}

/**
 * Builds and analyzes dependency graphs from file information
 */
export class DependencyGraphBuilder {
  private graph: DependencyGraph
  private fileMap: Map<string, FileInfo>
  private options: GraphBuildOptions

  constructor(options: Partial<GraphBuildOptions> = {}) {
    this.options = {
      rootPath: '.',
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      ignoreExternal: true,
      includeNodeModules: false,
      ...options
    }

    this.graph = {
      nodes: new Map(),
      edges: [],
      cycles: [],
      metrics: this.createEmptyMetrics()
    }

    this.fileMap = new Map()
  }

  /**
   * Build dependency graph from a collection of files
   */
  async buildGraph(files: Map<string, FileInfo>): Promise<DependencyGraph> {
    try {
      this.fileMap = files
      this.graph = {
        nodes: new Map(),
        edges: [],
        cycles: [],
        metrics: this.createEmptyMetrics()
      }

      // Create nodes for all files
      this.createNodes()

      // Resolve imports and create edges
      await this.createEdges()

      // Detect cycles
      this.detectCycles()

      // Calculate metrics
      this.calculateMetrics()

      return this.graph

    } catch (error) {
      throw new IndexingError(
        'Failed to build dependency graph',
        { totalFiles: files.size },
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Create nodes for all files
   */
  private createNodes(): void {
    for (const [filePath] of this.fileMap) {
      const node: DependencyNode = {
        file: filePath,
        inDegree: 0,
        outDegree: 0,
        rank: 0
      }

      this.graph.nodes.set(filePath, node)
    }
  }

  /**
   * Resolve imports and create dependency edges
   */
  private async createEdges(): Promise<void> {
    for (const [filePath, fileInfo] of this.fileMap) {
      for (const importInfo of fileInfo.imports) {
        try {
          const resolvedPath = await this.resolveImportPath(
            importInfo.module,
            filePath
          )

          if (resolvedPath && this.shouldIncludeDependency(resolvedPath)) {
            this.addEdge(filePath, resolvedPath, 'import')
          }

        } catch (error) {
          // Log import resolution failures but don't fail the entire build
          console.warn(`Failed to resolve import "${importInfo.module}" in ${filePath}`)
        }
      }
    }
  }

  /**
   * Add an edge to the dependency graph
   */
  private addEdge(
    from: string, 
    to: string, 
    type: DependencyEdge['type'],
    weight = 1
  ): void {
    // Check if edge already exists
    const existingEdge = this.graph.edges.find(
      edge => edge.from === from && edge.to === to
    )

    if (!existingEdge) {
      const edge: DependencyEdge = {
        from,
        to,
        type,
        weight
      }

      this.graph.edges.push(edge)

      // Update node degrees
      const fromNode = this.graph.nodes.get(from)
      const toNode = this.graph.nodes.get(to)

      if (fromNode) fromNode.outDegree++
      if (toNode) toNode.inDegree++
    }
  }

  /**
   * Resolve import path to actual file path
   */
  private async resolveImportPath(
    importPath: string,
    fromFile: string
  ): Promise<string | null> {
    // Handle relative imports
    if (importPath.startsWith('.')) {
      return this.resolveRelativeImport(importPath, fromFile)
    }

    // Handle absolute imports
    if (importPath.startsWith('/')) {
      return this.resolveAbsoluteImport(importPath)
    }

    // Handle module imports (node_modules, etc.)
    if (this.options.includeNodeModules) {
      return this.resolveModuleImport(importPath, fromFile)
    }

    return null
  }

  /**
   * Resolve relative import (./file, ../file)
   */
  private async resolveRelativeImport(
    importPath: string,
    fromFile: string
  ): Promise<string | null> {
    const fromDir = path.dirname(fromFile)
    const resolvedPath = path.resolve(fromDir, importPath)

    // Try different extensions
    for (const ext of this.options.resolveExtensions) {
      const pathWithExt = resolvedPath + ext
      
      if (await FileUtils.exists(pathWithExt)) {
        return FileUtils.normalizePath(pathWithExt)
      }
    }

    // Try index files
    for (const ext of this.options.resolveExtensions) {
      const indexPath = path.join(resolvedPath, `index${ext}`)
      
      if (await FileUtils.exists(indexPath)) {
        return FileUtils.normalizePath(indexPath)
      }
    }

    return null
  }

  /**
   * Resolve absolute import (/src/file)
   */
  private async resolveAbsoluteImport(importPath: string): Promise<string | null> {
    const resolvedPath = path.resolve(this.options.rootPath, importPath.slice(1))
    
    for (const ext of this.options.resolveExtensions) {
      const pathWithExt = resolvedPath + ext
      
      if (await FileUtils.exists(pathWithExt)) {
        return FileUtils.normalizePath(pathWithExt)
      }
    }

    return null
  }

  /**
   * Resolve module import (lodash, react, etc.)
   */
  private async resolveModuleImport(
    importPath: string,
    fromFile: string
  ): Promise<string | null> {
    // This is a simplified module resolution
    // In a full implementation, you'd want to follow Node.js module resolution rules
    
    let currentDir = path.dirname(fromFile)
    
    while (currentDir !== path.dirname(currentDir)) {
      const nodeModulesPath = path.join(currentDir, 'node_modules', importPath)
      
      if (await FileUtils.exists(nodeModulesPath)) {
        // Check for main file in package.json
        const packageJsonPath = path.join(nodeModulesPath, 'package.json')
        
        if (await FileUtils.exists(packageJsonPath)) {
          try {
            const packageJson = JSON.parse(await FileUtils.readFile(packageJsonPath))
            const mainFile = packageJson.main || 'index.js'
            const mainPath = path.join(nodeModulesPath, mainFile)
            
            if (await FileUtils.exists(mainPath)) {
              return FileUtils.normalizePath(mainPath)
            }
          } catch {
            // Ignore package.json parsing errors
          }
        }

        // Try index files
        for (const ext of this.options.resolveExtensions) {
          const indexPath = path.join(nodeModulesPath, `index${ext}`)
          
          if (await FileUtils.exists(indexPath)) {
            return FileUtils.normalizePath(indexPath)
          }
        }
      }
      
      currentDir = path.dirname(currentDir)
    }

    return null
  }

  /**
   * Check if dependency should be included in the graph
   */
  private shouldIncludeDependency(resolvedPath: string): boolean {
    // Only include files that are in our file map
    if (!this.fileMap.has(resolvedPath)) {
      return false
    }

    // Ignore external dependencies if configured
    if (this.options.ignoreExternal && resolvedPath.includes('node_modules')) {
      return false
    }

    return true
  }

  /**
   * Detect circular dependencies using DFS
   */
  private detectCycles(): void {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const cycles: string[][] = []

    const dfs = (node: string, path: string[]): void => {
      visited.add(node)
      recursionStack.add(node)
      path.push(node)

      // Get all outgoing edges from this node
      const outgoingEdges = this.graph.edges.filter(edge => edge.from === node)
      
      for (const edge of outgoingEdges) {
        const neighbor = edge.to

        if (!visited.has(neighbor)) {
          dfs(neighbor, [...path])
        } else if (recursionStack.has(neighbor)) {
          // Found a cycle
          const cycleStart = path.indexOf(neighbor)
          if (cycleStart >= 0) {
            const cycle = path.slice(cycleStart)
            cycle.push(neighbor) // Complete the cycle
            cycles.push(cycle)
          }
        }
      }

      recursionStack.delete(node)
    }

    // Run DFS from each unvisited node
    for (const [filePath] of this.graph.nodes) {
      if (!visited.has(filePath)) {
        dfs(filePath, [])
      }
    }

    this.graph.cycles = cycles
  }

  /**
   * Calculate various dependency metrics
   */
  private calculateMetrics(): void {
    const nodes = Array.from(this.graph.nodes.values())
    const edges = this.graph.edges

    // Calculate node ranks using PageRank-like algorithm
    this.calculateNodeRanks()

    // Calculate basic metrics
    const totalNodes = nodes.length
    const totalEdges = edges.length
    const cycleCount = this.graph.cycles.length
    const maxDepth = this.calculateMaxDepth()
    const averageDependencies = totalNodes > 0 
      ? edges.length / totalNodes 
      : 0

    this.graph.metrics = {
      totalNodes,
      totalEdges,
      cycleCount,
      maxDepth,
      averageDependencies
    }
  }

  /**
   * Calculate node ranks using simplified PageRank
   */
  private calculateNodeRanks(): void {
    const dampingFactor = 0.85
    const iterations = 10
    const nodes = Array.from(this.graph.nodes.keys())
    
    // Initialize ranks
    const ranks = new Map<string, number>()
    for (const node of nodes) {
      ranks.set(node, 1.0)
    }

    // Iterate to calculate PageRank
    for (let i = 0; i < iterations; i++) {
      const newRanks = new Map<string, number>()
      
      for (const node of nodes) {
        let rank = (1 - dampingFactor)
        
        // Add rank contributions from incoming edges
        const incomingEdges = this.graph.edges.filter(edge => edge.to === node)
        
        for (const edge of incomingEdges) {
          const fromNode = this.graph.nodes.get(edge.from)
          const fromRank = ranks.get(edge.from) || 1.0
          
          if (fromNode && fromNode.outDegree > 0) {
            rank += dampingFactor * (fromRank / fromNode.outDegree)
          }
        }
        
        newRanks.set(node, rank)
      }
      
      // Update ranks
      for (const [node, rank] of newRanks) {
        ranks.set(node, rank)
      }
    }

    // Update node ranks in graph
    for (const [node, rank] of ranks) {
      const graphNode = this.graph.nodes.get(node)
      if (graphNode) {
        graphNode.rank = rank
      }
    }
  }

  /**
   * Calculate maximum dependency depth
   */
  private calculateMaxDepth(): number {
    let maxDepth = 0
    const visited = new Set<string>()

    const dfs = (node: string, depth: number): number => {
      visited.add(node)
      let maxChildDepth = depth

      const outgoingEdges = this.graph.edges.filter(edge => edge.from === node)
      
      for (const edge of outgoingEdges) {
        if (!visited.has(edge.to)) {
          const childDepth = dfs(edge.to, depth + 1)
          maxChildDepth = Math.max(maxChildDepth, childDepth)
        }
      }

      return maxChildDepth
    }

    for (const [node] of this.graph.nodes) {
      if (!visited.has(node)) {
        const depth = dfs(node, 0)
        maxDepth = Math.max(maxDepth, depth)
      }
    }

    return maxDepth
  }

  /**
   * Analyze dependencies for a specific file
   */
  analyzeDependencies(filePath: string): DependencyAnalysis | null {
    const node = this.graph.nodes.get(filePath)
    if (!node) return null

    // Direct dependencies (files this file imports)
    const directDependencies = this.graph.edges
      .filter(edge => edge.from === filePath)
      .map(edge => edge.to)

    // Transitive dependencies (recursive dependencies)
    const transitiveDependencies = this.getTransitiveDependencies(filePath)

    // Dependents (files that import this file)
    const dependents = this.graph.edges
      .filter(edge => edge.to === filePath)
      .map(edge => edge.from)

    // Calculate depth (longest path to this node)
    const depth = this.calculateNodeDepth(filePath)

    return {
      directDependencies,
      transitiveDependencies,
      dependents,
      depth,
      rank: node.rank
    }
  }

  /**
   * Get all transitive dependencies for a file
   */
  private getTransitiveDependencies(filePath: string): string[] {
    const dependencies = new Set<string>()
    const visited = new Set<string>()

    const dfs = (node: string): void => {
      if (visited.has(node)) return
      visited.add(node)

      const outgoingEdges = this.graph.edges.filter(edge => edge.from === node)
      
      for (const edge of outgoingEdges) {
        dependencies.add(edge.to)
        dfs(edge.to)
      }
    }

    dfs(filePath)
    return Array.from(dependencies)
  }

  /**
   * Calculate depth of a node in the dependency graph
   */
  private calculateNodeDepth(filePath: string): number {
    const visited = new Set<string>()
    
    const dfs = (node: string): number => {
      if (visited.has(node)) return 0
      visited.add(node)

      const incomingEdges = this.graph.edges.filter(edge => edge.to === node)
      
      if (incomingEdges.length === 0) {
        return 0 // Root node
      }

      let maxDepth = 0
      for (const edge of incomingEdges) {
        const parentDepth = dfs(edge.from)
        maxDepth = Math.max(maxDepth, parentDepth + 1)
      }

      return maxDepth
    }

    return dfs(filePath)
  }

  /**
   * Get files that would be affected by changes to a given file
   */
  getAffectedFiles(filePath: string): string[] {
    const affected = new Set<string>()
    const visited = new Set<string>()

    const dfs = (node: string): void => {
      if (visited.has(node)) return
      visited.add(node)

      const dependents = this.graph.edges.filter(edge => edge.to === node)
      
      for (const edge of dependents) {
        affected.add(edge.from)
        dfs(edge.from)
      }
    }

    dfs(filePath)
    return Array.from(affected)
  }

  /**
   * Create empty metrics object
   */
  private createEmptyMetrics(): DependencyMetrics {
    return {
      totalNodes: 0,
      totalEdges: 0,
      cycleCount: 0,
      maxDepth: 0,
      averageDependencies: 0
    }
  }

  /**
   * Get the current dependency graph
   */
  getGraph(): DependencyGraph {
    return this.graph
  }

  /**
   * Export graph in various formats for visualization
   */
  exportGraph(format: 'dot' | 'json' = 'json'): string {
    if (format === 'dot') {
      return this.exportToDot()
    } else {
      return JSON.stringify({
        nodes: Array.from(this.graph.nodes.entries()),
        edges: this.graph.edges,
        cycles: this.graph.cycles,
        metrics: this.graph.metrics
      }, null, 2)
    }
  }

  /**
   * Export graph to DOT format for Graphviz visualization
   */
  private exportToDot(): string {
    let dot = 'digraph Dependencies {\n'
    dot += '  rankdir=LR;\n'
    dot += '  node [shape=box];\n\n'

    // Add nodes
    for (const [filePath, node] of this.graph.nodes) {
      const fileName = path.basename(filePath)
      const rank = node.rank.toFixed(2)
      dot += `  "${fileName}" [label="${fileName}\\nRank: ${rank}"];\n`
    }

    dot += '\n'

    // Add edges
    for (const edge of this.graph.edges) {
      const fromFile = path.basename(edge.from)
      const toFile = path.basename(edge.to)
      dot += `  "${fromFile}" -> "${toFile}";\n`
    }

    dot += '}\n'
    return dot
  }
}