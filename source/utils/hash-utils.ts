/**
 * Hash and checksum utilities for GuardianAI MVP
 *
 * Provides efficient hashing functions for file change detection and content identification.
 */

import * as crypto from 'crypto';

export interface HashResult {
	algorithm: string;
	hash: string;
	length: number;
	executionTime: number;
}

export interface FileHashOptions {
	algorithm?: 'md5' | 'sha1' | 'sha256' | 'sha512';
	encoding?: 'hex' | 'base64';
	chunkSize?: number;
}

export interface ContentHashOptions {
	algorithm?: 'md5' | 'sha1' | 'sha256' | 'sha512';
	encoding?: 'hex' | 'base64';
	normalize?: boolean;
}

/**
 * Hash utilities class
 */
export class HashUtils {
	/**
	 * Generate hash for string content
	 */
	static hashContent(
		content: string,
		options: ContentHashOptions = {},
	): HashResult {
		const startTime = performance.now();
		const {algorithm = 'sha256', encoding = 'hex', normalize = false} = options;

		let processedContent = content;

		if (normalize) {
			// Normalize content for consistent hashing
			processedContent = this.normalizeContent(content);
		}

		const hash = crypto
			.createHash(algorithm)
			.update(processedContent, 'utf8')
			.digest(encoding);

		const executionTime = performance.now() - startTime;

		return {
			algorithm,
			hash,
			length: hash.length,
			executionTime,
		};
	}

	/**
	 * Generate fast hash for content comparison
	 */
	static fastHash(content: string): string {
		// Simple FNV-1a hash for fast comparisons
		let hash = 2166136261;

		for (let i = 0; i < content.length; i++) {
			hash ^= content.charCodeAt(i);
			hash = (hash * 16777619) >>> 0; // Keep as 32-bit unsigned
		}

		return hash.toString(16);
	}

	/**
	 * Generate hash for code content (ignoring whitespace differences)
	 */
	static hashCode(code: string, options: ContentHashOptions = {}): HashResult {
		const normalized = this.normalizeCode(code);
		return this.hashContent(normalized, {...options, normalize: false});
	}

	/**
	 * Generate hash for file path and content combination
	 */
	static hashFileInfo(
		filePath: string,
		content: string,
		options: ContentHashOptions = {},
	): HashResult {
		const combined = `${filePath}:${content}`;
		return this.hashContent(combined, options);
	}

	/**
	 * Generate hash for structured data
	 */
	static hashObject(obj: any, options: ContentHashOptions = {}): HashResult {
		const serialized = this.serializeObject(obj);
		return this.hashContent(serialized, options);
	}

	/**
	 * Generate incremental hash for streaming content
	 */
	static createIncrementalHasher(algorithm: string = 'sha256'): {
		update: (chunk: string) => void;
		digest: (encoding?: 'hex' | 'base64') => string;
	} {
		const hasher = crypto.createHash(algorithm);

		return {
			update: (chunk: string) => hasher.update(chunk, 'utf8'),
			digest: (encoding: 'hex' | 'base64' = 'hex') => hasher.digest(encoding),
		};
	}

	/**
	 * Compare two hashes for equality
	 */
	static compareHashes(hash1: string, hash2: string): boolean {
		if (hash1.length !== hash2.length) {
			return false;
		}

		// Constant-time comparison to prevent timing attacks
		let result = 0;
		for (let i = 0; i < hash1.length; i++) {
			result |= hash1.charCodeAt(i) ^ hash2.charCodeAt(i);
		}

		return result === 0;
	}

	/**
	 * Generate multiple hashes for the same content
	 */
	static multiHash(
		content: string,
		algorithms: string[] = ['md5', 'sha256'],
	): Record<string, HashResult> {
		const results: Record<string, HashResult> = {};

		for (const algorithm of algorithms) {
			results[algorithm] = this.hashContent(content, {
				algorithm: algorithm as any,
			});
		}

		return results;
	}

	/**
	 * Generate hash tree for hierarchical content
	 */
	static hashTree(items: Array<{id: string; content: string}>): {
		tree: Record<string, string>;
		root: string;
	} {
		const tree: Record<string, string> = {};

		// Hash individual items
		for (const item of items) {
			tree[item.id] = this.hashContent(item.content).hash;
		}

		// Generate root hash from all item hashes
		const allHashes = Object.values(tree).sort().join('');
		const root = this.hashContent(allHashes).hash;

		return {tree, root};
	}

	/**
	 * Generate deterministic hash for dependency graph
	 */
	static hashDependencies(dependencies: Record<string, string[]>): string {
		const sorted = Object.keys(dependencies)
			.sort()
			.map(key => {
				const deps = dependencies[key];
				return `${key}:${deps ? deps.sort().join(',') : ''}`;
			})
			.join('|');

		return this.hashContent(sorted).hash;
	}

	/**
	 * Generate hash for file metadata
	 */
	static hashMetadata(metadata: {
		path: string;
		size: number;
		lastModified: Date;
		checksum?: string;
	}): string {
		const content = `${metadata.path}:${
			metadata.size
		}:${metadata.lastModified.getTime()}:${metadata.checksum || ''}`;
		return this.hashContent(content).hash;
	}

	/**
	 * Generate short hash for UI display
	 */
	static shortHash(content: string, length: number = 8): string {
		const fullHash = this.hashContent(content).hash;
		return fullHash.substring(0, length);
	}

	/**
	 * Normalize content for consistent hashing
	 */
	private static normalizeContent(content: string): string {
		return content
			.replace(/\r\n/g, '\n') // Normalize line endings
			.replace(/\r/g, '\n') // Handle old Mac line endings
			.replace(/\s+$/gm, '') // Remove trailing whitespace
			.trim(); // Remove leading/trailing whitespace
	}

	/**
	 * Normalize code content for hashing (ignore formatting differences)
	 */
	private static normalizeCode(code: string): string {
		return code
			.replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
			.replace(/\/\/.*$/gm, '') // Remove line comments
			.replace(/\s+/g, ' ') // Collapse whitespace
			.replace(/\s*([{}();,])\s*/g, '$1') // Remove spaces around punctuation
			.trim();
	}

	/**
	 * Serialize object for consistent hashing
	 */
	private static serializeObject(obj: any): string {
		if (obj === null || obj === undefined) {
			return String(obj);
		}

		if (typeof obj !== 'object') {
			return String(obj);
		}

		if (Array.isArray(obj)) {
			return `[${obj.map(item => this.serializeObject(item)).join(',')}]`;
		}

		// Sort object keys for deterministic serialization
		const keys = Object.keys(obj).sort();
		const pairs = keys.map(key => `"${key}":${this.serializeObject(obj[key])}`);

		return `{${pairs.join(',')}}`;
	}

	/**
	 * Generate hash with salt for additional security
	 */
	static hashWithSalt(
		content: string,
		salt: string,
		options: ContentHashOptions = {},
	): HashResult {
		const saltedContent = `${salt}:${content}`;
		return this.hashContent(saltedContent, options);
	}

	/**
	 * Verify hash against content
	 */
	static verifyHash(
		content: string,
		expectedHash: string,
		options: ContentHashOptions = {},
	): {
		valid: boolean;
		actualHash: string;
		expectedHash: string;
	} {
		const result = this.hashContent(content, options);
		const valid = this.compareHashes(result.hash, expectedHash);

		return {
			valid,
			actualHash: result.hash,
			expectedHash,
		};
	}

	/**
	 * Generate hash for performance tracking
	 */
	static benchmarkHash(
		content: string,
		iterations: number = 1000,
	): {
		algorithm: string;
		averageTime: number;
		totalTime: number;
		hashesPerSecond: number;
	} {
		const startTime = performance.now();

		for (let i = 0; i < iterations; i++) {
			this.hashContent(content);
		}

		const totalTime = performance.now() - startTime;
		const averageTime = totalTime / iterations;
		const hashesPerSecond = 1000 / averageTime;

		return {
			algorithm: 'sha256',
			averageTime,
			totalTime,
			hashesPerSecond,
		};
	}
}
