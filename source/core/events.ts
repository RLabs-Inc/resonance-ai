/**
 * Event system for ResonanceAI MVP
 *
 * Provides a type-safe event bus for communication between services.
 * Designed for Claude's needs with proper error handling and async support.
 */

import {
	ResonanceEvent,
	IndexingEvent,
	ContextEvent,
	BriefingEvent,
} from './types.js';

export type EventHandler<T extends ResonanceEvent = ResonanceEvent> = (
	event: T,
) => Promise<void> | void;

export interface EventBusConfig {
	maxListeners: number;
	errorHandler?: (error: Error, event: ResonanceEvent) => void;
	enableLogging: boolean;
}

export class EventBus {
	private listeners: Map<string, EventHandler[]> = new Map();
	private config: EventBusConfig;

	constructor(config: Partial<EventBusConfig> = {}) {
		this.config = {
			maxListeners: 100,
			enableLogging: false,
			...config,
		};
	}

	/**
	 * Emit an event to all registered listeners
	 */
	async emit<T extends ResonanceEvent>(event: T): Promise<void> {
		const eventType = event.type;
		const handlers = this.listeners.get(eventType) || [];

		if (this.config.enableLogging) {
			console.log(`[EventBus] Emitting event: ${eventType}`);
		}

		// Execute all handlers, collecting any errors
		const errors: Error[] = [];
		const promises: Promise<void>[] = [];

		for (const handler of handlers) {
			try {
				const result = handler(event);
				if (result instanceof Promise) {
					promises.push(
						result.catch(error => {
							errors.push(error);
							this.handleError(error, event);
						}),
					);
				}
			} catch (error) {
				errors.push(error instanceof Error ? error : new Error(String(error)));
				this.handleError(
					error instanceof Error ? error : new Error(String(error)),
					event,
				);
			}
		}

		// Wait for all async handlers to complete
		if (promises.length > 0) {
			await Promise.allSettled(promises);
		}

		// If there were errors and no custom error handler, throw the first one
		if (errors.length > 0 && !this.config.errorHandler) {
			throw errors[0];
		}
	}

	/**
	 * Register an event listener
	 */
	on<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		if (!this.listeners.has(eventType)) {
			this.listeners.set(eventType, []);
		}

		const handlers = this.listeners.get(eventType)!;

		if (handlers.length >= this.config.maxListeners) {
			throw new Error(
				`Maximum number of listeners (${this.config.maxListeners}) exceeded for event: ${eventType}`,
			);
		}

		handlers.push(handler as EventHandler);

		if (this.config.enableLogging) {
			console.log(`[EventBus] Registered listener for: ${eventType}`);
		}
	}

	/**
	 * Register a one-time event listener
	 */
	once<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		const oneTimeHandler: EventHandler<T> = async event => {
			await handler(event);
			this.off(eventType, oneTimeHandler as EventHandler);
		};

		this.on(eventType, oneTimeHandler);
	}

	/**
	 * Remove an event listener
	 */
	off<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		const handlers = this.listeners.get(eventType);
		if (!handlers) {
			return;
		}

		const index = handlers.indexOf(handler as EventHandler);
		if (index !== -1) {
			handlers.splice(index, 1);

			if (this.config.enableLogging) {
				console.log(`[EventBus] Removed listener for: ${eventType}`);
			}
		}

		// Clean up empty arrays
		if (handlers.length === 0) {
			this.listeners.delete(eventType);
		}
	}

	/**
	 * Remove all listeners for an event type
	 */
	removeAllListeners(eventType?: string): void {
		if (eventType) {
			this.listeners.delete(eventType);
			if (this.config.enableLogging) {
				console.log(`[EventBus] Removed all listeners for: ${eventType}`);
			}
		} else {
			this.listeners.clear();
			if (this.config.enableLogging) {
				console.log(`[EventBus] Removed all listeners`);
			}
		}
	}

	/**
	 * Get the number of listeners for an event type
	 */
	listenerCount(eventType: string): number {
		return this.listeners.get(eventType)?.length || 0;
	}

	/**
	 * Get all registered event types
	 */
	eventTypes(): string[] {
		return Array.from(this.listeners.keys());
	}

	/**
	 * Wait for a specific event to be emitted
	 */
	waitFor<T extends ResonanceEvent>(
		eventType: string,
		timeout?: number,
	): Promise<T> {
		return new Promise((resolve, reject) => {
			let timeoutId: NodeJS.Timeout | null = null;

			const handler: EventHandler<T> = event => {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
				this.off(eventType, handler);
				resolve(event);
			};

			this.once(eventType, handler);

			if (timeout) {
				timeoutId = setTimeout(() => {
					this.off(eventType, handler);
					reject(new Error(`Timeout waiting for event: ${eventType}`));
				}, timeout);
			}
		});
	}

	/**
	 * Handle errors from event handlers
	 */
	private handleError(error: Error, event: ResonanceEvent): void {
		if (this.config.errorHandler) {
			try {
				this.config.errorHandler(error, event);
			} catch (handlerError) {
				console.error('Error in error handler:', handlerError);
				console.error('Original error:', error);
			}
		} else if (this.config.enableLogging) {
			console.error(
				`[EventBus] Error in event handler for ${event.type}:`,
				error,
			);
		}
	}

	/**
	 * Create a scoped event emitter for a specific service
	 */
	createScope(source: string): ScopedEventEmitter {
		return new ScopedEventEmitter(this, source);
	}
}

/**
 * Scoped event emitter that automatically sets the source
 */
export class ScopedEventEmitter {
	constructor(private eventBus: EventBus, private source: string) {}

	async emit<T extends ResonanceEvent>(
		eventType: string,
		data: T['data'],
	): Promise<void> {
		const event: ResonanceEvent = {
			type: eventType,
			timestamp: new Date(),
			source: this.source,
			data,
		};

		await this.eventBus.emit(event as T);
	}

	on<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		this.eventBus.on(eventType, handler);
	}

	once<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		this.eventBus.once(eventType, handler);
	}

	off<T extends ResonanceEvent>(
		eventType: string,
		handler: EventHandler<T>,
	): void {
		this.eventBus.off(eventType, handler);
	}

	waitFor<T extends ResonanceEvent>(
		eventType: string,
		timeout?: number,
	): Promise<T> {
		return this.eventBus.waitFor(eventType, timeout);
	}
}

// Event factory functions for type safety
export const Events = {
	indexing: {
		started: (projectPath: string): IndexingEvent => ({
			type: 'indexing.started',
			timestamp: new Date(),
			source: 'IndexingService',
			data: {projectPath},
		}),

		progress: (filesProcessed: number, totalFiles: number): IndexingEvent => ({
			type: 'indexing.progress',
			timestamp: new Date(),
			source: 'IndexingService',
			data: {filesProcessed, totalFiles},
		}),

		completed: (projectPath: string, totalFiles: number): IndexingEvent => ({
			type: 'indexing.completed',
			timestamp: new Date(),
			source: 'IndexingService',
			data: {projectPath, totalFiles},
		}),

		failed: (error: Error, projectPath?: string): IndexingEvent => ({
			type: 'indexing.failed',
			timestamp: new Date(),
			source: 'IndexingService',
			data: {error, projectPath},
		}),
	},

	context: {
		started: (task: any): ContextEvent => ({
			type: 'context.started',
			timestamp: new Date(),
			source: 'ContextService',
			data: {task},
		}),

		completed: (
			task: any,
			filesAnalyzed: number,
			relevantFiles: number,
		): ContextEvent => ({
			type: 'context.completed',
			timestamp: new Date(),
			source: 'ContextService',
			data: {task, filesAnalyzed, relevantFiles},
		}),

		failed: (error: Error, task?: any): ContextEvent => ({
			type: 'context.failed',
			timestamp: new Date(),
			source: 'ContextService',
			data: {error, task},
		}),
	},

	briefing: {
		started: (task: any): BriefingEvent => ({
			type: 'briefing.started',
			timestamp: new Date(),
			source: 'BriefingService',
			data: {task},
		}),

		completed: (
			task: any,
			briefLength: number,
			templateUsed: string,
		): BriefingEvent => ({
			type: 'briefing.completed',
			timestamp: new Date(),
			source: 'BriefingService',
			data: {task, briefLength, templateUsed},
		}),

		failed: (error: Error, task?: any): BriefingEvent => ({
			type: 'briefing.failed',
			timestamp: new Date(),
			source: 'BriefingService',
			data: {error, task},
		}),
	},
};

// Singleton instance for global access
let globalEventBus: EventBus | null = null;

/**
 * Get the global event bus instance
 */
export function getEventBus(): EventBus {
	if (!globalEventBus) {
		globalEventBus = new EventBus({
			enableLogging: process.env['NODE_ENV'] === 'development',
		});
	}
	return globalEventBus;
}

/**
 * Create a new event bus instance
 */
export function createEventBus(config?: Partial<EventBusConfig>): EventBus {
	return new EventBus(config);
}
