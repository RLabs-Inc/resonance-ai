/**
 * FileOperations - Basic file manipulation tools for ResonanceAI
 * 
 * Provides read, write, edit capabilities for working on code
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { colorize } from '../utils/colors.js';

export interface FileEditResult {
  readonly success: boolean;
  readonly message: string;
  readonly originalContent?: string;
  readonly newContent?: string;
}

export interface FileInfo {
  readonly path: string;
  readonly exists: boolean;
  readonly size?: number;
  readonly content?: string;
}

export class FileOperations {
  /**
   * Read file content
   */
  static readFile(filePath: string): FileInfo {
    try {
      if (!existsSync(filePath)) {
        return {
          path: filePath,
          exists: false
        };
      }

      const content = readFileSync(filePath, 'utf-8');
      
      return {
        path: filePath,
        exists: true,
        size: content.length,
        content
      };
    } catch (error) {
      console.log(colorize.error(`❌ Failed to read ${filePath}`));
      console.log(colorize.dim(error instanceof Error ? error.message : String(error)));
      
      return {
        path: filePath,
        exists: false
      };
    }
  }

  /**
   * Write file content
   */
  static writeFile(filePath: string, content: string): FileEditResult {
    try {
      // Ensure directory exists
      const dirPath = dirname(filePath);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      // Read original content if file exists
      const originalContent = existsSync(filePath) 
        ? readFileSync(filePath, 'utf-8')
        : undefined;

      // Write new content
      writeFileSync(filePath, content, 'utf-8');
      
      console.log(colorize.success(`✅ Successfully wrote ${filePath}`));
      
      return {
        success: true,
        message: `File written successfully`,
        originalContent,
        newContent: content
      };
    } catch (error) {
      const message = `Failed to write ${filePath}`;
      console.log(colorize.error(`❌ ${message}`));
      console.log(colorize.dim(error instanceof Error ? error.message : String(error)));
      
      return {
        success: false,
        message,
      };
    }
  }

  /**
   * Edit file by replacing specific content
   */
  static editFile(
    filePath: string, 
    searchText: string, 
    replaceText: string
  ): FileEditResult {
    try {
      const fileInfo = this.readFile(filePath);
      
      if (!fileInfo.exists || !fileInfo.content) {
        return {
          success: false,
          message: `File ${filePath} does not exist or is empty`
        };
      }

      if (!fileInfo.content.includes(searchText)) {
        return {
          success: false,
          message: `Search text not found in ${filePath}`
        };
      }

      const newContent = fileInfo.content.replace(searchText, replaceText);
      return this.writeFile(filePath, newContent);
      
    } catch (error) {
      const message = `Failed to edit ${filePath}`;
      console.log(colorize.error(`❌ ${message}`));
      console.log(colorize.dim(error instanceof Error ? error.message : String(error)));
      
      return {
        success: false,
        message
      };
    }
  }

  /**
   * Create a new file from template
   */
  static createFile(filePath: string, template?: string): FileEditResult {
    const content = template || `// ${filePath}\n// Created by ResonanceAI\n\n`;
    return this.writeFile(filePath, content);
  }

  /**
   * List files in directory
   */
  static listFiles(dirPath: string): string[] {
    try {
      const { readdirSync, statSync } = require('fs');
      const entries = readdirSync(dirPath);
      
      return entries.filter((entry: string) => {
        const fullPath = join(dirPath, entry);
        try {
          return statSync(fullPath).isFile();
        } catch {
          return false;
        }
      });
    } catch (error) {
      console.log(colorize.error(`❌ Failed to list files in ${dirPath}`));
      return [];
    }
  }

  /**
   * Check if file exists
   */
  static fileExists(filePath: string): boolean {
    return existsSync(filePath);
  }

  /**
   * Get file extension
   */
  static getExtension(filePath: string): string {
    return filePath.split('.').pop() || '';
  }

  /**
   * Get relative path from project root
   */
  static getRelativePath(filePath: string, projectRoot: string = process.cwd()): string {
    return filePath.startsWith(projectRoot) 
      ? filePath.substring(projectRoot.length + 1)
      : filePath;
  }

  /**
   * Display file content with syntax highlighting (simple)
   */
  static displayFile(filePath: string, maxLines: number = 50): void {
    const fileInfo = this.readFile(filePath);
    
    if (!fileInfo.exists || !fileInfo.content) {
      console.log(colorize.error(`❌ Cannot display ${filePath} - file not found`));
      return;
    }

    console.log(colorize.bright(`📄 ${filePath}`));
    console.log(colorize.dim(`Size: ${fileInfo.size} bytes\n`));

    const lines = fileInfo.content.split('\n');
    const displayLines = lines.slice(0, maxLines);
    
    displayLines.forEach((line, index) => {
      const lineNum = (index + 1).toString().padStart(3, ' ');
      console.log(`${colorize.dim(lineNum)}│ ${line}`);
    });

    if (lines.length > maxLines) {
      console.log(colorize.dim(`\n... ${lines.length - maxLines} more lines`));
    }
  }
}