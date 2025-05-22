/**
 * Text processing utilities for GuardianAI MVP
 *
 * Provides text analysis and processing functions optimized for Claude's needs.
 */

export interface TextMetrics {
	lines: number;
	words: number;
	characters: number;
	charactersNoSpaces: number;
	paragraphs: number;
}

export interface SimilarityResult {
	score: number;
	algorithm: string;
	details?: Record<string, any>;
}

export interface CodeExtractionOptions {
	language?: string;
	includeComments?: boolean;
	includeStrings?: boolean;
	maxLength?: number;
}

/**
 * Text processing utilities class
 */
export class TextUtils {
	/**
	 * Calculate basic text metrics
	 */
	static getMetrics(text: string): TextMetrics {
		const lines = text.split('\n').length;
		const words = text.trim() ? text.trim().split(/\s+/).length : 0;
		const characters = text.length;
		const charactersNoSpaces = text.replace(/\s/g, '').length;
		const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;

		return {
			lines,
			words,
			characters,
			charactersNoSpaces,
			paragraphs,
		};
	}

	/**
	 * Normalize whitespace in text
	 */
	static normalizeWhitespace(text: string): string {
		return text
			.replace(/\r\n/g, '\n') // Normalize line endings
			.replace(/\r/g, '\n') // Handle old Mac line endings
			.replace(/\t/g, '  ') // Convert tabs to spaces
			.replace(/ +/g, ' ') // Collapse multiple spaces
			.trim();
	}

	/**
	 * Extract code sections from text
	 */
	static extractCodeBlocks(
		text: string,
		options: CodeExtractionOptions = {},
	): Array<{
		language: string;
		code: string;
		startLine: number;
		endLine: number;
	}> {
		const {language, maxLength} = options;
		const codeBlocks: Array<{
			language: string;
			code: string;
			startLine: number;
			endLine: number;
		}> = [];

		const lines = text.split('\n');
		let inCodeBlock = false;
		let currentLanguage = '';
		let currentCode: string[] = [];
		let startLine = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (!line) continue;

			if (line.startsWith('```')) {
				if (!inCodeBlock) {
					// Starting a code block
					inCodeBlock = true;
					currentLanguage = line.slice(3).trim() || 'text';
					currentCode = [];
					startLine = i + 1;
				} else {
					// Ending a code block
					inCodeBlock = false;
					const code = currentCode.join('\n');

					if (!language || currentLanguage === language) {
						if (!maxLength || code.length <= maxLength) {
							codeBlocks.push({
								language: currentLanguage,
								code,
								startLine,
								endLine: i,
							});
						}
					}
				}
			} else if (inCodeBlock) {
				currentCode.push(line);
			}
		}

		return codeBlocks;
	}

	/**
	 * Calculate similarity between two strings using Levenshtein distance
	 */
	static calculateSimilarity(text1: string, text2: string): SimilarityResult {
		const len1 = text1.length;
		const len2 = text2.length;

		if (len1 === 0)
			return {score: len2 === 0 ? 1 : 0, algorithm: 'levenshtein'};
		if (len2 === 0) return {score: 0, algorithm: 'levenshtein'};

		const matrix: number[][] = [];

		// Initialize matrix
		for (let i = 0; i <= len1; i++) {
			matrix[i] = [i];
		}
		for (let j = 0; j <= len2; j++) {
			if (matrix[0]) {
				matrix[0][j] = j;
			}
		}

		// Fill matrix
		for (let i = 1; i <= len1; i++) {
			for (let j = 1; j <= len2; j++) {
				const cost = text1[i - 1] === text2[j - 1] ? 0 : 1;
				const prevRow = matrix[i - 1];
				const currRow = matrix[i];
				const prevCell = currRow?.[j - 1];

				if (prevRow && currRow && prevCell !== undefined) {
					const prevRowJ = prevRow[j];
					const prevRowJMinus1 = prevRow[j - 1];

					if (prevRowJ !== undefined && prevRowJMinus1 !== undefined) {
						currRow[j] = Math.min(
							prevRowJ + 1, // Deletion
							prevCell + 1, // Insertion
							prevRowJMinus1 + cost, // Substitution
						);
					}
				}
			}
		}

		const finalRow = matrix[len1];
		const distance = finalRow?.[len2] ?? 0;
		const maxLength = Math.max(len1, len2);
		const score = 1 - distance / maxLength;

		return {
			score,
			algorithm: 'levenshtein',
			details: {
				distance,
				maxLength,
				length1: len1,
				length2: len2,
			},
		};
	}

	/**
	 * Calculate cosine similarity between two texts
	 */
	static calculateCosineSimilarity(
		text1: string,
		text2: string,
	): SimilarityResult {
		const words1 = this.tokenize(text1.toLowerCase());
		const words2 = this.tokenize(text2.toLowerCase());

		const allWords = new Set([...words1, ...words2]);
		const vector1: number[] = [];
		const vector2: number[] = [];

		// Create frequency vectors
		for (const word of allWords) {
			vector1.push(words1.filter(w => w === word).length);
			vector2.push(words2.filter(w => w === word).length);
		}

		// Calculate cosine similarity
		const dotProduct = vector1.reduce((sum, val, i) => {
			const val2 = vector2[i];
			return sum + val * (val2 ?? 0);
		}, 0);
		const magnitude1 = Math.sqrt(
			vector1.reduce((sum, val) => sum + val * val, 0),
		);
		const magnitude2 = Math.sqrt(
			vector2.reduce((sum, val) => sum + val * val, 0),
		);

		const score =
			magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;

		return {
			score,
			algorithm: 'cosine',
			details: {
				uniqueWords: allWords.size,
				words1Count: words1.length,
				words2Count: words2.length,
				dotProduct,
				magnitude1,
				magnitude2,
			},
		};
	}

	/**
	 * Tokenize text into words
	 */
	static tokenize(text: string): string[] {
		return text
			.toLowerCase()
			.replace(/[^\w\s]/g, ' ')
			.split(/\s+/)
			.filter(word => word.length > 0);
	}

	/**
	 * Extract keywords from text
	 */
	static extractKeywords(
		text: string,
		maxKeywords = 10,
	): Array<{
		word: string;
		frequency: number;
		relevance: number;
	}> {
		const words = this.tokenize(text);
		const stopWords = new Set([
			'the',
			'a',
			'an',
			'and',
			'or',
			'but',
			'in',
			'on',
			'at',
			'to',
			'for',
			'of',
			'with',
			'by',
			'from',
			'up',
			'about',
			'into',
			'through',
			'during',
			'before',
			'after',
			'above',
			'below',
			'between',
			'among',
			'is',
			'are',
			'was',
			'were',
			'be',
			'been',
			'being',
			'have',
			'has',
			'had',
			'do',
			'does',
			'did',
			'will',
			'would',
			'could',
			'should',
			'may',
			'might',
			'must',
			'can',
			'this',
			'that',
			'these',
			'those',
			'i',
			'you',
			'he',
			'she',
			'it',
			'we',
			'they',
		]);

		const wordCounts = new Map<string, number>();
		const filteredWords = words.filter(
			word => word.length > 2 && !stopWords.has(word),
		);

		// Count word frequencies
		for (const word of filteredWords) {
			wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
		}

		// Calculate relevance (simple TF-IDF approximation)
		const totalWords = filteredWords.length;
		const keywords = Array.from(wordCounts.entries())
			.map(([word, frequency]) => ({
				word,
				frequency,
				relevance: (frequency / totalWords) * Math.log(totalWords / frequency),
			}))
			.sort((a, b) => b.relevance - a.relevance)
			.slice(0, maxKeywords);

		return keywords;
	}

	/**
	 * Truncate text to a maximum length while preserving word boundaries
	 */
	static truncate(text: string, maxLength: number, ellipsis = '...'): string {
		if (text.length <= maxLength) {
			return text;
		}

		const truncated = text.substring(0, maxLength - ellipsis.length);
		const lastSpace = truncated.lastIndexOf(' ');

		if (lastSpace > 0) {
			return truncated.substring(0, lastSpace) + ellipsis;
		}

		return truncated + ellipsis;
	}

	/**
	 * Smart truncate that preserves sentence structure
	 */
	static smartTruncate(
		text: string,
		maxLength: number,
		ellipsis = '...',
	): string {
		if (text.length <= maxLength) {
			return text;
		}

		const sentences = text.split(/[.!?]+/);
		let result = '';

		for (const sentence of sentences) {
			const trimmed = sentence.trim();
			if (!trimmed) continue;

			const withPunctuation = trimmed + '.';
			if ((result + withPunctuation).length <= maxLength - ellipsis.length) {
				result += (result ? ' ' : '') + withPunctuation;
			} else {
				break;
			}
		}

		return result || this.truncate(text, maxLength, ellipsis);
	}

	/**
	 * Extract lines around a specific line number
	 */
	static extractContext(
		text: string,
		targetLine: number,
		contextLines = 3,
	): {
		content: string;
		startLine: number;
		endLine: number;
	} {
		const lines = text.split('\n');
		const start = Math.max(0, targetLine - contextLines - 1);
		const end = Math.min(lines.length, targetLine + contextLines);

		return {
			content: lines.slice(start, end).join('\n'),
			startLine: start + 1,
			endLine: end,
		};
	}

	/**
	 * Find all occurrences of a pattern in text
	 */
	static findOccurrences(
		text: string,
		pattern: string | RegExp,
	): Array<{
		match: string;
		index: number;
		line: number;
		column: number;
	}> {
		const occurrences: Array<{
			match: string;
			index: number;
			line: number;
			column: number;
		}> = [];

		const regex =
			typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
		const lines = text.split('\n');
		let globalIndex = 0;

		for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
			const line = lines[lineIndex];
			let match: RegExpExecArray | null;

			// Reset regex for each line
			const lineRegex = new RegExp(regex.source, regex.flags);

			if (line) {
				while ((match = lineRegex.exec(line)) !== null) {
					occurrences.push({
						match: match[0],
						index: globalIndex + match.index,
						line: lineIndex + 1,
						column: match.index + 1,
					});

					if (!regex.global) break;
				}

				globalIndex += line.length + 1; // +1 for newline
			}
		}

		return occurrences;
	}

	/**
	 * Clean and format code for display
	 */
	static formatCode(
		code: string,
		options: {indent?: number; removeBlankLines?: boolean} = {},
	): string {
		const {indent = 0, removeBlankLines = false} = options;

		let lines = code.split('\n');

		if (removeBlankLines) {
			lines = lines.filter(line => line.trim());
		}

		if (indent > 0) {
			const indentString = ' '.repeat(indent);
			lines = lines.map(line => (line ? indentString + line : line));
		}

		return lines.join('\n');
	}

	/**
	 * Generate a text summary
	 */
	static generateSummary(text: string, maxSentences = 3): string {
		const sentences = text
			.split(/[.!?]+/)
			.map(s => s.trim())
			.filter(s => s.length > 0);

		if (sentences.length <= maxSentences) {
			return sentences.join('. ') + '.';
		}

		// Simple extractive summary: take first, middle, and last sentences
		const indices = [
			0,
			Math.floor(sentences.length / 2),
			sentences.length - 1,
		].filter((v, i, arr) => arr.indexOf(v) === i); // Remove duplicates

		return (
			indices
				.slice(0, maxSentences)
				.map(i => sentences[i])
				.join('. ') + '.'
		);
	}

	/**
	 * Check if text contains any of the given patterns
	 */
	static containsAny(text: string, patterns: (string | RegExp)[]): boolean {
		return patterns.some(pattern => {
			if (typeof pattern === 'string') {
				return text.includes(pattern);
			} else {
				return pattern.test(text);
			}
		});
	}

	/**
	 * Replace multiple patterns in text
	 */
	static replacePatterns(
		text: string,
		replacements: Array<{
			pattern: string | RegExp;
			replacement: string;
		}>,
	): string {
		let result = text;

		for (const {pattern, replacement} of replacements) {
			if (typeof pattern === 'string') {
				result = result.replace(new RegExp(pattern, 'g'), replacement);
			} else {
				result = result.replace(pattern, replacement);
			}
		}

		return result;
	}
}
