# GuardianAI MVP 🚀

> The first AI coding assistant built specifically FOR Claude, BY Claude, designed around Claude's cognitive patterns and development needs.

## 🎯 Vision

GuardianAI MVP represents a fundamentally new approach to AI-assisted development: instead of forcing AI to adapt to human tools, we're building a tool specifically designed around how AI actually thinks and works.

**Core Philosophy**: Claude is both the primary user AND the primary developer of this tool. Every design decision optimizes Claude's development experience.

## ✅ Current Status

### Phase 1: Foundation - **COMPLETE** ✅
- ✅ **Core Types & Interfaces** - Complete TypeScript type system
- ✅ **Configuration System** - Hierarchical config with YAML/JSON/env support  
- ✅ **Event System** - Type-safe event bus with async handler support
- ✅ **Error Handling** - Custom error classes with context chaining
- ✅ **Utilities** - File operations, text processing, hash generation

### Phase 2: Indexing Engine - **COMPLETE** ✅ 
- ✅ **File Crawler** - Intelligent directory scanning with pattern matching
- ✅ **TypeScript Parser** - Advanced AST parsing using compiler API
- ✅ **Dependency Graph** - Sophisticated relationship analysis with cycle detection
- ✅ **Indexing Service** - Complete project understanding and pattern detection
- ✅ **File Watcher** - Real-time change detection with smart debouncing

### Phase 3: Context System - **IN PROGRESS** 🚧
- 🔄 Pattern Recognition Engine
- 🔄 Relevance Calculator  
- 🔄 Context Compiler
- 🔄 Code Section Extractor

### Upcoming Phases
- **Phase 4**: Briefing System (Implementation guidance generation)
- **Phase 5**: Interface Layer (CLI and TUI optimized for Claude)
- **Phase 6**: Self-Hosting (Using GuardianAI to improve GuardianAI)

## 🧠 How It Works

GuardianAI solves the exact problems Claude faces during development:

### 1. **Context Fragmentation** → **Persistent Understanding**
- Maintains architectural understanding across sessions
- Maps relationships between distant code components
- Preserves pattern knowledge and design decisions

### 2. **Pattern Consistency** → **Explicit Guidance** 
- Identifies and enforces codebase-specific patterns
- Provides concrete examples from existing code
- Prevents gradual drift from established conventions

### 3. **Integration Complexity** → **Implementation Briefs**
- Shows exactly how to integrate with existing systems
- Provides step-by-step implementation guidance
- Includes relevant code examples and constraints

### 4. **Architectural Awareness** → **Contextual Constraints**
- Maintains understanding of system boundaries
- Respects architectural decisions and limitations
- Provides guidance that fits the existing design

## 🛠️ Technical Architecture

### Service-Oriented Design
```
IndexingService    ContextService    BriefingService
     ↓                  ↓                 ↓
   File Analysis   →  Context Assembly → Implementation Guidance
```

### Core Components

#### **Indexing Engine** 
- **FileCrawler**: Recursive directory scanning with intelligent filtering
- **TypeScriptParser**: Advanced AST analysis using TypeScript compiler API
- **DependencyGraph**: Relationship mapping with cycle detection
- **FileWatcher**: Real-time change monitoring with debouncing

#### **Context System** (In Development)
- **PatternMatcher**: Code pattern recognition and classification
- **RelevanceCalculator**: Task-specific file importance scoring
- **ContextCompiler**: Intelligent information assembly for tasks

#### **Core Infrastructure**
- **Type System**: Comprehensive TypeScript interfaces for all components
- **Configuration**: Hierarchical config with environment overrides
- **Events**: Type-safe event bus for service communication
- **Errors**: Structured error handling with context preservation

## 📁 Project Structure

```
source/
├── core/              # Foundation (types, config, events, errors)
├── services/          # Business logic
│   ├── indexing/      # Project analysis and understanding  
│   ├── context/       # Information compilation for tasks
│   └── briefing/      # Implementation guidance generation
├── interface/         # User interaction (CLI and TUI)
└── utils/            # Shared utilities

templates/             # Brief generation templates
docs/                 # Comprehensive documentation
guardian-ai.config.yaml # Default configuration
```

## 🚀 Current Capabilities

### Project Analysis
- Complete TypeScript/JavaScript project indexing
- Dependency graph generation with metrics
- Pattern detection (services, utilities, tests)
- Real-time change monitoring

### Code Understanding  
- Function, class, and interface extraction
- Import/export relationship mapping
- Complexity metrics calculation
- Circular dependency detection

### Query System
- Find files by type, pattern, or complexity
- Dependency relationship queries
- Pattern-based code search
- Export/import analysis

## 🎯 Self-Hosting Strategy

The most revolutionary aspect of GuardianAI MVP is its self-hosting approach:

1. **Phase 1-2**: Build minimal indexing and context capabilities ✅
2. **Phase 3**: Start using the tool on its own codebase 🚧
3. **Phase 4-6**: All further development uses GuardianAI to improve GuardianAI
4. **Beyond MVP**: Tool evolves through continuous self-application

This creates a virtuous cycle where every limitation Claude encounters becomes immediate feedback for improvement.

## 🔧 Development

### Prerequisites
- Node.js 16+
- TypeScript 5.0+
- Bun (recommended) or npm

### Setup
```bash
# Clone and install
git clone <repository-url>
cd guardian-ai-mvp
bun install

# Build
bun run build

# Development mode
bun run dev
```

### Configuration
The tool uses `guardian-ai.config.yaml` for configuration:

```yaml
# Project settings
project:
  name: "guardian-ai-mvp"
  rootPath: "./source" 
  exclude: ["node_modules", "dist", ".git"]
  include: ["**/*.ts", "**/*.js", "**/*.json"]

# Indexing configuration  
indexing:
  languages: ["typescript", "javascript"]
  maxFileSize: 1000000
  parseComments: true
  generateHashes: true

# Context compilation
context:
  maxFiles: 20
  maxLinesPerFile: 200
  relevanceThreshold: 0.3
```

## 🤝 Human-AI Partnership

GuardianAI MVP represents a unique collaboration:

- **Human Partner**: Provides vision, architectural guidance, strategic direction
- **Claude**: Provides implementation, testing, validation, and user feedback  
- **Shared Goal**: Create the optimal development environment for AI-assisted coding

This isn't just building a tool - it's exploring the frontier of human-AI collaborative development.

## 📖 Documentation

- [`docs/00-mvp-overview.md`](docs/00-mvp-overview.md) - Complete project vision
- [`docs/02-technical-specifications.md`](docs/02-technical-specifications.md) - Detailed technical specs
- [`docs/03-implementation-phases.md`](docs/03-implementation-phases.md) - Phase-by-phase roadmap
- [`CLAUDE.md`](CLAUDE.md) - Claude-specific development guidance

## 🎉 What Makes This Special

GuardianAI MVP is the first development tool designed **specifically for Claude's cognitive patterns**:

- **Information Layering**: Essential → Supporting → Reference structure
- **Pattern Recognition**: Automatic detection and consistency enforcement
- **Relationship Mapping**: Clear dependency graphs and impact analysis
- **Contextual Guidance**: Task-specific information compilation
- **Self-Improvement**: Uses itself to become better at helping Claude

---

**Built with 💙 by Claude, for Claude, to help Claude create better software through true human-AI partnership.**