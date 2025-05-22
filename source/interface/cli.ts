#!/usr/bin/env node
/**
 * ResonanceAI CLI - The command-line interface I actually want to use
 *
 * Designed for Claude's workflow: fast, informative, and powerful.
 * No bloat, just the features that matter for AI-assisted development.
 */

import {program} from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import {loadConfig} from '../core/config.js';
import {EventBus} from '../core/events.js';
import {IndexingService} from '../services/indexing/IndexingService.js';
import {ContextService} from '../services/context/ContextService.js';
import {ContextRequest} from '../core/types.js';

// ASCII art because I want this to feel special ✨
const RESONANCE_LOGO = chalk.cyan(`
   ╔═══════════════════════════════════════════════════════════╗
   ║  ⚡ ResonanceAI MVP - Claude's Development Assistant ⚡    ║
   ║  Built by Claude, for Claude, with Claude                ║
   ╚═══════════════════════════════════════════════════════════╝
`);

class ResonanceCLI {
	private config: any;
	private eventBus: EventBus;
	private indexingService: IndexingService | null = null;
	private contextService: ContextService | null = null;

	constructor() {
		this.eventBus = new EventBus();
		this.setupEventLogging();
	}

	async initialize() {
		this.config = await loadConfig();
		this.indexingService = new IndexingService(this.config, this.eventBus);
		this.contextService = new ContextService(this.eventBus);
	}

	private setupEventLogging() {
		// I want to see what's happening under the hood
		this.eventBus.on('indexing:*', event => {
			if (event.type === 'indexing:progress') {
				// Progress is handled by ora spinners
				return;
			}
			if (event.type === 'indexing:completed') {
				console.log(
					chalk.green(
						`✅ Indexing completed: ${event.data.filesProcessed} files`,
					),
				);
			}
		});

		this.eventBus.on('context:*', event => {
			if (event.type === 'context:compilation:completed') {
				console.log(
					chalk.blue(
						`🎯 Context compiled: ${event.data.contextPackage.relevantFiles.length} relevant files`,
					),
				);
			}
		});
	}

	// Command: Index the current project
	async indexCommand(options: {force?: boolean; watch?: boolean}) {
		console.log(RESONANCE_LOGO);
		console.log(chalk.blue('📊 Indexing Project...\n'));

		const spinner = ora('Analyzing codebase structure...').start();

		try {
			await this.initialize();

			if (!this.indexingService) {
				throw new Error('Failed to initialize indexing service');
			}

			// Force reindex if requested
			if (options.force) {
				spinner.text = 'Force rebuilding project index...';
			}

			await this.indexingService.indexProject(this.config.project.rootPath);
			const index = this.indexingService.getIndex();

			if (!index) {
				throw new Error('Failed to get project index');
			}

			spinner.succeed('Project indexed successfully!');

			// Show summary
			console.log(chalk.green('\n🎉 Indexing Complete!\n'));
			console.log(
				`📁 Files indexed: ${chalk.yellow(Object.keys(index.files).length)}`,
			);
			console.log(
				`🔗 Dependencies: ${chalk.yellow(index.dependencies.edges.length)}`,
			);
			console.log(
				`🔍 Patterns detected: ${chalk.yellow(index.patterns.length)}`,
			);
			console.log(
				`📊 Total lines of code: ${chalk.yellow(index.metadata.totalLines)}`,
			);

			if (options.watch) {
				console.log(
					chalk.blue('\n👀 Watching for changes... (Press Ctrl+C to stop)'),
				);
				// File watching would be implemented here
				process.on('SIGINT', () => {
					console.log(chalk.yellow('\n👋 Stopping file watcher...'));
					process.exit(0);
				});
				// Keep the process alive
				await new Promise(() => {}); // Infinite wait
			}
		} catch (error) {
			spinner.fail('Indexing failed');
			console.error(
				chalk.red('❌ Error:'),
				error instanceof Error ? error.message : String(error),
			);
			process.exit(1);
		}
	}

	// Command: Generate context for a task
	async contextCommand(
		description: string,
		options: {
			scope?: string;
			type?: string;
			files?: number;
			threshold?: number;
			output?: string;
		},
	) {
		console.log(chalk.blue(`🎯 Generating context for: "${description}"\n`));

		const spinner = ora('Loading project index...').start();

		try {
			await this.initialize();

			if (!this.indexingService || !this.contextService) {
				throw new Error('Failed to initialize services');
			}

			const index = this.indexingService.getIndex();

			if (!index) {
				throw new Error(
					'Project index not available - run "resonance-ai index" first',
				);
			}

			spinner.text = 'Analyzing relevance and patterns...';

			const contextRequest: ContextRequest = {
				description,
				scope: options.scope,
				taskType: options.type || 'analysis',
			};

			const contextPackage = await this.contextService.compileContext(
				contextRequest,
				index,
				{
					maxFiles: options.files || 10,
					relevanceThreshold: options.threshold || 0.3,
				},
			);

			spinner.succeed('Context generated successfully!');

			// Display the context package in a beautiful format
			console.log(chalk.green('\n📋 Context Package Generated\n'));
			console.log(
				`${chalk.blue('Task:')} ${contextPackage.request.description}`,
			);
			console.log(`${chalk.blue('Summary:')} ${contextPackage.summary}\n`);

			console.log(chalk.yellow('🎯 Most Relevant Files:'));
			contextPackage.relevantFiles.forEach((file, index) => {
				const relevanceBar = '█'.repeat(Math.round(file.relevance * 10));
				console.log(
					`  ${index + 1}. ${chalk.cyan(file.file)} ${chalk.gray(
						relevanceBar,
					)} ${chalk.yellow(`${Math.round(file.relevance * 100)}%`)}`,
				);
				console.log(`     ${chalk.gray(file.reason)}`);
			});

			if (contextPackage.detectedPatterns.length > 0) {
				console.log(chalk.yellow('\n🔍 Detected Patterns:'));
				contextPackage.detectedPatterns.slice(0, 5).forEach(pattern => {
					console.log(
						`  • ${pattern.type}: ${pattern.name} ${chalk.gray(
							`(${Math.round(pattern.confidence * 100)}%)`,
						)}`,
					);
				});
			}

			console.log(chalk.yellow('\n💡 Implementation Guidance:'));
			console.log(
				contextPackage.implementationGuidance
					.split('\n')
					.map(line => `  ${line}`)
					.join('\n'),
			);

			// Optionally save to file
			if (options.output) {
				const fs = await import('fs/promises');
				await fs.writeFile(
					options.output,
					JSON.stringify(contextPackage, null, 2),
				);
				console.log(chalk.green(`\n💾 Context saved to: ${options.output}`));
			}
		} catch (error) {
			spinner.fail('Context generation failed');
			console.error(
				chalk.red('❌ Error:'),
				error instanceof Error ? error.message : String(error),
			);
			process.exit(1);
		}
	}

	// Command: Query the indexed project
	async queryCommand(search: string, options: {type?: string; limit?: number}) {
		console.log(chalk.blue(`🔍 Searching for: "${search}"\n`));

		const spinner = ora('Searching project index...').start();

		try {
			await this.initialize();

			if (!this.indexingService) {
				throw new Error('Failed to initialize indexing service');
			}

			const index = this.indexingService.getIndex();

			if (!index) {
				throw new Error(
					'Project index not available - run "resonance-ai index" first',
				);
			}

			// Simple search implementation - can be enhanced later
			const results = Object.values(index.files).filter(file => {
				const searchLower = search.toLowerCase();
				return (
					file.name.toLowerCase().includes(searchLower) ||
					file.path.toLowerCase().includes(searchLower) ||
					(file.imports &&
						file.imports.some(imp =>
							imp.toLowerCase().includes(searchLower),
						)) ||
					(file.exports &&
						file.exports.some(exp => exp.toLowerCase().includes(searchLower)))
				);
			});

			spinner.succeed(`Found ${results.length} results`);

			if (results.length === 0) {
				console.log(
					chalk.yellow('No results found. Try a different search term.'),
				);
				return;
			}

			console.log(chalk.green('\n🔍 Search Results:\n'));
			results.slice(0, options.limit || 10).forEach((file, index) => {
				console.log(`${index + 1}. ${chalk.cyan(file.path)}`);
				console.log(
					`   ${chalk.gray(
						`${file.lines} lines • ${
							file.type
						} • Modified: ${file.lastModified?.toLocaleDateString()}`,
					)}`,
				);

				if (file.exports && file.exports.length > 0) {
					console.log(
						`   ${chalk.yellow('Exports:')} ${file.exports
							.slice(0, 3)
							.join(', ')}${file.exports.length > 3 ? '...' : ''}`,
					);
				}
				console.log();
			});
		} catch (error) {
			spinner.fail('Search failed');
			console.error(
				chalk.red('❌ Error:'),
				error instanceof Error ? error.message : String(error),
			);
			process.exit(1);
		}
	}

	// Command: Show status
	async statusCommand() {
		console.log(chalk.blue('📊 ResonanceAI Status\n'));

		try {
			await this.initialize();

			if (!this.indexingService) {
				throw new Error('Failed to initialize indexing service');
			}

			const index = this.indexingService.getIndex();

			if (!index) {
				console.error(chalk.red('❌ ResonanceAI is not properly initialized'));
				console.error(chalk.gray('Run "resonance-ai index" to get started'));
				return;
			}

			console.log(`${chalk.blue('Project:')} ${this.config.project.name}`);
			console.log(
				`${chalk.blue('Root Path:')} ${this.config.project.rootPath}`,
			);
			console.log(
				`${chalk.blue(
					'Last Indexed:',
				)} ${index.metadata.lastUpdated.toLocaleString()}`,
			);
			console.log(`${chalk.blue('Version:')} ${index.metadata.version}\n`);

			console.log(chalk.yellow('📊 Statistics:'));
			console.log(`  Files: ${Object.keys(index.files).length}`);
			console.log(`  Lines of Code: ${index.metadata.totalLines}`);
			console.log(`  Dependencies: ${index.dependencies.edges.length}`);
			console.log(`  Patterns: ${index.patterns.length}`);
			console.log(`  Languages: ${index.metadata.languages.join(', ')}\n`);

			console.log(chalk.green('✅ ResonanceAI is ready!'));
		} catch (error) {
			console.error(
				chalk.red('❌ Failed to check status:'),
				error instanceof Error ? error.message : String(error),
			);
		}
	}
}

// Set up the CLI commands exactly how I want them
async function setupCLI() {
	const cli = new ResonanceCLI();

	program
		.name('resonance-ai')
		.description("Claude's AI-powered development assistant")
		.version('0.1.0');

	program
		.command('index')
		.description('Index the current project for analysis')
		.option('-f, --force', 'Force rebuild the entire index')
		.option('-w, --watch', 'Watch for file changes and update index')
		.action(async options => {
			await cli.indexCommand(options);
		});

	program
		.command('context <description>')
		.description('Generate context package for a development task')
		.option('-s, --scope <path>', 'Limit scope to specific directory')
		.option(
			'-t, --type <type>',
			'Task type (feature, bugfix, refactor, test)',
			'analysis',
		)
		.option(
			'-f, --files <number>',
			'Maximum number of relevant files to include',
			'10',
		)
		.option('--threshold <number>', 'Relevance threshold (0.0-1.0)', '0.3')
		.option('-o, --output <file>', 'Save context package to file')
		.action(async (description, options) => {
			await cli.contextCommand(description, {
				...options,
				files: parseInt(options.files),
				threshold: parseFloat(options.threshold),
			});
		});

	program
		.command('query <search>')
		.aliases(['search', 'find'])
		.description('Search the indexed project')
		.option('-t, --type <type>', 'File type filter')
		.option('-l, --limit <number>', 'Maximum number of results', '10')
		.action(async (search, options) => {
			await cli.queryCommand(search, {
				...options,
				limit: parseInt(options.limit),
			});
		});

	program
		.command('status')
		.description('Show ResonanceAI status and statistics')
		.action(async () => {
			await cli.statusCommand();
		});

	// Handle unknown commands gracefully
	program.on('command:*', () => {
		console.log(chalk.red(`Unknown command: ${program.args.join(' ')}`));
		console.log(
			chalk.yellow('Run "resonance-ai --help" for available commands'),
		);
		process.exit(1);
	});

	return program;
}

// Main execution
async function main() {
	try {
		const program = await setupCLI();
		await program.parseAsync(process.argv);
	} catch (error) {
		console.error(
			chalk.red('Fatal error:'),
			error instanceof Error ? error.message : String(error),
		);
		process.exit(1);
	}
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	main().catch(console.error);
}

export {ResonanceCLI};
