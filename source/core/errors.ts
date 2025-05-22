/**
 * Error handling framework for GuardianAI MVP
 *
 * Provides custom error classes for each domain with context and cause chaining.
 * Designed for Claude's debugging needs with clear, actionable error messages.
 */

/**
 * Base error class for all GuardianAI errors
 */
export class GuardianError extends Error {
	readonly code: string;
	readonly category: string;
	public readonly context?: Record<string, any>;
	public override readonly cause?: Error;

	constructor(
		message: string,
		code: string = 'GUARDIAN_ERROR',
		context?: Record<string, any>,
		cause?: Error,
	) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.category = 'general';
		this.context = context;
		this.cause = cause;

		// Maintain proper stack trace
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}

	/**
	 * Get a structured representation of the error
	 */
	toJSON(): Record<string, any> {
		return {
			name: this.name,
			code: this.code,
			category: this.category,
			message: this.message,
			context: this.context,
			cause: this.cause
				? {
						name: this.cause.name,
						message: this.cause.message,
						stack: this.cause.stack,
				  }
				: undefined,
			stack: this.stack,
		};
	}

	/**
	 * Get a detailed string representation
	 */
	override toString(): string {
		let result = `${this.name} [${this.code}]: ${this.message}`;

		if (this.context && Object.keys(this.context).length > 0) {
			result += `\nContext: ${JSON.stringify(this.context, null, 2)}`;
		}

		if (this.cause) {
			result += `\nCaused by: ${this.cause.name}: ${this.cause.message}`;
		}

		return result;
	}
}

/**
 * Configuration-related errors
 */
export class ConfigurationError extends GuardianError {
	readonly category = 'configuration';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Configuration Error: ${message}`, 'CONFIG_ERROR', context, cause);
	}
}

/**
 * File system operation errors
 */
export class FileSystemError extends GuardianError {
	readonly category = 'filesystem';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`File System Error: ${message}`, 'FILESYSTEM_ERROR', context, cause);
	}
}

/**
 * Project indexing errors
 */
export class IndexingError extends GuardianError {
	readonly category = 'indexing';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Indexing Error: ${message}`, 'INDEXING_ERROR', context, cause);
	}
}

/**
 * File parsing errors
 */
export class ParseError extends GuardianError {
	readonly category = 'parsing';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Parse Error: ${message}`, 'PARSE_ERROR', context, cause);
	}
}

/**
 * Context compilation errors
 */
export class ContextError extends GuardianError {
	readonly category = 'context';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Context Error: ${message}`, 'CONTEXT_ERROR', context, cause);
	}
}

/**
 * Pattern recognition errors
 */
export class PatternError extends GuardianError {
	readonly category = 'pattern';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Pattern Error: ${message}`, 'PATTERN_ERROR', context, cause);
	}
}

/**
 * Brief generation errors
 */
export class BriefingError extends GuardianError {
	readonly category = 'briefing';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Briefing Error: ${message}`, 'BRIEFING_ERROR', context, cause);
	}
}

/**
 * Template processing errors
 */
export class TemplateError extends GuardianError {
	readonly category = 'template';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Template Error: ${message}`, 'TEMPLATE_ERROR', context, cause);
	}
}

/**
 * Validation errors
 */
export class ValidationError extends GuardianError {
	readonly category = 'validation';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Validation Error: ${message}`, 'VALIDATION_ERROR', context, cause);
	}
}

/**
 * Interface/UI errors
 */
export class InterfaceError extends GuardianError {
	readonly category = 'interface';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Interface Error: ${message}`, 'INTERFACE_ERROR', context, cause);
	}
}

/**
 * Network/external service errors
 */
export class NetworkError extends GuardianError {
	readonly category = 'network';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Network Error: ${message}`, 'NETWORK_ERROR', context, cause);
	}
}

/**
 * Performance/resource errors
 */
export class PerformanceError extends GuardianError {
	readonly category = 'performance';
	constructor(message: string, context?: Record<string, any>, cause?: Error) {
		super(`Performance Error: ${message}`, 'PERFORMANCE_ERROR', context, cause);
	}
}

/**
 * Centralized error handler
 */
export class ErrorHandler {
	private static loggers: Map<string, (error: GuardianError) => void> =
		new Map();

	/**
	 * Handle any error with appropriate logging and context
	 */
	static handle(error: Error, context?: Record<string, any>): void {
		if (error instanceof GuardianError) {
			this.handleGuardianError(error);
		} else {
			this.handleGenericError(error, context);
		}
	}

	/**
	 * Handle GuardianAI-specific errors
	 */
	private static handleGuardianError(error: GuardianError): void {
		const logger = this.loggers.get(error.category);
		if (logger) {
			logger(error);
		} else {
			this.defaultLogger(error);
		}
	}

	/**
	 * Handle generic errors
	 */
	private static handleGenericError(
		error: Error,
		context?: Record<string, any>,
	): void {
		console.error('Unexpected Error:', error.message);
		if (context) {
			console.error('Context:', JSON.stringify(context, null, 2));
		}
		if (error.stack) {
			console.error('Stack:', error.stack);
		}
	}

	/**
	 * Default error logger
	 */
	private static defaultLogger(error: GuardianError): void {
		console.error(`[${error.category.toUpperCase()}] ${error.message}`);

		if (error.context) {
			console.error('Context:', JSON.stringify(error.context, null, 2));
		}

		if (error.cause) {
			console.error('Caused by:', error.cause.message);
			if (error.cause.stack && process.env['NODE_ENV'] === 'development') {
				console.error('Cause stack:', error.cause.stack);
			}
		}

		if (error.stack && process.env['NODE_ENV'] === 'development') {
			console.error('Stack:', error.stack);
		}
	}

	/**
	 * Register a custom logger for a specific error category
	 */
	static registerLogger(
		category: string,
		logger: (error: GuardianError) => void,
	): void {
		this.loggers.set(category, logger);
	}

	/**
	 * Create an error with automatic context capture
	 */
	static createError<T extends GuardianError>(
		ErrorClass: new (
			message: string,
			context?: Record<string, any>,
			cause?: Error,
		) => T,
		message: string,
		context?: Record<string, any>,
		cause?: Error,
	): T {
		// Add automatic context like timestamp, process info, etc.
		const enrichedContext = {
			timestamp: new Date().toISOString(),
			nodeVersion: process.version,
			platform: process.platform,
			...context,
		};

		return new ErrorClass(message, enrichedContext, cause);
	}

	/**
	 * Wrap an async function with error handling
	 */
	static wrapAsync<T extends any[], R>(
		fn: (...args: T) => Promise<R>,
		errorContext?: Record<string, any>,
	): (...args: T) => Promise<R> {
		return async (...args: T): Promise<R> => {
			try {
				return await fn(...args);
			} catch (error) {
				this.handle(
					error instanceof Error ? error : new Error(String(error)),
					errorContext,
				);
				throw error;
			}
		};
	}

	/**
	 * Wrap a sync function with error handling
	 */
	static wrapSync<T extends any[], R>(
		fn: (...args: T) => R,
		errorContext?: Record<string, any>,
	): (...args: T) => R {
		return (...args: T): R => {
			try {
				return fn(...args);
			} catch (error) {
				this.handle(
					error instanceof Error ? error : new Error(String(error)),
					errorContext,
				);
				throw error;
			}
		};
	}
}

/**
 * Decorator for automatic error handling in class methods
 */
export function handleErrors(context?: Record<string, any>) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	) {
		const originalMethod = descriptor.value;

		if (typeof originalMethod !== 'function') {
			throw new Error('handleErrors can only be applied to methods');
		}

		descriptor.value = function (...args: any[]) {
			try {
				const result = originalMethod.apply(this, args);

				// Handle async methods
				if (result instanceof Promise) {
					return result.catch((error: Error) => {
						ErrorHandler.handle(error, {
							className: target.constructor.name,
							methodName: propertyKey,
							...context,
						});
						throw error;
					});
				}

				return result;
			} catch (error) {
				ErrorHandler.handle(
					error instanceof Error ? error : new Error(String(error)),
					{
						className: target.constructor.name,
						methodName: propertyKey,
						...context,
					},
				);
				throw error;
			}
		};

		return descriptor;
	};
}

/**
 * Utility functions for common error scenarios
 */
export const ErrorUtils = {
	/**
	 * Assert a condition or throw an error
	 */
	assert(
		condition: any,
		ErrorClass: new (...args: any[]) => GuardianError,
		message: string,
		context?: Record<string, any>,
	): asserts condition {
		if (!condition) {
			throw new ErrorClass(message, context);
		}
	},

	/**
	 * Safely access a nested property
	 */
	safeAccess<T>(obj: any, path: string, defaultValue?: T): T | undefined {
		try {
			return (
				path.split('.').reduce((current, key) => current?.[key], obj) ??
				defaultValue
			);
		} catch {
			return defaultValue;
		}
	},

	/**
	 * Create a recoverable error that suggests solutions
	 */
	createRecoverableError(
		ErrorClass: new (...args: any[]) => GuardianError,
		message: string,
		suggestions: string[],
		context?: Record<string, any>,
	): GuardianError {
		return new ErrorClass(
			`${message}\n\nSuggestions:\n${suggestions
				.map(s => `- ${s}`)
				.join('\n')}`,
			context,
		);
	},

	/**
	 * Check if an error is of a specific type
	 */
	isErrorType<T extends GuardianError>(
		error: Error,
		ErrorClass: new (...args: any[]) => T,
	): error is T {
		return error instanceof ErrorClass;
	},
};

// Export specific error types for convenience
export {GuardianError as BaseError};
