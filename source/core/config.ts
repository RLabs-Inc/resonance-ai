/**
 * Configuration management system for ResonanceAI MVP
 *
 * Provides hierarchical configuration loading with support for YAML, JSON,
 * and environment variables. Designed for Claude's preferences with sensible defaults.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'yaml';
import {ResonanceConfig} from './types.js';
import {ConfigurationError} from './errors.js';

export class ConfigurationManager {
	private config: ResonanceConfig | null = null;
	private configPath: string | null = null;

	/**
	 * Load configuration from multiple sources with proper hierarchy
	 */
	async loadConfig(projectRoot?: string): Promise<ResonanceConfig> {
		const configSources = await this.findConfigFiles(projectRoot);

		// Start with default configuration
		let config = this.getDefaultConfig();

		// Apply configurations in order (later ones override earlier ones)
		for (const configFile of configSources) {
			try {
				const fileConfig = await this.loadConfigFile(configFile);
				config = this.mergeConfigs(config, fileConfig);
				this.configPath = configFile;
			} catch (error) {
				throw new ConfigurationError(
					`Failed to load configuration from ${configFile}`,
					{configFile},
					error instanceof Error ? error : undefined,
				);
			}
		}

		// Apply environment variable overrides
		config = this.applyEnvironmentOverrides(config);

		// Validate the final configuration
		this.validateConfig(config);

		this.config = config;
		return config;
	}

	/**
	 * Get the current configuration
	 */
	getConfig(): ResonanceConfig {
		if (!this.config) {
			throw new ConfigurationError(
				'Configuration not loaded. Call loadConfig() first.',
			);
		}
		return this.config;
	}

	/**
	 * Save current configuration to file
	 */
	async saveConfig(filePath?: string): Promise<void> {
		if (!this.config) {
			throw new ConfigurationError('No configuration to save');
		}

		const targetPath =
			filePath || this.configPath || 'resonance-ai.config.yaml';

		try {
			const configYaml = yaml.stringify(this.config, {
				indent: 2,
				lineWidth: 120,
			});

			await fs.writeFile(targetPath, configYaml, 'utf8');
		} catch (error) {
			throw new ConfigurationError(
				`Failed to save configuration to ${targetPath}`,
				{targetPath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Update configuration values
	 */
	updateConfig(updates: Partial<ResonanceConfig>): ResonanceConfig {
		if (!this.config) {
			throw new ConfigurationError('Configuration not loaded');
		}

		this.config = this.mergeConfigs(this.config, updates);
		this.validateConfig(this.config);
		return this.config;
	}

	/**
	 * Find configuration files in the project hierarchy
	 */
	private async findConfigFiles(projectRoot?: string): Promise<string[]> {
		const configFiles: string[] = [];
		const configNames = [
			'resonance-ai.config.yaml',
			'resonance-ai.config.yml',
			'resonance-ai.config.json',
			'.resonance-ai.yaml',
			'.resonance-ai.yml',
			'.resonance-ai.json',
		];

		const searchPaths = [
			projectRoot || process.cwd(),
			path.join(process.cwd(), '.config'),
			path.join(require('os').homedir(), '.config', 'resonance-ai'),
			path.dirname(require.main?.filename || __filename),
		];

		for (const searchPath of searchPaths) {
			for (const configName of configNames) {
				const configPath = path.join(searchPath, configName);
				try {
					await fs.access(configPath);
					configFiles.push(configPath);
				} catch {
					// File doesn't exist, continue
				}
			}
		}

		return configFiles;
	}

	/**
	 * Load and parse a configuration file
	 */
	private async loadConfigFile(
		filePath: string,
	): Promise<Partial<ResonanceConfig>> {
		try {
			const content = await fs.readFile(filePath, 'utf8');
			const ext = path.extname(filePath).toLowerCase();

			if (ext === '.json') {
				return JSON.parse(content);
			} else if (ext === '.yaml' || ext === '.yml') {
				return yaml.parse(content);
			} else {
				throw new ConfigurationError(
					`Unsupported configuration file format: ${ext}`,
				);
			}
		} catch (error) {
			if (error instanceof ConfigurationError) {
				throw error;
			}
			throw new ConfigurationError(
				`Failed to parse configuration file ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Get default configuration optimized for Claude
	 */
	private getDefaultConfig(): ResonanceConfig {
		return {
			project: {
				name: 'resonance-ai-project',
				rootPath: './source',
				exclude: [
					'node_modules',
					'dist',
					'build',
					'.git',
					'*.log',
					'coverage',
					'.nyc_output',
				],
				include: [
					'**/*.ts',
					'**/*.js',
					'**/*.tsx',
					'**/*.jsx',
					'**/*.json',
					'**/*.md',
				],
			},
			indexing: {
				languages: ['typescript', 'javascript'],
				maxFileSize: 1000000, // 1MB
				debounceMs: 500,
				parseComments: true,
				generateHashes: true,
			},
			context: {
				maxFiles: 20,
				maxLinesPerFile: 200,
				relevanceThreshold: 0.3,
				includePatterns: true,
				includeArchitecture: true,
				includeTests: false,
			},
			patterns: {
				autoDetect: true,
				customPatterns: './patterns',
				confidenceThreshold: 0.7,
				maxPatterns: 50,
			},
			briefing: {
				templatePath: './templates',
				includeExamples: true,
				includeConstraints: true,
				verboseGuidance: false,
				maxBriefLength: 10000,
			},
			interface: {
				theme: 'dark',
				verbose: false,
				autoRefresh: true,
				shortcuts: {
					switchView: 'tab',
					refresh: 'r',
					help: '?',
					quit: 'q',
				},
			},
			performance: {
				cacheSize: 100,
				maxMemoryMB: 512,
				gcIntervalMs: 30000,
			},
		};
	}

	/**
	 * Deep merge two configuration objects
	 */
	private mergeConfigs(
		base: ResonanceConfig,
		override: Partial<ResonanceConfig>,
	): ResonanceConfig {
		const result = {...base};

		for (const [key, value] of Object.entries(override)) {
			if (value === null || value === undefined) {
				continue;
			}

			if (typeof value === 'object' && !Array.isArray(value)) {
				// Deep merge objects
				result[key as keyof ResonanceConfig] = {
					...(result[key as keyof ResonanceConfig] as any),
					...value,
				};
			} else {
				// Direct assignment for primitives and arrays
				(result as any)[key] = value;
			}
		}

		return result;
	}

	/**
	 * Apply environment variable overrides
	 */
	private applyEnvironmentOverrides(config: ResonanceConfig): ResonanceConfig {
		const envMappings = {
			RESONANCE_AI_PROJECT_ROOT: 'project.rootPath',
			RESONANCE_AI_MAX_FILES: 'context.maxFiles',
			RESONANCE_AI_MAX_FILE_SIZE: 'indexing.maxFileSize',
			RESONANCE_AI_THEME: 'interface.theme',
			RESONANCE_AI_VERBOSE: 'interface.verbose',
			RESONANCE_AI_DEBOUNCE_MS: 'indexing.debounceMs',
		};

		const result = {...config};

		for (const [envVar, configPath] of Object.entries(envMappings)) {
			const envValue = process.env[envVar];
			if (envValue !== undefined) {
				this.setNestedProperty(
					result,
					configPath,
					this.parseEnvValue(envValue),
				);
			}
		}

		return result;
	}

	/**
	 * Parse environment variable value to appropriate type
	 */
	private parseEnvValue(value: string): any {
		// Boolean values
		if (value.toLowerCase() === 'true') return true;
		if (value.toLowerCase() === 'false') return false;

		// Numeric values
		if (/^\d+$/.test(value)) return parseInt(value, 10);
		if (/^\d+\.\d+$/.test(value)) return parseFloat(value);

		// Array values (comma-separated)
		if (value.includes(',')) {
			return value.split(',').map(item => item.trim());
		}

		// String values
		return value;
	}

	/**
	 * Set a nested property in an object using dot notation
	 */
	private setNestedProperty(obj: any, path: string, value: any): void {
		const keys = path.split('.');
		let current = obj;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!key) continue;
			if (!(key in current) || typeof current[key] !== 'object') {
				current[key] = {};
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];
		if (lastKey) {
			current[lastKey] = value;
		}
	}

	/**
	 * Validate configuration values
	 */
	private validateConfig(config: ResonanceConfig): void {
		const errors: string[] = [];

		// Project validation
		if (!config.project.rootPath) {
			errors.push('project.rootPath is required');
		}

		// Indexing validation
		if (config.indexing.maxFileSize < 1000) {
			errors.push('indexing.maxFileSize must be at least 1000 bytes');
		}
		if (config.indexing.debounceMs < 0) {
			errors.push('indexing.debounceMs must be non-negative');
		}

		// Context validation
		if (config.context.maxFiles < 1) {
			errors.push('context.maxFiles must be at least 1');
		}
		if (
			config.context.relevanceThreshold < 0 ||
			config.context.relevanceThreshold > 1
		) {
			errors.push('context.relevanceThreshold must be between 0 and 1');
		}

		// Pattern validation
		if (
			config.patterns.confidenceThreshold < 0 ||
			config.patterns.confidenceThreshold > 1
		) {
			errors.push('patterns.confidenceThreshold must be between 0 and 1');
		}

		// Performance validation
		if (config.performance.maxMemoryMB < 128) {
			errors.push('performance.maxMemoryMB must be at least 128');
		}

		if (errors.length > 0) {
			throw new ConfigurationError('Configuration validation failed', {errors});
		}
	}
}

// Singleton instance for global access
let configManager: ConfigurationManager | null = null;

/**
 * Get the global configuration manager instance
 */
export function getConfigManager(): ConfigurationManager {
	if (!configManager) {
		configManager = new ConfigurationManager();
	}
	return configManager;
}

/**
 * Load configuration (convenience function)
 */
export async function loadConfig(
	projectRoot?: string,
): Promise<ResonanceConfig> {
	return getConfigManager().loadConfig(projectRoot);
}

/**
 * Get current configuration (convenience function)
 */
export function getConfig(): ResonanceConfig {
	return getConfigManager().getConfig();
}
