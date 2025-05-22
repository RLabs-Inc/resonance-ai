/**
 * InteractiveChat - Real-time chat capability for ResonanceAI
 * 
 * Provides interactive communication while working on tasks
 */

import { createInterface } from 'readline';
import { colorize } from '../utils/colors.js';

export interface ChatMessage {
  readonly role: 'user' | 'assistant';
  readonly content: string;
  readonly timestamp: Date;
}

export interface ProgressUpdate {
  readonly action: string;
  readonly description: string;
  readonly status: 'started' | 'progress' | 'completed' | 'error';
  readonly details?: string;
}

export class InteractiveChat {
  private readline: any;
  private isActive: boolean = false;
  private chatHistory: ChatMessage[] = [];
  private progressCallback?: (update: ProgressUpdate) => void;

  constructor() {
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colorize.accent('💬 You: ')
    });
  }

  /**
   * Start interactive chat session
   */
  async startChatSession(onMessage?: (message: string) => Promise<string>): Promise<void> {
    this.isActive = true;
    
    console.log(colorize.success('\n🎯 Interactive chat started! Type "exit" to quit.\n'));
    
    this.readline.prompt();
    
    this.readline.on('line', async (input: string) => {
      const message = input.trim();
      
      if (message.toLowerCase() === 'exit') {
        this.endChatSession();
        return;
      }
      
      if (message.length === 0) {
        this.readline.prompt();
        return;
      }
      
      // Add user message to history
      this.addMessage('user', message);
      
      if (onMessage) {
        try {
          console.log(colorize.accent('🤖 Claude: '));
          const response = await onMessage(message);
          console.log(colorize.bright(response));
          this.addMessage('assistant', response);
        } catch (error) {
          console.log(colorize.error('❌ Error processing message:'));
          console.log(colorize.dim(error instanceof Error ? error.message : String(error)));
        }
      } else {
        console.log(colorize.warning('🤖 Claude: Chat handler not implemented yet'));
      }
      
      console.log(); // Add spacing
      this.readline.prompt();
    });
    
    this.readline.on('close', () => {
      this.endChatSession();
    });
  }

  /**
   * Send a progress update
   */
  sendProgressUpdate(update: ProgressUpdate): void {
    if (!this.isActive) return;
    
    const statusColor = this.getStatusColor(update.status);
    const statusIcon = this.getStatusIcon(update.status);
    
    console.log(statusColor(`${statusIcon} ${update.action}: ${update.description}`));
    
    if (update.details) {
      console.log(colorize.dim(`   ${update.details}`));
    }
    
    if (this.progressCallback) {
      this.progressCallback(update);
    }
  }

  /**
   * Set progress callback for external handling
   */
  onProgress(callback: (update: ProgressUpdate) => void): void {
    this.progressCallback = callback;
  }

  /**
   * Add message to chat history
   */
  private addMessage(role: 'user' | 'assistant', content: string): void {
    this.chatHistory.push({
      role,
      content,
      timestamp: new Date()
    });
  }

  /**
   * End chat session
   */
  private endChatSession(): void {
    if (!this.isActive) return;
    
    this.isActive = false;
    console.log(colorize.success('\n👋 Chat session ended. Thanks for using ResonanceAI!'));
    this.readline.close();
  }

  /**
   * Get color for status
   */
  private getStatusColor(status: string): (text: string) => string {
    switch (status) {
      case 'started': return colorize.accent;
      case 'progress': return colorize.warning;
      case 'completed': return colorize.success;
      case 'error': return colorize.error;
      default: return colorize.dim;
    }
  }

  /**
   * Get icon for status
   */
  private getStatusIcon(status: string): string {
    switch (status) {
      case 'started': return '🚀';
      case 'progress': return '⚡';
      case 'completed': return '✅';
      case 'error': return '❌';
      default: return '📋';
    }
  }

  /**
   * Get chat history
   */
  getChatHistory(): readonly ChatMessage[] {
    return this.chatHistory;
  }

  /**
   * Clear chat history
   */
  clearHistory(): void {
    this.chatHistory = [];
  }

  /**
   * Export chat history as string
   */
  exportHistory(): string {
    return this.chatHistory
      .map(msg => `[${msg.timestamp.toISOString()}] ${msg.role}: ${msg.content}`)
      .join('\n');
  }
}