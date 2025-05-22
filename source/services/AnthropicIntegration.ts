/**
 * AnthropicIntegration - Real Claude AI Integration
 * 
 * Connects ResonanceAI with Claude AI using the Anthropic TypeScript SDK
 */

import Anthropic from '@anthropic-ai/sdk';
import { colorize } from '../utils/colors.js';
import { CostTracker } from './CostTracker.js';
import { ToolExecutor } from './ToolExecutor.js';
import { TOOL_DEFINITIONS } from './ToolDefinitions.js';
import type { ResonanceConfig } from '../core/types.js';
export interface AIMessage {
  readonly role: 'user' | 'assistant';
  readonly content: string;
}

export interface AIResponse {
  readonly content: string;
  readonly usage?: {
    readonly inputTokens: number;
    readonly outputTokens: number;
  };
}

export interface AIConfig {
  readonly apiKey: string;
  readonly model?: string;
  readonly maxTokens?: number;
  readonly temperature?: number;
}

export class AnthropicIntegration {
  private readonly config: AIConfig;
  private anthropic?: Anthropic;
  private costTracker: CostTracker;
  private toolExecutor?: ToolExecutor;

  constructor(config: AIConfig, costTracker?: CostTracker, resonanceConfig?: ResonanceConfig) {
    this.config = {
      model: 'claude-3-7-sonnet-20250219',
      maxTokens: 4000,
      temperature: 0.7,
      ...config
    };
    this.costTracker = costTracker || new CostTracker();
    
    if (resonanceConfig) {
      this.toolExecutor = new ToolExecutor(resonanceConfig);
    }
  }

  /**
   * Initialize the Anthropic client
   */
  async initialize(): Promise<boolean> {
    try {
      if (!this.isConfigured()) {
        console.log(colorize.warning('⚠️  Anthropic API key not configured - running in demo mode'));
        console.log(colorize.dim('Set ANTHROPIC_API_KEY environment variable for full AI integration'));
        return true;
      }

      this.anthropic = new Anthropic({
        apiKey: this.config.apiKey,
      });

      console.log(colorize.success('✅ Anthropic integration initialized'));
      console.log(colorize.dim(`Model: ${this.config.model}`));
      return true;
    } catch (error) {
      console.log(colorize.error('❌ Failed to initialize Anthropic integration'));
      console.log(colorize.dim(error instanceof Error ? error.message : String(error)));
      return false;
    }
  }

  /**
   * Send a message to Claude and get a response
   */
  async sendMessage(
    message: string, 
    context?: string,
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      // If no real API key, use simulation
      if (!this.anthropic) {
        const response = this.simulateClaudeResponse(message, context);
        return {
          content: response,
          usage: {
            inputTokens: message.length + (context?.length || 0),
            outputTokens: response.length
          }
        };
      }

      // Real API call
      const systemContent = systemPrompt || `You are ResonanceAI, Claude's development assistant. You help with coding tasks, provide implementation guidance, and work interactively on software development.

You are currently working within ResonanceAI itself - a tool designed specifically for Claude to use while coding. You can:
- Analyze codebases and provide context
- Generate implementation guidance
- Help with code reviews and improvements
- Work interactively with developers

Context: ${context || 'No additional context provided'}`;

      const response = await this.anthropic.messages.create({
        model: this.config.model!,
        max_tokens: this.config.maxTokens!,
        temperature: this.config.temperature!,
        system: systemContent,
        tools: this.toolExecutor ? TOOL_DEFINITIONS : undefined,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      });

      // Handle tool use if present
      if (response.content.some(block => block.type === 'tool_use')) {
        return await this.handleToolUse(response, context);
      }

      // Handle regular text response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      // Record cost information
      const usage = {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens
      };

      this.costTracker.recordCall(this.config.model!, usage, context);

      return {
        content: content.text,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens
        }
      };
    } catch (error) {
      console.log(colorize.error('❌ Failed to send message to Claude'));
      throw error;
    }
  }

  /**
   * Send a streaming message (for real-time responses)
   */
  async sendStreamingMessage(
    message: string,
    context?: string,
    onChunk?: (chunk: string) => void
  ): Promise<AIResponse> {
    try {
      const response = this.simulateClaudeResponse(message, context);
      
      // Simulate streaming by sending chunks
      if (onChunk) {
        const words = response.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = i === 0 ? words[i] : ` ${words[i]}`;
          onChunk(chunk);
          
          // Small delay to simulate streaming
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      return {
        content: response,
        usage: {
          inputTokens: message.length + (context?.length || 0),
          outputTokens: response.length
        }
      };
    } catch (error) {
      console.log(colorize.error('❌ Failed to send streaming message'));
      throw error;
    }
  }

  /**
   * Get implementation guidance from Claude
   */
  async getImplementationGuidance(
    task: string,
    codebaseContext: string,
    existingPatterns: string[]
  ): Promise<string> {
    const systemPrompt = `You are ResonanceAI, Claude's development assistant. You help Claude implement features while respecting existing patterns and architecture.

Your role:
- Provide specific, actionable implementation guidance
- Respect existing codebase patterns and conventions
- Suggest concrete file changes and code examples
- Focus on integration with existing systems

Context about this codebase:
${codebaseContext}

Existing patterns to follow:
${existingPatterns.join('\n')}`;

    const message = `I need to ${task}. Please provide specific implementation guidance including:

1. Approach and strategy
2. Files to modify/create
3. Code examples following existing patterns
4. Integration points
5. Testing considerations

Please be specific and actionable.`;

    const response = await this.sendMessage(message, codebaseContext, systemPrompt);
    return response.content;
  }

  /**
   * Simulate Claude response (temporary implementation)
   */
  private simulateClaudeResponse(message: string, context?: string): string {
    // Analyze the message to provide contextual responses
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('implement') || messageLower.includes('add')) {
      return `I'll help you implement this feature. Based on the codebase context, here's my approach:

1. **Analysis**: I can see the existing patterns in your code
2. **Strategy**: Follow the established architecture and conventions
3. **Implementation**: Create the necessary files and integrate properly
4. **Testing**: Add appropriate tests following existing patterns

Let me know if you'd like me to proceed with the implementation or if you need more specific guidance for any step.

*Note: This is a simulated response. Real Claude integration will be available once we add the Anthropic SDK.*`;
    }
    
    if (messageLower.includes('read') || messageLower.includes('analyze')) {
      return `I'll analyze the file(s) for you. Based on what I can see:

- The code follows clean architecture principles
- There are established patterns for services and utilities
- The structure is well-organized and maintainable

Would you like me to provide specific insights about any particular aspect?

*Note: This is a simulated response. Real file analysis will be enhanced with the full Claude integration.*`;
    }
    
    if (messageLower.includes('help') || messageLower.includes('guide')) {
      return `I'm here to help you with your development tasks! I can:

- Analyze your codebase and understand existing patterns
- Provide implementation guidance for new features
- Help with code reviews and refactoring
- Suggest improvements and best practices
- Work with you interactively as you implement changes

What would you like to work on together?

*Note: This is a simulated response. Full capabilities will be available with real Claude integration.*`;
    }
    
    return `I understand you said: "${message}"

I'm ready to help with your development tasks. Once we integrate the full Anthropic SDK, I'll be able to provide much more detailed and contextual assistance.

For now, I can help with basic guidance and work alongside you as you implement features.

What would you like to work on?`;
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return Boolean(this.config.apiKey && this.config.apiKey !== 'your-api-key-here');
  }

  /**
   * Get configuration status
   */
  getStatus(): string {
    if (!this.isConfigured()) {
      return 'Not configured - API key needed';
    }
    
    return `Configured with ${this.config.model}`;
  }

  /**
   * Start cost tracking for a task
   */
  startTask(taskName: string): void {
    this.costTracker.startTask(taskName);
  }

  /**
   * End cost tracking for current task
   */
  endTask(): void {
    this.costTracker.endTask();
  }

  /**
   * Display current costs
   */
  displayCosts(): void {
    this.costTracker.displayCurrentCosts();
  }

  /**
   * Get cost tracker instance
   */
  getCostTracker(): CostTracker {
    return this.costTracker;
  }

  /**
   * Handle tool use responses
   */
  private async handleToolUse(response: any, context?: string): Promise<AIResponse> {
    if (!this.toolExecutor || !this.anthropic) {
      throw new Error('Tool executor not available');
    }

    // Record initial cost
    const initialUsage = {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      totalTokens: response.usage.input_tokens + response.usage.output_tokens
    };
    this.costTracker.recordCall(this.config.model!, initialUsage, context);

    // Process each tool use block
    const toolResults: any[] = [];
    let textContent = '';

    for (const block of response.content) {
      if (block.type === 'text') {
        textContent += block.text;
      } else if (block.type === 'tool_use') {
        console.log(colorize.accent(`🔧 Claude is using tool: ${block.name}`));
        
        const result = await this.toolExecutor.executeTool(block.name, block.input);
        
        toolResults.push({
          tool_use_id: block.id,
          type: 'tool_result',
          content: result.success ? 
            JSON.stringify(result.result, null, 2) : 
            `Error: ${result.error}`
        });

        if (result.success) {
          console.log(colorize.success(`✅ Tool executed successfully: ${block.name}`));
        } else {
          console.log(colorize.error(`❌ Tool execution failed: ${block.name} - ${result.error}`));
        }
      }
    }

    // If there were tool uses, send the results back to Claude for final response
    if (toolResults.length > 0) {
      const followUpResponse = await this.anthropic.messages.create({
        model: this.config.model!,
        max_tokens: this.config.maxTokens!,
        temperature: this.config.temperature!,
        messages: [
          {
            role: 'user',
            content: response.content[0].type === 'text' ? response.content[0].text : 'Please use the tools to help with this request.'
          },
          {
            role: 'assistant',
            content: response.content
          },
          {
            role: 'user',
            content: toolResults
          }
        ]
      });

      // Record follow-up cost
      const followUpUsage = {
        inputTokens: followUpResponse.usage.input_tokens,
        outputTokens: followUpResponse.usage.output_tokens,
        totalTokens: followUpResponse.usage.input_tokens + followUpResponse.usage.output_tokens
      };
      this.costTracker.recordCall(this.config.model!, followUpUsage, 'Tool follow-up');

      const finalContent = followUpResponse.content[0];
      if (finalContent.type === 'text') {
        return {
          content: textContent + '\n\n' + finalContent.text,
          usage: {
            inputTokens: initialUsage.inputTokens + followUpUsage.inputTokens,
            outputTokens: initialUsage.outputTokens + followUpUsage.outputTokens
          }
        };
      }
    }

    return {
      content: textContent || 'Tool execution completed, but no text response was generated.',
      usage: {
        inputTokens: initialUsage.inputTokens,
        outputTokens: initialUsage.outputTokens
      }
    };
  }
}