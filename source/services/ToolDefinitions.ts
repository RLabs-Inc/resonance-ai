/**
 * ToolDefinitions - Define tools available to Claude
 * 
 * Provides tool definitions for Claude to use within ResonanceAI
 */

export const TOOL_DEFINITIONS = [
  {
    name: 'read_file',
    description: 'Read and analyze a file from the project',
    input_schema: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path to the file to read (relative to project root)'
        }
      },
      required: ['file_path']
    }
  },
  {
    name: 'write_file',
    description: 'Create or update a file with new content',
    input_schema: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path where to write the file'
        },
        content: {
          type: 'string',
          description: 'Content to write to the file'
        }
      },
      required: ['file_path', 'content']
    }
  },
  {
    name: 'edit_file',
    description: 'Edit an existing file by replacing specific content',
    input_schema: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path to the file to edit'
        },
        search_text: {
          type: 'string',
          description: 'Text to search for and replace'
        },
        replace_text: {
          type: 'string',
          description: 'Text to replace the search text with'
        }
      },
      required: ['file_path', 'search_text', 'replace_text']
    }
  },
  {
    name: 'analyze_project',
    description: 'Analyze the project structure and patterns',
    input_schema: {
      type: 'object',
      properties: {
        focus_area: {
          type: 'string',
          description: 'Optional focus area for analysis (e.g., "services", "types", "patterns")'
        }
      }
    }
  },
  {
    name: 'find_relevant_files',
    description: 'Find files relevant to a specific task or query',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Task or query to find relevant files for'
        },
        max_files: {
          type: 'number',
          description: 'Maximum number of files to return (default: 5)'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'generate_implementation_guide',
    description: 'Generate step-by-step implementation guidance for a task',
    input_schema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Task to generate implementation guidance for'
        }
      },
      required: ['task']
    }
  },
  {
    name: 'run_workaround_detector',
    description: 'Run the workaround detector to check code quality',
    input_schema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: 'Directory to scan (default: current directory)'
        }
      }
    }
  }
] as const;