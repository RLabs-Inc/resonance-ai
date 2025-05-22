/**
 * Tests for error handling
 */

import test from 'ava';
import {
	GuardianError,
	ConfigurationError,
	IndexingError,
	ErrorHandler,
	ErrorUtils,
} from '../../../source/core/errors.js';

test('GuardianError includes context and cause', t => {
	const cause = new Error('Original error');
	const context = {file: 'test.ts', line: 42};

	const error = new ConfigurationError('Config failed', context, cause);

	t.is(error.message, 'Configuration Error: Config failed');
	t.is(error.code, 'CONFIG_ERROR');
	t.is(error.category, 'configuration');
	t.is(error.context, context);
	t.is(error.cause, cause);
});

test('GuardianError toJSON serializes properly', t => {
	const error = new IndexingError('Index failed', {project: 'test'});
	const json = error.toJSON();

	t.is(json.name, 'IndexingError');
	t.is(json.code, 'INDEXING_ERROR');
	t.is(json.category, 'indexing');
	t.is(json.message, 'Indexing Error: Index failed');
	t.deepEqual(json.context, {project: 'test'});
});

test('GuardianError toString formats properly', t => {
	const cause = new Error('Root cause');
	const error = new ConfigurationError(
		'Failed to load config',
		{file: 'config.yaml'},
		cause,
	);

	const str = error.toString();

	t.true(
		str.includes(
			'ConfigurationError [CONFIG_ERROR]: Configuration Error: Failed to load config',
		),
	);
	t.true(str.includes('Context:'));
	t.true(str.includes('"file": "config.yaml"'));
	t.true(str.includes('Caused by: Error: Root cause'));
});

test('ErrorHandler createError adds automatic context', t => {
	const error = ErrorHandler.createError(IndexingError, 'Test error', {
		custom: 'value',
	});

	t.is(error.message, 'Indexing Error: Test error');
	t.truthy(error.context?.timestamp);
	t.truthy(error.context?.nodeVersion);
	t.truthy(error.context?.platform);
	t.is(error.context?.custom, 'value');
});

test('ErrorHandler wrapAsync catches and re-throws errors', async t => {
	const failingFunction = async (shouldFail: boolean) => {
		if (shouldFail) {
			throw new Error('Function failed');
		}
		return 'success';
	};

	const wrappedFunction = ErrorHandler.wrapAsync(failingFunction, {
		operation: 'test',
	});

	// Should work normally when no error
	const result = await wrappedFunction(false);
	t.is(result, 'success');

	// Should catch and re-throw error
	await t.throwsAsync(() => wrappedFunction(true), {
		message: 'Function failed',
	});
});

test('ErrorUtils assert throws on false condition', t => {
	t.notThrows(() => {
		ErrorUtils.assert(true, ConfigurationError, 'Should not throw');
	});

	t.throws(
		() => {
			ErrorUtils.assert(false, ConfigurationError, 'Should throw');
		},
		{instanceOf: ConfigurationError},
	);
});

test('ErrorUtils safeAccess handles nested properties', t => {
	const obj = {
		a: {
			b: {
				c: 'value',
			},
		},
	};

	t.is(ErrorUtils.safeAccess(obj, 'a.b.c'), 'value');
	t.is(ErrorUtils.safeAccess(obj, 'a.b.d'), undefined);
	t.is(ErrorUtils.safeAccess(obj, 'x.y.z'), undefined);
	t.is(ErrorUtils.safeAccess(obj, 'x.y.z', 'default'), 'default');
});

test('ErrorUtils isErrorType checks error types correctly', t => {
	const configError = new ConfigurationError('Config error');
	const indexError = new IndexingError('Index error');
	const genericError = new Error('Generic error');

	t.true(ErrorUtils.isErrorType(configError, ConfigurationError));
	t.false(ErrorUtils.isErrorType(configError, IndexingError));
	t.false(ErrorUtils.isErrorType(genericError, ConfigurationError));
});

test('ErrorUtils createRecoverableError includes suggestions', t => {
	const suggestions = [
		'Check the config file exists',
		'Verify the file permissions',
		'Use absolute paths',
	];

	const error = ErrorUtils.createRecoverableError(
		ConfigurationError,
		'Config not found',
		suggestions,
	);

	t.true(error.message.includes('Suggestions:'));
	t.true(error.message.includes('Check the config file exists'));
	t.true(error.message.includes('Verify the file permissions'));
	t.true(error.message.includes('Use absolute paths'));
});
