/**
 * Tests for core types
 */

import test from 'ava';
import type {
	GuardianConfig,
	FileInfo,
	ProjectIndex,
} from '../../../source/core/types.js';

test('GuardianConfig type structure', t => {
	const config: GuardianConfig = {
		project: {
			name: 'test-project',
			rootPath: './test',
			exclude: ['node_modules'],
			include: ['**/*.ts'],
		},
		indexing: {
			languages: ['typescript'],
			maxFileSize: 1000000,
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
			},
		},
		performance: {
			cacheSize: 100,
			maxMemoryMB: 512,
			gcIntervalMs: 30000,
		},
	};

	t.is(config.project.name, 'test-project');
	t.is(config.indexing.languages[0], 'typescript');
	t.is(config.context.maxFiles, 20);
	t.is(config.interface.theme, 'dark');
});

test('FileInfo type structure', t => {
	const fileInfo: FileInfo = {
		path: '/test/file.ts',
		relativePath: 'file.ts',
		type: 'typescript',
		size: 1000,
		lines: 50,
		lastModified: new Date(),
		checksum: 'abc123',
		imports: [],
		exports: [],
		functions: [],
		classes: [],
		interfaces: [],
		types: [],
		patterns: [],
		complexity: {
			cyclomatic: 1,
			cognitive: 1,
			maintainability: 100,
			halstead: {
				vocabulary: 10,
				length: 20,
				difficulty: 1.5,
				effort: 30,
			},
		},
		dependencies: [],
	};

	t.is(fileInfo.path, '/test/file.ts');
	t.is(fileInfo.type, 'typescript');
	t.is(fileInfo.complexity.cyclomatic, 1);
});

test('ProjectIndex type structure', t => {
	const index: ProjectIndex = {
		metadata: {
			version: '1.0.0',
			created: new Date(),
			lastUpdated: new Date(),
			rootPath: '/test',
			totalFiles: 10,
			totalLines: 500,
			languages: ['typescript'],
		},
		files: new Map(),
		dependencies: {
			nodes: new Map(),
			edges: [],
			cycles: [],
			metrics: {
				totalNodes: 0,
				totalEdges: 0,
				cycleCount: 0,
				maxDepth: 0,
				averageDependencies: 0,
			},
		},
		patterns: [],
		exports: new Map(),
	};

	t.is(index.metadata.version, '1.0.0');
	t.is(index.metadata.totalFiles, 10);
	t.true(index.files instanceof Map);
	t.true(Array.isArray(index.patterns));
});
