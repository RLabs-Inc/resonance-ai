/**
 * File system utilities for GuardianAI MVP
 *
 * Provides safe, error-handled file operations optimized for Claude's needs.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import {FileSystemError} from '../core/errors.js';

export interface FileStats {
	path: string;
	size: number;
	isFile: boolean;
	isDirectory: boolean;
	lastModified: Date;
	created: Date;
	permissions: string;
}

export interface ReadOptions {
	encoding?: BufferEncoding;
	maxSize?: number;
	signal?: AbortSignal;
}

export interface WriteOptions {
	encoding?: BufferEncoding;
	mode?: number;
	createDirectories?: boolean;
	backup?: boolean;
}

export interface WalkOptions {
	includePatterns?: string[];
	excludePatterns?: string[];
	maxDepth?: number;
	followSymlinks?: boolean;
	includeDirs?: boolean;
	signal?: AbortSignal;
}

/**
 * File system utilities class
 */
export class FileUtils {
	/**
	 * Safely read a file with proper error handling
	 */
	static async readFile(
		filePath: string,
		options: ReadOptions = {},
	): Promise<string> {
		try {
			const {encoding = 'utf8', maxSize, signal} = options;

			// Check file size if maxSize is specified
			if (maxSize) {
				const stats = await this.getStats(filePath);
				if (stats.size > maxSize) {
					throw new FileSystemError(
						`File size (${stats.size}) exceeds maximum allowed size (${maxSize})`,
						{filePath, fileSize: stats.size, maxSize},
					);
				}
			}

			const content = await fs.readFile(filePath, {encoding, signal});
			return content;
		} catch (error) {
			if (error instanceof FileSystemError) {
				throw error;
			}

			throw new FileSystemError(
				`Failed to read file: ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Safely write a file with proper error handling
	 */
	static async writeFile(
		filePath: string,
		content: string,
		options: WriteOptions = {},
	): Promise<void> {
		try {
			const {
				encoding = 'utf8',
				mode,
				createDirectories = true,
				backup = false,
			} = options;

			// Create directories if needed
			if (createDirectories) {
				await this.ensureDirectory(path.dirname(filePath));
			}

			// Create backup if requested
			if (backup && (await this.exists(filePath))) {
				const backupPath = `${filePath}.backup.${Date.now()}`;
				await fs.copyFile(filePath, backupPath);
			}

			await fs.writeFile(filePath, content, {encoding, mode});
		} catch (error) {
			throw new FileSystemError(
				`Failed to write file: ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Get file statistics
	 */
	static async getStats(filePath: string): Promise<FileStats> {
		try {
			const stats = await fs.stat(filePath);

			return {
				path: filePath,
				size: stats.size,
				isFile: stats.isFile(),
				isDirectory: stats.isDirectory(),
				lastModified: stats.mtime,
				created: stats.birthtime,
				permissions: stats.mode.toString(8),
			};
		} catch (error) {
			throw new FileSystemError(
				`Failed to get file stats: ${filePath}`,
				{filePath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Check if a file or directory exists
	 */
	static async exists(filePath: string): Promise<boolean> {
		try {
			await fs.access(filePath);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Ensure a directory exists, creating it if necessary
	 */
	static async ensureDirectory(dirPath: string): Promise<void> {
		try {
			await fs.mkdir(dirPath, {recursive: true});
		} catch (error) {
			throw new FileSystemError(
				`Failed to create directory: ${dirPath}`,
				{dirPath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Delete a file or directory
	 */
	static async delete(filePath: string, recursive = false): Promise<void> {
		try {
			const stats = await this.getStats(filePath);

			if (stats.isDirectory) {
				await fs.rmdir(filePath, {recursive});
			} else {
				await fs.unlink(filePath);
			}
		} catch (error) {
			throw new FileSystemError(
				`Failed to delete: ${filePath}`,
				{filePath, recursive},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Copy a file or directory
	 */
	static async copy(
		sourcePath: string,
		destPath: string,
		createDirectories = true,
	): Promise<void> {
		try {
			if (createDirectories) {
				await this.ensureDirectory(path.dirname(destPath));
			}

			const stats = await this.getStats(sourcePath);

			if (stats.isDirectory) {
				await this.copyDirectory(sourcePath, destPath);
			} else {
				await fs.copyFile(sourcePath, destPath);
			}
		} catch (error) {
			throw new FileSystemError(
				`Failed to copy from ${sourcePath} to ${destPath}`,
				{sourcePath, destPath},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Recursively copy a directory
	 */
	private static async copyDirectory(
		sourcePath: string,
		destPath: string,
	): Promise<void> {
		await this.ensureDirectory(destPath);

		const entries = await fs.readdir(sourcePath, {withFileTypes: true});

		for (const entry of entries) {
			const srcPath = path.join(sourcePath, entry.name);
			const dstPath = path.join(destPath, entry.name);

			if (entry.isDirectory()) {
				await this.copyDirectory(srcPath, dstPath);
			} else {
				await fs.copyFile(srcPath, dstPath);
			}
		}
	}

	/**
	 * Walk through a directory tree
	 */
	static async *walk(
		rootPath: string,
		options: WalkOptions = {},
	): AsyncGenerator<string> {
		const {
			includePatterns = [],
			excludePatterns = [],
			maxDepth,
			followSymlinks = false,
			includeDirs = false,
			signal,
		} = options;

		async function* walkRecursive(
			currentPath: string,
			depth = 0,
		): AsyncGenerator<string> {
			if (signal?.aborted) {
				throw new Error('Walk operation was aborted');
			}

			if (maxDepth !== undefined && depth > maxDepth) {
				return;
			}

			try {
				const entries = await fs.readdir(currentPath, {withFileTypes: true});

				for (const entry of entries) {
					const fullPath = path.join(currentPath, entry.name);
					const relativePath = path.relative(rootPath, fullPath);

					// Check exclusion patterns
					if (
						excludePatterns.some(pattern =>
							FileUtils.matchesPattern(relativePath, pattern),
						)
					) {
						continue;
					}

					if (entry.isDirectory()) {
						if (
							includeDirs &&
							(includePatterns.length === 0 ||
								includePatterns.some(pattern =>
									FileUtils.matchesPattern(relativePath, pattern),
								))
						) {
							yield fullPath;
						}

						yield* walkRecursive(fullPath, depth + 1);
					} else if (
						entry.isFile() ||
						(entry.isSymbolicLink() && followSymlinks)
					) {
						if (
							includePatterns.length === 0 ||
							includePatterns.some(pattern =>
								FileUtils.matchesPattern(relativePath, pattern),
							)
						) {
							yield fullPath;
						}
					}
				}
			} catch (error) {
				// Skip directories we can't read
				if (
					(error as any).code !== 'EACCES' &&
					(error as any).code !== 'EPERM'
				) {
					throw new FileSystemError(
						`Failed to read directory: ${currentPath}`,
						{currentPath, depth},
						error instanceof Error ? error : undefined,
					);
				}
			}
		}

		yield* walkRecursive(rootPath);
	}

	/**
	 * Get all files in a directory matching patterns
	 */
	static async getFiles(
		rootPath: string,
		options: WalkOptions = {},
	): Promise<string[]> {
		const files: string[] = [];

		for await (const file of this.walk(rootPath, options)) {
			files.push(file);
		}

		return files;
	}

	/**
	 * Calculate file checksum
	 */
	static async calculateChecksum(
		filePath: string,
		algorithm = 'sha256',
	): Promise<string> {
		try {
			const content = await fs.readFile(filePath);
			return crypto.createHash(algorithm).update(content).digest('hex');
		} catch (error) {
			throw new FileSystemError(
				`Failed to calculate checksum for: ${filePath}`,
				{filePath, algorithm},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Get relative path safely
	 */
	static getRelativePath(from: string, to: string): string {
		try {
			return path.relative(from, to);
		} catch (error) {
			throw new FileSystemError(
				`Failed to get relative path from ${from} to ${to}`,
				{from, to},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Normalize path safely
	 */
	static normalizePath(filePath: string): string {
		return path.normalize(filePath).replace(/\\/g, '/');
	}

	/**
	 * Get file extension
	 */
	static getExtension(filePath: string): string {
		return path.extname(filePath).toLowerCase();
	}

	/**
	 * Check if a path matches a glob pattern
	 */
	static matchesPattern(filePath: string, pattern: string): boolean {
		// Simple glob pattern matching (can be enhanced with a proper glob library)
		const regexPattern = pattern
			.replace(/\./g, '\\.')
			.replace(/\*/g, '.*')
			.replace(/\?/g, '.');

		const regex = new RegExp(`^${regexPattern}$`, 'i');
		return regex.test(filePath);
	}

	/**
	 * Resolve a path safely
	 */
	static resolvePath(...paths: string[]): string {
		try {
			return path.resolve(...paths);
		} catch (error) {
			throw new FileSystemError(
				`Failed to resolve path: ${paths.join(', ')}`,
				{paths},
				error instanceof Error ? error : undefined,
			);
		}
	}

	/**
	 * Check if a path is within another path (security check)
	 */
	static isWithinPath(childPath: string, parentPath: string): boolean {
		const resolvedChild = path.resolve(childPath);
		const resolvedParent = path.resolve(parentPath);
		const relative = path.relative(resolvedParent, resolvedChild);

		return !relative.startsWith('..') && !path.isAbsolute(relative);
	}

	/**
	 * Get file size in human-readable format
	 */
	static formatFileSize(bytes: number): string {
		const units = ['B', 'KB', 'MB', 'GB', 'TB'];
		let size = bytes;
		let unitIndex = 0;

		while (size >= 1024 && unitIndex < units.length - 1) {
			size /= 1024;
			unitIndex++;
		}

		return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
	}
}
