/**
 * Anthropic API service for Resonance-AI
 * 
 * Provides intelligent communication with Claude, including real-time cost monitoring
 * and optimized usage tracking for development tasks.
 */

import Anthropic from '@anthropic-ai/sdk';
import type {
	Message,
	MessageCreateParams,
	MessageStreamEvent,
	Usage,
	ContentBlock,
	TextBlock,
} from '@anthropic-ai/sdk';
import {ResonanceError} from '../../core/errors.js';
import {EventBus} from '../../core/events.js';

export interface ApiUsageMetrics {
	inputTokens: number;
	outputTokens: number;
	cacheCreationTokens?: number;
	cacheReadTokens?: number;
	webSearchRequests?: number;
	totalCost: number;
	sessionCost: number;
	requestCount: number;
}

export interface CostBreakdown {
	inputCost: number;
	outputCost: number;
	cacheCost: number;
	webSearchCost: number;
	total: number;
}

export interface ModelPricing {
	inputTokenPrice: number; // per 1M tokens
	outputTokenPrice: number; // per 1M tokens
	cacheWritePrice: number; // per 1M tokens
	cacheReadPrice: number; // per 1M tokens
	webSearchPrice: number; // per request
}

export interface AnthropicConfig {
	apiKey: string;
	model: string;
	maxTokens: number;
	temperature: number;
	baseURL?: string;
	timeout?: number;
	maxRetries?: number;
}

export interface ResonanceRequest {
	task: string;
	context?: string;
	codebase?: string;
	constraints?: string[];
	priority: 'low' | 'medium' | 'high';
	expectedTokens?: number;
}

export interface ResonanceResponse {
	content: string;
	usage: ApiUsageMetrics;
	costBreakdown: CostBreakdown;
	requestId: string;
	confidence: number;
	suggestions?: string[];
}

/**
 * Anthropic API service with comprehensive cost tracking
 */
export class AnthropicService {
	private client: Anthropic;
	private config: AnthropicConfig;
	private eventBus: EventBus;
	private sessionMetrics: ApiUsageMetrics;
	private modelPricing: Record<string, ModelPricing>;

	constructor(config: AnthropicConfig, eventBus: EventBus) {
		this.config = config;
		this.eventBus = eventBus;
		
		this.client = new Anthropic({
			apiKey: config.apiKey,
			baseURL: config.baseURL,
			timeout: config.timeout || 10 * 60 * 1000, // 10 minutes
			maxRetries: config.maxRetries || 2,
		});

		this.sessionMetrics = this.initializeMetrics();
		this.modelPricing = this.initializePricing();
	}

	/**
	 * Initialize session metrics tracking
	 */
	private initializeMetrics(): ApiUsageMetrics {
		return {
			inputTokens: 0,
			outputTokens: 0,
			cacheCreationTokens: 0,
			cacheReadTokens: 0,
			webSearchRequests: 0,
			totalCost: 0,
			sessionCost: 0,
			requestCount: 0,
		};
	}

	/**
	 * Initialize model pricing (as of latest API documentation)
	 */
	private initializePricing(): Record<string, ModelPricing> {
		return {
			'claude-3-5-sonnet-latest': {
				inputTokenPrice: 3.00, // $3.00 per 1M tokens
				outputTokenPrice: 15.00, // $15.00 per 1M tokens
				cacheWritePrice: 3.75, // $3.75 per 1M tokens
				cacheReadPrice: 0.30, // $0.30 per 1M tokens
				webSearchPrice: 0.30, // $0.30 per request
			},
			'claude-3-5-sonnet-20241022': {
				inputTokenPrice: 3.00,
				outputTokenPrice: 15.00,
				cacheWritePrice: 3.75,
				cacheReadPrice: 0.30,
				webSearchPrice: 0.30,
			},
			'claude-3-5-haiku-latest': {
				inputTokenPrice: 0.25, // $0.25 per 1M tokens
				outputTokenPrice: 1.25, // $1.25 per 1M tokens
				cacheWritePrice: 0.30, // $0.30 per 1M tokens
				cacheReadPrice: 0.03, // $0.03 per 1M tokens
				webSearchPrice: 0.30, // $0.30 per request
			},
		};
	}

	/**
	 * Send a request to Claude with comprehensive tracking
	 */
	async sendRequest(request: ResonanceRequest): Promise<ResonanceResponse> {
		const emitter = this.eventBus.createScope('AnthropicService');
		
		try {
			await emitter.emit('api.request.started', {
				task: request.task,
				priority: request.priority,
				expectedTokens: request.expectedTokens,
			});

			// Build the message
			const messages = this.buildMessages(request);
			
			// Estimate tokens before request (for cost prediction)
			const estimatedTokens = await this.countTokens(messages);
			const estimatedCost = this.calculateCost({
				input_tokens: estimatedTokens,
				output_tokens: request.expectedTokens || this.config.maxTokens,
			}, this.config.model);

			await emitter.emit('api.cost.estimated', {
				estimatedTokens,
				estimatedCost,
			});

			// Make the request
			const response = await this.client.messages.create({
				model: this.config.model,
				max_tokens: this.config.maxTokens,
				temperature: this.config.temperature,
				messages,
			});

			// Calculate actual costs
			const usage = this.processUsage(response.usage);
			const costBreakdown = this.calculateCost(response.usage, this.config.model);
			
			// Update session metrics
			this.updateSessionMetrics(usage);

			await emitter.emit('api.request.completed', {
				usage,
				costBreakdown,
				requestId: response.id,
			});

			// Extract content
			const content = this.extractContent(response.content);

			return {
				content,
				usage,
				costBreakdown,
				requestId: response.id,
				confidence: this.assessConfidence(content, request),
				suggestions: this.extractSuggestions(content),
			};

		} catch (error) {
			await emitter.emit('api.request.failed', {
				task: request.task,
				error: error instanceof Error ? error : new Error(String(error)),
			});

			if (error instanceof Anthropic.APIError) {
				throw new ResonanceError(
					`Anthropic API error: ${error.message}`,
					'API_ERROR',
					{
						status: error.status,
						requestId: error.headers?.['x-request-id'],
						type: error.constructor.name,
					}
				);
			}

			throw new ResonanceError(
				`Failed to communicate with Claude: ${error instanceof Error ? error.message : String(error)}`,
				'API_COMMUNICATION_FAILED',
				{request}
			);
		}
	}

	/**
	 * Send a streaming request with real-time cost monitoring
	 */
	async sendStreamingRequest(
		request: ResonanceRequest,
		onChunk: (chunk: string, usage?: ApiUsageMetrics) => void
	): Promise<ResonanceResponse> {
		const emitter = this.eventBus.createScope('AnthropicService');
		
		try {
			const messages = this.buildMessages(request);
			
			const stream = this.client.messages.stream({
				model: this.config.model,
				max_tokens: this.config.maxTokens,
				temperature: this.config.temperature,
				messages,
			});

			let accumulatedContent = '';

			// Handle streaming events
			for await (const event of stream) {
				if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
					const chunk = event.delta.text;
					accumulatedContent += chunk;
					onChunk(chunk);
				} else if (event.type === 'message_delta' && event.usage) {
					// Emit real-time usage updates
					const currentUsage = this.processUsage(event.usage);
					const currentCost = this.calculateCost(event.usage, this.config.model);
					
					await emitter.emit('api.usage.updated', {
						usage: currentUsage,
						cost: currentCost,
					});
					
					onChunk('', currentUsage);
				}
			}

			// Get final message with complete usage
			const finalMessage = await stream.finalMessage();
			const usage = this.processUsage(finalMessage.usage);
			const costBreakdown = this.calculateCost(finalMessage.usage, this.config.model);
			
			this.updateSessionMetrics(usage);

			return {
				content: accumulatedContent,
				usage,
				costBreakdown,
				requestId: finalMessage.id,
				confidence: this.assessConfidence(accumulatedContent, request),
				suggestions: this.extractSuggestions(accumulatedContent),
			};

		} catch (error) {
			await emitter.emit('api.request.failed', {
				task: request.task,
				error: error instanceof Error ? error : new Error(String(error)),
			});

			throw new ResonanceError(
				`Streaming request failed: ${error instanceof Error ? error.message : String(error)}`,
				'STREAMING_FAILED',
				{request}
			);
		}
	}

	/**
	 * Count tokens for a message without making a request
	 */
	async countTokens(messages: MessageCreateParams['messages']): Promise<number> {
		try {
			const result = await this.client.messages.countTokens({
				model: this.config.model,
				messages,
			});
			
			return result.input_tokens;
		} catch (error) {
			// Fallback to estimation if counting fails
			return this.estimateTokens(messages);
		}
	}

	/**
	 * Get current session metrics
	 */
	getSessionMetrics(): ApiUsageMetrics {
		return {...this.sessionMetrics};
	}

	/**
	 * Reset session metrics
	 */
	resetSessionMetrics(): void {
		this.sessionMetrics = this.initializeMetrics();
		this.eventBus.emit('api.session.reset', {
			timestamp: new Date(),
		});
	}

	/**
	 * Get real-time cost status for CLI display
	 */
	getCostStatus(): string {
		const metrics = this.sessionMetrics;
		const totalTokens = metrics.inputTokens + metrics.outputTokens;
		
		if (metrics.sessionCost === 0) {
			return '💰 Cost: $0.00 (0 tokens)';
		}

		const costStr = metrics.sessionCost < 0.01 
			? `$${(metrics.sessionCost * 1000).toFixed(2)}m` // Show in millidollars if very small
			: `$${metrics.sessionCost.toFixed(4)}`;

		return `💰 Cost: ${costStr} (${totalTokens.toLocaleString()} tokens, ${metrics.requestCount} requests)`;
	}

	/**
	 * Build messages from Resonance request
	 */
	private buildMessages(request: ResonanceRequest): MessageCreateParams['messages'] {
		const systemPrompt = this.buildSystemPrompt(request);
		const userMessage = this.buildUserMessage(request);

		return [
			{
				role: 'user',
				content: `System Context: ${systemPrompt}\n\nTask: ${userMessage}`,
			},
		];
	}

	/**
	 * Build system prompt for Resonance-AI context
	 */
	private buildSystemPrompt(request: ResonanceRequest): string {
		return `You are Resonance-AI, a development assistant built by Claude for Claude. You help with software development tasks by providing intelligent, context-aware guidance.

Context:
- You understand TypeScript, Node.js, and modern development patterns
- You focus on practical, actionable solutions
- You provide concise, high-quality responses
- You consider architectural patterns and best practices

${request.codebase ? `Codebase Context: ${request.codebase}` : ''}
${request.constraints ? `Constraints: ${request.constraints.join(', ')}` : ''}`;
	}

	/**
	 * Build user message with task details
	 */
	private buildUserMessage(request: ResonanceRequest): string {
		let message = request.task;
		
		if (request.context) {
			message += `\n\nAdditional Context: ${request.context}`;
		}

		return message;
	}

	/**
	 * Process API usage into our metrics format
	 */
	private processUsage(usage: Usage): ApiUsageMetrics {
		return {
			inputTokens: usage.input_tokens,
			outputTokens: usage.output_tokens,
			cacheCreationTokens: usage.cache_creation_input_tokens || 0,
			cacheReadTokens: usage.cache_read_input_tokens || 0,
			webSearchRequests: usage.server_tool_use?.web_search_requests || 0,
			totalCost: 0, // Will be calculated
			sessionCost: 0, // Will be updated
			requestCount: 1,
		};
	}

	/**
	 * Calculate cost breakdown for a request
	 */
	private calculateCost(usage: Usage, model: string): CostBreakdown {
		const pricing = this.modelPricing[model];
		if (!pricing) {
			throw new ResonanceError(`Unknown model pricing: ${model}`, 'UNKNOWN_MODEL_PRICING');
		}

		const inputCost = (usage.input_tokens / 1_000_000) * pricing.inputTokenPrice;
		const outputCost = (usage.output_tokens / 1_000_000) * pricing.outputTokenPrice;
		const cacheCost = ((usage.cache_creation_input_tokens || 0) / 1_000_000) * pricing.cacheWritePrice +
			((usage.cache_read_input_tokens || 0) / 1_000_000) * pricing.cacheReadPrice;
		const webSearchCost = (usage.server_tool_use?.web_search_requests || 0) * pricing.webSearchPrice;

		return {
			inputCost,
			outputCost,
			cacheCost,
			webSearchCost,
			total: inputCost + outputCost + cacheCost + webSearchCost,
		};
	}

	/**
	 * Update session metrics with new usage
	 */
	private updateSessionMetrics(usage: ApiUsageMetrics): void {
		this.sessionMetrics.inputTokens += usage.inputTokens;
		this.sessionMetrics.outputTokens += usage.outputTokens;
		this.sessionMetrics.cacheCreationTokens! += usage.cacheCreationTokens || 0;
		this.sessionMetrics.cacheReadTokens! += usage.cacheReadTokens || 0;
		this.sessionMetrics.webSearchRequests! += usage.webSearchRequests || 0;
		this.sessionMetrics.totalCost += usage.totalCost;
		this.sessionMetrics.sessionCost += usage.totalCost;
		this.sessionMetrics.requestCount += 1;
	}

	/**
	 * Extract text content from response
	 */
	private extractContent(content: ContentBlock[]): string {
		return content
			.filter((block): block is TextBlock => block.type === 'text')
			.map(block => block.text)
			.join('\n');
	}

	/**
	 * Assess confidence in the response
	 */
	private assessConfidence(content: string, request: ResonanceRequest): number {
		// Simple confidence assessment based on response characteristics
		let confidence = 0.8; // Base confidence

		// Adjust based on response length vs task complexity
		if (content.length < 100 && request.priority === 'high') {
			confidence -= 0.2;
		}

		// Adjust based on uncertainty indicators
		const uncertaintyMarkers = ['maybe', 'might', 'possibly', 'unclear', 'uncertain'];
		const uncertaintyCount = uncertaintyMarkers.reduce((count, marker) => 
			count + (content.toLowerCase().split(marker).length - 1), 0);
		
		confidence -= uncertaintyCount * 0.1;

		return Math.max(0.1, Math.min(1.0, confidence));
	}

	/**
	 * Extract actionable suggestions from response
	 */
	private extractSuggestions(content: string): string[] {
		const suggestions: string[] = [];
		
		// Look for numbered lists or bullet points
		const listItems = content.match(/(?:^\d+\.|^[•\-\*])\s+(.+)$/gm);
		if (listItems) {
			suggestions.push(...listItems.slice(0, 5)); // Max 5 suggestions
		}

		return suggestions;
	}

	/**
	 * Fallback token estimation
	 */
	private estimateTokens(messages: MessageCreateParams['messages']): number {
		const text = messages.map(msg => 
			typeof msg.content === 'string' ? msg.content : 
			Array.isArray(msg.content) ? msg.content.map(c => 'text' in c ? c.text : '').join('') :
			''
		).join('');
		
		// Rough estimation: ~4 characters per token
		return Math.ceil(text.length / 4);
	}
}