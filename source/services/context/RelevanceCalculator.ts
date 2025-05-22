import {FileInfo, RelevanceScore, ContextPattern} from '../../core/types.js';
import {TextUtils} from '../../utils/text-utils.js';
import {ResonanceError} from '../../core/errors.js';

export interface RelevanceFactors {
	keywords: string[];
	patterns: ContextPattern[];
	fileTypes: string[];
	dependencies: string[];
	recency: Date;
}

export interface RelevanceWeights {
	keywordMatch: number;
	patternMatch: number;
	fileTypeMatch: number;
	dependencyMatch: number;
	recencyFactor: number;
	complexityFactor: number;
	importanceBoost: number;
}

export class RelevanceCalculator {
	private readonly weights: RelevanceWeights;

	constructor(weights: Partial<RelevanceWeights> = {}) {
		this.weights = {
			keywordMatch: 0.3,
			patternMatch: 0.25,
			fileTypeMatch: 0.15,
			dependencyMatch: 0.15,
			recencyFactor: 0.05,
			complexityFactor: 0.05,
			importanceBoost: 0.05,
			...weights,
		};

		// Validate weights sum to approximately 1.0
		const totalWeight = Object.values(this.weights).reduce(
			(sum, weight) => sum + weight,
			0,
		);
		if (Math.abs(totalWeight - 1.0) > 0.01) {
			throw new ResonanceError(
				'Relevance weights must sum to approximately 1.0',
				'RELEVANCE_WEIGHTS_INVALID',
				{weights: this.weights, totalWeight},
			);
		}
	}

	/**
	 * Calculate relevance score for a file given specific factors
	 */
	calculateRelevance(
		file: FileInfo,
		factors: RelevanceFactors,
	): RelevanceScore {
		try {
			const scores = {
				keyword: this.calculateKeywordScore(file, factors.keywords),
				pattern: this.calculatePatternScore(file, factors.patterns),
				fileType: this.calculateFileTypeScore(file, factors.fileTypes),
				dependency: this.calculateDependencyScore(file, factors.dependencies),
				recency: this.calculateRecencyScore(file, factors.recency),
				complexity: this.calculateComplexityScore(file),
				importance: this.calculateImportanceScore(file),
			};

			const totalScore =
				scores.keyword * this.weights.keywordMatch +
				scores.pattern * this.weights.patternMatch +
				scores.fileType * this.weights.fileTypeMatch +
				scores.dependency * this.weights.dependencyMatch +
				scores.recency * this.weights.recencyFactor +
				scores.complexity * this.weights.complexityFactor +
				scores.importance * this.weights.importanceBoost;

			return {
				file: file.path,
				score: Math.max(0, Math.min(1, totalScore)), // Clamp to [0,1]
				factors: scores,
				confidence: this.calculateConfidence(scores),
				reasons: this.generateReasons(file, factors, scores),
			};
		} catch (error) {
			throw new ResonanceError(
				`Failed to calculate relevance for ${file.path}`,
				'RELEVANCE_CALCULATION_FAILED',
				{file: file.path, factors},
				error,
			);
		}
	}

	/**
	 * Calculate relevance scores for multiple files
	 */
	calculateBatchRelevance(
		files: FileInfo[],
		factors: RelevanceFactors,
	): RelevanceScore[] {
		return files
			.map(file => this.calculateRelevance(file, factors))
			.sort((a, b) => b.score - a.score);
	}

	/**
	 * Filter files by minimum relevance threshold
	 */
	filterByRelevance(
		files: FileInfo[],
		factors: RelevanceFactors,
		threshold: number = 0.3,
	): RelevanceScore[] {
		return this.calculateBatchRelevance(files, factors).filter(
			score => score.score >= threshold,
		);
	}

	/**
	 * Get top N most relevant files
	 */
	getTopRelevant(
		files: FileInfo[],
		factors: RelevanceFactors,
		limit: number = 10,
	): RelevanceScore[] {
		return this.calculateBatchRelevance(files, factors).slice(0, limit);
	}

	private calculateKeywordScore(file: FileInfo, keywords: string[]): number {
		if (keywords.length === 0) return 0;

		const fileKeywords = [
			...TextUtils.extractKeywords(file.name).map(k => k.word),
			...TextUtils.extractKeywords(file.content || '').map(k => k.word),
			...(file.exports || []),
			...(file.imports || []),
		].map(k => k.toLowerCase());

		const normalizedKeywords = keywords.map(k => k.toLowerCase());

		let totalScore = 0;
		for (const keyword of normalizedKeywords) {
			// Exact matches get full points
			if (fileKeywords.includes(keyword)) {
				totalScore += 1;
				continue;
			}

			// Partial matches get similarity-based points
			let bestMatch = 0;
			for (const fileKeyword of fileKeywords) {
				const similarity = TextUtils.calculateSimilarity(keyword, fileKeyword).score;
				bestMatch = Math.max(bestMatch, similarity);
			}
			totalScore += bestMatch;
		}

		return Math.min(1, totalScore / keywords.length);
	}

	private calculatePatternScore(
		file: FileInfo,
		patterns: ContextPattern[],
	): number {
		if (patterns.length === 0) return 0;

		const filePatterns = file.patterns || [];
		let matchCount = 0;

		for (const pattern of patterns) {
			const hasMatch = filePatterns.some(
				fp => fp.type === pattern.type && fp.name === pattern.name,
			);
			if (hasMatch) matchCount++;
		}

		return matchCount / patterns.length;
	}

	private calculateFileTypeScore(
		file: FileInfo,
		targetTypes: string[],
	): number {
		if (targetTypes.length === 0) return 0.5; // Neutral if no preference

		const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
		return targetTypes.map(t => t.toLowerCase()).includes(fileExtension)
			? 1
			: 0;
	}

	private calculateDependencyScore(
		file: FileInfo,
		targetDependencies: string[],
	): number {
		if (targetDependencies.length === 0) return 0;

		const fileDependencies = [
			...(file.imports || []),
			...(file.exports || []),
		].map(d => d.toLowerCase());

		const normalizedTargets = targetDependencies.map(d => d.toLowerCase());

		let matchCount = 0;
		for (const target of normalizedTargets) {
			const hasMatch = fileDependencies.some(
				dep => dep.includes(target) || target.includes(dep),
			);
			if (hasMatch) matchCount++;
		}

		return matchCount / targetDependencies.length;
	}

	private calculateRecencyScore(file: FileInfo, targetDate: Date): number {
		if (!file.lastModified) return 0;

		const daysSince =
			(targetDate.getTime() - file.lastModified.getTime()) /
			(1000 * 60 * 60 * 24);

		// Files modified recently get higher scores
		if (daysSince < 1) return 1;
		if (daysSince < 7) return 0.8;
		if (daysSince < 30) return 0.6;
		if (daysSince < 90) return 0.4;
		return 0.2;
	}

	private calculateComplexityScore(file: FileInfo): number {
		const complexity = file.complexity || 0;

		// Moderate complexity is often most relevant
		// Too simple might not be helpful, too complex might be overwhelming
		if (complexity < 5) return 0.3;
		if (complexity < 15) return 1.0;
		if (complexity < 30) return 0.8;
		if (complexity < 50) return 0.6;
		return 0.4;
	}

	private calculateImportanceScore(file: FileInfo): number {
		let score = 0;

		// Main entry points
		if (file.name.includes('index') || file.name.includes('main')) {
			score += 0.3;
		}

		// Configuration files
		if (file.name.includes('config') || file.name.includes('settings')) {
			score += 0.2;
		}

		// Core/base files
		if (file.path.includes('/core/') || file.path.includes('/base/')) {
			score += 0.2;
		}

		// Service files
		if (file.path.includes('/service') || file.name.includes('Service')) {
			score += 0.15;
		}

		// Type definition files
		if (file.name.includes('types') || file.name.includes('interface')) {
			score += 0.15;
		}

		return Math.min(1, score);
	}

	private calculateConfidence(scores: Record<string, number>): number {
		const nonZeroScores = Object.values(scores).filter(s => s > 0);

		if (nonZeroScores.length === 0) return 0;

		// Confidence based on number of contributing factors and score variance
		const mean =
			nonZeroScores.reduce((sum, score) => sum + score, 0) /
			nonZeroScores.length;
		const variance =
			nonZeroScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
			nonZeroScores.length;

		// Higher confidence with more factors and lower variance
		const factorConfidence = Math.min(1, nonZeroScores.length / 7);
		const varianceConfidence = Math.max(0, 1 - variance);

		return (factorConfidence + varianceConfidence) / 2;
	}

	private generateReasons(
		file: FileInfo,
		factors: RelevanceFactors,
		scores: Record<string, number>,
	): string[] {
		const reasons: string[] = [];

		if (scores['keyword'] && scores['keyword'] > 0.7) {
			reasons.push('Strong keyword match with task requirements');
		} else if (scores['keyword'] && scores['keyword'] > 0.3) {
			reasons.push('Partial keyword match');
		}

		if (scores['pattern'] && scores['pattern'] > 0.5) {
			reasons.push('Contains relevant code patterns');
		}

		if (scores['fileType'] && scores['fileType'] === 1) {
			reasons.push('Matches target file type');
		}

		if (scores['dependency'] && scores['dependency'] > 0.5) {
			reasons.push('Has relevant dependencies');
		}

		if (scores['recency'] && scores['recency'] > 0.8) {
			reasons.push('Recently modified');
		}

		if (scores['complexity'] && scores['complexity'] > 0.8) {
			reasons.push('Optimal complexity level');
		}

		if (scores['importance'] && scores['importance'] > 0.5) {
			reasons.push('Important architectural component');
		}

		if (reasons.length === 0) {
			reasons.push('Basic relevance detected');
		}

		return reasons;
	}

	/**
	 * Update relevance weights based on feedback
	 */
	updateWeights(feedback: Partial<RelevanceWeights>): RelevanceCalculator {
		return new RelevanceCalculator({...this.weights, ...feedback});
	}

	/**
	 * Get current weights configuration
	 */
	getWeights(): RelevanceWeights {
		return {...this.weights};
	}
}

export default RelevanceCalculator;
