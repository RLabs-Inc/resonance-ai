/**
 * CostTracker - Real-time API cost monitoring and feedback
 * 
 * Provides detailed cost tracking for Anthropic API usage with
 * session-level and task-level granularity
 */

import { colorize } from '../utils/colors.js';

export interface TokenUsage {
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
}

export interface CostBreakdown {
  readonly inputCost: number;
  readonly outputCost: number;
  readonly totalCost: number;
  readonly currency: string;
}

export interface APICall {
  readonly id: string;
  readonly timestamp: Date;
  readonly model: string;
  readonly usage: TokenUsage;
  readonly cost: CostBreakdown;
  readonly task?: string;
  readonly context?: string;
}

export interface SessionSummary {
  readonly sessionId: string;
  readonly startTime: Date;
  readonly endTime?: Date;
  readonly totalCalls: number;
  readonly totalTokens: TokenUsage;
  readonly totalCost: CostBreakdown;
  readonly tasks: TaskSummary[];
}

export interface TaskSummary {
  readonly taskName: string;
  readonly startTime: Date;
  readonly endTime?: Date;
  readonly calls: number;
  readonly tokens: TokenUsage;
  readonly cost: CostBreakdown;
}

// Anthropic pricing (as of current rates - update as needed)
const PRICING = {
  'claude-3-7-sonnet-20250219': {
    input: 3.00 / 1_000_000,   // $3.00 per million input tokens
    output: 15.00 / 1_000_000  // $15.00 per million output tokens
  },
  'claude-3-5-sonnet-20241022': {
    input: 3.00 / 1_000_000,
    output: 15.00 / 1_000_000
  },
  'claude-3-haiku-20240307': {
    input: 0.25 / 1_000_000,
    output: 1.25 / 1_000_000
  }
} as const;

export class CostTracker {
  private sessionId: string;
  private sessionStart: Date;
  private calls: APICall[] = [];
  private currentTask?: string;
  private taskStart?: Date;
  private sessionCost: CostBreakdown = { inputCost: 0, outputCost: 0, totalCost: 0, currency: 'USD' };

  constructor() {
    this.sessionId = `session-${Date.now()}`;
    this.sessionStart = new Date();
  }

  /**
   * Start tracking a new task
   */
  startTask(taskName: string): void {
    this.currentTask = taskName;
    this.taskStart = new Date();
    
    console.log(colorize.accent(`💰 Cost tracking started for: ${taskName}`));
    this.displayCurrentCosts();
  }

  /**
   * End current task tracking
   */
  endTask(): TaskSummary | null {
    if (!this.currentTask || !this.taskStart) {
      return null;
    }

    const taskCalls = this.calls.filter(call => call.task === this.currentTask);
    const taskSummary = this.calculateTaskSummary(this.currentTask, this.taskStart, taskCalls);
    
    console.log(colorize.success(`✅ Task completed: ${this.currentTask}`));
    this.displayTaskSummary(taskSummary);
    
    this.currentTask = undefined;
    this.taskStart = undefined;
    
    return taskSummary;
  }

  /**
   * Record an API call
   */
  recordCall(
    model: string,
    usage: TokenUsage,
    context?: string
  ): APICall {
    const cost = this.calculateCost(model, usage);
    
    const call: APICall = {
      id: `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      model,
      usage,
      cost,
      task: this.currentTask,
      context
    };

    this.calls.push(call);
    this.updateSessionCost(cost);
    
    // Display real-time cost update
    this.displayRealTimeUpdate(call);
    
    return call;
  }

  /**
   * Calculate cost for a specific model and usage
   */
  private calculateCost(model: string, usage: TokenUsage): CostBreakdown {
    const pricing = PRICING[model as keyof typeof PRICING];
    
    if (!pricing) {
      console.log(colorize.warning(`⚠️  Unknown model pricing: ${model}`));
      return { inputCost: 0, outputCost: 0, totalCost: 0, currency: 'USD' };
    }

    const inputCost = usage.inputTokens * pricing.input;
    const outputCost = usage.outputTokens * pricing.output;
    const totalCost = inputCost + outputCost;

    return {
      inputCost,
      outputCost,
      totalCost,
      currency: 'USD'
    };
  }

  /**
   * Update session cost totals
   */
  private updateSessionCost(cost: CostBreakdown): void {
    this.sessionCost = {
      inputCost: this.sessionCost.inputCost + cost.inputCost,
      outputCost: this.sessionCost.outputCost + cost.outputCost,
      totalCost: this.sessionCost.totalCost + cost.totalCost,
      currency: 'USD'
    };
  }

  /**
   * Display real-time cost update
   */
  private displayRealTimeUpdate(call: APICall): void {
    const cost = call.cost.totalCost;
    const sessionTotal = this.sessionCost.totalCost;
    
    console.log(colorize.primary(`💰 API Call: $${cost.toFixed(6)} | Session Total: $${sessionTotal.toFixed(6)}`));
  }

  /**
   * Display current session costs
   */
  displayCurrentCosts(): void {
    console.log(colorize.bright('\n💰 Current Session Costs:'));
    console.log(`  ${colorize.dim('Session ID:')} ${colorize.accent(this.sessionId)}`);
    console.log(`  ${colorize.dim('Started:')} ${colorize.muted(this.sessionStart.toLocaleString())}`);
    console.log(`  ${colorize.dim('API Calls:')} ${colorize.warning(this.calls.length.toString())}`);
    console.log(`  ${colorize.dim('Total Cost:')} ${colorize.success(`$${this.sessionCost.totalCost.toFixed(6)} USD`)}`);
    
    if (this.currentTask) {
      const taskCalls = this.calls.filter(call => call.task === this.currentTask);
      const taskCost = taskCalls.reduce((sum, call) => sum + call.cost.totalCost, 0);
      console.log(`  ${colorize.dim('Current Task:')} ${colorize.accent(this.currentTask)}`);
      console.log(`  ${colorize.dim('Task Cost:')} ${colorize.warning(`$${taskCost.toFixed(6)} USD`)}`);
    }
    console.log();
  }

  /**
   * Display detailed task summary
   */
  private displayTaskSummary(summary: TaskSummary): void {
    console.log(colorize.bright(`\n📊 Task Summary: ${summary.taskName}`));
    console.log(`  ${colorize.dim('Duration:')} ${colorize.muted(this.formatDuration(summary.startTime, summary.endTime))}`);
    console.log(`  ${colorize.dim('API Calls:')} ${colorize.warning(summary.calls.toString())}`);
    console.log(`  ${colorize.dim('Input Tokens:')} ${colorize.accent(summary.tokens.inputTokens.toLocaleString())}`);
    console.log(`  ${colorize.dim('Output Tokens:')} ${colorize.accent(summary.tokens.outputTokens.toLocaleString())}`);
    console.log(`  ${colorize.dim('Total Tokens:')} ${colorize.accent(summary.tokens.totalTokens.toLocaleString())}`);
    console.log(`  ${colorize.dim('Input Cost:')} ${colorize.muted(`$${summary.cost.inputCost.toFixed(6)}`)}`);
    console.log(`  ${colorize.dim('Output Cost:')} ${colorize.muted(`$${summary.cost.outputCost.toFixed(6)}`)}`);
    console.log(`  ${colorize.dim('Total Cost:')} ${colorize.success(`$${summary.cost.totalCost.toFixed(6)} USD`)}`);
    console.log();
  }

  /**
   * Calculate task summary
   */
  private calculateTaskSummary(taskName: string, startTime: Date, calls: APICall[]): TaskSummary {
    const endTime = new Date();
    
    const tokens = calls.reduce(
      (sum, call) => ({
        inputTokens: sum.inputTokens + call.usage.inputTokens,
        outputTokens: sum.outputTokens + call.usage.outputTokens,
        totalTokens: sum.totalTokens + call.usage.totalTokens
      }),
      { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
    );

    const cost = calls.reduce(
      (sum, call) => ({
        inputCost: sum.inputCost + call.cost.inputCost,
        outputCost: sum.outputCost + call.cost.outputCost,
        totalCost: sum.totalCost + call.cost.totalCost,
        currency: 'USD'
      }),
      { inputCost: 0, outputCost: 0, totalCost: 0, currency: 'USD' }
    );

    return {
      taskName,
      startTime,
      endTime,
      calls: calls.length,
      tokens,
      cost
    };
  }

  /**
   * Format duration between two dates
   */
  private formatDuration(start: Date, end?: Date): string {
    const endTime = end || new Date();
    const durationMs = endTime.getTime() - start.getTime();
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    
    return `${seconds}s`;
  }

  /**
   * Get session summary
   */
  getSessionSummary(): SessionSummary {
    const tasks = this.getTaskSummaries();
    
    const totalTokens = this.calls.reduce(
      (sum, call) => ({
        inputTokens: sum.inputTokens + call.usage.inputTokens,
        outputTokens: sum.outputTokens + call.usage.outputTokens,
        totalTokens: sum.totalTokens + call.usage.totalTokens
      }),
      { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
    );

    return {
      sessionId: this.sessionId,
      startTime: this.sessionStart,
      totalCalls: this.calls.length,
      totalTokens,
      totalCost: this.sessionCost,
      tasks
    };
  }

  /**
   * Get summaries for all completed tasks
   */
  private getTaskSummaries(): TaskSummary[] {
    const taskNames = Array.from(new Set(
      this.calls
        .filter(call => call.task)
        .map(call => call.task!)
    ));

    return taskNames.map(taskName => {
      const taskCalls = this.calls.filter(call => call.task === taskName);
      const startTime = taskCalls[0]?.timestamp || this.sessionStart;
      return this.calculateTaskSummary(taskName, startTime, taskCalls);
    });
  }

  /**
   * Display final session summary
   */
  displaySessionSummary(): void {
    const summary = this.getSessionSummary();
    
    console.log(colorize.bright('\n🎯 Final Session Summary'));
    console.log(`  ${colorize.dim('Session ID:')} ${colorize.accent(summary.sessionId)}`);
    console.log(`  ${colorize.dim('Duration:')} ${colorize.muted(this.formatDuration(summary.startTime))}`);
    console.log(`  ${colorize.dim('Total Calls:')} ${colorize.warning(summary.totalCalls.toString())}`);
    console.log(`  ${colorize.dim('Total Tokens:')} ${colorize.accent(summary.totalTokens.totalTokens.toLocaleString())}`);
    console.log(`  ${colorize.dim('Final Cost:')} ${colorize.success(`$${summary.totalCost.totalCost.toFixed(6)} USD`)}`);
    
    if (summary.tasks.length > 0) {
      console.log(colorize.bright('\n📋 Tasks Completed:'));
      summary.tasks.forEach(task => {
        console.log(`  • ${colorize.accent(task.taskName)}: ${colorize.success(`$${task.cost.totalCost.toFixed(6)}`)}`);
      });
    }
    
    console.log();
  }

  /**
   * Export session data for analysis
   */
  exportSession(): SessionSummary {
    return this.getSessionSummary();
  }
}