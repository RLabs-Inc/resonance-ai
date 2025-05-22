/**
 * Tests for configuration management
 */

import test from 'ava';
import {ConfigurationManager} from '../../../source/core/config.js';
import {ConfigurationError} from '../../../source/core/errors.js';

test('ConfigurationManager creates default config', async t => {
	const configManager = new ConfigurationManager();

	// Since we don't have config files, it should use defaults
	const config = await configManager.loadConfig();

	t.is(config.project.name, 'resonance-ai-project');
	t.is(config.project.rootPath, './source');
	t.true(config.project.exclude.includes('node_modules'));
	t.is(config.indexing.maxFileSize, 1000000);
	t.is(config.context.maxFiles, 20);
	t.is(config.interface.theme, 'dark');
});

test('ConfigurationManager validates config', async t => {
	const configManager = new ConfigurationManager();

	// Load valid config first
	await configManager.loadConfig();

	// Test invalid update
	await t.throwsAsync(
		async () => {
			configManager.updateConfig({
				context: {
					maxFiles: -1, // Invalid
					maxLinesPerFile: 200,
					relevanceThreshold: 0.3,
					includePatterns: true,
					includeArchitecture: true,
					includeTests: false,
				},
			});
		},
		{instanceOf: ConfigurationError},
	);
});

test('ConfigurationManager merges configs', async t => {
	const configManager = new ConfigurationManager();

	// Load default config
	await configManager.loadConfig();

	// Update with partial config
	const updated = configManager.updateConfig({
		project: {
			name: 'test-project',
			rootPath: './test',
			exclude: ['custom-exclude'],
			include: ['**/*.test.ts'],
		},
	});

	t.is(updated.project.name, 'test-project');
	t.is(updated.project.rootPath, './test');
	// Other sections should remain from defaults
	t.is(updated.indexing.maxFileSize, 1000000);
});

test('ConfigurationManager handles environment overrides', async t => {
	// Set environment variable
	process.env['RESONANCE_AI_MAX_FILES'] = '50';

	const configManager = new ConfigurationManager();
	const config = await configManager.loadConfig();

	t.is(config.context.maxFiles, 50);

	// Clean up
	delete process.env['RESONANCE_AI_MAX_FILES'];
});
