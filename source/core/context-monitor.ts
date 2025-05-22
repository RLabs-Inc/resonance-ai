/**
 * Context monitoring utilities for Claude's context window management
 * 
 * This module helps Claude be aware of context usage and make intelligent
 * decisions about what to preserve, compress, or discard.
 */

export interface ContextUsage {
	totalTokens: number;
	maxTokens: number;
	utilizationPercent: number;
	remainingTokens: number;
	warningThreshold: number;
	criticalThreshold: number;
}

export interface ContextSection {
	name: string;
	estimatedTokens: number;
	priority: 'critical' | 'high' | 'medium' | 'low';
	compressible: boolean;
	lastAccessed: Date;
}

export interface ContextCompressionStrategy {
	trigger: 'warning' | 'critical' | 'manual';
	preserveCore: boolean;
	compressDetails: boolean;
	archiveCompleted: boolean;
	summaryLevel: 'brief' | 'detailed';
}

export class ContextMonitor {
	private readonly maxTokens = 200000; // Claude's context window
	private readonly warningThreshold = 0.75; // 75% usage warning
	private readonly criticalThreshold = 0.90; // 90% usage critical

	/**
	 * Estimate token count for text (rough approximation)
	 * Claude typically uses ~4 characters per token
	 */
	estimateTokens(text: string): number {
		return Math.ceil(text.length / 4);
	}

	/**
	 * Get current context usage metrics
	 */
	getCurrentUsage(conversationText: string): ContextUsage {
		const totalTokens = this.estimateTokens(conversationText);
		const utilizationPercent = totalTokens / this.maxTokens;
		
		return {
			totalTokens,
			maxTokens: this.maxTokens,
			utilizationPercent,
			remainingTokens: this.maxTokens - totalTokens,
			warningThreshold: this.warningThreshold,
			criticalThreshold: this.criticalThreshold,
		};
	}

	/**
	 * Check if context compression is needed
	 */
	shouldCompress(usage: ContextUsage): 'none' | 'warning' | 'critical' {
		if (usage.utilizationPercent >= this.criticalThreshold) {
			return 'critical';
		}
		if (usage.utilizationPercent >= this.warningThreshold) {
			return 'warning';
		}
		return 'none';
	}

	/**
	 * Analyze context sections for compression planning
	 */
	analyzeContextSections(conversationText: string): ContextSection[] {
		const sections: ContextSection[] = [];
		
		// Identify different types of content
		const codeBlocks = this.extractCodeBlocks(conversationText);
		const fileContents = this.extractFileContents(conversationText);
		const discussions = this.extractDiscussions(conversationText);
		
		// Add code sections
		codeBlocks.forEach((block, index) => {
			sections.push({
				name: `Code Block ${index + 1}`,
				estimatedTokens: this.estimateTokens(block),
				priority: this.determineCodePriority(block),
				compressible: this.isCodeCompressible(block),
				lastAccessed: new Date(),
			});
		});

		// Add file content sections
		fileContents.forEach((file, index) => {
			sections.push({
				name: `File: ${file.name}`,
				estimatedTokens: this.estimateTokens(file.content),
				priority: this.determineFilePriority(file.name, file.content),
				compressible: true,
				lastAccessed: new Date(),
			});
		});

		// Add discussion sections
		discussions.forEach((discussion, index) => {
			sections.push({
				name: `Discussion ${index + 1}`,
				estimatedTokens: this.estimateTokens(discussion),
				priority: this.determineDiscussionPriority(discussion),
				compressible: true,
				lastAccessed: new Date(),
			});
		});

		return sections.sort((a, b) => {
			// Sort by priority, then by token usage
			const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
			const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
			if (priorityDiff !== 0) return priorityDiff;
			return b.estimatedTokens - a.estimatedTokens;
		});
	}

	/**
	 * Generate compression strategy based on current usage
	 */
	generateCompressionStrategy(usage: ContextUsage, sections: ContextSection[]): ContextCompressionStrategy {
		const compressionLevel = this.shouldCompress(usage);
		
		switch (compressionLevel) {
			case 'critical':
				return {
					trigger: 'critical',
					preserveCore: true,
					compressDetails: true,
					archiveCompleted: true,
					summaryLevel: 'brief',
				};
			case 'warning':
				return {
					trigger: 'warning',
					preserveCore: true,
					compressDetails: true,
					archiveCompleted: false,
					summaryLevel: 'detailed',
				};
			default:
				return {
					trigger: 'manual',
					preserveCore: false,
					compressDetails: false,
					archiveCompleted: false,
					summaryLevel: 'detailed',
				};
		}
	}

	/**
	 * Create context status display for Claude
	 */
	formatContextStatus(usage: ContextUsage): string {
		const status = this.shouldCompress(usage);
		const percent = (usage.utilizationPercent * 100).toFixed(1);
		
		let indicator = '🟢';
		let message = 'Context healthy';
		
		if (status === 'warning') {
			indicator = '🟡';
			message = 'Context approaching limit';
		} else if (status === 'critical') {
			indicator = '🔴';
			message = 'Context compression needed';
		}

		return `${indicator} Context: ${percent}% (${usage.totalTokens.toLocaleString()}/${usage.maxTokens.toLocaleString()} tokens) - ${message}`;
	}

	// Helper methods for content analysis
	private extractCodeBlocks(text: string): string[] {
		const codeBlockRegex = /```[\s\S]*?```/g;
		return text.match(codeBlockRegex) || [];
	}

	private extractFileContents(text: string): Array<{name: string; content: string}> {
		// Look for file read operations and their results
		const filePattern = /Reading.*?\/([^\/\s]+\.(ts|js|tsx|jsx|json|md|yaml|yml))[\s\S]*?```[\s\S]*?```/g;
		const matches = text.match(filePattern) || [];
		
		return matches.map((match, index) => ({
			name: `file-${index}`,
			content: match,
		}));
	}

	private extractDiscussions(text: string): string[] {
		// Split by tool calls and responses to identify discussion sections
		const sections = text.split(/\n(?=<function_calls>|\n\n)/);
		return sections.filter(section => 
			!section.includes('<function_calls>') && 
			section.length > 100
		);
	}

	private determineCodePriority(code: string): 'critical' | 'high' | 'medium' | 'low' {
		// Current implementation code = critical
		if (code.includes('export class') || code.includes('export function')) {
			return 'critical';
		}
		// Type definitions = high
		if (code.includes('interface') || code.includes('type ')) {
			return 'high';
		}
		// Examples and tests = medium
		if (code.includes('test') || code.includes('example')) {
			return 'medium';
		}
		return 'low';
	}

	private determineFilePriority(name: string, content: string): 'critical' | 'high' | 'medium' | 'low' {
		// Core type definitions
		if (name.includes('types.ts') || name.includes('errors.ts')) {
			return 'critical';
		}
		// Main service files
		if (name.includes('Service.ts') || name.includes('service.ts')) {
			return 'high';
		}
		// Configuration and utilities
		if (name.includes('config') || name.includes('utils')) {
			return 'medium';
		}
		return 'low';
	}

	private determineDiscussionPriority(discussion: string): 'critical' | 'high' | 'medium' | 'low' {
		// Architectural decisions = critical
		if (discussion.includes('architecture') || discussion.includes('design')) {
			return 'critical';
		}
		// Current task discussion = high
		if (discussion.includes('implement') || discussion.includes('build')) {
			return 'high';
		}
		// General discussion = medium
		return 'medium';
	}

	private isCodeCompressible(code: string): boolean {
		// Don't compress short, critical code
		if (code.length < 500) return false;
		// Don't compress type definitions
		if (code.includes('interface') || code.includes('type ')) return false;
		// Most other code can be compressed to signatures/patterns
		return true;
	}
}