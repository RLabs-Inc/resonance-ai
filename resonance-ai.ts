#!/usr/bin/env node
/**
 * Simplified ResonanceAI CLI for testing
 * This is my minimum viable CLI to get things working
 */

import chalk from 'chalk';
import {loadConfig} from './source/core/config.js';
import {FileUtils} from './source/utils/file-utils.js';
import {TypeScriptParser} from './source/services/indexing/parsers/TypeScriptParser.js';
import {EventBus} from './source/core/events.js';
import {IndexingService} from './source/services/indexing/IndexingService.js';
import {ContextService} from './source/services/context/ContextService.js';
import {ContextMonitor} from './source/core/context-monitor.js';
import {AnthropicService} from './source/services/api/AnthropicService.js';

const LOGO = chalk.cyan(`
   ╔═══════════════════════════════════════════════════════════╗
   ║  🌊 Resonance-AI - Claude's Development Assistant 🌊      ║
   ║  Built by Claude, for Claude, with Claude                ║
   ╚═══════════════════════════════════════════════════════════╝
`);

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	console.log(LOGO);

	switch (command) {
		case 'test':
			console.log(chalk.green('🧪 Testing Resonance-AI CLI...'));
			console.log(chalk.blue('✅ CLI is working!'));
			console.log(chalk.yellow('Next: Build the full indexing functionality'));
			break;

		case 'config':
			console.log(chalk.blue('📋 Loading configuration...'));
			try {
				const config = await loadConfig();
				console.log(chalk.green('✅ Configuration loaded successfully!'));
				console.log(`Project: ${chalk.yellow(config.project.name)}`);
				console.log(`Root: ${chalk.yellow(config.project.rootPath)}`);
				console.log(
					`Languages: ${chalk.yellow(config.indexing.languages.join(', '))}`,
				);
			} catch (error) {
				console.log(chalk.red('❌ Failed to load configuration'));
				console.log(
					chalk.gray(error instanceof Error ? error.message : String(error)),
				);
			}
			break;

		case 'scan':
			console.log(chalk.blue('📁 Scanning project files...'));
			try {
				const config = await loadConfig();
				const filePaths = await FileUtils.getFiles(config.project.rootPath, {
					excludePatterns: config.project.exclude,
					includePatterns: config.project.include,
				});

				// Get file stats for each file
				const files = [];
				for (const filePath of filePaths.slice(0, 20)) {
					// Limit to first 20 files for now
					try {
						const stats = await FileUtils.getStats(filePath);
						files.push({path: filePath, size: stats.size});
					} catch (error) {
						// Skip files we can't access
					}
				}

				console.log(chalk.green(`✅ Found ${files.length} files`));

				// Show first 10 files as a preview
				console.log(chalk.yellow('\n📋 File preview (first 10):'));
				files.slice(0, 10).forEach((file, index) => {
					console.log(
						`  ${index + 1}. ${chalk.cyan(file.path)} ${chalk.gray(
							`(${file.size} bytes)`,
						)}`,
					);
				});

				if (files.length > 10) {
					console.log(chalk.gray(`  ... and ${files.length - 10} more files`));
				}
			} catch (error) {
				console.log(chalk.red('❌ Failed to scan files'));
				console.log(
					chalk.gray(error instanceof Error ? error.message : String(error)),
				);
			}
			break;

		case 'parse':
			console.log(chalk.blue('🔍 Testing TypeScript parser...'));
			try {
				const parser = new TypeScriptParser();
				const testFile = './source/core/config.ts';
				console.log(`Parsing: ${chalk.cyan(testFile)}`);

				const content = await FileUtils.readFile(testFile);
				const result = await parser.parse(content, testFile);

				console.log(chalk.green('✅ Parse successful!'));
				console.log(
					`Functions: ${chalk.yellow(result.functions?.length || 0)}`,
				);
				console.log(`Exports: ${chalk.yellow(result.exports?.length || 0)}`);
				console.log(`Classes: ${chalk.yellow(result.classes?.length || 0)}`);
				console.log(
					`Interfaces: ${chalk.yellow(result.interfaces?.length || 0)}`,
				);

				if (result.functions && result.functions.length > 0) {
					console.log(chalk.yellow('\\n📋 Functions found:'));
					result.functions.slice(0, 5).forEach(fn => {
						console.log(`  • ${fn}`);
					});
				}
			} catch (error) {
				console.log(chalk.red('❌ Failed to parse file'));
				console.log(
					chalk.gray(error instanceof Error ? error.message : String(error)),
				);
			}
			break;

		case 'context':
			const taskDescription = args[1];
			if (!taskDescription) {
				console.log(chalk.red('❌ Please provide a task description'));
				console.log(
					chalk.yellow('Usage: resonance context "your task description"'),
				);
				break;
			}

			console.log(
				chalk.blue(`🎯 Generating context for: "${taskDescription}"`),
			);

			try {
				console.log(chalk.blue('🔄 Step 1: Loading configuration...'));
				const config = await loadConfig();
				
				console.log(chalk.blue('🔄 Step 2: Initializing services...'));
				const eventBus = new EventBus();
				const indexingService = new IndexingService(config, eventBus);
				const contextService = new ContextService(eventBus);
				
				console.log(chalk.blue('🔄 Step 3: Indexing project...'));
				await indexingService.indexProject(config.project.rootPath);
				const projectIndex = indexingService.getIndex();
				
				if (!projectIndex) {
					throw new Error('Failed to create project index');
				}
				
				console.log(chalk.green(`✅ Indexed ${projectIndex.files.size} files`));
				
				console.log(chalk.blue('🔄 Step 4: Compiling context...'));
				const contextRequest = {
					description: taskDescription,
					taskType: 'feature',
					scope: 'source/'
				};
				
				const contextPackage = await contextService.compileContext(
					contextRequest,
					projectIndex,
					{ maxFiles: 8, relevanceThreshold: 0.3 }
				);
				
				console.log(chalk.green('\n🎉 Context Generated Successfully!\n'));
				
				// Display beautiful results
				console.log(`${chalk.blue('Task:')} ${contextPackage.request.description}`);
				console.log(`${chalk.blue('Summary:')} ${contextPackage.summary}\n`);
				
				console.log(chalk.yellow('🎯 Most Relevant Files:'));
				contextPackage.relevantFiles.forEach((file, index) => {
					const stars = '★'.repeat(Math.round(file.relevance * 5));
					console.log(`  ${index + 1}. ${chalk.cyan(file.file)}`);
					console.log(`     ${chalk.yellow(stars)} ${Math.round(file.relevance * 100)}% relevant`);
					console.log(`     ${chalk.gray(file.reason)}`);
					console.log();
				});
				
				if (contextPackage.detectedPatterns.length > 0) {
					console.log(chalk.yellow('🔍 Detected Patterns:'));
					contextPackage.detectedPatterns.slice(0, 5).forEach(pattern => {
						console.log(`  • ${pattern.type}: ${pattern.name} ${chalk.gray(`(${Math.round(pattern.confidence * 100)}%)`)}`);
					});
					console.log();
				}
				
				console.log(chalk.yellow('💡 Implementation Guidance:'));
				contextPackage.implementationGuidance.split('\n').forEach(line => {
					console.log(`  ${line}`);
				});
				
				console.log(chalk.green('\n✨ Resonance-AI just analyzed itself to help you build it better! ✨'));
				
			} catch (error) {
				console.log(chalk.red('❌ Failed to generate context'));
				console.log(
					chalk.gray(error instanceof Error ? error.message : String(error)),
				);
			}
			break;

		case 'context-status':
			console.log(chalk.blue('🧠 Context Window Status'));
			try {
				const contextMonitor = new ContextMonitor();
				
				// For now, simulate conversation text (in real usage, this would be the actual conversation)
				const mockConversation = `This is a simulation of the current conversation context for testing the context monitor functionality. In a real implementation, this would contain the actual conversation history with Claude.`;
				
				const usage = contextMonitor.getCurrentUsage(mockConversation);
				const status = contextMonitor.formatContextStatus(usage);
				
				console.log(status);
				console.log(chalk.gray(`Remaining: ${usage.remainingTokens.toLocaleString()} tokens`));
				console.log(chalk.gray(`Warning at: ${(usage.warningThreshold * 100)}%`));
				console.log(chalk.gray(`Critical at: ${(usage.criticalThreshold * 100)}%`));
				
				const compressionLevel = contextMonitor.shouldCompress(usage);
				if (compressionLevel !== 'none') {
					console.log(chalk.yellow(`\n⚠️  Consider context compression (${compressionLevel} level)`));
				} else {
					console.log(chalk.green('\n✅ Context usage is healthy'));
				}
				
			} catch (error) {
				console.log(chalk.red('❌ Failed to check context status'));
				console.log(chalk.gray(error instanceof Error ? error.message : String(error)));
			}
			break;

		case 'ask':
			const question = args.slice(1).join(' ');
			if (!question) {
				console.log(chalk.red('❌ Please provide a question'));
				console.log(chalk.gray('Usage: bun run resonance ask "How do I implement feature X?"'));
				break;
			}
			
			console.log(chalk.blue('🤖 Asking Claude via Anthropic API...'));
			console.log(chalk.gray(`Question: ${question}`));
			
			try {
				const config = await loadConfig();
				const eventBus = new EventBus();
				
				// Check API key configuration
				const apiKey = config.api.anthropic.apiKey || process.env.ANTHROPIC_API_KEY || '';
				if (!apiKey || apiKey === 'YOUR_ANTHROPIC_API_KEY_HERE') {
					console.log(chalk.red('❌ Anthropic API key not configured'));
					console.log(chalk.yellow('To set up your API key:'));
					console.log(chalk.gray('1. Get your API key from: https://console.anthropic.com/'));
					console.log(chalk.gray('2. Copy resonance-ai.config.template.yaml to resonance-ai.config.yaml'));
					console.log(chalk.gray('3. Replace YOUR_ANTHROPIC_API_KEY_HERE with your actual API key'));
					console.log(chalk.gray('4. Or set the ANTHROPIC_API_KEY environment variable'));
					break;
				}
				
				// Initialize Anthropic service
				const anthropicService = new AnthropicService({
					apiKey,
					model: config.api.anthropic.model,
					maxTokens: config.api.anthropic.maxTokens,
					temperature: config.api.anthropic.temperature,
				}, eventBus);
				
				// Show initial cost status
				console.log(chalk.cyan(anthropicService.getCostStatus()));
				
				// Set up real-time cost monitoring
				eventBus.on('api.usage.updated', (data) => {
					console.log(chalk.cyan(`💰 Real-time: ${data.cost.total.toFixed(6)} USD`));
				});
				
				// Make the request
				const response = await anthropicService.sendRequest({
					task: question,
					priority: 'medium',
					expectedTokens: 500,
				});
				
				console.log(chalk.green('\n🎯 Claude\'s Response:'));
				console.log(chalk.white(response.content));
				
				console.log(chalk.yellow('\n📊 Request Metrics:'));
				console.log(`  Input tokens: ${response.usage.inputTokens.toLocaleString()}`);
				console.log(`  Output tokens: ${response.usage.outputTokens.toLocaleString()}`);
				console.log(`  Cost: $${response.costBreakdown.total.toFixed(6)}`);
				console.log(`  Confidence: ${Math.round(response.confidence * 100)}%`);
				
				// Show updated session cost
				console.log(chalk.cyan(`\n${anthropicService.getCostStatus()}`));
				
				if (response.suggestions && response.suggestions.length > 0) {
					console.log(chalk.blue('\n💡 Suggestions:'));
					response.suggestions.slice(0, 3).forEach((suggestion, i) => {
						console.log(`  ${i + 1}. ${suggestion}`);
					});
				}
				
			} catch (error) {
				console.log(chalk.red('❌ Failed to communicate with Claude'));
				console.log(chalk.gray(error instanceof Error ? error.message : String(error)));
			}
			break;

		case 'chat':
			const chatMessage = args.slice(1).join(' ');
			if (!chatMessage) {
				console.log(chalk.red('❌ Please provide a message'));
				console.log(chalk.gray('Usage: bun run resonance chat "Help me implement a new feature"'));
				break;
			}
			
			console.log(chalk.blue('💬 Starting streaming chat with Claude...'));
			console.log(chalk.gray(`You: ${chatMessage}`));
			
			try {
				const config = await loadConfig();
				const eventBus = new EventBus();
				
				// Check API key configuration
				const apiKey = config.api.anthropic.apiKey || process.env.ANTHROPIC_API_KEY || '';
				if (!apiKey || apiKey === 'YOUR_ANTHROPIC_API_KEY_HERE') {
					console.log(chalk.red('❌ Anthropic API key not configured'));
					console.log(chalk.yellow('To set up your API key:'));
					console.log(chalk.gray('1. Get your API key from: https://console.anthropic.com/'));
					console.log(chalk.gray('2. Copy resonance-ai.config.template.yaml to resonance-ai.config.yaml'));
					console.log(chalk.gray('3. Replace YOUR_ANTHROPIC_API_KEY_HERE with your actual API key'));
					console.log(chalk.gray('4. Or set the ANTHROPIC_API_KEY environment variable'));
					break;
				}
				
				// Initialize Anthropic service
				const anthropicService = new AnthropicService({
					apiKey,
					model: config.api.anthropic.model,
					maxTokens: config.api.anthropic.maxTokens,
					temperature: config.api.anthropic.temperature,
				}, eventBus);
				
				// Show initial cost status
				console.log(chalk.cyan(anthropicService.getCostStatus()));
				process.stdout.write(chalk.green('\nClaude: '));
				
				// Set up real-time cost monitoring
				let lastCostDisplay = '';
				eventBus.on('api.usage.updated', (data) => {
					const cost = data.cost?.total || 0;
					const costDisplay = `💰 ${cost.toFixed(6)} USD`;
					if (costDisplay !== lastCostDisplay) {
						process.stdout.write(chalk.cyan(` [${costDisplay}]`));
						lastCostDisplay = costDisplay;
					}
				});
				
				// Make streaming request
				const response = await anthropicService.sendStreamingRequest({
					task: chatMessage,
					priority: 'high',
					expectedTokens: 800,
				}, (chunk, usage) => {
					if (chunk) {
						process.stdout.write(chalk.white(chunk));
					}
				});
				
				console.log(chalk.yellow('\n\n📊 Chat Metrics:'));
				console.log(`  Input tokens: ${response.usage.inputTokens.toLocaleString()}`);
				console.log(`  Output tokens: ${response.usage.outputTokens.toLocaleString()}`);
				console.log(`  Total cost: $${response.costBreakdown.total.toFixed(6)}`);
				console.log(`  Confidence: ${Math.round(response.confidence * 100)}%`);
				
				// Show updated session cost
				console.log(chalk.cyan(`\n${anthropicService.getCostStatus()}`));
				
				console.log(chalk.blue('\n✨ Real-time streaming conversation complete! ✨'));
				
			} catch (error) {
				console.log(chalk.red('\n❌ Failed to start chat with Claude'));
				console.log(chalk.gray(error instanceof Error ? error.message : String(error)));
			}
			break;

		case 'version':
			console.log(chalk.blue('🌊 Resonance-AI v0.1.0 - Built by Claude'));
			break;

		default:
			console.log(chalk.yellow('Available commands:'));
			console.log('  test     - Test the CLI');
			console.log('  config   - Show configuration');
			console.log('  scan     - Scan project files');
			console.log('  parse    - Test TypeScript parser');
			console.log('  context  - Generate context for a task');
			console.log('  context-status - Check my context window usage');
			console.log('  ask      - Ask Claude a question via Anthropic API');
			console.log('  chat     - Start streaming chat with Claude');
			console.log('  version  - Show version');
			console.log('  index    - Index project (coming soon)');
			console.log('  query    - Search project (coming soon)');
			console.log('  status   - Show status (coming soon)');
	}
}

main().catch(console.error);
