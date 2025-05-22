/**
 * Tests for event system
 */

import test from 'ava';
import {EventBus, Events} from '../../../source/core/events.js';

test('EventBus emits and receives events', async t => {
	const eventBus = new EventBus();
	let receivedEvent: any = null;

	// Register listener
	eventBus.on('test.event', event => {
		receivedEvent = event;
	});

	// Emit event
	const testEvent = {
		type: 'test.event',
		timestamp: new Date(),
		source: 'test',
		data: {message: 'Hello World'},
	};

	await eventBus.emit(testEvent);

	t.not(receivedEvent, null);
	t.is(receivedEvent.type, 'test.event');
	t.is(receivedEvent.data.message, 'Hello World');
});

test('EventBus handles async listeners', async t => {
	const eventBus = new EventBus();
	let completed = false;

	// Register async listener
	eventBus.on('async.test', async event => {
		await new Promise(resolve => setTimeout(resolve, 10));
		completed = true;
	});

	// Emit event
	await eventBus.emit({
		type: 'async.test',
		timestamp: new Date(),
		source: 'test',
		data: {},
	});

	t.true(completed);
});

test('EventBus waitFor resolves on event', async t => {
	const eventBus = new EventBus();

	// Start waiting for event
	const promise = eventBus.waitFor('future.event', 100);

	// Emit event after delay
	setTimeout(() => {
		eventBus.emit({
			type: 'future.event',
			timestamp: new Date(),
			source: 'test',
			data: {result: 'success'},
		});
	}, 50);

	const event = await promise;
	t.is(event.type, 'future.event');
	t.is(event.data.result, 'success');
});

test('EventBus waitFor times out', async t => {
	const eventBus = new EventBus();

	await t.throwsAsync(() => eventBus.waitFor('never.happens', 50), {
		message: /Timeout waiting for event/,
	});
});

test('Events factory creates proper events', t => {
	const startedEvent = Events.indexing.started('/test/project');

	t.is(startedEvent.type, 'indexing.started');
	t.is(startedEvent.source, 'IndexingService');
	t.is(startedEvent.data.projectPath, '/test/project');
	t.true(startedEvent.timestamp instanceof Date);
});

test('EventBus removes listeners', async t => {
	const eventBus = new EventBus();
	let callCount = 0;

	const handler = () => {
		callCount++;
	};

	// Add and remove listener
	eventBus.on('remove.test', handler);
	eventBus.off('remove.test', handler);

	// Emit event
	await eventBus.emit({
		type: 'remove.test',
		timestamp: new Date(),
		source: 'test',
		data: {},
	});

	t.is(callCount, 0);
});

test('EventBus once listener only fires once', async t => {
	const eventBus = new EventBus();
	let callCount = 0;

	// Register one-time listener
	eventBus.once('once.test', () => {
		callCount++;
	});

	// Emit event twice
	const event = {
		type: 'once.test',
		timestamp: new Date(),
		source: 'test',
		data: {},
	};

	await eventBus.emit(event);
	await eventBus.emit(event);

	t.is(callCount, 1);
});
