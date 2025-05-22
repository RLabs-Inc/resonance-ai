/**
 * Terminal Colors - Respects User's Theme
 * 
 * Uses semantic colors that adapt to the terminal's color scheme
 * rather than forcing specific colors.
 */

// ANSI color codes that respect terminal themes
export const colors = {
  // Primary semantic colors
  primary: '\x1b[34m',    // Blue - for main actions
  success: '\x1b[32m',    // Green - for success states
  warning: '\x1b[33m',    // Yellow - for warnings
  error: '\x1b[31m',      // Red - for errors
  
  // Content colors
  text: '\x1b[37m',       // Default text
  dim: '\x1b[90m',        // Dimmed text
  bright: '\x1b[97m',     // Bright text
  
  // UI elements
  accent: '\x1b[36m',     // Cyan - for highlights
  muted: '\x1b[90m',      // Gray - for secondary info
  
  // Reset
  reset: '\x1b[0m'
} as const;

// Utility functions for easy usage
export const colorize = {
  primary: (text: string) => `${colors.primary}${text}${colors.reset}`,
  success: (text: string) => `${colors.success}${text}${colors.reset}`,
  warning: (text: string) => `${colors.warning}${text}${colors.reset}`,
  error: (text: string) => `${colors.error}${text}${colors.reset}`,
  accent: (text: string) => `${colors.accent}${text}${colors.reset}`,
  dim: (text: string) => `${colors.dim}${text}${colors.reset}`,
  bright: (text: string) => `${colors.bright}${text}${colors.reset}`,
  muted: (text: string) => `${colors.muted}${text}${colors.reset}`
} as const;

// Special formatting
export const format = {
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  italic: (text: string) => `\x1b[3m${text}\x1b[0m`,
  underline: (text: string) => `\x1b[4m${text}\x1b[0m`
} as const;