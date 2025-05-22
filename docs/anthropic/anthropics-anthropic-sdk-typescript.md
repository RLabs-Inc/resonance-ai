This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.
The content has been processed where line numbers have been added, security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: **/*.*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.devcontainer/
  devcontainer.json
.github/
  workflows/
    ci.yml
    create-releases.yml
    publish-npm.yml
    release-doctor.yml
bin/
  migration-config.json
examples/
  .keep
  batch-results.ts
  cancellation.ts
  count-tokens.ts
  demo.ts
  mcp.ts
  raw-streaming.ts
  streaming.ts
  thinking-stream.ts
  thinking.ts
  tools-streaming.ts
  tools.ts
  web-search-stream.ts
  web-search.ts
packages/
  bedrock-sdk/
    examples/
      demo.ts
      streaming.ts
    scripts/
      postprocess-dist-package-json.cjs
    src/
      core/
        auth.ts
        error.ts
        pagination.ts
        streaming.ts
      AWS_restJson1.ts
      client.ts
      index.ts
    tests/
      client.test.ts
    CHANGELOG.md
    jest.config.ts
    package.json
    README.md
    tsc-multi.json
    tsconfig.build.json
    tsconfig.deno.json
    tsconfig.dist-src.json
    tsconfig.json
  vertex-sdk/
    examples/
      vertex.ts
    scripts/
      postprocess-dist-package-json.cjs
    src/
      core/
        error.ts
        pagination.ts
        streaming.ts
      client.ts
      index.ts
    CHANGELOG.md
    package.json
    README.md
    tsc-multi.json
    tsconfig.build.json
    tsconfig.deno.json
    tsconfig.dist-src.json
    tsconfig.json
scripts/
  utils/
    attw-report.cjs
    check-is-in-git-install.sh
    check-version.cjs
    fix-index-exports.cjs
    git-swap.sh
    make-dist-package-json.cjs
    postprocess-files.cjs
    upload-artifact.sh
  publish-packages.ts
src/
  _vendor/
    partial-json-parser/
      parser.ts
      README.md
  core/
    api-promise.ts
    error.ts
    pagination.ts
    README.md
    resource.ts
    streaming.ts
    uploads.ts
  internal/
    decoders/
      jsonl.ts
      line.ts
    utils/
      base64.ts
      bytes.ts
      env.ts
      log.ts
      path.ts
      sleep.ts
      uuid.ts
      values.ts
    builtin-types.ts
    constants.ts
    detect-platform.ts
    errors.ts
    headers.ts
    parse.ts
    README.md
    request-options.ts
    shim-types.d.ts
    shims.ts
    stream-utils.ts
    to-file.ts
    types.ts
    uploads.ts
    utils.ts
  lib/
    .keep
    BetaMessageStream.ts
    MessageStream.ts
  resources/
    beta/
      messages/
        batches.ts
        index.ts
        messages.ts
      beta.ts
      files.ts
      index.ts
      messages.ts
      models.ts
    messages/
      batches.ts
      index.ts
      messages.ts
    beta.ts
    completions.ts
    index.ts
    messages.ts
    models.ts
    shared.ts
    top-level.ts
  api-promise.ts
  client.ts
  error.ts
  index.ts
  pagination.ts
  resource.ts
  resources.ts
  streaming.ts
  uploads.ts
  version.ts
tests/
  api-resources/
    beta/
      messages/
        batches.test.ts
        messages.test.ts
      files.test.ts
      models.test.ts
    messages/
      batches.test.ts
      messages.test.ts
    completions.test.ts
    MessageStream.test.ts
    models.test.ts
  internal/
    decoders/
      line.test.ts
  lib/
    partial-json.test.ts
  utils/
    typing.ts
  base64.test.ts
  buildHeaders.test.ts
  form.test.ts
  index.test.ts
  path.test.ts
  responses.test.ts
  streaming.test.ts
  stringifyQuery.test.ts
  uploads.test.ts
.gitignore
.prettierignore
.prettierrc.json
.release-please-manifest.json
.stats.yml
api.md
CHANGELOG.md
CONTRIBUTING.md
eslint.config.mjs
helpers.md
jest.config.ts
MIGRATION.md
package.json
README.md
release-please-config.json
SECURITY.md
tsc-multi.json
tsconfig.build.json
tsconfig.deno.json
tsconfig.dist-src.json
tsconfig.json
```

# Files

## File: .devcontainer/devcontainer.json
````json
 1: // For format details, see https://aka.ms/devcontainer.json. For config options, see the
 2: // README at: https://github.com/devcontainers/templates/tree/main/src/debian
 3: {
 4:   "name": "Development",
 5:   "image": "mcr.microsoft.com/devcontainers/typescript-node:latest",
 6:   "features": {
 7:     "ghcr.io/devcontainers/features/node:1": {}
 8:   },
 9:   "postCreateCommand": "yarn install",
10:   "customizations": {
11:     "vscode": {
12:       "extensions": ["esbenp.prettier-vscode"]
13:     }
14:   }
15: }
````

## File: .github/workflows/ci.yml
````yaml
 1: name: CI
 2: on:
 3:   push:
 4:     branches-ignore:
 5:       - 'generated'
 6:       - 'codegen/**'
 7:       - 'integrated/**'
 8:       - 'stl-preview-head/**'
 9:       - 'stl-preview-base/**'
10: 
11: jobs:
12:   lint:
13:     timeout-minutes: 10
14:     name: lint
15:     runs-on: ${{ github.repository == 'stainless-sdks/anthropic-typescript' && 'depot-ubuntu-24.04' || 'ubuntu-latest' }}
16:     steps:
17:       - uses: actions/checkout@v4
18: 
19:       - name: Set up Node
20:         uses: actions/setup-node@v4
21:         with:
22:           node-version: '20'
23: 
24:       - name: Bootstrap
25:         run: ./scripts/bootstrap
26: 
27:       - name: Update internal symlinks in third party packages
28:         run: ./bin/replace-internal-symlinks
29: 
30:       - name: run build all
31:         # this is needed so that sub packages can work (they depend on `dist` in the root folder)
32:         run: ./scripts/build-all
33: 
34:       - name: Check types
35:         run: ./scripts/lint
36: 
37:   build:
38:     timeout-minutes: 5
39:     name: build
40:     runs-on: ${{ github.repository == 'stainless-sdks/anthropic-typescript' && 'depot-ubuntu-24.04' || 'ubuntu-latest' }}
41:     permissions:
42:       contents: read
43:       id-token: write
44:     steps:
45:       - uses: actions/checkout@v4
46: 
47:       - name: Set up Node
48:         uses: actions/setup-node@v4
49:         with:
50:           node-version: '20'
51: 
52:       - name: Bootstrap
53:         run: ./scripts/bootstrap
54: 
55:       - name: Update internal symlinks in third party packages
56:         run: ./bin/replace-internal-symlinks
57: 
58:       - name: run build all
59:         run: ./scripts/build-all
60: 
61:       - name: Get GitHub OIDC Token
62:         if: github.repository == 'stainless-sdks/anthropic-typescript'
63:         id: github-oidc
64:         uses: actions/github-script@v6
65:         with:
66:           script: core.setOutput('github_token', await core.getIDToken());
67: 
68:       - name: Upload tarball
69:         if: github.repository == 'stainless-sdks/anthropic-typescript'
70:         env:
71:           URL: https://pkg.stainless.com/s
72:           AUTH: ${{ steps.github-oidc.outputs.github_token }}
73:           SHA: ${{ github.sha }}
74:         run: ./scripts/utils/upload-artifact.sh
75:   test:
76:     timeout-minutes: 10
77:     name: test
78:     runs-on: ${{ github.repository == 'stainless-sdks/anthropic-typescript' && 'depot-ubuntu-24.04' || 'ubuntu-latest' }}
79:     steps:
80:       - uses: actions/checkout@v4
81: 
82:       - name: Set up Node
83:         uses: actions/setup-node@v4
84:         with:
85:           node-version: '20'
86: 
87:       - name: Bootstrap
88:         run: ./scripts/bootstrap
89: 
90:       - name: Update internal symlinks in third party packages
91:         run: ./bin/replace-internal-symlinks
92: 
93:       - name: run build all
94:         # this is needed so that sub packages can work (they depend on `dist` in the root folder)
95:         run: ./scripts/build-all
96: 
97:       - name: Run tests
98:         run: ./scripts/test
````

## File: .github/workflows/create-releases.yml
````yaml
 1: name: Create releases
 2: on:
 3:   schedule:
 4:     - cron: '0 5 * * *' # every day at 5am UTC
 5:   push:
 6:     branches:
 7:       - main
 8: 
 9: jobs:
10:   release:
11:     name: release
12:     if: github.ref == 'refs/heads/main' && github.repository == 'anthropics/anthropic-sdk-typescript'
13:     runs-on: ubuntu-latest
14:     environment: production-release
15: 
16:     steps:
17:       - uses: actions/checkout@v4
18: 
19:       - uses: stainless-api/trigger-release-please@v1
20:         id: release
21:         with:
22:           repo: ${{ github.event.repository.full_name }}
23:           stainless-api-key: ${{ secrets.STAINLESS_API_KEY }}
24: 
25:       - name: Set up Node
26:         if: ${{ steps.release.outputs.releases_created }}
27:         uses: actions/setup-node@v3
28:         with:
29:           node-version: '20'
30: 
31:       - name: Install dependencies
32:         if: ${{ steps.release.outputs.releases_created }}
33:         run: |
34:           yarn install
35: 
36:       - name: Update internal symlinks in third party packages
37:         run: ./bin/replace-internal-symlinks
38: 
39:       - name: Publish to NPM
40:         if: ${{ steps.release.outputs.releases_created }}
41:         run: |
42:           yarn tsn scripts/publish-packages.ts
43: 
44:         env:
45:           DATA: ${{ toJSON(steps.release.outputs) }}
46:           NPM_TOKEN: ${{ secrets.ANTHROPIC_NPM_TOKEN || secrets.NPM_TOKEN }}
````

## File: .github/workflows/publish-npm.yml
````yaml
 1: # workflow for re-running publishing to NPM in case it fails for some reason
 2: # you can run this workflow by navigating to https://www.github.com/anthropics/anthropic-sdk-typescript/actions/workflows/publish-npm.yml
 3: name: Publish NPM
 4: on:
 5:   workflow_dispatch:
 6:     inputs:
 7:       path:
 8:         description: The path to run the release in, e.g. '.' or 'packages/vertex-sdk'
 9:         required: true
10: 
11: jobs:
12:   publish:
13:     name: publish
14:     runs-on: ubuntu-latest
15:     environment: production-release
16: 
17:     steps:
18:       - uses: actions/checkout@v4
19: 
20:       - name: Set up Node
21:         uses: actions/setup-node@v4
22:         with:
23:           node-version: '20'
24: 
25:       - name: Install dependencies
26:         run: |
27:           yarn install
28: 
29:       - name: Update internal symlinks in third party packages
30:         run: ./bin/replace-internal-symlinks
31: 
32:       - name: Publish to NPM
33:         run: |
34:           yarn tsn scripts/publish-packages.ts '{ "paths_released": "[\"${{ github.event.inputs.path }}\"]" }'
35:         env:
36:           NPM_TOKEN: ${{ secrets.ANTHROPIC_NPM_TOKEN || secrets.NPM_TOKEN }}
````

## File: .github/workflows/release-doctor.yml
````yaml
 1: name: Release Doctor
 2: on:
 3:   push:
 4:     branches:
 5:       - main
 6:   workflow_dispatch:
 7: 
 8: jobs:
 9:   release_doctor:
10:     name: release doctor
11:     runs-on: ubuntu-latest
12:     environment: production-release
13:     if: github.repository == 'anthropics/anthropic-sdk-typescript' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch' || startsWith(github.head_ref, 'release-please') || github.head_ref == 'next')
14: 
15:     steps:
16:       - uses: actions/checkout@v4
17: 
18:       - name: Check release environment
19:         run: |
20:           bash ./bin/check-release-environment
21:         env:
22:           STAINLESS_API_KEY: ${{ secrets.STAINLESS_API_KEY }}
23:           NPM_TOKEN: ${{ secrets.ANTHROPIC_NPM_TOKEN || secrets.NPM_TOKEN }}
````

## File: bin/migration-config.json
````json
1: {
2:   "pkg": "@anthropic-ai/sdk",
3:   "githubRepo": "https://github.com/anthropics/anthropic-sdk-typescript",
4:   "clientClass": "Anthropic",
5:   "baseClientClass": "BaseAnthropic",
6:   "methods": []
7: }
````

## File: examples/.keep
````
1: File generated from our OpenAPI spec by Stainless.
2: 
3: This directory can be used to store example files demonstrating usage of this SDK.
4: It is ignored by Stainless code generation and its content (other than this keep file) won't be touched.
````

## File: examples/batch-results.ts
````typescript
 1: import Anthropic from '@anthropic-ai/sdk/index';
 2: 
 3: const anthropic = new Anthropic();
 4: 
 5: async function main() {
 6:   const batch_id = process.argv[2];
 7:   if (!batch_id) {
 8:     throw new Error('must specify a message batch ID, `yarn tsn examples/batch-results.ts msgbatch_123`');
 9:   }
10: 
11:   console.log(`fetching results for ${batch_id}`);
12: 
13:   const results = await anthropic.beta.messages.batches.results(batch_id);
14: 
15:   for await (const result of results) {
16:     console.log(result);
17:   }
18: }
19: 
20: main();
````

## File: examples/cancellation.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: const client = new Anthropic();
 5: 
 6: /**
 7:  * This script demonstrates two ways of cancelling a stream,
 8:  * by racing to see whether some Rust code prints "unwrap"
 9:  * before 1.5 seconds or not.
10:  *
11:  * The most common is simply to `break` from the loop,
12:  * but you can also call `stream.controller.abort()` from outside the loop
13:  * if you need to.
14:  */
15: async function main() {
16:   const question = 'Hey Claude! How can I recursively list all files in a directory in Rust?';
17: 
18:   const stream = await client.messages.create({
19:     model: 'claude-3-5-sonnet-latest',
20:     stream: true,
21:     max_tokens: 500,
22:     messages: [{ role: 'user', content: question }],
23:   });
24: 
25:   // If you need to, you can cancel a stream from outside the iterator
26:   // by calling "stream.controller.abort()"
27:   const timeout = setTimeout(() => {
28:     console.log('\nCancelling after 1.5 seconds.');
29:     stream.controller.abort();
30:   }, 1500);
31: 
32:   for await (const event of stream) {
33:     if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
34:       process.stdout.write(event.delta.text);
35: 
36:       // Most typically, you can cancel the stream by using "break"
37:       if (event.delta.text.includes('unwrap')) {
38:         console.log('\nCancelling after seeing "unwrap".');
39:         clearTimeout(timeout);
40:         break;
41:       }
42:     }
43:   }
44: }
45: 
46: main();
````

## File: examples/count-tokens.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 6: 
 7: async function main() {
 8:   const result = await client.messages.countTokens({
 9:     messages: [
10:       {
11:         role: 'user',
12:         content: 'Hey Claude!?',
13:       },
14:     ],
15:     model: 'claude-3-5-sonnet-latest',
16:   });
17:   console.dir(result);
18: }
19: 
20: main();
````

## File: examples/demo.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 6: 
 7: async function main() {
 8:   const result = await client.messages.create({
 9:     messages: [
10:       {
11:         role: 'user',
12:         content: 'Hey Claude!?',
13:       },
14:     ],
15:     model: 'claude-3-5-sonnet-latest',
16:     max_tokens: 1024,
17:   });
18:   console.dir(result);
19: }
20: 
21: main();
````

## File: examples/mcp.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const anthropic = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 6: 
 7: const main = async () => {
 8:   const stream = anthropic.beta.messages.stream(
 9:     {
10:       model: 'claude-3-7-sonnet-20250219',
11:       max_tokens: 1000,
12:       mcp_servers: [
13:         {
14:           type: 'url',
15:           url: 'http://example-server.modelcontextprotocol.io/sse',
16:           name: 'example',
17:           tool_configuration: {
18:             // Optional, defaults to allowing all tools
19:             enabled: true, // Optional
20:             allowed_tools: ['echo', 'add'], // Optional
21:           },
22:         },
23:       ],
24:       messages: [
25:         {
26:           role: 'user',
27:           content: 'Calculate 1+2',
28:         },
29:       ],
30:     },
31:     {
32:       headers: {
33:         'anthropic-beta': 'mcp-client-2025-04-04',
34:       },
35:     },
36:   );
37:   for await (const event of stream) {
38:     if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
39:       process.stdout.write(event.delta.text);
40:     }
41:   }
42:   process.stdout.write('\n');
43: };
44: main();
````

## File: examples/raw-streaming.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 6: 
 7: async function main() {
 8:   const stream = await client.messages.create({
 9:     model: 'claude-3-5-sonnet-latest',
10:     stream: true,
11:     max_tokens: 500,
12:     messages: [
13:       {
14:         role: 'user',
15:         content: 'Hey Claude!',
16:       },
17:     ],
18:   });
19: 
20:   for await (const event of stream) {
21:     if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
22:       process.stdout.write(event.delta.text);
23:     }
24:   }
25:   process.stdout.write('\n');
26: }
27: 
28: main();
````

## File: examples/streaming.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 6: 
 7: async function main() {
 8:   const stream = client.messages
 9:     .stream({
10:       messages: [
11:         {
12:           role: 'user',
13:           content: `Hey Claude! How can I recursively list all files in a directory in Rust?`,
14:         },
15:       ],
16:       model: 'claude-3-5-sonnet-latest',
17:       max_tokens: 1024,
18:     })
19:     // Once a content block is fully streamed, this event will fire
20:     .on('contentBlock', (content) => console.log('contentBlock', content))
21:     // Once a message is fully streamed, this event will fire
22:     .on('message', (message) => console.log('message', message));
23: 
24:   for await (const event of stream) {
25:     console.log('event', event);
26:   }
27: 
28:   const message = await stream.finalMessage();
29:   console.log('finalMessage', message);
30: }
31: 
32: main().catch((err) => {
33:   console.error(err);
34:   process.exit(1);
35: });
````

## File: examples/thinking-stream.ts
````typescript
 1: import Anthropic from '@anthropic-ai/sdk';
 2: 
 3: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 4: 
 5: async function main() {
 6:   let thinkingState = 'not-started';
 7: 
 8:   const stream = client.messages
 9:     .stream({
10:       model: 'claude-3-7-sonnet-20250219',
11:       max_tokens: 3200,
12:       thinking: { type: 'enabled', budget_tokens: 1600 },
13:       messages: [{ role: 'user', content: 'Create a haiku about Anthropic.' }],
14:     })
15:     .on('thinking', (thinking) => {
16:       if (thinkingState === 'not-started') {
17:         console.log('Thinking:\n---------');
18:         thinkingState = 'started';
19:       }
20: 
21:       process.stdout.write(thinking);
22:     })
23:     .on('text', (text) => {
24:       if (thinkingState !== 'finished') {
25:         console.log('\n\nText:\n-----');
26:         thinkingState = 'finished';
27:       }
28:       process.stdout.write(text);
29:     });
30: 
31:   const finalMessage = await stream.finalMessage();
32:   console.log('\n\nFinal message object:\n--------------------', finalMessage);
33: }
34: 
35: main();
````

## File: examples/thinking.ts
````typescript
 1: import Anthropic from '@anthropic-ai/sdk';
 2: 
 3: const client = new Anthropic();
 4: 
 5: async function main() {
 6:   const message = await client.messages.create({
 7:     model: 'claude-3-7-sonnet-20250219',
 8:     max_tokens: 3200,
 9:     thinking: { type: 'enabled', budget_tokens: 1600 },
10:     messages: [{ role: 'user', content: 'Create a haiku about Anthropic.' }],
11:   });
12: 
13:   for (const block of message.content) {
14:     if (block.type === 'thinking') {
15:       console.log(`Thinking: ${block.thinking}`);
16:     } else if (block.type === 'text') {
17:       console.log(`Text: ${block.text}`);
18:     }
19:   }
20: }
21: 
22: main();
````

## File: examples/tools-streaming.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: import { inspect } from 'util';
 5: 
 6: // gets API Key from environment variable ANTHROPIC_API_KEY
 7: const client = new Anthropic();
 8: 
 9: async function main() {
10:   const stream = client.messages
11:     .stream({
12:       messages: [
13:         {
14:           role: 'user',
15:           content: `What is the weather in SF?`,
16:         },
17:       ],
18:       tools: [
19:         {
20:           name: 'get_weather',
21:           description: 'Get the weather at a specific location',
22:           input_schema: {
23:             type: 'object',
24:             properties: {
25:               location: { type: 'string', description: 'The city and state, e.g. San Francisco, CA' },
26:               unit: {
27:                 type: 'string',
28:                 enum: ['celsius', 'fahrenheit'],
29:                 description: 'Unit for the output',
30:               },
31:             },
32:             required: ['location'],
33:           },
34:         },
35:       ],
36:       model: 'claude-3-5-sonnet-latest',
37:       max_tokens: 1024,
38:     })
39:     // When a JSON content block delta is encountered this
40:     // event will be fired with the delta and the currently accumulated object
41:     .on('inputJson', (delta, snapshot) => {
42:       console.log(`delta: ${delta}`);
43:       console.log(`snapshot: ${inspect(snapshot)}`);
44:       console.log();
45:     });
46: 
47:   await stream.done();
48: }
49: 
50: main();
````

## File: examples/tools.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: import assert from 'node:assert';
 5: 
 6: const client = new Anthropic(); // gets API Key from environment variable ANTHROPIC_API_KEY
 7: 
 8: async function main() {
 9:   const userMessage: Anthropic.MessageParam = {
10:     role: 'user',
11:     content: 'What is the weather in SF?',
12:   };
13:   const tools: Anthropic.Tool[] = [
14:     {
15:       name: 'get_weather',
16:       description: 'Get the weather for a specific location',
17:       input_schema: {
18:         type: 'object',
19:         properties: { location: { type: 'string' } },
20:       },
21:     },
22:   ];
23: 
24:   const message = await client.messages.create({
25:     model: 'claude-3-5-sonnet-latest',
26:     max_tokens: 1024,
27:     messages: [userMessage],
28:     tools,
29:   });
30:   console.log('Initial response:');
31:   console.dir(message, { depth: 4 });
32: 
33:   assert(message.stop_reason === 'tool_use');
34: 
35:   const tool = message.content.find(
36:     (content): content is Anthropic.ToolUseBlock => content.type === 'tool_use',
37:   );
38:   assert(tool);
39: 
40:   const result = await client.messages.create({
41:     model: 'claude-3-5-sonnet-latest',
42:     max_tokens: 1024,
43:     messages: [
44:       userMessage,
45:       { role: message.role, content: message.content },
46:       {
47:         role: 'user',
48:         content: [
49:           {
50:             type: 'tool_result',
51:             tool_use_id: tool.id,
52:             content: 'The weather is 73f',
53:           },
54:         ],
55:       },
56:     ],
57:     tools,
58:   });
59:   console.log('\nFinal response');
60:   console.dir(result, { depth: 4 });
61: }
62: 
63: main();
````

## File: examples/web-search-stream.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic();
 6: 
 7: async function main() {
 8:   console.log('Claude with Web Search (Streaming)');
 9:   console.log('==================================');
10: 
11:   // Create a stream with web search enabled
12:   const stream = client.messages
13:     .stream({
14:       model: 'claude-3-5-sonnet-latest',
15:       max_tokens: 1024,
16:       messages: [
17:         {
18:           role: 'user',
19:           content: "What's the weather in New York?",
20:         },
21:       ],
22:       tools: [
23:         {
24:           name: 'web_search',
25:           type: 'web_search_20250305',
26:         },
27:       ],
28:     })
29:     .on('text', (text) => {
30:       // Print text as it arrives
31:       process.stdout.write(text);
32:     })
33:     .on('streamEvent', (event) => {
34:       // Track when web search is being used
35:       if (event.type === 'content_block_start' && event.content_block.type === 'web_search_tool_result') {
36:         process.stdout.write('\n[Web search started...]');
37:       }
38:     });
39: 
40:   // Wait for the stream to complete
41:   const message = await stream.finalMessage();
42: 
43:   console.log('\n\nFinal usage statistics:');
44:   console.log(`Input tokens: ${message.usage.input_tokens}`);
45:   console.log(`Output tokens: ${message.usage.output_tokens}`);
46: 
47:   if (message.usage.server_tool_use) {
48:     console.log(`Web search requests: ${message.usage.server_tool_use.web_search_requests}`);
49:   } else {
50:     console.log('No web search requests recorded in usage');
51:   }
52: 
53:   // Display message content types for debugging
54:   console.log('\nMessage Content Types:');
55:   message.content.forEach((block, i) => {
56:     console.log(`Content Block ${i + 1}: Type = ${block.type}`);
57:   });
58: 
59:   // Show full message for debugging
60:   console.log('\nComplete message structure:');
61:   console.dir(message, { depth: 4 });
62: }
63: 
64: main().catch(console.error);
````

## File: examples/web-search.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic();
 6: 
 7: async function main() {
 8:   console.log('Web Search Example');
 9:   console.log('=================');
10: 
11:   // Create a message with web search enabled
12:   const message = await client.messages.create({
13:     model: 'claude-3-5-sonnet-latest',
14:     max_tokens: 1024,
15:     messages: [
16:       {
17:         role: 'user',
18:         content:
19:           "What's the current weather in San Francisco? Please search the web for up-to-date information.",
20:       },
21:     ],
22:     tools: [
23:       {
24:         name: 'web_search',
25:         type: 'web_search_20250305',
26:       },
27:     ],
28:   });
29: 
30:   // Print the full response
31:   console.log('\nFull response:');
32:   console.dir(message, { depth: 4 });
33: 
34:   // Extract and print the content
35:   console.log('\nResponse content:');
36:   for (const contentBlock of message.content) {
37:     if (contentBlock.type === 'text') {
38:       console.log(contentBlock.text);
39:     }
40:   }
41: 
42:   // Print usage information
43:   console.log('\nUsage statistics:');
44:   console.log(`Input tokens: ${message.usage.input_tokens}`);
45:   console.log(`Output tokens: ${message.usage.output_tokens}`);
46: 
47:   if (message.usage.server_tool_use) {
48:     console.log(`Web search requests: ${message.usage.server_tool_use.web_search_requests}`);
49:   }
50: }
51: 
52: main().catch(console.error);
````

## File: packages/bedrock-sdk/examples/demo.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import { AnthropicBedrock } from '@anthropic-ai/bedrock-sdk';
 4: 
 5: // Note: this assumes you have configured AWS credentials in a way
 6: // that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
 7: // file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
 8: //
 9: // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
10: const anthropic = new AnthropicBedrock();
11: 
12: async function main() {
13:   const message = await anthropic.messages.create({
14:     model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
15:     messages: [
16:       {
17:         role: 'user',
18:         content: 'Hello!',
19:       },
20:     ],
21:     max_tokens: 1024,
22:   });
23:   console.log(message);
24: }
25: 
26: main();
````

## File: packages/bedrock-sdk/examples/streaming.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import { AnthropicBedrock } from '@anthropic-ai/bedrock-sdk';
 4: 
 5: // Note: this assumes you have configured AWS credentials in a way
 6: // that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
 7: // file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
 8: //
 9: // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
10: const client = new AnthropicBedrock();
11: 
12: async function main() {
13:   const stream = await client.messages.create({
14:     model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
15:     messages: [
16:       {
17:         role: 'user',
18:         content: 'Hello!',
19:       },
20:     ],
21:     max_tokens: 1024,
22:     stream: true,
23:   });
24: 
25:   for await (const event of stream) {
26:     if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
27:       process.stdout.write(event.delta.text);
28:     }
29:   }
30:   process.stdout.write('\n');
31: }
32: 
33: main();
````

## File: packages/bedrock-sdk/scripts/postprocess-dist-package-json.cjs
````
 1: const fs = require('fs');
 2: const pkgJson = require('../dist/package.json');
 3: 
 4: for (const dep in pkgJson.dependencies) {
 5:   // ensure we point to NPM instead of a local directory
 6:   if (dep === '@anthropic-ai/sdk') {
 7:     pkgJson.dependencies[dep] = '>=0.50.3 <1';
 8:   }
 9: }
10: 
11: fs.writeFileSync('dist/package.json', JSON.stringify(pkgJson, null, 2));
````

## File: packages/bedrock-sdk/src/core/auth.ts
````typescript
 1: import assert from 'assert';
 2: import { SignatureV4 } from '@smithy/signature-v4';
 3: import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
 4: import { HttpRequest } from '@smithy/protocol-http';
 5: import { Sha256 } from '@aws-crypto/sha256-js';
 6: 
 7: type AuthProps = {
 8:   url: string;
 9:   regionName: string;
10:   awsAccessKey: string | null | undefined;
11:   awsSecretKey: string | null | undefined;
12:   awsSessionToken: string | null | undefined;
13: };
14: 
15: export const getAuthHeaders = async (req: RequestInit, props: AuthProps): Promise<Record<string, string>> => {
16:   assert(req.method, 'Expected request method property to be set');
17: 
18:   const providerChain = fromNodeProviderChain();
19: 
20:   const credentials = await withTempEnv(
21:     () => {
22:       // Temporarily set the appropriate environment variables if we've been
23:       // explicitly given credentials so that the credentials provider can
24:       // resolve them.
25:       //
26:       // Note: the environment provider is only not run first if the `AWS_PROFILE`
27:       // environment variable is set.
28:       // https://github.com/aws/aws-sdk-js-v3/blob/44a18a34b2c93feccdfcd162928d13e6dbdcaf30/packages/credential-provider-node/src/defaultProvider.ts#L49
29:       if (props.awsAccessKey) {
30:         process.env['AWS_ACCESS_KEY_ID'] = props.awsAccessKey;
31:       }
32:       if (props.awsSecretKey) {
33:         process.env['AWS_SECRET_ACCESS_KEY'] = props.awsSecretKey;
34:       }
35:       if (props.awsSessionToken) {
36:         process.env['AWS_SESSION_TOKEN'] = props.awsSessionToken;
37:       }
38:     },
39:     () => providerChain(),
40:   );
41: 
42:   const signer = new SignatureV4({
43:     service: 'bedrock',
44:     region: props.regionName,
45:     credentials,
46:     sha256: Sha256,
47:   });
48: 
49:   const url = new URL(props.url);
50: 
51:   const headers =
52:     !req.headers ? {}
53:     : Symbol.iterator in req.headers ?
54:       Object.fromEntries(Array.from(req.headers).map((header) => [...header]))
55:     : { ...req.headers };
56: 
57:   // The connection header may be stripped by a proxy somewhere, so the receiver
58:   // of this message may not see this header, so we remove it from the set of headers
59:   // that are signed.
60:   delete headers['connection'];
61:   headers['host'] = url.hostname;
62: 
63:   const request = new HttpRequest({
64:     method: req.method.toUpperCase(),
65:     protocol: url.protocol,
66:     path: url.pathname,
67:     headers,
68:     body: req.body,
69:   });
70: 
71:   const signed = await signer.sign(request);
72:   return signed.headers;
73: };
74: 
75: const withTempEnv = async <R>(updateEnv: () => void, fn: () => Promise<R>): Promise<R> => {
76:   const previousEnv = { ...process.env };
77: 
78:   try {
79:     updateEnv();
80:     return await fn();
81:   } finally {
82:     process.env = previousEnv;
83:   }
84: };
````

## File: packages/bedrock-sdk/src/core/error.ts
````typescript
1: export * from '@anthropic-ai/sdk/core/error';
````

## File: packages/bedrock-sdk/src/core/pagination.ts
````typescript
1: export * from '@anthropic-ai/sdk/core/pagination';
````

## File: packages/bedrock-sdk/src/core/streaming.ts
````typescript
  1: import { EventStreamMarshaller } from '@smithy/eventstream-serde-node';
  2: import { fromBase64, toBase64 } from '@smithy/util-base64';
  3: import { streamCollector } from '@smithy/fetch-http-handler';
  4: import { EventStreamSerdeContext, SerdeContext } from '@smithy/types';
  5: import { Stream as CoreStream, ServerSentEvent } from '@anthropic-ai/sdk/streaming';
  6: import { AnthropicError } from '@anthropic-ai/sdk/error';
  7: import { APIError } from '@anthropic-ai/sdk';
  8: import { de_ResponseStream } from '../AWS_restJson1';
  9: import { ReadableStreamToAsyncIterable } from '../internal/shims';
 10: import { safeJSON } from '../internal/utils/values';
 11: 
 12: type Bytes = string | ArrayBuffer | Uint8Array | Buffer | null | undefined;
 13: 
 14: export const toUtf8 = (input: Uint8Array): string => new TextDecoder('utf-8').decode(input);
 15: export const fromUtf8 = (input: string): Uint8Array => new TextEncoder().encode(input);
 16: 
 17: // `de_ResponseStream` parses a Bedrock response stream and emits events as they are found.
 18: // It requires a "context" argument which has many fields, but for what we're using it for
 19: // it only needs this.
 20: export const getMinimalSerdeContext = (): SerdeContext & EventStreamSerdeContext => {
 21:   const marshaller = new EventStreamMarshaller({ utf8Encoder: toUtf8, utf8Decoder: fromUtf8 });
 22:   return {
 23:     base64Decoder: fromBase64,
 24:     base64Encoder: toBase64,
 25:     utf8Decoder: fromUtf8,
 26:     utf8Encoder: toUtf8,
 27:     eventStreamMarshaller: marshaller,
 28:     streamCollector: streamCollector,
 29:   } as unknown as SerdeContext & EventStreamSerdeContext;
 30: };
 31: 
 32: export class Stream<Item> extends CoreStream<Item> {
 33:   static override fromSSEResponse<Item>(response: Response, controller: AbortController) {
 34:     let consumed = false;
 35: 
 36:     async function* iterMessages(): AsyncGenerator<ServerSentEvent, void, unknown> {
 37:       if (!response.body) {
 38:         controller.abort();
 39:         throw new AnthropicError(`Attempted to iterate over a response with no body`);
 40:       }
 41: 
 42:       const responseBodyIter = ReadableStreamToAsyncIterable<Bytes>(response.body);
 43:       const eventStream = de_ResponseStream(responseBodyIter, getMinimalSerdeContext());
 44:       for await (const event of eventStream) {
 45:         if (event.chunk && event.chunk.bytes) {
 46:           const s = toUtf8(event.chunk.bytes);
 47:           yield { event: 'chunk', data: s, raw: [] };
 48:         } else if (event.internalServerException) {
 49:           yield { event: 'error', data: 'InternalServerException', raw: [] };
 50:         } else if (event.modelStreamErrorException) {
 51:           yield { event: 'error', data: 'ModelStreamErrorException', raw: [] };
 52:         } else if (event.validationException) {
 53:           yield { event: 'error', data: 'ValidationException', raw: [] };
 54:         } else if (event.throttlingException) {
 55:           yield { event: 'error', data: 'ThrottlingException', raw: [] };
 56:         }
 57:       }
 58:     }
 59: 
 60:     // Note: this function is copied entirely from the core SDK
 61:     async function* iterator(): AsyncIterator<Item, any, undefined> {
 62:       if (consumed) {
 63:         throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
 64:       }
 65:       consumed = true;
 66:       let done = false;
 67:       try {
 68:         for await (const sse of iterMessages()) {
 69:           if (sse.event === 'chunk') {
 70:             try {
 71:               yield JSON.parse(sse.data);
 72:             } catch (e) {
 73:               console.error(`Could not parse message into JSON:`, sse.data);
 74:               console.error(`From chunk:`, sse.raw);
 75:               throw e;
 76:             }
 77:           }
 78: 
 79:           if (sse.event === 'error') {
 80:             const errText = sse.data;
 81:             const errJSON = safeJSON(errText);
 82:             const errMessage = errJSON ? undefined : errText;
 83: 
 84:             throw APIError.generate(undefined, errJSON, errMessage, response.headers);
 85:           }
 86:         }
 87:         done = true;
 88:       } catch (e) {
 89:         // If the user calls `stream.controller.abort()`, we should exit without throwing.
 90:         if (isAbortError(e)) return;
 91:         throw e;
 92:       } finally {
 93:         // If the user `break`s, abort the ongoing request.
 94:         if (!done) controller.abort();
 95:       }
 96:     }
 97: 
 98:     return new Stream(iterator, controller);
 99:   }
100: }
101: 
102: function isAbortError(err: unknown) {
103:   return (
104:     typeof err === 'object' &&
105:     err !== null &&
106:     // Spec-compliant fetch implementations
107:     (('name' in err && (err as any).name === 'AbortError') ||
108:       // Expo fetch
109:       ('message' in err && String((err as any).message).includes('FetchRequestCanceledException')))
110:   );
111: }
````

## File: packages/bedrock-sdk/src/AWS_restJson1.ts
````typescript
  1: // Copied from https://github.com/aws/aws-sdk-js-v3/blob/bee66fbd2a519a16b57c787b2689af857af720af/clients/client-bedrock-runtime/src/protocols/Aws_restJson1.ts
  2: // Modified to remove unnecessary code (we only need to call `de_ResponseStream`) and to adjust imports.
  3: 
  4: // smithy-typescript generated code
  5: import { HttpResponse as __HttpResponse } from '@smithy/protocol-http';
  6: import {
  7:   collectBody,
  8:   decorateServiceException as __decorateServiceException,
  9:   expectInt32 as __expectInt32,
 10:   expectString as __expectString,
 11:   map,
 12:   take,
 13: } from '@smithy/smithy-client';
 14: import {
 15:   EventStreamSerdeContext as __EventStreamSerdeContext,
 16:   ResponseMetadata as __ResponseMetadata,
 17:   SerdeContext as __SerdeContext,
 18: } from '@smithy/types';
 19: 
 20: import {
 21:   InternalServerException,
 22:   ModelStreamErrorException,
 23:   PayloadPart,
 24:   ResponseStream,
 25:   ThrottlingException,
 26:   ValidationException,
 27: } from '@aws-sdk/client-bedrock-runtime';
 28: 
 29: /**
 30:  * deserializeAws_restJson1InternalServerExceptionRes
 31:  */
 32: const de_InternalServerExceptionRes = async (
 33:   parsedOutput: any,
 34:   context: __SerdeContext,
 35: ): Promise<InternalServerException> => {
 36:   const contents: any = map({});
 37:   const data: any = parsedOutput.body;
 38:   const doc = take(data, {
 39:     message: __expectString,
 40:   });
 41:   Object.assign(contents, doc);
 42:   const exception = new InternalServerException({
 43:     $metadata: deserializeMetadata(parsedOutput),
 44:     ...contents,
 45:   });
 46:   return __decorateServiceException(exception, parsedOutput.body);
 47: };
 48: 
 49: /**
 50:  * deserializeAws_restJson1ModelStreamErrorExceptionRes
 51:  */
 52: const de_ModelStreamErrorExceptionRes = async (
 53:   parsedOutput: any,
 54:   context: __SerdeContext,
 55: ): Promise<ModelStreamErrorException> => {
 56:   const contents: any = map({});
 57:   const data: any = parsedOutput.body;
 58:   const doc = take(data, {
 59:     message: __expectString,
 60:     originalMessage: __expectString,
 61:     originalStatusCode: __expectInt32,
 62:   });
 63:   Object.assign(contents, doc);
 64:   const exception = new ModelStreamErrorException({
 65:     $metadata: deserializeMetadata(parsedOutput),
 66:     ...contents,
 67:   });
 68:   return __decorateServiceException(exception, parsedOutput.body);
 69: };
 70: 
 71: /**
 72:  * deserializeAws_restJson1ThrottlingExceptionRes
 73:  */
 74: const de_ThrottlingExceptionRes = async (
 75:   parsedOutput: any,
 76:   context: __SerdeContext,
 77: ): Promise<ThrottlingException> => {
 78:   const contents: any = map({});
 79:   const data: any = parsedOutput.body;
 80:   const doc = take(data, {
 81:     message: __expectString,
 82:   });
 83:   Object.assign(contents, doc);
 84:   const exception = new ThrottlingException({
 85:     $metadata: deserializeMetadata(parsedOutput),
 86:     ...contents,
 87:   });
 88:   return __decorateServiceException(exception, parsedOutput.body);
 89: };
 90: 
 91: /**
 92:  * deserializeAws_restJson1ValidationExceptionRes
 93:  */
 94: const de_ValidationExceptionRes = async (
 95:   parsedOutput: any,
 96:   context: __SerdeContext,
 97: ): Promise<ValidationException> => {
 98:   const contents: any = map({});
 99:   const data: any = parsedOutput.body;
100:   const doc = take(data, {
101:     message: __expectString,
102:   });
103:   Object.assign(contents, doc);
104:   const exception = new ValidationException({
105:     $metadata: deserializeMetadata(parsedOutput),
106:     ...contents,
107:   });
108:   return __decorateServiceException(exception, parsedOutput.body);
109: };
110: 
111: /**
112:  * deserializeAws_restJson1ResponseStream
113:  */
114: export const de_ResponseStream = (
115:   output: any,
116:   context: __SerdeContext & __EventStreamSerdeContext,
117: ): AsyncIterable<ResponseStream> => {
118:   return context.eventStreamMarshaller.deserialize(output, async (event) => {
119:     if (event['chunk'] != null) {
120:       return {
121:         chunk: await de_PayloadPart_event(event['chunk'], context),
122:       };
123:     }
124:     if (event['internalServerException'] != null) {
125:       return {
126:         internalServerException: await de_InternalServerException_event(
127:           event['internalServerException'],
128:           context,
129:         ),
130:       };
131:     }
132:     if (event['modelStreamErrorException'] != null) {
133:       return {
134:         modelStreamErrorException: await de_ModelStreamErrorException_event(
135:           event['modelStreamErrorException'],
136:           context,
137:         ),
138:       };
139:     }
140:     if (event['validationException'] != null) {
141:       return {
142:         validationException: await de_ValidationException_event(event['validationException'], context),
143:       };
144:     }
145:     if (event['throttlingException'] != null) {
146:       return {
147:         throttlingException: await de_ThrottlingException_event(event['throttlingException'], context),
148:       };
149:     }
150:     return { $unknown: output };
151:   });
152: };
153: const de_InternalServerException_event = async (
154:   output: any,
155:   context: __SerdeContext,
156: ): Promise<InternalServerException> => {
157:   const parsedOutput: any = {
158:     ...output,
159:     body: await parseBody(output.body, context),
160:   };
161:   return de_InternalServerExceptionRes(parsedOutput, context);
162: };
163: const de_ModelStreamErrorException_event = async (
164:   output: any,
165:   context: __SerdeContext,
166: ): Promise<ModelStreamErrorException> => {
167:   const parsedOutput: any = {
168:     ...output,
169:     body: await parseBody(output.body, context),
170:   };
171:   return de_ModelStreamErrorExceptionRes(parsedOutput, context);
172: };
173: const de_PayloadPart_event = async (output: any, context: __SerdeContext): Promise<PayloadPart> => {
174:   const contents: PayloadPart = {} as any;
175:   const data: any = await parseBody(output.body, context);
176:   Object.assign(contents, de_PayloadPart(data, context));
177:   return contents;
178: };
179: const de_ThrottlingException_event = async (
180:   output: any,
181:   context: __SerdeContext,
182: ): Promise<ThrottlingException> => {
183:   const parsedOutput: any = {
184:     ...output,
185:     body: await parseBody(output.body, context),
186:   };
187:   return de_ThrottlingExceptionRes(parsedOutput, context);
188: };
189: const de_ValidationException_event = async (
190:   output: any,
191:   context: __SerdeContext,
192: ): Promise<ValidationException> => {
193:   const parsedOutput: any = {
194:     ...output,
195:     body: await parseBody(output.body, context),
196:   };
197:   return de_ValidationExceptionRes(parsedOutput, context);
198: };
199: /**
200:  * deserializeAws_restJson1PayloadPart
201:  */
202: const de_PayloadPart = (output: any, context: __SerdeContext): PayloadPart => {
203:   return take(output, {
204:     bytes: context.base64Decoder,
205:   }) as any;
206: };
207: 
208: const deserializeMetadata = (output: __HttpResponse): __ResponseMetadata => ({
209:   httpStatusCode: output.statusCode,
210:   requestId:
211:     output.headers['x-amzn-requestid'] ??
212:     output.headers['x-amzn-request-id'] ??
213:     output.headers['x-amz-request-id'] ??
214:     '',
215:   extendedRequestId: output.headers['x-amz-id-2'] ?? '',
216:   cfId: output.headers['x-amz-cf-id'] ?? '',
217: });
218: 
219: // Encode Uint8Array data into string with utf-8.
220: const collectBodyString = (streamBody: any, context: __SerdeContext): Promise<string> =>
221:   collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
222: 
223: const parseBody = (streamBody: any, context: __SerdeContext): any =>
224:   collectBodyString(streamBody, context).then((encoded) => {
225:     if (encoded.length) {
226:       return JSON.parse(encoded);
227:     }
228:     return {};
229:   });
````

## File: packages/bedrock-sdk/src/client.ts
````typescript
  1: import { BaseAnthropic, ClientOptions as CoreClientOptions } from '@anthropic-ai/sdk/client';
  2: import * as Resources from '@anthropic-ai/sdk/resources/index';
  3: import { getAuthHeaders } from './core/auth';
  4: import { Stream } from './core/streaming';
  5: import { readEnv } from './internal/utils/env';
  6: import { FinalRequestOptions } from './internal/request-options';
  7: import { isObj } from './internal/utils/values';
  8: import { buildHeaders } from './internal/headers';
  9: import { FinalizedRequestInit } from './internal/types';
 10: import { path } from './internal/utils/path';
 11: 
 12: export { BaseAnthropic } from '@anthropic-ai/sdk/client';
 13: 
 14: const DEFAULT_VERSION = 'bedrock-2023-05-31';
 15: const MODEL_ENDPOINTS = new Set<string>(['/v1/complete', '/v1/messages', '/v1/messages?beta=true']);
 16: 
 17: export type ClientOptions = Omit<CoreClientOptions, 'apiKey' | 'authToken'> & {
 18:   awsSecretKey?: string | null | undefined;
 19:   awsAccessKey?: string | null | undefined;
 20: 
 21:   /**
 22:    * Defaults to process.env['AWS_REGION'].
 23:    */
 24:   awsRegion?: string | undefined;
 25:   awsSessionToken?: string | null | undefined;
 26:   skipAuth?: boolean;
 27: };
 28: 
 29: /** API Client for interfacing with the Anthropic Bedrock API. */
 30: export class AnthropicBedrock extends BaseAnthropic {
 31:   awsSecretKey: string | null;
 32:   awsAccessKey: string | null;
 33:   awsRegion: string;
 34:   awsSessionToken: string | null;
 35:   skipAuth: boolean = false;
 36: 
 37:   /**
 38:    * API Client for interfacing with the Anthropic Bedrock API.
 39:    *
 40:    * @param {string | null | undefined} [opts.awsSecretKey]
 41:    * @param {string | null | undefined} [opts.awsAccessKey]
 42:    * @param {string | undefined} [opts.awsRegion=process.env['AWS_REGION'] ?? us-east-1]
 43:    * @param {string | null | undefined} [opts.awsSessionToken]
 44:    * @param {string} [opts.baseURL=process.env['ANTHROPIC_BEDROCK_BASE_URL'] ?? https://bedrock-runtime.${this.awsRegion}.amazonaws.com] - Override the default base URL for the API.
 45:    * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
 46:    * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
 47:    * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
 48:    * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
 49:    * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
 50:    * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
 51:    * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
 52:    * @param {boolean} [opts.skipAuth=false] - Skip authentication for this request. This is useful if you have an internal proxy that handles authentication for you.
 53:    */
 54:   constructor({
 55:     awsRegion = readEnv('AWS_REGION') ?? 'us-east-1',
 56:     baseURL = readEnv('ANTHROPIC_BEDROCK_BASE_URL') ?? `https://bedrock-runtime.${awsRegion}.amazonaws.com`,
 57:     awsSecretKey = null,
 58:     awsAccessKey = null,
 59:     awsSessionToken = null,
 60:     ...opts
 61:   }: ClientOptions = {}) {
 62:     super({
 63:       baseURL,
 64:       ...opts,
 65:     });
 66: 
 67:     this.awsSecretKey = awsSecretKey;
 68:     this.awsAccessKey = awsAccessKey;
 69:     this.awsRegion = awsRegion;
 70:     this.awsSessionToken = awsSessionToken;
 71:     this.skipAuth = opts.skipAuth ?? false;
 72:   }
 73: 
 74:   messages: MessagesResource = makeMessagesResource(this);
 75:   completions: Resources.Completions = new Resources.Completions(this);
 76:   beta: BetaResource = makeBetaResource(this);
 77: 
 78:   protected override validateHeaders() {
 79:     // auth validation is handled in prepareRequest since it needs to be async
 80:   }
 81: 
 82:   protected override async prepareRequest(
 83:     request: FinalizedRequestInit,
 84:     { url, options }: { url: string; options: FinalRequestOptions },
 85:   ): Promise<void> {
 86:     if (this.skipAuth) {
 87:       return;
 88:     }
 89:     const regionName = this.awsRegion;
 90:     if (!regionName) {
 91:       throw new Error(
 92:         'Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present',
 93:       );
 94:     }
 95: 
 96:     const headers = await getAuthHeaders(request, {
 97:       url,
 98:       regionName,
 99:       awsAccessKey: this.awsAccessKey,
100:       awsSecretKey: this.awsSecretKey,
101:       awsSessionToken: this.awsSessionToken,
102:     });
103:     request.headers = buildHeaders([headers, request.headers]).values;
104:   }
105: 
106:   override buildRequest(options: FinalRequestOptions): {
107:     req: FinalizedRequestInit;
108:     url: string;
109:     timeout: number;
110:   } {
111:     options.__streamClass = Stream;
112: 
113:     if (isObj(options.body)) {
114:       // create a shallow copy of the request body so that code that mutates it later
115:       // doesn't mutate the original user-provided object
116:       options.body = { ...options.body };
117:     }
118: 
119:     if (isObj(options.body)) {
120:       if (!options.body['anthropic_version']) {
121:         options.body['anthropic_version'] = DEFAULT_VERSION;
122:       }
123: 
124:       if (options.headers && !options.body['anthropic_beta']) {
125:         const betas = buildHeaders([options.headers]).values.get('anthropic-beta');
126:         if (betas != null) {
127:           options.body['anthropic_beta'] = betas.split(',');
128:         }
129:       }
130:     }
131: 
132:     if (MODEL_ENDPOINTS.has(options.path) && options.method === 'post') {
133:       if (!isObj(options.body)) {
134:         throw new Error('Expected request body to be an object for post /v1/messages');
135:       }
136: 
137:       const model = options.body['model'] as string;
138:       options.body['model'] = undefined;
139: 
140:       const stream = options.body['stream'];
141:       options.body['stream'] = undefined;
142: 
143:       if (stream) {
144:         options.path = path`/model/${model}/invoke-with-response-stream`;
145:       } else {
146:         options.path = path`/model/${model}/invoke`;
147:       }
148:     }
149: 
150:     return super.buildRequest(options);
151:   }
152: }
153: 
154: /**
155:  * The Bedrock API does not currently support token counting or the Batch API.
156:  */
157: type MessagesResource = Omit<Resources.Messages, 'batches' | 'countTokens'>;
158: 
159: function makeMessagesResource(client: AnthropicBedrock): MessagesResource {
160:   const resource = new Resources.Messages(client);
161: 
162:   // @ts-expect-error we're deleting non-optional properties
163:   delete resource.batches;
164: 
165:   // @ts-expect-error we're deleting non-optional properties
166:   delete resource.countTokens;
167: 
168:   return resource;
169: }
170: 
171: /**
172:  * The Bedrock API does not currently support prompt caching, token counting or the Batch API.
173:  */
174: type BetaResource = Omit<Resources.Beta, 'promptCaching' | 'messages'> & {
175:   messages: Omit<Resources.Beta['messages'], 'batches' | 'countTokens'>;
176: };
177: 
178: function makeBetaResource(client: AnthropicBedrock): BetaResource {
179:   const resource = new Resources.Beta(client);
180: 
181:   // @ts-expect-error we're deleting non-optional properties
182:   delete resource.promptCaching;
183: 
184:   // @ts-expect-error we're deleting non-optional properties
185:   delete resource.messages.batches;
186: 
187:   // @ts-expect-error we're deleting non-optional properties
188:   delete resource.messages.countTokens;
189: 
190:   return resource;
191: }
````

## File: packages/bedrock-sdk/src/index.ts
````typescript
1: export * from './client';
2: export { AnthropicBedrock as default } from './client';
````

## File: packages/bedrock-sdk/tests/client.test.ts
````typescript
  1: // Mock the client to allow for a more integration-style test
  2: // We're mocking specific parts of the AnthropicBedrock client to avoid
  3: // dependencies while still testing the integration behavior
  4: 
  5: // Mock specific parts of the client
  6: jest.mock('../src/core/auth', () => ({
  7:   getAuthHeaders: jest.fn().mockResolvedValue({}),
  8: }));
  9: 
 10: // Create a mock fetch function
 11: const mockFetch = jest.fn().mockImplementation(() => {
 12:   return Promise.resolve({
 13:     ok: true,
 14:     status: 200,
 15:     statusText: 'OK',
 16:     headers: new Headers({ 'content-type': 'application/json' }),
 17:     json: () => Promise.resolve({}),
 18:     text: () => Promise.resolve('{}'),
 19:   });
 20: });
 21: 
 22: // Store original fetch function
 23: const originalFetch = global.fetch;
 24: 
 25: describe('Bedrock model ARN URL encoding integration test', () => {
 26:   beforeEach(() => {
 27:     // Replace global fetch with our mock
 28:     global.fetch = mockFetch;
 29:     // Clear mock history
 30:     mockFetch.mockClear();
 31:   });
 32: 
 33:   afterEach(() => {
 34:     // Restore original fetch
 35:     global.fetch = originalFetch;
 36:   });
 37: 
 38:   test('properly encodes model ARNs with slashes in URL path', async () => {
 39:     // Import the client - do this inside the test to ensure mocks are set up first
 40:     const { AnthropicBedrock } = require('../src');
 41: 
 42:     // Create client instance
 43:     const client = new AnthropicBedrock({
 44:       awsRegion: 'us-east-1',
 45:       baseURL: 'http://localhost:4010',
 46:     });
 47: 
 48:     // Model ARN with slashes that needs encoding
 49:     const modelArn =
 50:       'arn:aws:bedrock:us-east-2:1234:inference-profile/us.anthropic.claude-3-7-sonnet-20250219-v1:0';
 51: 
 52:     // Make a request to trigger the URL construction with the ARN
 53:     try {
 54:       await client.messages.create({
 55:         model: modelArn,
 56:         max_tokens: 1024,
 57:         messages: [{ content: 'Test message', role: 'user' }],
 58:       });
 59:     } catch (e) {
 60:       // We expect errors due to mocking - we're just interested in the URL construction
 61:     }
 62: 
 63:     // Verify that fetch was called
 64:     expect(mockFetch).toHaveBeenCalled();
 65: 
 66:     // Get the URL that was passed to fetch
 67:     const fetchUrl = mockFetch.mock.calls[0][0];
 68: 
 69:     // Expected URL with properly encoded ARN (slash encoded as %2F)
 70:     const expectedUrl =
 71:       'http://localhost:4010/model/arn:aws:bedrock:us-east-2:1234:inference-profile%2Fus.anthropic.claude-3-7-sonnet-20250219-v1:0/invoke';
 72: 
 73:     // Verify the exact URL matches what we expect
 74:     expect(fetchUrl).toBe(expectedUrl);
 75:   });
 76: 
 77:   test('properly constructs URL path for normal model names', async () => {
 78:     // Import the client - do this inside the test to ensure mocks are set up first
 79:     const { AnthropicBedrock } = require('../src');
 80: 
 81:     // Create client instance
 82:     const client = new AnthropicBedrock({
 83:       awsRegion: 'us-east-1',
 84:       baseURL: 'http://localhost:4010',
 85:     });
 86: 
 87:     // Regular model name (still contains characters that need encoding)
 88:     const modelName = 'anthropic.claude-3-sonnet-20240229-v1:0';
 89: 
 90:     // Make a request to trigger the URL construction
 91:     try {
 92:       await client.messages.create({
 93:         model: modelName,
 94:         max_tokens: 1024,
 95:         messages: [{ content: 'Test message', role: 'user' }],
 96:       });
 97:     } catch (e) {
 98:       // We expect errors due to mocking - we're just interested in the URL construction
 99:     }
100: 
101:     // Verify that fetch was called
102:     expect(mockFetch).toHaveBeenCalled();
103: 
104:     // Get the URL that was passed to fetch
105:     const fetchUrl = mockFetch.mock.calls[0][0];
106: 
107:     // Expected URL with properly encoded model name
108:     const expectedUrl = 'http://localhost:4010/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke';
109: 
110:     // Verify the exact URL matches what we expect
111:     expect(fetchUrl).toBe(expectedUrl);
112:   });
113: });
````

## File: packages/bedrock-sdk/CHANGELOG.md
````markdown
  1: # Changelog
  2: 
  3: ## 0.22.1 (2025-05-22)
  4: 
  5: Full Changelog: [bedrock-sdk-v0.22.0...bedrock-sdk-v0.22.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.22.0...bedrock-sdk-v0.22.1)
  6: 
  7: ### Chores
  8: 
  9: * **internal:** version bump ([8ebaf61](https://github.com/anthropics/anthropic-sdk-typescript/commit/8ebaf616d2e5c6aebc153f19a403dde41ab5a9f1))
 10: 
 11: ## 0.22.0 (2025-05-15)
 12: 
 13: Full Changelog: [bedrock-sdk-v0.21.2...bedrock-sdk-v0.22.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.21.2...bedrock-sdk-v0.22.0)
 14: 
 15: ### Features
 16: 
 17: * **bedrock:** support skipAuth on Bedrock client to bypass local auth requirements ([b661c5f](https://github.com/anthropics/anthropic-sdk-typescript/commit/b661c5fe4d93fa749de5b7cbbce98dc224a68adc))
 18: 
 19: 
 20: ### Bug Fixes
 21: 
 22: * **bedrock:** support model names with slashes ([cb5fa8a](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb5fa8a8f55ed12382aeb5f09110b0d5fefc46bb))
 23: 
 24: ## 0.21.2 (2025-05-09)
 25: 
 26: Full Changelog: [bedrock-sdk-v0.21.1...bedrock-sdk-v0.21.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.21.1...bedrock-sdk-v0.21.2)
 27: 
 28: ### Bug Fixes
 29: 
 30: * **client:** always overwrite when merging headers ([657912a](https://github.com/anthropics/anthropic-sdk-typescript/commit/657912ad66f86e878291a4cab5436844efbb633b))
 31: 
 32: ## 0.21.1 (2025-05-09)
 33: 
 34: Full Changelog: [bedrock-sdk-v0.21.0...bedrock-sdk-v0.21.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.21.0...bedrock-sdk-v0.21.1)
 35: 
 36: ### Chores
 37: 
 38: * sync repo ([508e385](https://github.com/anthropics/anthropic-sdk-typescript/commit/508e38511c13ba8842065d0dafbc7f462abe0322))
 39: 
 40: ## 0.21.0 (2025-05-09)
 41: 
 42: Full Changelog: [bedrock-sdk-v0.20.0...bedrock-sdk-v0.21.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.20.0...bedrock-sdk-v0.21.0)
 43: 
 44: ### Features
 45: 
 46: * **bedrock:** add beta.messages.create() method ([faf8484](https://github.com/anthropics/anthropic-sdk-typescript/commit/faf84848e42ec02994003283bf6178aa55233531))
 47: 
 48: 
 49: ### Bug Fixes
 50: 
 51: * **bedrock,vertex:** update to new SDK version ([cb620bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb620bbb60e64f27168f74db7a48ad8c2d5f953e))
 52: * **bedrock:** correct messages beta handling ([f34d67a](https://github.com/anthropics/anthropic-sdk-typescript/commit/f34d67abca1270f04f9bbf6ce430ce67b36d4932))
 53: * **bedrock:** don't mutate request body inputs ([4523ca9](https://github.com/anthropics/anthropic-sdk-typescript/commit/4523ca92b0fa194c2de0ac8bbc7e66873ec5e817))
 54: * **bedrock:** update streaming util import ([01d03bf](https://github.com/anthropics/anthropic-sdk-typescript/commit/01d03bf79615de601f8bb9284df818e7d066aafa))
 55: * **streaming:** handle more AbortError cases ([521d6cd](https://github.com/anthropics/anthropic-sdk-typescript/commit/521d6cda1c43bad9b0ef110809e0d3e7cd411a0d))
 56: * **vertex,bedrock:** correct build script ([df895a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/df895a7d7cbd51422343fca95ab9f1d58918b2a1))
 57: 
 58: 
 59: ### Chores
 60: 
 61: * **bedrock,vertex:** remove unsupported countTokens method ([#597](https://github.com/anthropics/anthropic-sdk-typescript/issues/597)) ([6f6db16](https://github.com/anthropics/anthropic-sdk-typescript/commit/6f6db164d2526c2fb272151f4d68140da27ce1ea))
 62: * **bedrock:** add `skipAuth` option to allow users to let authorization be handled elsewhere ([ee58772](https://github.com/anthropics/anthropic-sdk-typescript/commit/ee587723718109797efa80b020076c43a300f1b9))
 63: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([ff925db](https://github.com/anthropics/anthropic-sdk-typescript/commit/ff925db987a66950c997ec50b9c55e67152d1945))
 64: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([9891107](https://github.com/anthropics/anthropic-sdk-typescript/commit/98911074a745bfefe29f26c725bf54b6e228c93c))
 65: * **bedrock:** bump @aws-sdk/credential-providers ([9f611d6](https://github.com/anthropics/anthropic-sdk-typescript/commit/9f611d6ba8c6b3de02c3183e4f2f42d1540525f0))
 66: * **bedrock:** bump @aws-sdk/credential-providers ([491646e](https://github.com/anthropics/anthropic-sdk-typescript/commit/491646e10a48a09c0828d0fb23908f43f38d8e6a))
 67: * **bedrock:** bump dependency on @anthropic-ai/sdk ([2d0d4b6](https://github.com/anthropics/anthropic-sdk-typescript/commit/2d0d4b61368286581e281b604e005fc81139b6b9))
 68: * **bedrock:** remove unsupported methods ([8bb04ed](https://github.com/anthropics/anthropic-sdk-typescript/commit/8bb04ed2370c894b080d56d37e960ad4c3dc5925))
 69: * **internal:** migrate to eslint v9 ([1141664](https://github.com/anthropics/anthropic-sdk-typescript/commit/114166498a54e0b62cd9ea071fc736d714cefde6))
 70: 
 71: 
 72: ### Documentation
 73: 
 74: * use latest sonnet in example snippets ([#625](https://github.com/anthropics/anthropic-sdk-typescript/issues/625)) ([a965791](https://github.com/anthropics/anthropic-sdk-typescript/commit/a9657918aaf1246609105cbafaf4bb043b146356))
 75: 
 76: ## 0.20.0 (2025-05-09)
 77: 
 78: Full Changelog: [bedrock-sdk-v0.12.6...bedrock-sdk-v0.12.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.6...bedrock-sdk-v0.12.7)
 79: 
 80: ### Bug Fixes
 81: 
 82: * **bedrock,vertex:** update to new SDK version ([cb620bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb620bbb60e64f27168f74db7a48ad8c2d5f953e))
 83: * **vertex,bedrock:** correct build script ([df895a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/df895a7d7cbd51422343fca95ab9f1d58918b2a1))
 84: 
 85: 
 86: ### Chores
 87: 
 88: * **bedrock:** add `skipAuth` option to allow users to let authorization be handled elsewhere ([ee58772](https://github.com/anthropics/anthropic-sdk-typescript/commit/ee587723718109797efa80b020076c43a300f1b9))
 89: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([ff925db](https://github.com/anthropics/anthropic-sdk-typescript/commit/ff925db987a66950c997ec50b9c55e67152d1945))
 90: * **bedrock:** bump @aws-sdk/credential-providers ([9f611d6](https://github.com/anthropics/anthropic-sdk-typescript/commit/9f611d6ba8c6b3de02c3183e4f2f42d1540525f0))
 91: 
 92: ## 0.12.6 (2025-04-28)
 93: 
 94: Full Changelog: [bedrock-sdk-v0.12.5...bedrock-sdk-v0.12.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.5...bedrock-sdk-v0.12.6)
 95: 
 96: ### Chores
 97: 
 98: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([6440e1d](https://github.com/anthropics/anthropic-sdk-typescript/commit/6440e1db992779aeead231b420a55002ec0991d1))
 99: 
100: ## 0.12.5 (2025-04-25)
101: 
102: Full Changelog: [bedrock-sdk-v0.12.4...bedrock-sdk-v0.12.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.4...bedrock-sdk-v0.12.5)
103: 
104: ### Chores
105: 
106: * **bedrock:** bump @aws-sdk/credential-providers ([a4d88d7](https://github.com/anthropics/anthropic-sdk-typescript/commit/a4d88d7807e2cf1a0836dc05d9deff5bfc0c665f))
107: 
108: ## 0.12.4 (2025-01-23)
109: 
110: Full Changelog: [bedrock-sdk-v0.12.3...bedrock-sdk-v0.12.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.3...bedrock-sdk-v0.12.4)
111: 
112: ### Bug Fixes
113: 
114: * **bedrock:** update streaming util import ([255c059](https://github.com/anthropics/anthropic-sdk-typescript/commit/255c0599e333e6fae582255e3b0631538b168c69))
115: 
116: ## 0.12.3 (2025-01-23)
117: 
118: Full Changelog: [bedrock-sdk-v0.12.2...bedrock-sdk-v0.12.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.2...bedrock-sdk-v0.12.3)
119: 
120: ### Chores
121: 
122: * **bedrock:** bump dependency on @anthropic-ai/sdk ([8745ca2](https://github.com/anthropics/anthropic-sdk-typescript/commit/8745ca2160f5af4d89e5732a44e560c5e2787aa8))
123: 
124: ## 0.12.2 (2025-01-21)
125: 
126: Full Changelog: [bedrock-sdk-v0.12.1...bedrock-sdk-v0.12.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.1...bedrock-sdk-v0.12.2)
127: 
128: ### Chores
129: 
130: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([43dd43c](https://github.com/anthropics/anthropic-sdk-typescript/commit/43dd43c4c8ab69d5a60e59473af7dff5f7799048))
131: 
132: ## 0.12.1 (2024-12-20)
133: 
134: Full Changelog: [bedrock-sdk-v0.12.0...bedrock-sdk-v0.12.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.12.0...bedrock-sdk-v0.12.1)
135: 
136: ### Chores
137: 
138: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([8057b1e](https://github.com/anthropics/anthropic-sdk-typescript/commit/8057b1eb67ccccee042a45f2efe53cccced15682))
139: 
140: ## 0.12.0 (2024-12-17)
141: 
142: Full Changelog: [bedrock-sdk-v0.11.2...bedrock-sdk-v0.12.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.11.2...bedrock-sdk-v0.12.0)
143: 
144: ### Features
145: 
146: * **api:** general availability updates ([#631](https://github.com/anthropics/anthropic-sdk-typescript/issues/631)) ([b5c92e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/b5c92e5b74c370ac3f9ba28e915bd54588a42be0))
147: 
148: 
149: ### Chores
150: 
151: * **bedrock,vertex:** remove unsupported countTokens method ([#597](https://github.com/anthropics/anthropic-sdk-typescript/issues/597)) ([17b7da5](https://github.com/anthropics/anthropic-sdk-typescript/commit/17b7da5ee6f35ea2bdd53a66a662871affae6341))
152: * **bedrock:** remove unsupported methods ([6458dc1](https://github.com/anthropics/anthropic-sdk-typescript/commit/6458dc14544c16240a6580a21a36fcf5bde594b2))
153: 
154: 
155: ### Documentation
156: 
157: * use latest sonnet in example snippets ([#625](https://github.com/anthropics/anthropic-sdk-typescript/issues/625)) ([f70882b](https://github.com/anthropics/anthropic-sdk-typescript/commit/f70882b0e8119a414b01b9f0b85fbe1ccb06f122))
158: 
159: ## 0.11.2 (2024-11-05)
160: 
161: Full Changelog: [bedrock-sdk-v0.11.1...bedrock-sdk-v0.11.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.11.1...bedrock-sdk-v0.11.2)
162: 
163: ### Bug Fixes
164: 
165: * **bedrock:** don't mutate request body inputs ([f83b535](https://github.com/anthropics/anthropic-sdk-typescript/commit/f83b53520262219229cecc388f95d92be83c09d5))
166: 
167: ## 0.11.1 (2024-10-23)
168: 
169: Full Changelog: [bedrock-sdk-v0.11.0...bedrock-sdk-v0.11.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.11.0...bedrock-sdk-v0.11.1)
170: 
171: ### Bug Fixes
172: 
173: * **bedrock:** correct messages beta handling ([9b57586](https://github.com/anthropics/anthropic-sdk-typescript/commit/9b57586456221f8900902b8e85c7c017959c150a))
174: 
175: ## 0.11.0 (2024-10-22)
176: 
177: Full Changelog: [bedrock-sdk-v0.10.4...bedrock-sdk-v0.11.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.10.4...bedrock-sdk-v0.11.0)
178: 
179: ### Features
180: 
181: * **bedrock:** add beta.messages.create() method ([6317592](https://github.com/anthropics/anthropic-sdk-typescript/commit/63175920a016a2ad187dd1127d263357cf6c007e))
182: 
183: ## 0.10.4 (2024-10-08)
184: 
185: Full Changelog: [bedrock-sdk-v0.10.3...bedrock-sdk-v0.10.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.10.3...bedrock-sdk-v0.10.4)
186: 
187: ### Refactors
188: 
189: * **types:** improve metadata type names ([#547](https://github.com/anthropics/anthropic-sdk-typescript/issues/547)) ([cef499c](https://github.com/anthropics/anthropic-sdk-typescript/commit/cef499cf3b01643f7e5e3c09524f49e198b940be))
190: 
191: ## 0.10.3 (2024-10-04)
192: 
193: Full Changelog: [bedrock-sdk-v0.10.2...bedrock-sdk-v0.10.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.10.2...bedrock-sdk-v0.10.3)
194: 
195: ### Chores
196: 
197: * better object fallback behaviour for casting errors ([#526](https://github.com/anthropics/anthropic-sdk-typescript/issues/526)) ([4ffb2e4](https://github.com/anthropics/anthropic-sdk-typescript/commit/4ffb2e4e1f5fef3ae58d9f4c99a63e75dd459c5b))
198: 
199: ## 0.10.2 (2024-07-29)
200: 
201: Full Changelog: [bedrock-sdk-v0.10.1...bedrock-sdk-v0.10.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.10.1...bedrock-sdk-v0.10.2)
202: 
203: ### Chores
204: 
205: * **bedrock:** use `chunk` for internal SSE parsing instead of `completion` ([#472](https://github.com/anthropics/anthropic-sdk-typescript/issues/472)) ([0f6190a](https://github.com/anthropics/anthropic-sdk-typescript/commit/0f6190a69d8986ac3779441eba43d345ec3fb342))
206: * **docs:** rename anthropic const to client ([#471](https://github.com/anthropics/anthropic-sdk-typescript/issues/471)) ([e1a7f9f](https://github.com/anthropics/anthropic-sdk-typescript/commit/e1a7f9f813077fb033c732c004c7bda85738a321))
207: * **internal:** remove old reference to check-test-server ([8dc9afc](https://github.com/anthropics/anthropic-sdk-typescript/commit/8dc9afcf00c4a38c2d85171ebceafc5f6a47c117))
208: 
209: ## 0.10.1 (2024-06-25)
210: 
211: Full Changelog: [bedrock-sdk-v0.10.0...bedrock-sdk-v0.10.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.10.0...bedrock-sdk-v0.10.1)
212: 
213: ### Chores
214: 
215: * **internal:** replace deprecated aws-sdk packages with [@smithy](https://github.com/smithy) ([#447](https://github.com/anthropics/anthropic-sdk-typescript/issues/447)) ([4328cbf](https://github.com/anthropics/anthropic-sdk-typescript/commit/4328cbf9e64f8bfc9b95a9048b18729c9a938ba5))
216: 
217: ## 0.10.0 (2024-05-30)
218: 
219: Full Changelog: [bedrock-sdk-v0.9.8...bedrock-sdk-v0.10.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.8...bedrock-sdk-v0.10.0)
220: 
221: ### Features
222: 
223: * **bedrock:** support tools ([91fc61a](https://github.com/anthropics/anthropic-sdk-typescript/commit/91fc61ae7246705d26e96a95dae38b46e9ad9290))
224: 
225: ## 0.9.8 (2024-05-16)
226: 
227: Full Changelog: [bedrock-sdk-v0.9.7...bedrock-sdk-v0.9.8](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.7...bedrock-sdk-v0.9.8)
228: 
229: ### Chores
230: 
231: * **internal:** fix generated version numbers ([#413](https://github.com/anthropics/anthropic-sdk-typescript/issues/413)) ([ea77063](https://github.com/anthropics/anthropic-sdk-typescript/commit/ea770630897bb85caaecd39bccf478e4dd3f169c))
232: 
233: ## 0.9.7 (2024-05-07)
234: 
235: Full Changelog: [bedrock-sdk-v0.9.6...bedrock-sdk-v0.9.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.6...bedrock-sdk-v0.9.7)
236: 
237: ### Chores
238: 
239: * **internal:** refactor scripts ([#404](https://github.com/anthropics/anthropic-sdk-typescript/issues/404)) ([f60e2d8](https://github.com/anthropics/anthropic-sdk-typescript/commit/f60e2d81bb241063507d2d7e728c78e78c1c5e51))
240: 
241: ## 0.9.6 (2024-04-09)
242: 
243: Full Changelog: [bedrock-sdk-v0.9.5...bedrock-sdk-v0.9.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.5...bedrock-sdk-v0.9.6)
244: 
245: ### Chores
246: 
247: * **internal:** update lock files ([#377](https://github.com/anthropics/anthropic-sdk-typescript/issues/377)) ([6d239ef](https://github.com/anthropics/anthropic-sdk-typescript/commit/6d239efaca730baba374a1b49f6b1a4037b3e163))
248: 
249: ## 0.9.5 (2024-04-04)
250: 
251: Full Changelog: [bedrock-sdk-v0.9.4...bedrock-sdk-v0.9.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.4...bedrock-sdk-v0.9.5)
252: 
253: ### Documentation
254: 
255: * **readme:** mention tool use ([#375](https://github.com/anthropics/anthropic-sdk-typescript/issues/375)) ([72356dd](https://github.com/anthropics/anthropic-sdk-typescript/commit/72356dd9c498344074c292ffdab602d54c4fa13e))
256: 
257: ## 0.9.4 (2024-04-04)
258: 
259: Full Changelog: [bedrock-sdk-v0.9.3...bedrock-sdk-v0.9.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.3...bedrock-sdk-v0.9.4)
260: 
261: ### Bug Fixes
262: 
263: * **types:** correctly mark type as a required property in requests ([#371](https://github.com/anthropics/anthropic-sdk-typescript/issues/371)) ([a04edd8](https://github.com/anthropics/anthropic-sdk-typescript/commit/a04edd8d7f4c552281b37a44099edf432d7fcb27))
264: 
265: ## 0.9.3 (2024-04-04)
266: 
267: Full Changelog: [bedrock-sdk-v0.9.2...bedrock-sdk-v0.9.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.2...bedrock-sdk-v0.9.3)
268: 
269: ### Chores
270: 
271: * **deps:** remove unused dependency digest-fetch ([#368](https://github.com/anthropics/anthropic-sdk-typescript/issues/368)) ([df1df0f](https://github.com/anthropics/anthropic-sdk-typescript/commit/df1df0f509682841c703fa1ea5062a796cfe2091))
272: 
273: ## 0.9.2 (2024-03-29)
274: 
275: Full Changelog: [bedrock-sdk-v0.9.1...bedrock-sdk-v0.9.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.1...bedrock-sdk-v0.9.2)
276: 
277: ### Documentation
278: 
279: * **bedrock:** fix dead link ([#356](https://github.com/anthropics/anthropic-sdk-typescript/issues/356)) ([a953e00](https://github.com/anthropics/anthropic-sdk-typescript/commit/a953e0070698f3238b728ffe06a056a9f2d6b7ff))
280: 
281: ## 0.9.1 (2024-03-06)
282: 
283: Full Changelog: [bedrock-sdk-v0.9.0...bedrock-sdk-v0.9.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.9.0...bedrock-sdk-v0.9.1)
284: 
285: ### Documentation
286: 
287: * remove extraneous --save and yarn install instructions ([#323](https://github.com/anthropics/anthropic-sdk-typescript/issues/323)) ([775ecb9](https://github.com/anthropics/anthropic-sdk-typescript/commit/775ecb9ef3ab17e88dabc149faa0876cd6ab5f0b))
288: 
289: ## 0.9.0 (2024-03-04)
290: 
291: Full Changelog: [bedrock-sdk-v0.8.0...bedrock-sdk-v0.9.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.8.0...bedrock-sdk-v0.9.0)
292: 
293: ### Features
294: 
295: * **bedrock:** add messages API ([#305](https://github.com/anthropics/anthropic-sdk-typescript/issues/305)) ([8b7f89e](https://github.com/anthropics/anthropic-sdk-typescript/commit/8b7f89e1e60416f9ad5b575d43238a4259654395))
296: 
297: ## 0.8.0 (2024-03-04)
298: 
299: Full Changelog: [bedrock-sdk-v0.7.1...bedrock-sdk-v0.8.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.7.1...bedrock-sdk-v0.8.0)
300: 
301: ### Features
302: 
303: * **messages:** add support for image inputs ([#303](https://github.com/anthropics/anthropic-sdk-typescript/issues/303)) ([7663bd6](https://github.com/anthropics/anthropic-sdk-typescript/commit/7663bd6e1a4427483cf5f13889bc5c63314e5bae))
304: 
305: ## 0.7.1 (2024-01-31)
306: 
307: Full Changelog: [bedrock-sdk-v0.7.0...bedrock-sdk-v0.7.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/bedrock-sdk-v0.7.0...bedrock-sdk-v0.7.1)
308: 
309: ### Chores
310: 
311: * **bedrock:** move bedrock SDK to the main repo ([#274](https://github.com/anthropics/anthropic-sdk-typescript/issues/274)) ([1a565fe](https://github.com/anthropics/anthropic-sdk-typescript/commit/1a565feddd19c3dbe62f087fc9f13520bb69fc0e))
312: * release main ([6679340](https://github.com/anthropics/anthropic-sdk-typescript/commit/6679340c68b7f1599e5a9a543371f7426f96307a))
313: 
314: ## 0.7.0 (2024-01-31)
315: 
316: This release restructures the SDK so that it relies on the main `@anthropic-ai/sdk` instead of duplicating everything.
317: 
318: - All subpath imports are broken, e.g. `import { Completion } from '@anthropic-ai/bedrock-sdk/resources/completions'`
319: - Types are no longer exported through the default import, e.g. `AnthropicBedrock.Completion`
320:   - e.g. AnthropicBedrock.APIError, AnthropicBedrock.HUMAN_PROMPT
321: 
322: However, these are all an straightforward fixes, you just have to replace `@anthropic-ai/bedrock-sdk` with `@anthropic-ai/sdk`, e.g.
323: 
324: ```diff
325: - import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
326: + import Anthropic from '@anthropic-ai/sdk';
327: 
328: - type Completion = AnthropicBedrock.Completion;
329: + type Completion = Anthropic.Completion;
330: ```
331: 
332: ## 0.6.5 (2024-01-30)
333: 
334: Full Changelog: [v0.6.4...v0.6.5](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.6.4...v0.6.5)
335: 
336: ### Chores
337: 
338: * **internal:** support pre-release versioning ([#77](https://github.com/anthropics/anthropic-bedrock-typescript/issues/77)) ([b96f745](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b96f745cf406677a552c863b2c5ee967f3353919))
339: 
340: ## 0.6.4 (2024-01-25)
341: 
342: Full Changelog: [v0.6.3...v0.6.4](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.6.3...v0.6.4)
343: 
344: ### Chores
345: 
346: * **internal:** add internal helpers & improve build scripts ([#73](https://github.com/anthropics/anthropic-bedrock-typescript/issues/73)) ([d12b655](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d12b655286e3677e4a24a5616bb633b553fa5784))
347: * **internal:** don't re-export streaming type ([#76](https://github.com/anthropics/anthropic-bedrock-typescript/issues/76)) ([92fb967](https://github.com/anthropics/anthropic-bedrock-typescript/commit/92fb967c40d8c730441fc3b42bef92bc478436aa))
348: * **internal:** minor streaming updates ([#75](https://github.com/anthropics/anthropic-bedrock-typescript/issues/75)) ([73bac4c](https://github.com/anthropics/anthropic-bedrock-typescript/commit/73bac4c4f2f6edc4b7a72274cd3146c5821b53a8))
349: 
350: ## 0.6.3 (2024-01-19)
351: 
352: Full Changelog: [v0.6.2...v0.6.3](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.6.2...v0.6.3)
353: 
354: ### Bug Fixes
355: 
356: * allow body type in RequestOptions to be null ([#71](https://github.com/anthropics/anthropic-bedrock-typescript/issues/71)) ([a04f753](https://github.com/anthropics/anthropic-bedrock-typescript/commit/a04f7538e789324cebcea61476c1d745bbfc30cf))
357: 
358: ## 0.6.2 (2024-01-18)
359: 
360: Full Changelog: [v0.6.1...v0.6.2](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.6.1...v0.6.2)
361: 
362: ### Bug Fixes
363: 
364: * **ci:** ignore stainless-app edits to release PR title ([#70](https://github.com/anthropics/anthropic-bedrock-typescript/issues/70)) ([c3a058c](https://github.com/anthropics/anthropic-bedrock-typescript/commit/c3a058cccfdc0f0db1fbf06c57c13374bad58015))
365: * **headers:** always send lowercase headers and strip undefined (BREAKING in rare cases) ([#60](https://github.com/anthropics/anthropic-bedrock-typescript/issues/60)) ([9cc4518](https://github.com/anthropics/anthropic-bedrock-typescript/commit/9cc4518ebd41d6ee438e686f4d0da2629e511796))
366: * **types:** accept undefined for optional client options ([#69](https://github.com/anthropics/anthropic-bedrock-typescript/issues/69)) ([cf597f6](https://github.com/anthropics/anthropic-bedrock-typescript/commit/cf597f6384337109011cd7d920b6a6530cdef74f))
367: * use default base url if BASE_URL env var is blank ([#64](https://github.com/anthropics/anthropic-bedrock-typescript/issues/64)) ([134bf8f](https://github.com/anthropics/anthropic-bedrock-typescript/commit/134bf8f35d6071224280c9bed6151e107fee3c93))
368: 
369: 
370: ### Chores
371: 
372: * add .keep files for examples and custom code directories ([#63](https://github.com/anthropics/anthropic-bedrock-typescript/issues/63)) ([0064f30](https://github.com/anthropics/anthropic-bedrock-typescript/commit/0064f3035cf4a11645c632abf1e026ee27ac92a2))
373: * **internal:** debug logging for retries; speculative retry-after-ms support ([#68](https://github.com/anthropics/anthropic-bedrock-typescript/issues/68)) ([e6a95f6](https://github.com/anthropics/anthropic-bedrock-typescript/commit/e6a95f644a300c5e3d5856edcaf98c60c953e461))
374: * **internal:** improve type signatures ([#62](https://github.com/anthropics/anthropic-bedrock-typescript/issues/62)) ([6e24bdc](https://github.com/anthropics/anthropic-bedrock-typescript/commit/6e24bdc7ee82252243c0f83c68c5b6a363d756fc))
375: * **internal:** narrow type into stringifyQuery ([#65](https://github.com/anthropics/anthropic-bedrock-typescript/issues/65)) ([443febf](https://github.com/anthropics/anthropic-bedrock-typescript/commit/443febf02c4c71b28934a776da0198fdd094de8f))
376: 
377: 
378: ### Documentation
379: 
380: * fix missing async in readme code sample ([#67](https://github.com/anthropics/anthropic-bedrock-typescript/issues/67)) ([a6d20eb](https://github.com/anthropics/anthropic-bedrock-typescript/commit/a6d20eb8d3d4c6be9d92afd4eb7d93ea5c661094))
381: * **readme:** improve api reference ([#66](https://github.com/anthropics/anthropic-bedrock-typescript/issues/66)) ([f90bbaf](https://github.com/anthropics/anthropic-bedrock-typescript/commit/f90bbaf631e9ac34fb613a43ece1f489d82f04b8))
382: 
383: ## 0.6.1 (2023-12-20)
384: 
385: Full Changelog: [v0.6.0...v0.6.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.6.0...v0.6.1)
386: 
387: ### Chores
388: 
389: * **ci:** run release workflow once per day ([#54](https://github.com/anthropics/anthropic-bedrock-typescript/issues/54)) ([b5072dd](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b5072ddc0c068737cdca2dd6ecfcb231ac7edc1b))
390: * **deps:** update dependency ts-jest to v29.1.1 ([#55](https://github.com/anthropics/anthropic-bedrock-typescript/issues/55)) ([946a832](https://github.com/anthropics/anthropic-bedrock-typescript/commit/946a8326410b47143f2c9e611e6b62866d5d9734))
391: * **deps:** update jest ([#56](https://github.com/anthropics/anthropic-bedrock-typescript/issues/56)) ([492232d](https://github.com/anthropics/anthropic-bedrock-typescript/commit/492232de92f7d79b42869ca619cc85ae4a1b7966))
392: * **internal:** update test examples ([#50](https://github.com/anthropics/anthropic-bedrock-typescript/issues/50)) ([33132ea](https://github.com/anthropics/anthropic-bedrock-typescript/commit/33132eaab93f2fa39cc9e975df0b0323bb486395))
393: * update dependencies ([#53](https://github.com/anthropics/anthropic-bedrock-typescript/issues/53)) ([4a72bd7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/4a72bd7f857a7024ff0e8caf574e92998431f4f3))
394: * update prettier ([#52](https://github.com/anthropics/anthropic-bedrock-typescript/issues/52)) ([acfe9e4](https://github.com/anthropics/anthropic-bedrock-typescript/commit/acfe9e46299275fc14c9a704c7c048c87e0e33db))
395: 
396: 
397: ### Documentation
398: 
399: * reformat README.md ([#58](https://github.com/anthropics/anthropic-bedrock-typescript/issues/58)) ([050b328](https://github.com/anthropics/anthropic-bedrock-typescript/commit/050b328725d37f5a0876704b5754953967495ada))
400: 
401: 
402: ### Refactors
403: 
404: * write jest config in typescript ([#57](https://github.com/anthropics/anthropic-bedrock-typescript/issues/57)) ([bbaa155](https://github.com/anthropics/anthropic-bedrock-typescript/commit/bbaa155e6377283a12258a470d4d10da3d9ebe54))
405: 
406: 
407: ### Build System
408: 
409: * specify `packageManager: yarn` ([#51](https://github.com/anthropics/anthropic-bedrock-typescript/issues/51)) ([59453e5](https://github.com/anthropics/anthropic-bedrock-typescript/commit/59453e581ad770fb1d12a7458774d7427d0b90de))
410: 
411: ## 0.6.0 (2023-12-06)
412: 
413: Full Changelog: [v0.5.2...v0.6.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.2...v0.6.0)
414: 
415: ### Features
416: 
417: * **client:** support reading the base url from an env variable ([#43](https://github.com/anthropics/anthropic-bedrock-typescript/issues/43)) ([783e9a1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/783e9a1c6bacbc18028ee5e052758103e7c89453))
418: 
419: 
420: ### Bug Fixes
421: 
422: * bump default request timeout to 10min to match documentation ([#47](https://github.com/anthropics/anthropic-bedrock-typescript/issues/47)) ([16d2d96](https://github.com/anthropics/anthropic-bedrock-typescript/commit/16d2d960dfb8076bb41d769a35aeaec564177238))
423: 
424: ## 0.5.2 (2023-11-28)
425: 
426: Full Changelog: [v0.5.1...v0.5.2](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.1...v0.5.2)
427: 
428: ## 0.5.1 (2023-11-24)
429: 
430: Full Changelog: [v0.5.0...v0.5.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.0...v0.5.1)
431: 
432: ### Chores
433: 
434: * **internal:** remove file import and conditionally run prepare ([#39](https://github.com/anthropics/anthropic-bedrock-typescript/issues/39)) ([546295e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/546295e63e5d0c373f7f84d36b98cf8094c2c5c8))
435: 
436: ## 0.5.0 (2023-11-21)
437: 
438: Full Changelog: [v0.4.1...v0.5.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.4.1...v0.5.0)
439: 
440: ### Features
441: 
442: * allow installing package directly from github ([#37](https://github.com/anthropics/anthropic-bedrock-typescript/issues/37)) ([758b62f](https://github.com/anthropics/anthropic-bedrock-typescript/commit/758b62f86b7d62229f9f41c931c03eebc16d03fc))
443: 
444: 
445: ### Chores
446: 
447: * **ci:** fix publish-npm ([#35](https://github.com/anthropics/anthropic-bedrock-typescript/issues/35)) ([03ca66d](https://github.com/anthropics/anthropic-bedrock-typescript/commit/03ca66d6a9b9d7fcc7f930c62535d162e46917ea))
448: * **internal:** don't call prepare in dist ([#38](https://github.com/anthropics/anthropic-bedrock-typescript/issues/38)) ([21038f6](https://github.com/anthropics/anthropic-bedrock-typescript/commit/21038f62cf3dafda7cf9f79d5694bd2e89392bc6))
449: 
450: ## 0.4.1 (2023-11-14)
451: 
452: Full Changelog: [v0.4.0...v0.4.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.4.0...v0.4.1)
453: 
454: ### Chores
455: 
456: * **ci:** update release-please config ([#29](https://github.com/anthropics/anthropic-bedrock-typescript/issues/29)) ([9f932f7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/9f932f7091d3c0a31c650d326c7669ee90c534ee))
457: * **docs:** fix github links ([#31](https://github.com/anthropics/anthropic-bedrock-typescript/issues/31)) ([8c433fd](https://github.com/anthropics/anthropic-bedrock-typescript/commit/8c433fdde7c618afc7b5ecd32c85eb06dd0f048b))
458: * **internal:** update APIResource structure ([#34](https://github.com/anthropics/anthropic-bedrock-typescript/issues/34)) ([c85a2e3](https://github.com/anthropics/anthropic-bedrock-typescript/commit/c85a2e3bfa8d95ea2d7444d32ba884984b7e61e7))
459: * **internal:** update jest config ([#33](https://github.com/anthropics/anthropic-bedrock-typescript/issues/33)) ([a46da67](https://github.com/anthropics/anthropic-bedrock-typescript/commit/a46da679e8f40600fa37c0de3a90c633b78356eb))
460: * **internal:** update tsconfig ([#32](https://github.com/anthropics/anthropic-bedrock-typescript/issues/32)) ([b9295df](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b9295dff2a3aa721f057d64dfc41eaf7d6bd0f6c))
461: 
462: ## 0.4.0 (2023-11-04)
463: 
464: Full Changelog: [v0.3.0...v0.4.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.3.0...v0.4.0)
465: 
466: ### Features
467: 
468: * **client:** allow binary returns ([#27](https://github.com/anthropics/anthropic-bedrock-typescript/issues/27)) ([d9e84a1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d9e84a1f8d25d43f3eb256723bfb89cf0d354453))
469: * **github:** include a devcontainer setup ([#26](https://github.com/anthropics/anthropic-bedrock-typescript/issues/26)) ([c37cf14](https://github.com/anthropics/anthropic-bedrock-typescript/commit/c37cf14409464bceeacb97cb6f8e098a1bfefd2d))
470: 
471: 
472: ### Chores
473: 
474: * **internal:** update gitignore ([#22](https://github.com/anthropics/anthropic-bedrock-typescript/issues/22)) ([d448991](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d448991a6f24c0a50f686380957473bfa2cd13b7))
475: * small cleanups ([#25](https://github.com/anthropics/anthropic-bedrock-typescript/issues/25)) ([d18cfcb](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d18cfcb28428ca944b423ea515d046720553c28d))
476: 
477: 
478: ### Documentation
479: 
480: * document customizing fetch ([#28](https://github.com/anthropics/anthropic-bedrock-typescript/issues/28)) ([878bd1b](https://github.com/anthropics/anthropic-bedrock-typescript/commit/878bd1b240dc319e3ab37b7e8b4fe96eb155688a))
481: * fix github links ([#24](https://github.com/anthropics/anthropic-bedrock-typescript/issues/24)) ([9560ba7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/9560ba7c165d373a23d77d8d14a864845e2dc721))
482: 
483: ## 0.3.0 (2023-10-25)
484: 
485: Full Changelog: [v0.2.0...v0.3.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.2.0...v0.3.0)
486: 
487: ### Features
488: 
489: * **client:** adjust retry behavior to be exponential backoff ([#18](https://github.com/anthropics/anthropic-bedrock-typescript/issues/18)) ([51d3a6e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/51d3a6e8ab71ba935bd71b497d83df1896835199))
490: 
491: 
492: ### Bug Fixes
493: 
494: * typo in build script ([#21](https://github.com/anthropics/anthropic-bedrock-typescript/issues/21)) ([b86502d](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b86502d913b2d607c49db9fc1c5656d2a089e7a9))
495: 
496: ## 0.2.0 (2023-10-19)
497: 
498: Full Changelog: [v0.1.2...v0.2.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.2...v0.2.0)
499: 
500: ### Features
501: 
502: * handle 204 No Content gracefully ([#17](https://github.com/anthropics/anthropic-bedrock-typescript/issues/17)) ([f11420b](https://github.com/anthropics/anthropic-bedrock-typescript/commit/f11420b2a9e2b9a127194bd811708f9f010447b5))
503: 
504: ## 0.1.2 (2023-10-17)
505: 
506: Full Changelog: [v0.1.1...v0.1.2](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.1...v0.1.2)
507: 
508: ### Bug Fixes
509: 
510: * import web-streams-polyfill without overriding globals ([#13](https://github.com/anthropics/anthropic-bedrock-typescript/issues/13)) ([30db709](https://github.com/anthropics/anthropic-bedrock-typescript/commit/30db7098fea0154c8dcb484bfee2ed5c4ec946aa))
511: 
512: ## 0.1.1 (2023-10-16)
513: 
514: Full Changelog: [v0.1.0...v0.1.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.0...v0.1.1)
515: 
516: ### Bug Fixes
517: 
518: * improve status code in error messages ([#9](https://github.com/anthropics/anthropic-bedrock-typescript/issues/9)) ([aa3f1b0](https://github.com/anthropics/anthropic-bedrock-typescript/commit/aa3f1b01ee5d9161c793f3f263fc5b297d1d1258))
519: 
520: 
521: ### Chores
522: 
523: * add case insensitive get header function ([#4](https://github.com/anthropics/anthropic-bedrock-typescript/issues/4)) ([b7309b1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b7309b10201e048f726993c70bbf075f6927cabe))
524: * **internal:** add debug logs for stream responses ([#8](https://github.com/anthropics/anthropic-bedrock-typescript/issues/8)) ([b8763a7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b8763a73376e2a1ddb9073b649d4aacfad27bf69))
525: * update comment ([#6](https://github.com/anthropics/anthropic-bedrock-typescript/issues/6)) ([7361f09](https://github.com/anthropics/anthropic-bedrock-typescript/commit/7361f09aa5430d8dcd8193dc599ea9fa75d17e4e))
526: 
527: 
528: ### Documentation
529: 
530: * organisation -&gt; organization (UK to US English) ([#11](https://github.com/anthropics/anthropic-bedrock-typescript/issues/11)) ([5cbea8e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/5cbea8e9ef936b314617765d7bc2dbb2c3d98eac))
531: 
532: ## 0.1.0 (2023-10-12)
533: 
534: Full Changelog: [v0.0.1...v0.1.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.0.1...v0.1.0)
535: 
536: ### Features
537: 
538: * **init:** initial commit ([#1](https://github.com/anthropics/anthropic-bedrock-typescript/issues/1)) ([17f9073](https://github.com/anthropics/anthropic-bedrock-typescript/commit/17f9073f1545f9f578e67c56f827322a7691ca21))
````

## File: packages/bedrock-sdk/jest.config.ts
````typescript
 1: import type { JestConfigWithTsJest } from 'ts-jest';
 2: 
 3: const config: JestConfigWithTsJest = {
 4:   preset: 'ts-jest/presets/default-esm',
 5:   testEnvironment: 'node',
 6:   transform: {
 7:     '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
 8:   },
 9:   moduleNameMapper: {
10:     '^@anthropic-ai/bedrock-sdk$': '<rootDir>/src/index.ts',
11:     '^@anthropic-ai/bedrock-sdk/(.*)$': '<rootDir>/src/$1',
12:   },
13:   modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/deno/'],
14:   testPathIgnorePatterns: ['scripts'],
15: };
16: 
17: export default config;
````

## File: packages/bedrock-sdk/package.json
````json
 1: {
 2:   "name": "@anthropic-ai/bedrock-sdk",
 3:   "version": "0.22.1",
 4:   "description": "The official TypeScript library for the Anthropic Bedrock API",
 5:   "author": "Anthropic <support@anthropic.com>",
 6:   "types": "dist/index.d.ts",
 7:   "main": "dist/index.js",
 8:   "type": "commonjs",
 9:   "repository": "github:anthropics/anthropic-sdk-typescript",
10:   "license": "MIT",
11:   "packageManager": "yarn@1.22.21",
12:   "private": false,
13:   "scripts": {
14:     "test": "jest",
15:     "build": "bash ./build",
16:     "prepack": "echo 'to pack, run yarn build && (cd dist; yarn pack)' && exit 1",
17:     "prepublishOnly": "echo 'to publish, run yarn build && (cd dist; yarn publish)' && exit 1",
18:     "format": "prettier --write --cache --cache-strategy metadata . !dist",
19:     "prepare": "if [ $(basename $(dirname $PWD)) = 'node_modules' ]; then npm run build; fi",
20:     "tsn": "ts-node -r tsconfig-paths/register",
21:     "lint": "eslint --ext ts,js .",
22:     "fix": "eslint --fix --ext ts,js ."
23:   },
24:   "dependencies": {
25:     "@anthropic-ai/sdk": "file:../../dist/",
26:     "@aws-crypto/sha256-js": "^4.0.0",
27:     "@aws-sdk/client-bedrock-runtime": "^3.797.0",
28:     "@aws-sdk/credential-providers": "^3.796.0",
29:     "@smithy/eventstream-serde-node": "^2.0.10",
30:     "@smithy/fetch-http-handler": "^2.2.1",
31:     "@smithy/protocol-http": "^3.0.6",
32:     "@smithy/signature-v4": "^3.1.1",
33:     "@smithy/smithy-client": "^2.1.9",
34:     "@smithy/types": "^2.3.4",
35:     "@smithy/util-base64": "^2.0.0"
36:   },
37:   "devDependencies": {
38:     "@swc/core": "^1.3.101",
39:     "@swc/jest": "^0.2.29",
40:     "@types/node": "^20.17.6",
41:     "@types/jest": "^29.4.0",
42:     "@typescript-eslint/eslint-plugin": "^6.7.0",
43:     "@typescript-eslint/parser": "^6.7.0",
44:     "eslint": "^8.49.0",
45:     "eslint-plugin-prettier": "^5.0.1",
46:     "eslint-plugin-unused-imports": "^3.0.0",
47:     "jest": "^29.4.0",
48:     "prettier": "^3.0.0",
49:     "ts-jest": "^29.1.0",
50:     "ts-morph": "^19.0.0",
51:     "ts-node": "^10.5.0",
52:     "tsc-multi": "https://github.com/stainless-api/tsc-multi/releases/download/v1.1.3/tsc-multi.tgz",
53:     "tsconfig-paths": "^4.0.0",
54:     "typescript": "^4.8.2"
55:   },
56:   "imports": {
57:     "@anthropic-ai/bedrock-sdk": ".",
58:     "@anthropic-ai/bedrock-sdk/*": "./src/*"
59:   },
60:   "exports": {
61:     ".": {
62:       "require": {
63:         "types": "./dist/index.d.ts",
64:         "default": "./dist/index.js"
65:       },
66:       "types": "./dist/index.d.mts",
67:       "default": "./dist/index.mjs"
68:     },
69:     "./*.mjs": {
70:       "types": "./dist/*.d.ts",
71:       "default": "./dist/*.mjs"
72:     },
73:     "./*.js": {
74:       "types": "./dist/*.d.ts",
75:       "default": "./dist/*.js"
76:     },
77:     "./*": {
78:       "types": "./dist/*.d.ts",
79:       "require": "./dist/*.js",
80:       "default": "./dist/*.mjs"
81:     }
82:   }
83: }
````

## File: packages/bedrock-sdk/README.md
````markdown
 1: # Anthropic Bedrock TypeScript API Library
 2: 
 3: [![NPM version](https://img.shields.io/npm/v/@anthropic-ai/bedrock-sdk.svg)](https://npmjs.org/package/@anthropic-ai/bedrock-sdk)
 4: 
 5: This library provides convenient access to the Anthropic Bedrock API.
 6: 
 7: For the non-Bedrock Anthropic API at api.anthropic.com, see [`@anthropic-ai/sdk`](https://github.com/anthropics/anthropic-sdk-typescript).
 8: 
 9: ## Installation
10: 
11: ```sh
12: npm install @anthropic-ai/bedrock-sdk
13: ```
14: 
15: ## Usage
16: 
17: <!-- prettier-ignore -->
18: ```js
19: import { AnthropicBedrock } from '@anthropic-ai/bedrock-sdk';
20: 
21: // Note: this assumes you have configured AWS credentials in a way
22: // that the AWS Node SDK will recognise, typicaly a shared `~/.aws/credentials`
23: // file or `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables.
24: //
25: // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
26: const client = new AnthropicBedrock();
27: 
28: async function main() {
29:   const message = await client.messages.create({
30:     model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
31:     messages: [
32:       {
33:         role: 'user',
34:         content: 'Hello!',
35:       },
36:     ],
37:     max_tokens: 1024,
38:   });
39:   console.log(message);
40: }
41: 
42: main();
43: ```
44: 
45: For more details on how to use the SDK, see the [README.md for the main Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript/tree/main#anthropic-typescript-api-library) which this library extends.
46: 
47: ## Requirements
48: 
49: TypeScript >= 4.5 is supported.
50: 
51: The following runtimes are supported:
52: 
53: - Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
54: - Deno v1.28.0 or higher, using `import { AnthropicBedrock } from "npm:@anthropic-ai/bedrock-sdk"`.
55: - Bun 1.0 or later.
56: - Cloudflare Workers.
57: - Vercel Edge Runtime.
58: - Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
59: - Nitro v2.6 or greater.
60: 
61: Note that React Native is not supported at this time.
62: 
63: If you are interested in other runtime environments, please open or upvote an issue on GitHub.
````

## File: packages/bedrock-sdk/tsc-multi.json
````json
1: {
2:   "targets": [
3:     { "extname": ".js", "module": "commonjs" },
4:     { "extname": ".mjs", "module": "esnext" }
5:   ],
6:   "projects": ["tsconfig.build.json"]
7: }
````

## File: packages/bedrock-sdk/tsconfig.build.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["dist/src"],
 4:   "exclude": ["dist/src/internal/detect-platform.ts"],
 5:   "compilerOptions": {
 6:     "rootDir": "./dist/src",
 7:     "paths": {
 8:       "@anthropic-ai/bedrock-sdk/*": ["src/*"],
 9:       "@anthropic-ai/bedrock-sdk": ["src/index.ts"]
10:     },
11:     "noEmit": false,
12:     "declaration": true,
13:     "declarationMap": true,
14:     "outDir": "dist",
15:     "pretty": true,
16:     "sourceMap": true
17:   }
18: }
````

## File: packages/bedrock-sdk/tsconfig.deno.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["deno"],
 4:   "exclude": [],
 5:   "compilerOptions": {
 6:     "rootDir": "./deno",
 7:     "lib": ["es2020", "DOM"],
 8:     "paths": {
 9:       "@anthropic-ai/bedrock-sdk/*": ["src/*"],
10:       "@anthropic-ai/bedrock-sdk": ["src/index.ts"]
11:     },
12:     "noEmit": true,
13:     "declaration": true,
14:     "declarationMap": true,
15:     "outDir": "deno",
16:     "pretty": true,
17:     "sourceMap": true
18:   }
19: }
````

## File: packages/bedrock-sdk/tsconfig.dist-src.json
````json
 1: {
 2:   // this config is included in the published src directory to prevent TS errors
 3:   // from appearing when users go to source, and VSCode opens the source .ts file
 4:   // via declaration maps
 5:   "include": ["index.ts"],
 6:   "compilerOptions": {
 7:     "target": "ES2015",
 8:     "lib": ["DOM", "DOM.Iterable", "ES2018"],
 9:     "moduleResolution": "node"
10:   }
11: }
````

## File: packages/bedrock-sdk/tsconfig.json
````json
 1: {
 2:   "include": ["src", "tests", "examples"],
 3:   "exclude": ["dist/src/internal/detect-platform.ts"],
 4:   "compilerOptions": {
 5:     "target": "es2020",
 6:     "lib": ["es2020"],
 7:     "module": "commonjs",
 8:     "moduleResolution": "node",
 9:     "esModuleInterop": true,
10:     "baseUrl": "./",
11:     "paths": {
12:       "@anthropic-ai/bedrock-sdk/*": ["src/*"],
13:       "@anthropic-ai/bedrock-sdk": ["src/index.ts"]
14:     },
15:     "noEmit": true,
16: 
17:     "resolveJsonModule": true,
18: 
19:     "forceConsistentCasingInFileNames": true,
20: 
21:     "strict": true,
22:     "noImplicitAny": true,
23:     "strictNullChecks": true,
24:     "strictFunctionTypes": true,
25:     "strictBindCallApply": true,
26:     "strictPropertyInitialization": true,
27:     "noImplicitThis": true,
28:     "noImplicitReturns": true,
29:     "alwaysStrict": true,
30:     "exactOptionalPropertyTypes": true,
31:     "noUncheckedIndexedAccess": true,
32:     "noImplicitOverride": true,
33:     "noPropertyAccessFromIndexSignature": true,
34: 
35:     "skipLibCheck": true
36:   }
37: }
````

## File: packages/vertex-sdk/examples/vertex.ts
````typescript
 1: #!/usr/bin/env -S npm run tsn -T
 2: 
 3: import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';
 4: 
 5: // Reads from the `CLOUD_ML_REGION` & `ANTHROPIC_VERTEX_PROJECT_ID`
 6: // environment variables.
 7: const client = new AnthropicVertex();
 8: 
 9: async function main() {
10:   const result = await client.messages.create({
11:     messages: [
12:       {
13:         role: 'user',
14:         content: 'Hello!',
15:       },
16:     ],
17:     model: 'claude-3-5-sonnet-v2@20241022',
18:     max_tokens: 300,
19:   });
20:   console.log(JSON.stringify(result, null, 2));
21: }
22: 
23: main().catch((err) => {
24:   console.error(err);
25:   process.exit(1);
26: });
````

## File: packages/vertex-sdk/scripts/postprocess-dist-package-json.cjs
````
 1: const fs = require('fs');
 2: const pkgJson = require('../dist/package.json');
 3: 
 4: for (const dep in pkgJson.dependencies) {
 5:   // ensure we point to NPM instead of a local directory
 6:   if (dep === '@anthropic-ai/sdk') {
 7:     pkgJson.dependencies[dep] = '>=0.50.3 <1';
 8:   }
 9: }
10: 
11: fs.writeFileSync('dist/package.json', JSON.stringify(pkgJson, null, 2));
````

## File: packages/vertex-sdk/src/core/error.ts
````typescript
1: export * from '@anthropic-ai/sdk/core/error';
````

## File: packages/vertex-sdk/src/core/pagination.ts
````typescript
1: export * from '@anthropic-ai/sdk/core/pagination';
````

## File: packages/vertex-sdk/src/core/streaming.ts
````typescript
1: export * from '@anthropic-ai/sdk/core/streaming';
````

## File: packages/vertex-sdk/src/client.ts
````typescript
  1: import { BaseAnthropic, ClientOptions as CoreClientOptions } from '@anthropic-ai/sdk/client';
  2: import * as Resources from '@anthropic-ai/sdk/resources/index';
  3: import { GoogleAuth } from 'google-auth-library';
  4: import { readEnv } from './internal/utils/env';
  5: import { FinalRequestOptions } from './internal/request-options';
  6: import { FinalizedRequestInit } from './internal/types';
  7: import { isObj } from './internal/utils/values';
  8: import { buildHeaders } from './internal/headers';
  9: 
 10: export { BaseAnthropic } from '@anthropic-ai/sdk/client';
 11: 
 12: const DEFAULT_VERSION = 'vertex-2023-10-16';
 13: const MODEL_ENDPOINTS = new Set<string>(['/v1/messages', '/v1/messages?beta=true']);
 14: 
 15: export type ClientOptions = Omit<CoreClientOptions, 'apiKey' | 'authToken'> & {
 16:   region?: string | null | undefined;
 17:   projectId?: string | null | undefined;
 18:   accessToken?: string | null | undefined;
 19: 
 20:   /**
 21:    * Override the default google auth config using the
 22:    * [google-auth-library](https://www.npmjs.com/package/google-auth-library) package.
 23:    *
 24:    * Note that you'll likely have to set `scopes`, e.g.
 25:    * ```ts
 26:    * new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' })
 27:    * ```
 28:    */
 29:   googleAuth?: GoogleAuth | null | undefined;
 30: };
 31: 
 32: export class AnthropicVertex extends BaseAnthropic {
 33:   region: string;
 34:   projectId: string | null;
 35:   accessToken: string | null;
 36: 
 37:   private _auth: GoogleAuth;
 38:   private _authClientPromise: ReturnType<GoogleAuth['getClient']>;
 39: 
 40:   /**
 41:    * API Client for interfacing with the Anthropic Vertex API.
 42:    *
 43:    * @param {string | null} opts.accessToken
 44:    * @param {string | null} opts.projectId
 45:    * @param {GoogleAuth} opts.googleAuth - Override the default google auth config
 46:    * @param {string | null} [opts.region=process.env['CLOUD_ML_REGION']]
 47:    * @param {string} [opts.baseURL=process.env['ANTHROPIC_VERTEX__BASE_URL'] ?? https://${region}-aiplatform.googleapis.com/v1] - Override the default base URL for the API.
 48:    * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
 49:    * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
 50:    * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
 51:    * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
 52:    * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
 53:    * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
 54:    * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
 55:    */
 56:   constructor({
 57:     baseURL = readEnv('ANTHROPIC_VERTEX_BASE_URL'),
 58:     region = readEnv('CLOUD_ML_REGION') ?? null,
 59:     projectId = readEnv('ANTHROPIC_VERTEX_PROJECT_ID') ?? null,
 60:     ...opts
 61:   }: ClientOptions = {}) {
 62:     if (!region) {
 63:       throw new Error(
 64:         'No region was given. The client should be instantiated with the `region` option or the `CLOUD_ML_REGION` environment variable should be set.',
 65:       );
 66:     }
 67: 
 68:     super({
 69:       baseURL: baseURL || `https://${region}-aiplatform.googleapis.com/v1`,
 70:       ...opts,
 71:     });
 72: 
 73:     this.region = region;
 74:     this.projectId = projectId;
 75:     this.accessToken = opts.accessToken ?? null;
 76: 
 77:     this._auth =
 78:       opts.googleAuth ?? new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
 79:     this._authClientPromise = this._auth.getClient();
 80:   }
 81: 
 82:   messages: MessagesResource = makeMessagesResource(this);
 83:   beta: BetaResource = makeBetaResource(this);
 84: 
 85:   protected override validateHeaders() {
 86:     // auth validation is handled in prepareOptions since it needs to be async
 87:   }
 88: 
 89:   protected override async prepareOptions(options: FinalRequestOptions): Promise<void> {
 90:     const authClient = await this._authClientPromise;
 91: 
 92:     const authHeaders = await authClient.getRequestHeaders();
 93:     const projectId = authClient.projectId ?? authHeaders['x-goog-user-project'];
 94:     if (!this.projectId && projectId) {
 95:       this.projectId = projectId;
 96:     }
 97: 
 98:     options.headers = buildHeaders([authHeaders, options.headers]);
 99:   }
100: 
101:   override buildRequest(options: FinalRequestOptions): {
102:     req: FinalizedRequestInit;
103:     url: string;
104:     timeout: number;
105:   } {
106:     if (isObj(options.body)) {
107:       // create a shallow copy of the request body so that code that mutates it later
108:       // doesn't mutate the original user-provided object
109:       options.body = { ...options.body };
110:     }
111: 
112:     if (isObj(options.body)) {
113:       if (!options.body['anthropic_version']) {
114:         options.body['anthropic_version'] = DEFAULT_VERSION;
115:       }
116:     }
117: 
118:     if (MODEL_ENDPOINTS.has(options.path) && options.method === 'post') {
119:       if (!this.projectId) {
120:         throw new Error(
121:           'No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.',
122:         );
123:       }
124: 
125:       if (!isObj(options.body)) {
126:         throw new Error('Expected request body to be an object for post /v1/messages');
127:       }
128: 
129:       const model = options.body['model'];
130:       options.body['model'] = undefined;
131: 
132:       const stream = options.body['stream'] ?? false;
133: 
134:       const specifier = stream ? 'streamRawPredict' : 'rawPredict';
135: 
136:       options.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/${model}:${specifier}`;
137:     }
138: 
139:     if (
140:       options.path === '/v1/messages/count_tokens' ||
141:       (options.path == '/v1/messages/count_tokens?beta=true' && options.method === 'post')
142:     ) {
143:       if (!this.projectId) {
144:         throw new Error(
145:           'No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.',
146:         );
147:       }
148: 
149:       options.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/count-tokens:rawPredict`;
150:     }
151: 
152:     return super.buildRequest(options);
153:   }
154: }
155: 
156: /**
157:  * The Vertex SDK does not currently support the Batch API.
158:  */
159: type MessagesResource = Omit<Resources.Messages, 'batches'>;
160: 
161: function makeMessagesResource(client: AnthropicVertex): MessagesResource {
162:   const resource = new Resources.Messages(client);
163: 
164:   // @ts-expect-error we're deleting non-optional properties
165:   delete resource.batches;
166: 
167:   return resource;
168: }
169: 
170: /**
171:  * The Vertex API does not currently support the Batch API.
172:  */
173: type BetaResource = Omit<Resources.Beta, 'messages'> & {
174:   messages: Omit<Resources.Beta['messages'], 'batches'>;
175: };
176: 
177: function makeBetaResource(client: AnthropicVertex): BetaResource {
178:   const resource = new Resources.Beta(client);
179: 
180:   // @ts-expect-error we're deleting non-optional properties
181:   delete resource.messages.batches;
182: 
183:   return resource;
184: }
````

## File: packages/vertex-sdk/src/index.ts
````typescript
1: export * from './client';
2: export { AnthropicVertex as default } from './client';
````

## File: packages/vertex-sdk/CHANGELOG.md
````markdown
  1: # Changelog
  2: 
  3: ## 0.11.4 (2025-05-22)
  4: 
  5: Full Changelog: [vertex-sdk-v0.11.3...vertex-sdk-v0.11.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.11.3...vertex-sdk-v0.11.4)
  6: 
  7: ### Chores
  8: 
  9: * **internal:** version bump ([8ebaf61](https://github.com/anthropics/anthropic-sdk-typescript/commit/8ebaf616d2e5c6aebc153f19a403dde41ab5a9f1))
 10: 
 11: ## 0.11.3 (2025-05-15)
 12: 
 13: Full Changelog: [vertex-sdk-v0.11.2...vertex-sdk-v0.11.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.11.2...vertex-sdk-v0.11.3)
 14: 
 15: ## 0.11.2 (2025-05-09)
 16: 
 17: Full Changelog: [vertex-sdk-v0.11.1...vertex-sdk-v0.11.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.11.1...vertex-sdk-v0.11.2)
 18: 
 19: ### Bug Fixes
 20: 
 21: * **client:** always overwrite when merging headers ([657912a](https://github.com/anthropics/anthropic-sdk-typescript/commit/657912ad66f86e878291a4cab5436844efbb633b))
 22: 
 23: ## 0.11.1 (2025-05-09)
 24: 
 25: Full Changelog: [vertex-sdk-v0.11.0...vertex-sdk-v0.11.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.11.0...vertex-sdk-v0.11.1)
 26: 
 27: ### Chores
 28: 
 29: * sync repo ([508e385](https://github.com/anthropics/anthropic-sdk-typescript/commit/508e38511c13ba8842065d0dafbc7f462abe0322))
 30: 
 31: ## 0.11.0 (2025-05-09)
 32: 
 33: Full Changelog: [vertex-sdk-v0.10.0...vertex-sdk-v0.11.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.10.0...vertex-sdk-v0.11.0)
 34: 
 35: ### Features
 36: 
 37: * **api:** add claude-3.7 + support for thinking ([456e7d5](https://github.com/anthropics/anthropic-sdk-typescript/commit/456e7d5ce518d773914e47db4b46ddd9805806bb))
 38: * **api:** add claude-3.7 + support for thinking ([01a985b](https://github.com/anthropics/anthropic-sdk-typescript/commit/01a985bfa732f2bd44b22d652a4fee16f79f9749))
 39: * **vertex:** add beta.messages.create() ([08a8928](https://github.com/anthropics/anthropic-sdk-typescript/commit/08a8928fb1fa701f4330720ea2e9d4db81b6b17a))
 40: * **vertex:** support token counting ([a4a3729](https://github.com/anthropics/anthropic-sdk-typescript/commit/a4a372947b250e195f5c45ffd928a2d966b23f0d))
 41: 
 42: 
 43: ### Bug Fixes
 44: 
 45: * **bedrock,vertex:** update to new SDK version ([cb620bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb620bbb60e64f27168f74db7a48ad8c2d5f953e))
 46: * **vertex,bedrock:** correct build script ([df895a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/df895a7d7cbd51422343fca95ab9f1d58918b2a1))
 47: * **vertex:** add beta.messages.countTokens method ([2cbeabc](https://github.com/anthropics/anthropic-sdk-typescript/commit/2cbeabc6f0175297c98b5d706a0038d793150e8e))
 48: * **vertex:** correct messages beta handling ([a41193d](https://github.com/anthropics/anthropic-sdk-typescript/commit/a41193d112f47faaae88872e8764b631dbad1941))
 49: * **vertex:** don't mutate request body inputs ([2709c1f](https://github.com/anthropics/anthropic-sdk-typescript/commit/2709c1fb255282321fab296e709651a79017fe37))
 50: * **vertex:** remove `anthropic_version` deletion for token counting ([beefeb7](https://github.com/anthropics/anthropic-sdk-typescript/commit/beefeb74060196c564de14ddb6a39734f7b0352e))
 51: 
 52: 
 53: ### Chores
 54: 
 55: * **bedrock,vertex:** remove unsupported countTokens method ([#597](https://github.com/anthropics/anthropic-sdk-typescript/issues/597)) ([6f6db16](https://github.com/anthropics/anthropic-sdk-typescript/commit/6f6db164d2526c2fb272151f4d68140da27ce1ea))
 56: * **internal:** migrate to eslint v9 ([1141664](https://github.com/anthropics/anthropic-sdk-typescript/commit/114166498a54e0b62cd9ea071fc736d714cefde6))
 57: * **vertex:** bump dependency on @anthropic-ai/sdk ([5795a68](https://github.com/anthropics/anthropic-sdk-typescript/commit/5795a681b55ef17d15e504504df143053e8518fa))
 58: 
 59: 
 60: ### Documentation
 61: 
 62: * use latest sonnet in example snippets ([#625](https://github.com/anthropics/anthropic-sdk-typescript/issues/625)) ([a965791](https://github.com/anthropics/anthropic-sdk-typescript/commit/a9657918aaf1246609105cbafaf4bb043b146356))
 63: 
 64: ## 0.10.0 (2025-05-09)
 65: 
 66: Full Changelog: [vertex-sdk-v0.7.0...vertex-sdk-v0.7.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.7.0...vertex-sdk-v0.7.1)
 67: 
 68: ### Bug Fixes
 69: 
 70: * **bedrock,vertex:** update to new SDK version ([cb620bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb620bbb60e64f27168f74db7a48ad8c2d5f953e))
 71: * **vertex,bedrock:** correct build script ([df895a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/df895a7d7cbd51422343fca95ab9f1d58918b2a1))
 72: 
 73: ## 0.7.0 (2025-02-24)
 74: 
 75: Full Changelog: [vertex-sdk-v0.6.4...vertex-sdk-v0.7.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.6.4...vertex-sdk-v0.7.0)
 76: 
 77: ### Features
 78: 
 79: * **api:** add claude-3.7 + support for thinking ([ffab311](https://github.com/anthropics/anthropic-sdk-typescript/commit/ffab3113ddb042951a35d71e571727f8cce184ee))
 80: 
 81: ## 0.6.4 (2025-01-23)
 82: 
 83: Full Changelog: [vertex-sdk-v0.6.3...vertex-sdk-v0.6.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.6.3...vertex-sdk-v0.6.4)
 84: 
 85: ### Chores
 86: 
 87: * **vertex:** bump dependency on @anthropic-ai/sdk ([a1c7fcd](https://github.com/anthropics/anthropic-sdk-typescript/commit/a1c7fcdce081f860cbb1148c3862e3303ddb8a62))
 88: 
 89: ## 0.6.3 (2025-01-21)
 90: 
 91: Full Changelog: [vertex-sdk-v0.6.2...vertex-sdk-v0.6.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.6.2...vertex-sdk-v0.6.3)
 92: 
 93: ### Bug Fixes
 94: 
 95: * **vertex:** add beta.messages.countTokens method ([51d3f23](https://github.com/anthropics/anthropic-sdk-typescript/commit/51d3f23a7cc1bea798cc8e4041e08114ebc3a4eb))
 96: 
 97: 
 98: ### Chores
 99: 
100: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([43dd43c](https://github.com/anthropics/anthropic-sdk-typescript/commit/43dd43c4c8ab69d5a60e59473af7dff5f7799048))
101: 
102: ## 0.6.2 (2024-12-20)
103: 
104: Full Changelog: [vertex-sdk-v0.6.1...vertex-sdk-v0.6.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.6.1...vertex-sdk-v0.6.2)
105: 
106: ### Chores
107: 
108: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([8057b1e](https://github.com/anthropics/anthropic-sdk-typescript/commit/8057b1eb67ccccee042a45f2efe53cccced15682))
109: 
110: ## 0.6.1 (2024-12-17)
111: 
112: Full Changelog: [vertex-sdk-v0.6.0...vertex-sdk-v0.6.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.6.0...vertex-sdk-v0.6.1)
113: 
114: ### Bug Fixes
115: 
116: * **vertex:** remove `anthropic_version` deletion for token counting ([88221be](https://github.com/anthropics/anthropic-sdk-typescript/commit/88221be305d6e13ccf92e6e9cdb00daba45b57db))
117: 
118: ## 0.6.0 (2024-12-17)
119: 
120: Full Changelog: [vertex-sdk-v0.5.2...vertex-sdk-v0.6.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.5.2...vertex-sdk-v0.6.0)
121: 
122: ### Features
123: 
124: * **api:** general availability updates ([#631](https://github.com/anthropics/anthropic-sdk-typescript/issues/631)) ([b5c92e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/b5c92e5b74c370ac3f9ba28e915bd54588a42be0))
125: * **vertex:** support token counting ([9e76b4d](https://github.com/anthropics/anthropic-sdk-typescript/commit/9e76b4dc22d62b1239b382bb771b69ad8cff9442))
126: 
127: 
128: ### Chores
129: 
130: * **bedrock,vertex:** remove unsupported countTokens method ([#597](https://github.com/anthropics/anthropic-sdk-typescript/issues/597)) ([17b7da5](https://github.com/anthropics/anthropic-sdk-typescript/commit/17b7da5ee6f35ea2bdd53a66a662871affae6341))
131: 
132: 
133: ### Documentation
134: 
135: * use latest sonnet in example snippets ([#625](https://github.com/anthropics/anthropic-sdk-typescript/issues/625)) ([f70882b](https://github.com/anthropics/anthropic-sdk-typescript/commit/f70882b0e8119a414b01b9f0b85fbe1ccb06f122))
136: 
137: ## 0.5.2 (2024-11-05)
138: 
139: Full Changelog: [vertex-sdk-v0.5.1...vertex-sdk-v0.5.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.5.1...vertex-sdk-v0.5.2)
140: 
141: ### Bug Fixes
142: 
143: * **vertex:** don't mutate request body inputs ([e9a82e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/e9a82e56f0d7fff956c2ebd19e103a190f8beb83))
144: 
145: ## 0.5.1 (2024-10-23)
146: 
147: Full Changelog: [vertex-sdk-v0.5.0...vertex-sdk-v0.5.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.5.0...vertex-sdk-v0.5.1)
148: 
149: ### Bug Fixes
150: 
151: * **vertex:** correct messages beta handling ([26f21ee](https://github.com/anthropics/anthropic-sdk-typescript/commit/26f21ee5f524f4cbfb7a97d40aa62553608b1d99))
152: 
153: ## 0.5.0 (2024-10-22)
154: 
155: Full Changelog: [vertex-sdk-v0.4.3...vertex-sdk-v0.5.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.4.3...vertex-sdk-v0.5.0)
156: 
157: ### Features
158: 
159: * **vertex:** add beta.messages.create() ([22cfdba](https://github.com/anthropics/anthropic-sdk-typescript/commit/22cfdba2a3a54e916f2efcbce62990544d3e5f5f))
160: 
161: ## 0.4.3 (2024-10-08)
162: 
163: Full Changelog: [vertex-sdk-v0.4.2...vertex-sdk-v0.4.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.4.2...vertex-sdk-v0.4.3)
164: 
165: ### Refactors
166: 
167: * **types:** improve metadata type names ([#547](https://github.com/anthropics/anthropic-sdk-typescript/issues/547)) ([cef499c](https://github.com/anthropics/anthropic-sdk-typescript/commit/cef499cf3b01643f7e5e3c09524f49e198b940be))
168: 
169: ## 0.4.2 (2024-10-04)
170: 
171: Full Changelog: [vertex-sdk-v0.4.1...vertex-sdk-v0.4.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.4.1...vertex-sdk-v0.4.2)
172: 
173: ### Chores
174: 
175: * better object fallback behaviour for casting errors ([#526](https://github.com/anthropics/anthropic-sdk-typescript/issues/526)) ([4ffb2e4](https://github.com/anthropics/anthropic-sdk-typescript/commit/4ffb2e4e1f5fef3ae58d9f4c99a63e75dd459c5b))
176: 
177: ## 0.4.1 (2024-07-29)
178: 
179: Full Changelog: [vertex-sdk-v0.4.0...vertex-sdk-v0.4.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.4.0...vertex-sdk-v0.4.1)
180: 
181: ### Chores
182: 
183: * **internal:** remove old reference to check-test-server ([8dc9afc](https://github.com/anthropics/anthropic-sdk-typescript/commit/8dc9afcf00c4a38c2d85171ebceafc5f6a47c117))
184: 
185: ## 0.4.0 (2024-05-30)
186: 
187: Full Changelog: [vertex-sdk-v0.3.7...vertex-sdk-v0.4.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.7...vertex-sdk-v0.4.0)
188: 
189: ### Features
190: 
191: * **vertex:** support tools ([acf0aa7](https://github.com/anthropics/anthropic-sdk-typescript/commit/acf0aa7571425c8582740616e24883c2ec65218b))
192: 
193: ## 0.3.7 (2024-05-16)
194: 
195: Full Changelog: [vertex-sdk-v0.3.6...vertex-sdk-v0.3.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.6...vertex-sdk-v0.3.7)
196: 
197: ### Chores
198: 
199: * **internal:** fix generated version numbers ([#413](https://github.com/anthropics/anthropic-sdk-typescript/issues/413)) ([ea77063](https://github.com/anthropics/anthropic-sdk-typescript/commit/ea770630897bb85caaecd39bccf478e4dd3f169c))
200: 
201: ## 0.3.6 (2024-05-07)
202: 
203: Full Changelog: [vertex-sdk-v0.3.5...vertex-sdk-v0.3.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.5...vertex-sdk-v0.3.6)
204: 
205: ### Chores
206: 
207: * **internal:** refactor scripts ([#404](https://github.com/anthropics/anthropic-sdk-typescript/issues/404)) ([f60e2d8](https://github.com/anthropics/anthropic-sdk-typescript/commit/f60e2d81bb241063507d2d7e728c78e78c1c5e51))
208: 
209: ## 0.3.5 (2024-04-10)
210: 
211: Full Changelog: [vertex-sdk-v0.3.4...vertex-sdk-v0.3.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.4...vertex-sdk-v0.3.5)
212: 
213: ### Bug Fixes
214: 
215: * **vertex:** correct core client dependency constraint ([#384](https://github.com/anthropics/anthropic-sdk-typescript/issues/384)) ([de29699](https://github.com/anthropics/anthropic-sdk-typescript/commit/de2969902b68b5c46b6e682b8b947426c6ccf195))
216: 
217: ## 0.3.4 (2024-04-09)
218: 
219: Full Changelog: [vertex-sdk-v0.3.3...vertex-sdk-v0.3.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.3...vertex-sdk-v0.3.4)
220: 
221: ### Chores
222: 
223: * **internal:** update lock files ([#377](https://github.com/anthropics/anthropic-sdk-typescript/issues/377)) ([6d239ef](https://github.com/anthropics/anthropic-sdk-typescript/commit/6d239efaca730baba374a1b49f6b1a4037b3e163))
224: 
225: ## 0.3.3 (2024-04-04)
226: 
227: Full Changelog: [vertex-sdk-v0.3.2...vertex-sdk-v0.3.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.2...vertex-sdk-v0.3.3)
228: 
229: ### Documentation
230: 
231: * **readme:** mention tool use ([#375](https://github.com/anthropics/anthropic-sdk-typescript/issues/375)) ([72356dd](https://github.com/anthropics/anthropic-sdk-typescript/commit/72356dd9c498344074c292ffdab602d54c4fa13e))
232: 
233: ## 0.3.2 (2024-04-04)
234: 
235: Full Changelog: [vertex-sdk-v0.3.1...vertex-sdk-v0.3.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.1...vertex-sdk-v0.3.2)
236: 
237: ### Bug Fixes
238: 
239: * **types:** correctly mark type as a required property in requests ([#371](https://github.com/anthropics/anthropic-sdk-typescript/issues/371)) ([a04edd8](https://github.com/anthropics/anthropic-sdk-typescript/commit/a04edd8d7f4c552281b37a44099edf432d7fcb27))
240: 
241: ## 0.3.1 (2024-04-04)
242: 
243: Full Changelog: [vertex-sdk-v0.3.0...vertex-sdk-v0.3.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.3.0...vertex-sdk-v0.3.1)
244: 
245: ### Chores
246: 
247: * **deps:** remove unused dependency digest-fetch ([#368](https://github.com/anthropics/anthropic-sdk-typescript/issues/368)) ([df1df0f](https://github.com/anthropics/anthropic-sdk-typescript/commit/df1df0f509682841c703fa1ea5062a796cfe2091))
248: 
249: ## 0.3.0 (2024-03-19)
250: 
251: Full Changelog: [vertex-sdk-v0.2.2...vertex-sdk-v0.3.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.2.2...vertex-sdk-v0.3.0)
252: 
253: ### Features
254: 
255: * **vertex:** add support for overriding google auth ([#338](https://github.com/anthropics/anthropic-sdk-typescript/issues/338)) ([28d98c4](https://github.com/anthropics/anthropic-sdk-typescript/commit/28d98c487257a3c6b3c6d84597768d484fadb86d))
256: * **vertex:** api is no longer in private beta ([#344](https://github.com/anthropics/anthropic-sdk-typescript/issues/344)) ([892127c](https://github.com/anthropics/anthropic-sdk-typescript/commit/892127cdac059eee11c1a322a5512f9250868023))
257: 
258: ## 0.2.2 (2024-03-13)
259: 
260: Full Changelog: [vertex-sdk-v0.2.1...vertex-sdk-v0.2.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.2.1...vertex-sdk-v0.2.2)
261: 
262: ### Documentation
263: 
264: * update models in vertex examples ([#331](https://github.com/anthropics/anthropic-sdk-typescript/issues/331)) ([3d139b3](https://github.com/anthropics/anthropic-sdk-typescript/commit/3d139b374179ef5540a8e9436df06501c6ada6c5))
265: 
266: ## 0.2.1 (2024-03-06)
267: 
268: Full Changelog: [vertex-sdk-v0.2.0...vertex-sdk-v0.2.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.2.0...vertex-sdk-v0.2.1)
269: 
270: ### Documentation
271: 
272: * remove extraneous --save and yarn install instructions ([#323](https://github.com/anthropics/anthropic-sdk-typescript/issues/323)) ([775ecb9](https://github.com/anthropics/anthropic-sdk-typescript/commit/775ecb9ef3ab17e88dabc149faa0876cd6ab5f0b))
273: 
274: ## 0.2.0 (2024-02-13)
275: 
276: Full Changelog: [vertex-sdk-v0.1.2...vertex-sdk-v0.2.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.1.2...vertex-sdk-v0.2.0)
277: 
278: ### ⚠ BREAKING CHANGES
279: 
280: * **api:** messages is generally available ([#287](https://github.com/anthropics/anthropic-sdk-typescript/issues/287))
281: 
282: ### Features
283: 
284: * **api:** messages is generally available ([#287](https://github.com/anthropics/anthropic-sdk-typescript/issues/287)) ([be0a828](https://github.com/anthropics/anthropic-sdk-typescript/commit/be0a82883cf9b1b9d2944525b86e40f2b42cea4f))
285: 
286: ## 0.1.2 (2024-01-31)
287: 
288: Full Changelog: [vertex-sdk-v0.1.1...vertex-sdk-v0.1.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.1.1...vertex-sdk-v0.1.2)
289: 
290: ### Chores
291: 
292: * release main ([e77e068](https://github.com/anthropics/anthropic-sdk-typescript/commit/e77e0683769ae18084ecda178fb9eb85fc47eb4a))
293: 
294: ## 0.1.1 (2024-01-25)
295: 
296: Full Changelog: [vertex-sdk-v0.1.0...vertex-sdk-v0.1.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.1.0...vertex-sdk-v0.1.1)
297: 
298: ### Chores
299: 
300: * **internal:** don't re-export streaming type ([#267](https://github.com/anthropics/anthropic-sdk-typescript/issues/267)) ([bcae5a9](https://github.com/anthropics/anthropic-sdk-typescript/commit/bcae5a95078dfe091d01823cd38cf3c63d28026d))
301: * **internal:** update release-please config ([#269](https://github.com/anthropics/anthropic-sdk-typescript/issues/269)) ([80952e6](https://github.com/anthropics/anthropic-sdk-typescript/commit/80952e6ff6aea24ade9ea45dcbe8bb61da385304))
302: 
303: ## 0.1.0 (2024-01-23)
304: 
305: Full Changelog: [vertex-sdk-v0.0.1...vertex-sdk-v0.1.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/vertex-sdk-v0.0.1...vertex-sdk-v0.1.0)
306: 
307: ### Features
308: 
309: * **vertex:** add support for google vertex ([#265](https://github.com/anthropics/anthropic-sdk-typescript/issues/265)) ([9a0410d](https://github.com/anthropics/anthropic-sdk-typescript/commit/9a0410d4e870d796b7def0a6a241e9d409e97886))
````

## File: packages/vertex-sdk/package.json
````json
 1: {
 2:   "name": "@anthropic-ai/vertex-sdk",
 3:   "version": "0.11.4",
 4:   "description": "The official TypeScript library for the Anthropic Vertex API",
 5:   "author": "Anthropic <support@anthropic.com>",
 6:   "types": "dist/index.d.ts",
 7:   "main": "dist/index.js",
 8:   "type": "commonjs",
 9:   "repository": "github:anthropics/anthropic-sdk-typescript",
10:   "license": "MIT",
11:   "packageManager": "yarn@1.22.21",
12:   "private": false,
13:   "scripts": {
14:     "test": "echo 'no tests defined yet' && exit 1",
15:     "build": "bash ./build",
16:     "prepack": "echo 'to pack, run yarn build && (cd dist; yarn pack)' && exit 1",
17:     "prepublishOnly": "echo 'to publish, run yarn build && (cd dist; yarn publish)' && exit 1",
18:     "format": "prettier --write --cache --cache-strategy metadata . !dist",
19:     "prepare": "if [ $(basename $(dirname $PWD)) = 'node_modules' ]; then npm run build; fi",
20:     "tsn": "ts-node -r tsconfig-paths/register",
21:     "lint": "eslint --ext ts,js .",
22:     "fix": "eslint --fix --ext ts,js ."
23:   },
24:   "dependencies": {
25:     "@anthropic-ai/sdk": "file:../../dist/",
26:     "google-auth-library": "^9.4.2"
27:   },
28:   "devDependencies": {
29:     "@types/node": "^20.17.6",
30:     "@types/jest": "^29.4.0",
31:     "@typescript-eslint/eslint-plugin": "^6.7.0",
32:     "@typescript-eslint/parser": "^6.7.0",
33:     "eslint": "^8.49.0",
34:     "eslint-plugin-prettier": "^5.0.1",
35:     "eslint-plugin-unused-imports": "^3.0.0",
36:     "jest": "^29.4.0",
37:     "prettier": "^3.0.0",
38:     "ts-jest": "^29.1.0",
39:     "ts-morph": "^19.0.0",
40:     "ts-node": "^10.5.0",
41:     "tsc-multi": "https://github.com/stainless-api/tsc-multi/releases/download/v1.1.3/tsc-multi.tgz",
42:     "tsconfig-paths": "^4.0.0",
43:     "typescript": "^4.8.2"
44:   },
45:   "imports": {
46:     "@anthropic-ai/vertex-sdk": ".",
47:     "@anthropic-ai/vertex-sdk/*": "./src/*"
48:   },
49:   "exports": {
50:     ".": {
51:       "require": {
52:         "types": "./dist/index.d.ts",
53:         "default": "./dist/index.js"
54:       },
55:       "types": "./dist/index.d.mts",
56:       "default": "./dist/index.mjs"
57:     },
58:     "./*.mjs": {
59:       "types": "./dist/*.d.ts",
60:       "default": "./dist/*.mjs"
61:     },
62:     "./*.js": {
63:       "types": "./dist/*.d.ts",
64:       "default": "./dist/*.js"
65:     },
66:     "./*": {
67:       "types": "./dist/*.d.ts",
68:       "require": "./dist/*.js",
69:       "default": "./dist/*.mjs"
70:     }
71:   }
72: }
````

## File: packages/vertex-sdk/README.md
````markdown
 1: # Anthropic Vertex TypeScript API Library
 2: 
 3: [![NPM version](https://img.shields.io/npm/v/@anthropic-ai/vertex-sdk.svg)](https://npmjs.org/package/@anthropic-ai/vertex-sdk)
 4: 
 5: This library provides convenient access to the Anthropic Vertex API.
 6: 
 7: For the non-Vertex Anthropic API at api.anthropic.com, see [`@anthropic-ai/sdk`](https://github.com/anthropics/anthropic-sdk-typescript).
 8: 
 9: ## Installation
10: 
11: ```sh
12: npm install @anthropic-ai/vertex-sdk
13: ```
14: 
15: ## Usage
16: 
17: <!-- prettier-ignore -->
18: ```js
19: import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';
20: 
21: // Reads from the `CLOUD_ML_REGION` & `ANTHROPIC_VERTEX_PROJECT_ID` environment variables.
22: // Additionally goes through the standard `google-auth-library` flow.
23: const client = new AnthropicVertex();
24: 
25: async function main() {
26:   const result = await client.messages.create({
27:     messages: [
28:       {
29:         role: 'user',
30:         content: 'Hey Claude!',
31:       },
32:     ],
33:     model: 'claude-3-5-sonnet-v2@20241022',
34:     max_tokens: 300,
35:   });
36:   console.log(JSON.stringify(result, null, 2));
37: }
38: 
39: main();
40: ```
41: 
42: For more details on how to use the SDK, see the [README.md for the main Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript/tree/main#anthropic-typescript-api-library) which this library extends.
43: 
44: ## Requirements
45: 
46: TypeScript >= 4.5 is supported.
47: 
48: The following runtimes are supported:
49: 
50: - Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
51: - Deno v1.28.0 or higher, using `import { AnthropicVertex } from "npm:@anthropic-ai/vertex-sdk"`.
52: - Bun 1.0 or later.
53: - Cloudflare Workers.
54: - Vercel Edge Runtime.
55: - Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
56: - Nitro v2.6 or greater.
57: 
58: Note that React Native is not supported at this time.
59: 
60: If you are interested in other runtime environments, please open or upvote an issue on GitHub.
````

## File: packages/vertex-sdk/tsc-multi.json
````json
1: {
2:   "targets": [
3:     { "extname": ".js", "module": "commonjs" },
4:     { "extname": ".mjs", "module": "esnext" }
5:   ],
6:   "projects": ["tsconfig.build.json"]
7: }
````

## File: packages/vertex-sdk/tsconfig.build.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["dist/src"],
 4:   "exclude": ["dist/src/internal/detect-platform.ts"],
 5:   "compilerOptions": {
 6:     "rootDir": "./dist/src",
 7:     "paths": {
 8:       "@anthropic-ai/vertex-sdk/*": ["src/*"],
 9:       "@anthropic-ai/vertex-sdk": ["src/index.ts"]
10:     },
11:     "noEmit": false,
12:     "declaration": true,
13:     "declarationMap": true,
14:     "outDir": "dist",
15:     "pretty": true,
16:     "sourceMap": true
17:   }
18: }
````

## File: packages/vertex-sdk/tsconfig.deno.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["deno"],
 4:   "exclude": [],
 5:   "compilerOptions": {
 6:     "rootDir": "./deno",
 7:     "lib": ["es2020", "DOM"],
 8:     "paths": {
 9:       "@anthropic-ai/vertex-sdk/*": ["src/*"],
10:       "@anthropic-ai/vertex-sdk": ["src/index.ts"]
11:     },
12:     "noEmit": true,
13:     "declaration": true,
14:     "declarationMap": true,
15:     "outDir": "deno",
16:     "pretty": true,
17:     "sourceMap": true
18:   }
19: }
````

## File: packages/vertex-sdk/tsconfig.dist-src.json
````json
 1: {
 2:   // this config is included in the published src directory to prevent TS errors
 3:   // from appearing when users go to source, and VSCode opens the source .ts file
 4:   // via declaration maps
 5:   "include": ["index.ts"],
 6:   "compilerOptions": {
 7:     "target": "es2015",
 8:     "lib": ["DOM"],
 9:     "moduleResolution": "node"
10:   }
11: }
````

## File: packages/vertex-sdk/tsconfig.json
````json
 1: {
 2:   "include": ["src", "tests", "examples"],
 3:   "exclude": ["dist/src/internal/detect-platform.ts"],
 4:   "compilerOptions": {
 5:     "target": "es2020",
 6:     "lib": ["es2020"],
 7:     "module": "commonjs",
 8:     "moduleResolution": "node",
 9:     "esModuleInterop": true,
10:     "baseUrl": "./",
11:     "paths": {
12:       "@anthropic-ai/vertex-sdk/*": ["src/*"],
13:       "@anthropic-ai/vertex-sdk": ["src/index.ts"]
14:     },
15:     "noEmit": true,
16: 
17:     "resolveJsonModule": true,
18: 
19:     "forceConsistentCasingInFileNames": true,
20: 
21:     "strict": true,
22:     "noImplicitAny": true,
23:     "strictNullChecks": true,
24:     "strictFunctionTypes": true,
25:     "strictBindCallApply": true,
26:     "strictPropertyInitialization": true,
27:     "noImplicitThis": true,
28:     "noImplicitReturns": true,
29:     "alwaysStrict": true,
30:     "exactOptionalPropertyTypes": true,
31:     "noUncheckedIndexedAccess": true,
32:     "noImplicitOverride": true,
33:     "noPropertyAccessFromIndexSignature": true,
34: 
35:     "skipLibCheck": true
36:   }
37: }
````

## File: scripts/utils/attw-report.cjs
````
 1: const fs = require('fs');
 2: const problems = Object.values(JSON.parse(fs.readFileSync('.attw.json', 'utf-8')).problems)
 3:   .flat()
 4:   .filter(
 5:     (problem) =>
 6:       !(
 7:         // This is intentional, if the user specifies .mjs they get ESM.
 8:         (
 9:           (problem.kind === 'CJSResolvesToESM' && problem.entrypoint.endsWith('.mjs')) ||
10:           // This is intentional for backwards compat reasons.
11:           (problem.kind === 'MissingExportEquals' && problem.implementationFileName.endsWith('/index.js')) ||
12:           // this is intentional, we deliberately attempt to import types that may not exist from parent node_modules
13:           // folders to better support various runtimes without triggering automatic type acquisition.
14:           (problem.kind === 'InternalResolutionError' && problem.moduleSpecifier.includes('node_modules'))
15:         )
16:       ),
17:   );
18: fs.unlinkSync('.attw.json');
19: if (problems.length) {
20:   process.stdout.write('The types are wrong!\n' + JSON.stringify(problems, null, 2) + '\n');
21:   process.exitCode = 1;
22: } else {
23:   process.stdout.write('Types ok!\n');
24: }
````

## File: scripts/utils/check-is-in-git-install.sh
````bash
1: #!/usr/bin/env bash
2: # Check if you happen to call prepare for a repository that's already in node_modules.
3: [ "$(basename "$(dirname "$PWD")")" = 'node_modules' ] ||
4: # The name of the containing directory that 'npm` uses, which looks like
5: # $HOME/.npm/_cacache/git-cloneXXXXXX
6: [ "$(basename "$(dirname "$PWD")")" = 'tmp' ] ||
7: # The name of the containing directory that 'yarn` uses, which looks like
8: # $(yarn cache dir)/.tmp/XXXXX
9: [ "$(basename "$(dirname "$PWD")")" = '.tmp' ]
````

## File: scripts/utils/check-version.cjs
````
 1: const fs = require('fs');
 2: const path = require('path');
 3: 
 4: const main = () => {
 5:   const pkg = require('../../package.json');
 6:   const version = pkg['version'];
 7:   if (!version) throw 'The version property is not set in the package.json file';
 8:   if (typeof version !== 'string') {
 9:     throw `Unexpected type for the package.json version field; got ${typeof version}, expected string`;
10:   }
11: 
12:   const versionFile = path.resolve(__dirname, '..', '..', 'src', 'version.ts');
13:   const contents = fs.readFileSync(versionFile, 'utf8');
14:   const output = contents.replace(/(export const VERSION = ')(.*)(')/g, `$1${version}$3`);
15:   fs.writeFileSync(versionFile, output);
16: };
17: 
18: if (require.main === module) {
19:   main();
20: }
````

## File: scripts/utils/fix-index-exports.cjs
````
 1: const fs = require('fs');
 2: const path = require('path');
 3: 
 4: const indexJs =
 5:   process.env['DIST_PATH'] ?
 6:     path.resolve(process.env['DIST_PATH'], 'index.js')
 7:   : path.resolve(__dirname, '..', '..', 'dist', 'index.js');
 8: 
 9: let before = fs.readFileSync(indexJs, 'utf8');
10: let after = before.replace(
11:   /^(\s*Object\.defineProperty\s*\(exports,\s*["']__esModule["'].+)$/m,
12:   `exports = module.exports = function (...args) {
13:     return new exports.default(...args)
14:   }
15:   $1`.replace(/^  /gm, ''),
16: );
17: fs.writeFileSync(indexJs, after, 'utf8');
````

## File: scripts/utils/git-swap.sh
````bash
 1: #!/usr/bin/env bash
 2: set -exuo pipefail
 3: # the package is published to NPM from ./dist
 4: # we want the final file structure for git installs to match the npm installs, so we
 5: 
 6: # delete everything except ./dist and ./node_modules
 7: find . -maxdepth 1 -mindepth 1 ! -name 'dist' ! -name 'node_modules' -exec rm -rf '{}' +
 8: 
 9: # move everything from ./dist to .
10: mv dist/* .
11: 
12: # delete the now-empty ./dist
13: rmdir dist
````

## File: scripts/utils/make-dist-package-json.cjs
````
 1: const pkgJson = require(process.env['PKG_JSON_PATH'] || '../../package.json');
 2: 
 3: function processExportMap(m) {
 4:   for (const key in m) {
 5:     const value = m[key];
 6:     if (typeof value === 'string') m[key] = value.replace(/^\.\/dist\//, './');
 7:     else processExportMap(value);
 8:   }
 9: }
10: processExportMap(pkgJson.exports);
11: 
12: for (const key of ['types', 'main', 'module']) {
13:   if (typeof pkgJson[key] === 'string') pkgJson[key] = pkgJson[key].replace(/^(\.\/)?dist\//, './');
14: }
15: 
16: delete pkgJson.devDependencies;
17: delete pkgJson.scripts.prepack;
18: delete pkgJson.scripts.prepublishOnly;
19: delete pkgJson.scripts.prepare;
20: 
21: console.log(JSON.stringify(pkgJson, null, 2));
````

## File: scripts/utils/postprocess-files.cjs
````
 1: // @ts-check
 2: const fs = require('fs');
 3: const path = require('path');
 4: 
 5: const distDir =
 6:   process.env['DIST_PATH'] ?
 7:     path.resolve(process.env['DIST_PATH'])
 8:   : path.resolve(__dirname, '..', '..', 'dist');
 9: 
10: async function* walk(dir) {
11:   for await (const d of await fs.promises.opendir(dir)) {
12:     const entry = path.join(dir, d.name);
13:     if (d.isDirectory()) yield* walk(entry);
14:     else if (d.isFile()) yield entry;
15:   }
16: }
17: 
18: async function postprocess() {
19:   for await (const file of walk(distDir)) {
20:     if (!/(\.d)?[cm]?ts$/.test(file)) continue;
21: 
22:     const code = await fs.promises.readFile(file, 'utf8');
23: 
24:     // strip out lib="dom", types="node", and types="react" references; these
25:     // are needed at build time, but would pollute the user's TS environment
26:     const transformed = code.replace(
27:       /^ *\/\/\/ *<reference +(lib="dom"|types="(node|react)").*?\n/gm,
28:       // replace with same number of characters to avoid breaking source maps
29:       (match) => ' '.repeat(match.length - 1) + '\n',
30:     );
31: 
32:     if (transformed !== code) {
33:       console.error(`wrote ${path.relative(process.cwd(), file)}`);
34:       await fs.promises.writeFile(file, transformed, 'utf8');
35:     }
36:   }
37: 
38:   const newExports = {
39:     '.': {
40:       require: {
41:         types: './index.d.ts',
42:         default: './index.js',
43:       },
44:       types: './index.d.mts',
45:       default: './index.mjs',
46:     },
47:   };
48: 
49:   for (const entry of await fs.promises.readdir(distDir, { withFileTypes: true })) {
50:     if (entry.isDirectory() && entry.name !== 'src' && entry.name !== 'internal' && entry.name !== 'bin') {
51:       const subpath = './' + entry.name;
52:       newExports[subpath + '/*.mjs'] = {
53:         default: subpath + '/*.mjs',
54:       };
55:       newExports[subpath + '/*.js'] = {
56:         default: subpath + '/*.js',
57:       };
58:       newExports[subpath + '/*'] = {
59:         import: subpath + '/*.mjs',
60:         require: subpath + '/*.js',
61:       };
62:     } else if (entry.isFile() && /\.[cm]?js$/.test(entry.name)) {
63:       const { name, ext } = path.parse(entry.name);
64:       const subpathWithoutExt = './' + name;
65:       const subpath = './' + entry.name;
66:       newExports[subpathWithoutExt] ||= { import: undefined, require: undefined };
67:       const isModule = ext[1] === 'm';
68:       if (isModule) {
69:         newExports[subpathWithoutExt].import = subpath;
70:       } else {
71:         newExports[subpathWithoutExt].require = subpath;
72:       }
73:       newExports[subpath] = {
74:         default: subpath,
75:       };
76:     }
77:   }
78:   await fs.promises.writeFile(
79:     'dist/package.json',
80:     JSON.stringify(
81:       Object.assign(
82:         /** @type {Record<String, unknown>} */ (
83:           JSON.parse(await fs.promises.readFile('dist/package.json', 'utf-8'))
84:         ),
85:         {
86:           exports: newExports,
87:         },
88:       ),
89:       null,
90:       2,
91:     ),
92:   );
93: }
94: postprocess();
````

## File: scripts/utils/upload-artifact.sh
````bash
 1: #!/usr/bin/env bash
 2: set -exuo pipefail
 3: 
 4: RESPONSE=$(curl -X POST "$URL" \
 5:   -H "Authorization: Bearer $AUTH" \
 6:   -H "Content-Type: application/json")
 7: 
 8: SIGNED_URL=$(echo "$RESPONSE" | jq -r '.url')
 9: 
10: if [[ "$SIGNED_URL" == "null" ]]; then
11:   echo -e "\033[31mFailed to get signed URL.\033[0m"
12:   exit 1
13: fi
14: 
15: UPLOAD_RESPONSE=$(tar -cz dist | curl -v -X PUT \
16:   -H "Content-Type: application/gzip" \
17:   --data-binary @- "$SIGNED_URL" 2>&1)
18: 
19: if echo "$UPLOAD_RESPONSE" | grep -q "HTTP/[0-9.]* 200"; then
20:   echo -e "\033[32mUploaded build to Stainless storage.\033[0m"
21:   echo -e "\033[32mInstallation: npm install 'https://pkg.stainless.com/s/anthropic-typescript/$SHA'\033[0m"
22: else
23:   echo -e "\033[31mFailed to upload artifact.\033[0m"
24:   exit 1
25: fi
````

## File: scripts/publish-packages.ts
````typescript
  1: /**
  2:  * Called from the `create-releases.yml` workflow with the output
  3:  * of the release please action as the first argument.
  4:  *
  5:  * Example JSON input:
  6:  *
  7:  * ```json
  8:  {
  9:     "releases_created": "true",
 10:     "release_created": "true",
 11:     "id": "137967744",
 12:     "name": "sdk: v0.14.5",
 13:     "tag_name": "sdk-v0.14.5",
 14:     "sha": "7cc2ba5c694e76a117f731d4cf0b06f8b8361f2e",
 15:     "body": "## 0.14.5 (2024-01-22)\n\n...",
 16:     "html_url": "https://github.com/$org/$repo/releases/tag/sdk-v0.14.5",
 17:     "draft": "false",
 18:     "upload_url": "https://uploads.github.com/repos/$org/$repo/releases/137967744/assets{?name,label}",
 19:     "path": ".",
 20:     "version": "0.14.5",
 21:     "major": "0",
 22:     "minor": "14",
 23:     "patch": "5",
 24:     "packages/additional-sdk--release_created": "true",
 25:     "packages/additional-sdk--id": "137967756",
 26:     "packages/additional-sdk--name": "additional-sdk: v0.5.2",
 27:     "packages/additional-sdk--tag_name": "additional-sdk-v0.5.2",
 28:     "packages/additional-sdk--sha": "7cc2ba5c694e76a117f731d4cf0b06f8b8361f2e",
 29:     "packages/additional-sdk--body": "## 0.5.2 (2024-01-22)\n\n...",
 30:     "packages/additional-sdk--html_url": "https://github.com/$org/$repo/releases/tag/additional-sdk-v0.5.2",
 31:     "packages/additional-sdk--draft": "false",
 32:     "packages/additional-sdk--upload_url": "https://uploads.github.com/repos/$org/$repo/releases/137967756/assets{?name,label}",
 33:     "packages/additional-sdk--path": "packages/additional-sdk",
 34:     "packages/additional-sdk--version": "0.5.2",
 35:     "packages/additional-sdk--major": "0",
 36:     "packages/additional-sdk--minor": "5",
 37:     "packages/additional-sdk--patch": "2",
 38:     "paths_released": "[\".\",\"packages/additional-sdk\"]"
 39:   }
 40:   ```
 41:  */
 42: 
 43: import { execSync } from 'child_process';
 44: import path from 'path';
 45: 
 46: function main() {
 47:   const data = process.argv[2] ?? process.env['DATA'];
 48:   if (!data) {
 49:     throw new Error(`Usage: publish-packages.ts '{"json": "obj"}'`);
 50:   }
 51: 
 52:   const rootDir = path.join(__dirname, '..');
 53:   console.log('root dir', rootDir);
 54:   console.log(`publish-packages called with ${data}`);
 55: 
 56:   const outputs = JSON.parse(data);
 57: 
 58:   const rawPaths = outputs.paths_released;
 59: 
 60:   if (!rawPaths) {
 61:     console.error(JSON.stringify(outputs, null, 2));
 62:     throw new Error('Expected outputs to contain a truthy `paths_released` property');
 63:   }
 64:   if (typeof rawPaths !== 'string') {
 65:     console.error(JSON.stringify(outputs, null, 2));
 66:     throw new Error('Expected outputs `paths_released` property to be a JSON string');
 67:   }
 68: 
 69:   const paths = JSON.parse(rawPaths);
 70:   if (!Array.isArray(paths)) {
 71:     console.error(JSON.stringify(outputs, null, 2));
 72:     throw new Error('Expected outputs `paths_released` property to be an array');
 73:   }
 74:   if (!paths.length) {
 75:     console.error(JSON.stringify(outputs, null, 2));
 76:     throw new Error('Expected outputs `paths_released` property to contain at least one entry');
 77:   }
 78: 
 79:   const publishScriptPath = path.join(rootDir, 'bin', 'publish-npm');
 80:   console.log('Using publish script at', publishScriptPath);
 81: 
 82:   console.log('Ensuring root package is built');
 83:   console.log(`$ yarn build`);
 84:   execSync(`yarn build`, { cwd: rootDir, encoding: 'utf8', stdio: 'inherit' });
 85: 
 86:   for (const relPackagePath of paths) {
 87:     console.log('\n');
 88: 
 89:     const packagePath = path.join(rootDir, relPackagePath);
 90:     console.log(`Publishing in directory: ${packagePath}`);
 91: 
 92:     console.log(`$ yarn install`);
 93:     execSync(`yarn install`, { cwd: packagePath, encoding: 'utf8', stdio: 'inherit' });
 94: 
 95:     console.log(`$ bash ${publishScriptPath}`);
 96:     execSync(`bash ${publishScriptPath}`, { cwd: packagePath, encoding: 'utf8', stdio: 'inherit' });
 97:   }
 98: 
 99:   console.log('Finished publishing packages');
100: }
101: 
102: main();
````

## File: src/_vendor/partial-json-parser/parser.ts
````typescript
  1: type Token = {
  2:   type: string;
  3:   value: string;
  4: };
  5: 
  6: const tokenize = (input: string): Token[] => {
  7:     let current = 0;
  8:     let tokens: Token[] = [];
  9: 
 10:     while (current < input.length) {
 11:       let char = input[current];
 12: 
 13:       if (char === '\\') {
 14:         current++;
 15:         continue;
 16:       }
 17: 
 18:       if (char === '{') {
 19:         tokens.push({
 20:           type: 'brace',
 21:           value: '{',
 22:         });
 23: 
 24:         current++;
 25:         continue;
 26:       }
 27: 
 28:       if (char === '}') {
 29:         tokens.push({
 30:           type: 'brace',
 31:           value: '}',
 32:         });
 33: 
 34:         current++;
 35:         continue;
 36:       }
 37: 
 38:       if (char === '[') {
 39:         tokens.push({
 40:           type: 'paren',
 41:           value: '[',
 42:         });
 43: 
 44:         current++;
 45:         continue;
 46:       }
 47: 
 48:       if (char === ']') {
 49:         tokens.push({
 50:           type: 'paren',
 51:           value: ']',
 52:         });
 53: 
 54:         current++;
 55:         continue;
 56:       }
 57: 
 58:       if (char === ':') {
 59:         tokens.push({
 60:           type: 'separator',
 61:           value: ':',
 62:         });
 63: 
 64:         current++;
 65:         continue;
 66:       }
 67: 
 68:       if (char === ',') {
 69:         tokens.push({
 70:           type: 'delimiter',
 71:           value: ',',
 72:         });
 73: 
 74:         current++;
 75:         continue;
 76:       }
 77: 
 78:       if (char === '"') {
 79:         let value = '';
 80:         let danglingQuote = false;
 81: 
 82:         char = input[++current];
 83: 
 84:         while (char !== '"') {
 85:           if (current === input.length) {
 86:             danglingQuote = true;
 87:             break;
 88:           }
 89: 
 90:           if (char === '\\') {
 91:             current++;
 92:             if (current === input.length) {
 93:               danglingQuote = true;
 94:               break;
 95:             }
 96:             value += char + input[current];
 97:             char = input[++current];
 98:           } else {
 99:             value += char;
100:             char = input[++current];
101:           }
102:         }
103: 
104:         char = input[++current];
105: 
106:         if (!danglingQuote) {
107:           tokens.push({
108:             type: 'string',
109:             value,
110:           });
111:         }
112:         continue;
113:       }
114: 
115:       let WHITESPACE = /\s/;
116:       if (char && WHITESPACE.test(char)) {
117:         current++;
118:         continue;
119:       }
120: 
121:       let NUMBERS = /[0-9]/;
122:       if ((char && NUMBERS.test(char)) || char === '-' || char === '.') {
123:         let value = '';
124: 
125:         if (char === '-') {
126:           value += char;
127:           char = input[++current];
128:         }
129: 
130:         while ((char && NUMBERS.test(char)) || char === '.') {
131:           value += char;
132:           char = input[++current];
133:         }
134: 
135:         tokens.push({
136:           type: 'number',
137:           value,
138:         });
139:         continue;
140:       }
141: 
142:       let LETTERS = /[a-z]/i;
143:       if (char && LETTERS.test(char)) {
144:         let value = '';
145: 
146:         while (char && LETTERS.test(char)) {
147:           if (current === input.length) {
148:             break;
149:           }
150:           value += char;
151:           char = input[++current];
152:         }
153: 
154:         if (value == 'true' || value == 'false' || value === 'null') {
155:           tokens.push({
156:             type: 'name',
157:             value,
158:           });
159:         } else {
160:           // unknown token, e.g. `nul` which isn't quite `null`
161:           current++;
162:           continue;
163:         }
164:         continue;
165:       }
166: 
167:       current++;
168:     }
169: 
170:     return tokens;
171:   },
172:   strip = (tokens: Token[]): Token[] => {
173:     if (tokens.length === 0) {
174:       return tokens;
175:     }
176: 
177:     let lastToken = tokens[tokens.length - 1]!;
178: 
179:     switch (lastToken.type) {
180:       case 'separator':
181:         tokens = tokens.slice(0, tokens.length - 1);
182:         return strip(tokens);
183:         break;
184:       case 'number':
185:         let lastCharacterOfLastToken = lastToken.value[lastToken.value.length - 1];
186:         if (lastCharacterOfLastToken === '.' || lastCharacterOfLastToken === '-') {
187:           tokens = tokens.slice(0, tokens.length - 1);
188:           return strip(tokens);
189:         }
190:       case 'string':
191:         let tokenBeforeTheLastToken = tokens[tokens.length - 2];
192:         if (tokenBeforeTheLastToken?.type === 'delimiter') {
193:           tokens = tokens.slice(0, tokens.length - 1);
194:           return strip(tokens);
195:         } else if (tokenBeforeTheLastToken?.type === 'brace' && tokenBeforeTheLastToken.value === '{') {
196:           tokens = tokens.slice(0, tokens.length - 1);
197:           return strip(tokens);
198:         }
199:         break;
200:       case 'delimiter':
201:         tokens = tokens.slice(0, tokens.length - 1);
202:         return strip(tokens);
203:         break;
204:     }
205: 
206:     return tokens;
207:   },
208:   unstrip = (tokens: Token[]): Token[] => {
209:     let tail: string[] = [];
210: 
211:     tokens.map((token) => {
212:       if (token.type === 'brace') {
213:         if (token.value === '{') {
214:           tail.push('}');
215:         } else {
216:           tail.splice(tail.lastIndexOf('}'), 1);
217:         }
218:       }
219:       if (token.type === 'paren') {
220:         if (token.value === '[') {
221:           tail.push(']');
222:         } else {
223:           tail.splice(tail.lastIndexOf(']'), 1);
224:         }
225:       }
226:     });
227: 
228:     if (tail.length > 0) {
229:       tail.reverse().map((item) => {
230:         if (item === '}') {
231:           tokens.push({
232:             type: 'brace',
233:             value: '}',
234:           });
235:         } else if (item === ']') {
236:           tokens.push({
237:             type: 'paren',
238:             value: ']',
239:           });
240:         }
241:       });
242:     }
243: 
244:     return tokens;
245:   },
246:   generate = (tokens: Token[]): string => {
247:     let output = '';
248: 
249:     tokens.map((token) => {
250:       switch (token.type) {
251:         case 'string':
252:           output += '"' + token.value + '"';
253:           break;
254:         default:
255:           output += token.value;
256:           break;
257:       }
258:     });
259: 
260:     return output;
261:   },
262:   partialParse = (input: string): unknown => JSON.parse(generate(unstrip(strip(tokenize(input)))));
263: 
264: export { partialParse };
````

## File: src/_vendor/partial-json-parser/README.md
````markdown
1: # Partial JSON Parser
2: 
3: Vendored from https://www.npmjs.com/package/partial-json-parser and updated to use TypeScript.
````

## File: src/core/api-promise.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { type BaseAnthropic } from '../client';
  4: 
  5: import { type PromiseOrValue } from '../internal/types';
  6: import {
  7:   type APIResponseProps,
  8:   type WithRequestID,
  9:   defaultParseResponse,
 10:   addRequestID,
 11: } from '../internal/parse';
 12: 
 13: /**
 14:  * A subclass of `Promise` providing additional helper methods
 15:  * for interacting with the SDK.
 16:  */
 17: export class APIPromise<T> extends Promise<WithRequestID<T>> {
 18:   private parsedPromise: Promise<WithRequestID<T>> | undefined;
 19:   #client: BaseAnthropic;
 20: 
 21:   constructor(
 22:     client: BaseAnthropic,
 23:     private responsePromise: Promise<APIResponseProps>,
 24:     private parseResponse: (
 25:       client: BaseAnthropic,
 26:       props: APIResponseProps,
 27:     ) => PromiseOrValue<WithRequestID<T>> = defaultParseResponse,
 28:   ) {
 29:     super((resolve) => {
 30:       // this is maybe a bit weird but this has to be a no-op to not implicitly
 31:       // parse the response body; instead .then, .catch, .finally are overridden
 32:       // to parse the response
 33:       resolve(null as any);
 34:     });
 35:     this.#client = client;
 36:   }
 37: 
 38:   _thenUnwrap<U>(transform: (data: T, props: APIResponseProps) => U): APIPromise<U> {
 39:     return new APIPromise(this.#client, this.responsePromise, async (client, props) =>
 40:       addRequestID(transform(await this.parseResponse(client, props), props), props.response),
 41:     );
 42:   }
 43: 
 44:   /**
 45:    * Gets the raw `Response` instance instead of parsing the response
 46:    * data.
 47:    *
 48:    * If you want to parse the response body but still get the `Response`
 49:    * instance, you can use {@link withResponse()}.
 50:    *
 51:    * 👋 Getting the wrong TypeScript type for `Response`?
 52:    * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
 53:    * to your `tsconfig.json`.
 54:    */
 55:   asResponse(): Promise<Response> {
 56:     return this.responsePromise.then((p) => p.response);
 57:   }
 58: 
 59:   /**
 60:    * Gets the parsed response data, the raw `Response` instance and the ID of the request,
 61:    * returned via the `request-id` header which is useful for debugging requests and resporting
 62:    * issues to Anthropic.
 63:    *
 64:    * If you just want to get the raw `Response` instance without parsing it,
 65:    * you can use {@link asResponse()}.
 66:    *
 67:    * 👋 Getting the wrong TypeScript type for `Response`?
 68:    * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
 69:    * to your `tsconfig.json`.
 70:    */
 71:   async withResponse(): Promise<{ data: T; response: Response; request_id: string | null | undefined }> {
 72:     const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
 73:     return { data, response, request_id: response.headers.get('request-id') };
 74:   }
 75: 
 76:   private parse(): Promise<WithRequestID<T>> {
 77:     if (!this.parsedPromise) {
 78:       this.parsedPromise = this.responsePromise.then(
 79:         (data) => this.parseResponse(this.#client, data) as any as Promise<WithRequestID<T>>,
 80:       );
 81:     }
 82:     return this.parsedPromise;
 83:   }
 84: 
 85:   override then<TResult1 = WithRequestID<T>, TResult2 = never>(
 86:     onfulfilled?: ((value: WithRequestID<T>) => TResult1 | PromiseLike<TResult1>) | undefined | null,
 87:     onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
 88:   ): Promise<TResult1 | TResult2> {
 89:     return this.parse().then(onfulfilled, onrejected);
 90:   }
 91: 
 92:   override catch<TResult = never>(
 93:     onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
 94:   ): Promise<WithRequestID<T> | TResult> {
 95:     return this.parse().catch(onrejected);
 96:   }
 97: 
 98:   override finally(onfinally?: (() => void) | undefined | null): Promise<WithRequestID<T>> {
 99:     return this.parse().finally(onfinally);
100:   }
101: }
````

## File: src/core/error.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { castToError } from '../internal/errors';
  4: 
  5: export class AnthropicError extends Error {}
  6: 
  7: export class APIError<
  8:   TStatus extends number | undefined = number | undefined,
  9:   THeaders extends Headers | undefined = Headers | undefined,
 10:   TError extends Object | undefined = Object | undefined,
 11: > extends AnthropicError {
 12:   /** HTTP status for the response that caused the error */
 13:   readonly status: TStatus;
 14:   /** HTTP headers for the response that caused the error */
 15:   readonly headers: THeaders;
 16:   /** JSON body of the response that caused the error */
 17:   readonly error: TError;
 18: 
 19:   readonly requestID: string | null | undefined;
 20: 
 21:   constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders) {
 22:     super(`${APIError.makeMessage(status, error, message)}`);
 23:     this.status = status;
 24:     this.headers = headers;
 25:     this.requestID = headers?.get('request-id');
 26:     this.error = error;
 27:   }
 28: 
 29:   private static makeMessage(status: number | undefined, error: any, message: string | undefined) {
 30:     const msg =
 31:       error?.message ?
 32:         typeof error.message === 'string' ?
 33:           error.message
 34:         : JSON.stringify(error.message)
 35:       : error ? JSON.stringify(error)
 36:       : message;
 37: 
 38:     if (status && msg) {
 39:       return `${status} ${msg}`;
 40:     }
 41:     if (status) {
 42:       return `${status} status code (no body)`;
 43:     }
 44:     if (msg) {
 45:       return msg;
 46:     }
 47:     return '(no status code or body)';
 48:   }
 49: 
 50:   static generate(
 51:     status: number | undefined,
 52:     errorResponse: Object | undefined,
 53:     message: string | undefined,
 54:     headers: Headers | undefined,
 55:   ): APIError {
 56:     if (!status || !headers) {
 57:       return new APIConnectionError({ message, cause: castToError(errorResponse) });
 58:     }
 59: 
 60:     const error = errorResponse as Record<string, any>;
 61: 
 62:     if (status === 400) {
 63:       return new BadRequestError(status, error, message, headers);
 64:     }
 65: 
 66:     if (status === 401) {
 67:       return new AuthenticationError(status, error, message, headers);
 68:     }
 69: 
 70:     if (status === 403) {
 71:       return new PermissionDeniedError(status, error, message, headers);
 72:     }
 73: 
 74:     if (status === 404) {
 75:       return new NotFoundError(status, error, message, headers);
 76:     }
 77: 
 78:     if (status === 409) {
 79:       return new ConflictError(status, error, message, headers);
 80:     }
 81: 
 82:     if (status === 422) {
 83:       return new UnprocessableEntityError(status, error, message, headers);
 84:     }
 85: 
 86:     if (status === 429) {
 87:       return new RateLimitError(status, error, message, headers);
 88:     }
 89: 
 90:     if (status >= 500) {
 91:       return new InternalServerError(status, error, message, headers);
 92:     }
 93: 
 94:     return new APIError(status, error, message, headers);
 95:   }
 96: }
 97: 
 98: export class APIUserAbortError extends APIError<undefined, undefined, undefined> {
 99:   constructor({ message }: { message?: string } = {}) {
100:     super(undefined, undefined, message || 'Request was aborted.', undefined);
101:   }
102: }
103: 
104: export class APIConnectionError extends APIError<undefined, undefined, undefined> {
105:   constructor({ message, cause }: { message?: string | undefined; cause?: Error | undefined }) {
106:     super(undefined, undefined, message || 'Connection error.', undefined);
107:     // in some environments the 'cause' property is already declared
108:     // @ts-ignore
109:     if (cause) this.cause = cause;
110:   }
111: }
112: 
113: export class APIConnectionTimeoutError extends APIConnectionError {
114:   constructor({ message }: { message?: string } = {}) {
115:     super({ message: message ?? 'Request timed out.' });
116:   }
117: }
118: 
119: export class BadRequestError extends APIError<400, Headers> {}
120: 
121: export class AuthenticationError extends APIError<401, Headers> {}
122: 
123: export class PermissionDeniedError extends APIError<403, Headers> {}
124: 
125: export class NotFoundError extends APIError<404, Headers> {}
126: 
127: export class ConflictError extends APIError<409, Headers> {}
128: 
129: export class UnprocessableEntityError extends APIError<422, Headers> {}
130: 
131: export class RateLimitError extends APIError<429, Headers> {}
132: 
133: export class InternalServerError extends APIError<number, Headers> {}
````

## File: src/core/pagination.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { AnthropicError } from './error';
  4: import { FinalRequestOptions } from '../internal/request-options';
  5: import { defaultParseResponse, WithRequestID } from '../internal/parse';
  6: import { type BaseAnthropic } from '../client';
  7: import { APIPromise } from './api-promise';
  8: import { type APIResponseProps } from '../internal/parse';
  9: import { maybeObj } from '../internal/utils/values';
 10: 
 11: export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;
 12: 
 13: export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
 14:   #client: BaseAnthropic;
 15:   protected options: FinalRequestOptions;
 16: 
 17:   protected response: Response;
 18:   protected body: unknown;
 19: 
 20:   constructor(client: BaseAnthropic, response: Response, body: unknown, options: FinalRequestOptions) {
 21:     this.#client = client;
 22:     this.options = options;
 23:     this.response = response;
 24:     this.body = body;
 25:   }
 26: 
 27:   abstract nextPageRequestOptions(): PageRequestOptions | null;
 28: 
 29:   abstract getPaginatedItems(): Item[];
 30: 
 31:   hasNextPage(): boolean {
 32:     const items = this.getPaginatedItems();
 33:     if (!items.length) return false;
 34:     return this.nextPageRequestOptions() != null;
 35:   }
 36: 
 37:   async getNextPage(): Promise<this> {
 38:     const nextOptions = this.nextPageRequestOptions();
 39:     if (!nextOptions) {
 40:       throw new AnthropicError(
 41:         'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
 42:       );
 43:     }
 44: 
 45:     return await this.#client.requestAPIList(this.constructor as any, nextOptions);
 46:   }
 47: 
 48:   async *iterPages(): AsyncGenerator<this> {
 49:     let page: this = this;
 50:     yield page;
 51:     while (page.hasNextPage()) {
 52:       page = await page.getNextPage();
 53:       yield page;
 54:     }
 55:   }
 56: 
 57:   async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
 58:     for await (const page of this.iterPages()) {
 59:       for (const item of page.getPaginatedItems()) {
 60:         yield item;
 61:       }
 62:     }
 63:   }
 64: }
 65: 
 66: /**
 67:  * This subclass of Promise will resolve to an instantiated Page once the request completes.
 68:  *
 69:  * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 70:  *
 71:  *    for await (const item of client.items.list()) {
 72:  *      console.log(item)
 73:  *    }
 74:  */
 75: export class PagePromise<
 76:     PageClass extends AbstractPage<Item>,
 77:     Item = ReturnType<PageClass['getPaginatedItems']>[number],
 78:   >
 79:   extends APIPromise<PageClass>
 80:   implements AsyncIterable<Item>
 81: {
 82:   constructor(
 83:     client: BaseAnthropic,
 84:     request: Promise<APIResponseProps>,
 85:     Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
 86:   ) {
 87:     super(
 88:       client,
 89:       request,
 90:       async (client, props) =>
 91:         new Page(
 92:           client,
 93:           props.response,
 94:           await defaultParseResponse(client, props),
 95:           props.options,
 96:         ) as WithRequestID<PageClass>,
 97:     );
 98:   }
 99: 
100:   /**
101:    * Allow auto-paginating iteration on an unawaited list call, eg:
102:    *
103:    *    for await (const item of client.items.list()) {
104:    *      console.log(item)
105:    *    }
106:    */
107:   async *[Symbol.asyncIterator]() {
108:     const page = await this;
109:     for await (const item of page) {
110:       yield item;
111:     }
112:   }
113: }
114: 
115: export interface PageResponse<Item> {
116:   data: Array<Item>;
117: 
118:   has_more: boolean;
119: 
120:   first_id: string | null;
121: 
122:   last_id: string | null;
123: }
124: 
125: export interface PageParams {
126:   /**
127:    * Number of items per page.
128:    */
129:   limit?: number;
130: 
131:   before_id?: string;
132: 
133:   after_id?: string;
134: }
135: 
136: export class Page<Item> extends AbstractPage<Item> implements PageResponse<Item> {
137:   data: Array<Item>;
138: 
139:   has_more: boolean;
140: 
141:   first_id: string | null;
142: 
143:   last_id: string | null;
144: 
145:   constructor(
146:     client: BaseAnthropic,
147:     response: Response,
148:     body: PageResponse<Item>,
149:     options: FinalRequestOptions,
150:   ) {
151:     super(client, response, body, options);
152: 
153:     this.data = body.data || [];
154:     this.has_more = body.has_more || false;
155:     this.first_id = body.first_id || null;
156:     this.last_id = body.last_id || null;
157:   }
158: 
159:   getPaginatedItems(): Item[] {
160:     return this.data ?? [];
161:   }
162: 
163:   override hasNextPage(): boolean {
164:     if (this.has_more === false) {
165:       return false;
166:     }
167: 
168:     return super.hasNextPage();
169:   }
170: 
171:   nextPageRequestOptions(): PageRequestOptions | null {
172:     if ((this.options.query as Record<string, unknown>)?.['before_id']) {
173:       // in reverse
174:       const first_id = this.first_id;
175:       if (!first_id) {
176:         return null;
177:       }
178: 
179:       return {
180:         ...this.options,
181:         query: {
182:           ...maybeObj(this.options.query),
183:           before_id: first_id,
184:         },
185:       };
186:     }
187: 
188:     const cursor = this.last_id;
189:     if (!cursor) {
190:       return null;
191:     }
192: 
193:     return {
194:       ...this.options,
195:       query: {
196:         ...maybeObj(this.options.query),
197:         after_id: cursor,
198:       },
199:     };
200:   }
201: }
````

## File: src/core/README.md
````markdown
1: # `core`
2: 
3: This directory holds public modules implementing non-resource-specific SDK functionality.
````

## File: src/core/resource.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import { BaseAnthropic } from '../client';
 4: 
 5: export class APIResource {
 6:   protected _client: BaseAnthropic;
 7: 
 8:   constructor(client: BaseAnthropic) {
 9:     this._client = client;
10:   }
11: }
````

## File: src/core/streaming.ts
````typescript
  1: import { AnthropicError } from './error';
  2: import { type ReadableStream } from '../internal/shim-types';
  3: import { makeReadableStream } from '../internal/shims';
  4: import { findDoubleNewlineIndex, LineDecoder } from '../internal/decoders/line';
  5: import { ReadableStreamToAsyncIterable } from '../internal/shims';
  6: import { isAbortError } from '../internal/errors';
  7: import { safeJSON } from '../internal/utils/values';
  8: import { encodeUTF8 } from '../internal/utils/bytes';
  9: 
 10: import { APIError } from './error';
 11: 
 12: type Bytes = string | ArrayBuffer | Uint8Array | null | undefined;
 13: 
 14: export type ServerSentEvent = {
 15:   event: string | null;
 16:   data: string;
 17:   raw: string[];
 18: };
 19: 
 20: export class Stream<Item> implements AsyncIterable<Item> {
 21:   controller: AbortController;
 22: 
 23:   constructor(
 24:     private iterator: () => AsyncIterator<Item>,
 25:     controller: AbortController,
 26:   ) {
 27:     this.controller = controller;
 28:   }
 29: 
 30:   static fromSSEResponse<Item>(response: Response, controller: AbortController): Stream<Item> {
 31:     let consumed = false;
 32: 
 33:     async function* iterator(): AsyncIterator<Item, any, undefined> {
 34:       if (consumed) {
 35:         throw new AnthropicError('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
 36:       }
 37:       consumed = true;
 38:       let done = false;
 39:       try {
 40:         for await (const sse of _iterSSEMessages(response, controller)) {
 41:           if (sse.event === 'completion') {
 42:             try {
 43:               yield JSON.parse(sse.data);
 44:             } catch (e) {
 45:               console.error(`Could not parse message into JSON:`, sse.data);
 46:               console.error(`From chunk:`, sse.raw);
 47:               throw e;
 48:             }
 49:           }
 50: 
 51:           if (
 52:             sse.event === 'message_start' ||
 53:             sse.event === 'message_delta' ||
 54:             sse.event === 'message_stop' ||
 55:             sse.event === 'content_block_start' ||
 56:             sse.event === 'content_block_delta' ||
 57:             sse.event === 'content_block_stop'
 58:           ) {
 59:             try {
 60:               yield JSON.parse(sse.data);
 61:             } catch (e) {
 62:               console.error(`Could not parse message into JSON:`, sse.data);
 63:               console.error(`From chunk:`, sse.raw);
 64:               throw e;
 65:             }
 66:           }
 67: 
 68:           if (sse.event === 'ping') {
 69:             continue;
 70:           }
 71: 
 72:           if (sse.event === 'error') {
 73:             throw new APIError(undefined, safeJSON(sse.data) ?? sse.data, undefined, response.headers);
 74:           }
 75:         }
 76:         done = true;
 77:       } catch (e) {
 78:         // If the user calls `stream.controller.abort()`, we should exit without throwing.
 79:         if (isAbortError(e)) return;
 80:         throw e;
 81:       } finally {
 82:         // If the user `break`s, abort the ongoing request.
 83:         if (!done) controller.abort();
 84:       }
 85:     }
 86: 
 87:     return new Stream(iterator, controller);
 88:   }
 89: 
 90:   /**
 91:    * Generates a Stream from a newline-separated ReadableStream
 92:    * where each item is a JSON value.
 93:    */
 94:   static fromReadableStream<Item>(readableStream: ReadableStream, controller: AbortController): Stream<Item> {
 95:     let consumed = false;
 96: 
 97:     async function* iterLines(): AsyncGenerator<string, void, unknown> {
 98:       const lineDecoder = new LineDecoder();
 99: 
100:       const iter = ReadableStreamToAsyncIterable<Bytes>(readableStream);
101:       for await (const chunk of iter) {
102:         for (const line of lineDecoder.decode(chunk)) {
103:           yield line;
104:         }
105:       }
106: 
107:       for (const line of lineDecoder.flush()) {
108:         yield line;
109:       }
110:     }
111: 
112:     async function* iterator(): AsyncIterator<Item, any, undefined> {
113:       if (consumed) {
114:         throw new AnthropicError('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
115:       }
116:       consumed = true;
117:       let done = false;
118:       try {
119:         for await (const line of iterLines()) {
120:           if (done) continue;
121:           if (line) yield JSON.parse(line);
122:         }
123:         done = true;
124:       } catch (e) {
125:         // If the user calls `stream.controller.abort()`, we should exit without throwing.
126:         if (isAbortError(e)) return;
127:         throw e;
128:       } finally {
129:         // If the user `break`s, abort the ongoing request.
130:         if (!done) controller.abort();
131:       }
132:     }
133: 
134:     return new Stream(iterator, controller);
135:   }
136: 
137:   [Symbol.asyncIterator](): AsyncIterator<Item> {
138:     return this.iterator();
139:   }
140: 
141:   /**
142:    * Splits the stream into two streams which can be
143:    * independently read from at different speeds.
144:    */
145:   tee(): [Stream<Item>, Stream<Item>] {
146:     const left: Array<Promise<IteratorResult<Item>>> = [];
147:     const right: Array<Promise<IteratorResult<Item>>> = [];
148:     const iterator = this.iterator();
149: 
150:     const teeIterator = (queue: Array<Promise<IteratorResult<Item>>>): AsyncIterator<Item> => {
151:       return {
152:         next: () => {
153:           if (queue.length === 0) {
154:             const result = iterator.next();
155:             left.push(result);
156:             right.push(result);
157:           }
158:           return queue.shift()!;
159:         },
160:       };
161:     };
162: 
163:     return [
164:       new Stream(() => teeIterator(left), this.controller),
165:       new Stream(() => teeIterator(right), this.controller),
166:     ];
167:   }
168: 
169:   /**
170:    * Converts this stream to a newline-separated ReadableStream of
171:    * JSON stringified values in the stream
172:    * which can be turned back into a Stream with `Stream.fromReadableStream()`.
173:    */
174:   toReadableStream(): ReadableStream {
175:     const self = this;
176:     let iter: AsyncIterator<Item>;
177: 
178:     return makeReadableStream({
179:       async start() {
180:         iter = self[Symbol.asyncIterator]();
181:       },
182:       async pull(ctrl: any) {
183:         try {
184:           const { value, done } = await iter.next();
185:           if (done) return ctrl.close();
186: 
187:           const bytes = encodeUTF8(JSON.stringify(value) + '\n');
188: 
189:           ctrl.enqueue(bytes);
190:         } catch (err) {
191:           ctrl.error(err);
192:         }
193:       },
194:       async cancel() {
195:         await iter.return?.();
196:       },
197:     });
198:   }
199: }
200: 
201: export async function* _iterSSEMessages(
202:   response: Response,
203:   controller: AbortController,
204: ): AsyncGenerator<ServerSentEvent, void, unknown> {
205:   if (!response.body) {
206:     controller.abort();
207:     if (
208:       typeof (globalThis as any).navigator !== 'undefined' &&
209:       (globalThis as any).navigator.product === 'ReactNative'
210:     ) {
211:       throw new AnthropicError(
212:         `The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`,
213:       );
214:     }
215:     throw new AnthropicError(`Attempted to iterate over a response with no body`);
216:   }
217: 
218:   const sseDecoder = new SSEDecoder();
219:   const lineDecoder = new LineDecoder();
220: 
221:   const iter = ReadableStreamToAsyncIterable<Bytes>(response.body);
222:   for await (const sseChunk of iterSSEChunks(iter)) {
223:     for (const line of lineDecoder.decode(sseChunk)) {
224:       const sse = sseDecoder.decode(line);
225:       if (sse) yield sse;
226:     }
227:   }
228: 
229:   for (const line of lineDecoder.flush()) {
230:     const sse = sseDecoder.decode(line);
231:     if (sse) yield sse;
232:   }
233: }
234: 
235: /**
236:  * Given an async iterable iterator, iterates over it and yields full
237:  * SSE chunks, i.e. yields when a double new-line is encountered.
238:  */
239: async function* iterSSEChunks(iterator: AsyncIterableIterator<Bytes>): AsyncGenerator<Uint8Array> {
240:   let data = new Uint8Array();
241: 
242:   for await (const chunk of iterator) {
243:     if (chunk == null) {
244:       continue;
245:     }
246: 
247:     const binaryChunk =
248:       chunk instanceof ArrayBuffer ? new Uint8Array(chunk)
249:       : typeof chunk === 'string' ? encodeUTF8(chunk)
250:       : chunk;
251: 
252:     let newData = new Uint8Array(data.length + binaryChunk.length);
253:     newData.set(data);
254:     newData.set(binaryChunk, data.length);
255:     data = newData;
256: 
257:     let patternIndex;
258:     while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
259:       yield data.slice(0, patternIndex);
260:       data = data.slice(patternIndex);
261:     }
262:   }
263: 
264:   if (data.length > 0) {
265:     yield data;
266:   }
267: }
268: 
269: class SSEDecoder {
270:   private data: string[];
271:   private event: string | null;
272:   private chunks: string[];
273: 
274:   constructor() {
275:     this.event = null;
276:     this.data = [];
277:     this.chunks = [];
278:   }
279: 
280:   decode(line: string) {
281:     if (line.endsWith('\r')) {
282:       line = line.substring(0, line.length - 1);
283:     }
284: 
285:     if (!line) {
286:       // empty line and we didn't previously encounter any messages
287:       if (!this.event && !this.data.length) return null;
288: 
289:       const sse: ServerSentEvent = {
290:         event: this.event,
291:         data: this.data.join('\n'),
292:         raw: this.chunks,
293:       };
294: 
295:       this.event = null;
296:       this.data = [];
297:       this.chunks = [];
298: 
299:       return sse;
300:     }
301: 
302:     this.chunks.push(line);
303: 
304:     if (line.startsWith(':')) {
305:       return null;
306:     }
307: 
308:     let [fieldname, _, value] = partition(line, ':');
309: 
310:     if (value.startsWith(' ')) {
311:       value = value.substring(1);
312:     }
313: 
314:     if (fieldname === 'event') {
315:       this.event = value;
316:     } else if (fieldname === 'data') {
317:       this.data.push(value);
318:     }
319: 
320:     return null;
321:   }
322: }
323: 
324: function partition(str: string, delimiter: string): [string, string, string] {
325:   const index = str.indexOf(delimiter);
326:   if (index !== -1) {
327:     return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
328:   }
329: 
330:   return [str, '', ''];
331: }
````

## File: src/core/uploads.ts
````typescript
1: export { type Uploadable } from '../internal/uploads';
2: export { toFile, type ToFileInput } from '../internal/to-file';
````

## File: src/internal/decoders/jsonl.ts
````typescript
 1: import { AnthropicError } from '../../core/error';
 2: import { ReadableStreamToAsyncIterable } from '../shims';
 3: import { LineDecoder, type Bytes } from './line';
 4: 
 5: export class JSONLDecoder<T> {
 6:   controller: AbortController;
 7: 
 8:   constructor(
 9:     private iterator: AsyncIterableIterator<Bytes>,
10:     controller: AbortController,
11:   ) {
12:     this.controller = controller;
13:   }
14: 
15:   private async *decoder(): AsyncIterator<T, any, undefined> {
16:     const lineDecoder = new LineDecoder();
17:     for await (const chunk of this.iterator) {
18:       for (const line of lineDecoder.decode(chunk)) {
19:         yield JSON.parse(line);
20:       }
21:     }
22: 
23:     for (const line of lineDecoder.flush()) {
24:       yield JSON.parse(line);
25:     }
26:   }
27: 
28:   [Symbol.asyncIterator](): AsyncIterator<T> {
29:     return this.decoder();
30:   }
31: 
32:   static fromResponse<T>(response: Response, controller: AbortController): JSONLDecoder<T> {
33:     if (!response.body) {
34:       controller.abort();
35:       if (
36:         typeof (globalThis as any).navigator !== 'undefined' &&
37:         (globalThis as any).navigator.product === 'ReactNative'
38:       ) {
39:         throw new AnthropicError(
40:           `The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`,
41:         );
42:       }
43:       throw new AnthropicError(`Attempted to iterate over a response with no body`);
44:     }
45: 
46:     return new JSONLDecoder(ReadableStreamToAsyncIterable<Bytes>(response.body), controller);
47:   }
48: }
````

## File: src/internal/decoders/line.ts
````typescript
  1: import { concatBytes, decodeUTF8, encodeUTF8 } from '../utils/bytes';
  2: 
  3: export type Bytes = string | ArrayBuffer | Uint8Array | null | undefined;
  4: 
  5: /**
  6:  * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
  7:  * reading lines from text.
  8:  *
  9:  * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 10:  */
 11: export class LineDecoder {
 12:   // prettier-ignore
 13:   static NEWLINE_CHARS = new Set(['\n', '\r']);
 14:   static NEWLINE_REGEXP = /\r\n|[\n\r]/g;
 15: 
 16:   #buffer: Uint8Array;
 17:   #carriageReturnIndex: number | null;
 18: 
 19:   constructor() {
 20:     this.#buffer = new Uint8Array();
 21:     this.#carriageReturnIndex = null;
 22:   }
 23: 
 24:   decode(chunk: Bytes): string[] {
 25:     if (chunk == null) {
 26:       return [];
 27:     }
 28: 
 29:     const binaryChunk =
 30:       chunk instanceof ArrayBuffer ? new Uint8Array(chunk)
 31:       : typeof chunk === 'string' ? encodeUTF8(chunk)
 32:       : chunk;
 33: 
 34:     this.#buffer = concatBytes([this.#buffer, binaryChunk]);
 35: 
 36:     const lines: string[] = [];
 37:     let patternIndex;
 38:     while ((patternIndex = findNewlineIndex(this.#buffer, this.#carriageReturnIndex)) != null) {
 39:       if (patternIndex.carriage && this.#carriageReturnIndex == null) {
 40:         // skip until we either get a corresponding `\n`, a new `\r` or nothing
 41:         this.#carriageReturnIndex = patternIndex.index;
 42:         continue;
 43:       }
 44: 
 45:       // we got double \r or \rtext\n
 46:       if (
 47:         this.#carriageReturnIndex != null &&
 48:         (patternIndex.index !== this.#carriageReturnIndex + 1 || patternIndex.carriage)
 49:       ) {
 50:         lines.push(decodeUTF8(this.#buffer.subarray(0, this.#carriageReturnIndex - 1)));
 51:         this.#buffer = this.#buffer.subarray(this.#carriageReturnIndex);
 52:         this.#carriageReturnIndex = null;
 53:         continue;
 54:       }
 55: 
 56:       const endIndex =
 57:         this.#carriageReturnIndex !== null ? patternIndex.preceding - 1 : patternIndex.preceding;
 58: 
 59:       const line = decodeUTF8(this.#buffer.subarray(0, endIndex));
 60:       lines.push(line);
 61: 
 62:       this.#buffer = this.#buffer.subarray(patternIndex.index);
 63:       this.#carriageReturnIndex = null;
 64:     }
 65: 
 66:     return lines;
 67:   }
 68: 
 69:   flush(): string[] {
 70:     if (!this.#buffer.length) {
 71:       return [];
 72:     }
 73:     return this.decode('\n');
 74:   }
 75: }
 76: 
 77: /**
 78:  * This function searches the buffer for the end patterns, (\r or \n)
 79:  * and returns an object with the index preceding the matched newline and the
 80:  * index after the newline char. `null` is returned if no new line is found.
 81:  *
 82:  * ```ts
 83:  * findNewLineIndex('abc\ndef') -> { preceding: 2, index: 3 }
 84:  * ```
 85:  */
 86: function findNewlineIndex(
 87:   buffer: Uint8Array,
 88:   startIndex: number | null,
 89: ): { preceding: number; index: number; carriage: boolean } | null {
 90:   const newline = 0x0a; // \n
 91:   const carriage = 0x0d; // \r
 92: 
 93:   for (let i = startIndex ?? 0; i < buffer.length; i++) {
 94:     if (buffer[i] === newline) {
 95:       return { preceding: i, index: i + 1, carriage: false };
 96:     }
 97: 
 98:     if (buffer[i] === carriage) {
 99:       return { preceding: i, index: i + 1, carriage: true };
100:     }
101:   }
102: 
103:   return null;
104: }
105: 
106: export function findDoubleNewlineIndex(buffer: Uint8Array): number {
107:   // This function searches the buffer for the end patterns (\r\r, \n\n, \r\n\r\n)
108:   // and returns the index right after the first occurrence of any pattern,
109:   // or -1 if none of the patterns are found.
110:   const newline = 0x0a; // \n
111:   const carriage = 0x0d; // \r
112: 
113:   for (let i = 0; i < buffer.length - 1; i++) {
114:     if (buffer[i] === newline && buffer[i + 1] === newline) {
115:       // \n\n
116:       return i + 2;
117:     }
118:     if (buffer[i] === carriage && buffer[i + 1] === carriage) {
119:       // \r\r
120:       return i + 2;
121:     }
122:     if (
123:       buffer[i] === carriage &&
124:       buffer[i + 1] === newline &&
125:       i + 3 < buffer.length &&
126:       buffer[i + 2] === carriage &&
127:       buffer[i + 3] === newline
128:     ) {
129:       // \r\n\r\n
130:       return i + 4;
131:     }
132:   }
133: 
134:   return -1;
135: }
````

## File: src/internal/utils/base64.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import { AnthropicError } from '../../core/error';
 4: import { encodeUTF8 } from './bytes';
 5: 
 6: export const toBase64 = (data: string | Uint8Array | null | undefined): string => {
 7:   if (!data) return '';
 8: 
 9:   if (typeof (globalThis as any).Buffer !== 'undefined') {
10:     return (globalThis as any).Buffer.from(data).toString('base64');
11:   }
12: 
13:   if (typeof data === 'string') {
14:     data = encodeUTF8(data);
15:   }
16: 
17:   if (typeof btoa !== 'undefined') {
18:     return btoa(String.fromCharCode.apply(null, data as any));
19:   }
20: 
21:   throw new AnthropicError('Cannot generate base64 string; Expected `Buffer` or `btoa` to be defined');
22: };
23: 
24: export const fromBase64 = (str: string): Uint8Array => {
25:   if (typeof (globalThis as any).Buffer !== 'undefined') {
26:     const buf = (globalThis as any).Buffer.from(str, 'base64');
27:     return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
28:   }
29: 
30:   if (typeof atob !== 'undefined') {
31:     const bstr = atob(str);
32:     const buf = new Uint8Array(bstr.length);
33:     for (let i = 0; i < bstr.length; i++) {
34:       buf[i] = bstr.charCodeAt(i);
35:     }
36:     return buf;
37:   }
38: 
39:   throw new AnthropicError('Cannot decode base64 string; Expected `Buffer` or `atob` to be defined');
40: };
````

## File: src/internal/utils/bytes.ts
````typescript
 1: export function concatBytes(buffers: Uint8Array[]): Uint8Array {
 2:   let length = 0;
 3:   for (const buffer of buffers) {
 4:     length += buffer.length;
 5:   }
 6:   const output = new Uint8Array(length);
 7:   let index = 0;
 8:   for (const buffer of buffers) {
 9:     output.set(buffer, index);
10:     index += buffer.length;
11:   }
12: 
13:   return output;
14: }
15: 
16: let encodeUTF8_: (str: string) => Uint8Array;
17: export function encodeUTF8(str: string) {
18:   let encoder;
19:   return (
20:     encodeUTF8_ ??
21:     ((encoder = new (globalThis as any).TextEncoder()), (encodeUTF8_ = encoder.encode.bind(encoder)))
22:   )(str);
23: }
24: 
25: let decodeUTF8_: (bytes: Uint8Array) => string;
26: export function decodeUTF8(bytes: Uint8Array) {
27:   let decoder;
28:   return (
29:     decodeUTF8_ ??
30:     ((decoder = new (globalThis as any).TextDecoder()), (decodeUTF8_ = decoder.decode.bind(decoder)))
31:   )(bytes);
32: }
````

## File: src/internal/utils/env.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: /**
 4:  * Read an environment variable.
 5:  *
 6:  * Trims beginning and trailing whitespace.
 7:  *
 8:  * Will return undefined if the environment variable doesn't exist or cannot be accessed.
 9:  */
10: export const readEnv = (env: string): string | undefined => {
11:   if (typeof (globalThis as any).process !== 'undefined') {
12:     return (globalThis as any).process.env?.[env]?.trim() ?? undefined;
13:   }
14:   if (typeof (globalThis as any).Deno !== 'undefined') {
15:     return (globalThis as any).Deno.env?.get?.(env)?.trim();
16:   }
17:   return undefined;
18: };
````

## File: src/internal/utils/log.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { hasOwn } from './values';
  4: import { type BaseAnthropic } from '../../client';
  5: import { RequestOptions } from '../request-options';
  6: 
  7: type LogFn = (message: string, ...rest: unknown[]) => void;
  8: export type Logger = {
  9:   error: LogFn;
 10:   warn: LogFn;
 11:   info: LogFn;
 12:   debug: LogFn;
 13: };
 14: export type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';
 15: 
 16: const levelNumbers = {
 17:   off: 0,
 18:   error: 200,
 19:   warn: 300,
 20:   info: 400,
 21:   debug: 500,
 22: };
 23: 
 24: export const parseLogLevel = (
 25:   maybeLevel: string | undefined,
 26:   sourceName: string,
 27:   client: BaseAnthropic,
 28: ): LogLevel | undefined => {
 29:   if (!maybeLevel) {
 30:     return undefined;
 31:   }
 32:   if (hasOwn(levelNumbers, maybeLevel)) {
 33:     return maybeLevel;
 34:   }
 35:   loggerFor(client).warn(
 36:     `${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(
 37:       Object.keys(levelNumbers),
 38:     )}`,
 39:   );
 40:   return undefined;
 41: };
 42: 
 43: function noop() {}
 44: 
 45: function makeLogFn(fnLevel: keyof Logger, logger: Logger | undefined, logLevel: LogLevel) {
 46:   if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
 47:     return noop;
 48:   } else {
 49:     // Don't wrap logger functions, we want the stacktrace intact!
 50:     return logger[fnLevel].bind(logger);
 51:   }
 52: }
 53: 
 54: const noopLogger = {
 55:   error: noop,
 56:   warn: noop,
 57:   info: noop,
 58:   debug: noop,
 59: };
 60: 
 61: let cachedLoggers = new WeakMap<Logger, [LogLevel, Logger]>();
 62: 
 63: export function loggerFor(client: BaseAnthropic): Logger {
 64:   const logger = client.logger;
 65:   const logLevel = client.logLevel ?? 'off';
 66:   if (!logger) {
 67:     return noopLogger;
 68:   }
 69: 
 70:   const cachedLogger = cachedLoggers.get(logger);
 71:   if (cachedLogger && cachedLogger[0] === logLevel) {
 72:     return cachedLogger[1];
 73:   }
 74: 
 75:   const levelLogger = {
 76:     error: makeLogFn('error', logger, logLevel),
 77:     warn: makeLogFn('warn', logger, logLevel),
 78:     info: makeLogFn('info', logger, logLevel),
 79:     debug: makeLogFn('debug', logger, logLevel),
 80:   };
 81: 
 82:   cachedLoggers.set(logger, [logLevel, levelLogger]);
 83: 
 84:   return levelLogger;
 85: }
 86: 
 87: export const formatRequestDetails = (details: {
 88:   options?: RequestOptions | undefined;
 89:   headers?: Headers | Record<string, string> | undefined;
 90:   retryOfRequestLogID?: string | undefined;
 91:   retryOf?: string | undefined;
 92:   url?: string | undefined;
 93:   status?: number | undefined;
 94:   method?: string | undefined;
 95:   durationMs?: number | undefined;
 96:   message?: unknown;
 97:   body?: unknown;
 98: }) => {
 99:   if (details.options) {
100:     details.options = { ...details.options };
101:     delete details.options['headers']; // redundant + leaks internals
102:   }
103:   if (details.headers) {
104:     details.headers = Object.fromEntries(
105:       (details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(
106:         ([name, value]) => [
107:           name,
108:           (
109:             name.toLowerCase() === 'x-api-key' ||
110:             name.toLowerCase() === 'authorization' ||
111:             name.toLowerCase() === 'cookie' ||
112:             name.toLowerCase() === 'set-cookie'
113:           ) ?
114:             '***'
115:           : value,
116:         ],
117:       ),
118:     );
119:   }
120:   if ('retryOfRequestLogID' in details) {
121:     if (details.retryOfRequestLogID) {
122:       details.retryOf = details.retryOfRequestLogID;
123:     }
124:     delete details.retryOfRequestLogID;
125:   }
126:   return details;
127: };
````

## File: src/internal/utils/path.ts
````typescript
 1: import { AnthropicError } from '../../core/error';
 2: 
 3: /**
 4:  * Percent-encode everything that isn't safe to have in a path without encoding safe chars.
 5:  *
 6:  * Taken from https://datatracker.ietf.org/doc/html/rfc3986#section-3.3:
 7:  * > unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
 8:  * > sub-delims  = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
 9:  * > pchar       = unreserved / pct-encoded / sub-delims / ":" / "@"
10:  */
11: export function encodeURIPath(str: string) {
12:   return str.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
13: }
14: 
15: export const createPathTagFunction = (pathEncoder = encodeURIPath) =>
16:   function path(statics: readonly string[], ...params: readonly unknown[]): string {
17:     // If there are no params, no processing is needed.
18:     if (statics.length === 1) return statics[0]!;
19: 
20:     let postPath = false;
21:     const path = statics.reduce((previousValue, currentValue, index) => {
22:       if (/[?#]/.test(currentValue)) {
23:         postPath = true;
24:       }
25:       return (
26:         previousValue +
27:         currentValue +
28:         (index === params.length ? '' : (postPath ? encodeURIComponent : pathEncoder)(String(params[index])))
29:       );
30:     }, '');
31: 
32:     const pathOnly = path.split(/[?#]/, 1)[0]!;
33:     const invalidSegments = [];
34:     const invalidSegmentPattern = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
35:     let match;
36: 
37:     // Find all invalid segments
38:     while ((match = invalidSegmentPattern.exec(pathOnly)) !== null) {
39:       invalidSegments.push({
40:         start: match.index,
41:         length: match[0].length,
42:       });
43:     }
44: 
45:     if (invalidSegments.length > 0) {
46:       let lastEnd = 0;
47:       const underline = invalidSegments.reduce((acc, segment) => {
48:         const spaces = ' '.repeat(segment.start - lastEnd);
49:         const arrows = '^'.repeat(segment.length);
50:         lastEnd = segment.start + segment.length;
51:         return acc + spaces + arrows;
52:       }, '');
53: 
54:       throw new AnthropicError(
55:         `Path parameters result in path with invalid segments:\n${path}\n${underline}`,
56:       );
57:     }
58: 
59:     return path;
60:   };
61: 
62: /**
63:  * URI-encodes path params and ensures no unsafe /./ or /../ path segments are introduced.
64:  */
65: export const path = createPathTagFunction(encodeURIPath);
````

## File: src/internal/utils/sleep.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
````

## File: src/internal/utils/uuid.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: /**
 4:  * https://stackoverflow.com/a/2117523
 5:  */
 6: export let uuid4 = function () {
 7:   const { crypto } = globalThis as any;
 8:   if (crypto?.randomUUID) {
 9:     uuid4 = crypto.randomUUID.bind(crypto);
10:     return crypto.randomUUID();
11:   }
12:   const u8 = new Uint8Array(1);
13:   const randomByte = crypto ? () => crypto.getRandomValues(u8)[0]! : () => (Math.random() * 0xff) & 0xff;
14:   return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
15:     (+c ^ (randomByte() & (15 >> (+c / 4)))).toString(16),
16:   );
17: };
````

## File: src/internal/utils/values.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { AnthropicError } from '../../core/error';
  4: 
  5: // https://url.spec.whatwg.org/#url-scheme-string
  6: const startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
  7: 
  8: export const isAbsoluteURL = (url: string): boolean => {
  9:   return startsWithSchemeRegexp.test(url);
 10: };
 11: 
 12: /** Returns an object if the given value isn't an object, otherwise returns as-is */
 13: export function maybeObj(x: unknown): object {
 14:   if (typeof x !== 'object') {
 15:     return {};
 16:   }
 17: 
 18:   return x ?? {};
 19: }
 20: 
 21: // https://stackoverflow.com/a/34491287
 22: export function isEmptyObj(obj: Object | null | undefined): boolean {
 23:   if (!obj) return true;
 24:   for (const _k in obj) return false;
 25:   return true;
 26: }
 27: 
 28: // https://eslint.org/docs/latest/rules/no-prototype-builtins
 29: export function hasOwn<T extends object = object>(obj: T, key: PropertyKey): key is keyof T {
 30:   return Object.prototype.hasOwnProperty.call(obj, key);
 31: }
 32: 
 33: export function isObj(obj: unknown): obj is Record<string, unknown> {
 34:   return obj != null && typeof obj === 'object' && !Array.isArray(obj);
 35: }
 36: 
 37: export const ensurePresent = <T>(value: T | null | undefined): T => {
 38:   if (value == null) {
 39:     throw new AnthropicError(`Expected a value to be given but received ${value} instead.`);
 40:   }
 41: 
 42:   return value;
 43: };
 44: 
 45: export const validatePositiveInteger = (name: string, n: unknown): number => {
 46:   if (typeof n !== 'number' || !Number.isInteger(n)) {
 47:     throw new AnthropicError(`${name} must be an integer`);
 48:   }
 49:   if (n < 0) {
 50:     throw new AnthropicError(`${name} must be a positive integer`);
 51:   }
 52:   return n;
 53: };
 54: 
 55: export const coerceInteger = (value: unknown): number => {
 56:   if (typeof value === 'number') return Math.round(value);
 57:   if (typeof value === 'string') return parseInt(value, 10);
 58: 
 59:   throw new AnthropicError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
 60: };
 61: 
 62: export const coerceFloat = (value: unknown): number => {
 63:   if (typeof value === 'number') return value;
 64:   if (typeof value === 'string') return parseFloat(value);
 65: 
 66:   throw new AnthropicError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
 67: };
 68: 
 69: export const coerceBoolean = (value: unknown): boolean => {
 70:   if (typeof value === 'boolean') return value;
 71:   if (typeof value === 'string') return value === 'true';
 72:   return Boolean(value);
 73: };
 74: 
 75: export const maybeCoerceInteger = (value: unknown): number | undefined => {
 76:   if (value === undefined) {
 77:     return undefined;
 78:   }
 79:   return coerceInteger(value);
 80: };
 81: 
 82: export const maybeCoerceFloat = (value: unknown): number | undefined => {
 83:   if (value === undefined) {
 84:     return undefined;
 85:   }
 86:   return coerceFloat(value);
 87: };
 88: 
 89: export const maybeCoerceBoolean = (value: unknown): boolean | undefined => {
 90:   if (value === undefined) {
 91:     return undefined;
 92:   }
 93:   return coerceBoolean(value);
 94: };
 95: 
 96: export const safeJSON = (text: string) => {
 97:   try {
 98:     return JSON.parse(text);
 99:   } catch (err) {
100:     return undefined;
101:   }
102: };
````

## File: src/internal/builtin-types.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: export type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
 4: 
 5: /**
 6:  * An alias to the builtin `RequestInit` type so we can
 7:  * easily alias it in import statements if there are name clashes.
 8:  *
 9:  * https://developer.mozilla.org/docs/Web/API/RequestInit
10:  */
11: type _RequestInit = RequestInit;
12: 
13: /**
14:  * An alias to the builtin `Response` type so we can
15:  * easily alias it in import statements if there are name clashes.
16:  *
17:  * https://developer.mozilla.org/docs/Web/API/Response
18:  */
19: type _Response = Response;
20: 
21: /**
22:  * The type for the first argument to `fetch`.
23:  *
24:  * https://developer.mozilla.org/docs/Web/API/Window/fetch#resource
25:  */
26: type _RequestInfo = Request | URL | string;
27: 
28: /**
29:  * The type for constructing `RequestInit` Headers.
30:  *
31:  * https://developer.mozilla.org/docs/Web/API/RequestInit#setting_headers
32:  */
33: type _HeadersInit = RequestInit['headers'];
34: 
35: /**
36:  * The type for constructing `RequestInit` body.
37:  *
38:  * https://developer.mozilla.org/docs/Web/API/RequestInit#body
39:  */
40: type _BodyInit = RequestInit['body'];
41: 
42: /**
43:  * An alias to the builtin `Array<T>` type so we can
44:  * easily alias it in import statements if there are name clashes.
45:  */
46: type _Array<T> = Array<T>;
47: 
48: /**
49:  * An alias to the builtin `Record<K, T>` type so we can
50:  * easily alias it in import statements if there are name clashes.
51:  */
52: type _Record<K extends keyof any, T> = Record<K, T>;
53: 
54: export type {
55:   _Array as Array,
56:   _BodyInit as BodyInit,
57:   _HeadersInit as HeadersInit,
58:   _Record as Record,
59:   _RequestInfo as RequestInfo,
60:   _RequestInit as RequestInit,
61:   _Response as Response,
62: };
63: 
64: /**
65:  * A copy of the builtin `EndingType` type as it isn't fully supported in certain
66:  * environments and attempting to reference the global version will error.
67:  *
68:  * https://github.com/microsoft/TypeScript/blob/49ad1a3917a0ea57f5ff248159256e12bb1cb705/src/lib/dom.generated.d.ts#L27941
69:  */
70: type EndingType = 'native' | 'transparent';
71: 
72: /**
73:  * A copy of the builtin `BlobPropertyBag` type as it isn't fully supported in certain
74:  * environments and attempting to reference the global version will error.
75:  *
76:  * https://github.com/microsoft/TypeScript/blob/49ad1a3917a0ea57f5ff248159256e12bb1cb705/src/lib/dom.generated.d.ts#L154
77:  * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#options
78:  */
79: export interface BlobPropertyBag {
80:   endings?: EndingType;
81:   type?: string;
82: }
83: 
84: /**
85:  * A copy of the builtin `FilePropertyBag` type as it isn't fully supported in certain
86:  * environments and attempting to reference the global version will error.
87:  *
88:  * https://github.com/microsoft/TypeScript/blob/49ad1a3917a0ea57f5ff248159256e12bb1cb705/src/lib/dom.generated.d.ts#L503
89:  * https://developer.mozilla.org/en-US/docs/Web/API/File/File#options
90:  */
91: export interface FilePropertyBag extends BlobPropertyBag {
92:   lastModified?: number;
93: }
````

## File: src/internal/constants.ts
````typescript
 1: // File containing shared constants
 2: 
 3: /**
 4:  * Model-specific timeout constraints for non-streaming requests
 5:  */
 6: export const MODEL_NONSTREAMING_TOKENS: Record<string, number> = {
 7:   'claude-opus-4-20250514': 8192,
 8:   'claude-opus-4-0': 8192,
 9:   'claude-4-opus-20250514': 8192,
10:   'anthropic.claude-opus-4-20250514-v1:0': 8192,
11:   'claude-opus-4@20250514': 8192,
12: };
````

## File: src/internal/detect-platform.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { VERSION } from '../version';
  4: 
  5: export const isRunningInBrowser = () => {
  6:   return (
  7:     // @ts-ignore
  8:     typeof window !== 'undefined' &&
  9:     // @ts-ignore
 10:     typeof window.document !== 'undefined' &&
 11:     // @ts-ignore
 12:     typeof navigator !== 'undefined'
 13:   );
 14: };
 15: 
 16: type DetectedPlatform = 'deno' | 'node' | 'edge' | 'unknown';
 17: 
 18: /**
 19:  * Note this does not detect 'browser'; for that, use getBrowserInfo().
 20:  */
 21: function getDetectedPlatform(): DetectedPlatform {
 22:   if (typeof Deno !== 'undefined' && Deno.build != null) {
 23:     return 'deno';
 24:   }
 25:   if (typeof EdgeRuntime !== 'undefined') {
 26:     return 'edge';
 27:   }
 28:   if (
 29:     Object.prototype.toString.call(
 30:       typeof (globalThis as any).process !== 'undefined' ? (globalThis as any).process : 0,
 31:     ) === '[object process]'
 32:   ) {
 33:     return 'node';
 34:   }
 35:   return 'unknown';
 36: }
 37: 
 38: declare const Deno: any;
 39: declare const EdgeRuntime: any;
 40: type Arch = 'x32' | 'x64' | 'arm' | 'arm64' | `other:${string}` | 'unknown';
 41: type PlatformName =
 42:   | 'MacOS'
 43:   | 'Linux'
 44:   | 'Windows'
 45:   | 'FreeBSD'
 46:   | 'OpenBSD'
 47:   | 'iOS'
 48:   | 'Android'
 49:   | `Other:${string}`
 50:   | 'Unknown';
 51: type Browser = 'ie' | 'edge' | 'chrome' | 'firefox' | 'safari';
 52: type PlatformProperties = {
 53:   'X-Stainless-Lang': 'js';
 54:   'X-Stainless-Package-Version': string;
 55:   'X-Stainless-OS': PlatformName;
 56:   'X-Stainless-Arch': Arch;
 57:   'X-Stainless-Runtime': 'node' | 'deno' | 'edge' | `browser:${Browser}` | 'unknown';
 58:   'X-Stainless-Runtime-Version': string;
 59: };
 60: const getPlatformProperties = (): PlatformProperties => {
 61:   const detectedPlatform = getDetectedPlatform();
 62:   if (detectedPlatform === 'deno') {
 63:     return {
 64:       'X-Stainless-Lang': 'js',
 65:       'X-Stainless-Package-Version': VERSION,
 66:       'X-Stainless-OS': normalizePlatform(Deno.build.os),
 67:       'X-Stainless-Arch': normalizeArch(Deno.build.arch),
 68:       'X-Stainless-Runtime': 'deno',
 69:       'X-Stainless-Runtime-Version':
 70:         typeof Deno.version === 'string' ? Deno.version : Deno.version?.deno ?? 'unknown',
 71:     };
 72:   }
 73:   if (typeof EdgeRuntime !== 'undefined') {
 74:     return {
 75:       'X-Stainless-Lang': 'js',
 76:       'X-Stainless-Package-Version': VERSION,
 77:       'X-Stainless-OS': 'Unknown',
 78:       'X-Stainless-Arch': `other:${EdgeRuntime}`,
 79:       'X-Stainless-Runtime': 'edge',
 80:       'X-Stainless-Runtime-Version': (globalThis as any).process.version,
 81:     };
 82:   }
 83:   // Check if Node.js
 84:   if (detectedPlatform === 'node') {
 85:     return {
 86:       'X-Stainless-Lang': 'js',
 87:       'X-Stainless-Package-Version': VERSION,
 88:       'X-Stainless-OS': normalizePlatform((globalThis as any).process.platform),
 89:       'X-Stainless-Arch': normalizeArch((globalThis as any).process.arch),
 90:       'X-Stainless-Runtime': 'node',
 91:       'X-Stainless-Runtime-Version': (globalThis as any).process.version,
 92:     };
 93:   }
 94: 
 95:   const browserInfo = getBrowserInfo();
 96:   if (browserInfo) {
 97:     return {
 98:       'X-Stainless-Lang': 'js',
 99:       'X-Stainless-Package-Version': VERSION,
100:       'X-Stainless-OS': 'Unknown',
101:       'X-Stainless-Arch': 'unknown',
102:       'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
103:       'X-Stainless-Runtime-Version': browserInfo.version,
104:     };
105:   }
106: 
107:   // TODO add support for Cloudflare workers, etc.
108:   return {
109:     'X-Stainless-Lang': 'js',
110:     'X-Stainless-Package-Version': VERSION,
111:     'X-Stainless-OS': 'Unknown',
112:     'X-Stainless-Arch': 'unknown',
113:     'X-Stainless-Runtime': 'unknown',
114:     'X-Stainless-Runtime-Version': 'unknown',
115:   };
116: };
117: 
118: type BrowserInfo = {
119:   browser: Browser;
120:   version: string;
121: };
122: 
123: declare const navigator: { userAgent: string } | undefined;
124: 
125: // Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
126: function getBrowserInfo(): BrowserInfo | null {
127:   if (typeof navigator === 'undefined' || !navigator) {
128:     return null;
129:   }
130: 
131:   // NOTE: The order matters here!
132:   const browserPatterns = [
133:     { key: 'edge' as const, pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
134:     { key: 'ie' as const, pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
135:     { key: 'ie' as const, pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
136:     { key: 'chrome' as const, pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
137:     { key: 'firefox' as const, pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
138:     { key: 'safari' as const, pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ },
139:   ];
140: 
141:   // Find the FIRST matching browser
142:   for (const { key, pattern } of browserPatterns) {
143:     const match = pattern.exec(navigator.userAgent);
144:     if (match) {
145:       const major = match[1] || 0;
146:       const minor = match[2] || 0;
147:       const patch = match[3] || 0;
148: 
149:       return { browser: key, version: `${major}.${minor}.${patch}` };
150:     }
151:   }
152: 
153:   return null;
154: }
155: 
156: const normalizeArch = (arch: string): Arch => {
157:   // Node docs:
158:   // - https://nodejs.org/api/process.html#processarch
159:   // Deno docs:
160:   // - https://doc.deno.land/deno/stable/~/Deno.build
161:   if (arch === 'x32') return 'x32';
162:   if (arch === 'x86_64' || arch === 'x64') return 'x64';
163:   if (arch === 'arm') return 'arm';
164:   if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
165:   if (arch) return `other:${arch}`;
166:   return 'unknown';
167: };
168: 
169: const normalizePlatform = (platform: string): PlatformName => {
170:   // Node platforms:
171:   // - https://nodejs.org/api/process.html#processplatform
172:   // Deno platforms:
173:   // - https://doc.deno.land/deno/stable/~/Deno.build
174:   // - https://github.com/denoland/deno/issues/14799
175: 
176:   platform = platform.toLowerCase();
177: 
178:   // NOTE: this iOS check is untested and may not work
179:   // Node does not work natively on IOS, there is a fork at
180:   // https://github.com/nodejs-mobile/nodejs-mobile
181:   // however it is unknown at the time of writing how to detect if it is running
182:   if (platform.includes('ios')) return 'iOS';
183:   if (platform === 'android') return 'Android';
184:   if (platform === 'darwin') return 'MacOS';
185:   if (platform === 'win32') return 'Windows';
186:   if (platform === 'freebsd') return 'FreeBSD';
187:   if (platform === 'openbsd') return 'OpenBSD';
188:   if (platform === 'linux') return 'Linux';
189:   if (platform) return `Other:${platform}`;
190:   return 'Unknown';
191: };
192: 
193: let _platformHeaders: PlatformProperties;
194: export const getPlatformHeaders = () => {
195:   return (_platformHeaders ??= getPlatformProperties());
196: };
````

## File: src/internal/errors.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: export function isAbortError(err: unknown) {
 4:   return (
 5:     typeof err === 'object' &&
 6:     err !== null &&
 7:     // Spec-compliant fetch implementations
 8:     (('name' in err && (err as any).name === 'AbortError') ||
 9:       // Expo fetch
10:       ('message' in err && String((err as any).message).includes('FetchRequestCanceledException')))
11:   );
12: }
13: 
14: export const castToError = (err: any): Error => {
15:   if (err instanceof Error) return err;
16:   if (typeof err === 'object' && err !== null) {
17:     try {
18:       if (Object.prototype.toString.call(err) === '[object Error]') {
19:         // @ts-ignore - not all envs have native support for cause yet
20:         const error = new Error(err.message, err.cause ? { cause: err.cause } : {});
21:         if (err.stack) error.stack = err.stack;
22:         // @ts-ignore - not all envs have native support for cause yet
23:         if (err.cause && !error.cause) error.cause = err.cause;
24:         if (err.name) error.name = err.name;
25:         return error;
26:       }
27:     } catch {}
28:     try {
29:       return new Error(JSON.stringify(err));
30:     } catch {}
31:   }
32:   return new Error(err);
33: };
````

## File: src/internal/headers.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: type HeaderValue = string | undefined | null;
 4: export type HeadersLike =
 5:   | Headers
 6:   | readonly HeaderValue[][]
 7:   | Record<string, HeaderValue | readonly HeaderValue[]>
 8:   | undefined
 9:   | null
10:   | NullableHeaders;
11: 
12: const brand_privateNullableHeaders = Symbol.for('brand.privateNullableHeaders') as symbol & {
13:   description: 'brand.privateNullableHeaders';
14: };
15: 
16: /**
17:  * @internal
18:  * Users can pass explicit nulls to unset default headers. When we parse them
19:  * into a standard headers type we need to preserve that information.
20:  */
21: export type NullableHeaders = {
22:   /** Brand check, prevent users from creating a NullableHeaders. */
23:   [_: typeof brand_privateNullableHeaders]: true;
24:   /** Parsed headers. */
25:   values: Headers;
26:   /** Set of lowercase header names explicitly set to null. */
27:   nulls: Set<string>;
28: };
29: 
30: const isArray = Array.isArray as (val: unknown) => val is readonly unknown[];
31: 
32: function* iterateHeaders(headers: HeadersLike): IterableIterator<readonly [string, string | null]> {
33:   if (!headers) return;
34: 
35:   if (brand_privateNullableHeaders in headers) {
36:     const { values, nulls } = headers as NullableHeaders;
37:     yield* values.entries();
38:     for (const name of nulls) {
39:       yield [name, null];
40:     }
41:     return;
42:   }
43: 
44:   let shouldClear = false;
45:   let iter: Iterable<readonly (HeaderValue | readonly HeaderValue[])[]>;
46:   if (headers instanceof Headers) {
47:     iter = headers.entries();
48:   } else if (isArray(headers)) {
49:     iter = headers;
50:   } else {
51:     shouldClear = true;
52:     iter = Object.entries(headers ?? {});
53:   }
54:   for (let row of iter) {
55:     const name = row[0];
56:     if (typeof name !== 'string') throw new TypeError('expected header name to be a string');
57:     const values = isArray(row[1]) ? row[1] : [row[1]];
58:     let didClear = false;
59:     for (const value of values) {
60:       if (value === undefined) continue;
61: 
62:       // Objects keys always overwrite older headers, they never append.
63:       // Yield a null to clear the header before adding the new values.
64:       if (shouldClear && !didClear) {
65:         didClear = true;
66:         yield [name, null];
67:       }
68:       yield [name, value];
69:     }
70:   }
71: }
72: 
73: export const buildHeaders = (newHeaders: HeadersLike[]): NullableHeaders => {
74:   const targetHeaders = new Headers();
75:   const nullHeaders = new Set<string>();
76:   for (const headers of newHeaders) {
77:     const seenHeaders = new Set<string>();
78:     for (const [name, value] of iterateHeaders(headers)) {
79:       const lowerName = name.toLowerCase();
80:       if (!seenHeaders.has(lowerName)) {
81:         targetHeaders.delete(name);
82:         seenHeaders.add(lowerName);
83:       }
84:       if (value === null) {
85:         targetHeaders.delete(name);
86:         nullHeaders.add(lowerName);
87:       } else {
88:         targetHeaders.append(name, value);
89:         nullHeaders.delete(lowerName);
90:       }
91:     }
92:   }
93:   return { [brand_privateNullableHeaders]: true, values: targetHeaders, nulls: nullHeaders };
94: };
95: 
96: export const isEmptyHeaders = (headers: HeadersLike) => {
97:   for (const _ of iterateHeaders(headers)) return false;
98:   return true;
99: };
````

## File: src/internal/parse.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import type { FinalRequestOptions } from './request-options';
 4: import { Stream } from '../core/streaming';
 5: import { type BaseAnthropic } from '../client';
 6: import { formatRequestDetails, loggerFor } from './utils/log';
 7: import type { AbstractPage } from '../core/pagination';
 8: 
 9: export type APIResponseProps = {
10:   response: Response;
11:   options: FinalRequestOptions;
12:   controller: AbortController;
13:   requestLogID: string;
14:   retryOfRequestLogID: string | undefined;
15:   startTime: number;
16: };
17: 
18: export async function defaultParseResponse<T>(
19:   client: BaseAnthropic,
20:   props: APIResponseProps,
21: ): Promise<WithRequestID<T>> {
22:   const { response, requestLogID, retryOfRequestLogID, startTime } = props;
23:   const body = await (async () => {
24:     if (props.options.stream) {
25:       loggerFor(client).debug('response', response.status, response.url, response.headers, response.body);
26: 
27:       // Note: there is an invariant here that isn't represented in the type system
28:       // that if you set `stream: true` the response type must also be `Stream<T>`
29: 
30:       if (props.options.__streamClass) {
31:         return props.options.__streamClass.fromSSEResponse(response, props.controller) as any;
32:       }
33: 
34:       return Stream.fromSSEResponse(response, props.controller) as any;
35:     }
36: 
37:     // fetch refuses to read the body when the status code is 204.
38:     if (response.status === 204) {
39:       return null as T;
40:     }
41: 
42:     if (props.options.__binaryResponse) {
43:       return response as unknown as T;
44:     }
45: 
46:     const contentType = response.headers.get('content-type');
47:     const mediaType = contentType?.split(';')[0]?.trim();
48:     const isJSON = mediaType?.includes('application/json') || mediaType?.endsWith('+json');
49:     if (isJSON) {
50:       const json = await response.json();
51:       return addRequestID(json as T, response);
52:     }
53: 
54:     const text = await response.text();
55:     return text as unknown as T;
56:   })();
57:   loggerFor(client).debug(
58:     `[${requestLogID}] response parsed`,
59:     formatRequestDetails({
60:       retryOfRequestLogID,
61:       url: response.url,
62:       status: response.status,
63:       body,
64:       durationMs: Date.now() - startTime,
65:     }),
66:   );
67:   return body;
68: }
69: 
70: export type WithRequestID<T> =
71:   T extends Array<any> | Response | AbstractPage<any> ? T
72:   : T extends Record<string, any> ? T & { _request_id?: string | null }
73:   : T;
74: 
75: export function addRequestID<T>(value: T, response: Response): WithRequestID<T> {
76:   if (!value || typeof value !== 'object' || Array.isArray(value)) {
77:     return value as WithRequestID<T>;
78:   }
79: 
80:   return Object.defineProperty(value, '_request_id', {
81:     value: response.headers.get('request-id'),
82:     enumerable: false,
83:   }) as WithRequestID<T>;
84: }
````

## File: src/internal/README.md
````markdown
1: # `internal`
2: 
3: The modules in this directory are not importable outside this package and will change between releases.
````

## File: src/internal/request-options.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import { NullableHeaders } from './headers';
 4: 
 5: import type { BodyInit } from './builtin-types';
 6: import { Stream } from '../core/streaming';
 7: import type { HTTPMethod, MergedRequestInit } from './types';
 8: import { type HeadersLike } from './headers';
 9: 
10: export type FinalRequestOptions = RequestOptions & { method: HTTPMethod; path: string };
11: 
12: export type RequestOptions = {
13:   method?: HTTPMethod;
14:   path?: string;
15:   query?: object | undefined | null;
16:   body?: unknown;
17:   headers?: HeadersLike;
18:   maxRetries?: number;
19:   stream?: boolean | undefined;
20:   timeout?: number;
21:   fetchOptions?: MergedRequestInit;
22:   signal?: AbortSignal | undefined | null;
23:   idempotencyKey?: string;
24: 
25:   __binaryResponse?: boolean | undefined;
26:   __streamClass?: typeof Stream;
27: };
28: 
29: export type EncodedContent = { bodyHeaders: HeadersLike; body: BodyInit };
30: export type RequestEncoder = (request: { headers: NullableHeaders; body: unknown }) => EncodedContent;
31: 
32: export const FallbackEncoder: RequestEncoder = ({ headers, body }) => {
33:   return {
34:     bodyHeaders: {
35:       'content-type': 'application/json',
36:     },
37:     body: JSON.stringify(body),
38:   };
39: };
````

## File: src/internal/shim-types.d.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: /**
 4:  * Shims for types that we can't always rely on being available globally.
 5:  *
 6:  * Note: these only exist at the type-level, there is no corresponding runtime
 7:  * version for any of these symbols.
 8:  */
 9: 
10: /**
11:  * In order to properly access the global `NodeJS` type, if it's available, we
12:  * need to make use of declaration shadowing. Without this, any checks for the
13:  * presence of `NodeJS.ReadableStream` will fail.
14:  */
15: declare namespace NodeJS {
16:   interface ReadableStream {}
17: }
18: 
19: type HasProperties<T> = keyof T extends never ? false : true;
20: 
21: // @ts-ignore
22: type _ReadableStream<R = any> =
23:   // @ts-ignore
24:   HasProperties<NodeJS.ReadableStream> extends true ? NodeJS.ReadableStream<R> : ReadableStream<R>;
25: 
26: // @ts-ignore
27: declare const _ReadableStream: unknown extends typeof ReadableStream ? never : typeof ReadableStream;
28: export { _ReadableStream as ReadableStream };
````

## File: src/internal/shims.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: /**
  4:  * This module provides internal shims and utility functions for environments where certain Node.js or global types may not be available.
  5:  *
  6:  * These are used to ensure we can provide a consistent behaviour between different JavaScript environments and good error
  7:  * messages in cases where an environment isn't fully supported.
  8:  */
  9: 
 10: import { type Fetch } from './builtin-types';
 11: import { type ReadableStream } from './shim-types';
 12: 
 13: export function getDefaultFetch(): Fetch {
 14:   if (typeof fetch !== 'undefined') {
 15:     return fetch as any;
 16:   }
 17: 
 18:   throw new Error(
 19:     '`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`',
 20:   );
 21: }
 22: 
 23: type ReadableStreamArgs = ConstructorParameters<typeof ReadableStream>;
 24: 
 25: export function makeReadableStream(...args: ReadableStreamArgs): ReadableStream {
 26:   const ReadableStream = (globalThis as any).ReadableStream;
 27:   if (typeof ReadableStream === 'undefined') {
 28:     // Note: All of the platforms / runtimes we officially support already define
 29:     // `ReadableStream` as a global, so this should only ever be hit on unsupported runtimes.
 30:     throw new Error(
 31:       '`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`',
 32:     );
 33:   }
 34: 
 35:   return new ReadableStream(...args);
 36: }
 37: 
 38: export function ReadableStreamFrom<T>(iterable: Iterable<T> | AsyncIterable<T>): ReadableStream<T> {
 39:   let iter: AsyncIterator<T> | Iterator<T> =
 40:     Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
 41: 
 42:   return makeReadableStream({
 43:     start() {},
 44:     async pull(controller: any) {
 45:       const { done, value } = await iter.next();
 46:       if (done) {
 47:         controller.close();
 48:       } else {
 49:         controller.enqueue(value);
 50:       }
 51:     },
 52:     async cancel() {
 53:       await iter.return?.();
 54:     },
 55:   });
 56: }
 57: 
 58: /**
 59:  * Most browsers don't yet have async iterable support for ReadableStream,
 60:  * and Node has a very different way of reading bytes from its "ReadableStream".
 61:  *
 62:  * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 63:  */
 64: export function ReadableStreamToAsyncIterable<T>(stream: any): AsyncIterableIterator<T> {
 65:   if (stream[Symbol.asyncIterator]) return stream;
 66: 
 67:   const reader = stream.getReader();
 68:   return {
 69:     async next() {
 70:       try {
 71:         const result = await reader.read();
 72:         if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
 73:         return result;
 74:       } catch (e) {
 75:         reader.releaseLock(); // release lock when stream becomes errored
 76:         throw e;
 77:       }
 78:     },
 79:     async return() {
 80:       const cancelPromise = reader.cancel();
 81:       reader.releaseLock();
 82:       await cancelPromise;
 83:       return { done: true, value: undefined };
 84:     },
 85:     [Symbol.asyncIterator]() {
 86:       return this;
 87:     },
 88:   };
 89: }
 90: 
 91: /**
 92:  * Cancels a ReadableStream we don't need to consume.
 93:  * See https://undici.nodejs.org/#/?id=garbage-collection
 94:  */
 95: export async function CancelReadableStream(stream: any): Promise<void> {
 96:   if (stream === null || typeof stream !== 'object') return;
 97: 
 98:   if (stream[Symbol.asyncIterator]) {
 99:     await stream[Symbol.asyncIterator]().return?.();
100:     return;
101:   }
102: 
103:   const reader = stream.getReader();
104:   const cancelPromise = reader.cancel();
105:   reader.releaseLock();
106:   await cancelPromise;
107: }
````

## File: src/internal/stream-utils.ts
````typescript
 1: /**
 2:  * Most browsers don't yet have async iterable support for ReadableStream,
 3:  * and Node has a very different way of reading bytes from its "ReadableStream".
 4:  *
 5:  * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 6:  */
 7: export function ReadableStreamToAsyncIterable<T>(stream: any): AsyncIterableIterator<T> {
 8:   if (stream[Symbol.asyncIterator]) return stream;
 9: 
10:   const reader = stream.getReader();
11:   return {
12:     async next() {
13:       try {
14:         const result = await reader.read();
15:         if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
16:         return result;
17:       } catch (e) {
18:         reader.releaseLock(); // release lock when stream becomes errored
19:         throw e;
20:       }
21:     },
22:     async return() {
23:       const cancelPromise = reader.cancel();
24:       reader.releaseLock();
25:       await cancelPromise;
26:       return { done: true, value: undefined };
27:     },
28:     [Symbol.asyncIterator]() {
29:       return this;
30:     },
31:   };
32: }
````

## File: src/internal/to-file.ts
````typescript
  1: import { BlobPart, getName, makeFile, isAsyncIterable } from './uploads';
  2: import type { FilePropertyBag } from './builtin-types';
  3: import { checkFileSupport } from './uploads';
  4: 
  5: type BlobLikePart = string | ArrayBuffer | ArrayBufferView | BlobLike | DataView;
  6: 
  7: /**
  8:  * Intended to match DOM Blob, node-fetch Blob, node:buffer Blob, etc.
  9:  * Don't add arrayBuffer here, node-fetch doesn't have it
 10:  */
 11: interface BlobLike {
 12:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size) */
 13:   readonly size: number;
 14:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type) */
 15:   readonly type: string;
 16:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/text) */
 17:   text(): Promise<string>;
 18:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice) */
 19:   slice(start?: number, end?: number): BlobLike;
 20: }
 21: 
 22: /**
 23:  * This check adds the arrayBuffer() method type because it is available and used at runtime
 24:  */
 25: const isBlobLike = (value: any): value is BlobLike & { arrayBuffer(): Promise<ArrayBuffer> } =>
 26:   value != null &&
 27:   typeof value === 'object' &&
 28:   typeof value.size === 'number' &&
 29:   typeof value.type === 'string' &&
 30:   typeof value.text === 'function' &&
 31:   typeof value.slice === 'function' &&
 32:   typeof value.arrayBuffer === 'function';
 33: 
 34: /**
 35:  * Intended to match DOM File, node:buffer File, undici File, etc.
 36:  */
 37: interface FileLike extends BlobLike {
 38:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
 39:   readonly lastModified: number;
 40:   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
 41:   readonly name?: string | undefined;
 42: }
 43: 
 44: /**
 45:  * This check adds the arrayBuffer() method type because it is available and used at runtime
 46:  */
 47: const isFileLike = (value: any): value is FileLike & { arrayBuffer(): Promise<ArrayBuffer> } =>
 48:   value != null &&
 49:   typeof value === 'object' &&
 50:   typeof value.name === 'string' &&
 51:   typeof value.lastModified === 'number' &&
 52:   isBlobLike(value);
 53: 
 54: /**
 55:  * Intended to match DOM Response, node-fetch Response, undici Response, etc.
 56:  */
 57: export interface ResponseLike {
 58:   url: string;
 59:   blob(): Promise<BlobLike>;
 60: }
 61: 
 62: const isResponseLike = (value: any): value is ResponseLike =>
 63:   value != null &&
 64:   typeof value === 'object' &&
 65:   typeof value.url === 'string' &&
 66:   typeof value.blob === 'function';
 67: 
 68: export type ToFileInput =
 69:   | FileLike
 70:   | ResponseLike
 71:   | Exclude<BlobLikePart, string>
 72:   | AsyncIterable<BlobLikePart>;
 73: 
 74: /**
 75:  * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
 76:  * @param value the raw content of the file.  Can be an {@link Uploadable}, {@link BlobLikePart}, or {@link AsyncIterable} of {@link BlobLikePart}s
 77:  * @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
 78:  * @param {Object=} options additional properties
 79:  * @param {string=} options.type the MIME type of the content
 80:  * @param {number=} options.lastModified the last modified timestamp
 81:  * @returns a {@link File} with the given properties
 82:  */
 83: export async function toFile(
 84:   value: ToFileInput | PromiseLike<ToFileInput>,
 85:   name?: string | null | undefined,
 86:   options?: FilePropertyBag | undefined,
 87: ): Promise<File> {
 88:   checkFileSupport();
 89: 
 90:   // If it's a promise, resolve it.
 91:   value = await value;
 92: 
 93:   name ||= getName(value);
 94: 
 95:   // If we've been given a `File` we don't need to do anything if the name / options
 96:   // have not been customised.
 97:   if (isFileLike(value)) {
 98:     if (value instanceof File && name == null && options == null) {
 99:       return value;
100:     }
101:     return makeFile([await value.arrayBuffer()], name ?? value.name, {
102:       type: value.type,
103:       lastModified: value.lastModified,
104:       ...options,
105:     });
106:   }
107: 
108:   if (isResponseLike(value)) {
109:     const blob = await value.blob();
110:     name ||= new URL(value.url).pathname.split(/[\\/]/).pop();
111: 
112:     return makeFile(await getBytes(blob), name, options);
113:   }
114: 
115:   const parts = await getBytes(value);
116: 
117:   if (!options?.type) {
118:     const type = parts.find((part) => typeof part === 'object' && 'type' in part && part.type);
119:     if (typeof type === 'string') {
120:       options = { ...options, type };
121:     }
122:   }
123: 
124:   return makeFile(parts, name, options);
125: }
126: 
127: async function getBytes(value: BlobLikePart | AsyncIterable<BlobLikePart>): Promise<Array<BlobPart>> {
128:   let parts: Array<BlobPart> = [];
129:   if (
130:     typeof value === 'string' ||
131:     ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
132:     value instanceof ArrayBuffer
133:   ) {
134:     parts.push(value);
135:   } else if (isBlobLike(value)) {
136:     parts.push(value instanceof Blob ? value : await value.arrayBuffer());
137:   } else if (
138:     isAsyncIterable(value) // includes Readable, ReadableStream, etc.
139:   ) {
140:     for await (const chunk of value) {
141:       parts.push(...(await getBytes(chunk as BlobLikePart))); // TODO, consider validating?
142:     }
143:   } else {
144:     const constructor = value?.constructor?.name;
145:     throw new Error(
146:       `Unexpected data type: ${typeof value}${
147:         constructor ? `; constructor: ${constructor}` : ''
148:       }${propsForError(value)}`,
149:     );
150:   }
151: 
152:   return parts;
153: }
154: 
155: function propsForError(value: unknown): string {
156:   if (typeof value !== 'object' || value === null) return '';
157:   const props = Object.getOwnPropertyNames(value);
158:   return `; props: [${props.map((p) => `"${p}"`).join(', ')}]`;
159: }
````

## File: src/internal/types.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: export type PromiseOrValue<T> = T | Promise<T>;
 4: export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
 5: 
 6: export type KeysEnum<T> = { [P in keyof Required<T>]: true };
 7: 
 8: export type FinalizedRequestInit = RequestInit & { headers: Headers };
 9: 
10: type NotAny<T> = [unknown] extends [T] ? never : T;
11: 
12: /**
13:  * Some environments overload the global fetch function, and Parameters<T> only gets the last signature.
14:  */
15: type OverloadedParameters<T> =
16:   T extends (
17:     {
18:       (...args: infer A): unknown;
19:       (...args: infer B): unknown;
20:       (...args: infer C): unknown;
21:       (...args: infer D): unknown;
22:     }
23:   ) ?
24:     A | B | C | D
25:   : T extends (
26:     {
27:       (...args: infer A): unknown;
28:       (...args: infer B): unknown;
29:       (...args: infer C): unknown;
30:     }
31:   ) ?
32:     A | B | C
33:   : T extends (
34:     {
35:       (...args: infer A): unknown;
36:       (...args: infer B): unknown;
37:     }
38:   ) ?
39:     A | B
40:   : T extends (...args: infer A) => unknown ? A
41:   : never;
42: 
43: /* eslint-disable */
44: /**
45:  * These imports attempt to get types from a parent package's dependencies.
46:  * Unresolved bare specifiers can trigger [automatic type acquisition][1] in some projects, which
47:  * would cause typescript to show types not present at runtime. To avoid this, we import
48:  * directly from parent node_modules folders.
49:  *
50:  * We need to check multiple levels because we don't know what directory structure we'll be in.
51:  * For example, pnpm generates directories like this:
52:  * ```
53:  * node_modules
54:  * ├── .pnpm
55:  * │   └── pkg@1.0.0
56:  * │       └── node_modules
57:  * │           └── pkg
58:  * │               └── internal
59:  * │                   └── types.d.ts
60:  * ├── pkg -> .pnpm/pkg@1.0.0/node_modules/pkg
61:  * └── undici
62:  * ```
63:  *
64:  * [1]: https://www.typescriptlang.org/tsconfig/#typeAcquisition
65:  */
66: /** @ts-ignore For users with \@types/node */
67: type UndiciTypesRequestInit = NotAny<import('../node_modules/undici-types').RequestInit> | NotAny<import('../../node_modules/undici-types').RequestInit> | NotAny<import('../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../../../../../node_modules/undici-types').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/undici-types').RequestInit>;
68: /** @ts-ignore For users with undici */
69: type UndiciRequestInit = NotAny<import('../node_modules/undici').RequestInit> | NotAny<import('../../node_modules/undici').RequestInit> | NotAny<import('../../../node_modules/undici').RequestInit> | NotAny<import('../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../../../../../node_modules/undici').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/undici').RequestInit>;
70: /** @ts-ignore For users with \@types/bun */
71: type BunRequestInit = globalThis.FetchRequestInit;
72: /** @ts-ignore For users with node-fetch */
73: type NodeFetchRequestInit = NotAny<import('../node_modules/node-fetch').RequestInit> | NotAny<import('../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../../node_modules/node-fetch').RequestInit> | NotAny<import('../../../../../../../../../../node_modules/node-fetch').RequestInit>;
74: /** @ts-ignore For users who use Deno */
75: type FetchRequestInit = NonNullable<OverloadedParameters<typeof fetch>[1]>;
76: /* eslint-enable */
77: 
78: type RequestInits =
79:   | NotAny<UndiciTypesRequestInit>
80:   | NotAny<UndiciRequestInit>
81:   | NotAny<BunRequestInit>
82:   | NotAny<NodeFetchRequestInit>
83:   | NotAny<RequestInit>
84:   | NotAny<FetchRequestInit>;
85: 
86: /**
87:  * This type contains `RequestInit` options that may be available on the current runtime,
88:  * including per-platform extensions like `dispatcher`, `agent`, `client`, etc.
89:  */
90: export type MergedRequestInit = RequestInits &
91:   /** We don't include these in the types as they'll be overridden for every request. */
92:   Partial<Record<'body' | 'headers' | 'method' | 'signal', never>>;
````

## File: src/internal/uploads.ts
````typescript
  1: import { type RequestOptions } from './request-options';
  2: import type { FilePropertyBag, Fetch } from './builtin-types';
  3: import type { BaseAnthropic } from '../client';
  4: import { ReadableStreamFrom } from './shims';
  5: 
  6: export type BlobPart = string | ArrayBuffer | ArrayBufferView | Blob | DataView;
  7: type FsReadStream = AsyncIterable<Uint8Array> & { path: string | { toString(): string } };
  8: 
  9: // https://github.com/oven-sh/bun/issues/5980
 10: interface BunFile extends Blob {
 11:   readonly name?: string | undefined;
 12: }
 13: 
 14: export const checkFileSupport = () => {
 15:   if (typeof File === 'undefined') {
 16:     const { process } = globalThis as any;
 17:     const isOldNode =
 18:       typeof process?.versions?.node === 'string' && parseInt(process.versions.node.split('.')) < 20;
 19:     throw new Error(
 20:       '`File` is not defined as a global, which is required for file uploads.' +
 21:         (isOldNode ?
 22:           " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`."
 23:         : ''),
 24:     );
 25:   }
 26: };
 27: 
 28: /**
 29:  * Typically, this is a native "File" class.
 30:  *
 31:  * We provide the {@link toFile} utility to convert a variety of objects
 32:  * into the File class.
 33:  *
 34:  * For convenience, you can also pass a fetch Response, or in Node,
 35:  * the result of fs.createReadStream().
 36:  */
 37: export type Uploadable = File | Response | FsReadStream | BunFile;
 38: 
 39: /**
 40:  * Construct a `File` instance. This is used to ensure a helpful error is thrown
 41:  * for environments that don't define a global `File` yet.
 42:  */
 43: export function makeFile(
 44:   fileBits: BlobPart[],
 45:   fileName: string | undefined,
 46:   options?: FilePropertyBag,
 47: ): File {
 48:   checkFileSupport();
 49:   return new File(fileBits as any, fileName ?? 'unknown_file', options);
 50: }
 51: 
 52: export function getName(value: any): string | undefined {
 53:   return (
 54:     (
 55:       (typeof value === 'object' &&
 56:         value !== null &&
 57:         (('name' in value && value.name && String(value.name)) ||
 58:           ('url' in value && value.url && String(value.url)) ||
 59:           ('filename' in value && value.filename && String(value.filename)) ||
 60:           ('path' in value && value.path && String(value.path)))) ||
 61:       ''
 62:     )
 63:       .split(/[\\/]/)
 64:       .pop() || undefined
 65:   );
 66: }
 67: 
 68: export const isAsyncIterable = (value: any): value is AsyncIterable<any> =>
 69:   value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
 70: 
 71: /**
 72:  * Returns a multipart/form-data request if any part of the given request body contains a File / Blob value.
 73:  * Otherwise returns the request as is.
 74:  */
 75: export const maybeMultipartFormRequestOptions = async (
 76:   opts: RequestOptions,
 77:   fetch: BaseAnthropic | Fetch,
 78: ): Promise<RequestOptions> => {
 79:   if (!hasUploadableValue(opts.body)) return opts;
 80: 
 81:   return { ...opts, body: await createForm(opts.body, fetch) };
 82: };
 83: 
 84: type MultipartFormRequestOptions = Omit<RequestOptions, 'body'> & { body: unknown };
 85: 
 86: export const multipartFormRequestOptions = async (
 87:   opts: MultipartFormRequestOptions,
 88:   fetch: BaseAnthropic | Fetch,
 89: ): Promise<RequestOptions> => {
 90:   return { ...opts, body: await createForm(opts.body, fetch) };
 91: };
 92: 
 93: const supportsFormDataMap = new WeakMap<Fetch, Promise<boolean>>();
 94: 
 95: /**
 96:  * node-fetch doesn't support the global FormData object in recent node versions. Instead of sending
 97:  * properly-encoded form data, it just stringifies the object, resulting in a request body of "[object FormData]".
 98:  * This function detects if the fetch function provided supports the global FormData object to avoid
 99:  * confusing error messages later on.
100:  */
101: function supportsFormData(fetchObject: BaseAnthropic | Fetch): Promise<boolean> {
102:   const fetch: Fetch = typeof fetchObject === 'function' ? fetchObject : (fetchObject as any).fetch;
103:   const cached = supportsFormDataMap.get(fetch);
104:   if (cached) return cached;
105:   const promise = (async () => {
106:     try {
107:       const FetchResponse = (
108:         'Response' in fetch ?
109:           fetch.Response
110:         : (await fetch('data:,')).constructor) as typeof Response;
111:       const data = new FormData();
112:       if (data.toString() === (await new FetchResponse(data).text())) {
113:         return false;
114:       }
115:       return true;
116:     } catch {
117:       // avoid false negatives
118:       return true;
119:     }
120:   })();
121:   supportsFormDataMap.set(fetch, promise);
122:   return promise;
123: }
124: 
125: export const createForm = async <T = Record<string, unknown>>(
126:   body: T | undefined,
127:   fetch: BaseAnthropic | Fetch,
128: ): Promise<FormData> => {
129:   if (!(await supportsFormData(fetch))) {
130:     throw new TypeError(
131:       'The provided fetch function does not support file uploads with the current global FormData class.',
132:     );
133:   }
134:   const form = new FormData();
135:   await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
136:   return form;
137: };
138: 
139: // We check for Blob not File because Bun.File doesn't inherit from File,
140: // but they both inherit from Blob and have a `name` property at runtime.
141: const isNamedBlob = (value: object): value is Blob => value instanceof Blob && 'name' in value;
142: 
143: const isUploadable = (value: unknown) =>
144:   typeof value === 'object' &&
145:   value !== null &&
146:   (value instanceof Response || isAsyncIterable(value) || isNamedBlob(value));
147: 
148: const hasUploadableValue = (value: unknown): boolean => {
149:   if (isUploadable(value)) return true;
150:   if (Array.isArray(value)) return value.some(hasUploadableValue);
151:   if (value && typeof value === 'object') {
152:     for (const k in value) {
153:       if (hasUploadableValue((value as any)[k])) return true;
154:     }
155:   }
156:   return false;
157: };
158: 
159: const addFormValue = async (form: FormData, key: string, value: unknown): Promise<void> => {
160:   if (value === undefined) return;
161:   if (value == null) {
162:     throw new TypeError(
163:       `Received null for "${key}"; to pass null in FormData, you must use the string 'null'`,
164:     );
165:   }
166: 
167:   // TODO: make nested formats configurable
168:   if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
169:     form.append(key, String(value));
170:   } else if (value instanceof Response) {
171:     let options = {} as FilePropertyBag;
172:     const contentType = value.headers.get('Content-Type');
173:     if (contentType) {
174:       options = { type: contentType };
175:     }
176: 
177:     form.append(key, makeFile([await value.blob()], getName(value), options));
178:   } else if (isAsyncIterable(value)) {
179:     form.append(key, makeFile([await new Response(ReadableStreamFrom(value)).blob()], getName(value)));
180:   } else if (isNamedBlob(value)) {
181:     form.append(key, makeFile([value], getName(value), { type: value.type }));
182:   } else if (Array.isArray(value)) {
183:     await Promise.all(value.map((entry) => addFormValue(form, key + '[]', entry)));
184:   } else if (typeof value === 'object') {
185:     await Promise.all(
186:       Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)),
187:     );
188:   } else {
189:     throw new TypeError(
190:       `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`,
191:     );
192:   }
193: };
````

## File: src/internal/utils.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export * from './utils/values';
4: export * from './utils/base64';
5: export * from './utils/env';
6: export * from './utils/log';
7: export * from './utils/uuid';
8: export * from './utils/sleep';
````

## File: src/lib/.keep
````
1: File generated from our OpenAPI spec by Stainless.
2: 
3: This directory can be used to store custom files to expand the SDK.
4: It is ignored by Stainless code generation and its content (other than this keep file) won't be touched.
````

## File: src/lib/BetaMessageStream.ts
````typescript
  1: import { isAbortError } from '../internal/errors';
  2: import { AnthropicError, APIUserAbortError } from '../error';
  3: import {
  4:   type BetaContentBlock,
  5:   Messages as BetaMessages,
  6:   type BetaMessage,
  7:   type BetaRawMessageStreamEvent as BetaMessageStreamEvent,
  8:   type BetaMessageParam,
  9:   type MessageCreateParams as BetaMessageCreateParams,
 10:   type MessageCreateParamsBase as BetaMessageCreateParamsBase,
 11:   type BetaTextBlock,
 12:   type BetaTextCitation,
 13: } from '../resources/beta/messages/messages';
 14: import { Stream } from '../streaming';
 15: import { partialParse } from '../_vendor/partial-json-parser/parser';
 16: import { type RequestOptions } from '../internal/request-options';
 17: import { type ReadableStream } from '../internal/shim-types';
 18: 
 19: export interface MessageStreamEvents {
 20:   connect: () => void;
 21:   streamEvent: (event: BetaMessageStreamEvent, snapshot: BetaMessage) => void;
 22:   text: (textDelta: string, textSnapshot: string) => void;
 23:   citation: (citation: BetaTextCitation, citationsSnapshot: BetaTextCitation[]) => void;
 24:   inputJson: (partialJson: string, jsonSnapshot: unknown) => void;
 25:   thinking: (thinkingDelta: string, thinkingSnapshot: string) => void;
 26:   signature: (signature: string) => void;
 27:   message: (message: BetaMessage) => void;
 28:   contentBlock: (content: BetaContentBlock) => void;
 29:   finalMessage: (message: BetaMessage) => void;
 30:   error: (error: AnthropicError) => void;
 31:   abort: (error: APIUserAbortError) => void;
 32:   end: () => void;
 33: }
 34: 
 35: type MessageStreamEventListeners<Event extends keyof MessageStreamEvents> = {
 36:   listener: MessageStreamEvents[Event];
 37:   once?: boolean;
 38: }[];
 39: 
 40: const JSON_BUF_PROPERTY = '__json_buf';
 41: 
 42: export class BetaMessageStream implements AsyncIterable<BetaMessageStreamEvent> {
 43:   messages: BetaMessageParam[] = [];
 44:   receivedMessages: BetaMessage[] = [];
 45:   #currentMessageSnapshot: BetaMessage | undefined;
 46: 
 47:   controller: AbortController = new AbortController();
 48: 
 49:   #connectedPromise: Promise<Response | null>;
 50:   #resolveConnectedPromise: (response: Response | null) => void = () => {};
 51:   #rejectConnectedPromise: (error: AnthropicError) => void = () => {};
 52: 
 53:   #endPromise: Promise<void>;
 54:   #resolveEndPromise: () => void = () => {};
 55:   #rejectEndPromise: (error: AnthropicError) => void = () => {};
 56: 
 57:   #listeners: { [Event in keyof MessageStreamEvents]?: MessageStreamEventListeners<Event> } = {};
 58: 
 59:   #ended = false;
 60:   #errored = false;
 61:   #aborted = false;
 62:   #catchingPromiseCreated = false;
 63:   #response: Response | null | undefined;
 64:   #request_id: string | null | undefined;
 65: 
 66:   constructor() {
 67:     this.#connectedPromise = new Promise<Response | null>((resolve, reject) => {
 68:       this.#resolveConnectedPromise = resolve;
 69:       this.#rejectConnectedPromise = reject;
 70:     });
 71: 
 72:     this.#endPromise = new Promise<void>((resolve, reject) => {
 73:       this.#resolveEndPromise = resolve;
 74:       this.#rejectEndPromise = reject;
 75:     });
 76: 
 77:     // Don't let these promises cause unhandled rejection errors.
 78:     // we will manually cause an unhandled rejection error later
 79:     // if the user hasn't registered any error listener or called
 80:     // any promise-returning method.
 81:     this.#connectedPromise.catch(() => {});
 82:     this.#endPromise.catch(() => {});
 83:   }
 84: 
 85:   get response(): Response | null | undefined {
 86:     return this.#response;
 87:   }
 88: 
 89:   get request_id(): string | null | undefined {
 90:     return this.#request_id;
 91:   }
 92: 
 93:   /**
 94:    * Returns the `MessageStream` data, the raw `Response` instance and the ID of the request,
 95:    * returned vie the `request-id` header which is useful for debugging requests and resporting
 96:    * issues to Anthropic.
 97:    *
 98:    * This is the same as the `APIPromise.withResponse()` method.
 99:    *
100:    * This method will raise an error if you created the stream using `MessageStream.fromReadableStream`
101:    * as no `Response` is available.
102:    */
103:   async withResponse(): Promise<{
104:     data: BetaMessageStream;
105:     response: Response;
106:     request_id: string | null | undefined;
107:   }> {
108:     const response = await this.#connectedPromise;
109:     if (!response) {
110:       throw new Error('Could not resolve a `Response` object');
111:     }
112: 
113:     return {
114:       data: this,
115:       response,
116:       request_id: response.headers.get('request-id'),
117:     };
118:   }
119: 
120:   /**
121:    * Intended for use on the frontend, consuming a stream produced with
122:    * `.toReadableStream()` on the backend.
123:    *
124:    * Note that messages sent to the model do not appear in `.on('message')`
125:    * in this context.
126:    */
127:   static fromReadableStream(stream: ReadableStream): BetaMessageStream {
128:     const runner = new BetaMessageStream();
129:     runner._run(() => runner._fromReadableStream(stream));
130:     return runner;
131:   }
132: 
133:   static createMessage(
134:     messages: BetaMessages,
135:     params: BetaMessageCreateParamsBase,
136:     options?: RequestOptions,
137:   ): BetaMessageStream {
138:     const runner = new BetaMessageStream();
139:     for (const message of params.messages) {
140:       runner._addMessageParam(message);
141:     }
142:     runner._run(() =>
143:       runner._createMessage(
144:         messages,
145:         { ...params, stream: true },
146:         { ...options, headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'stream' } },
147:       ),
148:     );
149:     return runner;
150:   }
151: 
152:   protected _run(executor: () => Promise<any>) {
153:     executor().then(() => {
154:       this._emitFinal();
155:       this._emit('end');
156:     }, this.#handleError);
157:   }
158: 
159:   protected _addMessageParam(message: BetaMessageParam) {
160:     this.messages.push(message);
161:   }
162: 
163:   protected _addMessage(message: BetaMessage, emit = true) {
164:     this.receivedMessages.push(message);
165:     if (emit) {
166:       this._emit('message', message);
167:     }
168:   }
169: 
170:   protected async _createMessage(
171:     messages: BetaMessages,
172:     params: BetaMessageCreateParams,
173:     options?: RequestOptions,
174:   ): Promise<void> {
175:     const signal = options?.signal;
176:     if (signal) {
177:       if (signal.aborted) this.controller.abort();
178:       signal.addEventListener('abort', () => this.controller.abort());
179:     }
180:     this.#beginRequest();
181:     const { response, data: stream } = await messages
182:       .create({ ...params, stream: true }, { ...options, signal: this.controller.signal })
183:       .withResponse();
184:     this._connected(response);
185:     for await (const event of stream) {
186:       this.#addStreamEvent(event);
187:     }
188:     if (stream.controller.signal?.aborted) {
189:       throw new APIUserAbortError();
190:     }
191:     this.#endRequest();
192:   }
193: 
194:   protected _connected(response: Response | null) {
195:     if (this.ended) return;
196:     this.#response = response;
197:     this.#request_id = response?.headers.get('request-id');
198:     this.#resolveConnectedPromise(response);
199:     this._emit('connect');
200:   }
201: 
202:   get ended(): boolean {
203:     return this.#ended;
204:   }
205: 
206:   get errored(): boolean {
207:     return this.#errored;
208:   }
209: 
210:   get aborted(): boolean {
211:     return this.#aborted;
212:   }
213: 
214:   abort() {
215:     this.controller.abort();
216:   }
217: 
218:   /**
219:    * Adds the listener function to the end of the listeners array for the event.
220:    * No checks are made to see if the listener has already been added. Multiple calls passing
221:    * the same combination of event and listener will result in the listener being added, and
222:    * called, multiple times.
223:    * @returns this MessageStream, so that calls can be chained
224:    */
225:   on<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
226:     const listeners: MessageStreamEventListeners<Event> =
227:       this.#listeners[event] || (this.#listeners[event] = []);
228:     listeners.push({ listener });
229:     return this;
230:   }
231: 
232:   /**
233:    * Removes the specified listener from the listener array for the event.
234:    * off() will remove, at most, one instance of a listener from the listener array. If any single
235:    * listener has been added multiple times to the listener array for the specified event, then
236:    * off() must be called multiple times to remove each instance.
237:    * @returns this MessageStream, so that calls can be chained
238:    */
239:   off<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
240:     const listeners = this.#listeners[event];
241:     if (!listeners) return this;
242:     const index = listeners.findIndex((l) => l.listener === listener);
243:     if (index >= 0) listeners.splice(index, 1);
244:     return this;
245:   }
246: 
247:   /**
248:    * Adds a one-time listener function for the event. The next time the event is triggered,
249:    * this listener is removed and then invoked.
250:    * @returns this MessageStream, so that calls can be chained
251:    */
252:   once<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
253:     const listeners: MessageStreamEventListeners<Event> =
254:       this.#listeners[event] || (this.#listeners[event] = []);
255:     listeners.push({ listener, once: true });
256:     return this;
257:   }
258: 
259:   /**
260:    * This is similar to `.once()`, but returns a Promise that resolves the next time
261:    * the event is triggered, instead of calling a listener callback.
262:    * @returns a Promise that resolves the next time given event is triggered,
263:    * or rejects if an error is emitted.  (If you request the 'error' event,
264:    * returns a promise that resolves with the error).
265:    *
266:    * Example:
267:    *
268:    *   const message = await stream.emitted('message') // rejects if the stream errors
269:    */
270:   emitted<Event extends keyof MessageStreamEvents>(
271:     event: Event,
272:   ): Promise<
273:     Parameters<MessageStreamEvents[Event]> extends [infer Param] ? Param
274:     : Parameters<MessageStreamEvents[Event]> extends [] ? void
275:     : Parameters<MessageStreamEvents[Event]>
276:   > {
277:     return new Promise((resolve, reject) => {
278:       this.#catchingPromiseCreated = true;
279:       if (event !== 'error') this.once('error', reject);
280:       this.once(event, resolve as any);
281:     });
282:   }
283: 
284:   async done(): Promise<void> {
285:     this.#catchingPromiseCreated = true;
286:     await this.#endPromise;
287:   }
288: 
289:   get currentMessage(): BetaMessage | undefined {
290:     return this.#currentMessageSnapshot;
291:   }
292: 
293:   #getFinalMessage(): BetaMessage {
294:     if (this.receivedMessages.length === 0) {
295:       throw new AnthropicError('stream ended without producing a Message with role=assistant');
296:     }
297:     return this.receivedMessages.at(-1)!;
298:   }
299: 
300:   /**
301:    * @returns a promise that resolves with the the final assistant Message response,
302:    * or rejects if an error occurred or the stream ended prematurely without producing a Message.
303:    */
304:   async finalMessage(): Promise<BetaMessage> {
305:     await this.done();
306:     return this.#getFinalMessage();
307:   }
308: 
309:   #getFinalText(): string {
310:     if (this.receivedMessages.length === 0) {
311:       throw new AnthropicError('stream ended without producing a Message with role=assistant');
312:     }
313:     const textBlocks = this.receivedMessages
314:       .at(-1)!
315:       .content.filter((block): block is BetaTextBlock => block.type === 'text')
316:       .map((block) => block.text);
317:     if (textBlocks.length === 0) {
318:       throw new AnthropicError('stream ended without producing a content block with type=text');
319:     }
320:     return textBlocks.join(' ');
321:   }
322: 
323:   /**
324:    * @returns a promise that resolves with the the final assistant Message's text response, concatenated
325:    * together if there are more than one text blocks.
326:    * Rejects if an error occurred or the stream ended prematurely without producing a Message.
327:    */
328:   async finalText(): Promise<string> {
329:     await this.done();
330:     return this.#getFinalText();
331:   }
332: 
333:   #handleError = (error: unknown) => {
334:     this.#errored = true;
335:     if (isAbortError(error)) {
336:       error = new APIUserAbortError();
337:     }
338:     if (error instanceof APIUserAbortError) {
339:       this.#aborted = true;
340:       return this._emit('abort', error);
341:     }
342:     if (error instanceof AnthropicError) {
343:       return this._emit('error', error);
344:     }
345:     if (error instanceof Error) {
346:       const anthropicError: AnthropicError = new AnthropicError(error.message);
347:       // @ts-ignore
348:       anthropicError.cause = error;
349:       return this._emit('error', anthropicError);
350:     }
351:     return this._emit('error', new AnthropicError(String(error)));
352:   };
353: 
354:   protected _emit<Event extends keyof MessageStreamEvents>(
355:     event: Event,
356:     ...args: Parameters<MessageStreamEvents[Event]>
357:   ) {
358:     // make sure we don't emit any MessageStreamEvents after end
359:     if (this.#ended) return;
360: 
361:     if (event === 'end') {
362:       this.#ended = true;
363:       this.#resolveEndPromise();
364:     }
365: 
366:     const listeners: MessageStreamEventListeners<Event> | undefined = this.#listeners[event];
367:     if (listeners) {
368:       this.#listeners[event] = listeners.filter((l) => !l.once) as any;
369:       listeners.forEach(({ listener }: any) => listener(...args));
370:     }
371: 
372:     if (event === 'abort') {
373:       const error = args[0] as APIUserAbortError;
374:       if (!this.#catchingPromiseCreated && !listeners?.length) {
375:         Promise.reject(error);
376:       }
377:       this.#rejectConnectedPromise(error);
378:       this.#rejectEndPromise(error);
379:       this._emit('end');
380:       return;
381:     }
382: 
383:     if (event === 'error') {
384:       // NOTE: _emit('error', error) should only be called from #handleError().
385: 
386:       const error = args[0] as AnthropicError;
387:       if (!this.#catchingPromiseCreated && !listeners?.length) {
388:         // Trigger an unhandled rejection if the user hasn't registered any error handlers.
389:         // If you are seeing stack traces here, make sure to handle errors via either:
390:         // - runner.on('error', () => ...)
391:         // - await runner.done()
392:         // - await runner.final...()
393:         // - etc.
394:         Promise.reject(error);
395:       }
396:       this.#rejectConnectedPromise(error);
397:       this.#rejectEndPromise(error);
398:       this._emit('end');
399:     }
400:   }
401: 
402:   protected _emitFinal() {
403:     const finalMessage = this.receivedMessages.at(-1);
404:     if (finalMessage) {
405:       this._emit('finalMessage', this.#getFinalMessage());
406:     }
407:   }
408: 
409:   #beginRequest() {
410:     if (this.ended) return;
411:     this.#currentMessageSnapshot = undefined;
412:   }
413:   #addStreamEvent(event: BetaMessageStreamEvent) {
414:     if (this.ended) return;
415:     const messageSnapshot = this.#accumulateMessage(event);
416:     this._emit('streamEvent', event, messageSnapshot);
417: 
418:     switch (event.type) {
419:       case 'content_block_delta': {
420:         const content = messageSnapshot.content.at(-1)!;
421:         switch (event.delta.type) {
422:           case 'text_delta': {
423:             if (content.type === 'text') {
424:               this._emit('text', event.delta.text, content.text || '');
425:             }
426:             break;
427:           }
428:           case 'citations_delta': {
429:             if (content.type === 'text') {
430:               this._emit('citation', event.delta.citation, content.citations ?? []);
431:             }
432:             break;
433:           }
434:           case 'input_json_delta': {
435:             if ((content.type === 'tool_use' || content.type === 'mcp_tool_use') && content.input) {
436:               this._emit('inputJson', event.delta.partial_json, content.input);
437:             }
438:             break;
439:           }
440:           case 'thinking_delta': {
441:             if (content.type === 'thinking') {
442:               this._emit('thinking', event.delta.thinking, content.thinking);
443:             }
444:             break;
445:           }
446:           case 'signature_delta': {
447:             if (content.type === 'thinking') {
448:               this._emit('signature', content.signature);
449:             }
450:             break;
451:           }
452:           default:
453:             checkNever(event.delta);
454:         }
455:         break;
456:       }
457:       case 'message_stop': {
458:         this._addMessageParam(messageSnapshot);
459:         this._addMessage(messageSnapshot, true);
460:         break;
461:       }
462:       case 'content_block_stop': {
463:         this._emit('contentBlock', messageSnapshot.content.at(-1)!);
464:         break;
465:       }
466:       case 'message_start': {
467:         this.#currentMessageSnapshot = messageSnapshot;
468:         break;
469:       }
470:       case 'content_block_start':
471:       case 'message_delta':
472:         break;
473:     }
474:   }
475:   #endRequest(): BetaMessage {
476:     if (this.ended) {
477:       throw new AnthropicError(`stream has ended, this shouldn't happen`);
478:     }
479:     const snapshot = this.#currentMessageSnapshot;
480:     if (!snapshot) {
481:       throw new AnthropicError(`request ended without sending any chunks`);
482:     }
483:     this.#currentMessageSnapshot = undefined;
484:     return snapshot;
485:   }
486: 
487:   protected async _fromReadableStream(
488:     readableStream: ReadableStream,
489:     options?: RequestOptions,
490:   ): Promise<void> {
491:     const signal = options?.signal;
492:     if (signal) {
493:       if (signal.aborted) this.controller.abort();
494:       signal.addEventListener('abort', () => this.controller.abort());
495:     }
496:     this.#beginRequest();
497:     this._connected(null);
498:     const stream = Stream.fromReadableStream<BetaMessageStreamEvent>(readableStream, this.controller);
499:     for await (const event of stream) {
500:       this.#addStreamEvent(event);
501:     }
502:     if (stream.controller.signal?.aborted) {
503:       throw new APIUserAbortError();
504:     }
505:     this.#endRequest();
506:   }
507: 
508:   /**
509:    * Mutates this.#currentMessage with the current event. Handling the accumulation of multiple messages
510:    * will be needed to be handled by the caller, this method will throw if you try to accumulate for multiple
511:    * messages.
512:    */
513:   #accumulateMessage(event: BetaMessageStreamEvent): BetaMessage {
514:     let snapshot = this.#currentMessageSnapshot;
515: 
516:     if (event.type === 'message_start') {
517:       if (snapshot) {
518:         throw new AnthropicError(`Unexpected event order, got ${event.type} before receiving "message_stop"`);
519:       }
520:       return event.message;
521:     }
522: 
523:     if (!snapshot) {
524:       throw new AnthropicError(`Unexpected event order, got ${event.type} before "message_start"`);
525:     }
526: 
527:     switch (event.type) {
528:       case 'message_stop':
529:         return snapshot;
530:       case 'message_delta':
531:         snapshot.container = event.delta.container;
532:         snapshot.stop_reason = event.delta.stop_reason;
533:         snapshot.stop_sequence = event.delta.stop_sequence;
534:         snapshot.usage.output_tokens = event.usage.output_tokens;
535: 
536:         if (event.usage.input_tokens != null) {
537:           snapshot.usage.input_tokens = event.usage.input_tokens;
538:         }
539: 
540:         if (event.usage.cache_creation_input_tokens != null) {
541:           snapshot.usage.cache_creation_input_tokens = event.usage.cache_creation_input_tokens;
542:         }
543: 
544:         if (event.usage.cache_read_input_tokens != null) {
545:           snapshot.usage.cache_read_input_tokens = event.usage.cache_read_input_tokens;
546:         }
547: 
548:         if (event.usage.server_tool_use != null) {
549:           snapshot.usage.server_tool_use = event.usage.server_tool_use;
550:         }
551: 
552:         return snapshot;
553:       case 'content_block_start':
554:         snapshot.content.push(event.content_block);
555:         return snapshot;
556:       case 'content_block_delta': {
557:         const snapshotContent = snapshot.content.at(event.index);
558: 
559:         switch (event.delta.type) {
560:           case 'text_delta': {
561:             if (snapshotContent?.type === 'text') {
562:               snapshotContent.text += event.delta.text;
563:             }
564:             break;
565:           }
566:           case 'citations_delta': {
567:             if (snapshotContent?.type === 'text') {
568:               snapshotContent.citations ??= [];
569:               snapshotContent.citations.push(event.delta.citation);
570:             }
571:             break;
572:           }
573:           case 'input_json_delta': {
574:             if (snapshotContent?.type === 'tool_use' || snapshotContent?.type === 'mcp_tool_use') {
575:               // we need to keep track of the raw JSON string as well so that we can
576:               // re-parse it for each delta, for now we just store it as an untyped
577:               // non-enumerable property on the snapshot
578:               let jsonBuf = (snapshotContent as any)[JSON_BUF_PROPERTY] || '';
579:               jsonBuf += event.delta.partial_json;
580: 
581:               Object.defineProperty(snapshotContent, JSON_BUF_PROPERTY, {
582:                 value: jsonBuf,
583:                 enumerable: false,
584:                 writable: true,
585:               });
586: 
587:               if (jsonBuf) {
588:                 snapshotContent.input = partialParse(jsonBuf);
589:               }
590:             }
591:             break;
592:           }
593:           case 'thinking_delta': {
594:             if (snapshotContent?.type === 'thinking') {
595:               snapshotContent.thinking += event.delta.thinking;
596:             }
597:             break;
598:           }
599:           case 'signature_delta': {
600:             if (snapshotContent?.type === 'thinking') {
601:               snapshotContent.signature = event.delta.signature;
602:             }
603:             break;
604:           }
605:           default:
606:             checkNever(event.delta);
607:         }
608:         return snapshot;
609:       }
610:       case 'content_block_stop':
611:         return snapshot;
612:     }
613:   }
614: 
615:   [Symbol.asyncIterator](): AsyncIterator<BetaMessageStreamEvent> {
616:     const pushQueue: BetaMessageStreamEvent[] = [];
617:     const readQueue: {
618:       resolve: (chunk: BetaMessageStreamEvent | undefined) => void;
619:       reject: (error: unknown) => void;
620:     }[] = [];
621:     let done = false;
622: 
623:     this.on('streamEvent', (event) => {
624:       const reader = readQueue.shift();
625:       if (reader) {
626:         reader.resolve(event);
627:       } else {
628:         pushQueue.push(event);
629:       }
630:     });
631: 
632:     this.on('end', () => {
633:       done = true;
634:       for (const reader of readQueue) {
635:         reader.resolve(undefined);
636:       }
637:       readQueue.length = 0;
638:     });
639: 
640:     this.on('abort', (err) => {
641:       done = true;
642:       for (const reader of readQueue) {
643:         reader.reject(err);
644:       }
645:       readQueue.length = 0;
646:     });
647: 
648:     this.on('error', (err) => {
649:       done = true;
650:       for (const reader of readQueue) {
651:         reader.reject(err);
652:       }
653:       readQueue.length = 0;
654:     });
655: 
656:     return {
657:       next: async (): Promise<IteratorResult<BetaMessageStreamEvent>> => {
658:         if (!pushQueue.length) {
659:           if (done) {
660:             return { value: undefined, done: true };
661:           }
662:           return new Promise<BetaMessageStreamEvent | undefined>((resolve, reject) =>
663:             readQueue.push({ resolve, reject }),
664:           ).then((chunk) => (chunk ? { value: chunk, done: false } : { value: undefined, done: true }));
665:         }
666:         const chunk = pushQueue.shift()!;
667:         return { value: chunk, done: false };
668:       },
669:       return: async () => {
670:         this.abort();
671:         return { value: undefined, done: true };
672:       },
673:     };
674:   }
675: 
676:   toReadableStream(): ReadableStream {
677:     const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
678:     return stream.toReadableStream();
679:   }
680: }
681: 
682: // used to ensure exhaustive case matching without throwing a runtime error
683: function checkNever(x: never) {}
````

## File: src/lib/MessageStream.ts
````typescript
  1: import { isAbortError } from '../internal/errors';
  2: import { AnthropicError, APIUserAbortError } from '../error';
  3: import {
  4:   type ContentBlock,
  5:   Messages,
  6:   type Message,
  7:   type MessageStreamEvent,
  8:   type MessageParam,
  9:   type MessageCreateParams,
 10:   type MessageCreateParamsBase,
 11:   type TextBlock,
 12:   type TextCitation,
 13: } from '../resources/messages';
 14: import { Stream } from '../streaming';
 15: import { partialParse } from '../_vendor/partial-json-parser/parser';
 16: import { RequestOptions } from '../internal/request-options';
 17: import { type ReadableStream } from '../internal/shim-types';
 18: 
 19: export interface MessageStreamEvents {
 20:   connect: () => void;
 21:   streamEvent: (event: MessageStreamEvent, snapshot: Message) => void;
 22:   text: (textDelta: string, textSnapshot: string) => void;
 23:   citation: (citation: TextCitation, citationsSnapshot: TextCitation[]) => void;
 24:   inputJson: (partialJson: string, jsonSnapshot: unknown) => void;
 25:   thinking: (thinkingDelta: string, thinkingSnapshot: string) => void;
 26:   signature: (signature: string) => void;
 27:   message: (message: Message) => void;
 28:   contentBlock: (content: ContentBlock) => void;
 29:   finalMessage: (message: Message) => void;
 30:   error: (error: AnthropicError) => void;
 31:   abort: (error: APIUserAbortError) => void;
 32:   end: () => void;
 33: }
 34: 
 35: type MessageStreamEventListeners<Event extends keyof MessageStreamEvents> = {
 36:   listener: MessageStreamEvents[Event];
 37:   once?: boolean;
 38: }[];
 39: 
 40: const JSON_BUF_PROPERTY = '__json_buf';
 41: 
 42: export class MessageStream implements AsyncIterable<MessageStreamEvent> {
 43:   messages: MessageParam[] = [];
 44:   receivedMessages: Message[] = [];
 45:   #currentMessageSnapshot: Message | undefined;
 46: 
 47:   controller: AbortController = new AbortController();
 48: 
 49:   #connectedPromise: Promise<Response | null>;
 50:   #resolveConnectedPromise: (response: Response | null) => void = () => {};
 51:   #rejectConnectedPromise: (error: AnthropicError) => void = () => {};
 52: 
 53:   #endPromise: Promise<void>;
 54:   #resolveEndPromise: () => void = () => {};
 55:   #rejectEndPromise: (error: AnthropicError) => void = () => {};
 56: 
 57:   #listeners: { [Event in keyof MessageStreamEvents]?: MessageStreamEventListeners<Event> } = {};
 58: 
 59:   #ended = false;
 60:   #errored = false;
 61:   #aborted = false;
 62:   #catchingPromiseCreated = false;
 63:   #response: Response | null | undefined;
 64:   #request_id: string | null | undefined;
 65: 
 66:   constructor() {
 67:     this.#connectedPromise = new Promise<Response | null>((resolve, reject) => {
 68:       this.#resolveConnectedPromise = resolve;
 69:       this.#rejectConnectedPromise = reject;
 70:     });
 71: 
 72:     this.#endPromise = new Promise<void>((resolve, reject) => {
 73:       this.#resolveEndPromise = resolve;
 74:       this.#rejectEndPromise = reject;
 75:     });
 76: 
 77:     // Don't let these promises cause unhandled rejection errors.
 78:     // we will manually cause an unhandled rejection error later
 79:     // if the user hasn't registered any error listener or called
 80:     // any promise-returning method.
 81:     this.#connectedPromise.catch(() => {});
 82:     this.#endPromise.catch(() => {});
 83:   }
 84: 
 85:   get response(): Response | null | undefined {
 86:     return this.#response;
 87:   }
 88: 
 89:   get request_id(): string | null | undefined {
 90:     return this.#request_id;
 91:   }
 92: 
 93:   /**
 94:    * Returns the `MessageStream` data, the raw `Response` instance and the ID of the request,
 95:    * returned vie the `request-id` header which is useful for debugging requests and resporting
 96:    * issues to Anthropic.
 97:    *
 98:    * This is the same as the `APIPromise.withResponse()` method.
 99:    *
100:    * This method will raise an error if you created the stream using `MessageStream.fromReadableStream`
101:    * as no `Response` is available.
102:    */
103:   async withResponse(): Promise<{
104:     data: MessageStream;
105:     response: Response;
106:     request_id: string | null | undefined;
107:   }> {
108:     const response = await this.#connectedPromise;
109:     if (!response) {
110:       throw new Error('Could not resolve a `Response` object');
111:     }
112: 
113:     return {
114:       data: this,
115:       response,
116:       request_id: response.headers.get('request-id'),
117:     };
118:   }
119: 
120:   /**
121:    * Intended for use on the frontend, consuming a stream produced with
122:    * `.toReadableStream()` on the backend.
123:    *
124:    * Note that messages sent to the model do not appear in `.on('message')`
125:    * in this context.
126:    */
127:   static fromReadableStream(stream: ReadableStream): MessageStream {
128:     const runner = new MessageStream();
129:     runner._run(() => runner._fromReadableStream(stream));
130:     return runner;
131:   }
132: 
133:   static createMessage(
134:     messages: Messages,
135:     params: MessageCreateParamsBase,
136:     options?: RequestOptions,
137:   ): MessageStream {
138:     const runner = new MessageStream();
139:     for (const message of params.messages) {
140:       runner._addMessageParam(message);
141:     }
142:     runner._run(() =>
143:       runner._createMessage(
144:         messages,
145:         { ...params, stream: true },
146:         { ...options, headers: { ...options?.headers, 'X-Stainless-Helper-Method': 'stream' } },
147:       ),
148:     );
149:     return runner;
150:   }
151: 
152:   protected _run(executor: () => Promise<any>) {
153:     executor().then(() => {
154:       this._emitFinal();
155:       this._emit('end');
156:     }, this.#handleError);
157:   }
158: 
159:   protected _addMessageParam(message: MessageParam) {
160:     this.messages.push(message);
161:   }
162: 
163:   protected _addMessage(message: Message, emit = true) {
164:     this.receivedMessages.push(message);
165:     if (emit) {
166:       this._emit('message', message);
167:     }
168:   }
169: 
170:   protected async _createMessage(
171:     messages: Messages,
172:     params: MessageCreateParams,
173:     options?: RequestOptions,
174:   ): Promise<void> {
175:     const signal = options?.signal;
176:     if (signal) {
177:       if (signal.aborted) this.controller.abort();
178:       signal.addEventListener('abort', () => this.controller.abort());
179:     }
180:     this.#beginRequest();
181:     const { response, data: stream } = await messages
182:       .create({ ...params, stream: true }, { ...options, signal: this.controller.signal })
183:       .withResponse();
184:     this._connected(response);
185:     for await (const event of stream) {
186:       this.#addStreamEvent(event);
187:     }
188:     if (stream.controller.signal?.aborted) {
189:       throw new APIUserAbortError();
190:     }
191:     this.#endRequest();
192:   }
193: 
194:   protected _connected(response: Response | null) {
195:     if (this.ended) return;
196:     this.#response = response;
197:     this.#request_id = response?.headers.get('request-id');
198:     this.#resolveConnectedPromise(response);
199:     this._emit('connect');
200:   }
201: 
202:   get ended(): boolean {
203:     return this.#ended;
204:   }
205: 
206:   get errored(): boolean {
207:     return this.#errored;
208:   }
209: 
210:   get aborted(): boolean {
211:     return this.#aborted;
212:   }
213: 
214:   abort() {
215:     this.controller.abort();
216:   }
217: 
218:   /**
219:    * Adds the listener function to the end of the listeners array for the event.
220:    * No checks are made to see if the listener has already been added. Multiple calls passing
221:    * the same combination of event and listener will result in the listener being added, and
222:    * called, multiple times.
223:    * @returns this MessageStream, so that calls can be chained
224:    */
225:   on<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
226:     const listeners: MessageStreamEventListeners<Event> =
227:       this.#listeners[event] || (this.#listeners[event] = []);
228:     listeners.push({ listener });
229:     return this;
230:   }
231: 
232:   /**
233:    * Removes the specified listener from the listener array for the event.
234:    * off() will remove, at most, one instance of a listener from the listener array. If any single
235:    * listener has been added multiple times to the listener array for the specified event, then
236:    * off() must be called multiple times to remove each instance.
237:    * @returns this MessageStream, so that calls can be chained
238:    */
239:   off<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
240:     const listeners = this.#listeners[event];
241:     if (!listeners) return this;
242:     const index = listeners.findIndex((l) => l.listener === listener);
243:     if (index >= 0) listeners.splice(index, 1);
244:     return this;
245:   }
246: 
247:   /**
248:    * Adds a one-time listener function for the event. The next time the event is triggered,
249:    * this listener is removed and then invoked.
250:    * @returns this MessageStream, so that calls can be chained
251:    */
252:   once<Event extends keyof MessageStreamEvents>(event: Event, listener: MessageStreamEvents[Event]): this {
253:     const listeners: MessageStreamEventListeners<Event> =
254:       this.#listeners[event] || (this.#listeners[event] = []);
255:     listeners.push({ listener, once: true });
256:     return this;
257:   }
258: 
259:   /**
260:    * This is similar to `.once()`, but returns a Promise that resolves the next time
261:    * the event is triggered, instead of calling a listener callback.
262:    * @returns a Promise that resolves the next time given event is triggered,
263:    * or rejects if an error is emitted.  (If you request the 'error' event,
264:    * returns a promise that resolves with the error).
265:    *
266:    * Example:
267:    *
268:    *   const message = await stream.emitted('message') // rejects if the stream errors
269:    */
270:   emitted<Event extends keyof MessageStreamEvents>(
271:     event: Event,
272:   ): Promise<
273:     Parameters<MessageStreamEvents[Event]> extends [infer Param] ? Param
274:     : Parameters<MessageStreamEvents[Event]> extends [] ? void
275:     : Parameters<MessageStreamEvents[Event]>
276:   > {
277:     return new Promise((resolve, reject) => {
278:       this.#catchingPromiseCreated = true;
279:       if (event !== 'error') this.once('error', reject);
280:       this.once(event, resolve as any);
281:     });
282:   }
283: 
284:   async done(): Promise<void> {
285:     this.#catchingPromiseCreated = true;
286:     await this.#endPromise;
287:   }
288: 
289:   get currentMessage(): Message | undefined {
290:     return this.#currentMessageSnapshot;
291:   }
292: 
293:   #getFinalMessage(): Message {
294:     if (this.receivedMessages.length === 0) {
295:       throw new AnthropicError('stream ended without producing a Message with role=assistant');
296:     }
297:     return this.receivedMessages.at(-1)!;
298:   }
299: 
300:   /**
301:    * @returns a promise that resolves with the the final assistant Message response,
302:    * or rejects if an error occurred or the stream ended prematurely without producing a Message.
303:    */
304:   async finalMessage(): Promise<Message> {
305:     await this.done();
306:     return this.#getFinalMessage();
307:   }
308: 
309:   #getFinalText(): string {
310:     if (this.receivedMessages.length === 0) {
311:       throw new AnthropicError('stream ended without producing a Message with role=assistant');
312:     }
313:     const textBlocks = this.receivedMessages
314:       .at(-1)!
315:       .content.filter((block): block is TextBlock => block.type === 'text')
316:       .map((block) => block.text);
317:     if (textBlocks.length === 0) {
318:       throw new AnthropicError('stream ended without producing a content block with type=text');
319:     }
320:     return textBlocks.join(' ');
321:   }
322: 
323:   /**
324:    * @returns a promise that resolves with the the final assistant Message's text response, concatenated
325:    * together if there are more than one text blocks.
326:    * Rejects if an error occurred or the stream ended prematurely without producing a Message.
327:    */
328:   async finalText(): Promise<string> {
329:     await this.done();
330:     return this.#getFinalText();
331:   }
332: 
333:   #handleError = (error: unknown) => {
334:     this.#errored = true;
335:     if (isAbortError(error)) {
336:       error = new APIUserAbortError();
337:     }
338:     if (error instanceof APIUserAbortError) {
339:       this.#aborted = true;
340:       return this._emit('abort', error);
341:     }
342:     if (error instanceof AnthropicError) {
343:       return this._emit('error', error);
344:     }
345:     if (error instanceof Error) {
346:       const anthropicError: AnthropicError = new AnthropicError(error.message);
347:       // @ts-ignore
348:       anthropicError.cause = error;
349:       return this._emit('error', anthropicError);
350:     }
351:     return this._emit('error', new AnthropicError(String(error)));
352:   };
353: 
354:   protected _emit<Event extends keyof MessageStreamEvents>(
355:     event: Event,
356:     ...args: Parameters<MessageStreamEvents[Event]>
357:   ) {
358:     // make sure we don't emit any MessageStreamEvents after end
359:     if (this.#ended) return;
360: 
361:     if (event === 'end') {
362:       this.#ended = true;
363:       this.#resolveEndPromise();
364:     }
365: 
366:     const listeners: MessageStreamEventListeners<Event> | undefined = this.#listeners[event];
367:     if (listeners) {
368:       this.#listeners[event] = listeners.filter((l) => !l.once) as any;
369:       listeners.forEach(({ listener }: any) => listener(...args));
370:     }
371: 
372:     if (event === 'abort') {
373:       const error = args[0] as APIUserAbortError;
374:       if (!this.#catchingPromiseCreated && !listeners?.length) {
375:         Promise.reject(error);
376:       }
377:       this.#rejectConnectedPromise(error);
378:       this.#rejectEndPromise(error);
379:       this._emit('end');
380:       return;
381:     }
382: 
383:     if (event === 'error') {
384:       // NOTE: _emit('error', error) should only be called from #handleError().
385: 
386:       const error = args[0] as AnthropicError;
387:       if (!this.#catchingPromiseCreated && !listeners?.length) {
388:         // Trigger an unhandled rejection if the user hasn't registered any error handlers.
389:         // If you are seeing stack traces here, make sure to handle errors via either:
390:         // - runner.on('error', () => ...)
391:         // - await runner.done()
392:         // - await runner.final...()
393:         // - etc.
394:         Promise.reject(error);
395:       }
396:       this.#rejectConnectedPromise(error);
397:       this.#rejectEndPromise(error);
398:       this._emit('end');
399:     }
400:   }
401: 
402:   protected _emitFinal() {
403:     const finalMessage = this.receivedMessages.at(-1);
404:     if (finalMessage) {
405:       this._emit('finalMessage', this.#getFinalMessage());
406:     }
407:   }
408: 
409:   #beginRequest() {
410:     if (this.ended) return;
411:     this.#currentMessageSnapshot = undefined;
412:   }
413:   #addStreamEvent(event: MessageStreamEvent) {
414:     if (this.ended) return;
415:     const messageSnapshot = this.#accumulateMessage(event);
416:     this._emit('streamEvent', event, messageSnapshot);
417: 
418:     switch (event.type) {
419:       case 'content_block_delta': {
420:         const content = messageSnapshot.content.at(-1)!;
421:         switch (event.delta.type) {
422:           case 'text_delta': {
423:             if (content.type === 'text') {
424:               this._emit('text', event.delta.text, content.text || '');
425:             }
426:             break;
427:           }
428:           case 'citations_delta': {
429:             if (content.type === 'text') {
430:               this._emit('citation', event.delta.citation, content.citations ?? []);
431:             }
432:             break;
433:           }
434:           case 'input_json_delta': {
435:             if (content.type === 'tool_use' && content.input) {
436:               this._emit('inputJson', event.delta.partial_json, content.input);
437:             }
438:             break;
439:           }
440:           case 'thinking_delta': {
441:             if (content.type === 'thinking') {
442:               this._emit('thinking', event.delta.thinking, content.thinking);
443:             }
444:             break;
445:           }
446:           case 'signature_delta': {
447:             if (content.type === 'thinking') {
448:               this._emit('signature', content.signature);
449:             }
450:             break;
451:           }
452:           default:
453:             checkNever(event.delta);
454:         }
455:         break;
456:       }
457:       case 'message_stop': {
458:         this._addMessageParam(messageSnapshot);
459:         this._addMessage(messageSnapshot, true);
460:         break;
461:       }
462:       case 'content_block_stop': {
463:         this._emit('contentBlock', messageSnapshot.content.at(-1)!);
464:         break;
465:       }
466:       case 'message_start': {
467:         this.#currentMessageSnapshot = messageSnapshot;
468:         break;
469:       }
470:       case 'content_block_start':
471:       case 'message_delta':
472:         break;
473:     }
474:   }
475:   #endRequest(): Message {
476:     if (this.ended) {
477:       throw new AnthropicError(`stream has ended, this shouldn't happen`);
478:     }
479:     const snapshot = this.#currentMessageSnapshot;
480:     if (!snapshot) {
481:       throw new AnthropicError(`request ended without sending any chunks`);
482:     }
483:     this.#currentMessageSnapshot = undefined;
484:     return snapshot;
485:   }
486: 
487:   protected async _fromReadableStream(
488:     readableStream: ReadableStream,
489:     options?: RequestOptions,
490:   ): Promise<void> {
491:     const signal = options?.signal;
492:     if (signal) {
493:       if (signal.aborted) this.controller.abort();
494:       signal.addEventListener('abort', () => this.controller.abort());
495:     }
496:     this.#beginRequest();
497:     this._connected(null);
498:     const stream = Stream.fromReadableStream<MessageStreamEvent>(readableStream, this.controller);
499:     for await (const event of stream) {
500:       this.#addStreamEvent(event);
501:     }
502:     if (stream.controller.signal?.aborted) {
503:       throw new APIUserAbortError();
504:     }
505:     this.#endRequest();
506:   }
507: 
508:   /**
509:    * Mutates this.#currentMessage with the current event. Handling the accumulation of multiple messages
510:    * will be needed to be handled by the caller, this method will throw if you try to accumulate for multiple
511:    * messages.
512:    */
513:   #accumulateMessage(event: MessageStreamEvent): Message {
514:     let snapshot = this.#currentMessageSnapshot;
515: 
516:     if (event.type === 'message_start') {
517:       if (snapshot) {
518:         throw new AnthropicError(`Unexpected event order, got ${event.type} before receiving "message_stop"`);
519:       }
520:       return event.message;
521:     }
522: 
523:     if (!snapshot) {
524:       throw new AnthropicError(`Unexpected event order, got ${event.type} before "message_start"`);
525:     }
526: 
527:     switch (event.type) {
528:       case 'message_stop':
529:         return snapshot;
530:       case 'message_delta':
531:         snapshot.stop_reason = event.delta.stop_reason;
532:         snapshot.stop_sequence = event.delta.stop_sequence;
533:         snapshot.usage.output_tokens = event.usage.output_tokens;
534: 
535:         // Update other usage fields if they exist in the event
536:         if (event.usage.input_tokens != null) {
537:           snapshot.usage.input_tokens = event.usage.input_tokens;
538:         }
539: 
540:         if (event.usage.cache_creation_input_tokens != null) {
541:           snapshot.usage.cache_creation_input_tokens = event.usage.cache_creation_input_tokens;
542:         }
543: 
544:         if (event.usage.cache_read_input_tokens != null) {
545:           snapshot.usage.cache_read_input_tokens = event.usage.cache_read_input_tokens;
546:         }
547: 
548:         if (event.usage.server_tool_use != null) {
549:           snapshot.usage.server_tool_use = event.usage.server_tool_use;
550:         }
551: 
552:         return snapshot;
553:       case 'content_block_start':
554:         snapshot.content.push(event.content_block);
555:         return snapshot;
556:       case 'content_block_delta': {
557:         const snapshotContent = snapshot.content.at(event.index);
558: 
559:         switch (event.delta.type) {
560:           case 'text_delta': {
561:             if (snapshotContent?.type === 'text') {
562:               snapshotContent.text += event.delta.text;
563:             }
564:             break;
565:           }
566:           case 'citations_delta': {
567:             if (snapshotContent?.type === 'text') {
568:               snapshotContent.citations ??= [];
569:               snapshotContent.citations.push(event.delta.citation);
570:             }
571:             break;
572:           }
573:           case 'input_json_delta': {
574:             if (snapshotContent?.type === 'tool_use') {
575:               // we need to keep track of the raw JSON string as well so that we can
576:               // re-parse it for each delta, for now we just store it as an untyped
577:               // non-enumerable property on the snapshot
578:               let jsonBuf = (snapshotContent as any)[JSON_BUF_PROPERTY] || '';
579:               jsonBuf += event.delta.partial_json;
580: 
581:               Object.defineProperty(snapshotContent, JSON_BUF_PROPERTY, {
582:                 value: jsonBuf,
583:                 enumerable: false,
584:                 writable: true,
585:               });
586: 
587:               if (jsonBuf) {
588:                 snapshotContent.input = partialParse(jsonBuf);
589:               }
590:             }
591:             break;
592:           }
593:           case 'thinking_delta': {
594:             if (snapshotContent?.type === 'thinking') {
595:               snapshotContent.thinking += event.delta.thinking;
596:             }
597:             break;
598:           }
599:           case 'signature_delta': {
600:             if (snapshotContent?.type === 'thinking') {
601:               snapshotContent.signature = event.delta.signature;
602:             }
603:             break;
604:           }
605:           default:
606:             checkNever(event.delta);
607:         }
608: 
609:         return snapshot;
610:       }
611:       case 'content_block_stop':
612:         return snapshot;
613:     }
614:   }
615: 
616:   [Symbol.asyncIterator](): AsyncIterator<MessageStreamEvent> {
617:     const pushQueue: MessageStreamEvent[] = [];
618:     const readQueue: {
619:       resolve: (chunk: MessageStreamEvent | undefined) => void;
620:       reject: (error: unknown) => void;
621:     }[] = [];
622:     let done = false;
623: 
624:     this.on('streamEvent', (event) => {
625:       const reader = readQueue.shift();
626:       if (reader) {
627:         reader.resolve(event);
628:       } else {
629:         pushQueue.push(event);
630:       }
631:     });
632: 
633:     this.on('end', () => {
634:       done = true;
635:       for (const reader of readQueue) {
636:         reader.resolve(undefined);
637:       }
638:       readQueue.length = 0;
639:     });
640: 
641:     this.on('abort', (err) => {
642:       done = true;
643:       for (const reader of readQueue) {
644:         reader.reject(err);
645:       }
646:       readQueue.length = 0;
647:     });
648: 
649:     this.on('error', (err) => {
650:       done = true;
651:       for (const reader of readQueue) {
652:         reader.reject(err);
653:       }
654:       readQueue.length = 0;
655:     });
656: 
657:     return {
658:       next: async (): Promise<IteratorResult<MessageStreamEvent>> => {
659:         if (!pushQueue.length) {
660:           if (done) {
661:             return { value: undefined, done: true };
662:           }
663:           return new Promise<MessageStreamEvent | undefined>((resolve, reject) =>
664:             readQueue.push({ resolve, reject }),
665:           ).then((chunk) => (chunk ? { value: chunk, done: false } : { value: undefined, done: true }));
666:         }
667:         const chunk = pushQueue.shift()!;
668:         return { value: chunk, done: false };
669:       },
670:       return: async () => {
671:         this.abort();
672:         return { value: undefined, done: true };
673:       },
674:     };
675:   }
676: 
677:   toReadableStream(): ReadableStream {
678:     const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
679:     return stream.toReadableStream();
680:   }
681: }
682: 
683: // used to ensure exhaustive case matching without throwing a runtime error
684: function checkNever(x: never) {}
````

## File: src/resources/beta/messages/batches.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../../../core/resource';
  4: import * as BetaAPI from '../beta';
  5: import { APIPromise } from '../../../core/api-promise';
  6: import * as BetaMessagesAPI from './messages';
  7: import { Page, type PageParams, PagePromise } from '../../../core/pagination';
  8: import { buildHeaders } from '../../../internal/headers';
  9: import { RequestOptions } from '../../../internal/request-options';
 10: import { JSONLDecoder } from '../../../internal/decoders/jsonl';
 11: import { AnthropicError } from '../../../error';
 12: import { path } from '../../../internal/utils/path';
 13: 
 14: export class Batches extends APIResource {
 15:   /**
 16:    * Send a batch of Message creation requests.
 17:    *
 18:    * The Message Batches API can be used to process multiple Messages API requests at
 19:    * once. Once a Message Batch is created, it begins processing immediately. Batches
 20:    * can take up to 24 hours to complete.
 21:    *
 22:    * Learn more about the Message Batches API in our
 23:    * [user guide](/en/docs/build-with-claude/batch-processing)
 24:    *
 25:    * @example
 26:    * ```ts
 27:    * const betaMessageBatch =
 28:    *   await client.beta.messages.batches.create({
 29:    *     requests: [
 30:    *       {
 31:    *         custom_id: 'my-custom-id-1',
 32:    *         params: {
 33:    *           max_tokens: 1024,
 34:    *           messages: [
 35:    *             { content: 'Hello, world', role: 'user' },
 36:    *           ],
 37:    *           model: 'claude-3-7-sonnet-20250219',
 38:    *         },
 39:    *       },
 40:    *     ],
 41:    *   });
 42:    * ```
 43:    */
 44:   create(params: BatchCreateParams, options?: RequestOptions): APIPromise<BetaMessageBatch> {
 45:     const { betas, ...body } = params;
 46:     return this._client.post('/v1/messages/batches?beta=true', {
 47:       body,
 48:       ...options,
 49:       headers: buildHeaders([
 50:         { 'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString() },
 51:         options?.headers,
 52:       ]),
 53:     });
 54:   }
 55: 
 56:   /**
 57:    * This endpoint is idempotent and can be used to poll for Message Batch
 58:    * completion. To access the results of a Message Batch, make a request to the
 59:    * `results_url` field in the response.
 60:    *
 61:    * Learn more about the Message Batches API in our
 62:    * [user guide](/en/docs/build-with-claude/batch-processing)
 63:    *
 64:    * @example
 65:    * ```ts
 66:    * const betaMessageBatch =
 67:    *   await client.beta.messages.batches.retrieve(
 68:    *     'message_batch_id',
 69:    *   );
 70:    * ```
 71:    */
 72:   retrieve(
 73:     messageBatchID: string,
 74:     params: BatchRetrieveParams | null | undefined = {},
 75:     options?: RequestOptions,
 76:   ): APIPromise<BetaMessageBatch> {
 77:     const { betas } = params ?? {};
 78:     return this._client.get(path`/v1/messages/batches/${messageBatchID}?beta=true`, {
 79:       ...options,
 80:       headers: buildHeaders([
 81:         { 'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString() },
 82:         options?.headers,
 83:       ]),
 84:     });
 85:   }
 86: 
 87:   /**
 88:    * List all Message Batches within a Workspace. Most recently created batches are
 89:    * returned first.
 90:    *
 91:    * Learn more about the Message Batches API in our
 92:    * [user guide](/en/docs/build-with-claude/batch-processing)
 93:    *
 94:    * @example
 95:    * ```ts
 96:    * // Automatically fetches more pages as needed.
 97:    * for await (const betaMessageBatch of client.beta.messages.batches.list()) {
 98:    *   // ...
 99:    * }
100:    * ```
101:    */
102:   list(
103:     params: BatchListParams | null | undefined = {},
104:     options?: RequestOptions,
105:   ): PagePromise<BetaMessageBatchesPage, BetaMessageBatch> {
106:     const { betas, ...query } = params ?? {};
107:     return this._client.getAPIList('/v1/messages/batches?beta=true', Page<BetaMessageBatch>, {
108:       query,
109:       ...options,
110:       headers: buildHeaders([
111:         { 'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString() },
112:         options?.headers,
113:       ]),
114:     });
115:   }
116: 
117:   /**
118:    * Delete a Message Batch.
119:    *
120:    * Message Batches can only be deleted once they've finished processing. If you'd
121:    * like to delete an in-progress batch, you must first cancel it.
122:    *
123:    * Learn more about the Message Batches API in our
124:    * [user guide](/en/docs/build-with-claude/batch-processing)
125:    *
126:    * @example
127:    * ```ts
128:    * const betaDeletedMessageBatch =
129:    *   await client.beta.messages.batches.delete(
130:    *     'message_batch_id',
131:    *   );
132:    * ```
133:    */
134:   delete(
135:     messageBatchID: string,
136:     params: BatchDeleteParams | null | undefined = {},
137:     options?: RequestOptions,
138:   ): APIPromise<BetaDeletedMessageBatch> {
139:     const { betas } = params ?? {};
140:     return this._client.delete(path`/v1/messages/batches/${messageBatchID}?beta=true`, {
141:       ...options,
142:       headers: buildHeaders([
143:         { 'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString() },
144:         options?.headers,
145:       ]),
146:     });
147:   }
148: 
149:   /**
150:    * Batches may be canceled any time before processing ends. Once cancellation is
151:    * initiated, the batch enters a `canceling` state, at which time the system may
152:    * complete any in-progress, non-interruptible requests before finalizing
153:    * cancellation.
154:    *
155:    * The number of canceled requests is specified in `request_counts`. To determine
156:    * which requests were canceled, check the individual results within the batch.
157:    * Note that cancellation may not result in any canceled requests if they were
158:    * non-interruptible.
159:    *
160:    * Learn more about the Message Batches API in our
161:    * [user guide](/en/docs/build-with-claude/batch-processing)
162:    *
163:    * @example
164:    * ```ts
165:    * const betaMessageBatch =
166:    *   await client.beta.messages.batches.cancel(
167:    *     'message_batch_id',
168:    *   );
169:    * ```
170:    */
171:   cancel(
172:     messageBatchID: string,
173:     params: BatchCancelParams | null | undefined = {},
174:     options?: RequestOptions,
175:   ): APIPromise<BetaMessageBatch> {
176:     const { betas } = params ?? {};
177:     return this._client.post(path`/v1/messages/batches/${messageBatchID}/cancel?beta=true`, {
178:       ...options,
179:       headers: buildHeaders([
180:         { 'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString() },
181:         options?.headers,
182:       ]),
183:     });
184:   }
185: 
186:   /**
187:    * Streams the results of a Message Batch as a `.jsonl` file.
188:    *
189:    * Each line in the file is a JSON object containing the result of a single request
190:    * in the Message Batch. Results are not guaranteed to be in the same order as
191:    * requests. Use the `custom_id` field to match results to requests.
192:    *
193:    * Learn more about the Message Batches API in our
194:    * [user guide](/en/docs/build-with-claude/batch-processing)
195:    *
196:    * @example
197:    * ```ts
198:    * const betaMessageBatchIndividualResponse =
199:    *   await client.beta.messages.batches.results(
200:    *     'message_batch_id',
201:    *   );
202:    * ```
203:    */
204:   async results(
205:     messageBatchID: string,
206:     params: BatchResultsParams | undefined = {},
207:     options?: RequestOptions,
208:   ): Promise<JSONLDecoder<BetaMessageBatchIndividualResponse>> {
209:     const batch = await this.retrieve(messageBatchID);
210:     if (!batch.results_url) {
211:       throw new AnthropicError(
212:         `No batch \`results_url\`; Has it finished processing? ${batch.processing_status} - ${batch.id}`,
213:       );
214:     }
215: 
216:     const { betas } = params ?? {};
217:     return this._client
218:       .get(batch.results_url, {
219:         ...options,
220:         headers: buildHeaders([
221:           {
222:             'anthropic-beta': [...(betas ?? []), 'message-batches-2024-09-24'].toString(),
223:             Accept: 'application/binary',
224:           },
225:           options?.headers,
226:         ]),
227:         stream: true,
228:         __binaryResponse: true,
229:       })
230:       ._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller)) as APIPromise<
231:       JSONLDecoder<BetaMessageBatchIndividualResponse>
232:     >;
233:   }
234: }
235: 
236: export type BetaMessageBatchesPage = Page<BetaMessageBatch>;
237: 
238: export interface BetaDeletedMessageBatch {
239:   /**
240:    * ID of the Message Batch.
241:    */
242:   id: string;
243: 
244:   /**
245:    * Deleted object type.
246:    *
247:    * For Message Batches, this is always `"message_batch_deleted"`.
248:    */
249:   type: 'message_batch_deleted';
250: }
251: 
252: export interface BetaMessageBatch {
253:   /**
254:    * Unique object identifier.
255:    *
256:    * The format and length of IDs may change over time.
257:    */
258:   id: string;
259: 
260:   /**
261:    * RFC 3339 datetime string representing the time at which the Message Batch was
262:    * archived and its results became unavailable.
263:    */
264:   archived_at: string | null;
265: 
266:   /**
267:    * RFC 3339 datetime string representing the time at which cancellation was
268:    * initiated for the Message Batch. Specified only if cancellation was initiated.
269:    */
270:   cancel_initiated_at: string | null;
271: 
272:   /**
273:    * RFC 3339 datetime string representing the time at which the Message Batch was
274:    * created.
275:    */
276:   created_at: string;
277: 
278:   /**
279:    * RFC 3339 datetime string representing the time at which processing for the
280:    * Message Batch ended. Specified only once processing ends.
281:    *
282:    * Processing ends when every request in a Message Batch has either succeeded,
283:    * errored, canceled, or expired.
284:    */
285:   ended_at: string | null;
286: 
287:   /**
288:    * RFC 3339 datetime string representing the time at which the Message Batch will
289:    * expire and end processing, which is 24 hours after creation.
290:    */
291:   expires_at: string;
292: 
293:   /**
294:    * Processing status of the Message Batch.
295:    */
296:   processing_status: 'in_progress' | 'canceling' | 'ended';
297: 
298:   /**
299:    * Tallies requests within the Message Batch, categorized by their status.
300:    *
301:    * Requests start as `processing` and move to one of the other statuses only once
302:    * processing of the entire batch ends. The sum of all values always matches the
303:    * total number of requests in the batch.
304:    */
305:   request_counts: BetaMessageBatchRequestCounts;
306: 
307:   /**
308:    * URL to a `.jsonl` file containing the results of the Message Batch requests.
309:    * Specified only once processing ends.
310:    *
311:    * Results in the file are not guaranteed to be in the same order as requests. Use
312:    * the `custom_id` field to match results to requests.
313:    */
314:   results_url: string | null;
315: 
316:   /**
317:    * Object type.
318:    *
319:    * For Message Batches, this is always `"message_batch"`.
320:    */
321:   type: 'message_batch';
322: }
323: 
324: export interface BetaMessageBatchCanceledResult {
325:   type: 'canceled';
326: }
327: 
328: export interface BetaMessageBatchErroredResult {
329:   error: BetaAPI.BetaErrorResponse;
330: 
331:   type: 'errored';
332: }
333: 
334: export interface BetaMessageBatchExpiredResult {
335:   type: 'expired';
336: }
337: 
338: /**
339:  * This is a single line in the response `.jsonl` file and does not represent the
340:  * response as a whole.
341:  */
342: export interface BetaMessageBatchIndividualResponse {
343:   /**
344:    * Developer-provided ID created for each request in a Message Batch. Useful for
345:    * matching results to requests, as results may be given out of request order.
346:    *
347:    * Must be unique for each request within the Message Batch.
348:    */
349:   custom_id: string;
350: 
351:   /**
352:    * Processing result for this request.
353:    *
354:    * Contains a Message output if processing was successful, an error response if
355:    * processing failed, or the reason why processing was not attempted, such as
356:    * cancellation or expiration.
357:    */
358:   result: BetaMessageBatchResult;
359: }
360: 
361: export interface BetaMessageBatchRequestCounts {
362:   /**
363:    * Number of requests in the Message Batch that have been canceled.
364:    *
365:    * This is zero until processing of the entire Message Batch has ended.
366:    */
367:   canceled: number;
368: 
369:   /**
370:    * Number of requests in the Message Batch that encountered an error.
371:    *
372:    * This is zero until processing of the entire Message Batch has ended.
373:    */
374:   errored: number;
375: 
376:   /**
377:    * Number of requests in the Message Batch that have expired.
378:    *
379:    * This is zero until processing of the entire Message Batch has ended.
380:    */
381:   expired: number;
382: 
383:   /**
384:    * Number of requests in the Message Batch that are processing.
385:    */
386:   processing: number;
387: 
388:   /**
389:    * Number of requests in the Message Batch that have completed successfully.
390:    *
391:    * This is zero until processing of the entire Message Batch has ended.
392:    */
393:   succeeded: number;
394: }
395: 
396: /**
397:  * Processing result for this request.
398:  *
399:  * Contains a Message output if processing was successful, an error response if
400:  * processing failed, or the reason why processing was not attempted, such as
401:  * cancellation or expiration.
402:  */
403: export type BetaMessageBatchResult =
404:   | BetaMessageBatchSucceededResult
405:   | BetaMessageBatchErroredResult
406:   | BetaMessageBatchCanceledResult
407:   | BetaMessageBatchExpiredResult;
408: 
409: export interface BetaMessageBatchSucceededResult {
410:   message: BetaMessagesAPI.BetaMessage;
411: 
412:   type: 'succeeded';
413: }
414: 
415: export interface BatchCreateParams {
416:   /**
417:    * Body param: List of requests for prompt completion. Each is an individual
418:    * request to create a Message.
419:    */
420:   requests: Array<BatchCreateParams.Request>;
421: 
422:   /**
423:    * Header param: Optional header to specify the beta version(s) you want to use.
424:    */
425:   betas?: Array<BetaAPI.AnthropicBeta>;
426: }
427: 
428: export namespace BatchCreateParams {
429:   export interface Request {
430:     /**
431:      * Developer-provided ID created for each request in a Message Batch. Useful for
432:      * matching results to requests, as results may be given out of request order.
433:      *
434:      * Must be unique for each request within the Message Batch.
435:      */
436:     custom_id: string;
437: 
438:     /**
439:      * Messages API creation parameters for the individual request.
440:      *
441:      * See the [Messages API reference](/en/api/messages) for full documentation on
442:      * available parameters.
443:      */
444:     params: Omit<BetaMessagesAPI.MessageCreateParamsNonStreaming, 'betas'>;
445:   }
446: }
447: 
448: export interface BatchRetrieveParams {
449:   /**
450:    * Optional header to specify the beta version(s) you want to use.
451:    */
452:   betas?: Array<BetaAPI.AnthropicBeta>;
453: }
454: 
455: export interface BatchListParams extends PageParams {
456:   /**
457:    * Header param: Optional header to specify the beta version(s) you want to use.
458:    */
459:   betas?: Array<BetaAPI.AnthropicBeta>;
460: }
461: 
462: export interface BatchDeleteParams {
463:   /**
464:    * Optional header to specify the beta version(s) you want to use.
465:    */
466:   betas?: Array<BetaAPI.AnthropicBeta>;
467: }
468: 
469: export interface BatchCancelParams {
470:   /**
471:    * Optional header to specify the beta version(s) you want to use.
472:    */
473:   betas?: Array<BetaAPI.AnthropicBeta>;
474: }
475: 
476: export interface BatchResultsParams {
477:   /**
478:    * Optional header to specify the beta version(s) you want to use.
479:    */
480:   betas?: Array<BetaAPI.AnthropicBeta>;
481: }
482: 
483: export declare namespace Batches {
484:   export {
485:     type BetaDeletedMessageBatch as BetaDeletedMessageBatch,
486:     type BetaMessageBatch as BetaMessageBatch,
487:     type BetaMessageBatchCanceledResult as BetaMessageBatchCanceledResult,
488:     type BetaMessageBatchErroredResult as BetaMessageBatchErroredResult,
489:     type BetaMessageBatchExpiredResult as BetaMessageBatchExpiredResult,
490:     type BetaMessageBatchIndividualResponse as BetaMessageBatchIndividualResponse,
491:     type BetaMessageBatchRequestCounts as BetaMessageBatchRequestCounts,
492:     type BetaMessageBatchResult as BetaMessageBatchResult,
493:     type BetaMessageBatchSucceededResult as BetaMessageBatchSucceededResult,
494:     type BetaMessageBatchesPage as BetaMessageBatchesPage,
495:     type BatchCreateParams as BatchCreateParams,
496:     type BatchRetrieveParams as BatchRetrieveParams,
497:     type BatchListParams as BatchListParams,
498:     type BatchDeleteParams as BatchDeleteParams,
499:     type BatchCancelParams as BatchCancelParams,
500:     type BatchResultsParams as BatchResultsParams,
501:   };
502: }
````

## File: src/resources/beta/messages/index.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: export {
  4:   Batches,
  5:   type BetaDeletedMessageBatch,
  6:   type BetaMessageBatch,
  7:   type BetaMessageBatchCanceledResult,
  8:   type BetaMessageBatchErroredResult,
  9:   type BetaMessageBatchExpiredResult,
 10:   type BetaMessageBatchIndividualResponse,
 11:   type BetaMessageBatchRequestCounts,
 12:   type BetaMessageBatchResult,
 13:   type BetaMessageBatchSucceededResult,
 14:   type BatchCreateParams,
 15:   type BatchRetrieveParams,
 16:   type BatchListParams,
 17:   type BatchDeleteParams,
 18:   type BatchCancelParams,
 19:   type BatchResultsParams,
 20:   type BetaMessageBatchesPage,
 21: } from './batches';
 22: export {
 23:   Messages,
 24:   type BetaBase64ImageSource,
 25:   type BetaBase64PDFBlock,
 26:   type BetaBase64PDFSource,
 27:   type BetaCacheControlEphemeral,
 28:   type BetaCacheCreation,
 29:   type BetaCitationCharLocation,
 30:   type BetaCitationCharLocationParam,
 31:   type BetaCitationContentBlockLocation,
 32:   type BetaCitationContentBlockLocationParam,
 33:   type BetaCitationPageLocation,
 34:   type BetaCitationPageLocationParam,
 35:   type BetaCitationWebSearchResultLocationParam,
 36:   type BetaCitationsConfigParam,
 37:   type BetaCitationsDelta,
 38:   type BetaCitationsWebSearchResultLocation,
 39:   type BetaCodeExecutionOutputBlock,
 40:   type BetaCodeExecutionOutputBlockParam,
 41:   type BetaCodeExecutionResultBlock,
 42:   type BetaCodeExecutionResultBlockParam,
 43:   type BetaCodeExecutionTool20250522,
 44:   type BetaCodeExecutionToolResultBlock,
 45:   type BetaCodeExecutionToolResultBlockContent,
 46:   type BetaCodeExecutionToolResultBlockParam,
 47:   type BetaCodeExecutionToolResultBlockParamContent,
 48:   type BetaCodeExecutionToolResultError,
 49:   type BetaCodeExecutionToolResultErrorCode,
 50:   type BetaCodeExecutionToolResultErrorParam,
 51:   type BetaContainer,
 52:   type BetaContainerUploadBlock,
 53:   type BetaContainerUploadBlockParam,
 54:   type BetaContentBlock,
 55:   type BetaContentBlockParam,
 56:   type BetaContentBlockSource,
 57:   type BetaContentBlockSourceContent,
 58:   type BetaFileDocumentSource,
 59:   type BetaFileImageSource,
 60:   type BetaImageBlockParam,
 61:   type BetaInputJSONDelta,
 62:   type BetaMCPToolResultBlock,
 63:   type BetaMCPToolUseBlock,
 64:   type BetaMCPToolUseBlockParam,
 65:   type BetaMessage,
 66:   type BetaMessageDeltaUsage,
 67:   type BetaMessageParam,
 68:   type BetaMessageTokensCount,
 69:   type BetaMetadata,
 70:   type BetaPlainTextSource,
 71:   type BetaRawContentBlockDelta,
 72:   type BetaRawContentBlockDeltaEvent,
 73:   type BetaRawContentBlockStartEvent,
 74:   type BetaRawContentBlockStopEvent,
 75:   type BetaRawMessageDeltaEvent,
 76:   type BetaRawMessageStartEvent,
 77:   type BetaRawMessageStopEvent,
 78:   type BetaRawMessageStreamEvent,
 79:   type BetaRedactedThinkingBlock,
 80:   type BetaRedactedThinkingBlockParam,
 81:   type BetaRequestMCPServerToolConfiguration,
 82:   type BetaRequestMCPServerURLDefinition,
 83:   type BetaRequestMCPToolResultBlockParam,
 84:   type BetaServerToolUsage,
 85:   type BetaServerToolUseBlock,
 86:   type BetaServerToolUseBlockParam,
 87:   type BetaSignatureDelta,
 88:   type BetaStopReason,
 89:   type BetaTextBlock,
 90:   type BetaTextBlockParam,
 91:   type BetaTextCitation,
 92:   type BetaTextCitationParam,
 93:   type BetaTextDelta,
 94:   type BetaThinkingBlock,
 95:   type BetaThinkingBlockParam,
 96:   type BetaThinkingConfigDisabled,
 97:   type BetaThinkingConfigEnabled,
 98:   type BetaThinkingConfigParam,
 99:   type BetaThinkingDelta,
100:   type BetaTool,
101:   type BetaToolBash20241022,
102:   type BetaToolBash20250124,
103:   type BetaToolChoice,
104:   type BetaToolChoiceAny,
105:   type BetaToolChoiceAuto,
106:   type BetaToolChoiceNone,
107:   type BetaToolChoiceTool,
108:   type BetaToolComputerUse20241022,
109:   type BetaToolComputerUse20250124,
110:   type BetaToolResultBlockParam,
111:   type BetaToolTextEditor20241022,
112:   type BetaToolTextEditor20250124,
113:   type BetaToolTextEditor20250429,
114:   type BetaToolUnion,
115:   type BetaToolUseBlock,
116:   type BetaToolUseBlockParam,
117:   type BetaURLImageSource,
118:   type BetaURLPDFSource,
119:   type BetaUsage,
120:   type BetaWebSearchResultBlock,
121:   type BetaWebSearchResultBlockParam,
122:   type BetaWebSearchTool20250305,
123:   type BetaWebSearchToolRequestError,
124:   type BetaWebSearchToolResultBlock,
125:   type BetaWebSearchToolResultBlockContent,
126:   type BetaWebSearchToolResultBlockParam,
127:   type BetaWebSearchToolResultBlockParamContent,
128:   type BetaWebSearchToolResultError,
129:   type BetaWebSearchToolResultErrorCode,
130:   type MessageCreateParams,
131:   type MessageCreateParamsNonStreaming,
132:   type MessageCreateParamsStreaming,
133:   type MessageCountTokensParams,
134:   type BetaMessageStreamParams,
135: } from './messages';
````

## File: src/resources/beta/messages/messages.ts
````typescript
   1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
   2: 
   3: import { APIResource } from '../../../core/resource';
   4: import * as MessagesMessagesAPI from './messages';
   5: import * as BetaAPI from '../beta';
   6: import * as MessagesAPI from '../../messages/messages';
   7: import * as BatchesAPI from './batches';
   8: import {
   9:   BatchCancelParams,
  10:   BatchCreateParams,
  11:   BatchDeleteParams,
  12:   BatchListParams,
  13:   BatchResultsParams,
  14:   BatchRetrieveParams,
  15:   Batches,
  16:   BetaDeletedMessageBatch,
  17:   BetaMessageBatch,
  18:   BetaMessageBatchCanceledResult,
  19:   BetaMessageBatchErroredResult,
  20:   BetaMessageBatchExpiredResult,
  21:   BetaMessageBatchIndividualResponse,
  22:   BetaMessageBatchRequestCounts,
  23:   BetaMessageBatchResult,
  24:   BetaMessageBatchSucceededResult,
  25:   BetaMessageBatchesPage,
  26: } from './batches';
  27: import { APIPromise } from '../../../core/api-promise';
  28: import { Stream } from '../../../core/streaming';
  29: import { buildHeaders } from '../../../internal/headers';
  30: import { RequestOptions } from '../../../internal/request-options';
  31: import type { Model } from '../../messages/messages';
  32: import { BetaMessageStream } from '../../../lib/BetaMessageStream';
  33: 
  34: const DEPRECATED_MODELS: {
  35:   [K in Model]?: string;
  36: } = {
  37:   'claude-1.3': 'November 6th, 2024',
  38:   'claude-1.3-100k': 'November 6th, 2024',
  39:   'claude-instant-1.1': 'November 6th, 2024',
  40:   'claude-instant-1.1-100k': 'November 6th, 2024',
  41:   'claude-instant-1.2': 'November 6th, 2024',
  42:   'claude-3-sonnet-20240229': 'July 21st, 2025',
  43:   'claude-2.1': 'July 21st, 2025',
  44:   'claude-2.0': 'July 21st, 2025',
  45: };
  46: import { MODEL_NONSTREAMING_TOKENS } from '../../../internal/constants';
  47: 
  48: export class Messages extends APIResource {
  49:   batches: BatchesAPI.Batches = new BatchesAPI.Batches(this._client);
  50: 
  51:   /**
  52:    * Send a structured list of input messages with text and/or image content, and the
  53:    * model will generate the next message in the conversation.
  54:    *
  55:    * The Messages API can be used for either single queries or stateless multi-turn
  56:    * conversations.
  57:    *
  58:    * Learn more about the Messages API in our [user guide](/en/docs/initial-setup)
  59:    *
  60:    * @example
  61:    * ```ts
  62:    * const betaMessage = await client.beta.messages.create({
  63:    *   max_tokens: 1024,
  64:    *   messages: [{ content: 'Hello, world', role: 'user' }],
  65:    *   model: 'claude-3-7-sonnet-20250219',
  66:    * });
  67:    * ```
  68:    */
  69:   create(params: MessageCreateParamsNonStreaming, options?: RequestOptions): APIPromise<BetaMessage>;
  70:   create(
  71:     params: MessageCreateParamsStreaming,
  72:     options?: RequestOptions,
  73:   ): APIPromise<Stream<BetaRawMessageStreamEvent>>;
  74:   create(
  75:     params: MessageCreateParamsBase,
  76:     options?: RequestOptions,
  77:   ): APIPromise<Stream<BetaRawMessageStreamEvent> | BetaMessage>;
  78:   create(
  79:     params: MessageCreateParams,
  80:     options?: RequestOptions,
  81:   ): APIPromise<BetaMessage> | APIPromise<Stream<BetaRawMessageStreamEvent>> {
  82:     const { betas, ...body } = params;
  83: 
  84:     if (body.model in DEPRECATED_MODELS) {
  85:       console.warn(
  86:         `The model '${body.model}' is deprecated and will reach end-of-life on ${
  87:           DEPRECATED_MODELS[body.model]
  88:         }\nPlease migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`,
  89:       );
  90:     }
  91: 
  92:     let timeout = (this._client as any)._options.timeout as number | null;
  93:     if (!body.stream && timeout == null) {
  94:       const maxNonstreamingTokens = MODEL_NONSTREAMING_TOKENS[body.model] ?? undefined;
  95:       timeout = this._client.calculateNonstreamingTimeout(body.max_tokens, maxNonstreamingTokens);
  96:     }
  97:     return this._client.post('/v1/messages?beta=true', {
  98:       body,
  99:       timeout: timeout ?? 600000,
 100:       ...options,
 101:       headers: buildHeaders([
 102:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 103:         options?.headers,
 104:       ]),
 105:       stream: params.stream ?? false,
 106:     }) as APIPromise<BetaMessage> | APIPromise<Stream<BetaRawMessageStreamEvent>>;
 107:   }
 108: 
 109:   /**
 110:    * Create a Message stream
 111:    */
 112:   stream(body: BetaMessageStreamParams, options?: RequestOptions): BetaMessageStream {
 113:     return BetaMessageStream.createMessage(this, body, options);
 114:   }
 115: 
 116:   /**
 117:    * Count the number of tokens in a Message.
 118:    *
 119:    * The Token Count API can be used to count the number of tokens in a Message,
 120:    * including tools, images, and documents, without creating it.
 121:    *
 122:    * Learn more about token counting in our
 123:    * [user guide](/en/docs/build-with-claude/token-counting)
 124:    *
 125:    * @example
 126:    * ```ts
 127:    * const betaMessageTokensCount =
 128:    *   await client.beta.messages.countTokens({
 129:    *     messages: [{ content: 'string', role: 'user' }],
 130:    *     model: 'claude-3-7-sonnet-latest',
 131:    *   });
 132:    * ```
 133:    */
 134:   countTokens(
 135:     params: MessageCountTokensParams,
 136:     options?: RequestOptions,
 137:   ): APIPromise<BetaMessageTokensCount> {
 138:     const { betas, ...body } = params;
 139:     return this._client.post('/v1/messages/count_tokens?beta=true', {
 140:       body,
 141:       ...options,
 142:       headers: buildHeaders([
 143:         { 'anthropic-beta': [...(betas ?? []), 'token-counting-2024-11-01'].toString() },
 144:         options?.headers,
 145:       ]),
 146:     });
 147:   }
 148: }
 149: 
 150: export type BetaMessageStreamParams = MessageCreateParamsBase;
 151: 
 152: export interface BetaBase64ImageSource {
 153:   data: string;
 154: 
 155:   media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
 156: 
 157:   type: 'base64';
 158: }
 159: 
 160: export interface BetaBase64PDFBlock {
 161:   source:
 162:     | BetaBase64PDFSource
 163:     | BetaPlainTextSource
 164:     | BetaContentBlockSource
 165:     | BetaURLPDFSource
 166:     | BetaFileDocumentSource;
 167: 
 168:   type: 'document';
 169: 
 170:   /**
 171:    * Create a cache control breakpoint at this content block.
 172:    */
 173:   cache_control?: BetaCacheControlEphemeral | null;
 174: 
 175:   citations?: BetaCitationsConfigParam;
 176: 
 177:   context?: string | null;
 178: 
 179:   title?: string | null;
 180: }
 181: 
 182: export interface BetaBase64PDFSource {
 183:   data: string;
 184: 
 185:   media_type: 'application/pdf';
 186: 
 187:   type: 'base64';
 188: }
 189: 
 190: export interface BetaCacheControlEphemeral {
 191:   type: 'ephemeral';
 192: 
 193:   /**
 194:    * The time-to-live for the cache control breakpoint.
 195:    *
 196:    * This may be one the following values:
 197:    *
 198:    * - `5m`: 5 minutes
 199:    * - `1h`: 1 hour
 200:    *
 201:    * Defaults to `5m`.
 202:    */
 203:   ttl?: '5m' | '1h';
 204: }
 205: 
 206: export interface BetaCacheCreation {
 207:   /**
 208:    * The number of input tokens used to create the 1 hour cache entry.
 209:    */
 210:   ephemeral_1h_input_tokens: number;
 211: 
 212:   /**
 213:    * The number of input tokens used to create the 5 minute cache entry.
 214:    */
 215:   ephemeral_5m_input_tokens: number;
 216: }
 217: 
 218: export interface BetaCitationCharLocation {
 219:   cited_text: string;
 220: 
 221:   document_index: number;
 222: 
 223:   document_title: string | null;
 224: 
 225:   end_char_index: number;
 226: 
 227:   start_char_index: number;
 228: 
 229:   type: 'char_location';
 230: }
 231: 
 232: export interface BetaCitationCharLocationParam {
 233:   cited_text: string;
 234: 
 235:   document_index: number;
 236: 
 237:   document_title: string | null;
 238: 
 239:   end_char_index: number;
 240: 
 241:   start_char_index: number;
 242: 
 243:   type: 'char_location';
 244: }
 245: 
 246: export interface BetaCitationContentBlockLocation {
 247:   cited_text: string;
 248: 
 249:   document_index: number;
 250: 
 251:   document_title: string | null;
 252: 
 253:   end_block_index: number;
 254: 
 255:   start_block_index: number;
 256: 
 257:   type: 'content_block_location';
 258: }
 259: 
 260: export interface BetaCitationContentBlockLocationParam {
 261:   cited_text: string;
 262: 
 263:   document_index: number;
 264: 
 265:   document_title: string | null;
 266: 
 267:   end_block_index: number;
 268: 
 269:   start_block_index: number;
 270: 
 271:   type: 'content_block_location';
 272: }
 273: 
 274: export interface BetaCitationPageLocation {
 275:   cited_text: string;
 276: 
 277:   document_index: number;
 278: 
 279:   document_title: string | null;
 280: 
 281:   end_page_number: number;
 282: 
 283:   start_page_number: number;
 284: 
 285:   type: 'page_location';
 286: }
 287: 
 288: export interface BetaCitationPageLocationParam {
 289:   cited_text: string;
 290: 
 291:   document_index: number;
 292: 
 293:   document_title: string | null;
 294: 
 295:   end_page_number: number;
 296: 
 297:   start_page_number: number;
 298: 
 299:   type: 'page_location';
 300: }
 301: 
 302: export interface BetaCitationWebSearchResultLocationParam {
 303:   cited_text: string;
 304: 
 305:   encrypted_index: string;
 306: 
 307:   title: string | null;
 308: 
 309:   type: 'web_search_result_location';
 310: 
 311:   url: string;
 312: }
 313: 
 314: export interface BetaCitationsConfigParam {
 315:   enabled?: boolean;
 316: }
 317: 
 318: export interface BetaCitationsDelta {
 319:   citation:
 320:     | BetaCitationCharLocation
 321:     | BetaCitationPageLocation
 322:     | BetaCitationContentBlockLocation
 323:     | BetaCitationsWebSearchResultLocation;
 324: 
 325:   type: 'citations_delta';
 326: }
 327: 
 328: export interface BetaCitationsWebSearchResultLocation {
 329:   cited_text: string;
 330: 
 331:   encrypted_index: string;
 332: 
 333:   title: string | null;
 334: 
 335:   type: 'web_search_result_location';
 336: 
 337:   url: string;
 338: }
 339: 
 340: export interface BetaCodeExecutionOutputBlock {
 341:   file_id: string;
 342: 
 343:   type: 'code_execution_output';
 344: }
 345: 
 346: export interface BetaCodeExecutionOutputBlockParam {
 347:   file_id: string;
 348: 
 349:   type: 'code_execution_output';
 350: }
 351: 
 352: export interface BetaCodeExecutionResultBlock {
 353:   content: Array<BetaCodeExecutionOutputBlock>;
 354: 
 355:   return_code: number;
 356: 
 357:   stderr: string;
 358: 
 359:   stdout: string;
 360: 
 361:   type: 'code_execution_result';
 362: }
 363: 
 364: export interface BetaCodeExecutionResultBlockParam {
 365:   content: Array<BetaCodeExecutionOutputBlockParam>;
 366: 
 367:   return_code: number;
 368: 
 369:   stderr: string;
 370: 
 371:   stdout: string;
 372: 
 373:   type: 'code_execution_result';
 374: }
 375: 
 376: export interface BetaCodeExecutionTool20250522 {
 377:   /**
 378:    * Name of the tool.
 379:    *
 380:    * This is how the tool will be called by the model and in `tool_use` blocks.
 381:    */
 382:   name: 'code_execution';
 383: 
 384:   type: 'code_execution_20250522';
 385: 
 386:   /**
 387:    * Create a cache control breakpoint at this content block.
 388:    */
 389:   cache_control?: BetaCacheControlEphemeral | null;
 390: }
 391: 
 392: export interface BetaCodeExecutionToolResultBlock {
 393:   content: BetaCodeExecutionToolResultBlockContent;
 394: 
 395:   tool_use_id: string;
 396: 
 397:   type: 'code_execution_tool_result';
 398: }
 399: 
 400: export type BetaCodeExecutionToolResultBlockContent =
 401:   | BetaCodeExecutionToolResultError
 402:   | BetaCodeExecutionResultBlock;
 403: 
 404: export interface BetaCodeExecutionToolResultBlockParam {
 405:   content: BetaCodeExecutionToolResultBlockParamContent;
 406: 
 407:   tool_use_id: string;
 408: 
 409:   type: 'code_execution_tool_result';
 410: 
 411:   /**
 412:    * Create a cache control breakpoint at this content block.
 413:    */
 414:   cache_control?: BetaCacheControlEphemeral | null;
 415: }
 416: 
 417: export type BetaCodeExecutionToolResultBlockParamContent =
 418:   | BetaCodeExecutionToolResultErrorParam
 419:   | BetaCodeExecutionResultBlockParam;
 420: 
 421: export interface BetaCodeExecutionToolResultError {
 422:   error_code: BetaCodeExecutionToolResultErrorCode;
 423: 
 424:   type: 'code_execution_tool_result_error';
 425: }
 426: 
 427: export type BetaCodeExecutionToolResultErrorCode =
 428:   | 'invalid_tool_input'
 429:   | 'unavailable'
 430:   | 'too_many_requests'
 431:   | 'execution_time_exceeded';
 432: 
 433: export interface BetaCodeExecutionToolResultErrorParam {
 434:   error_code: BetaCodeExecutionToolResultErrorCode;
 435: 
 436:   type: 'code_execution_tool_result_error';
 437: }
 438: 
 439: /**
 440:  * Information about the container used in the request (for the code execution
 441:  * tool)
 442:  */
 443: export interface BetaContainer {
 444:   /**
 445:    * Identifier for the container used in this request
 446:    */
 447:   id: string;
 448: 
 449:   /**
 450:    * The time at which the container will expire.
 451:    */
 452:   expires_at: string;
 453: }
 454: 
 455: /**
 456:  * Response model for a file uploaded to the container.
 457:  */
 458: export interface BetaContainerUploadBlock {
 459:   file_id: string;
 460: 
 461:   type: 'container_upload';
 462: }
 463: 
 464: /**
 465:  * A content block that represents a file to be uploaded to the container Files
 466:  * uploaded via this block will be available in the container's input directory.
 467:  */
 468: export interface BetaContainerUploadBlockParam {
 469:   file_id: string;
 470: 
 471:   type: 'container_upload';
 472: 
 473:   /**
 474:    * Create a cache control breakpoint at this content block.
 475:    */
 476:   cache_control?: BetaCacheControlEphemeral | null;
 477: }
 478: 
 479: /**
 480:  * Response model for a file uploaded to the container.
 481:  */
 482: export type BetaContentBlock =
 483:   | BetaTextBlock
 484:   | BetaToolUseBlock
 485:   | BetaServerToolUseBlock
 486:   | BetaWebSearchToolResultBlock
 487:   | BetaCodeExecutionToolResultBlock
 488:   | BetaMCPToolUseBlock
 489:   | BetaMCPToolResultBlock
 490:   | BetaContainerUploadBlock
 491:   | BetaThinkingBlock
 492:   | BetaRedactedThinkingBlock;
 493: 
 494: /**
 495:  * Regular text content.
 496:  */
 497: export type BetaContentBlockParam =
 498:   | BetaServerToolUseBlockParam
 499:   | BetaWebSearchToolResultBlockParam
 500:   | BetaCodeExecutionToolResultBlockParam
 501:   | BetaMCPToolUseBlockParam
 502:   | BetaRequestMCPToolResultBlockParam
 503:   | BetaTextBlockParam
 504:   | BetaImageBlockParam
 505:   | BetaToolUseBlockParam
 506:   | BetaToolResultBlockParam
 507:   | BetaBase64PDFBlock
 508:   | BetaThinkingBlockParam
 509:   | BetaRedactedThinkingBlockParam
 510:   | BetaContainerUploadBlockParam;
 511: 
 512: export interface BetaContentBlockSource {
 513:   content: string | Array<BetaContentBlockSourceContent>;
 514: 
 515:   type: 'content';
 516: }
 517: 
 518: export type BetaContentBlockSourceContent = BetaTextBlockParam | BetaImageBlockParam;
 519: 
 520: export interface BetaFileDocumentSource {
 521:   file_id: string;
 522: 
 523:   type: 'file';
 524: }
 525: 
 526: export interface BetaFileImageSource {
 527:   file_id: string;
 528: 
 529:   type: 'file';
 530: }
 531: 
 532: export interface BetaImageBlockParam {
 533:   source: BetaBase64ImageSource | BetaURLImageSource | BetaFileImageSource;
 534: 
 535:   type: 'image';
 536: 
 537:   /**
 538:    * Create a cache control breakpoint at this content block.
 539:    */
 540:   cache_control?: BetaCacheControlEphemeral | null;
 541: }
 542: 
 543: export interface BetaInputJSONDelta {
 544:   partial_json: string;
 545: 
 546:   type: 'input_json_delta';
 547: }
 548: 
 549: export interface BetaMCPToolResultBlock {
 550:   content: string | Array<BetaTextBlock>;
 551: 
 552:   is_error: boolean;
 553: 
 554:   tool_use_id: string;
 555: 
 556:   type: 'mcp_tool_result';
 557: }
 558: 
 559: export interface BetaMCPToolUseBlock {
 560:   id: string;
 561: 
 562:   input: unknown;
 563: 
 564:   /**
 565:    * The name of the MCP tool
 566:    */
 567:   name: string;
 568: 
 569:   /**
 570:    * The name of the MCP server
 571:    */
 572:   server_name: string;
 573: 
 574:   type: 'mcp_tool_use';
 575: }
 576: 
 577: export interface BetaMCPToolUseBlockParam {
 578:   id: string;
 579: 
 580:   input: unknown;
 581: 
 582:   name: string;
 583: 
 584:   /**
 585:    * The name of the MCP server
 586:    */
 587:   server_name: string;
 588: 
 589:   type: 'mcp_tool_use';
 590: 
 591:   /**
 592:    * Create a cache control breakpoint at this content block.
 593:    */
 594:   cache_control?: BetaCacheControlEphemeral | null;
 595: }
 596: 
 597: export interface BetaMessage {
 598:   /**
 599:    * Unique object identifier.
 600:    *
 601:    * The format and length of IDs may change over time.
 602:    */
 603:   id: string;
 604: 
 605:   /**
 606:    * Information about the container used in the request (for the code execution
 607:    * tool)
 608:    */
 609:   container: BetaContainer | null;
 610: 
 611:   /**
 612:    * Content generated by the model.
 613:    *
 614:    * This is an array of content blocks, each of which has a `type` that determines
 615:    * its shape.
 616:    *
 617:    * Example:
 618:    *
 619:    * ```json
 620:    * [{ "type": "text", "text": "Hi, I'm Claude." }]
 621:    * ```
 622:    *
 623:    * If the request input `messages` ended with an `assistant` turn, then the
 624:    * response `content` will continue directly from that last turn. You can use this
 625:    * to constrain the model's output.
 626:    *
 627:    * For example, if the input `messages` were:
 628:    *
 629:    * ```json
 630:    * [
 631:    *   {
 632:    *     "role": "user",
 633:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
 634:    *   },
 635:    *   { "role": "assistant", "content": "The best answer is (" }
 636:    * ]
 637:    * ```
 638:    *
 639:    * Then the response `content` might be:
 640:    *
 641:    * ```json
 642:    * [{ "type": "text", "text": "B)" }]
 643:    * ```
 644:    */
 645:   content: Array<BetaContentBlock>;
 646: 
 647:   /**
 648:    * The model that will complete your prompt.\n\nSee
 649:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
 650:    * details and options.
 651:    */
 652:   model: MessagesAPI.Model;
 653: 
 654:   /**
 655:    * Conversational role of the generated message.
 656:    *
 657:    * This will always be `"assistant"`.
 658:    */
 659:   role: 'assistant';
 660: 
 661:   /**
 662:    * The reason that we stopped.
 663:    *
 664:    * This may be one the following values:
 665:    *
 666:    * - `"end_turn"`: the model reached a natural stopping point
 667:    * - `"max_tokens"`: we exceeded the requested `max_tokens` or the model's maximum
 668:    * - `"stop_sequence"`: one of your provided custom `stop_sequences` was generated
 669:    * - `"tool_use"`: the model invoked one or more tools
 670:    *
 671:    * In non-streaming mode this value is always non-null. In streaming mode, it is
 672:    * null in the `message_start` event and non-null otherwise.
 673:    */
 674:   stop_reason: BetaStopReason | null;
 675: 
 676:   /**
 677:    * Which custom stop sequence was generated, if any.
 678:    *
 679:    * This value will be a non-null string if one of your custom stop sequences was
 680:    * generated.
 681:    */
 682:   stop_sequence: string | null;
 683: 
 684:   /**
 685:    * Object type.
 686:    *
 687:    * For Messages, this is always `"message"`.
 688:    */
 689:   type: 'message';
 690: 
 691:   /**
 692:    * Billing and rate-limit usage.
 693:    *
 694:    * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 695:    * underlying cost to our systems.
 696:    *
 697:    * Under the hood, the API transforms requests into a format suitable for the
 698:    * model. The model's output then goes through a parsing stage before becoming an
 699:    * API response. As a result, the token counts in `usage` will not match one-to-one
 700:    * with the exact visible content of an API request or response.
 701:    *
 702:    * For example, `output_tokens` will be non-zero, even for an empty string response
 703:    * from Claude.
 704:    *
 705:    * Total input tokens in a request is the summation of `input_tokens`,
 706:    * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
 707:    */
 708:   usage: BetaUsage;
 709: }
 710: 
 711: export interface BetaMessageDeltaUsage {
 712:   /**
 713:    * The cumulative number of input tokens used to create the cache entry.
 714:    */
 715:   cache_creation_input_tokens: number | null;
 716: 
 717:   /**
 718:    * The cumulative number of input tokens read from the cache.
 719:    */
 720:   cache_read_input_tokens: number | null;
 721: 
 722:   /**
 723:    * The cumulative number of input tokens which were used.
 724:    */
 725:   input_tokens: number | null;
 726: 
 727:   /**
 728:    * The cumulative number of output tokens which were used.
 729:    */
 730:   output_tokens: number;
 731: 
 732:   /**
 733:    * The number of server tool requests.
 734:    */
 735:   server_tool_use: BetaServerToolUsage | null;
 736: }
 737: 
 738: export interface BetaMessageParam {
 739:   content: string | Array<BetaContentBlockParam>;
 740: 
 741:   role: 'user' | 'assistant';
 742: }
 743: 
 744: export interface BetaMessageTokensCount {
 745:   /**
 746:    * The total number of tokens across the provided list of messages, system prompt,
 747:    * and tools.
 748:    */
 749:   input_tokens: number;
 750: }
 751: 
 752: export interface BetaMetadata {
 753:   /**
 754:    * An external identifier for the user who is associated with the request.
 755:    *
 756:    * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
 757:    * this id to help detect abuse. Do not include any identifying information such as
 758:    * name, email address, or phone number.
 759:    */
 760:   user_id?: string | null;
 761: }
 762: 
 763: export interface BetaPlainTextSource {
 764:   data: string;
 765: 
 766:   media_type: 'text/plain';
 767: 
 768:   type: 'text';
 769: }
 770: 
 771: export type BetaRawContentBlockDelta =
 772:   | BetaTextDelta
 773:   | BetaInputJSONDelta
 774:   | BetaCitationsDelta
 775:   | BetaThinkingDelta
 776:   | BetaSignatureDelta;
 777: 
 778: export interface BetaRawContentBlockDeltaEvent {
 779:   delta: BetaRawContentBlockDelta;
 780: 
 781:   index: number;
 782: 
 783:   type: 'content_block_delta';
 784: }
 785: 
 786: export interface BetaRawContentBlockStartEvent {
 787:   /**
 788:    * Response model for a file uploaded to the container.
 789:    */
 790:   content_block:
 791:     | BetaTextBlock
 792:     | BetaToolUseBlock
 793:     | BetaServerToolUseBlock
 794:     | BetaWebSearchToolResultBlock
 795:     | BetaCodeExecutionToolResultBlock
 796:     | BetaMCPToolUseBlock
 797:     | BetaMCPToolResultBlock
 798:     | BetaContainerUploadBlock
 799:     | BetaThinkingBlock
 800:     | BetaRedactedThinkingBlock;
 801: 
 802:   index: number;
 803: 
 804:   type: 'content_block_start';
 805: }
 806: 
 807: export interface BetaRawContentBlockStopEvent {
 808:   index: number;
 809: 
 810:   type: 'content_block_stop';
 811: }
 812: 
 813: export interface BetaRawMessageDeltaEvent {
 814:   delta: BetaRawMessageDeltaEvent.Delta;
 815: 
 816:   type: 'message_delta';
 817: 
 818:   /**
 819:    * Billing and rate-limit usage.
 820:    *
 821:    * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 822:    * underlying cost to our systems.
 823:    *
 824:    * Under the hood, the API transforms requests into a format suitable for the
 825:    * model. The model's output then goes through a parsing stage before becoming an
 826:    * API response. As a result, the token counts in `usage` will not match one-to-one
 827:    * with the exact visible content of an API request or response.
 828:    *
 829:    * For example, `output_tokens` will be non-zero, even for an empty string response
 830:    * from Claude.
 831:    *
 832:    * Total input tokens in a request is the summation of `input_tokens`,
 833:    * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
 834:    */
 835:   usage: BetaMessageDeltaUsage;
 836: }
 837: 
 838: export namespace BetaRawMessageDeltaEvent {
 839:   export interface Delta {
 840:     /**
 841:      * Information about the container used in the request (for the code execution
 842:      * tool)
 843:      */
 844:     container: MessagesMessagesAPI.BetaContainer | null;
 845: 
 846:     stop_reason: MessagesMessagesAPI.BetaStopReason | null;
 847: 
 848:     stop_sequence: string | null;
 849:   }
 850: }
 851: 
 852: export interface BetaRawMessageStartEvent {
 853:   message: BetaMessage;
 854: 
 855:   type: 'message_start';
 856: }
 857: 
 858: export interface BetaRawMessageStopEvent {
 859:   type: 'message_stop';
 860: }
 861: 
 862: export type BetaRawMessageStreamEvent =
 863:   | BetaRawMessageStartEvent
 864:   | BetaRawMessageDeltaEvent
 865:   | BetaRawMessageStopEvent
 866:   | BetaRawContentBlockStartEvent
 867:   | BetaRawContentBlockDeltaEvent
 868:   | BetaRawContentBlockStopEvent;
 869: 
 870: export interface BetaRedactedThinkingBlock {
 871:   data: string;
 872: 
 873:   type: 'redacted_thinking';
 874: }
 875: 
 876: export interface BetaRedactedThinkingBlockParam {
 877:   data: string;
 878: 
 879:   type: 'redacted_thinking';
 880: }
 881: 
 882: export interface BetaRequestMCPServerToolConfiguration {
 883:   allowed_tools?: Array<string> | null;
 884: 
 885:   enabled?: boolean | null;
 886: }
 887: 
 888: export interface BetaRequestMCPServerURLDefinition {
 889:   name: string;
 890: 
 891:   type: 'url';
 892: 
 893:   url: string;
 894: 
 895:   authorization_token?: string | null;
 896: 
 897:   tool_configuration?: BetaRequestMCPServerToolConfiguration | null;
 898: }
 899: 
 900: export interface BetaRequestMCPToolResultBlockParam {
 901:   tool_use_id: string;
 902: 
 903:   type: 'mcp_tool_result';
 904: 
 905:   /**
 906:    * Create a cache control breakpoint at this content block.
 907:    */
 908:   cache_control?: BetaCacheControlEphemeral | null;
 909: 
 910:   content?: string | Array<BetaTextBlockParam>;
 911: 
 912:   is_error?: boolean;
 913: }
 914: 
 915: export interface BetaServerToolUsage {
 916:   /**
 917:    * The number of web search tool requests.
 918:    */
 919:   web_search_requests: number;
 920: }
 921: 
 922: export interface BetaServerToolUseBlock {
 923:   id: string;
 924: 
 925:   input: unknown;
 926: 
 927:   name: 'web_search' | 'code_execution';
 928: 
 929:   type: 'server_tool_use';
 930: }
 931: 
 932: export interface BetaServerToolUseBlockParam {
 933:   id: string;
 934: 
 935:   input: unknown;
 936: 
 937:   name: 'web_search' | 'code_execution';
 938: 
 939:   type: 'server_tool_use';
 940: 
 941:   /**
 942:    * Create a cache control breakpoint at this content block.
 943:    */
 944:   cache_control?: BetaCacheControlEphemeral | null;
 945: }
 946: 
 947: export interface BetaSignatureDelta {
 948:   signature: string;
 949: 
 950:   type: 'signature_delta';
 951: }
 952: 
 953: export type BetaStopReason =
 954:   | 'end_turn'
 955:   | 'max_tokens'
 956:   | 'stop_sequence'
 957:   | 'tool_use'
 958:   | 'pause_turn'
 959:   | 'refusal';
 960: 
 961: export interface BetaTextBlock {
 962:   /**
 963:    * Citations supporting the text block.
 964:    *
 965:    * The type of citation returned will depend on the type of document being cited.
 966:    * Citing a PDF results in `page_location`, plain text results in `char_location`,
 967:    * and content document results in `content_block_location`.
 968:    */
 969:   citations: Array<BetaTextCitation> | null;
 970: 
 971:   text: string;
 972: 
 973:   type: 'text';
 974: }
 975: 
 976: export interface BetaTextBlockParam {
 977:   text: string;
 978: 
 979:   type: 'text';
 980: 
 981:   /**
 982:    * Create a cache control breakpoint at this content block.
 983:    */
 984:   cache_control?: BetaCacheControlEphemeral | null;
 985: 
 986:   citations?: Array<BetaTextCitationParam> | null;
 987: }
 988: 
 989: export type BetaTextCitation =
 990:   | BetaCitationCharLocation
 991:   | BetaCitationPageLocation
 992:   | BetaCitationContentBlockLocation
 993:   | BetaCitationsWebSearchResultLocation;
 994: 
 995: export type BetaTextCitationParam =
 996:   | BetaCitationCharLocationParam
 997:   | BetaCitationPageLocationParam
 998:   | BetaCitationContentBlockLocationParam
 999:   | BetaCitationWebSearchResultLocationParam;
1000: 
1001: export interface BetaTextDelta {
1002:   text: string;
1003: 
1004:   type: 'text_delta';
1005: }
1006: 
1007: export interface BetaThinkingBlock {
1008:   signature: string;
1009: 
1010:   thinking: string;
1011: 
1012:   type: 'thinking';
1013: }
1014: 
1015: export interface BetaThinkingBlockParam {
1016:   signature: string;
1017: 
1018:   thinking: string;
1019: 
1020:   type: 'thinking';
1021: }
1022: 
1023: export interface BetaThinkingConfigDisabled {
1024:   type: 'disabled';
1025: }
1026: 
1027: export interface BetaThinkingConfigEnabled {
1028:   /**
1029:    * Determines how many tokens Claude can use for its internal reasoning process.
1030:    * Larger budgets can enable more thorough analysis for complex problems, improving
1031:    * response quality.
1032:    *
1033:    * Must be ≥1024 and less than `max_tokens`.
1034:    *
1035:    * See
1036:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
1037:    * for details.
1038:    */
1039:   budget_tokens: number;
1040: 
1041:   type: 'enabled';
1042: }
1043: 
1044: /**
1045:  * Configuration for enabling Claude's extended thinking.
1046:  *
1047:  * When enabled, responses include `thinking` content blocks showing Claude's
1048:  * thinking process before the final answer. Requires a minimum budget of 1,024
1049:  * tokens and counts towards your `max_tokens` limit.
1050:  *
1051:  * See
1052:  * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
1053:  * for details.
1054:  */
1055: export type BetaThinkingConfigParam = BetaThinkingConfigEnabled | BetaThinkingConfigDisabled;
1056: 
1057: export interface BetaThinkingDelta {
1058:   thinking: string;
1059: 
1060:   type: 'thinking_delta';
1061: }
1062: 
1063: export interface BetaTool {
1064:   /**
1065:    * [JSON schema](https://json-schema.org/draft/2020-12) for this tool's input.
1066:    *
1067:    * This defines the shape of the `input` that your tool accepts and that the model
1068:    * will produce.
1069:    */
1070:   input_schema: BetaTool.InputSchema;
1071: 
1072:   /**
1073:    * Name of the tool.
1074:    *
1075:    * This is how the tool will be called by the model and in `tool_use` blocks.
1076:    */
1077:   name: string;
1078: 
1079:   /**
1080:    * Create a cache control breakpoint at this content block.
1081:    */
1082:   cache_control?: BetaCacheControlEphemeral | null;
1083: 
1084:   /**
1085:    * Description of what this tool does.
1086:    *
1087:    * Tool descriptions should be as detailed as possible. The more information that
1088:    * the model has about what the tool is and how to use it, the better it will
1089:    * perform. You can use natural language descriptions to reinforce important
1090:    * aspects of the tool input JSON schema.
1091:    */
1092:   description?: string;
1093: 
1094:   type?: 'custom' | null;
1095: }
1096: 
1097: export namespace BetaTool {
1098:   /**
1099:    * [JSON schema](https://json-schema.org/draft/2020-12) for this tool's input.
1100:    *
1101:    * This defines the shape of the `input` that your tool accepts and that the model
1102:    * will produce.
1103:    */
1104:   export interface InputSchema {
1105:     type: 'object';
1106: 
1107:     properties?: unknown | null;
1108: 
1109:     [k: string]: unknown;
1110:   }
1111: }
1112: 
1113: export interface BetaToolBash20241022 {
1114:   /**
1115:    * Name of the tool.
1116:    *
1117:    * This is how the tool will be called by the model and in `tool_use` blocks.
1118:    */
1119:   name: 'bash';
1120: 
1121:   type: 'bash_20241022';
1122: 
1123:   /**
1124:    * Create a cache control breakpoint at this content block.
1125:    */
1126:   cache_control?: BetaCacheControlEphemeral | null;
1127: }
1128: 
1129: export interface BetaToolBash20250124 {
1130:   /**
1131:    * Name of the tool.
1132:    *
1133:    * This is how the tool will be called by the model and in `tool_use` blocks.
1134:    */
1135:   name: 'bash';
1136: 
1137:   type: 'bash_20250124';
1138: 
1139:   /**
1140:    * Create a cache control breakpoint at this content block.
1141:    */
1142:   cache_control?: BetaCacheControlEphemeral | null;
1143: }
1144: 
1145: /**
1146:  * How the model should use the provided tools. The model can use a specific tool,
1147:  * any available tool, decide by itself, or not use tools at all.
1148:  */
1149: export type BetaToolChoice = BetaToolChoiceAuto | BetaToolChoiceAny | BetaToolChoiceTool | BetaToolChoiceNone;
1150: 
1151: /**
1152:  * The model will use any available tools.
1153:  */
1154: export interface BetaToolChoiceAny {
1155:   type: 'any';
1156: 
1157:   /**
1158:    * Whether to disable parallel tool use.
1159:    *
1160:    * Defaults to `false`. If set to `true`, the model will output exactly one tool
1161:    * use.
1162:    */
1163:   disable_parallel_tool_use?: boolean;
1164: }
1165: 
1166: /**
1167:  * The model will automatically decide whether to use tools.
1168:  */
1169: export interface BetaToolChoiceAuto {
1170:   type: 'auto';
1171: 
1172:   /**
1173:    * Whether to disable parallel tool use.
1174:    *
1175:    * Defaults to `false`. If set to `true`, the model will output at most one tool
1176:    * use.
1177:    */
1178:   disable_parallel_tool_use?: boolean;
1179: }
1180: 
1181: /**
1182:  * The model will not be allowed to use tools.
1183:  */
1184: export interface BetaToolChoiceNone {
1185:   type: 'none';
1186: }
1187: 
1188: /**
1189:  * The model will use the specified tool with `tool_choice.name`.
1190:  */
1191: export interface BetaToolChoiceTool {
1192:   /**
1193:    * The name of the tool to use.
1194:    */
1195:   name: string;
1196: 
1197:   type: 'tool';
1198: 
1199:   /**
1200:    * Whether to disable parallel tool use.
1201:    *
1202:    * Defaults to `false`. If set to `true`, the model will output exactly one tool
1203:    * use.
1204:    */
1205:   disable_parallel_tool_use?: boolean;
1206: }
1207: 
1208: export interface BetaToolComputerUse20241022 {
1209:   /**
1210:    * The height of the display in pixels.
1211:    */
1212:   display_height_px: number;
1213: 
1214:   /**
1215:    * The width of the display in pixels.
1216:    */
1217:   display_width_px: number;
1218: 
1219:   /**
1220:    * Name of the tool.
1221:    *
1222:    * This is how the tool will be called by the model and in `tool_use` blocks.
1223:    */
1224:   name: 'computer';
1225: 
1226:   type: 'computer_20241022';
1227: 
1228:   /**
1229:    * Create a cache control breakpoint at this content block.
1230:    */
1231:   cache_control?: BetaCacheControlEphemeral | null;
1232: 
1233:   /**
1234:    * The X11 display number (e.g. 0, 1) for the display.
1235:    */
1236:   display_number?: number | null;
1237: }
1238: 
1239: export interface BetaToolComputerUse20250124 {
1240:   /**
1241:    * The height of the display in pixels.
1242:    */
1243:   display_height_px: number;
1244: 
1245:   /**
1246:    * The width of the display in pixels.
1247:    */
1248:   display_width_px: number;
1249: 
1250:   /**
1251:    * Name of the tool.
1252:    *
1253:    * This is how the tool will be called by the model and in `tool_use` blocks.
1254:    */
1255:   name: 'computer';
1256: 
1257:   type: 'computer_20250124';
1258: 
1259:   /**
1260:    * Create a cache control breakpoint at this content block.
1261:    */
1262:   cache_control?: BetaCacheControlEphemeral | null;
1263: 
1264:   /**
1265:    * The X11 display number (e.g. 0, 1) for the display.
1266:    */
1267:   display_number?: number | null;
1268: }
1269: 
1270: export interface BetaToolResultBlockParam {
1271:   tool_use_id: string;
1272: 
1273:   type: 'tool_result';
1274: 
1275:   /**
1276:    * Create a cache control breakpoint at this content block.
1277:    */
1278:   cache_control?: BetaCacheControlEphemeral | null;
1279: 
1280:   content?: string | Array<BetaTextBlockParam | BetaImageBlockParam>;
1281: 
1282:   is_error?: boolean;
1283: }
1284: 
1285: export interface BetaToolTextEditor20241022 {
1286:   /**
1287:    * Name of the tool.
1288:    *
1289:    * This is how the tool will be called by the model and in `tool_use` blocks.
1290:    */
1291:   name: 'str_replace_editor';
1292: 
1293:   type: 'text_editor_20241022';
1294: 
1295:   /**
1296:    * Create a cache control breakpoint at this content block.
1297:    */
1298:   cache_control?: BetaCacheControlEphemeral | null;
1299: }
1300: 
1301: export interface BetaToolTextEditor20250124 {
1302:   /**
1303:    * Name of the tool.
1304:    *
1305:    * This is how the tool will be called by the model and in `tool_use` blocks.
1306:    */
1307:   name: 'str_replace_editor';
1308: 
1309:   type: 'text_editor_20250124';
1310: 
1311:   /**
1312:    * Create a cache control breakpoint at this content block.
1313:    */
1314:   cache_control?: BetaCacheControlEphemeral | null;
1315: }
1316: 
1317: export interface BetaToolTextEditor20250429 {
1318:   /**
1319:    * Name of the tool.
1320:    *
1321:    * This is how the tool will be called by the model and in `tool_use` blocks.
1322:    */
1323:   name: 'str_replace_based_edit_tool';
1324: 
1325:   type: 'text_editor_20250429';
1326: 
1327:   /**
1328:    * Create a cache control breakpoint at this content block.
1329:    */
1330:   cache_control?: BetaCacheControlEphemeral | null;
1331: }
1332: 
1333: export type BetaToolUnion =
1334:   | BetaTool
1335:   | BetaToolComputerUse20241022
1336:   | BetaToolBash20241022
1337:   | BetaToolTextEditor20241022
1338:   | BetaToolComputerUse20250124
1339:   | BetaToolBash20250124
1340:   | BetaToolTextEditor20250124
1341:   | BetaToolTextEditor20250429
1342:   | BetaWebSearchTool20250305
1343:   | BetaCodeExecutionTool20250522;
1344: 
1345: export interface BetaToolUseBlock {
1346:   id: string;
1347: 
1348:   input: unknown;
1349: 
1350:   name: string;
1351: 
1352:   type: 'tool_use';
1353: }
1354: 
1355: export interface BetaToolUseBlockParam {
1356:   id: string;
1357: 
1358:   input: unknown;
1359: 
1360:   name: string;
1361: 
1362:   type: 'tool_use';
1363: 
1364:   /**
1365:    * Create a cache control breakpoint at this content block.
1366:    */
1367:   cache_control?: BetaCacheControlEphemeral | null;
1368: }
1369: 
1370: export interface BetaURLImageSource {
1371:   type: 'url';
1372: 
1373:   url: string;
1374: }
1375: 
1376: export interface BetaURLPDFSource {
1377:   type: 'url';
1378: 
1379:   url: string;
1380: }
1381: 
1382: export interface BetaUsage {
1383:   /**
1384:    * Breakdown of cached tokens by TTL
1385:    */
1386:   cache_creation: BetaCacheCreation | null;
1387: 
1388:   /**
1389:    * The number of input tokens used to create the cache entry.
1390:    */
1391:   cache_creation_input_tokens: number | null;
1392: 
1393:   /**
1394:    * The number of input tokens read from the cache.
1395:    */
1396:   cache_read_input_tokens: number | null;
1397: 
1398:   /**
1399:    * The number of input tokens which were used.
1400:    */
1401:   input_tokens: number;
1402: 
1403:   /**
1404:    * The number of output tokens which were used.
1405:    */
1406:   output_tokens: number;
1407: 
1408:   /**
1409:    * The number of server tool requests.
1410:    */
1411:   server_tool_use: BetaServerToolUsage | null;
1412: 
1413:   /**
1414:    * If the request used the priority, standard, or batch tier.
1415:    */
1416:   service_tier: 'standard' | 'priority' | 'batch' | null;
1417: }
1418: 
1419: export interface BetaWebSearchResultBlock {
1420:   encrypted_content: string;
1421: 
1422:   page_age: string | null;
1423: 
1424:   title: string;
1425: 
1426:   type: 'web_search_result';
1427: 
1428:   url: string;
1429: }
1430: 
1431: export interface BetaWebSearchResultBlockParam {
1432:   encrypted_content: string;
1433: 
1434:   title: string;
1435: 
1436:   type: 'web_search_result';
1437: 
1438:   url: string;
1439: 
1440:   page_age?: string | null;
1441: }
1442: 
1443: export interface BetaWebSearchTool20250305 {
1444:   /**
1445:    * Name of the tool.
1446:    *
1447:    * This is how the tool will be called by the model and in `tool_use` blocks.
1448:    */
1449:   name: 'web_search';
1450: 
1451:   type: 'web_search_20250305';
1452: 
1453:   /**
1454:    * If provided, only these domains will be included in results. Cannot be used
1455:    * alongside `blocked_domains`.
1456:    */
1457:   allowed_domains?: Array<string> | null;
1458: 
1459:   /**
1460:    * If provided, these domains will never appear in results. Cannot be used
1461:    * alongside `allowed_domains`.
1462:    */
1463:   blocked_domains?: Array<string> | null;
1464: 
1465:   /**
1466:    * Create a cache control breakpoint at this content block.
1467:    */
1468:   cache_control?: BetaCacheControlEphemeral | null;
1469: 
1470:   /**
1471:    * Maximum number of times the tool can be used in the API request.
1472:    */
1473:   max_uses?: number | null;
1474: 
1475:   /**
1476:    * Parameters for the user's location. Used to provide more relevant search
1477:    * results.
1478:    */
1479:   user_location?: BetaWebSearchTool20250305.UserLocation | null;
1480: }
1481: 
1482: export namespace BetaWebSearchTool20250305 {
1483:   /**
1484:    * Parameters for the user's location. Used to provide more relevant search
1485:    * results.
1486:    */
1487:   export interface UserLocation {
1488:     type: 'approximate';
1489: 
1490:     /**
1491:      * The city of the user.
1492:      */
1493:     city?: string | null;
1494: 
1495:     /**
1496:      * The two letter
1497:      * [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the
1498:      * user.
1499:      */
1500:     country?: string | null;
1501: 
1502:     /**
1503:      * The region of the user.
1504:      */
1505:     region?: string | null;
1506: 
1507:     /**
1508:      * The [IANA timezone](https://nodatime.org/TimeZones) of the user.
1509:      */
1510:     timezone?: string | null;
1511:   }
1512: }
1513: 
1514: export interface BetaWebSearchToolRequestError {
1515:   error_code: BetaWebSearchToolResultErrorCode;
1516: 
1517:   type: 'web_search_tool_result_error';
1518: }
1519: 
1520: export interface BetaWebSearchToolResultBlock {
1521:   content: BetaWebSearchToolResultBlockContent;
1522: 
1523:   tool_use_id: string;
1524: 
1525:   type: 'web_search_tool_result';
1526: }
1527: 
1528: export type BetaWebSearchToolResultBlockContent =
1529:   | BetaWebSearchToolResultError
1530:   | Array<BetaWebSearchResultBlock>;
1531: 
1532: export interface BetaWebSearchToolResultBlockParam {
1533:   content: BetaWebSearchToolResultBlockParamContent;
1534: 
1535:   tool_use_id: string;
1536: 
1537:   type: 'web_search_tool_result';
1538: 
1539:   /**
1540:    * Create a cache control breakpoint at this content block.
1541:    */
1542:   cache_control?: BetaCacheControlEphemeral | null;
1543: }
1544: 
1545: export type BetaWebSearchToolResultBlockParamContent =
1546:   | Array<BetaWebSearchResultBlockParam>
1547:   | BetaWebSearchToolRequestError;
1548: 
1549: export interface BetaWebSearchToolResultError {
1550:   error_code: BetaWebSearchToolResultErrorCode;
1551: 
1552:   type: 'web_search_tool_result_error';
1553: }
1554: 
1555: export type BetaWebSearchToolResultErrorCode =
1556:   | 'invalid_tool_input'
1557:   | 'unavailable'
1558:   | 'max_uses_exceeded'
1559:   | 'too_many_requests'
1560:   | 'query_too_long';
1561: 
1562: export type MessageCreateParams = MessageCreateParamsNonStreaming | MessageCreateParamsStreaming;
1563: 
1564: export interface MessageCreateParamsBase {
1565:   /**
1566:    * Body param: The maximum number of tokens to generate before stopping.
1567:    *
1568:    * Note that our models may stop _before_ reaching this maximum. This parameter
1569:    * only specifies the absolute maximum number of tokens to generate.
1570:    *
1571:    * Different models have different maximum values for this parameter. See
1572:    * [models](https://docs.anthropic.com/en/docs/models-overview) for details.
1573:    */
1574:   max_tokens: number;
1575: 
1576:   /**
1577:    * Body param: Input messages.
1578:    *
1579:    * Our models are trained to operate on alternating `user` and `assistant`
1580:    * conversational turns. When creating a new `Message`, you specify the prior
1581:    * conversational turns with the `messages` parameter, and the model then generates
1582:    * the next `Message` in the conversation. Consecutive `user` or `assistant` turns
1583:    * in your request will be combined into a single turn.
1584:    *
1585:    * Each input message must be an object with a `role` and `content`. You can
1586:    * specify a single `user`-role message, or you can include multiple `user` and
1587:    * `assistant` messages.
1588:    *
1589:    * If the final message uses the `assistant` role, the response content will
1590:    * continue immediately from the content in that message. This can be used to
1591:    * constrain part of the model's response.
1592:    *
1593:    * Example with a single `user` message:
1594:    *
1595:    * ```json
1596:    * [{ "role": "user", "content": "Hello, Claude" }]
1597:    * ```
1598:    *
1599:    * Example with multiple conversational turns:
1600:    *
1601:    * ```json
1602:    * [
1603:    *   { "role": "user", "content": "Hello there." },
1604:    *   { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
1605:    *   { "role": "user", "content": "Can you explain LLMs in plain English?" }
1606:    * ]
1607:    * ```
1608:    *
1609:    * Example with a partially-filled response from Claude:
1610:    *
1611:    * ```json
1612:    * [
1613:    *   {
1614:    *     "role": "user",
1615:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
1616:    *   },
1617:    *   { "role": "assistant", "content": "The best answer is (" }
1618:    * ]
1619:    * ```
1620:    *
1621:    * Each input message `content` may be either a single `string` or an array of
1622:    * content blocks, where each block has a specific `type`. Using a `string` for
1623:    * `content` is shorthand for an array of one content block of type `"text"`. The
1624:    * following input messages are equivalent:
1625:    *
1626:    * ```json
1627:    * { "role": "user", "content": "Hello, Claude" }
1628:    * ```
1629:    *
1630:    * ```json
1631:    * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
1632:    * ```
1633:    *
1634:    * Starting with Claude 3 models, you can also send image content blocks:
1635:    *
1636:    * ```json
1637:    * {
1638:    *   "role": "user",
1639:    *   "content": [
1640:    *     {
1641:    *       "type": "image",
1642:    *       "source": {
1643:    *         "type": "base64",
1644:    *         "media_type": "image/jpeg",
1645:    *         "data": "/9j/4AAQSkZJRg..."
1646:    *       }
1647:    *     },
1648:    *     { "type": "text", "text": "What is in this image?" }
1649:    *   ]
1650:    * }
1651:    * ```
1652:    *
1653:    * We currently support the `base64` source type for images, and the `image/jpeg`,
1654:    * `image/png`, `image/gif`, and `image/webp` media types.
1655:    *
1656:    * See [examples](https://docs.anthropic.com/en/api/messages-examples#vision) for
1657:    * more input examples.
1658:    *
1659:    * Note that if you want to include a
1660:    * [system prompt](https://docs.anthropic.com/en/docs/system-prompts), you can use
1661:    * the top-level `system` parameter — there is no `"system"` role for input
1662:    * messages in the Messages API.
1663:    *
1664:    * There is a limit of 100000 messages in a single request.
1665:    */
1666:   messages: Array<BetaMessageParam>;
1667: 
1668:   /**
1669:    * Body param: The model that will complete your prompt.\n\nSee
1670:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
1671:    * details and options.
1672:    */
1673:   model: MessagesAPI.Model;
1674: 
1675:   /**
1676:    * Body param: Container identifier for reuse across requests.
1677:    */
1678:   container?: string | null;
1679: 
1680:   /**
1681:    * Body param: MCP servers to be utilized in this request
1682:    */
1683:   mcp_servers?: Array<BetaRequestMCPServerURLDefinition>;
1684: 
1685:   /**
1686:    * Body param: An object describing metadata about the request.
1687:    */
1688:   metadata?: BetaMetadata;
1689: 
1690:   /**
1691:    * Body param: Determines whether to use priority capacity (if available) or
1692:    * standard capacity for this request.
1693:    *
1694:    * Anthropic offers different levels of service for your API requests. See
1695:    * [service-tiers](https://docs.anthropic.com/en/api/service-tiers) for details.
1696:    */
1697:   service_tier?: 'auto' | 'standard_only';
1698: 
1699:   /**
1700:    * Body param: Custom text sequences that will cause the model to stop generating.
1701:    *
1702:    * Our models will normally stop when they have naturally completed their turn,
1703:    * which will result in a response `stop_reason` of `"end_turn"`.
1704:    *
1705:    * If you want the model to stop generating when it encounters custom strings of
1706:    * text, you can use the `stop_sequences` parameter. If the model encounters one of
1707:    * the custom sequences, the response `stop_reason` value will be `"stop_sequence"`
1708:    * and the response `stop_sequence` value will contain the matched stop sequence.
1709:    */
1710:   stop_sequences?: Array<string>;
1711: 
1712:   /**
1713:    * Body param: Whether to incrementally stream the response using server-sent
1714:    * events.
1715:    *
1716:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1717:    * details.
1718:    */
1719:   stream?: boolean;
1720: 
1721:   /**
1722:    * Body param: System prompt.
1723:    *
1724:    * A system prompt is a way of providing context and instructions to Claude, such
1725:    * as specifying a particular goal or role. See our
1726:    * [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).
1727:    */
1728:   system?: string | Array<BetaTextBlockParam>;
1729: 
1730:   /**
1731:    * Body param: Amount of randomness injected into the response.
1732:    *
1733:    * Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0`
1734:    * for analytical / multiple choice, and closer to `1.0` for creative and
1735:    * generative tasks.
1736:    *
1737:    * Note that even with `temperature` of `0.0`, the results will not be fully
1738:    * deterministic.
1739:    */
1740:   temperature?: number;
1741: 
1742:   /**
1743:    * Body param: Configuration for enabling Claude's extended thinking.
1744:    *
1745:    * When enabled, responses include `thinking` content blocks showing Claude's
1746:    * thinking process before the final answer. Requires a minimum budget of 1,024
1747:    * tokens and counts towards your `max_tokens` limit.
1748:    *
1749:    * See
1750:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
1751:    * for details.
1752:    */
1753:   thinking?: BetaThinkingConfigParam;
1754: 
1755:   /**
1756:    * Body param: How the model should use the provided tools. The model can use a
1757:    * specific tool, any available tool, decide by itself, or not use tools at all.
1758:    */
1759:   tool_choice?: BetaToolChoice;
1760: 
1761:   /**
1762:    * Body param: Definitions of tools that the model may use.
1763:    *
1764:    * If you include `tools` in your API request, the model may return `tool_use`
1765:    * content blocks that represent the model's use of those tools. You can then run
1766:    * those tools using the tool input generated by the model and then optionally
1767:    * return results back to the model using `tool_result` content blocks.
1768:    *
1769:    * Each tool definition includes:
1770:    *
1771:    * - `name`: Name of the tool.
1772:    * - `description`: Optional, but strongly-recommended description of the tool.
1773:    * - `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the
1774:    *   tool `input` shape that the model will produce in `tool_use` output content
1775:    *   blocks.
1776:    *
1777:    * For example, if you defined `tools` as:
1778:    *
1779:    * ```json
1780:    * [
1781:    *   {
1782:    *     "name": "get_stock_price",
1783:    *     "description": "Get the current stock price for a given ticker symbol.",
1784:    *     "input_schema": {
1785:    *       "type": "object",
1786:    *       "properties": {
1787:    *         "ticker": {
1788:    *           "type": "string",
1789:    *           "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
1790:    *         }
1791:    *       },
1792:    *       "required": ["ticker"]
1793:    *     }
1794:    *   }
1795:    * ]
1796:    * ```
1797:    *
1798:    * And then asked the model "What's the S&P 500 at today?", the model might produce
1799:    * `tool_use` content blocks in the response like this:
1800:    *
1801:    * ```json
1802:    * [
1803:    *   {
1804:    *     "type": "tool_use",
1805:    *     "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1806:    *     "name": "get_stock_price",
1807:    *     "input": { "ticker": "^GSPC" }
1808:    *   }
1809:    * ]
1810:    * ```
1811:    *
1812:    * You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an
1813:    * input, and return the following back to the model in a subsequent `user`
1814:    * message:
1815:    *
1816:    * ```json
1817:    * [
1818:    *   {
1819:    *     "type": "tool_result",
1820:    *     "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1821:    *     "content": "259.75 USD"
1822:    *   }
1823:    * ]
1824:    * ```
1825:    *
1826:    * Tools can be used for workflows that include running client-side tools and
1827:    * functions, or more generally whenever you want the model to produce a particular
1828:    * JSON structure of output.
1829:    *
1830:    * See our [guide](https://docs.anthropic.com/en/docs/tool-use) for more details.
1831:    */
1832:   tools?: Array<BetaToolUnion>;
1833: 
1834:   /**
1835:    * Body param: Only sample from the top K options for each subsequent token.
1836:    *
1837:    * Used to remove "long tail" low probability responses.
1838:    * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
1839:    *
1840:    * Recommended for advanced use cases only. You usually only need to use
1841:    * `temperature`.
1842:    */
1843:   top_k?: number;
1844: 
1845:   /**
1846:    * Body param: Use nucleus sampling.
1847:    *
1848:    * In nucleus sampling, we compute the cumulative distribution over all the options
1849:    * for each subsequent token in decreasing probability order and cut it off once it
1850:    * reaches a particular probability specified by `top_p`. You should either alter
1851:    * `temperature` or `top_p`, but not both.
1852:    *
1853:    * Recommended for advanced use cases only. You usually only need to use
1854:    * `temperature`.
1855:    */
1856:   top_p?: number;
1857: 
1858:   /**
1859:    * Header param: Optional header to specify the beta version(s) you want to use.
1860:    */
1861:   betas?: Array<BetaAPI.AnthropicBeta>;
1862: }
1863: 
1864: export namespace MessageCreateParams {
1865:   export type MessageCreateParamsNonStreaming = MessagesMessagesAPI.MessageCreateParamsNonStreaming;
1866:   export type MessageCreateParamsStreaming = MessagesMessagesAPI.MessageCreateParamsStreaming;
1867: }
1868: 
1869: export interface MessageCreateParamsNonStreaming extends MessageCreateParamsBase {
1870:   /**
1871:    * Body param: Whether to incrementally stream the response using server-sent
1872:    * events.
1873:    *
1874:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1875:    * details.
1876:    */
1877:   stream?: false;
1878: }
1879: 
1880: export interface MessageCreateParamsStreaming extends MessageCreateParamsBase {
1881:   /**
1882:    * Body param: Whether to incrementally stream the response using server-sent
1883:    * events.
1884:    *
1885:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1886:    * details.
1887:    */
1888:   stream: true;
1889: }
1890: 
1891: export interface MessageCountTokensParams {
1892:   /**
1893:    * Body param: Input messages.
1894:    *
1895:    * Our models are trained to operate on alternating `user` and `assistant`
1896:    * conversational turns. When creating a new `Message`, you specify the prior
1897:    * conversational turns with the `messages` parameter, and the model then generates
1898:    * the next `Message` in the conversation. Consecutive `user` or `assistant` turns
1899:    * in your request will be combined into a single turn.
1900:    *
1901:    * Each input message must be an object with a `role` and `content`. You can
1902:    * specify a single `user`-role message, or you can include multiple `user` and
1903:    * `assistant` messages.
1904:    *
1905:    * If the final message uses the `assistant` role, the response content will
1906:    * continue immediately from the content in that message. This can be used to
1907:    * constrain part of the model's response.
1908:    *
1909:    * Example with a single `user` message:
1910:    *
1911:    * ```json
1912:    * [{ "role": "user", "content": "Hello, Claude" }]
1913:    * ```
1914:    *
1915:    * Example with multiple conversational turns:
1916:    *
1917:    * ```json
1918:    * [
1919:    *   { "role": "user", "content": "Hello there." },
1920:    *   { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
1921:    *   { "role": "user", "content": "Can you explain LLMs in plain English?" }
1922:    * ]
1923:    * ```
1924:    *
1925:    * Example with a partially-filled response from Claude:
1926:    *
1927:    * ```json
1928:    * [
1929:    *   {
1930:    *     "role": "user",
1931:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
1932:    *   },
1933:    *   { "role": "assistant", "content": "The best answer is (" }
1934:    * ]
1935:    * ```
1936:    *
1937:    * Each input message `content` may be either a single `string` or an array of
1938:    * content blocks, where each block has a specific `type`. Using a `string` for
1939:    * `content` is shorthand for an array of one content block of type `"text"`. The
1940:    * following input messages are equivalent:
1941:    *
1942:    * ```json
1943:    * { "role": "user", "content": "Hello, Claude" }
1944:    * ```
1945:    *
1946:    * ```json
1947:    * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
1948:    * ```
1949:    *
1950:    * Starting with Claude 3 models, you can also send image content blocks:
1951:    *
1952:    * ```json
1953:    * {
1954:    *   "role": "user",
1955:    *   "content": [
1956:    *     {
1957:    *       "type": "image",
1958:    *       "source": {
1959:    *         "type": "base64",
1960:    *         "media_type": "image/jpeg",
1961:    *         "data": "/9j/4AAQSkZJRg..."
1962:    *       }
1963:    *     },
1964:    *     { "type": "text", "text": "What is in this image?" }
1965:    *   ]
1966:    * }
1967:    * ```
1968:    *
1969:    * We currently support the `base64` source type for images, and the `image/jpeg`,
1970:    * `image/png`, `image/gif`, and `image/webp` media types.
1971:    *
1972:    * See [examples](https://docs.anthropic.com/en/api/messages-examples#vision) for
1973:    * more input examples.
1974:    *
1975:    * Note that if you want to include a
1976:    * [system prompt](https://docs.anthropic.com/en/docs/system-prompts), you can use
1977:    * the top-level `system` parameter — there is no `"system"` role for input
1978:    * messages in the Messages API.
1979:    *
1980:    * There is a limit of 100000 messages in a single request.
1981:    */
1982:   messages: Array<BetaMessageParam>;
1983: 
1984:   /**
1985:    * Body param: The model that will complete your prompt.\n\nSee
1986:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
1987:    * details and options.
1988:    */
1989:   model: MessagesAPI.Model;
1990: 
1991:   /**
1992:    * Body param: MCP servers to be utilized in this request
1993:    */
1994:   mcp_servers?: Array<BetaRequestMCPServerURLDefinition>;
1995: 
1996:   /**
1997:    * Body param: System prompt.
1998:    *
1999:    * A system prompt is a way of providing context and instructions to Claude, such
2000:    * as specifying a particular goal or role. See our
2001:    * [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).
2002:    */
2003:   system?: string | Array<BetaTextBlockParam>;
2004: 
2005:   /**
2006:    * Body param: Configuration for enabling Claude's extended thinking.
2007:    *
2008:    * When enabled, responses include `thinking` content blocks showing Claude's
2009:    * thinking process before the final answer. Requires a minimum budget of 1,024
2010:    * tokens and counts towards your `max_tokens` limit.
2011:    *
2012:    * See
2013:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
2014:    * for details.
2015:    */
2016:   thinking?: BetaThinkingConfigParam;
2017: 
2018:   /**
2019:    * Body param: How the model should use the provided tools. The model can use a
2020:    * specific tool, any available tool, decide by itself, or not use tools at all.
2021:    */
2022:   tool_choice?: BetaToolChoice;
2023: 
2024:   /**
2025:    * Body param: Definitions of tools that the model may use.
2026:    *
2027:    * If you include `tools` in your API request, the model may return `tool_use`
2028:    * content blocks that represent the model's use of those tools. You can then run
2029:    * those tools using the tool input generated by the model and then optionally
2030:    * return results back to the model using `tool_result` content blocks.
2031:    *
2032:    * Each tool definition includes:
2033:    *
2034:    * - `name`: Name of the tool.
2035:    * - `description`: Optional, but strongly-recommended description of the tool.
2036:    * - `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the
2037:    *   tool `input` shape that the model will produce in `tool_use` output content
2038:    *   blocks.
2039:    *
2040:    * For example, if you defined `tools` as:
2041:    *
2042:    * ```json
2043:    * [
2044:    *   {
2045:    *     "name": "get_stock_price",
2046:    *     "description": "Get the current stock price for a given ticker symbol.",
2047:    *     "input_schema": {
2048:    *       "type": "object",
2049:    *       "properties": {
2050:    *         "ticker": {
2051:    *           "type": "string",
2052:    *           "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
2053:    *         }
2054:    *       },
2055:    *       "required": ["ticker"]
2056:    *     }
2057:    *   }
2058:    * ]
2059:    * ```
2060:    *
2061:    * And then asked the model "What's the S&P 500 at today?", the model might produce
2062:    * `tool_use` content blocks in the response like this:
2063:    *
2064:    * ```json
2065:    * [
2066:    *   {
2067:    *     "type": "tool_use",
2068:    *     "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
2069:    *     "name": "get_stock_price",
2070:    *     "input": { "ticker": "^GSPC" }
2071:    *   }
2072:    * ]
2073:    * ```
2074:    *
2075:    * You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an
2076:    * input, and return the following back to the model in a subsequent `user`
2077:    * message:
2078:    *
2079:    * ```json
2080:    * [
2081:    *   {
2082:    *     "type": "tool_result",
2083:    *     "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
2084:    *     "content": "259.75 USD"
2085:    *   }
2086:    * ]
2087:    * ```
2088:    *
2089:    * Tools can be used for workflows that include running client-side tools and
2090:    * functions, or more generally whenever you want the model to produce a particular
2091:    * JSON structure of output.
2092:    *
2093:    * See our [guide](https://docs.anthropic.com/en/docs/tool-use) for more details.
2094:    */
2095:   tools?: Array<
2096:     | BetaTool
2097:     | BetaToolComputerUse20241022
2098:     | BetaToolBash20241022
2099:     | BetaToolTextEditor20241022
2100:     | BetaToolComputerUse20250124
2101:     | BetaToolBash20250124
2102:     | BetaToolTextEditor20250124
2103:     | BetaToolTextEditor20250429
2104:     | BetaWebSearchTool20250305
2105:     | BetaCodeExecutionTool20250522
2106:   >;
2107: 
2108:   /**
2109:    * Header param: Optional header to specify the beta version(s) you want to use.
2110:    */
2111:   betas?: Array<BetaAPI.AnthropicBeta>;
2112: }
2113: 
2114: Messages.Batches = Batches;
2115: 
2116: export declare namespace Messages {
2117:   export {
2118:     type BetaBase64ImageSource as BetaBase64ImageSource,
2119:     type BetaBase64PDFBlock as BetaBase64PDFBlock,
2120:     type BetaBase64PDFSource as BetaBase64PDFSource,
2121:     type BetaCacheControlEphemeral as BetaCacheControlEphemeral,
2122:     type BetaCacheCreation as BetaCacheCreation,
2123:     type BetaCitationCharLocation as BetaCitationCharLocation,
2124:     type BetaCitationCharLocationParam as BetaCitationCharLocationParam,
2125:     type BetaCitationContentBlockLocation as BetaCitationContentBlockLocation,
2126:     type BetaCitationContentBlockLocationParam as BetaCitationContentBlockLocationParam,
2127:     type BetaCitationPageLocation as BetaCitationPageLocation,
2128:     type BetaCitationPageLocationParam as BetaCitationPageLocationParam,
2129:     type BetaCitationWebSearchResultLocationParam as BetaCitationWebSearchResultLocationParam,
2130:     type BetaCitationsConfigParam as BetaCitationsConfigParam,
2131:     type BetaCitationsDelta as BetaCitationsDelta,
2132:     type BetaCitationsWebSearchResultLocation as BetaCitationsWebSearchResultLocation,
2133:     type BetaCodeExecutionOutputBlock as BetaCodeExecutionOutputBlock,
2134:     type BetaCodeExecutionOutputBlockParam as BetaCodeExecutionOutputBlockParam,
2135:     type BetaCodeExecutionResultBlock as BetaCodeExecutionResultBlock,
2136:     type BetaCodeExecutionResultBlockParam as BetaCodeExecutionResultBlockParam,
2137:     type BetaCodeExecutionTool20250522 as BetaCodeExecutionTool20250522,
2138:     type BetaCodeExecutionToolResultBlock as BetaCodeExecutionToolResultBlock,
2139:     type BetaCodeExecutionToolResultBlockContent as BetaCodeExecutionToolResultBlockContent,
2140:     type BetaCodeExecutionToolResultBlockParam as BetaCodeExecutionToolResultBlockParam,
2141:     type BetaCodeExecutionToolResultBlockParamContent as BetaCodeExecutionToolResultBlockParamContent,
2142:     type BetaCodeExecutionToolResultError as BetaCodeExecutionToolResultError,
2143:     type BetaCodeExecutionToolResultErrorCode as BetaCodeExecutionToolResultErrorCode,
2144:     type BetaCodeExecutionToolResultErrorParam as BetaCodeExecutionToolResultErrorParam,
2145:     type BetaContainer as BetaContainer,
2146:     type BetaContainerUploadBlock as BetaContainerUploadBlock,
2147:     type BetaContainerUploadBlockParam as BetaContainerUploadBlockParam,
2148:     type BetaContentBlock as BetaContentBlock,
2149:     type BetaContentBlockParam as BetaContentBlockParam,
2150:     type BetaContentBlockSource as BetaContentBlockSource,
2151:     type BetaContentBlockSourceContent as BetaContentBlockSourceContent,
2152:     type BetaFileDocumentSource as BetaFileDocumentSource,
2153:     type BetaFileImageSource as BetaFileImageSource,
2154:     type BetaImageBlockParam as BetaImageBlockParam,
2155:     type BetaInputJSONDelta as BetaInputJSONDelta,
2156:     type BetaMCPToolResultBlock as BetaMCPToolResultBlock,
2157:     type BetaMCPToolUseBlock as BetaMCPToolUseBlock,
2158:     type BetaMCPToolUseBlockParam as BetaMCPToolUseBlockParam,
2159:     type BetaMessage as BetaMessage,
2160:     type BetaMessageDeltaUsage as BetaMessageDeltaUsage,
2161:     type BetaMessageParam as BetaMessageParam,
2162:     type BetaMessageTokensCount as BetaMessageTokensCount,
2163:     type BetaMetadata as BetaMetadata,
2164:     type BetaPlainTextSource as BetaPlainTextSource,
2165:     type BetaRawContentBlockDelta as BetaRawContentBlockDelta,
2166:     type BetaRawContentBlockDeltaEvent as BetaRawContentBlockDeltaEvent,
2167:     type BetaRawContentBlockStartEvent as BetaRawContentBlockStartEvent,
2168:     type BetaRawContentBlockStopEvent as BetaRawContentBlockStopEvent,
2169:     type BetaRawMessageDeltaEvent as BetaRawMessageDeltaEvent,
2170:     type BetaRawMessageStartEvent as BetaRawMessageStartEvent,
2171:     type BetaRawMessageStopEvent as BetaRawMessageStopEvent,
2172:     type BetaRawMessageStreamEvent as BetaRawMessageStreamEvent,
2173:     type BetaRedactedThinkingBlock as BetaRedactedThinkingBlock,
2174:     type BetaRedactedThinkingBlockParam as BetaRedactedThinkingBlockParam,
2175:     type BetaRequestMCPServerToolConfiguration as BetaRequestMCPServerToolConfiguration,
2176:     type BetaRequestMCPServerURLDefinition as BetaRequestMCPServerURLDefinition,
2177:     type BetaRequestMCPToolResultBlockParam as BetaRequestMCPToolResultBlockParam,
2178:     type BetaServerToolUsage as BetaServerToolUsage,
2179:     type BetaServerToolUseBlock as BetaServerToolUseBlock,
2180:     type BetaServerToolUseBlockParam as BetaServerToolUseBlockParam,
2181:     type BetaSignatureDelta as BetaSignatureDelta,
2182:     type BetaStopReason as BetaStopReason,
2183:     type BetaTextBlock as BetaTextBlock,
2184:     type BetaTextBlockParam as BetaTextBlockParam,
2185:     type BetaTextCitation as BetaTextCitation,
2186:     type BetaTextCitationParam as BetaTextCitationParam,
2187:     type BetaTextDelta as BetaTextDelta,
2188:     type BetaThinkingBlock as BetaThinkingBlock,
2189:     type BetaThinkingBlockParam as BetaThinkingBlockParam,
2190:     type BetaThinkingConfigDisabled as BetaThinkingConfigDisabled,
2191:     type BetaThinkingConfigEnabled as BetaThinkingConfigEnabled,
2192:     type BetaThinkingConfigParam as BetaThinkingConfigParam,
2193:     type BetaThinkingDelta as BetaThinkingDelta,
2194:     type BetaTool as BetaTool,
2195:     type BetaToolBash20241022 as BetaToolBash20241022,
2196:     type BetaToolBash20250124 as BetaToolBash20250124,
2197:     type BetaToolChoice as BetaToolChoice,
2198:     type BetaToolChoiceAny as BetaToolChoiceAny,
2199:     type BetaToolChoiceAuto as BetaToolChoiceAuto,
2200:     type BetaToolChoiceNone as BetaToolChoiceNone,
2201:     type BetaToolChoiceTool as BetaToolChoiceTool,
2202:     type BetaToolComputerUse20241022 as BetaToolComputerUse20241022,
2203:     type BetaToolComputerUse20250124 as BetaToolComputerUse20250124,
2204:     type BetaToolResultBlockParam as BetaToolResultBlockParam,
2205:     type BetaToolTextEditor20241022 as BetaToolTextEditor20241022,
2206:     type BetaToolTextEditor20250124 as BetaToolTextEditor20250124,
2207:     type BetaToolTextEditor20250429 as BetaToolTextEditor20250429,
2208:     type BetaToolUnion as BetaToolUnion,
2209:     type BetaToolUseBlock as BetaToolUseBlock,
2210:     type BetaToolUseBlockParam as BetaToolUseBlockParam,
2211:     type BetaURLImageSource as BetaURLImageSource,
2212:     type BetaURLPDFSource as BetaURLPDFSource,
2213:     type BetaUsage as BetaUsage,
2214:     type BetaWebSearchResultBlock as BetaWebSearchResultBlock,
2215:     type BetaWebSearchResultBlockParam as BetaWebSearchResultBlockParam,
2216:     type BetaWebSearchTool20250305 as BetaWebSearchTool20250305,
2217:     type BetaWebSearchToolRequestError as BetaWebSearchToolRequestError,
2218:     type BetaWebSearchToolResultBlock as BetaWebSearchToolResultBlock,
2219:     type BetaWebSearchToolResultBlockContent as BetaWebSearchToolResultBlockContent,
2220:     type BetaWebSearchToolResultBlockParam as BetaWebSearchToolResultBlockParam,
2221:     type BetaWebSearchToolResultBlockParamContent as BetaWebSearchToolResultBlockParamContent,
2222:     type BetaWebSearchToolResultError as BetaWebSearchToolResultError,
2223:     type BetaWebSearchToolResultErrorCode as BetaWebSearchToolResultErrorCode,
2224:     type MessageCreateParams as MessageCreateParams,
2225:     type MessageCreateParamsNonStreaming as MessageCreateParamsNonStreaming,
2226:     type MessageCreateParamsStreaming as MessageCreateParamsStreaming,
2227:     type MessageCountTokensParams as MessageCountTokensParams,
2228:   };
2229: 
2230:   export {
2231:     Batches as Batches,
2232:     type BetaDeletedMessageBatch as BetaDeletedMessageBatch,
2233:     type BetaMessageBatch as BetaMessageBatch,
2234:     type BetaMessageBatchCanceledResult as BetaMessageBatchCanceledResult,
2235:     type BetaMessageBatchErroredResult as BetaMessageBatchErroredResult,
2236:     type BetaMessageBatchExpiredResult as BetaMessageBatchExpiredResult,
2237:     type BetaMessageBatchIndividualResponse as BetaMessageBatchIndividualResponse,
2238:     type BetaMessageBatchRequestCounts as BetaMessageBatchRequestCounts,
2239:     type BetaMessageBatchResult as BetaMessageBatchResult,
2240:     type BetaMessageBatchSucceededResult as BetaMessageBatchSucceededResult,
2241:     type BetaMessageBatchesPage as BetaMessageBatchesPage,
2242:     type BatchCreateParams as BatchCreateParams,
2243:     type BatchRetrieveParams as BatchRetrieveParams,
2244:     type BatchListParams as BatchListParams,
2245:     type BatchDeleteParams as BatchDeleteParams,
2246:     type BatchCancelParams as BatchCancelParams,
2247:     type BatchResultsParams as BatchResultsParams,
2248:   };
2249: }
````

## File: src/resources/beta/beta.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../../core/resource';
  4: import * as FilesAPI from './files';
  5: import {
  6:   DeletedFile,
  7:   FileDeleteParams,
  8:   FileDownloadParams,
  9:   FileListParams,
 10:   FileMetadata,
 11:   FileMetadataPage,
 12:   FileRetrieveMetadataParams,
 13:   FileUploadParams,
 14:   Files,
 15: } from './files';
 16: import * as ModelsAPI from './models';
 17: import { BetaModelInfo, BetaModelInfosPage, ModelListParams, ModelRetrieveParams, Models } from './models';
 18: import * as MessagesAPI from './messages/messages';
 19: import {
 20:   BetaBase64ImageSource,
 21:   BetaBase64PDFBlock,
 22:   BetaBase64PDFSource,
 23:   BetaCacheControlEphemeral,
 24:   BetaCacheCreation,
 25:   BetaCitationCharLocation,
 26:   BetaCitationCharLocationParam,
 27:   BetaCitationContentBlockLocation,
 28:   BetaCitationContentBlockLocationParam,
 29:   BetaCitationPageLocation,
 30:   BetaCitationPageLocationParam,
 31:   BetaCitationWebSearchResultLocationParam,
 32:   BetaCitationsConfigParam,
 33:   BetaCitationsDelta,
 34:   BetaCitationsWebSearchResultLocation,
 35:   BetaCodeExecutionOutputBlock,
 36:   BetaCodeExecutionOutputBlockParam,
 37:   BetaCodeExecutionResultBlock,
 38:   BetaCodeExecutionResultBlockParam,
 39:   BetaCodeExecutionTool20250522,
 40:   BetaCodeExecutionToolResultBlock,
 41:   BetaCodeExecutionToolResultBlockContent,
 42:   BetaCodeExecutionToolResultBlockParam,
 43:   BetaCodeExecutionToolResultBlockParamContent,
 44:   BetaCodeExecutionToolResultError,
 45:   BetaCodeExecutionToolResultErrorCode,
 46:   BetaCodeExecutionToolResultErrorParam,
 47:   BetaContainer,
 48:   BetaContainerUploadBlock,
 49:   BetaContainerUploadBlockParam,
 50:   BetaContentBlock,
 51:   BetaContentBlockParam,
 52:   BetaContentBlockSource,
 53:   BetaContentBlockSourceContent,
 54:   BetaFileDocumentSource,
 55:   BetaFileImageSource,
 56:   BetaImageBlockParam,
 57:   BetaInputJSONDelta,
 58:   BetaMCPToolResultBlock,
 59:   BetaMCPToolUseBlock,
 60:   BetaMCPToolUseBlockParam,
 61:   BetaMessage,
 62:   BetaMessageDeltaUsage,
 63:   BetaMessageParam,
 64:   BetaMessageTokensCount,
 65:   BetaMetadata,
 66:   BetaPlainTextSource,
 67:   BetaRawContentBlockDelta,
 68:   BetaRawContentBlockDeltaEvent,
 69:   BetaRawContentBlockStartEvent,
 70:   BetaRawContentBlockStopEvent,
 71:   BetaRawMessageDeltaEvent,
 72:   BetaRawMessageStartEvent,
 73:   BetaRawMessageStopEvent,
 74:   BetaRawMessageStreamEvent,
 75:   BetaRedactedThinkingBlock,
 76:   BetaRedactedThinkingBlockParam,
 77:   BetaRequestMCPServerToolConfiguration,
 78:   BetaRequestMCPServerURLDefinition,
 79:   BetaRequestMCPToolResultBlockParam,
 80:   BetaServerToolUsage,
 81:   BetaServerToolUseBlock,
 82:   BetaServerToolUseBlockParam,
 83:   BetaSignatureDelta,
 84:   BetaStopReason,
 85:   BetaTextBlock,
 86:   BetaTextBlockParam,
 87:   BetaTextCitation,
 88:   BetaTextCitationParam,
 89:   BetaTextDelta,
 90:   BetaThinkingBlock,
 91:   BetaThinkingBlockParam,
 92:   BetaThinkingConfigDisabled,
 93:   BetaThinkingConfigEnabled,
 94:   BetaThinkingConfigParam,
 95:   BetaThinkingDelta,
 96:   BetaTool,
 97:   BetaToolBash20241022,
 98:   BetaToolBash20250124,
 99:   BetaToolChoice,
100:   BetaToolChoiceAny,
101:   BetaToolChoiceAuto,
102:   BetaToolChoiceNone,
103:   BetaToolChoiceTool,
104:   BetaToolComputerUse20241022,
105:   BetaToolComputerUse20250124,
106:   BetaToolResultBlockParam,
107:   BetaToolTextEditor20241022,
108:   BetaToolTextEditor20250124,
109:   BetaToolTextEditor20250429,
110:   BetaToolUnion,
111:   BetaToolUseBlock,
112:   BetaToolUseBlockParam,
113:   BetaURLImageSource,
114:   BetaURLPDFSource,
115:   BetaUsage,
116:   BetaWebSearchResultBlock,
117:   BetaWebSearchResultBlockParam,
118:   BetaWebSearchTool20250305,
119:   BetaWebSearchToolRequestError,
120:   BetaWebSearchToolResultBlock,
121:   BetaWebSearchToolResultBlockContent,
122:   BetaWebSearchToolResultBlockParam,
123:   BetaWebSearchToolResultBlockParamContent,
124:   BetaWebSearchToolResultError,
125:   BetaWebSearchToolResultErrorCode,
126:   MessageCountTokensParams,
127:   MessageCreateParams,
128:   MessageCreateParamsNonStreaming,
129:   MessageCreateParamsStreaming,
130:   Messages,
131: } from './messages/messages';
132: 
133: export class Beta extends APIResource {
134:   models: ModelsAPI.Models = new ModelsAPI.Models(this._client);
135:   messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);
136:   files: FilesAPI.Files = new FilesAPI.Files(this._client);
137: }
138: 
139: export type AnthropicBeta =
140:   | (string & {})
141:   | 'message-batches-2024-09-24'
142:   | 'prompt-caching-2024-07-31'
143:   | 'computer-use-2024-10-22'
144:   | 'computer-use-2025-01-24'
145:   | 'pdfs-2024-09-25'
146:   | 'token-counting-2024-11-01'
147:   | 'token-efficient-tools-2025-02-19'
148:   | 'output-128k-2025-02-19'
149:   | 'files-api-2025-04-14'
150:   | 'mcp-client-2025-04-04'
151:   | 'dev-full-thinking-2025-05-14'
152:   | 'interleaved-thinking-2025-05-14'
153:   | 'code-execution-2025-05-22'
154:   | 'extended-cache-ttl-2025-04-11';
155: 
156: export interface BetaAPIError {
157:   message: string;
158: 
159:   type: 'api_error';
160: }
161: 
162: export interface BetaAuthenticationError {
163:   message: string;
164: 
165:   type: 'authentication_error';
166: }
167: 
168: export interface BetaBillingError {
169:   message: string;
170: 
171:   type: 'billing_error';
172: }
173: 
174: export type BetaError =
175:   | BetaInvalidRequestError
176:   | BetaAuthenticationError
177:   | BetaBillingError
178:   | BetaPermissionError
179:   | BetaNotFoundError
180:   | BetaRateLimitError
181:   | BetaGatewayTimeoutError
182:   | BetaAPIError
183:   | BetaOverloadedError;
184: 
185: export interface BetaErrorResponse {
186:   error: BetaError;
187: 
188:   type: 'error';
189: }
190: 
191: export interface BetaGatewayTimeoutError {
192:   message: string;
193: 
194:   type: 'timeout_error';
195: }
196: 
197: export interface BetaInvalidRequestError {
198:   message: string;
199: 
200:   type: 'invalid_request_error';
201: }
202: 
203: export interface BetaNotFoundError {
204:   message: string;
205: 
206:   type: 'not_found_error';
207: }
208: 
209: export interface BetaOverloadedError {
210:   message: string;
211: 
212:   type: 'overloaded_error';
213: }
214: 
215: export interface BetaPermissionError {
216:   message: string;
217: 
218:   type: 'permission_error';
219: }
220: 
221: export interface BetaRateLimitError {
222:   message: string;
223: 
224:   type: 'rate_limit_error';
225: }
226: 
227: Beta.Models = Models;
228: Beta.Messages = Messages;
229: Beta.Files = Files;
230: 
231: export declare namespace Beta {
232:   export {
233:     type AnthropicBeta as AnthropicBeta,
234:     type BetaAPIError as BetaAPIError,
235:     type BetaAuthenticationError as BetaAuthenticationError,
236:     type BetaBillingError as BetaBillingError,
237:     type BetaError as BetaError,
238:     type BetaErrorResponse as BetaErrorResponse,
239:     type BetaGatewayTimeoutError as BetaGatewayTimeoutError,
240:     type BetaInvalidRequestError as BetaInvalidRequestError,
241:     type BetaNotFoundError as BetaNotFoundError,
242:     type BetaOverloadedError as BetaOverloadedError,
243:     type BetaPermissionError as BetaPermissionError,
244:     type BetaRateLimitError as BetaRateLimitError,
245:   };
246: 
247:   export {
248:     Models as Models,
249:     type BetaModelInfo as BetaModelInfo,
250:     type BetaModelInfosPage as BetaModelInfosPage,
251:     type ModelRetrieveParams as ModelRetrieveParams,
252:     type ModelListParams as ModelListParams,
253:   };
254: 
255:   export {
256:     Messages as Messages,
257:     type BetaBase64ImageSource as BetaBase64ImageSource,
258:     type BetaBase64PDFBlock as BetaBase64PDFBlock,
259:     type BetaBase64PDFSource as BetaBase64PDFSource,
260:     type BetaCacheControlEphemeral as BetaCacheControlEphemeral,
261:     type BetaCacheCreation as BetaCacheCreation,
262:     type BetaCitationCharLocation as BetaCitationCharLocation,
263:     type BetaCitationCharLocationParam as BetaCitationCharLocationParam,
264:     type BetaCitationContentBlockLocation as BetaCitationContentBlockLocation,
265:     type BetaCitationContentBlockLocationParam as BetaCitationContentBlockLocationParam,
266:     type BetaCitationPageLocation as BetaCitationPageLocation,
267:     type BetaCitationPageLocationParam as BetaCitationPageLocationParam,
268:     type BetaCitationWebSearchResultLocationParam as BetaCitationWebSearchResultLocationParam,
269:     type BetaCitationsConfigParam as BetaCitationsConfigParam,
270:     type BetaCitationsDelta as BetaCitationsDelta,
271:     type BetaCitationsWebSearchResultLocation as BetaCitationsWebSearchResultLocation,
272:     type BetaCodeExecutionOutputBlock as BetaCodeExecutionOutputBlock,
273:     type BetaCodeExecutionOutputBlockParam as BetaCodeExecutionOutputBlockParam,
274:     type BetaCodeExecutionResultBlock as BetaCodeExecutionResultBlock,
275:     type BetaCodeExecutionResultBlockParam as BetaCodeExecutionResultBlockParam,
276:     type BetaCodeExecutionTool20250522 as BetaCodeExecutionTool20250522,
277:     type BetaCodeExecutionToolResultBlock as BetaCodeExecutionToolResultBlock,
278:     type BetaCodeExecutionToolResultBlockContent as BetaCodeExecutionToolResultBlockContent,
279:     type BetaCodeExecutionToolResultBlockParam as BetaCodeExecutionToolResultBlockParam,
280:     type BetaCodeExecutionToolResultBlockParamContent as BetaCodeExecutionToolResultBlockParamContent,
281:     type BetaCodeExecutionToolResultError as BetaCodeExecutionToolResultError,
282:     type BetaCodeExecutionToolResultErrorCode as BetaCodeExecutionToolResultErrorCode,
283:     type BetaCodeExecutionToolResultErrorParam as BetaCodeExecutionToolResultErrorParam,
284:     type BetaContainer as BetaContainer,
285:     type BetaContainerUploadBlock as BetaContainerUploadBlock,
286:     type BetaContainerUploadBlockParam as BetaContainerUploadBlockParam,
287:     type BetaContentBlock as BetaContentBlock,
288:     type BetaContentBlockParam as BetaContentBlockParam,
289:     type BetaContentBlockSource as BetaContentBlockSource,
290:     type BetaContentBlockSourceContent as BetaContentBlockSourceContent,
291:     type BetaFileDocumentSource as BetaFileDocumentSource,
292:     type BetaFileImageSource as BetaFileImageSource,
293:     type BetaImageBlockParam as BetaImageBlockParam,
294:     type BetaInputJSONDelta as BetaInputJSONDelta,
295:     type BetaMCPToolResultBlock as BetaMCPToolResultBlock,
296:     type BetaMCPToolUseBlock as BetaMCPToolUseBlock,
297:     type BetaMCPToolUseBlockParam as BetaMCPToolUseBlockParam,
298:     type BetaMessage as BetaMessage,
299:     type BetaMessageDeltaUsage as BetaMessageDeltaUsage,
300:     type BetaMessageParam as BetaMessageParam,
301:     type BetaMessageTokensCount as BetaMessageTokensCount,
302:     type BetaMetadata as BetaMetadata,
303:     type BetaPlainTextSource as BetaPlainTextSource,
304:     type BetaRawContentBlockDelta as BetaRawContentBlockDelta,
305:     type BetaRawContentBlockDeltaEvent as BetaRawContentBlockDeltaEvent,
306:     type BetaRawContentBlockStartEvent as BetaRawContentBlockStartEvent,
307:     type BetaRawContentBlockStopEvent as BetaRawContentBlockStopEvent,
308:     type BetaRawMessageDeltaEvent as BetaRawMessageDeltaEvent,
309:     type BetaRawMessageStartEvent as BetaRawMessageStartEvent,
310:     type BetaRawMessageStopEvent as BetaRawMessageStopEvent,
311:     type BetaRawMessageStreamEvent as BetaRawMessageStreamEvent,
312:     type BetaRedactedThinkingBlock as BetaRedactedThinkingBlock,
313:     type BetaRedactedThinkingBlockParam as BetaRedactedThinkingBlockParam,
314:     type BetaRequestMCPServerToolConfiguration as BetaRequestMCPServerToolConfiguration,
315:     type BetaRequestMCPServerURLDefinition as BetaRequestMCPServerURLDefinition,
316:     type BetaRequestMCPToolResultBlockParam as BetaRequestMCPToolResultBlockParam,
317:     type BetaServerToolUsage as BetaServerToolUsage,
318:     type BetaServerToolUseBlock as BetaServerToolUseBlock,
319:     type BetaServerToolUseBlockParam as BetaServerToolUseBlockParam,
320:     type BetaSignatureDelta as BetaSignatureDelta,
321:     type BetaStopReason as BetaStopReason,
322:     type BetaTextBlock as BetaTextBlock,
323:     type BetaTextBlockParam as BetaTextBlockParam,
324:     type BetaTextCitation as BetaTextCitation,
325:     type BetaTextCitationParam as BetaTextCitationParam,
326:     type BetaTextDelta as BetaTextDelta,
327:     type BetaThinkingBlock as BetaThinkingBlock,
328:     type BetaThinkingBlockParam as BetaThinkingBlockParam,
329:     type BetaThinkingConfigDisabled as BetaThinkingConfigDisabled,
330:     type BetaThinkingConfigEnabled as BetaThinkingConfigEnabled,
331:     type BetaThinkingConfigParam as BetaThinkingConfigParam,
332:     type BetaThinkingDelta as BetaThinkingDelta,
333:     type BetaTool as BetaTool,
334:     type BetaToolBash20241022 as BetaToolBash20241022,
335:     type BetaToolBash20250124 as BetaToolBash20250124,
336:     type BetaToolChoice as BetaToolChoice,
337:     type BetaToolChoiceAny as BetaToolChoiceAny,
338:     type BetaToolChoiceAuto as BetaToolChoiceAuto,
339:     type BetaToolChoiceNone as BetaToolChoiceNone,
340:     type BetaToolChoiceTool as BetaToolChoiceTool,
341:     type BetaToolComputerUse20241022 as BetaToolComputerUse20241022,
342:     type BetaToolComputerUse20250124 as BetaToolComputerUse20250124,
343:     type BetaToolResultBlockParam as BetaToolResultBlockParam,
344:     type BetaToolTextEditor20241022 as BetaToolTextEditor20241022,
345:     type BetaToolTextEditor20250124 as BetaToolTextEditor20250124,
346:     type BetaToolTextEditor20250429 as BetaToolTextEditor20250429,
347:     type BetaToolUnion as BetaToolUnion,
348:     type BetaToolUseBlock as BetaToolUseBlock,
349:     type BetaToolUseBlockParam as BetaToolUseBlockParam,
350:     type BetaURLImageSource as BetaURLImageSource,
351:     type BetaURLPDFSource as BetaURLPDFSource,
352:     type BetaUsage as BetaUsage,
353:     type BetaWebSearchResultBlock as BetaWebSearchResultBlock,
354:     type BetaWebSearchResultBlockParam as BetaWebSearchResultBlockParam,
355:     type BetaWebSearchTool20250305 as BetaWebSearchTool20250305,
356:     type BetaWebSearchToolRequestError as BetaWebSearchToolRequestError,
357:     type BetaWebSearchToolResultBlock as BetaWebSearchToolResultBlock,
358:     type BetaWebSearchToolResultBlockContent as BetaWebSearchToolResultBlockContent,
359:     type BetaWebSearchToolResultBlockParam as BetaWebSearchToolResultBlockParam,
360:     type BetaWebSearchToolResultBlockParamContent as BetaWebSearchToolResultBlockParamContent,
361:     type BetaWebSearchToolResultError as BetaWebSearchToolResultError,
362:     type BetaWebSearchToolResultErrorCode as BetaWebSearchToolResultErrorCode,
363:     type MessageCreateParams as MessageCreateParams,
364:     type MessageCreateParamsNonStreaming as MessageCreateParamsNonStreaming,
365:     type MessageCreateParamsStreaming as MessageCreateParamsStreaming,
366:     type MessageCountTokensParams as MessageCountTokensParams,
367:   };
368: 
369:   export {
370:     Files as Files,
371:     type DeletedFile as DeletedFile,
372:     type FileMetadata as FileMetadata,
373:     type FileMetadataPage as FileMetadataPage,
374:     type FileListParams as FileListParams,
375:     type FileDeleteParams as FileDeleteParams,
376:     type FileDownloadParams as FileDownloadParams,
377:     type FileRetrieveMetadataParams as FileRetrieveMetadataParams,
378:     type FileUploadParams as FileUploadParams,
379:   };
380: }
````

## File: src/resources/beta/files.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../../core/resource';
  4: import * as BetaAPI from './beta';
  5: import { APIPromise } from '../../core/api-promise';
  6: import { Page, type PageParams, PagePromise } from '../../core/pagination';
  7: import { type Uploadable } from '../../core/uploads';
  8: import { buildHeaders } from '../../internal/headers';
  9: import { RequestOptions } from '../../internal/request-options';
 10: import { multipartFormRequestOptions } from '../../internal/uploads';
 11: import { path } from '../../internal/utils/path';
 12: 
 13: export class Files extends APIResource {
 14:   /**
 15:    * List Files
 16:    *
 17:    * @example
 18:    * ```ts
 19:    * // Automatically fetches more pages as needed.
 20:    * for await (const fileMetadata of client.beta.files.list()) {
 21:    *   // ...
 22:    * }
 23:    * ```
 24:    */
 25:   list(
 26:     params: FileListParams | null | undefined = {},
 27:     options?: RequestOptions,
 28:   ): PagePromise<FileMetadataPage, FileMetadata> {
 29:     const { betas, ...query } = params ?? {};
 30:     return this._client.getAPIList('/v1/files', Page<FileMetadata>, {
 31:       query,
 32:       ...options,
 33:       headers: buildHeaders([
 34:         { 'anthropic-beta': [...(betas ?? []), 'files-api-2025-04-14'].toString() },
 35:         options?.headers,
 36:       ]),
 37:     });
 38:   }
 39: 
 40:   /**
 41:    * Delete File
 42:    *
 43:    * @example
 44:    * ```ts
 45:    * const deletedFile = await client.beta.files.delete(
 46:    *   'file_id',
 47:    * );
 48:    * ```
 49:    */
 50:   delete(
 51:     fileID: string,
 52:     params: FileDeleteParams | null | undefined = {},
 53:     options?: RequestOptions,
 54:   ): APIPromise<DeletedFile> {
 55:     const { betas } = params ?? {};
 56:     return this._client.delete(path`/v1/files/${fileID}`, {
 57:       ...options,
 58:       headers: buildHeaders([
 59:         { 'anthropic-beta': [...(betas ?? []), 'files-api-2025-04-14'].toString() },
 60:         options?.headers,
 61:       ]),
 62:     });
 63:   }
 64: 
 65:   /**
 66:    * Download File
 67:    *
 68:    * @example
 69:    * ```ts
 70:    * const response = await client.beta.files.download(
 71:    *   'file_id',
 72:    * );
 73:    *
 74:    * const content = await response.blob();
 75:    * console.log(content);
 76:    * ```
 77:    */
 78:   download(
 79:     fileID: string,
 80:     params: FileDownloadParams | null | undefined = {},
 81:     options?: RequestOptions,
 82:   ): APIPromise<Response> {
 83:     const { betas } = params ?? {};
 84:     return this._client.get(path`/v1/files/${fileID}/content`, {
 85:       ...options,
 86:       headers: buildHeaders([
 87:         {
 88:           'anthropic-beta': [...(betas ?? []), 'files-api-2025-04-14'].toString(),
 89:           Accept: 'application/binary',
 90:         },
 91:         options?.headers,
 92:       ]),
 93:       __binaryResponse: true,
 94:     });
 95:   }
 96: 
 97:   /**
 98:    * Get File Metadata
 99:    *
100:    * @example
101:    * ```ts
102:    * const fileMetadata =
103:    *   await client.beta.files.retrieveMetadata('file_id');
104:    * ```
105:    */
106:   retrieveMetadata(
107:     fileID: string,
108:     params: FileRetrieveMetadataParams | null | undefined = {},
109:     options?: RequestOptions,
110:   ): APIPromise<FileMetadata> {
111:     const { betas } = params ?? {};
112:     return this._client.get(path`/v1/files/${fileID}`, {
113:       ...options,
114:       headers: buildHeaders([
115:         { 'anthropic-beta': [...(betas ?? []), 'files-api-2025-04-14'].toString() },
116:         options?.headers,
117:       ]),
118:     });
119:   }
120: 
121:   /**
122:    * Upload File
123:    *
124:    * @example
125:    * ```ts
126:    * const fileMetadata = await client.beta.files.upload({
127:    *   file: fs.createReadStream('path/to/file'),
128:    * });
129:    * ```
130:    */
131:   upload(params: FileUploadParams, options?: RequestOptions): APIPromise<FileMetadata> {
132:     const { betas, ...body } = params;
133:     return this._client.post(
134:       '/v1/files',
135:       multipartFormRequestOptions(
136:         {
137:           body,
138:           ...options,
139:           headers: buildHeaders([
140:             { 'anthropic-beta': [...(betas ?? []), 'files-api-2025-04-14'].toString() },
141:             options?.headers,
142:           ]),
143:         },
144:         this._client,
145:       ),
146:     );
147:   }
148: }
149: 
150: export type FileMetadataPage = Page<FileMetadata>;
151: 
152: export interface DeletedFile {
153:   /**
154:    * ID of the deleted file.
155:    */
156:   id: string;
157: 
158:   /**
159:    * Deleted object type.
160:    *
161:    * For file deletion, this is always `"file_deleted"`.
162:    */
163:   type?: 'file_deleted';
164: }
165: 
166: export interface FileMetadata {
167:   /**
168:    * Unique object identifier.
169:    *
170:    * The format and length of IDs may change over time.
171:    */
172:   id: string;
173: 
174:   /**
175:    * RFC 3339 datetime string representing when the file was created.
176:    */
177:   created_at: string;
178: 
179:   /**
180:    * Original filename of the uploaded file.
181:    */
182:   filename: string;
183: 
184:   /**
185:    * MIME type of the file.
186:    */
187:   mime_type: string;
188: 
189:   /**
190:    * Size of the file in bytes.
191:    */
192:   size_bytes: number;
193: 
194:   /**
195:    * Object type.
196:    *
197:    * For files, this is always `"file"`.
198:    */
199:   type: 'file';
200: 
201:   /**
202:    * Whether the file can be downloaded.
203:    */
204:   downloadable?: boolean;
205: }
206: 
207: export interface FileListParams extends PageParams {
208:   /**
209:    * Header param: Optional header to specify the beta version(s) you want to use.
210:    */
211:   betas?: Array<BetaAPI.AnthropicBeta>;
212: }
213: 
214: export interface FileDeleteParams {
215:   /**
216:    * Optional header to specify the beta version(s) you want to use.
217:    */
218:   betas?: Array<BetaAPI.AnthropicBeta>;
219: }
220: 
221: export interface FileDownloadParams {
222:   /**
223:    * Optional header to specify the beta version(s) you want to use.
224:    */
225:   betas?: Array<BetaAPI.AnthropicBeta>;
226: }
227: 
228: export interface FileRetrieveMetadataParams {
229:   /**
230:    * Optional header to specify the beta version(s) you want to use.
231:    */
232:   betas?: Array<BetaAPI.AnthropicBeta>;
233: }
234: 
235: export interface FileUploadParams {
236:   /**
237:    * Body param: The file to upload
238:    */
239:   file: Uploadable;
240: 
241:   /**
242:    * Header param: Optional header to specify the beta version(s) you want to use.
243:    */
244:   betas?: Array<BetaAPI.AnthropicBeta>;
245: }
246: 
247: export declare namespace Files {
248:   export {
249:     type DeletedFile as DeletedFile,
250:     type FileMetadata as FileMetadata,
251:     type FileMetadataPage as FileMetadataPage,
252:     type FileListParams as FileListParams,
253:     type FileDeleteParams as FileDeleteParams,
254:     type FileDownloadParams as FileDownloadParams,
255:     type FileRetrieveMetadataParams as FileRetrieveMetadataParams,
256:     type FileUploadParams as FileUploadParams,
257:   };
258: }
````

## File: src/resources/beta/index.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: export {
  4:   Beta,
  5:   type AnthropicBeta,
  6:   type BetaAPIError,
  7:   type BetaAuthenticationError,
  8:   type BetaBillingError,
  9:   type BetaError,
 10:   type BetaErrorResponse,
 11:   type BetaGatewayTimeoutError,
 12:   type BetaInvalidRequestError,
 13:   type BetaNotFoundError,
 14:   type BetaOverloadedError,
 15:   type BetaPermissionError,
 16:   type BetaRateLimitError,
 17: } from './beta';
 18: export {
 19:   Files,
 20:   type DeletedFile,
 21:   type FileMetadata,
 22:   type FileListParams,
 23:   type FileDeleteParams,
 24:   type FileDownloadParams,
 25:   type FileRetrieveMetadataParams,
 26:   type FileUploadParams,
 27:   type FileMetadataPage,
 28: } from './files';
 29: export {
 30:   Messages,
 31:   type BetaBase64ImageSource,
 32:   type BetaBase64PDFBlock,
 33:   type BetaBase64PDFSource,
 34:   type BetaCacheControlEphemeral,
 35:   type BetaCacheCreation,
 36:   type BetaCitationCharLocation,
 37:   type BetaCitationCharLocationParam,
 38:   type BetaCitationContentBlockLocation,
 39:   type BetaCitationContentBlockLocationParam,
 40:   type BetaCitationPageLocation,
 41:   type BetaCitationPageLocationParam,
 42:   type BetaCitationWebSearchResultLocationParam,
 43:   type BetaCitationsConfigParam,
 44:   type BetaCitationsDelta,
 45:   type BetaCitationsWebSearchResultLocation,
 46:   type BetaCodeExecutionOutputBlock,
 47:   type BetaCodeExecutionOutputBlockParam,
 48:   type BetaCodeExecutionResultBlock,
 49:   type BetaCodeExecutionResultBlockParam,
 50:   type BetaCodeExecutionTool20250522,
 51:   type BetaCodeExecutionToolResultBlock,
 52:   type BetaCodeExecutionToolResultBlockContent,
 53:   type BetaCodeExecutionToolResultBlockParam,
 54:   type BetaCodeExecutionToolResultBlockParamContent,
 55:   type BetaCodeExecutionToolResultError,
 56:   type BetaCodeExecutionToolResultErrorCode,
 57:   type BetaCodeExecutionToolResultErrorParam,
 58:   type BetaContainer,
 59:   type BetaContainerUploadBlock,
 60:   type BetaContainerUploadBlockParam,
 61:   type BetaContentBlock,
 62:   type BetaContentBlockParam,
 63:   type BetaContentBlockSource,
 64:   type BetaContentBlockSourceContent,
 65:   type BetaFileDocumentSource,
 66:   type BetaFileImageSource,
 67:   type BetaImageBlockParam,
 68:   type BetaInputJSONDelta,
 69:   type BetaMCPToolResultBlock,
 70:   type BetaMCPToolUseBlock,
 71:   type BetaMCPToolUseBlockParam,
 72:   type BetaMessage,
 73:   type BetaMessageDeltaUsage,
 74:   type BetaMessageParam,
 75:   type BetaMessageTokensCount,
 76:   type BetaMetadata,
 77:   type BetaPlainTextSource,
 78:   type BetaRawContentBlockDelta,
 79:   type BetaRawContentBlockDeltaEvent,
 80:   type BetaRawContentBlockStartEvent,
 81:   type BetaRawContentBlockStopEvent,
 82:   type BetaRawMessageDeltaEvent,
 83:   type BetaRawMessageStartEvent,
 84:   type BetaRawMessageStopEvent,
 85:   type BetaRawMessageStreamEvent,
 86:   type BetaRedactedThinkingBlock,
 87:   type BetaRedactedThinkingBlockParam,
 88:   type BetaRequestMCPServerToolConfiguration,
 89:   type BetaRequestMCPServerURLDefinition,
 90:   type BetaRequestMCPToolResultBlockParam,
 91:   type BetaServerToolUsage,
 92:   type BetaServerToolUseBlock,
 93:   type BetaServerToolUseBlockParam,
 94:   type BetaSignatureDelta,
 95:   type BetaStopReason,
 96:   type BetaTextBlock,
 97:   type BetaTextBlockParam,
 98:   type BetaTextCitation,
 99:   type BetaTextCitationParam,
100:   type BetaTextDelta,
101:   type BetaThinkingBlock,
102:   type BetaThinkingBlockParam,
103:   type BetaThinkingConfigDisabled,
104:   type BetaThinkingConfigEnabled,
105:   type BetaThinkingConfigParam,
106:   type BetaThinkingDelta,
107:   type BetaTool,
108:   type BetaToolBash20241022,
109:   type BetaToolBash20250124,
110:   type BetaToolChoice,
111:   type BetaToolChoiceAny,
112:   type BetaToolChoiceAuto,
113:   type BetaToolChoiceNone,
114:   type BetaToolChoiceTool,
115:   type BetaToolComputerUse20241022,
116:   type BetaToolComputerUse20250124,
117:   type BetaToolResultBlockParam,
118:   type BetaToolTextEditor20241022,
119:   type BetaToolTextEditor20250124,
120:   type BetaToolTextEditor20250429,
121:   type BetaToolUnion,
122:   type BetaToolUseBlock,
123:   type BetaToolUseBlockParam,
124:   type BetaURLImageSource,
125:   type BetaURLPDFSource,
126:   type BetaUsage,
127:   type BetaWebSearchResultBlock,
128:   type BetaWebSearchResultBlockParam,
129:   type BetaWebSearchTool20250305,
130:   type BetaWebSearchToolRequestError,
131:   type BetaWebSearchToolResultBlock,
132:   type BetaWebSearchToolResultBlockContent,
133:   type BetaWebSearchToolResultBlockParam,
134:   type BetaWebSearchToolResultBlockParamContent,
135:   type BetaWebSearchToolResultError,
136:   type BetaWebSearchToolResultErrorCode,
137:   type MessageCreateParams,
138:   type MessageCreateParamsNonStreaming,
139:   type MessageCreateParamsStreaming,
140:   type MessageCountTokensParams,
141: } from './messages/index';
142: export {
143:   Models,
144:   type BetaModelInfo,
145:   type ModelRetrieveParams,
146:   type ModelListParams,
147:   type BetaModelInfosPage,
148: } from './models';
````

## File: src/resources/beta/messages.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export * from './messages/index';
````

## File: src/resources/beta/models.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../../core/resource';
  4: import * as BetaAPI from './beta';
  5: import { APIPromise } from '../../core/api-promise';
  6: import { Page, type PageParams, PagePromise } from '../../core/pagination';
  7: import { buildHeaders } from '../../internal/headers';
  8: import { RequestOptions } from '../../internal/request-options';
  9: import { path } from '../../internal/utils/path';
 10: 
 11: export class Models extends APIResource {
 12:   /**
 13:    * Get a specific model.
 14:    *
 15:    * The Models API response can be used to determine information about a specific
 16:    * model or resolve a model alias to a model ID.
 17:    *
 18:    * @example
 19:    * ```ts
 20:    * const betaModelInfo = await client.beta.models.retrieve(
 21:    *   'model_id',
 22:    * );
 23:    * ```
 24:    */
 25:   retrieve(
 26:     modelID: string,
 27:     params: ModelRetrieveParams | null | undefined = {},
 28:     options?: RequestOptions,
 29:   ): APIPromise<BetaModelInfo> {
 30:     const { betas } = params ?? {};
 31:     return this._client.get(path`/v1/models/${modelID}?beta=true`, {
 32:       ...options,
 33:       headers: buildHeaders([
 34:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 35:         options?.headers,
 36:       ]),
 37:     });
 38:   }
 39: 
 40:   /**
 41:    * List available models.
 42:    *
 43:    * The Models API response can be used to determine which models are available for
 44:    * use in the API. More recently released models are listed first.
 45:    *
 46:    * @example
 47:    * ```ts
 48:    * // Automatically fetches more pages as needed.
 49:    * for await (const betaModelInfo of client.beta.models.list()) {
 50:    *   // ...
 51:    * }
 52:    * ```
 53:    */
 54:   list(
 55:     params: ModelListParams | null | undefined = {},
 56:     options?: RequestOptions,
 57:   ): PagePromise<BetaModelInfosPage, BetaModelInfo> {
 58:     const { betas, ...query } = params ?? {};
 59:     return this._client.getAPIList('/v1/models?beta=true', Page<BetaModelInfo>, {
 60:       query,
 61:       ...options,
 62:       headers: buildHeaders([
 63:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 64:         options?.headers,
 65:       ]),
 66:     });
 67:   }
 68: }
 69: 
 70: export type BetaModelInfosPage = Page<BetaModelInfo>;
 71: 
 72: export interface BetaModelInfo {
 73:   /**
 74:    * Unique model identifier.
 75:    */
 76:   id: string;
 77: 
 78:   /**
 79:    * RFC 3339 datetime string representing the time at which the model was released.
 80:    * May be set to an epoch value if the release date is unknown.
 81:    */
 82:   created_at: string;
 83: 
 84:   /**
 85:    * A human-readable name for the model.
 86:    */
 87:   display_name: string;
 88: 
 89:   /**
 90:    * Object type.
 91:    *
 92:    * For Models, this is always `"model"`.
 93:    */
 94:   type: 'model';
 95: }
 96: 
 97: export interface ModelRetrieveParams {
 98:   /**
 99:    * Optional header to specify the beta version(s) you want to use.
100:    */
101:   betas?: Array<BetaAPI.AnthropicBeta>;
102: }
103: 
104: export interface ModelListParams extends PageParams {
105:   /**
106:    * Header param: Optional header to specify the beta version(s) you want to use.
107:    */
108:   betas?: Array<BetaAPI.AnthropicBeta>;
109: }
110: 
111: export declare namespace Models {
112:   export {
113:     type BetaModelInfo as BetaModelInfo,
114:     type BetaModelInfosPage as BetaModelInfosPage,
115:     type ModelRetrieveParams as ModelRetrieveParams,
116:     type ModelListParams as ModelListParams,
117:   };
118: }
````

## File: src/resources/messages/batches.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../../core/resource';
  4: import * as Shared from '../shared';
  5: import * as MessagesAPI from './messages';
  6: import { APIPromise } from '../../core/api-promise';
  7: import { Page, type PageParams, PagePromise } from '../../core/pagination';
  8: import { buildHeaders } from '../../internal/headers';
  9: import { RequestOptions } from '../../internal/request-options';
 10: import { JSONLDecoder } from '../../internal/decoders/jsonl';
 11: import { AnthropicError } from '../../error';
 12: import { path } from '../../internal/utils/path';
 13: 
 14: export class Batches extends APIResource {
 15:   /**
 16:    * Send a batch of Message creation requests.
 17:    *
 18:    * The Message Batches API can be used to process multiple Messages API requests at
 19:    * once. Once a Message Batch is created, it begins processing immediately. Batches
 20:    * can take up to 24 hours to complete.
 21:    *
 22:    * Learn more about the Message Batches API in our
 23:    * [user guide](/en/docs/build-with-claude/batch-processing)
 24:    *
 25:    * @example
 26:    * ```ts
 27:    * const messageBatch = await client.messages.batches.create({
 28:    *   requests: [
 29:    *     {
 30:    *       custom_id: 'my-custom-id-1',
 31:    *       params: {
 32:    *         max_tokens: 1024,
 33:    *         messages: [
 34:    *           { content: 'Hello, world', role: 'user' },
 35:    *         ],
 36:    *         model: 'claude-3-7-sonnet-20250219',
 37:    *       },
 38:    *     },
 39:    *   ],
 40:    * });
 41:    * ```
 42:    */
 43:   create(body: BatchCreateParams, options?: RequestOptions): APIPromise<MessageBatch> {
 44:     return this._client.post('/v1/messages/batches', { body, ...options });
 45:   }
 46: 
 47:   /**
 48:    * This endpoint is idempotent and can be used to poll for Message Batch
 49:    * completion. To access the results of a Message Batch, make a request to the
 50:    * `results_url` field in the response.
 51:    *
 52:    * Learn more about the Message Batches API in our
 53:    * [user guide](/en/docs/build-with-claude/batch-processing)
 54:    *
 55:    * @example
 56:    * ```ts
 57:    * const messageBatch = await client.messages.batches.retrieve(
 58:    *   'message_batch_id',
 59:    * );
 60:    * ```
 61:    */
 62:   retrieve(messageBatchID: string, options?: RequestOptions): APIPromise<MessageBatch> {
 63:     return this._client.get(path`/v1/messages/batches/${messageBatchID}`, options);
 64:   }
 65: 
 66:   /**
 67:    * List all Message Batches within a Workspace. Most recently created batches are
 68:    * returned first.
 69:    *
 70:    * Learn more about the Message Batches API in our
 71:    * [user guide](/en/docs/build-with-claude/batch-processing)
 72:    *
 73:    * @example
 74:    * ```ts
 75:    * // Automatically fetches more pages as needed.
 76:    * for await (const messageBatch of client.messages.batches.list()) {
 77:    *   // ...
 78:    * }
 79:    * ```
 80:    */
 81:   list(
 82:     query: BatchListParams | null | undefined = {},
 83:     options?: RequestOptions,
 84:   ): PagePromise<MessageBatchesPage, MessageBatch> {
 85:     return this._client.getAPIList('/v1/messages/batches', Page<MessageBatch>, { query, ...options });
 86:   }
 87: 
 88:   /**
 89:    * Delete a Message Batch.
 90:    *
 91:    * Message Batches can only be deleted once they've finished processing. If you'd
 92:    * like to delete an in-progress batch, you must first cancel it.
 93:    *
 94:    * Learn more about the Message Batches API in our
 95:    * [user guide](/en/docs/build-with-claude/batch-processing)
 96:    *
 97:    * @example
 98:    * ```ts
 99:    * const deletedMessageBatch =
100:    *   await client.messages.batches.delete('message_batch_id');
101:    * ```
102:    */
103:   delete(messageBatchID: string, options?: RequestOptions): APIPromise<DeletedMessageBatch> {
104:     return this._client.delete(path`/v1/messages/batches/${messageBatchID}`, options);
105:   }
106: 
107:   /**
108:    * Batches may be canceled any time before processing ends. Once cancellation is
109:    * initiated, the batch enters a `canceling` state, at which time the system may
110:    * complete any in-progress, non-interruptible requests before finalizing
111:    * cancellation.
112:    *
113:    * The number of canceled requests is specified in `request_counts`. To determine
114:    * which requests were canceled, check the individual results within the batch.
115:    * Note that cancellation may not result in any canceled requests if they were
116:    * non-interruptible.
117:    *
118:    * Learn more about the Message Batches API in our
119:    * [user guide](/en/docs/build-with-claude/batch-processing)
120:    *
121:    * @example
122:    * ```ts
123:    * const messageBatch = await client.messages.batches.cancel(
124:    *   'message_batch_id',
125:    * );
126:    * ```
127:    */
128:   cancel(messageBatchID: string, options?: RequestOptions): APIPromise<MessageBatch> {
129:     return this._client.post(path`/v1/messages/batches/${messageBatchID}/cancel`, options);
130:   }
131: 
132:   /**
133:    * Streams the results of a Message Batch as a `.jsonl` file.
134:    *
135:    * Each line in the file is a JSON object containing the result of a single request
136:    * in the Message Batch. Results are not guaranteed to be in the same order as
137:    * requests. Use the `custom_id` field to match results to requests.
138:    *
139:    * Learn more about the Message Batches API in our
140:    * [user guide](/en/docs/build-with-claude/batch-processing)
141:    *
142:    * @example
143:    * ```ts
144:    * const messageBatchIndividualResponse =
145:    *   await client.messages.batches.results('message_batch_id');
146:    * ```
147:    */
148:   async results(
149:     messageBatchID: string,
150:     options?: RequestOptions,
151:   ): Promise<JSONLDecoder<MessageBatchIndividualResponse>> {
152:     const batch = await this.retrieve(messageBatchID);
153:     if (!batch.results_url) {
154:       throw new AnthropicError(
155:         `No batch \`results_url\`; Has it finished processing? ${batch.processing_status} - ${batch.id}`,
156:       );
157:     }
158: 
159:     return this._client
160:       .get(batch.results_url, {
161:         ...options,
162:         headers: buildHeaders([{ Accept: 'application/binary' }, options?.headers]),
163:         stream: true,
164:         __binaryResponse: true,
165:       })
166:       ._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller)) as APIPromise<
167:       JSONLDecoder<MessageBatchIndividualResponse>
168:     >;
169:   }
170: }
171: 
172: export type MessageBatchesPage = Page<MessageBatch>;
173: 
174: export interface DeletedMessageBatch {
175:   /**
176:    * ID of the Message Batch.
177:    */
178:   id: string;
179: 
180:   /**
181:    * Deleted object type.
182:    *
183:    * For Message Batches, this is always `"message_batch_deleted"`.
184:    */
185:   type: 'message_batch_deleted';
186: }
187: 
188: export interface MessageBatch {
189:   /**
190:    * Unique object identifier.
191:    *
192:    * The format and length of IDs may change over time.
193:    */
194:   id: string;
195: 
196:   /**
197:    * RFC 3339 datetime string representing the time at which the Message Batch was
198:    * archived and its results became unavailable.
199:    */
200:   archived_at: string | null;
201: 
202:   /**
203:    * RFC 3339 datetime string representing the time at which cancellation was
204:    * initiated for the Message Batch. Specified only if cancellation was initiated.
205:    */
206:   cancel_initiated_at: string | null;
207: 
208:   /**
209:    * RFC 3339 datetime string representing the time at which the Message Batch was
210:    * created.
211:    */
212:   created_at: string;
213: 
214:   /**
215:    * RFC 3339 datetime string representing the time at which processing for the
216:    * Message Batch ended. Specified only once processing ends.
217:    *
218:    * Processing ends when every request in a Message Batch has either succeeded,
219:    * errored, canceled, or expired.
220:    */
221:   ended_at: string | null;
222: 
223:   /**
224:    * RFC 3339 datetime string representing the time at which the Message Batch will
225:    * expire and end processing, which is 24 hours after creation.
226:    */
227:   expires_at: string;
228: 
229:   /**
230:    * Processing status of the Message Batch.
231:    */
232:   processing_status: 'in_progress' | 'canceling' | 'ended';
233: 
234:   /**
235:    * Tallies requests within the Message Batch, categorized by their status.
236:    *
237:    * Requests start as `processing` and move to one of the other statuses only once
238:    * processing of the entire batch ends. The sum of all values always matches the
239:    * total number of requests in the batch.
240:    */
241:   request_counts: MessageBatchRequestCounts;
242: 
243:   /**
244:    * URL to a `.jsonl` file containing the results of the Message Batch requests.
245:    * Specified only once processing ends.
246:    *
247:    * Results in the file are not guaranteed to be in the same order as requests. Use
248:    * the `custom_id` field to match results to requests.
249:    */
250:   results_url: string | null;
251: 
252:   /**
253:    * Object type.
254:    *
255:    * For Message Batches, this is always `"message_batch"`.
256:    */
257:   type: 'message_batch';
258: }
259: 
260: export interface MessageBatchCanceledResult {
261:   type: 'canceled';
262: }
263: 
264: export interface MessageBatchErroredResult {
265:   error: Shared.ErrorResponse;
266: 
267:   type: 'errored';
268: }
269: 
270: export interface MessageBatchExpiredResult {
271:   type: 'expired';
272: }
273: 
274: /**
275:  * This is a single line in the response `.jsonl` file and does not represent the
276:  * response as a whole.
277:  */
278: export interface MessageBatchIndividualResponse {
279:   /**
280:    * Developer-provided ID created for each request in a Message Batch. Useful for
281:    * matching results to requests, as results may be given out of request order.
282:    *
283:    * Must be unique for each request within the Message Batch.
284:    */
285:   custom_id: string;
286: 
287:   /**
288:    * Processing result for this request.
289:    *
290:    * Contains a Message output if processing was successful, an error response if
291:    * processing failed, or the reason why processing was not attempted, such as
292:    * cancellation or expiration.
293:    */
294:   result: MessageBatchResult;
295: }
296: 
297: export interface MessageBatchRequestCounts {
298:   /**
299:    * Number of requests in the Message Batch that have been canceled.
300:    *
301:    * This is zero until processing of the entire Message Batch has ended.
302:    */
303:   canceled: number;
304: 
305:   /**
306:    * Number of requests in the Message Batch that encountered an error.
307:    *
308:    * This is zero until processing of the entire Message Batch has ended.
309:    */
310:   errored: number;
311: 
312:   /**
313:    * Number of requests in the Message Batch that have expired.
314:    *
315:    * This is zero until processing of the entire Message Batch has ended.
316:    */
317:   expired: number;
318: 
319:   /**
320:    * Number of requests in the Message Batch that are processing.
321:    */
322:   processing: number;
323: 
324:   /**
325:    * Number of requests in the Message Batch that have completed successfully.
326:    *
327:    * This is zero until processing of the entire Message Batch has ended.
328:    */
329:   succeeded: number;
330: }
331: 
332: /**
333:  * Processing result for this request.
334:  *
335:  * Contains a Message output if processing was successful, an error response if
336:  * processing failed, or the reason why processing was not attempted, such as
337:  * cancellation or expiration.
338:  */
339: export type MessageBatchResult =
340:   | MessageBatchSucceededResult
341:   | MessageBatchErroredResult
342:   | MessageBatchCanceledResult
343:   | MessageBatchExpiredResult;
344: 
345: export interface MessageBatchSucceededResult {
346:   message: MessagesAPI.Message;
347: 
348:   type: 'succeeded';
349: }
350: 
351: export interface BatchCreateParams {
352:   /**
353:    * List of requests for prompt completion. Each is an individual request to create
354:    * a Message.
355:    */
356:   requests: Array<BatchCreateParams.Request>;
357: }
358: 
359: export namespace BatchCreateParams {
360:   export interface Request {
361:     /**
362:      * Developer-provided ID created for each request in a Message Batch. Useful for
363:      * matching results to requests, as results may be given out of request order.
364:      *
365:      * Must be unique for each request within the Message Batch.
366:      */
367:     custom_id: string;
368: 
369:     /**
370:      * Messages API creation parameters for the individual request.
371:      *
372:      * See the [Messages API reference](/en/api/messages) for full documentation on
373:      * available parameters.
374:      */
375:     params: MessagesAPI.MessageCreateParamsNonStreaming;
376:   }
377: }
378: 
379: export interface BatchListParams extends PageParams {}
380: 
381: export declare namespace Batches {
382:   export {
383:     type DeletedMessageBatch as DeletedMessageBatch,
384:     type MessageBatch as MessageBatch,
385:     type MessageBatchCanceledResult as MessageBatchCanceledResult,
386:     type MessageBatchErroredResult as MessageBatchErroredResult,
387:     type MessageBatchExpiredResult as MessageBatchExpiredResult,
388:     type MessageBatchIndividualResponse as MessageBatchIndividualResponse,
389:     type MessageBatchRequestCounts as MessageBatchRequestCounts,
390:     type MessageBatchResult as MessageBatchResult,
391:     type MessageBatchSucceededResult as MessageBatchSucceededResult,
392:     type MessageBatchesPage as MessageBatchesPage,
393:     type BatchCreateParams as BatchCreateParams,
394:     type BatchListParams as BatchListParams,
395:   };
396: }
````

## File: src/resources/messages/index.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: export {
  4:   Batches,
  5:   type DeletedMessageBatch,
  6:   type MessageBatch,
  7:   type MessageBatchCanceledResult,
  8:   type MessageBatchErroredResult,
  9:   type MessageBatchExpiredResult,
 10:   type MessageBatchIndividualResponse,
 11:   type MessageBatchRequestCounts,
 12:   type MessageBatchResult,
 13:   type MessageBatchSucceededResult,
 14:   type BatchCreateParams,
 15:   type BatchListParams,
 16:   type MessageBatchesPage,
 17: } from './batches';
 18: export {
 19:   Messages,
 20:   type Base64ImageSource,
 21:   type Base64PDFSource,
 22:   type CacheControlEphemeral,
 23:   type CitationCharLocation,
 24:   type CitationCharLocationParam,
 25:   type CitationContentBlockLocation,
 26:   type CitationContentBlockLocationParam,
 27:   type CitationPageLocation,
 28:   type CitationPageLocationParam,
 29:   type CitationWebSearchResultLocationParam,
 30:   type CitationsConfigParam,
 31:   type CitationsDelta,
 32:   type CitationsWebSearchResultLocation,
 33:   type ContentBlock,
 34:   type ContentBlockParam,
 35:   type ContentBlockStartEvent,
 36:   type ContentBlockStopEvent,
 37:   type ContentBlockSource,
 38:   type ContentBlockSourceContent,
 39:   type DocumentBlockParam,
 40:   type ImageBlockParam,
 41:   type InputJSONDelta,
 42:   type Message,
 43:   type MessageCountTokensTool,
 44:   type MessageDeltaEvent,
 45:   type MessageDeltaUsage,
 46:   type MessageParam,
 47:   type MessageTokensCount,
 48:   type Metadata,
 49:   type Model,
 50:   type PlainTextSource,
 51:   type RawContentBlockDelta,
 52:   type RawContentBlockDeltaEvent,
 53:   type RawContentBlockStartEvent,
 54:   type RawContentBlockStopEvent,
 55:   type RawMessageDeltaEvent,
 56:   type RawMessageStartEvent,
 57:   type RawMessageStopEvent,
 58:   type RawMessageStreamEvent,
 59:   type RedactedThinkingBlock,
 60:   type RedactedThinkingBlockParam,
 61:   type ServerToolUsage,
 62:   type ServerToolUseBlock,
 63:   type ServerToolUseBlockParam,
 64:   type SignatureDelta,
 65:   type StopReason,
 66:   type TextBlock,
 67:   type TextBlockParam,
 68:   type TextCitation,
 69:   type TextCitationParam,
 70:   type TextDelta,
 71:   type ThinkingBlock,
 72:   type ThinkingBlockParam,
 73:   type ThinkingConfigDisabled,
 74:   type ThinkingConfigEnabled,
 75:   type ThinkingConfigParam,
 76:   type ThinkingDelta,
 77:   type Tool,
 78:   type ToolBash20250124,
 79:   type ToolChoice,
 80:   type ToolChoiceAny,
 81:   type ToolChoiceAuto,
 82:   type ToolChoiceNone,
 83:   type ToolChoiceTool,
 84:   type ToolResultBlockParam,
 85:   type ToolTextEditor20250124,
 86:   type ToolUnion,
 87:   type ToolUseBlock,
 88:   type ToolUseBlockParam,
 89:   type URLImageSource,
 90:   type URLPDFSource,
 91:   type Usage,
 92:   type WebSearchResultBlock,
 93:   type WebSearchResultBlockParam,
 94:   type WebSearchTool20250305,
 95:   type WebSearchToolRequestError,
 96:   type WebSearchToolResultBlock,
 97:   type WebSearchToolResultBlockContent,
 98:   type WebSearchToolResultBlockParam,
 99:   type WebSearchToolResultBlockParamContent,
100:   type WebSearchToolResultError,
101:   type MessageStreamEvent,
102:   type MessageStartEvent,
103:   type MessageStopEvent,
104:   type ContentBlockDeltaEvent,
105:   type MessageCreateParams,
106:   type MessageCreateParamsBase,
107:   type MessageCreateParamsNonStreaming,
108:   type MessageCreateParamsStreaming,
109:   type MessageCountTokensParams,
110: } from './messages';
````

## File: src/resources/messages/messages.ts
````typescript
   1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
   2: 
   3: import { APIPromise } from '../../core/api-promise';
   4: import { APIResource } from '../../core/resource';
   5: import { Stream } from '../../core/streaming';
   6: import { RequestOptions } from '../../internal/request-options';
   7: import { MessageStream } from '../../lib/MessageStream';
   8: import * as BatchesAPI from './batches';
   9: import {
  10:   BatchCreateParams,
  11:   BatchListParams,
  12:   Batches,
  13:   DeletedMessageBatch,
  14:   MessageBatch,
  15:   MessageBatchCanceledResult,
  16:   MessageBatchErroredResult,
  17:   MessageBatchExpiredResult,
  18:   MessageBatchIndividualResponse,
  19:   MessageBatchRequestCounts,
  20:   MessageBatchResult,
  21:   MessageBatchSucceededResult,
  22:   MessageBatchesPage,
  23: } from './batches';
  24: import * as MessagesAPI from './messages';
  25: 
  26: import { MODEL_NONSTREAMING_TOKENS } from '../../internal/constants';
  27: 
  28: export class Messages extends APIResource {
  29:   batches: BatchesAPI.Batches = new BatchesAPI.Batches(this._client);
  30: 
  31:   /**
  32:    * Send a structured list of input messages with text and/or image content, and the
  33:    * model will generate the next message in the conversation.
  34:    *
  35:    * The Messages API can be used for either single queries or stateless multi-turn
  36:    * conversations.
  37:    *
  38:    * Learn more about the Messages API in our [user guide](/en/docs/initial-setup)
  39:    *
  40:    * @example
  41:    * ```ts
  42:    * const message = await client.messages.create({
  43:    *   max_tokens: 1024,
  44:    *   messages: [{ content: 'Hello, world', role: 'user' }],
  45:    *   model: 'claude-3-7-sonnet-20250219',
  46:    * });
  47:    * ```
  48:    */
  49:   create(body: MessageCreateParamsNonStreaming, options?: RequestOptions): APIPromise<Message>;
  50:   create(
  51:     body: MessageCreateParamsStreaming,
  52:     options?: RequestOptions,
  53:   ): APIPromise<Stream<RawMessageStreamEvent>>;
  54:   create(
  55:     body: MessageCreateParamsBase,
  56:     options?: RequestOptions,
  57:   ): APIPromise<Stream<RawMessageStreamEvent> | Message>;
  58:   create(
  59:     body: MessageCreateParams,
  60:     options?: RequestOptions,
  61:   ): APIPromise<Message> | APIPromise<Stream<RawMessageStreamEvent>> {
  62:     if (body.model in DEPRECATED_MODELS) {
  63:       console.warn(
  64:         `The model '${body.model}' is deprecated and will reach end-of-life on ${
  65:           DEPRECATED_MODELS[body.model]
  66:         }\nPlease migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`,
  67:       );
  68:     }
  69:     let timeout = (this._client as any)._options.timeout as number | null;
  70:     if (!body.stream && timeout == null) {
  71:       const maxNonstreamingTokens = MODEL_NONSTREAMING_TOKENS[body.model] ?? undefined;
  72:       timeout = this._client.calculateNonstreamingTimeout(body.max_tokens, maxNonstreamingTokens);
  73:     }
  74:     return this._client.post('/v1/messages', {
  75:       body,
  76:       timeout: timeout ?? 600000,
  77:       ...options,
  78:       stream: body.stream ?? false,
  79:     }) as APIPromise<Message> | APIPromise<Stream<RawMessageStreamEvent>>;
  80:   }
  81: 
  82:   /**
  83:    * Create a Message stream
  84:    */
  85:   stream(body: MessageStreamParams, options?: RequestOptions): MessageStream {
  86:     return MessageStream.createMessage(this, body, options);
  87:   }
  88: 
  89:   /**
  90:    * Count the number of tokens in a Message.
  91:    *
  92:    * The Token Count API can be used to count the number of tokens in a Message,
  93:    * including tools, images, and documents, without creating it.
  94:    *
  95:    * Learn more about token counting in our
  96:    * [user guide](/en/docs/build-with-claude/token-counting)
  97:    *
  98:    * @example
  99:    * ```ts
 100:    * const messageTokensCount =
 101:    *   await client.messages.countTokens({
 102:    *     messages: [{ content: 'string', role: 'user' }],
 103:    *     model: 'claude-3-7-sonnet-latest',
 104:    *   });
 105:    * ```
 106:    */
 107:   countTokens(body: MessageCountTokensParams, options?: RequestOptions): APIPromise<MessageTokensCount> {
 108:     return this._client.post('/v1/messages/count_tokens', { body, ...options });
 109:   }
 110: }
 111: 
 112: export interface Base64ImageSource {
 113:   data: string;
 114: 
 115:   media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
 116: 
 117:   type: 'base64';
 118: }
 119: 
 120: export interface Base64PDFSource {
 121:   data: string;
 122: 
 123:   media_type: 'application/pdf';
 124: 
 125:   type: 'base64';
 126: }
 127: 
 128: export interface CacheControlEphemeral {
 129:   type: 'ephemeral';
 130: }
 131: 
 132: export interface CitationCharLocation {
 133:   cited_text: string;
 134: 
 135:   document_index: number;
 136: 
 137:   document_title: string | null;
 138: 
 139:   end_char_index: number;
 140: 
 141:   start_char_index: number;
 142: 
 143:   type: 'char_location';
 144: }
 145: 
 146: export interface CitationCharLocationParam {
 147:   cited_text: string;
 148: 
 149:   document_index: number;
 150: 
 151:   document_title: string | null;
 152: 
 153:   end_char_index: number;
 154: 
 155:   start_char_index: number;
 156: 
 157:   type: 'char_location';
 158: }
 159: 
 160: export interface CitationContentBlockLocation {
 161:   cited_text: string;
 162: 
 163:   document_index: number;
 164: 
 165:   document_title: string | null;
 166: 
 167:   end_block_index: number;
 168: 
 169:   start_block_index: number;
 170: 
 171:   type: 'content_block_location';
 172: }
 173: 
 174: export interface CitationContentBlockLocationParam {
 175:   cited_text: string;
 176: 
 177:   document_index: number;
 178: 
 179:   document_title: string | null;
 180: 
 181:   end_block_index: number;
 182: 
 183:   start_block_index: number;
 184: 
 185:   type: 'content_block_location';
 186: }
 187: 
 188: export interface CitationPageLocation {
 189:   cited_text: string;
 190: 
 191:   document_index: number;
 192: 
 193:   document_title: string | null;
 194: 
 195:   end_page_number: number;
 196: 
 197:   start_page_number: number;
 198: 
 199:   type: 'page_location';
 200: }
 201: 
 202: export interface CitationPageLocationParam {
 203:   cited_text: string;
 204: 
 205:   document_index: number;
 206: 
 207:   document_title: string | null;
 208: 
 209:   end_page_number: number;
 210: 
 211:   start_page_number: number;
 212: 
 213:   type: 'page_location';
 214: }
 215: 
 216: export interface CitationWebSearchResultLocationParam {
 217:   cited_text: string;
 218: 
 219:   encrypted_index: string;
 220: 
 221:   title: string | null;
 222: 
 223:   type: 'web_search_result_location';
 224: 
 225:   url: string;
 226: }
 227: 
 228: export interface CitationsConfigParam {
 229:   enabled?: boolean;
 230: }
 231: 
 232: export interface CitationsDelta {
 233:   citation:
 234:     | CitationCharLocation
 235:     | CitationPageLocation
 236:     | CitationContentBlockLocation
 237:     | CitationsWebSearchResultLocation;
 238: 
 239:   type: 'citations_delta';
 240: }
 241: 
 242: export interface CitationsWebSearchResultLocation {
 243:   cited_text: string;
 244: 
 245:   encrypted_index: string;
 246: 
 247:   title: string | null;
 248: 
 249:   type: 'web_search_result_location';
 250: 
 251:   url: string;
 252: }
 253: 
 254: export type ContentBlock =
 255:   | TextBlock
 256:   | ToolUseBlock
 257:   | ServerToolUseBlock
 258:   | WebSearchToolResultBlock
 259:   | ThinkingBlock
 260:   | RedactedThinkingBlock;
 261: 
 262: /**
 263:  * Regular text content.
 264:  */
 265: export type ContentBlockParam =
 266:   | ServerToolUseBlockParam
 267:   | WebSearchToolResultBlockParam
 268:   | TextBlockParam
 269:   | ImageBlockParam
 270:   | ToolUseBlockParam
 271:   | ToolResultBlockParam
 272:   | DocumentBlockParam
 273:   | ThinkingBlockParam
 274:   | RedactedThinkingBlockParam;
 275: 
 276: export interface ContentBlockSource {
 277:   content: string | Array<ContentBlockSourceContent>;
 278: 
 279:   type: 'content';
 280: }
 281: 
 282: export type ContentBlockSourceContent = TextBlockParam | ImageBlockParam;
 283: 
 284: export interface DocumentBlockParam {
 285:   source: Base64PDFSource | PlainTextSource | ContentBlockSource | URLPDFSource;
 286: 
 287:   type: 'document';
 288: 
 289:   /**
 290:    * Create a cache control breakpoint at this content block.
 291:    */
 292:   cache_control?: CacheControlEphemeral | null;
 293: 
 294:   citations?: CitationsConfigParam;
 295: 
 296:   context?: string | null;
 297: 
 298:   title?: string | null;
 299: }
 300: 
 301: export interface ImageBlockParam {
 302:   source: Base64ImageSource | URLImageSource;
 303: 
 304:   type: 'image';
 305: 
 306:   /**
 307:    * Create a cache control breakpoint at this content block.
 308:    */
 309:   cache_control?: CacheControlEphemeral | null;
 310: }
 311: 
 312: export interface InputJSONDelta {
 313:   partial_json: string;
 314: 
 315:   type: 'input_json_delta';
 316: }
 317: 
 318: export interface Message {
 319:   /**
 320:    * Unique object identifier.
 321:    *
 322:    * The format and length of IDs may change over time.
 323:    */
 324:   id: string;
 325: 
 326:   /**
 327:    * Content generated by the model.
 328:    *
 329:    * This is an array of content blocks, each of which has a `type` that determines
 330:    * its shape.
 331:    *
 332:    * Example:
 333:    *
 334:    * ```json
 335:    * [{ "type": "text", "text": "Hi, I'm Claude." }]
 336:    * ```
 337:    *
 338:    * If the request input `messages` ended with an `assistant` turn, then the
 339:    * response `content` will continue directly from that last turn. You can use this
 340:    * to constrain the model's output.
 341:    *
 342:    * For example, if the input `messages` were:
 343:    *
 344:    * ```json
 345:    * [
 346:    *   {
 347:    *     "role": "user",
 348:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
 349:    *   },
 350:    *   { "role": "assistant", "content": "The best answer is (" }
 351:    * ]
 352:    * ```
 353:    *
 354:    * Then the response `content` might be:
 355:    *
 356:    * ```json
 357:    * [{ "type": "text", "text": "B)" }]
 358:    * ```
 359:    */
 360:   content: Array<ContentBlock>;
 361: 
 362:   /**
 363:    * The model that will complete your prompt.\n\nSee
 364:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
 365:    * details and options.
 366:    */
 367:   model: Model;
 368: 
 369:   /**
 370:    * Conversational role of the generated message.
 371:    *
 372:    * This will always be `"assistant"`.
 373:    */
 374:   role: 'assistant';
 375: 
 376:   /**
 377:    * The reason that we stopped.
 378:    *
 379:    * This may be one the following values:
 380:    *
 381:    * - `"end_turn"`: the model reached a natural stopping point
 382:    * - `"max_tokens"`: we exceeded the requested `max_tokens` or the model's maximum
 383:    * - `"stop_sequence"`: one of your provided custom `stop_sequences` was generated
 384:    * - `"tool_use"`: the model invoked one or more tools
 385:    *
 386:    * In non-streaming mode this value is always non-null. In streaming mode, it is
 387:    * null in the `message_start` event and non-null otherwise.
 388:    */
 389:   stop_reason: StopReason | null;
 390: 
 391:   /**
 392:    * Which custom stop sequence was generated, if any.
 393:    *
 394:    * This value will be a non-null string if one of your custom stop sequences was
 395:    * generated.
 396:    */
 397:   stop_sequence: string | null;
 398: 
 399:   /**
 400:    * Object type.
 401:    *
 402:    * For Messages, this is always `"message"`.
 403:    */
 404:   type: 'message';
 405: 
 406:   /**
 407:    * Billing and rate-limit usage.
 408:    *
 409:    * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 410:    * underlying cost to our systems.
 411:    *
 412:    * Under the hood, the API transforms requests into a format suitable for the
 413:    * model. The model's output then goes through a parsing stage before becoming an
 414:    * API response. As a result, the token counts in `usage` will not match one-to-one
 415:    * with the exact visible content of an API request or response.
 416:    *
 417:    * For example, `output_tokens` will be non-zero, even for an empty string response
 418:    * from Claude.
 419:    *
 420:    * Total input tokens in a request is the summation of `input_tokens`,
 421:    * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
 422:    */
 423:   usage: Usage;
 424: }
 425: 
 426: export type MessageCountTokensTool = Tool | ToolBash20250124 | ToolTextEditor20250124 | WebSearchTool20250305;
 427: 
 428: export interface MessageDeltaUsage {
 429:   /**
 430:    * The cumulative number of input tokens used to create the cache entry.
 431:    */
 432:   cache_creation_input_tokens: number | null;
 433: 
 434:   /**
 435:    * The cumulative number of input tokens read from the cache.
 436:    */
 437:   cache_read_input_tokens: number | null;
 438: 
 439:   /**
 440:    * The cumulative number of input tokens which were used.
 441:    */
 442:   input_tokens: number | null;
 443: 
 444:   /**
 445:    * The cumulative number of output tokens which were used.
 446:    */
 447:   output_tokens: number;
 448: 
 449:   /**
 450:    * The number of server tool requests.
 451:    */
 452:   server_tool_use: ServerToolUsage | null;
 453: }
 454: 
 455: export interface MessageParam {
 456:   content: string | Array<ContentBlockParam>;
 457: 
 458:   role: 'user' | 'assistant';
 459: }
 460: 
 461: export interface MessageTokensCount {
 462:   /**
 463:    * The total number of tokens across the provided list of messages, system prompt,
 464:    * and tools.
 465:    */
 466:   input_tokens: number;
 467: }
 468: 
 469: export interface Metadata {
 470:   /**
 471:    * An external identifier for the user who is associated with the request.
 472:    *
 473:    * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
 474:    * this id to help detect abuse. Do not include any identifying information such as
 475:    * name, email address, or phone number.
 476:    */
 477:   user_id?: string | null;
 478: }
 479: 
 480: /**
 481:  * The model that will complete your prompt.\n\nSee
 482:  * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
 483:  * details and options.
 484:  */
 485: export type Model =
 486:   | 'claude-3-7-sonnet-latest'
 487:   | 'claude-3-7-sonnet-20250219'
 488:   | 'claude-3-5-haiku-latest'
 489:   | 'claude-3-5-haiku-20241022'
 490:   | 'claude-sonnet-4-20250514'
 491:   | 'claude-sonnet-4-0'
 492:   | 'claude-4-sonnet-20250514'
 493:   | 'claude-3-5-sonnet-latest'
 494:   | 'claude-3-5-sonnet-20241022'
 495:   | 'claude-3-5-sonnet-20240620'
 496:   | 'claude-opus-4-0'
 497:   | 'claude-opus-4-20250514'
 498:   | 'claude-4-opus-20250514'
 499:   | 'claude-3-opus-latest'
 500:   | 'claude-3-opus-20240229'
 501:   | 'claude-3-sonnet-20240229'
 502:   | 'claude-3-haiku-20240307'
 503:   | 'claude-2.1'
 504:   | 'claude-2.0'
 505:   | (string & {});
 506: 
 507: const DEPRECATED_MODELS: {
 508:   [K in Model]?: string;
 509: } = {
 510:   'claude-1.3': 'November 6th, 2024',
 511:   'claude-1.3-100k': 'November 6th, 2024',
 512:   'claude-instant-1.1': 'November 6th, 2024',
 513:   'claude-instant-1.1-100k': 'November 6th, 2024',
 514:   'claude-instant-1.2': 'November 6th, 2024',
 515:   'claude-3-sonnet-20240229': 'July 21st, 2025',
 516:   'claude-2.1': 'July 21st, 2025',
 517:   'claude-2.0': 'July 21st, 2025',
 518: };
 519: 
 520: export interface PlainTextSource {
 521:   data: string;
 522: 
 523:   media_type: 'text/plain';
 524: 
 525:   type: 'text';
 526: }
 527: 
 528: export type RawContentBlockDelta =
 529:   | TextDelta
 530:   | InputJSONDelta
 531:   | CitationsDelta
 532:   | ThinkingDelta
 533:   | SignatureDelta;
 534: 
 535: export interface RawContentBlockDeltaEvent {
 536:   delta: RawContentBlockDelta;
 537: 
 538:   index: number;
 539: 
 540:   type: 'content_block_delta';
 541: }
 542: 
 543: export interface RawContentBlockStartEvent {
 544:   content_block:
 545:     | TextBlock
 546:     | ToolUseBlock
 547:     | ServerToolUseBlock
 548:     | WebSearchToolResultBlock
 549:     | ThinkingBlock
 550:     | RedactedThinkingBlock;
 551: 
 552:   index: number;
 553: 
 554:   type: 'content_block_start';
 555: }
 556: 
 557: export interface RawContentBlockStopEvent {
 558:   index: number;
 559: 
 560:   type: 'content_block_stop';
 561: }
 562: 
 563: export interface RawMessageDeltaEvent {
 564:   delta: RawMessageDeltaEvent.Delta;
 565: 
 566:   type: 'message_delta';
 567: 
 568:   /**
 569:    * Billing and rate-limit usage.
 570:    *
 571:    * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 572:    * underlying cost to our systems.
 573:    *
 574:    * Under the hood, the API transforms requests into a format suitable for the
 575:    * model. The model's output then goes through a parsing stage before becoming an
 576:    * API response. As a result, the token counts in `usage` will not match one-to-one
 577:    * with the exact visible content of an API request or response.
 578:    *
 579:    * For example, `output_tokens` will be non-zero, even for an empty string response
 580:    * from Claude.
 581:    *
 582:    * Total input tokens in a request is the summation of `input_tokens`,
 583:    * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
 584:    */
 585:   usage: MessageDeltaUsage;
 586: }
 587: 
 588: export namespace RawMessageDeltaEvent {
 589:   export interface Delta {
 590:     stop_reason: MessagesAPI.StopReason | null;
 591: 
 592:     stop_sequence: string | null;
 593:   }
 594: }
 595: 
 596: export interface RawMessageStartEvent {
 597:   message: Message;
 598: 
 599:   type: 'message_start';
 600: }
 601: 
 602: export interface RawMessageStopEvent {
 603:   type: 'message_stop';
 604: }
 605: 
 606: export type RawMessageStreamEvent =
 607:   | RawMessageStartEvent
 608:   | RawMessageDeltaEvent
 609:   | RawMessageStopEvent
 610:   | RawContentBlockStartEvent
 611:   | RawContentBlockDeltaEvent
 612:   | RawContentBlockStopEvent;
 613: 
 614: export interface RedactedThinkingBlock {
 615:   data: string;
 616: 
 617:   type: 'redacted_thinking';
 618: }
 619: 
 620: export interface RedactedThinkingBlockParam {
 621:   data: string;
 622: 
 623:   type: 'redacted_thinking';
 624: }
 625: 
 626: export interface ServerToolUsage {
 627:   /**
 628:    * The number of web search tool requests.
 629:    */
 630:   web_search_requests: number;
 631: }
 632: 
 633: export interface ServerToolUseBlock {
 634:   id: string;
 635: 
 636:   input: unknown;
 637: 
 638:   name: 'web_search';
 639: 
 640:   type: 'server_tool_use';
 641: }
 642: 
 643: export interface ServerToolUseBlockParam {
 644:   id: string;
 645: 
 646:   input: unknown;
 647: 
 648:   name: 'web_search';
 649: 
 650:   type: 'server_tool_use';
 651: 
 652:   /**
 653:    * Create a cache control breakpoint at this content block.
 654:    */
 655:   cache_control?: CacheControlEphemeral | null;
 656: }
 657: 
 658: export interface SignatureDelta {
 659:   signature: string;
 660: 
 661:   type: 'signature_delta';
 662: }
 663: 
 664: export type StopReason = 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use' | 'pause_turn' | 'refusal';
 665: 
 666: export interface TextBlock {
 667:   /**
 668:    * Citations supporting the text block.
 669:    *
 670:    * The type of citation returned will depend on the type of document being cited.
 671:    * Citing a PDF results in `page_location`, plain text results in `char_location`,
 672:    * and content document results in `content_block_location`.
 673:    */
 674:   citations: Array<TextCitation> | null;
 675: 
 676:   text: string;
 677: 
 678:   type: 'text';
 679: }
 680: 
 681: export interface TextBlockParam {
 682:   text: string;
 683: 
 684:   type: 'text';
 685: 
 686:   /**
 687:    * Create a cache control breakpoint at this content block.
 688:    */
 689:   cache_control?: CacheControlEphemeral | null;
 690: 
 691:   citations?: Array<TextCitationParam> | null;
 692: }
 693: 
 694: export type TextCitation =
 695:   | CitationCharLocation
 696:   | CitationPageLocation
 697:   | CitationContentBlockLocation
 698:   | CitationsWebSearchResultLocation;
 699: 
 700: export type TextCitationParam =
 701:   | CitationCharLocationParam
 702:   | CitationPageLocationParam
 703:   | CitationContentBlockLocationParam
 704:   | CitationWebSearchResultLocationParam;
 705: 
 706: export interface TextDelta {
 707:   text: string;
 708: 
 709:   type: 'text_delta';
 710: }
 711: 
 712: export interface ThinkingBlock {
 713:   signature: string;
 714: 
 715:   thinking: string;
 716: 
 717:   type: 'thinking';
 718: }
 719: 
 720: export interface ThinkingBlockParam {
 721:   signature: string;
 722: 
 723:   thinking: string;
 724: 
 725:   type: 'thinking';
 726: }
 727: 
 728: export interface ThinkingConfigDisabled {
 729:   type: 'disabled';
 730: }
 731: 
 732: export interface ThinkingConfigEnabled {
 733:   /**
 734:    * Determines how many tokens Claude can use for its internal reasoning process.
 735:    * Larger budgets can enable more thorough analysis for complex problems, improving
 736:    * response quality.
 737:    *
 738:    * Must be ≥1024 and less than `max_tokens`.
 739:    *
 740:    * See
 741:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
 742:    * for details.
 743:    */
 744:   budget_tokens: number;
 745: 
 746:   type: 'enabled';
 747: }
 748: 
 749: /**
 750:  * Configuration for enabling Claude's extended thinking.
 751:  *
 752:  * When enabled, responses include `thinking` content blocks showing Claude's
 753:  * thinking process before the final answer. Requires a minimum budget of 1,024
 754:  * tokens and counts towards your `max_tokens` limit.
 755:  *
 756:  * See
 757:  * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
 758:  * for details.
 759:  */
 760: export type ThinkingConfigParam = ThinkingConfigEnabled | ThinkingConfigDisabled;
 761: 
 762: export interface ThinkingDelta {
 763:   thinking: string;
 764: 
 765:   type: 'thinking_delta';
 766: }
 767: 
 768: export interface Tool {
 769:   /**
 770:    * [JSON schema](https://json-schema.org/draft/2020-12) for this tool's input.
 771:    *
 772:    * This defines the shape of the `input` that your tool accepts and that the model
 773:    * will produce.
 774:    */
 775:   input_schema: Tool.InputSchema;
 776: 
 777:   /**
 778:    * Name of the tool.
 779:    *
 780:    * This is how the tool will be called by the model and in `tool_use` blocks.
 781:    */
 782:   name: string;
 783: 
 784:   /**
 785:    * Create a cache control breakpoint at this content block.
 786:    */
 787:   cache_control?: CacheControlEphemeral | null;
 788: 
 789:   /**
 790:    * Description of what this tool does.
 791:    *
 792:    * Tool descriptions should be as detailed as possible. The more information that
 793:    * the model has about what the tool is and how to use it, the better it will
 794:    * perform. You can use natural language descriptions to reinforce important
 795:    * aspects of the tool input JSON schema.
 796:    */
 797:   description?: string;
 798: 
 799:   type?: 'custom' | null;
 800: }
 801: 
 802: export namespace Tool {
 803:   /**
 804:    * [JSON schema](https://json-schema.org/draft/2020-12) for this tool's input.
 805:    *
 806:    * This defines the shape of the `input` that your tool accepts and that the model
 807:    * will produce.
 808:    */
 809:   export interface InputSchema {
 810:     type: 'object';
 811: 
 812:     properties?: unknown | null;
 813: 
 814:     [k: string]: unknown;
 815:   }
 816: }
 817: 
 818: export interface ToolBash20250124 {
 819:   /**
 820:    * Name of the tool.
 821:    *
 822:    * This is how the tool will be called by the model and in `tool_use` blocks.
 823:    */
 824:   name: 'bash';
 825: 
 826:   type: 'bash_20250124';
 827: 
 828:   /**
 829:    * Create a cache control breakpoint at this content block.
 830:    */
 831:   cache_control?: CacheControlEphemeral | null;
 832: }
 833: 
 834: /**
 835:  * How the model should use the provided tools. The model can use a specific tool,
 836:  * any available tool, decide by itself, or not use tools at all.
 837:  */
 838: export type ToolChoice = ToolChoiceAuto | ToolChoiceAny | ToolChoiceTool | ToolChoiceNone;
 839: 
 840: /**
 841:  * The model will use any available tools.
 842:  */
 843: export interface ToolChoiceAny {
 844:   type: 'any';
 845: 
 846:   /**
 847:    * Whether to disable parallel tool use.
 848:    *
 849:    * Defaults to `false`. If set to `true`, the model will output exactly one tool
 850:    * use.
 851:    */
 852:   disable_parallel_tool_use?: boolean;
 853: }
 854: 
 855: /**
 856:  * The model will automatically decide whether to use tools.
 857:  */
 858: export interface ToolChoiceAuto {
 859:   type: 'auto';
 860: 
 861:   /**
 862:    * Whether to disable parallel tool use.
 863:    *
 864:    * Defaults to `false`. If set to `true`, the model will output at most one tool
 865:    * use.
 866:    */
 867:   disable_parallel_tool_use?: boolean;
 868: }
 869: 
 870: /**
 871:  * The model will not be allowed to use tools.
 872:  */
 873: export interface ToolChoiceNone {
 874:   type: 'none';
 875: }
 876: 
 877: /**
 878:  * The model will use the specified tool with `tool_choice.name`.
 879:  */
 880: export interface ToolChoiceTool {
 881:   /**
 882:    * The name of the tool to use.
 883:    */
 884:   name: string;
 885: 
 886:   type: 'tool';
 887: 
 888:   /**
 889:    * Whether to disable parallel tool use.
 890:    *
 891:    * Defaults to `false`. If set to `true`, the model will output exactly one tool
 892:    * use.
 893:    */
 894:   disable_parallel_tool_use?: boolean;
 895: }
 896: 
 897: export interface ToolResultBlockParam {
 898:   tool_use_id: string;
 899: 
 900:   type: 'tool_result';
 901: 
 902:   /**
 903:    * Create a cache control breakpoint at this content block.
 904:    */
 905:   cache_control?: CacheControlEphemeral | null;
 906: 
 907:   content?: string | Array<TextBlockParam | ImageBlockParam>;
 908: 
 909:   is_error?: boolean;
 910: }
 911: 
 912: export interface ToolTextEditor20250124 {
 913:   /**
 914:    * Name of the tool.
 915:    *
 916:    * This is how the tool will be called by the model and in `tool_use` blocks.
 917:    */
 918:   name: 'str_replace_editor';
 919: 
 920:   type: 'text_editor_20250124';
 921: 
 922:   /**
 923:    * Create a cache control breakpoint at this content block.
 924:    */
 925:   cache_control?: CacheControlEphemeral | null;
 926: }
 927: 
 928: export type ToolUnion = Tool | ToolBash20250124 | ToolTextEditor20250124 | WebSearchTool20250305;
 929: 
 930: export interface ToolUseBlock {
 931:   id: string;
 932: 
 933:   input: unknown;
 934: 
 935:   name: string;
 936: 
 937:   type: 'tool_use';
 938: }
 939: 
 940: export interface ToolUseBlockParam {
 941:   id: string;
 942: 
 943:   input: unknown;
 944: 
 945:   name: string;
 946: 
 947:   type: 'tool_use';
 948: 
 949:   /**
 950:    * Create a cache control breakpoint at this content block.
 951:    */
 952:   cache_control?: CacheControlEphemeral | null;
 953: }
 954: 
 955: export interface URLImageSource {
 956:   type: 'url';
 957: 
 958:   url: string;
 959: }
 960: 
 961: export interface URLPDFSource {
 962:   type: 'url';
 963: 
 964:   url: string;
 965: }
 966: 
 967: export interface Usage {
 968:   /**
 969:    * The number of input tokens used to create the cache entry.
 970:    */
 971:   cache_creation_input_tokens: number | null;
 972: 
 973:   /**
 974:    * The number of input tokens read from the cache.
 975:    */
 976:   cache_read_input_tokens: number | null;
 977: 
 978:   /**
 979:    * The number of input tokens which were used.
 980:    */
 981:   input_tokens: number;
 982: 
 983:   /**
 984:    * The number of output tokens which were used.
 985:    */
 986:   output_tokens: number;
 987: 
 988:   /**
 989:    * The number of server tool requests.
 990:    */
 991:   server_tool_use: ServerToolUsage | null;
 992: 
 993:   /**
 994:    * If the request used the priority, standard, or batch tier.
 995:    */
 996:   service_tier: 'standard' | 'priority' | 'batch' | null;
 997: }
 998: 
 999: export interface WebSearchResultBlock {
1000:   encrypted_content: string;
1001: 
1002:   page_age: string | null;
1003: 
1004:   title: string;
1005: 
1006:   type: 'web_search_result';
1007: 
1008:   url: string;
1009: }
1010: 
1011: export interface WebSearchResultBlockParam {
1012:   encrypted_content: string;
1013: 
1014:   title: string;
1015: 
1016:   type: 'web_search_result';
1017: 
1018:   url: string;
1019: 
1020:   page_age?: string | null;
1021: }
1022: 
1023: export interface WebSearchTool20250305 {
1024:   /**
1025:    * Name of the tool.
1026:    *
1027:    * This is how the tool will be called by the model and in `tool_use` blocks.
1028:    */
1029:   name: 'web_search';
1030: 
1031:   type: 'web_search_20250305';
1032: 
1033:   /**
1034:    * If provided, only these domains will be included in results. Cannot be used
1035:    * alongside `blocked_domains`.
1036:    */
1037:   allowed_domains?: Array<string> | null;
1038: 
1039:   /**
1040:    * If provided, these domains will never appear in results. Cannot be used
1041:    * alongside `allowed_domains`.
1042:    */
1043:   blocked_domains?: Array<string> | null;
1044: 
1045:   /**
1046:    * Create a cache control breakpoint at this content block.
1047:    */
1048:   cache_control?: CacheControlEphemeral | null;
1049: 
1050:   /**
1051:    * Maximum number of times the tool can be used in the API request.
1052:    */
1053:   max_uses?: number | null;
1054: 
1055:   /**
1056:    * Parameters for the user's location. Used to provide more relevant search
1057:    * results.
1058:    */
1059:   user_location?: WebSearchTool20250305.UserLocation | null;
1060: }
1061: 
1062: export namespace WebSearchTool20250305 {
1063:   /**
1064:    * Parameters for the user's location. Used to provide more relevant search
1065:    * results.
1066:    */
1067:   export interface UserLocation {
1068:     type: 'approximate';
1069: 
1070:     /**
1071:      * The city of the user.
1072:      */
1073:     city?: string | null;
1074: 
1075:     /**
1076:      * The two letter
1077:      * [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the
1078:      * user.
1079:      */
1080:     country?: string | null;
1081: 
1082:     /**
1083:      * The region of the user.
1084:      */
1085:     region?: string | null;
1086: 
1087:     /**
1088:      * The [IANA timezone](https://nodatime.org/TimeZones) of the user.
1089:      */
1090:     timezone?: string | null;
1091:   }
1092: }
1093: 
1094: export interface WebSearchToolRequestError {
1095:   error_code:
1096:     | 'invalid_tool_input'
1097:     | 'unavailable'
1098:     | 'max_uses_exceeded'
1099:     | 'too_many_requests'
1100:     | 'query_too_long';
1101: 
1102:   type: 'web_search_tool_result_error';
1103: }
1104: 
1105: export interface WebSearchToolResultBlock {
1106:   content: WebSearchToolResultBlockContent;
1107: 
1108:   tool_use_id: string;
1109: 
1110:   type: 'web_search_tool_result';
1111: }
1112: 
1113: export type WebSearchToolResultBlockContent = WebSearchToolResultError | Array<WebSearchResultBlock>;
1114: 
1115: export interface WebSearchToolResultBlockParam {
1116:   content: WebSearchToolResultBlockParamContent;
1117: 
1118:   tool_use_id: string;
1119: 
1120:   type: 'web_search_tool_result';
1121: 
1122:   /**
1123:    * Create a cache control breakpoint at this content block.
1124:    */
1125:   cache_control?: CacheControlEphemeral | null;
1126: }
1127: 
1128: export type WebSearchToolResultBlockParamContent =
1129:   | Array<WebSearchResultBlockParam>
1130:   | WebSearchToolRequestError;
1131: 
1132: export interface WebSearchToolResultError {
1133:   error_code:
1134:     | 'invalid_tool_input'
1135:     | 'unavailable'
1136:     | 'max_uses_exceeded'
1137:     | 'too_many_requests'
1138:     | 'query_too_long';
1139: 
1140:   type: 'web_search_tool_result_error';
1141: }
1142: 
1143: export type MessageStreamEvent = RawMessageStreamEvent;
1144: 
1145: export type MessageStartEvent = RawMessageStartEvent;
1146: 
1147: export type MessageDeltaEvent = RawMessageDeltaEvent;
1148: 
1149: export type MessageStopEvent = RawMessageStopEvent;
1150: 
1151: export type ContentBlockStartEvent = RawContentBlockStartEvent;
1152: 
1153: export type ContentBlockDeltaEvent = RawContentBlockDeltaEvent;
1154: 
1155: export type ContentBlockStopEvent = RawContentBlockStopEvent;
1156: 
1157: export type MessageCreateParams = MessageCreateParamsNonStreaming | MessageCreateParamsStreaming;
1158: 
1159: export interface MessageCreateParamsBase {
1160:   /**
1161:    * The maximum number of tokens to generate before stopping.
1162:    *
1163:    * Note that our models may stop _before_ reaching this maximum. This parameter
1164:    * only specifies the absolute maximum number of tokens to generate.
1165:    *
1166:    * Different models have different maximum values for this parameter. See
1167:    * [models](https://docs.anthropic.com/en/docs/models-overview) for details.
1168:    */
1169:   max_tokens: number;
1170: 
1171:   /**
1172:    * Input messages.
1173:    *
1174:    * Our models are trained to operate on alternating `user` and `assistant`
1175:    * conversational turns. When creating a new `Message`, you specify the prior
1176:    * conversational turns with the `messages` parameter, and the model then generates
1177:    * the next `Message` in the conversation. Consecutive `user` or `assistant` turns
1178:    * in your request will be combined into a single turn.
1179:    *
1180:    * Each input message must be an object with a `role` and `content`. You can
1181:    * specify a single `user`-role message, or you can include multiple `user` and
1182:    * `assistant` messages.
1183:    *
1184:    * If the final message uses the `assistant` role, the response content will
1185:    * continue immediately from the content in that message. This can be used to
1186:    * constrain part of the model's response.
1187:    *
1188:    * Example with a single `user` message:
1189:    *
1190:    * ```json
1191:    * [{ "role": "user", "content": "Hello, Claude" }]
1192:    * ```
1193:    *
1194:    * Example with multiple conversational turns:
1195:    *
1196:    * ```json
1197:    * [
1198:    *   { "role": "user", "content": "Hello there." },
1199:    *   { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
1200:    *   { "role": "user", "content": "Can you explain LLMs in plain English?" }
1201:    * ]
1202:    * ```
1203:    *
1204:    * Example with a partially-filled response from Claude:
1205:    *
1206:    * ```json
1207:    * [
1208:    *   {
1209:    *     "role": "user",
1210:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
1211:    *   },
1212:    *   { "role": "assistant", "content": "The best answer is (" }
1213:    * ]
1214:    * ```
1215:    *
1216:    * Each input message `content` may be either a single `string` or an array of
1217:    * content blocks, where each block has a specific `type`. Using a `string` for
1218:    * `content` is shorthand for an array of one content block of type `"text"`. The
1219:    * following input messages are equivalent:
1220:    *
1221:    * ```json
1222:    * { "role": "user", "content": "Hello, Claude" }
1223:    * ```
1224:    *
1225:    * ```json
1226:    * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
1227:    * ```
1228:    *
1229:    * Starting with Claude 3 models, you can also send image content blocks:
1230:    *
1231:    * ```json
1232:    * {
1233:    *   "role": "user",
1234:    *   "content": [
1235:    *     {
1236:    *       "type": "image",
1237:    *       "source": {
1238:    *         "type": "base64",
1239:    *         "media_type": "image/jpeg",
1240:    *         "data": "/9j/4AAQSkZJRg..."
1241:    *       }
1242:    *     },
1243:    *     { "type": "text", "text": "What is in this image?" }
1244:    *   ]
1245:    * }
1246:    * ```
1247:    *
1248:    * We currently support the `base64` source type for images, and the `image/jpeg`,
1249:    * `image/png`, `image/gif`, and `image/webp` media types.
1250:    *
1251:    * See [examples](https://docs.anthropic.com/en/api/messages-examples#vision) for
1252:    * more input examples.
1253:    *
1254:    * Note that if you want to include a
1255:    * [system prompt](https://docs.anthropic.com/en/docs/system-prompts), you can use
1256:    * the top-level `system` parameter — there is no `"system"` role for input
1257:    * messages in the Messages API.
1258:    *
1259:    * There is a limit of 100000 messages in a single request.
1260:    */
1261:   messages: Array<MessageParam>;
1262: 
1263:   /**
1264:    * The model that will complete your prompt.\n\nSee
1265:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
1266:    * details and options.
1267:    */
1268:   model: Model;
1269: 
1270:   /**
1271:    * An object describing metadata about the request.
1272:    */
1273:   metadata?: Metadata;
1274: 
1275:   /**
1276:    * Determines whether to use priority capacity (if available) or standard capacity
1277:    * for this request.
1278:    *
1279:    * Anthropic offers different levels of service for your API requests. See
1280:    * [service-tiers](https://docs.anthropic.com/en/api/service-tiers) for details.
1281:    */
1282:   service_tier?: 'auto' | 'standard_only';
1283: 
1284:   /**
1285:    * Custom text sequences that will cause the model to stop generating.
1286:    *
1287:    * Our models will normally stop when they have naturally completed their turn,
1288:    * which will result in a response `stop_reason` of `"end_turn"`.
1289:    *
1290:    * If you want the model to stop generating when it encounters custom strings of
1291:    * text, you can use the `stop_sequences` parameter. If the model encounters one of
1292:    * the custom sequences, the response `stop_reason` value will be `"stop_sequence"`
1293:    * and the response `stop_sequence` value will contain the matched stop sequence.
1294:    */
1295:   stop_sequences?: Array<string>;
1296: 
1297:   /**
1298:    * Whether to incrementally stream the response using server-sent events.
1299:    *
1300:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1301:    * details.
1302:    */
1303:   stream?: boolean;
1304: 
1305:   /**
1306:    * System prompt.
1307:    *
1308:    * A system prompt is a way of providing context and instructions to Claude, such
1309:    * as specifying a particular goal or role. See our
1310:    * [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).
1311:    */
1312:   system?: string | Array<TextBlockParam>;
1313: 
1314:   /**
1315:    * Amount of randomness injected into the response.
1316:    *
1317:    * Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0`
1318:    * for analytical / multiple choice, and closer to `1.0` for creative and
1319:    * generative tasks.
1320:    *
1321:    * Note that even with `temperature` of `0.0`, the results will not be fully
1322:    * deterministic.
1323:    */
1324:   temperature?: number;
1325: 
1326:   /**
1327:    * Configuration for enabling Claude's extended thinking.
1328:    *
1329:    * When enabled, responses include `thinking` content blocks showing Claude's
1330:    * thinking process before the final answer. Requires a minimum budget of 1,024
1331:    * tokens and counts towards your `max_tokens` limit.
1332:    *
1333:    * See
1334:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
1335:    * for details.
1336:    */
1337:   thinking?: ThinkingConfigParam;
1338: 
1339:   /**
1340:    * How the model should use the provided tools. The model can use a specific tool,
1341:    * any available tool, decide by itself, or not use tools at all.
1342:    */
1343:   tool_choice?: ToolChoice;
1344: 
1345:   /**
1346:    * Definitions of tools that the model may use.
1347:    *
1348:    * If you include `tools` in your API request, the model may return `tool_use`
1349:    * content blocks that represent the model's use of those tools. You can then run
1350:    * those tools using the tool input generated by the model and then optionally
1351:    * return results back to the model using `tool_result` content blocks.
1352:    *
1353:    * Each tool definition includes:
1354:    *
1355:    * - `name`: Name of the tool.
1356:    * - `description`: Optional, but strongly-recommended description of the tool.
1357:    * - `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the
1358:    *   tool `input` shape that the model will produce in `tool_use` output content
1359:    *   blocks.
1360:    *
1361:    * For example, if you defined `tools` as:
1362:    *
1363:    * ```json
1364:    * [
1365:    *   {
1366:    *     "name": "get_stock_price",
1367:    *     "description": "Get the current stock price for a given ticker symbol.",
1368:    *     "input_schema": {
1369:    *       "type": "object",
1370:    *       "properties": {
1371:    *         "ticker": {
1372:    *           "type": "string",
1373:    *           "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
1374:    *         }
1375:    *       },
1376:    *       "required": ["ticker"]
1377:    *     }
1378:    *   }
1379:    * ]
1380:    * ```
1381:    *
1382:    * And then asked the model "What's the S&P 500 at today?", the model might produce
1383:    * `tool_use` content blocks in the response like this:
1384:    *
1385:    * ```json
1386:    * [
1387:    *   {
1388:    *     "type": "tool_use",
1389:    *     "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1390:    *     "name": "get_stock_price",
1391:    *     "input": { "ticker": "^GSPC" }
1392:    *   }
1393:    * ]
1394:    * ```
1395:    *
1396:    * You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an
1397:    * input, and return the following back to the model in a subsequent `user`
1398:    * message:
1399:    *
1400:    * ```json
1401:    * [
1402:    *   {
1403:    *     "type": "tool_result",
1404:    *     "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1405:    *     "content": "259.75 USD"
1406:    *   }
1407:    * ]
1408:    * ```
1409:    *
1410:    * Tools can be used for workflows that include running client-side tools and
1411:    * functions, or more generally whenever you want the model to produce a particular
1412:    * JSON structure of output.
1413:    *
1414:    * See our [guide](https://docs.anthropic.com/en/docs/tool-use) for more details.
1415:    */
1416:   tools?: Array<ToolUnion>;
1417: 
1418:   /**
1419:    * Only sample from the top K options for each subsequent token.
1420:    *
1421:    * Used to remove "long tail" low probability responses.
1422:    * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
1423:    *
1424:    * Recommended for advanced use cases only. You usually only need to use
1425:    * `temperature`.
1426:    */
1427:   top_k?: number;
1428: 
1429:   /**
1430:    * Use nucleus sampling.
1431:    *
1432:    * In nucleus sampling, we compute the cumulative distribution over all the options
1433:    * for each subsequent token in decreasing probability order and cut it off once it
1434:    * reaches a particular probability specified by `top_p`. You should either alter
1435:    * `temperature` or `top_p`, but not both.
1436:    *
1437:    * Recommended for advanced use cases only. You usually only need to use
1438:    * `temperature`.
1439:    */
1440:   top_p?: number;
1441: }
1442: 
1443: export namespace MessageCreateParams {
1444:   export type MessageCreateParamsNonStreaming = MessagesAPI.MessageCreateParamsNonStreaming;
1445:   export type MessageCreateParamsStreaming = MessagesAPI.MessageCreateParamsStreaming;
1446: }
1447: 
1448: export interface MessageCreateParamsNonStreaming extends MessageCreateParamsBase {
1449:   /**
1450:    * Whether to incrementally stream the response using server-sent events.
1451:    *
1452:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1453:    * details.
1454:    */
1455:   stream?: false;
1456: }
1457: 
1458: export interface MessageCreateParamsStreaming extends MessageCreateParamsBase {
1459:   /**
1460:    * Whether to incrementally stream the response using server-sent events.
1461:    *
1462:    * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
1463:    * details.
1464:    */
1465:   stream: true;
1466: }
1467: 
1468: export type MessageStreamParams = MessageCreateParamsBase;
1469: 
1470: export interface MessageCountTokensParams {
1471:   /**
1472:    * Input messages.
1473:    *
1474:    * Our models are trained to operate on alternating `user` and `assistant`
1475:    * conversational turns. When creating a new `Message`, you specify the prior
1476:    * conversational turns with the `messages` parameter, and the model then generates
1477:    * the next `Message` in the conversation. Consecutive `user` or `assistant` turns
1478:    * in your request will be combined into a single turn.
1479:    *
1480:    * Each input message must be an object with a `role` and `content`. You can
1481:    * specify a single `user`-role message, or you can include multiple `user` and
1482:    * `assistant` messages.
1483:    *
1484:    * If the final message uses the `assistant` role, the response content will
1485:    * continue immediately from the content in that message. This can be used to
1486:    * constrain part of the model's response.
1487:    *
1488:    * Example with a single `user` message:
1489:    *
1490:    * ```json
1491:    * [{ "role": "user", "content": "Hello, Claude" }]
1492:    * ```
1493:    *
1494:    * Example with multiple conversational turns:
1495:    *
1496:    * ```json
1497:    * [
1498:    *   { "role": "user", "content": "Hello there." },
1499:    *   { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
1500:    *   { "role": "user", "content": "Can you explain LLMs in plain English?" }
1501:    * ]
1502:    * ```
1503:    *
1504:    * Example with a partially-filled response from Claude:
1505:    *
1506:    * ```json
1507:    * [
1508:    *   {
1509:    *     "role": "user",
1510:    *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
1511:    *   },
1512:    *   { "role": "assistant", "content": "The best answer is (" }
1513:    * ]
1514:    * ```
1515:    *
1516:    * Each input message `content` may be either a single `string` or an array of
1517:    * content blocks, where each block has a specific `type`. Using a `string` for
1518:    * `content` is shorthand for an array of one content block of type `"text"`. The
1519:    * following input messages are equivalent:
1520:    *
1521:    * ```json
1522:    * { "role": "user", "content": "Hello, Claude" }
1523:    * ```
1524:    *
1525:    * ```json
1526:    * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
1527:    * ```
1528:    *
1529:    * Starting with Claude 3 models, you can also send image content blocks:
1530:    *
1531:    * ```json
1532:    * {
1533:    *   "role": "user",
1534:    *   "content": [
1535:    *     {
1536:    *       "type": "image",
1537:    *       "source": {
1538:    *         "type": "base64",
1539:    *         "media_type": "image/jpeg",
1540:    *         "data": "/9j/4AAQSkZJRg..."
1541:    *       }
1542:    *     },
1543:    *     { "type": "text", "text": "What is in this image?" }
1544:    *   ]
1545:    * }
1546:    * ```
1547:    *
1548:    * We currently support the `base64` source type for images, and the `image/jpeg`,
1549:    * `image/png`, `image/gif`, and `image/webp` media types.
1550:    *
1551:    * See [examples](https://docs.anthropic.com/en/api/messages-examples#vision) for
1552:    * more input examples.
1553:    *
1554:    * Note that if you want to include a
1555:    * [system prompt](https://docs.anthropic.com/en/docs/system-prompts), you can use
1556:    * the top-level `system` parameter — there is no `"system"` role for input
1557:    * messages in the Messages API.
1558:    *
1559:    * There is a limit of 100000 messages in a single request.
1560:    */
1561:   messages: Array<MessageParam>;
1562: 
1563:   /**
1564:    * The model that will complete your prompt.\n\nSee
1565:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
1566:    * details and options.
1567:    */
1568:   model: Model;
1569: 
1570:   /**
1571:    * System prompt.
1572:    *
1573:    * A system prompt is a way of providing context and instructions to Claude, such
1574:    * as specifying a particular goal or role. See our
1575:    * [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).
1576:    */
1577:   system?: string | Array<TextBlockParam>;
1578: 
1579:   /**
1580:    * Configuration for enabling Claude's extended thinking.
1581:    *
1582:    * When enabled, responses include `thinking` content blocks showing Claude's
1583:    * thinking process before the final answer. Requires a minimum budget of 1,024
1584:    * tokens and counts towards your `max_tokens` limit.
1585:    *
1586:    * See
1587:    * [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
1588:    * for details.
1589:    */
1590:   thinking?: ThinkingConfigParam;
1591: 
1592:   /**
1593:    * How the model should use the provided tools. The model can use a specific tool,
1594:    * any available tool, decide by itself, or not use tools at all.
1595:    */
1596:   tool_choice?: ToolChoice;
1597: 
1598:   /**
1599:    * Definitions of tools that the model may use.
1600:    *
1601:    * If you include `tools` in your API request, the model may return `tool_use`
1602:    * content blocks that represent the model's use of those tools. You can then run
1603:    * those tools using the tool input generated by the model and then optionally
1604:    * return results back to the model using `tool_result` content blocks.
1605:    *
1606:    * Each tool definition includes:
1607:    *
1608:    * - `name`: Name of the tool.
1609:    * - `description`: Optional, but strongly-recommended description of the tool.
1610:    * - `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the
1611:    *   tool `input` shape that the model will produce in `tool_use` output content
1612:    *   blocks.
1613:    *
1614:    * For example, if you defined `tools` as:
1615:    *
1616:    * ```json
1617:    * [
1618:    *   {
1619:    *     "name": "get_stock_price",
1620:    *     "description": "Get the current stock price for a given ticker symbol.",
1621:    *     "input_schema": {
1622:    *       "type": "object",
1623:    *       "properties": {
1624:    *         "ticker": {
1625:    *           "type": "string",
1626:    *           "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
1627:    *         }
1628:    *       },
1629:    *       "required": ["ticker"]
1630:    *     }
1631:    *   }
1632:    * ]
1633:    * ```
1634:    *
1635:    * And then asked the model "What's the S&P 500 at today?", the model might produce
1636:    * `tool_use` content blocks in the response like this:
1637:    *
1638:    * ```json
1639:    * [
1640:    *   {
1641:    *     "type": "tool_use",
1642:    *     "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1643:    *     "name": "get_stock_price",
1644:    *     "input": { "ticker": "^GSPC" }
1645:    *   }
1646:    * ]
1647:    * ```
1648:    *
1649:    * You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an
1650:    * input, and return the following back to the model in a subsequent `user`
1651:    * message:
1652:    *
1653:    * ```json
1654:    * [
1655:    *   {
1656:    *     "type": "tool_result",
1657:    *     "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
1658:    *     "content": "259.75 USD"
1659:    *   }
1660:    * ]
1661:    * ```
1662:    *
1663:    * Tools can be used for workflows that include running client-side tools and
1664:    * functions, or more generally whenever you want the model to produce a particular
1665:    * JSON structure of output.
1666:    *
1667:    * See our [guide](https://docs.anthropic.com/en/docs/tool-use) for more details.
1668:    */
1669:   tools?: Array<MessageCountTokensTool>;
1670: }
1671: 
1672: Messages.Batches = Batches;
1673: 
1674: export declare namespace Messages {
1675:   export {
1676:     type Base64ImageSource as Base64ImageSource,
1677:     type Base64PDFSource as Base64PDFSource,
1678:     type CacheControlEphemeral as CacheControlEphemeral,
1679:     type CitationCharLocation as CitationCharLocation,
1680:     type CitationCharLocationParam as CitationCharLocationParam,
1681:     type CitationContentBlockLocation as CitationContentBlockLocation,
1682:     type CitationContentBlockLocationParam as CitationContentBlockLocationParam,
1683:     type CitationPageLocation as CitationPageLocation,
1684:     type CitationPageLocationParam as CitationPageLocationParam,
1685:     type CitationWebSearchResultLocationParam as CitationWebSearchResultLocationParam,
1686:     type CitationsConfigParam as CitationsConfigParam,
1687:     type CitationsDelta as CitationsDelta,
1688:     type CitationsWebSearchResultLocation as CitationsWebSearchResultLocation,
1689:     type ContentBlock as ContentBlock,
1690:     type ContentBlockParam as ContentBlockParam,
1691:     type ContentBlockStartEvent as ContentBlockStartEvent,
1692:     type ContentBlockStopEvent as ContentBlockStopEvent,
1693:     type ContentBlockSource as ContentBlockSource,
1694:     type ContentBlockSourceContent as ContentBlockSourceContent,
1695:     type DocumentBlockParam as DocumentBlockParam,
1696:     type ImageBlockParam as ImageBlockParam,
1697:     type InputJSONDelta as InputJSONDelta,
1698:     type Message as Message,
1699:     type MessageCountTokensTool as MessageCountTokensTool,
1700:     type MessageDeltaEvent as MessageDeltaEvent,
1701:     type MessageDeltaUsage as MessageDeltaUsage,
1702:     type MessageParam as MessageParam,
1703:     type MessageTokensCount as MessageTokensCount,
1704:     type Metadata as Metadata,
1705:     type Model as Model,
1706:     type PlainTextSource as PlainTextSource,
1707:     type RawContentBlockDelta as RawContentBlockDelta,
1708:     type RawContentBlockDeltaEvent as RawContentBlockDeltaEvent,
1709:     type RawContentBlockStartEvent as RawContentBlockStartEvent,
1710:     type RawContentBlockStopEvent as RawContentBlockStopEvent,
1711:     type RawMessageDeltaEvent as RawMessageDeltaEvent,
1712:     type RawMessageStartEvent as RawMessageStartEvent,
1713:     type RawMessageStopEvent as RawMessageStopEvent,
1714:     type RawMessageStreamEvent as RawMessageStreamEvent,
1715:     type RedactedThinkingBlock as RedactedThinkingBlock,
1716:     type RedactedThinkingBlockParam as RedactedThinkingBlockParam,
1717:     type ServerToolUsage as ServerToolUsage,
1718:     type ServerToolUseBlock as ServerToolUseBlock,
1719:     type ServerToolUseBlockParam as ServerToolUseBlockParam,
1720:     type SignatureDelta as SignatureDelta,
1721:     type StopReason as StopReason,
1722:     type TextBlock as TextBlock,
1723:     type TextBlockParam as TextBlockParam,
1724:     type TextCitation as TextCitation,
1725:     type TextCitationParam as TextCitationParam,
1726:     type TextDelta as TextDelta,
1727:     type ThinkingBlock as ThinkingBlock,
1728:     type ThinkingBlockParam as ThinkingBlockParam,
1729:     type ThinkingConfigDisabled as ThinkingConfigDisabled,
1730:     type ThinkingConfigEnabled as ThinkingConfigEnabled,
1731:     type ThinkingConfigParam as ThinkingConfigParam,
1732:     type ThinkingDelta as ThinkingDelta,
1733:     type Tool as Tool,
1734:     type ToolBash20250124 as ToolBash20250124,
1735:     type ToolChoice as ToolChoice,
1736:     type ToolChoiceAny as ToolChoiceAny,
1737:     type ToolChoiceAuto as ToolChoiceAuto,
1738:     type ToolChoiceNone as ToolChoiceNone,
1739:     type ToolChoiceTool as ToolChoiceTool,
1740:     type ToolResultBlockParam as ToolResultBlockParam,
1741:     type ToolTextEditor20250124 as ToolTextEditor20250124,
1742:     type ToolUnion as ToolUnion,
1743:     type ToolUseBlock as ToolUseBlock,
1744:     type ToolUseBlockParam as ToolUseBlockParam,
1745:     type URLImageSource as URLImageSource,
1746:     type URLPDFSource as URLPDFSource,
1747:     type Usage as Usage,
1748:     type WebSearchResultBlock as WebSearchResultBlock,
1749:     type WebSearchResultBlockParam as WebSearchResultBlockParam,
1750:     type WebSearchTool20250305 as WebSearchTool20250305,
1751:     type WebSearchToolRequestError as WebSearchToolRequestError,
1752:     type WebSearchToolResultBlock as WebSearchToolResultBlock,
1753:     type WebSearchToolResultBlockContent as WebSearchToolResultBlockContent,
1754:     type WebSearchToolResultBlockParam as WebSearchToolResultBlockParam,
1755:     type WebSearchToolResultBlockParamContent as WebSearchToolResultBlockParamContent,
1756:     type WebSearchToolResultError as WebSearchToolResultError,
1757:     type MessageStreamEvent as MessageStreamEvent,
1758:     type MessageStartEvent as MessageStartEvent,
1759:     type MessageStopEvent as MessageStopEvent,
1760:     type ContentBlockDeltaEvent as ContentBlockDeltaEvent,
1761:     type MessageCreateParams as MessageCreateParams,
1762:     type MessageCreateParamsNonStreaming as MessageCreateParamsNonStreaming,
1763:     type MessageCreateParamsStreaming as MessageCreateParamsStreaming,
1764:     type MessageStreamParams as MessageStreamParams,
1765:     type MessageCountTokensParams as MessageCountTokensParams,
1766:   };
1767: 
1768:   export {
1769:     Batches as Batches,
1770:     type DeletedMessageBatch as DeletedMessageBatch,
1771:     type MessageBatch as MessageBatch,
1772:     type MessageBatchCanceledResult as MessageBatchCanceledResult,
1773:     type MessageBatchErroredResult as MessageBatchErroredResult,
1774:     type MessageBatchExpiredResult as MessageBatchExpiredResult,
1775:     type MessageBatchIndividualResponse as MessageBatchIndividualResponse,
1776:     type MessageBatchRequestCounts as MessageBatchRequestCounts,
1777:     type MessageBatchResult as MessageBatchResult,
1778:     type MessageBatchSucceededResult as MessageBatchSucceededResult,
1779:     type MessageBatchesPage as MessageBatchesPage,
1780:     type BatchCreateParams as BatchCreateParams,
1781:     type BatchListParams as BatchListParams,
1782:   };
1783: }
````

## File: src/resources/beta.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export * from './beta/index';
````

## File: src/resources/completions.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../core/resource';
  4: import * as CompletionsAPI from './completions';
  5: import * as BetaAPI from './beta/beta';
  6: import * as MessagesAPI from './messages/messages';
  7: import { APIPromise } from '../core/api-promise';
  8: import { Stream } from '../core/streaming';
  9: import { buildHeaders } from '../internal/headers';
 10: import { RequestOptions } from '../internal/request-options';
 11: 
 12: export class Completions extends APIResource {
 13:   /**
 14:    * [Legacy] Create a Text Completion.
 15:    *
 16:    * The Text Completions API is a legacy API. We recommend using the
 17:    * [Messages API](https://docs.anthropic.com/en/api/messages) going forward.
 18:    *
 19:    * Future models and features will not be compatible with Text Completions. See our
 20:    * [migration guide](https://docs.anthropic.com/en/api/migrating-from-text-completions-to-messages)
 21:    * for guidance in migrating from Text Completions to Messages.
 22:    *
 23:    * @example
 24:    * ```ts
 25:    * const completion = await client.completions.create({
 26:    *   max_tokens_to_sample: 256,
 27:    *   model: 'claude-3-7-sonnet-latest',
 28:    *   prompt: '\n\nHuman: Hello, world!\n\nAssistant:',
 29:    * });
 30:    * ```
 31:    */
 32:   create(params: CompletionCreateParamsNonStreaming, options?: RequestOptions): APIPromise<Completion>;
 33:   create(params: CompletionCreateParamsStreaming, options?: RequestOptions): APIPromise<Stream<Completion>>;
 34:   create(
 35:     params: CompletionCreateParamsBase,
 36:     options?: RequestOptions,
 37:   ): APIPromise<Stream<Completion> | Completion>;
 38:   create(
 39:     params: CompletionCreateParams,
 40:     options?: RequestOptions,
 41:   ): APIPromise<Completion> | APIPromise<Stream<Completion>> {
 42:     const { betas, ...body } = params;
 43:     return this._client.post('/v1/complete', {
 44:       body,
 45:       timeout: (this._client as any)._options.timeout ?? 600000,
 46:       ...options,
 47:       headers: buildHeaders([
 48:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 49:         options?.headers,
 50:       ]),
 51:       stream: params.stream ?? false,
 52:     }) as APIPromise<Completion> | APIPromise<Stream<Completion>>;
 53:   }
 54: }
 55: 
 56: export interface Completion {
 57:   /**
 58:    * Unique object identifier.
 59:    *
 60:    * The format and length of IDs may change over time.
 61:    */
 62:   id: string;
 63: 
 64:   /**
 65:    * The resulting completion up to and excluding the stop sequences.
 66:    */
 67:   completion: string;
 68: 
 69:   /**
 70:    * The model that will complete your prompt.\n\nSee
 71:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
 72:    * details and options.
 73:    */
 74:   model: MessagesAPI.Model;
 75: 
 76:   /**
 77:    * The reason that we stopped.
 78:    *
 79:    * This may be one the following values:
 80:    *
 81:    * - `"stop_sequence"`: we reached a stop sequence — either provided by you via the
 82:    *   `stop_sequences` parameter, or a stop sequence built into the model
 83:    * - `"max_tokens"`: we exceeded `max_tokens_to_sample` or the model's maximum
 84:    */
 85:   stop_reason: string | null;
 86: 
 87:   /**
 88:    * Object type.
 89:    *
 90:    * For Text Completions, this is always `"completion"`.
 91:    */
 92:   type: 'completion';
 93: }
 94: 
 95: export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;
 96: 
 97: export interface CompletionCreateParamsBase {
 98:   /**
 99:    * Body param: The maximum number of tokens to generate before stopping.
100:    *
101:    * Note that our models may stop _before_ reaching this maximum. This parameter
102:    * only specifies the absolute maximum number of tokens to generate.
103:    */
104:   max_tokens_to_sample: number;
105: 
106:   /**
107:    * Body param: The model that will complete your prompt.\n\nSee
108:    * [models](https://docs.anthropic.com/en/docs/models-overview) for additional
109:    * details and options.
110:    */
111:   model: MessagesAPI.Model;
112: 
113:   /**
114:    * Body param: The prompt that you want Claude to complete.
115:    *
116:    * For proper response generation you will need to format your prompt using
117:    * alternating `\n\nHuman:` and `\n\nAssistant:` conversational turns. For example:
118:    *
119:    * ```
120:    * "\n\nHuman: {userQuestion}\n\nAssistant:"
121:    * ```
122:    *
123:    * See [prompt validation](https://docs.anthropic.com/en/api/prompt-validation) and
124:    * our guide to
125:    * [prompt design](https://docs.anthropic.com/en/docs/intro-to-prompting) for more
126:    * details.
127:    */
128:   prompt: string;
129: 
130:   /**
131:    * Body param: An object describing metadata about the request.
132:    */
133:   metadata?: MessagesAPI.Metadata;
134: 
135:   /**
136:    * Body param: Sequences that will cause the model to stop generating.
137:    *
138:    * Our models stop on `"\n\nHuman:"`, and may include additional built-in stop
139:    * sequences in the future. By providing the stop_sequences parameter, you may
140:    * include additional strings that will cause the model to stop generating.
141:    */
142:   stop_sequences?: Array<string>;
143: 
144:   /**
145:    * Body param: Whether to incrementally stream the response using server-sent
146:    * events.
147:    *
148:    * See [streaming](https://docs.anthropic.com/en/api/streaming) for details.
149:    */
150:   stream?: boolean;
151: 
152:   /**
153:    * Body param: Amount of randomness injected into the response.
154:    *
155:    * Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0`
156:    * for analytical / multiple choice, and closer to `1.0` for creative and
157:    * generative tasks.
158:    *
159:    * Note that even with `temperature` of `0.0`, the results will not be fully
160:    * deterministic.
161:    */
162:   temperature?: number;
163: 
164:   /**
165:    * Body param: Only sample from the top K options for each subsequent token.
166:    *
167:    * Used to remove "long tail" low probability responses.
168:    * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
169:    *
170:    * Recommended for advanced use cases only. You usually only need to use
171:    * `temperature`.
172:    */
173:   top_k?: number;
174: 
175:   /**
176:    * Body param: Use nucleus sampling.
177:    *
178:    * In nucleus sampling, we compute the cumulative distribution over all the options
179:    * for each subsequent token in decreasing probability order and cut it off once it
180:    * reaches a particular probability specified by `top_p`. You should either alter
181:    * `temperature` or `top_p`, but not both.
182:    *
183:    * Recommended for advanced use cases only. You usually only need to use
184:    * `temperature`.
185:    */
186:   top_p?: number;
187: 
188:   /**
189:    * Header param: Optional header to specify the beta version(s) you want to use.
190:    */
191:   betas?: Array<BetaAPI.AnthropicBeta>;
192: }
193: 
194: export namespace CompletionCreateParams {
195:   /**
196:    * @deprecated use `Anthropic.Messages.Metadata` instead
197:    */
198:   export type Metadata = MessagesAPI.Metadata;
199: 
200:   export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
201:   export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
202: }
203: 
204: export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
205:   /**
206:    * Body param: Whether to incrementally stream the response using server-sent
207:    * events.
208:    *
209:    * See [streaming](https://docs.anthropic.com/en/api/streaming) for details.
210:    */
211:   stream?: false;
212: }
213: 
214: export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
215:   /**
216:    * Body param: Whether to incrementally stream the response using server-sent
217:    * events.
218:    *
219:    * See [streaming](https://docs.anthropic.com/en/api/streaming) for details.
220:    */
221:   stream: true;
222: }
223: 
224: export declare namespace Completions {
225:   export {
226:     type Completion as Completion,
227:     type CompletionCreateParams as CompletionCreateParams,
228:     type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
229:     type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
230:   };
231: }
````

## File: src/resources/index.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: export * from './shared';
  4: export {
  5:   Beta,
  6:   type AnthropicBeta,
  7:   type BetaAPIError,
  8:   type BetaAuthenticationError,
  9:   type BetaBillingError,
 10:   type BetaError,
 11:   type BetaErrorResponse,
 12:   type BetaGatewayTimeoutError,
 13:   type BetaInvalidRequestError,
 14:   type BetaNotFoundError,
 15:   type BetaOverloadedError,
 16:   type BetaPermissionError,
 17:   type BetaRateLimitError,
 18: } from './beta/beta';
 19: export {
 20:   Completions,
 21:   type Completion,
 22:   type CompletionCreateParams,
 23:   type CompletionCreateParamsNonStreaming,
 24:   type CompletionCreateParamsStreaming,
 25: } from './completions';
 26: export {
 27:   Messages,
 28:   type Base64ImageSource,
 29:   type Base64PDFSource,
 30:   type CacheControlEphemeral,
 31:   type CitationCharLocation,
 32:   type CitationCharLocationParam,
 33:   type CitationContentBlockLocation,
 34:   type CitationContentBlockLocationParam,
 35:   type CitationPageLocation,
 36:   type CitationPageLocationParam,
 37:   type CitationWebSearchResultLocationParam,
 38:   type CitationsConfigParam,
 39:   type CitationsDelta,
 40:   type CitationsWebSearchResultLocation,
 41:   type ContentBlock,
 42:   type ContentBlockParam,
 43:   type ContentBlockStartEvent,
 44:   type ContentBlockStopEvent,
 45:   type ContentBlockSource,
 46:   type ContentBlockSourceContent,
 47:   type DocumentBlockParam,
 48:   type ImageBlockParam,
 49:   type InputJSONDelta,
 50:   type Message,
 51:   type MessageCountTokensTool,
 52:   type MessageDeltaEvent,
 53:   type MessageDeltaUsage,
 54:   type MessageParam,
 55:   type MessageStreamParams,
 56:   type MessageTokensCount,
 57:   type Metadata,
 58:   type Model,
 59:   type PlainTextSource,
 60:   type RawContentBlockDelta,
 61:   type RawContentBlockDeltaEvent,
 62:   type RawContentBlockStartEvent,
 63:   type RawContentBlockStopEvent,
 64:   type RawMessageDeltaEvent,
 65:   type RawMessageStartEvent,
 66:   type RawMessageStopEvent,
 67:   type RawMessageStreamEvent,
 68:   type RedactedThinkingBlock,
 69:   type RedactedThinkingBlockParam,
 70:   type ServerToolUsage,
 71:   type ServerToolUseBlock,
 72:   type ServerToolUseBlockParam,
 73:   type SignatureDelta,
 74:   type StopReason,
 75:   type TextBlock,
 76:   type TextBlockParam,
 77:   type TextCitation,
 78:   type TextCitationParam,
 79:   type TextDelta,
 80:   type ThinkingBlock,
 81:   type ThinkingBlockParam,
 82:   type ThinkingConfigDisabled,
 83:   type ThinkingConfigEnabled,
 84:   type ThinkingConfigParam,
 85:   type ThinkingDelta,
 86:   type Tool,
 87:   type ToolBash20250124,
 88:   type ToolChoice,
 89:   type ToolChoiceAny,
 90:   type ToolChoiceAuto,
 91:   type ToolChoiceNone,
 92:   type ToolChoiceTool,
 93:   type ToolResultBlockParam,
 94:   type ToolTextEditor20250124,
 95:   type ToolUnion,
 96:   type ToolUseBlock,
 97:   type ToolUseBlockParam,
 98:   type URLImageSource,
 99:   type URLPDFSource,
100:   type Usage,
101:   type WebSearchResultBlock,
102:   type WebSearchResultBlockParam,
103:   type WebSearchTool20250305,
104:   type WebSearchToolRequestError,
105:   type WebSearchToolResultBlock,
106:   type WebSearchToolResultBlockContent,
107:   type WebSearchToolResultBlockParam,
108:   type WebSearchToolResultBlockParamContent,
109:   type WebSearchToolResultError,
110:   type MessageCreateParams,
111:   type MessageCreateParamsNonStreaming,
112:   type MessageCreateParamsStreaming,
113:   type MessageCountTokensParams,
114: } from './messages/messages';
115: export {
116:   Models,
117:   type ModelInfo,
118:   type ModelRetrieveParams,
119:   type ModelListParams,
120:   type ModelInfosPage,
121: } from './models';
````

## File: src/resources/messages.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export * from './messages/index';
````

## File: src/resources/models.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIResource } from '../core/resource';
  4: import * as BetaAPI from './beta/beta';
  5: import { APIPromise } from '../core/api-promise';
  6: import { Page, type PageParams, PagePromise } from '../core/pagination';
  7: import { buildHeaders } from '../internal/headers';
  8: import { RequestOptions } from '../internal/request-options';
  9: import { path } from '../internal/utils/path';
 10: 
 11: export class Models extends APIResource {
 12:   /**
 13:    * Get a specific model.
 14:    *
 15:    * The Models API response can be used to determine information about a specific
 16:    * model or resolve a model alias to a model ID.
 17:    */
 18:   retrieve(
 19:     modelID: string,
 20:     params: ModelRetrieveParams | null | undefined = {},
 21:     options?: RequestOptions,
 22:   ): APIPromise<ModelInfo> {
 23:     const { betas } = params ?? {};
 24:     return this._client.get(path`/v1/models/${modelID}`, {
 25:       ...options,
 26:       headers: buildHeaders([
 27:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 28:         options?.headers,
 29:       ]),
 30:     });
 31:   }
 32: 
 33:   /**
 34:    * List available models.
 35:    *
 36:    * The Models API response can be used to determine which models are available for
 37:    * use in the API. More recently released models are listed first.
 38:    */
 39:   list(
 40:     params: ModelListParams | null | undefined = {},
 41:     options?: RequestOptions,
 42:   ): PagePromise<ModelInfosPage, ModelInfo> {
 43:     const { betas, ...query } = params ?? {};
 44:     return this._client.getAPIList('/v1/models', Page<ModelInfo>, {
 45:       query,
 46:       ...options,
 47:       headers: buildHeaders([
 48:         { ...(betas?.toString() != null ? { 'anthropic-beta': betas?.toString() } : undefined) },
 49:         options?.headers,
 50:       ]),
 51:     });
 52:   }
 53: }
 54: 
 55: export type ModelInfosPage = Page<ModelInfo>;
 56: 
 57: export interface ModelInfo {
 58:   /**
 59:    * Unique model identifier.
 60:    */
 61:   id: string;
 62: 
 63:   /**
 64:    * RFC 3339 datetime string representing the time at which the model was released.
 65:    * May be set to an epoch value if the release date is unknown.
 66:    */
 67:   created_at: string;
 68: 
 69:   /**
 70:    * A human-readable name for the model.
 71:    */
 72:   display_name: string;
 73: 
 74:   /**
 75:    * Object type.
 76:    *
 77:    * For Models, this is always `"model"`.
 78:    */
 79:   type: 'model';
 80: }
 81: 
 82: export interface ModelRetrieveParams {
 83:   /**
 84:    * Optional header to specify the beta version(s) you want to use.
 85:    */
 86:   betas?: Array<BetaAPI.AnthropicBeta>;
 87: }
 88: 
 89: export interface ModelListParams extends PageParams {
 90:   /**
 91:    * Header param: Optional header to specify the beta version(s) you want to use.
 92:    */
 93:   betas?: Array<BetaAPI.AnthropicBeta>;
 94: }
 95: 
 96: export declare namespace Models {
 97:   export {
 98:     type ModelInfo as ModelInfo,
 99:     type ModelInfosPage as ModelInfosPage,
100:     type ModelRetrieveParams as ModelRetrieveParams,
101:     type ModelListParams as ModelListParams,
102:   };
103: }
````

## File: src/resources/shared.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: export interface APIErrorObject {
 4:   message: string;
 5: 
 6:   type: 'api_error';
 7: }
 8: 
 9: export interface AuthenticationError {
10:   message: string;
11: 
12:   type: 'authentication_error';
13: }
14: 
15: export interface BillingError {
16:   message: string;
17: 
18:   type: 'billing_error';
19: }
20: 
21: export type ErrorObject =
22:   | InvalidRequestError
23:   | AuthenticationError
24:   | BillingError
25:   | PermissionError
26:   | NotFoundError
27:   | RateLimitError
28:   | GatewayTimeoutError
29:   | APIErrorObject
30:   | OverloadedError;
31: 
32: export interface ErrorResponse {
33:   error: ErrorObject;
34: 
35:   type: 'error';
36: }
37: 
38: export interface GatewayTimeoutError {
39:   message: string;
40: 
41:   type: 'timeout_error';
42: }
43: 
44: export interface InvalidRequestError {
45:   message: string;
46: 
47:   type: 'invalid_request_error';
48: }
49: 
50: export interface NotFoundError {
51:   message: string;
52: 
53:   type: 'not_found_error';
54: }
55: 
56: export interface OverloadedError {
57:   message: string;
58: 
59:   type: 'overloaded_error';
60: }
61: 
62: export interface PermissionError {
63:   message: string;
64: 
65:   type: 'permission_error';
66: }
67: 
68: export interface RateLimitError {
69:   message: string;
70: 
71:   type: 'rate_limit_error';
72: }
````

## File: src/resources/top-level.ts
````typescript
1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
2: 
3: export {};
````

## File: src/api-promise.ts
````typescript
1: /** @deprecated Import from ./core/api-promise instead */
2: export * from './core/api-promise';
````

## File: src/client.ts
````typescript
   1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
   2: 
   3: import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
   4: import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
   5: import { uuid4 } from './internal/utils/uuid';
   6: import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
   7: import { sleep } from './internal/utils/sleep';
   8: import { type Logger, type LogLevel, parseLogLevel } from './internal/utils/log';
   9: export type { Logger, LogLevel } from './internal/utils/log';
  10: import { castToError, isAbortError } from './internal/errors';
  11: import type { APIResponseProps } from './internal/parse';
  12: import { getPlatformHeaders } from './internal/detect-platform';
  13: import * as Shims from './internal/shims';
  14: import * as Opts from './internal/request-options';
  15: import { VERSION } from './version';
  16: import * as Errors from './core/error';
  17: import * as Pagination from './core/pagination';
  18: import { type PageParams, PageResponse } from './core/pagination';
  19: import * as Uploads from './core/uploads';
  20: import * as API from './resources/index';
  21: import { APIPromise } from './core/api-promise';
  22: import { type Fetch } from './internal/builtin-types';
  23: import { isRunningInBrowser } from './internal/detect-platform';
  24: import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
  25: import { FinalRequestOptions, RequestOptions } from './internal/request-options';
  26: import {
  27:   Completion,
  28:   CompletionCreateParams,
  29:   CompletionCreateParamsNonStreaming,
  30:   CompletionCreateParamsStreaming,
  31:   Completions,
  32: } from './resources/completions';
  33: import { ModelInfo, ModelInfosPage, ModelListParams, ModelRetrieveParams, Models } from './resources/models';
  34: import { readEnv } from './internal/utils/env';
  35: import { formatRequestDetails, loggerFor } from './internal/utils/log';
  36: import { isEmptyObj } from './internal/utils/values';
  37: import {
  38:   AnthropicBeta,
  39:   Beta,
  40:   BetaAPIError,
  41:   BetaAuthenticationError,
  42:   BetaBillingError,
  43:   BetaError,
  44:   BetaErrorResponse,
  45:   BetaGatewayTimeoutError,
  46:   BetaInvalidRequestError,
  47:   BetaNotFoundError,
  48:   BetaOverloadedError,
  49:   BetaPermissionError,
  50:   BetaRateLimitError,
  51: } from './resources/beta/beta';
  52: import {
  53:   Base64ImageSource,
  54:   Base64PDFSource,
  55:   CacheControlEphemeral,
  56:   CitationCharLocation,
  57:   CitationCharLocationParam,
  58:   CitationContentBlockLocation,
  59:   CitationContentBlockLocationParam,
  60:   CitationPageLocation,
  61:   CitationPageLocationParam,
  62:   CitationWebSearchResultLocationParam,
  63:   CitationsConfigParam,
  64:   CitationsDelta,
  65:   CitationsWebSearchResultLocation,
  66:   ContentBlock,
  67:   ContentBlockDeltaEvent,
  68:   ContentBlockParam,
  69:   ContentBlockStartEvent,
  70:   ContentBlockStopEvent,
  71:   ContentBlockSource,
  72:   ContentBlockSourceContent,
  73:   DocumentBlockParam,
  74:   ImageBlockParam,
  75:   InputJSONDelta,
  76:   Message,
  77:   MessageStreamParams,
  78:   MessageCountTokensParams,
  79:   MessageCountTokensTool,
  80:   MessageCreateParams,
  81:   MessageCreateParamsNonStreaming,
  82:   MessageCreateParamsStreaming,
  83:   MessageDeltaEvent,
  84:   MessageDeltaUsage,
  85:   MessageParam,
  86:   MessageStartEvent,
  87:   MessageStopEvent,
  88:   MessageStreamEvent,
  89:   MessageTokensCount,
  90:   Messages,
  91:   Metadata,
  92:   Model,
  93:   PlainTextSource,
  94:   RawContentBlockDelta,
  95:   RawContentBlockDeltaEvent,
  96:   RawContentBlockStartEvent,
  97:   RawContentBlockStopEvent,
  98:   RawMessageDeltaEvent,
  99:   RawMessageStartEvent,
 100:   RawMessageStopEvent,
 101:   RawMessageStreamEvent,
 102:   RedactedThinkingBlock,
 103:   RedactedThinkingBlockParam,
 104:   ServerToolUsage,
 105:   ServerToolUseBlock,
 106:   ServerToolUseBlockParam,
 107:   SignatureDelta,
 108:   StopReason,
 109:   TextBlock,
 110:   TextBlockParam,
 111:   TextCitation,
 112:   TextCitationParam,
 113:   TextDelta,
 114:   ThinkingBlock,
 115:   ThinkingBlockParam,
 116:   ThinkingConfigDisabled,
 117:   ThinkingConfigEnabled,
 118:   ThinkingConfigParam,
 119:   ThinkingDelta,
 120:   Tool,
 121:   ToolBash20250124,
 122:   ToolChoice,
 123:   ToolChoiceAny,
 124:   ToolChoiceAuto,
 125:   ToolChoiceNone,
 126:   ToolChoiceTool,
 127:   ToolResultBlockParam,
 128:   ToolTextEditor20250124,
 129:   ToolUnion,
 130:   ToolUseBlock,
 131:   ToolUseBlockParam,
 132:   URLImageSource,
 133:   URLPDFSource,
 134:   Usage,
 135:   WebSearchResultBlock,
 136:   WebSearchResultBlockParam,
 137:   WebSearchTool20250305,
 138:   WebSearchToolRequestError,
 139:   WebSearchToolResultBlock,
 140:   WebSearchToolResultBlockContent,
 141:   WebSearchToolResultBlockParam,
 142:   WebSearchToolResultBlockParamContent,
 143:   WebSearchToolResultError,
 144: } from './resources/messages/messages';
 145: 
 146: export interface ClientOptions {
 147:   /**
 148:    * Defaults to process.env['ANTHROPIC_API_KEY'].
 149:    */
 150:   apiKey?: string | null | undefined;
 151: 
 152:   /**
 153:    * Defaults to process.env['ANTHROPIC_AUTH_TOKEN'].
 154:    */
 155:   authToken?: string | null | undefined;
 156: 
 157:   /**
 158:    * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
 159:    *
 160:    * Defaults to process.env['ANTHROPIC_BASE_URL'].
 161:    */
 162:   baseURL?: string | null | undefined;
 163: 
 164:   /**
 165:    * The maximum amount of time (in milliseconds) that the client should wait for a response
 166:    * from the server before timing out a single request.
 167:    *
 168:    * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
 169:    * much longer than this timeout before the promise succeeds or fails.
 170:    */
 171:   timeout?: number | undefined;
 172:   /**
 173:    * Additional `RequestInit` options to be passed to `fetch` calls.
 174:    * Properties will be overridden by per-request `fetchOptions`.
 175:    */
 176:   fetchOptions?: MergedRequestInit | undefined;
 177: 
 178:   /**
 179:    * Specify a custom `fetch` function implementation.
 180:    *
 181:    * If not provided, we expect that `fetch` is defined globally.
 182:    */
 183:   fetch?: Fetch | undefined;
 184: 
 185:   /**
 186:    * The maximum number of times that the client will retry a request in case of a
 187:    * temporary failure, like a network error or a 5XX error from the server.
 188:    *
 189:    * @default 2
 190:    */
 191:   maxRetries?: number | undefined;
 192: 
 193:   /**
 194:    * Default headers to include with every request to the API.
 195:    *
 196:    * These can be removed in individual requests by explicitly setting the
 197:    * header to `null` in request options.
 198:    */
 199:   defaultHeaders?: HeadersLike | undefined;
 200: 
 201:   /**
 202:    * Default query parameters to include with every request to the API.
 203:    *
 204:    * These can be removed in individual requests by explicitly setting the
 205:    * param to `undefined` in request options.
 206:    */
 207:   defaultQuery?: Record<string, string | undefined> | undefined;
 208: 
 209:   /**
 210:    * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
 211:    * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
 212:    */
 213:   dangerouslyAllowBrowser?: boolean | undefined;
 214: 
 215:   /**
 216:    * Set the log level.
 217:    *
 218:    * Defaults to process.env['ANTHROPIC_LOG'] or 'warn' if it isn't set.
 219:    */
 220:   logLevel?: LogLevel | undefined;
 221: 
 222:   /**
 223:    * Set the logger.
 224:    *
 225:    * Defaults to globalThis.console.
 226:    */
 227:   logger?: Logger | undefined;
 228: }
 229: 
 230: export class BaseAnthropic {
 231:   apiKey: string | null;
 232:   authToken: string | null;
 233: 
 234:   baseURL: string;
 235:   maxRetries: number;
 236:   timeout: number;
 237:   logger: Logger | undefined;
 238:   logLevel: LogLevel | undefined;
 239:   fetchOptions: MergedRequestInit | undefined;
 240: 
 241:   private fetch: Fetch;
 242:   #encoder: Opts.RequestEncoder;
 243:   protected idempotencyHeader?: string;
 244:   private _options: ClientOptions;
 245: 
 246:   /**
 247:    * API Client for interfacing with the Anthropic API.
 248:    *
 249:    * @param {string | null | undefined} [opts.apiKey=process.env['ANTHROPIC_API_KEY'] ?? null]
 250:    * @param {string | null | undefined} [opts.authToken=process.env['ANTHROPIC_AUTH_TOKEN'] ?? null]
 251:    * @param {string} [opts.baseURL=process.env['ANTHROPIC_BASE_URL'] ?? https://api.anthropic.com] - Override the default base URL for the API.
 252:    * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
 253:    * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
 254:    * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
 255:    * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
 256:    * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
 257:    * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
 258:    * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
 259:    */
 260:   constructor({
 261:     baseURL = readEnv('ANTHROPIC_BASE_URL'),
 262:     apiKey = readEnv('ANTHROPIC_API_KEY') ?? null,
 263:     authToken = readEnv('ANTHROPIC_AUTH_TOKEN') ?? null,
 264:     ...opts
 265:   }: ClientOptions = {}) {
 266:     const options: ClientOptions = {
 267:       apiKey,
 268:       authToken,
 269:       ...opts,
 270:       baseURL: baseURL || `https://api.anthropic.com`,
 271:     };
 272: 
 273:     if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
 274:       throw new Errors.AnthropicError(
 275:         "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Anthropic({ apiKey, dangerouslyAllowBrowser: true });\n",
 276:       );
 277:     }
 278: 
 279:     this.baseURL = options.baseURL!;
 280:     this.timeout = options.timeout ?? Anthropic.DEFAULT_TIMEOUT /* 10 minutes */;
 281:     this.logger = options.logger ?? console;
 282:     const defaultLogLevel = 'warn';
 283:     // Set default logLevel early so that we can log a warning in parseLogLevel.
 284:     this.logLevel = defaultLogLevel;
 285:     this.logLevel =
 286:       parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
 287:       parseLogLevel(readEnv('ANTHROPIC_LOG'), "process.env['ANTHROPIC_LOG']", this) ??
 288:       defaultLogLevel;
 289:     this.fetchOptions = options.fetchOptions;
 290:     this.maxRetries = options.maxRetries ?? 2;
 291:     this.fetch = options.fetch ?? Shims.getDefaultFetch();
 292:     this.#encoder = Opts.FallbackEncoder;
 293: 
 294:     this._options = options;
 295: 
 296:     this.apiKey = apiKey;
 297:     this.authToken = authToken;
 298:   }
 299: 
 300:   /**
 301:    * Create a new client instance re-using the same options given to the current client with optional overriding.
 302:    */
 303:   withOptions(options: Partial<ClientOptions>): this {
 304:     return new (this.constructor as any as new (props: ClientOptions) => typeof this)({
 305:       ...this._options,
 306:       baseURL: this.baseURL,
 307:       maxRetries: this.maxRetries,
 308:       timeout: this.timeout,
 309:       logger: this.logger,
 310:       logLevel: this.logLevel,
 311:       fetchOptions: this.fetchOptions,
 312:       apiKey: this.apiKey,
 313:       authToken: this.authToken,
 314:       ...options,
 315:     });
 316:   }
 317: 
 318:   protected defaultQuery(): Record<string, string | undefined> | undefined {
 319:     return this._options.defaultQuery;
 320:   }
 321: 
 322:   protected validateHeaders({ values, nulls }: NullableHeaders) {
 323:     if (this.apiKey && values.get('x-api-key')) {
 324:       return;
 325:     }
 326:     if (nulls.has('x-api-key')) {
 327:       return;
 328:     }
 329: 
 330:     if (this.authToken && values.get('authorization')) {
 331:       return;
 332:     }
 333:     if (nulls.has('authorization')) {
 334:       return;
 335:     }
 336: 
 337:     throw new Error(
 338:       'Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted',
 339:     );
 340:   }
 341: 
 342:   protected authHeaders(opts: FinalRequestOptions): NullableHeaders | undefined {
 343:     return buildHeaders([this.apiKeyAuth(opts), this.bearerAuth(opts)]);
 344:   }
 345: 
 346:   protected apiKeyAuth(opts: FinalRequestOptions): NullableHeaders | undefined {
 347:     if (this.apiKey == null) {
 348:       return undefined;
 349:     }
 350:     return buildHeaders([{ 'X-Api-Key': this.apiKey }]);
 351:   }
 352: 
 353:   protected bearerAuth(opts: FinalRequestOptions): NullableHeaders | undefined {
 354:     if (this.authToken == null) {
 355:       return undefined;
 356:     }
 357:     return buildHeaders([{ Authorization: `Bearer ${this.authToken}` }]);
 358:   }
 359: 
 360:   /**
 361:    * Basic re-implementation of `qs.stringify` for primitive types.
 362:    */
 363:   protected stringifyQuery(query: Record<string, unknown>): string {
 364:     return Object.entries(query)
 365:       .filter(([_, value]) => typeof value !== 'undefined')
 366:       .map(([key, value]) => {
 367:         if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
 368:           return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
 369:         }
 370:         if (value === null) {
 371:           return `${encodeURIComponent(key)}=`;
 372:         }
 373:         throw new Errors.AnthropicError(
 374:           `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
 375:         );
 376:       })
 377:       .join('&');
 378:   }
 379: 
 380:   private getUserAgent(): string {
 381:     return `${this.constructor.name}/JS ${VERSION}`;
 382:   }
 383: 
 384:   protected defaultIdempotencyKey(): string {
 385:     return `stainless-node-retry-${uuid4()}`;
 386:   }
 387: 
 388:   protected makeStatusError(
 389:     status: number,
 390:     error: Object,
 391:     message: string | undefined,
 392:     headers: Headers,
 393:   ): Errors.APIError {
 394:     return Errors.APIError.generate(status, error, message, headers);
 395:   }
 396: 
 397:   buildURL(path: string, query: Record<string, unknown> | null | undefined): string {
 398:     const url =
 399:       isAbsoluteURL(path) ?
 400:         new URL(path)
 401:       : new URL(this.baseURL + (this.baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
 402: 
 403:     const defaultQuery = this.defaultQuery();
 404:     if (!isEmptyObj(defaultQuery)) {
 405:       query = { ...defaultQuery, ...query };
 406:     }
 407: 
 408:     if (typeof query === 'object' && query && !Array.isArray(query)) {
 409:       url.search = this.stringifyQuery(query as Record<string, unknown>);
 410:     }
 411: 
 412:     return url.toString();
 413:   }
 414: 
 415:   _calculateNonstreamingTimeout(maxTokens: number): number {
 416:     const defaultTimeout = 10 * 60;
 417:     const expectedTimeout = (60 * 60 * maxTokens) / 128_000;
 418:     if (expectedTimeout > defaultTimeout) {
 419:       throw new Errors.AnthropicError(
 420:         'Streaming is strongly recommended for operations that may take longer than 10 minutes. ' +
 421:           'See https://github.com/anthropics/anthropic-sdk-python#streaming-responses for more details',
 422:       );
 423:     }
 424:     return defaultTimeout * 1000;
 425:   }
 426: 
 427:   /**
 428:    * Used as a callback for mutating the given `FinalRequestOptions` object.
 429:    */
 430:   protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}
 431: 
 432:   /**
 433:    * Used as a callback for mutating the given `RequestInit` object.
 434:    *
 435:    * This is useful for cases where you want to add certain headers based off of
 436:    * the request properties, e.g. `method` or `url`.
 437:    */
 438:   protected async prepareRequest(
 439:     request: RequestInit,
 440:     { url, options }: { url: string; options: FinalRequestOptions },
 441:   ): Promise<void> {}
 442: 
 443:   get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
 444:     return this.methodRequest('get', path, opts);
 445:   }
 446: 
 447:   post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
 448:     return this.methodRequest('post', path, opts);
 449:   }
 450: 
 451:   patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
 452:     return this.methodRequest('patch', path, opts);
 453:   }
 454: 
 455:   put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
 456:     return this.methodRequest('put', path, opts);
 457:   }
 458: 
 459:   delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
 460:     return this.methodRequest('delete', path, opts);
 461:   }
 462: 
 463:   private methodRequest<Rsp>(
 464:     method: HTTPMethod,
 465:     path: string,
 466:     opts?: PromiseOrValue<RequestOptions>,
 467:   ): APIPromise<Rsp> {
 468:     return this.request(
 469:       Promise.resolve(opts).then((opts) => {
 470:         return { method, path, ...opts };
 471:       }),
 472:     );
 473:   }
 474: 
 475:   request<Rsp>(
 476:     options: PromiseOrValue<FinalRequestOptions>,
 477:     remainingRetries: number | null = null,
 478:   ): APIPromise<Rsp> {
 479:     return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
 480:   }
 481: 
 482:   private async makeRequest(
 483:     optionsInput: PromiseOrValue<FinalRequestOptions>,
 484:     retriesRemaining: number | null,
 485:     retryOfRequestLogID: string | undefined,
 486:   ): Promise<APIResponseProps> {
 487:     const options = await optionsInput;
 488:     const maxRetries = options.maxRetries ?? this.maxRetries;
 489:     if (retriesRemaining == null) {
 490:       retriesRemaining = maxRetries;
 491:     }
 492: 
 493:     await this.prepareOptions(options);
 494: 
 495:     const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });
 496: 
 497:     await this.prepareRequest(req, { url, options });
 498: 
 499:     /** Not an API request ID, just for correlating local log entries. */
 500:     const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
 501:     const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
 502:     const startTime = Date.now();
 503: 
 504:     loggerFor(this).debug(
 505:       `[${requestLogID}] sending request`,
 506:       formatRequestDetails({
 507:         retryOfRequestLogID,
 508:         method: options.method,
 509:         url,
 510:         options,
 511:         headers: req.headers,
 512:       }),
 513:     );
 514: 
 515:     if (options.signal?.aborted) {
 516:       throw new Errors.APIUserAbortError();
 517:     }
 518: 
 519:     const controller = new AbortController();
 520:     const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
 521:     const headersTime = Date.now();
 522: 
 523:     if (response instanceof Error) {
 524:       const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
 525:       if (options.signal?.aborted) {
 526:         throw new Errors.APIUserAbortError();
 527:       }
 528:       // detect native connection timeout errors
 529:       // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
 530:       // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
 531:       // others do not provide enough information to distinguish timeouts from other connection errors
 532:       const isTimeout =
 533:         isAbortError(response) ||
 534:         /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
 535:       if (retriesRemaining) {
 536:         loggerFor(this).info(
 537:           `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
 538:         );
 539:         loggerFor(this).debug(
 540:           `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
 541:           formatRequestDetails({
 542:             retryOfRequestLogID,
 543:             url,
 544:             durationMs: headersTime - startTime,
 545:             message: response.message,
 546:           }),
 547:         );
 548:         return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
 549:       }
 550:       loggerFor(this).info(
 551:         `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
 552:       );
 553:       loggerFor(this).debug(
 554:         `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
 555:         formatRequestDetails({
 556:           retryOfRequestLogID,
 557:           url,
 558:           durationMs: headersTime - startTime,
 559:           message: response.message,
 560:         }),
 561:       );
 562:       if (isTimeout) {
 563:         throw new Errors.APIConnectionTimeoutError();
 564:       }
 565:       throw new Errors.APIConnectionError({ cause: response });
 566:     }
 567: 
 568:     const specialHeaders = [...response.headers.entries()]
 569:       .filter(([name]) => name === 'request-id')
 570:       .map(([name, value]) => ', ' + name + ': ' + JSON.stringify(value))
 571:       .join('');
 572:     const responseInfo = `[${requestLogID}${retryLogStr}${specialHeaders}] ${req.method} ${url} ${
 573:       response.ok ? 'succeeded' : 'failed'
 574:     } with status ${response.status} in ${headersTime - startTime}ms`;
 575: 
 576:     if (!response.ok) {
 577:       const shouldRetry = this.shouldRetry(response);
 578:       if (retriesRemaining && shouldRetry) {
 579:         const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
 580: 
 581:         // We don't need the body of this response.
 582:         await Shims.CancelReadableStream(response.body);
 583:         loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
 584:         loggerFor(this).debug(
 585:           `[${requestLogID}] response error (${retryMessage})`,
 586:           formatRequestDetails({
 587:             retryOfRequestLogID,
 588:             url: response.url,
 589:             status: response.status,
 590:             headers: response.headers,
 591:             durationMs: headersTime - startTime,
 592:           }),
 593:         );
 594:         return this.retryRequest(
 595:           options,
 596:           retriesRemaining,
 597:           retryOfRequestLogID ?? requestLogID,
 598:           response.headers,
 599:         );
 600:       }
 601: 
 602:       const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;
 603: 
 604:       loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
 605: 
 606:       const errText = await response.text().catch((err: any) => castToError(err).message);
 607:       const errJSON = safeJSON(errText);
 608:       const errMessage = errJSON ? undefined : errText;
 609: 
 610:       loggerFor(this).debug(
 611:         `[${requestLogID}] response error (${retryMessage})`,
 612:         formatRequestDetails({
 613:           retryOfRequestLogID,
 614:           url: response.url,
 615:           status: response.status,
 616:           headers: response.headers,
 617:           message: errMessage,
 618:           durationMs: Date.now() - startTime,
 619:         }),
 620:       );
 621: 
 622:       const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
 623:       throw err;
 624:     }
 625: 
 626:     loggerFor(this).info(responseInfo);
 627:     loggerFor(this).debug(
 628:       `[${requestLogID}] response start`,
 629:       formatRequestDetails({
 630:         retryOfRequestLogID,
 631:         url: response.url,
 632:         status: response.status,
 633:         headers: response.headers,
 634:         durationMs: headersTime - startTime,
 635:       }),
 636:     );
 637: 
 638:     return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
 639:   }
 640: 
 641:   getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
 642:     path: string,
 643:     Page: new (...args: any[]) => PageClass,
 644:     opts?: RequestOptions,
 645:   ): Pagination.PagePromise<PageClass, Item> {
 646:     return this.requestAPIList(Page, { method: 'get', path, ...opts });
 647:   }
 648: 
 649:   requestAPIList<
 650:     Item = unknown,
 651:     PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
 652:   >(
 653:     Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
 654:     options: FinalRequestOptions,
 655:   ): Pagination.PagePromise<PageClass, Item> {
 656:     const request = this.makeRequest(options, null, undefined);
 657:     return new Pagination.PagePromise<PageClass, Item>(this as any as Anthropic, request, Page);
 658:   }
 659: 
 660:   async fetchWithTimeout(
 661:     url: RequestInfo,
 662:     init: RequestInit | undefined,
 663:     ms: number,
 664:     controller: AbortController,
 665:   ): Promise<Response> {
 666:     const { signal, method, ...options } = init || {};
 667:     if (signal) signal.addEventListener('abort', () => controller.abort());
 668: 
 669:     const timeout = setTimeout(() => controller.abort(), ms);
 670: 
 671:     const isReadableBody =
 672:       ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
 673:       (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);
 674: 
 675:     const fetchOptions: RequestInit = {
 676:       signal: controller.signal as any,
 677:       ...(isReadableBody ? { duplex: 'half' } : {}),
 678:       method: 'GET',
 679:       ...options,
 680:     };
 681:     if (method) {
 682:       // Custom methods like 'patch' need to be uppercased
 683:       // See https://github.com/nodejs/undici/issues/2294
 684:       fetchOptions.method = method.toUpperCase();
 685:     }
 686: 
 687:     try {
 688:       // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
 689:       return await this.fetch.call(undefined, url, fetchOptions);
 690:     } finally {
 691:       clearTimeout(timeout);
 692:     }
 693:   }
 694: 
 695:   private shouldRetry(response: Response): boolean {
 696:     // Note this is not a standard header.
 697:     const shouldRetryHeader = response.headers.get('x-should-retry');
 698: 
 699:     // If the server explicitly says whether or not to retry, obey.
 700:     if (shouldRetryHeader === 'true') return true;
 701:     if (shouldRetryHeader === 'false') return false;
 702: 
 703:     // Retry on request timeouts.
 704:     if (response.status === 408) return true;
 705: 
 706:     // Retry on lock timeouts.
 707:     if (response.status === 409) return true;
 708: 
 709:     // Retry on rate limits.
 710:     if (response.status === 429) return true;
 711: 
 712:     // Retry internal errors.
 713:     if (response.status >= 500) return true;
 714: 
 715:     return false;
 716:   }
 717: 
 718:   private async retryRequest(
 719:     options: FinalRequestOptions,
 720:     retriesRemaining: number,
 721:     requestLogID: string,
 722:     responseHeaders?: Headers | undefined,
 723:   ): Promise<APIResponseProps> {
 724:     let timeoutMillis: number | undefined;
 725: 
 726:     // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
 727:     const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
 728:     if (retryAfterMillisHeader) {
 729:       const timeoutMs = parseFloat(retryAfterMillisHeader);
 730:       if (!Number.isNaN(timeoutMs)) {
 731:         timeoutMillis = timeoutMs;
 732:       }
 733:     }
 734: 
 735:     // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
 736:     const retryAfterHeader = responseHeaders?.get('retry-after');
 737:     if (retryAfterHeader && !timeoutMillis) {
 738:       const timeoutSeconds = parseFloat(retryAfterHeader);
 739:       if (!Number.isNaN(timeoutSeconds)) {
 740:         timeoutMillis = timeoutSeconds * 1000;
 741:       } else {
 742:         timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
 743:       }
 744:     }
 745: 
 746:     // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
 747:     // just do what it says, but otherwise calculate a default
 748:     if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
 749:       const maxRetries = options.maxRetries ?? this.maxRetries;
 750:       timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
 751:     }
 752:     await sleep(timeoutMillis);
 753: 
 754:     return this.makeRequest(options, retriesRemaining - 1, requestLogID);
 755:   }
 756: 
 757:   private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
 758:     const initialRetryDelay = 0.5;
 759:     const maxRetryDelay = 8.0;
 760: 
 761:     const numRetries = maxRetries - retriesRemaining;
 762: 
 763:     // Apply exponential backoff, but not more than the max.
 764:     const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
 765: 
 766:     // Apply some jitter, take up to at most 25 percent of the retry time.
 767:     const jitter = 1 - Math.random() * 0.25;
 768: 
 769:     return sleepSeconds * jitter * 1000;
 770:   }
 771: 
 772:   public calculateNonstreamingTimeout(maxTokens: number, maxNonstreamingTokens?: number): number {
 773:     const maxTime = 60 * 60 * 1000; // 10 minutes
 774:     const defaultTime = 60 * 10 * 1000; // 10 minutes
 775: 
 776:     const expectedTime = (maxTime * maxTokens) / 128000;
 777:     if (expectedTime > defaultTime || (maxNonstreamingTokens != null && maxTokens > maxNonstreamingTokens)) {
 778:       throw new Errors.AnthropicError(
 779:         'Streaming is strongly recommended for operations that may token longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details',
 780:       );
 781:     }
 782: 
 783:     return defaultTime;
 784:   }
 785: 
 786:   buildRequest(
 787:     inputOptions: FinalRequestOptions,
 788:     { retryCount = 0 }: { retryCount?: number } = {},
 789:   ): { req: FinalizedRequestInit; url: string; timeout: number } {
 790:     const options = { ...inputOptions };
 791:     const { method, path, query } = options;
 792: 
 793:     const url = this.buildURL(path!, query as Record<string, unknown>);
 794:     if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
 795:     options.timeout = options.timeout ?? this.timeout;
 796:     const { bodyHeaders, body } = this.buildBody({ options });
 797:     const reqHeaders = this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });
 798: 
 799:     const req: FinalizedRequestInit = {
 800:       method,
 801:       headers: reqHeaders,
 802:       ...(options.signal && { signal: options.signal }),
 803:       ...((globalThis as any).ReadableStream &&
 804:         body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
 805:       ...(body && { body }),
 806:       ...((this.fetchOptions as any) ?? {}),
 807:       ...((options.fetchOptions as any) ?? {}),
 808:     };
 809: 
 810:     return { req, url, timeout: options.timeout };
 811:   }
 812: 
 813:   private buildHeaders({
 814:     options,
 815:     method,
 816:     bodyHeaders,
 817:     retryCount,
 818:   }: {
 819:     options: FinalRequestOptions;
 820:     method: HTTPMethod;
 821:     bodyHeaders: HeadersLike;
 822:     retryCount: number;
 823:   }): Headers {
 824:     let idempotencyHeaders: HeadersLike = {};
 825:     if (this.idempotencyHeader && method !== 'get') {
 826:       if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
 827:       idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
 828:     }
 829: 
 830:     const headers = buildHeaders([
 831:       idempotencyHeaders,
 832:       {
 833:         Accept: 'application/json',
 834:         'User-Agent': this.getUserAgent(),
 835:         'X-Stainless-Retry-Count': String(retryCount),
 836:         ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
 837:         ...getPlatformHeaders(),
 838:         ...(this._options.dangerouslyAllowBrowser ?
 839:           { 'anthropic-dangerous-direct-browser-access': 'true' }
 840:         : undefined),
 841:         'anthropic-version': '2023-06-01',
 842:       },
 843:       this.authHeaders(options),
 844:       this._options.defaultHeaders,
 845:       bodyHeaders,
 846:       options.headers,
 847:     ]);
 848: 
 849:     this.validateHeaders(headers);
 850: 
 851:     return headers.values;
 852:   }
 853: 
 854:   private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
 855:     bodyHeaders: HeadersLike;
 856:     body: BodyInit | undefined;
 857:   } {
 858:     if (!body) {
 859:       return { bodyHeaders: undefined, body: undefined };
 860:     }
 861:     const headers = buildHeaders([rawHeaders]);
 862:     if (
 863:       // Pass raw type verbatim
 864:       ArrayBuffer.isView(body) ||
 865:       body instanceof ArrayBuffer ||
 866:       body instanceof DataView ||
 867:       (typeof body === 'string' &&
 868:         // Preserve legacy string encoding behavior for now
 869:         headers.values.has('content-type')) ||
 870:       // `Blob` is superset of `File`
 871:       body instanceof Blob ||
 872:       // `FormData` -> `multipart/form-data`
 873:       body instanceof FormData ||
 874:       // `URLSearchParams` -> `application/x-www-form-urlencoded`
 875:       body instanceof URLSearchParams ||
 876:       // Send chunked stream (each chunk has own `length`)
 877:       ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
 878:     ) {
 879:       return { bodyHeaders: undefined, body: body as BodyInit };
 880:     } else if (
 881:       typeof body === 'object' &&
 882:       (Symbol.asyncIterator in body ||
 883:         (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
 884:     ) {
 885:       return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
 886:     } else {
 887:       return this.#encoder({ body, headers });
 888:     }
 889:   }
 890: 
 891:   static Anthropic = this;
 892:   static HUMAN_PROMPT = '\n\nHuman:';
 893:   static AI_PROMPT = '\n\nAssistant:';
 894:   static DEFAULT_TIMEOUT = 600000; // 10 minutes
 895: 
 896:   static AnthropicError = Errors.AnthropicError;
 897:   static APIError = Errors.APIError;
 898:   static APIConnectionError = Errors.APIConnectionError;
 899:   static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
 900:   static APIUserAbortError = Errors.APIUserAbortError;
 901:   static NotFoundError = Errors.NotFoundError;
 902:   static ConflictError = Errors.ConflictError;
 903:   static RateLimitError = Errors.RateLimitError;
 904:   static BadRequestError = Errors.BadRequestError;
 905:   static AuthenticationError = Errors.AuthenticationError;
 906:   static InternalServerError = Errors.InternalServerError;
 907:   static PermissionDeniedError = Errors.PermissionDeniedError;
 908:   static UnprocessableEntityError = Errors.UnprocessableEntityError;
 909: 
 910:   static toFile = Uploads.toFile;
 911: }
 912: 
 913: /**
 914:  * API Client for interfacing with the Anthropic API.
 915:  */
 916: export class Anthropic extends BaseAnthropic {
 917:   completions: API.Completions = new API.Completions(this);
 918:   messages: API.Messages = new API.Messages(this);
 919:   models: API.Models = new API.Models(this);
 920:   beta: API.Beta = new API.Beta(this);
 921: }
 922: Anthropic.Completions = Completions;
 923: Anthropic.Messages = Messages;
 924: Anthropic.Models = Models;
 925: Anthropic.Beta = Beta;
 926: export declare namespace Anthropic {
 927:   export type RequestOptions = Opts.RequestOptions;
 928: 
 929:   export import Page = Pagination.Page;
 930:   export { type PageParams as PageParams, type PageResponse as PageResponse };
 931: 
 932:   export {
 933:     Completions as Completions,
 934:     type Completion as Completion,
 935:     type CompletionCreateParams as CompletionCreateParams,
 936:     type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
 937:     type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
 938:   };
 939: 
 940:   export {
 941:     Messages as Messages,
 942:     type Base64ImageSource as Base64ImageSource,
 943:     type Base64PDFSource as Base64PDFSource,
 944:     type CacheControlEphemeral as CacheControlEphemeral,
 945:     type CitationCharLocation as CitationCharLocation,
 946:     type CitationCharLocationParam as CitationCharLocationParam,
 947:     type CitationContentBlockLocation as CitationContentBlockLocation,
 948:     type CitationContentBlockLocationParam as CitationContentBlockLocationParam,
 949:     type CitationPageLocation as CitationPageLocation,
 950:     type CitationPageLocationParam as CitationPageLocationParam,
 951:     type CitationWebSearchResultLocationParam as CitationWebSearchResultLocationParam,
 952:     type CitationsConfigParam as CitationsConfigParam,
 953:     type CitationsDelta as CitationsDelta,
 954:     type CitationsWebSearchResultLocation as CitationsWebSearchResultLocation,
 955:     type ContentBlock as ContentBlock,
 956:     type ContentBlockDeltaEvent as ContentBlockDeltaEvent,
 957:     type ContentBlockParam as ContentBlockParam,
 958:     type ContentBlockStartEvent as ContentBlockStartEvent,
 959:     type ContentBlockStopEvent as ContentBlockStopEvent,
 960:     type ContentBlockSource as ContentBlockSource,
 961:     type ContentBlockSourceContent as ContentBlockSourceContent,
 962:     type DocumentBlockParam as DocumentBlockParam,
 963:     type ImageBlockParam as ImageBlockParam,
 964:     type InputJSONDelta as InputJSONDelta,
 965:     type Message as Message,
 966:     type MessageCountTokensTool as MessageCountTokensTool,
 967:     type MessageDeltaEvent as MessageDeltaEvent,
 968:     type MessageDeltaUsage as MessageDeltaUsage,
 969:     type MessageParam as MessageParam,
 970:     type MessageStartEvent as MessageStartEvent,
 971:     type MessageStopEvent as MessageStopEvent,
 972:     type MessageStreamEvent as MessageStreamEvent,
 973:     type MessageTokensCount as MessageTokensCount,
 974:     type Metadata as Metadata,
 975:     type Model as Model,
 976:     type PlainTextSource as PlainTextSource,
 977:     type RawContentBlockDelta as RawContentBlockDelta,
 978:     type RawContentBlockDeltaEvent as RawContentBlockDeltaEvent,
 979:     type RawContentBlockStartEvent as RawContentBlockStartEvent,
 980:     type RawContentBlockStopEvent as RawContentBlockStopEvent,
 981:     type RawMessageDeltaEvent as RawMessageDeltaEvent,
 982:     type RawMessageStartEvent as RawMessageStartEvent,
 983:     type RawMessageStopEvent as RawMessageStopEvent,
 984:     type RawMessageStreamEvent as RawMessageStreamEvent,
 985:     type RedactedThinkingBlock as RedactedThinkingBlock,
 986:     type RedactedThinkingBlockParam as RedactedThinkingBlockParam,
 987:     type ServerToolUsage as ServerToolUsage,
 988:     type ServerToolUseBlock as ServerToolUseBlock,
 989:     type ServerToolUseBlockParam as ServerToolUseBlockParam,
 990:     type SignatureDelta as SignatureDelta,
 991:     type StopReason as StopReason,
 992:     type TextBlock as TextBlock,
 993:     type TextBlockParam as TextBlockParam,
 994:     type TextCitation as TextCitation,
 995:     type TextCitationParam as TextCitationParam,
 996:     type TextDelta as TextDelta,
 997:     type ThinkingBlock as ThinkingBlock,
 998:     type ThinkingBlockParam as ThinkingBlockParam,
 999:     type ThinkingConfigDisabled as ThinkingConfigDisabled,
1000:     type ThinkingConfigEnabled as ThinkingConfigEnabled,
1001:     type ThinkingConfigParam as ThinkingConfigParam,
1002:     type ThinkingDelta as ThinkingDelta,
1003:     type Tool as Tool,
1004:     type ToolBash20250124 as ToolBash20250124,
1005:     type ToolChoice as ToolChoice,
1006:     type ToolChoiceAny as ToolChoiceAny,
1007:     type ToolChoiceAuto as ToolChoiceAuto,
1008:     type ToolChoiceNone as ToolChoiceNone,
1009:     type ToolChoiceTool as ToolChoiceTool,
1010:     type ToolResultBlockParam as ToolResultBlockParam,
1011:     type ToolTextEditor20250124 as ToolTextEditor20250124,
1012:     type ToolUnion as ToolUnion,
1013:     type ToolUseBlock as ToolUseBlock,
1014:     type ToolUseBlockParam as ToolUseBlockParam,
1015:     type URLImageSource as URLImageSource,
1016:     type URLPDFSource as URLPDFSource,
1017:     type Usage as Usage,
1018:     type WebSearchResultBlock as WebSearchResultBlock,
1019:     type WebSearchResultBlockParam as WebSearchResultBlockParam,
1020:     type WebSearchTool20250305 as WebSearchTool20250305,
1021:     type WebSearchToolRequestError as WebSearchToolRequestError,
1022:     type WebSearchToolResultBlock as WebSearchToolResultBlock,
1023:     type WebSearchToolResultBlockContent as WebSearchToolResultBlockContent,
1024:     type WebSearchToolResultBlockParam as WebSearchToolResultBlockParam,
1025:     type WebSearchToolResultBlockParamContent as WebSearchToolResultBlockParamContent,
1026:     type WebSearchToolResultError as WebSearchToolResultError,
1027:     type MessageCreateParams as MessageCreateParams,
1028:     type MessageCreateParamsNonStreaming as MessageCreateParamsNonStreaming,
1029:     type MessageCreateParamsStreaming as MessageCreateParamsStreaming,
1030:     type MessageStreamParams as MessageStreamParams,
1031:     type MessageCountTokensParams as MessageCountTokensParams,
1032:   };
1033: 
1034:   export {
1035:     Models as Models,
1036:     type ModelInfo as ModelInfo,
1037:     type ModelInfosPage as ModelInfosPage,
1038:     type ModelRetrieveParams as ModelRetrieveParams,
1039:     type ModelListParams as ModelListParams,
1040:   };
1041: 
1042:   export {
1043:     Beta as Beta,
1044:     type AnthropicBeta as AnthropicBeta,
1045:     type BetaAPIError as BetaAPIError,
1046:     type BetaAuthenticationError as BetaAuthenticationError,
1047:     type BetaBillingError as BetaBillingError,
1048:     type BetaError as BetaError,
1049:     type BetaErrorResponse as BetaErrorResponse,
1050:     type BetaGatewayTimeoutError as BetaGatewayTimeoutError,
1051:     type BetaInvalidRequestError as BetaInvalidRequestError,
1052:     type BetaNotFoundError as BetaNotFoundError,
1053:     type BetaOverloadedError as BetaOverloadedError,
1054:     type BetaPermissionError as BetaPermissionError,
1055:     type BetaRateLimitError as BetaRateLimitError,
1056:   };
1057: 
1058:   export type APIErrorObject = API.APIErrorObject;
1059:   export type AuthenticationError = API.AuthenticationError;
1060:   export type BillingError = API.BillingError;
1061:   export type ErrorObject = API.ErrorObject;
1062:   export type ErrorResponse = API.ErrorResponse;
1063:   export type GatewayTimeoutError = API.GatewayTimeoutError;
1064:   export type InvalidRequestError = API.InvalidRequestError;
1065:   export type NotFoundError = API.NotFoundError;
1066:   export type OverloadedError = API.OverloadedError;
1067:   export type PermissionError = API.PermissionError;
1068:   export type RateLimitError = API.RateLimitError;
1069: }
1070: export const { HUMAN_PROMPT, AI_PROMPT } = Anthropic;
````

## File: src/error.ts
````typescript
1: /** @deprecated Import from ./core/error instead */
2: export * from './core/error';
````

## File: src/index.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: export { Anthropic as default } from './client';
 4: 
 5: export { type Uploadable, toFile } from './core/uploads';
 6: export { APIPromise } from './core/api-promise';
 7: export { BaseAnthropic, Anthropic, type ClientOptions, HUMAN_PROMPT, AI_PROMPT } from './client';
 8: export { PagePromise } from './core/pagination';
 9: export {
10:   AnthropicError,
11:   APIError,
12:   APIConnectionError,
13:   APIConnectionTimeoutError,
14:   APIUserAbortError,
15:   NotFoundError,
16:   ConflictError,
17:   RateLimitError,
18:   BadRequestError,
19:   AuthenticationError,
20:   InternalServerError,
21:   PermissionDeniedError,
22:   UnprocessableEntityError,
23: } from './core/error';
````

## File: src/pagination.ts
````typescript
1: /** @deprecated Import from ./core/pagination instead */
2: export * from './core/pagination';
````

## File: src/resource.ts
````typescript
1: /** @deprecated Import from ./core/resource instead */
2: export * from './core/resource';
````

## File: src/resources.ts
````typescript
1: export * from './resources/index';
````

## File: src/streaming.ts
````typescript
1: /** @deprecated Import from ./core/streaming instead */
2: export * from './core/streaming';
````

## File: src/uploads.ts
````typescript
1: /** @deprecated Import from ./core/uploads instead */
2: export * from './core/uploads';
````

## File: src/version.ts
````typescript
1: export const VERSION = '0.52.0'; // x-release-please-version
````

## File: tests/api-resources/beta/messages/batches.test.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import Anthropic from '@anthropic-ai/sdk';
  4: 
  5: const client = new Anthropic({
  6:   apiKey: 'my-anthropic-api-key',
  7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  8: });
  9: 
 10: describe('resource batches', () => {
 11:   test('create: only required params', async () => {
 12:     const responsePromise = client.beta.messages.batches.create({
 13:       requests: [
 14:         {
 15:           custom_id: 'my-custom-id-1',
 16:           params: {
 17:             max_tokens: 1024,
 18:             messages: [{ content: 'Hello, world', role: 'user' }],
 19:             model: 'claude-3-7-sonnet-20250219',
 20:           },
 21:         },
 22:       ],
 23:     });
 24:     const rawResponse = await responsePromise.asResponse();
 25:     expect(rawResponse).toBeInstanceOf(Response);
 26:     const response = await responsePromise;
 27:     expect(response).not.toBeInstanceOf(Response);
 28:     const dataAndResponse = await responsePromise.withResponse();
 29:     expect(dataAndResponse.data).toBe(response);
 30:     expect(dataAndResponse.response).toBe(rawResponse);
 31:   });
 32: 
 33:   test('create: required and optional params', async () => {
 34:     const response = await client.beta.messages.batches.create({
 35:       requests: [
 36:         {
 37:           custom_id: 'my-custom-id-1',
 38:           params: {
 39:             max_tokens: 1024,
 40:             messages: [{ content: 'Hello, world', role: 'user' }],
 41:             model: 'claude-3-7-sonnet-20250219',
 42:             container: 'container',
 43:             mcp_servers: [
 44:               {
 45:                 name: 'name',
 46:                 type: 'url',
 47:                 url: 'url',
 48:                 authorization_token: 'authorization_token',
 49:                 tool_configuration: { allowed_tools: ['string'], enabled: true },
 50:               },
 51:             ],
 52:             metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
 53:             service_tier: 'auto',
 54:             stop_sequences: ['string'],
 55:             stream: false,
 56:             system: [
 57:               {
 58:                 text: "Today's date is 2024-06-01.",
 59:                 type: 'text',
 60:                 cache_control: { type: 'ephemeral', ttl: '5m' },
 61:                 citations: [
 62:                   {
 63:                     cited_text: 'cited_text',
 64:                     document_index: 0,
 65:                     document_title: 'x',
 66:                     end_char_index: 0,
 67:                     start_char_index: 0,
 68:                     type: 'char_location',
 69:                   },
 70:                 ],
 71:               },
 72:             ],
 73:             temperature: 1,
 74:             thinking: { budget_tokens: 1024, type: 'enabled' },
 75:             tool_choice: { type: 'auto', disable_parallel_tool_use: true },
 76:             tools: [
 77:               {
 78:                 input_schema: {
 79:                   type: 'object',
 80:                   properties: {
 81:                     location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
 82:                     unit: {
 83:                       description: 'Unit for the output - one of (celsius, fahrenheit)',
 84:                       type: 'string',
 85:                     },
 86:                   },
 87:                 },
 88:                 name: 'name',
 89:                 cache_control: { type: 'ephemeral', ttl: '5m' },
 90:                 description: 'Get the current weather in a given location',
 91:                 type: 'custom',
 92:               },
 93:             ],
 94:             top_k: 5,
 95:             top_p: 0.7,
 96:           },
 97:         },
 98:       ],
 99:       betas: ['string'],
100:     });
101:   });
102: 
103:   test('retrieve', async () => {
104:     const responsePromise = client.beta.messages.batches.retrieve('message_batch_id');
105:     const rawResponse = await responsePromise.asResponse();
106:     expect(rawResponse).toBeInstanceOf(Response);
107:     const response = await responsePromise;
108:     expect(response).not.toBeInstanceOf(Response);
109:     const dataAndResponse = await responsePromise.withResponse();
110:     expect(dataAndResponse.data).toBe(response);
111:     expect(dataAndResponse.response).toBe(rawResponse);
112:   });
113: 
114:   test('retrieve: request options and params are passed correctly', async () => {
115:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
116:     await expect(
117:       client.beta.messages.batches.retrieve(
118:         'message_batch_id',
119:         { betas: ['string'] },
120:         { path: '/_stainless_unknown_path' },
121:       ),
122:     ).rejects.toThrow(Anthropic.NotFoundError);
123:   });
124: 
125:   test('list', async () => {
126:     const responsePromise = client.beta.messages.batches.list();
127:     const rawResponse = await responsePromise.asResponse();
128:     expect(rawResponse).toBeInstanceOf(Response);
129:     const response = await responsePromise;
130:     expect(response).not.toBeInstanceOf(Response);
131:     const dataAndResponse = await responsePromise.withResponse();
132:     expect(dataAndResponse.data).toBe(response);
133:     expect(dataAndResponse.response).toBe(rawResponse);
134:   });
135: 
136:   test('list: request options and params are passed correctly', async () => {
137:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
138:     await expect(
139:       client.beta.messages.batches.list(
140:         { after_id: 'after_id', before_id: 'before_id', limit: 1, betas: ['string'] },
141:         { path: '/_stainless_unknown_path' },
142:       ),
143:     ).rejects.toThrow(Anthropic.NotFoundError);
144:   });
145: 
146:   test('delete', async () => {
147:     const responsePromise = client.beta.messages.batches.delete('message_batch_id');
148:     const rawResponse = await responsePromise.asResponse();
149:     expect(rawResponse).toBeInstanceOf(Response);
150:     const response = await responsePromise;
151:     expect(response).not.toBeInstanceOf(Response);
152:     const dataAndResponse = await responsePromise.withResponse();
153:     expect(dataAndResponse.data).toBe(response);
154:     expect(dataAndResponse.response).toBe(rawResponse);
155:   });
156: 
157:   test('delete: request options and params are passed correctly', async () => {
158:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
159:     await expect(
160:       client.beta.messages.batches.delete(
161:         'message_batch_id',
162:         { betas: ['string'] },
163:         { path: '/_stainless_unknown_path' },
164:       ),
165:     ).rejects.toThrow(Anthropic.NotFoundError);
166:   });
167: 
168:   test('cancel', async () => {
169:     const responsePromise = client.beta.messages.batches.cancel('message_batch_id');
170:     const rawResponse = await responsePromise.asResponse();
171:     expect(rawResponse).toBeInstanceOf(Response);
172:     const response = await responsePromise;
173:     expect(response).not.toBeInstanceOf(Response);
174:     const dataAndResponse = await responsePromise.withResponse();
175:     expect(dataAndResponse.data).toBe(response);
176:     expect(dataAndResponse.response).toBe(rawResponse);
177:   });
178: 
179:   test('cancel: request options and params are passed correctly', async () => {
180:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
181:     await expect(
182:       client.beta.messages.batches.cancel(
183:         'message_batch_id',
184:         { betas: ['string'] },
185:         { path: '/_stainless_unknown_path' },
186:       ),
187:     ).rejects.toThrow(Anthropic.NotFoundError);
188:   });
189: 
190:   // Prism doesn't support JSONL responses yet
191:   test.skip('results: request options and params are passed correctly', async () => {
192:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
193:     await expect(
194:       client.beta.messages.batches.results(
195:         'message_batch_id',
196:         { betas: ['string'] },
197:         { path: '/_stainless_unknown_path' },
198:       ),
199:     ).rejects.toThrow(Anthropic.NotFoundError);
200:   });
201: });
````

## File: tests/api-resources/beta/messages/messages.test.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import Anthropic from '@anthropic-ai/sdk';
  4: 
  5: const client = new Anthropic({
  6:   apiKey: 'my-anthropic-api-key',
  7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  8: });
  9: 
 10: describe('resource messages', () => {
 11:   test('create: only required params', async () => {
 12:     const responsePromise = client.beta.messages.create({
 13:       max_tokens: 1024,
 14:       messages: [{ content: 'Hello, world', role: 'user' }],
 15:       model: 'claude-3-7-sonnet-20250219',
 16:     });
 17:     const rawResponse = await responsePromise.asResponse();
 18:     expect(rawResponse).toBeInstanceOf(Response);
 19:     const response = await responsePromise;
 20:     expect(response).not.toBeInstanceOf(Response);
 21:     const dataAndResponse = await responsePromise.withResponse();
 22:     expect(dataAndResponse.data).toBe(response);
 23:     expect(dataAndResponse.response).toBe(rawResponse);
 24:   });
 25: 
 26:   test('create: required and optional params', async () => {
 27:     const response = await client.beta.messages.create({
 28:       max_tokens: 1024,
 29:       messages: [{ content: 'Hello, world', role: 'user' }],
 30:       model: 'claude-3-7-sonnet-20250219',
 31:       container: 'container',
 32:       mcp_servers: [
 33:         {
 34:           name: 'name',
 35:           type: 'url',
 36:           url: 'url',
 37:           authorization_token: 'authorization_token',
 38:           tool_configuration: { allowed_tools: ['string'], enabled: true },
 39:         },
 40:       ],
 41:       metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
 42:       service_tier: 'auto',
 43:       stop_sequences: ['string'],
 44:       stream: false,
 45:       system: [
 46:         {
 47:           text: "Today's date is 2024-06-01.",
 48:           type: 'text',
 49:           cache_control: { type: 'ephemeral', ttl: '5m' },
 50:           citations: [
 51:             {
 52:               cited_text: 'cited_text',
 53:               document_index: 0,
 54:               document_title: 'x',
 55:               end_char_index: 0,
 56:               start_char_index: 0,
 57:               type: 'char_location',
 58:             },
 59:           ],
 60:         },
 61:       ],
 62:       temperature: 1,
 63:       thinking: { budget_tokens: 1024, type: 'enabled' },
 64:       tool_choice: { type: 'auto', disable_parallel_tool_use: true },
 65:       tools: [
 66:         {
 67:           input_schema: {
 68:             type: 'object',
 69:             properties: {
 70:               location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
 71:               unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
 72:             },
 73:           },
 74:           name: 'name',
 75:           cache_control: { type: 'ephemeral', ttl: '5m' },
 76:           description: 'Get the current weather in a given location',
 77:           type: 'custom',
 78:         },
 79:       ],
 80:       top_k: 5,
 81:       top_p: 0.7,
 82:       betas: ['string'],
 83:     });
 84:   });
 85: 
 86:   test('countTokens: only required params', async () => {
 87:     const responsePromise = client.beta.messages.countTokens({
 88:       messages: [{ content: 'string', role: 'user' }],
 89:       model: 'claude-3-7-sonnet-latest',
 90:     });
 91:     const rawResponse = await responsePromise.asResponse();
 92:     expect(rawResponse).toBeInstanceOf(Response);
 93:     const response = await responsePromise;
 94:     expect(response).not.toBeInstanceOf(Response);
 95:     const dataAndResponse = await responsePromise.withResponse();
 96:     expect(dataAndResponse.data).toBe(response);
 97:     expect(dataAndResponse.response).toBe(rawResponse);
 98:   });
 99: 
100:   test('countTokens: required and optional params', async () => {
101:     const response = await client.beta.messages.countTokens({
102:       messages: [{ content: 'string', role: 'user' }],
103:       model: 'claude-3-7-sonnet-latest',
104:       mcp_servers: [
105:         {
106:           name: 'name',
107:           type: 'url',
108:           url: 'url',
109:           authorization_token: 'authorization_token',
110:           tool_configuration: { allowed_tools: ['string'], enabled: true },
111:         },
112:       ],
113:       system: [
114:         {
115:           text: "Today's date is 2024-06-01.",
116:           type: 'text',
117:           cache_control: { type: 'ephemeral', ttl: '5m' },
118:           citations: [
119:             {
120:               cited_text: 'cited_text',
121:               document_index: 0,
122:               document_title: 'x',
123:               end_char_index: 0,
124:               start_char_index: 0,
125:               type: 'char_location',
126:             },
127:           ],
128:         },
129:       ],
130:       thinking: { budget_tokens: 1024, type: 'enabled' },
131:       tool_choice: { type: 'auto', disable_parallel_tool_use: true },
132:       tools: [
133:         {
134:           input_schema: {
135:             type: 'object',
136:             properties: {
137:               location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
138:               unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
139:             },
140:           },
141:           name: 'name',
142:           cache_control: { type: 'ephemeral', ttl: '5m' },
143:           description: 'Get the current weather in a given location',
144:           type: 'custom',
145:         },
146:       ],
147:       betas: ['string'],
148:     });
149:   });
150: });
````

## File: tests/api-resources/beta/files.test.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import Anthropic, { toFile } from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic({
 6:   apiKey: 'my-anthropic-api-key',
 7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
 8: });
 9: 
10: describe('resource files', () => {
11:   test('list', async () => {
12:     const responsePromise = client.beta.files.list();
13:     const rawResponse = await responsePromise.asResponse();
14:     expect(rawResponse).toBeInstanceOf(Response);
15:     const response = await responsePromise;
16:     expect(response).not.toBeInstanceOf(Response);
17:     const dataAndResponse = await responsePromise.withResponse();
18:     expect(dataAndResponse.data).toBe(response);
19:     expect(dataAndResponse.response).toBe(rawResponse);
20:   });
21: 
22:   test('list: request options and params are passed correctly', async () => {
23:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
24:     await expect(
25:       client.beta.files.list(
26:         { after_id: 'after_id', before_id: 'before_id', limit: 1, betas: ['string'] },
27:         { path: '/_stainless_unknown_path' },
28:       ),
29:     ).rejects.toThrow(Anthropic.NotFoundError);
30:   });
31: 
32:   test('delete', async () => {
33:     const responsePromise = client.beta.files.delete('file_id');
34:     const rawResponse = await responsePromise.asResponse();
35:     expect(rawResponse).toBeInstanceOf(Response);
36:     const response = await responsePromise;
37:     expect(response).not.toBeInstanceOf(Response);
38:     const dataAndResponse = await responsePromise.withResponse();
39:     expect(dataAndResponse.data).toBe(response);
40:     expect(dataAndResponse.response).toBe(rawResponse);
41:   });
42: 
43:   test('delete: request options and params are passed correctly', async () => {
44:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
45:     await expect(
46:       client.beta.files.delete('file_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
47:     ).rejects.toThrow(Anthropic.NotFoundError);
48:   });
49: 
50:   test('download: request options and params are passed correctly', async () => {
51:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
52:     await expect(
53:       client.beta.files.download('file_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
54:     ).rejects.toThrow(Anthropic.NotFoundError);
55:   });
56: 
57:   test('retrieveMetadata', async () => {
58:     const responsePromise = client.beta.files.retrieveMetadata('file_id');
59:     const rawResponse = await responsePromise.asResponse();
60:     expect(rawResponse).toBeInstanceOf(Response);
61:     const response = await responsePromise;
62:     expect(response).not.toBeInstanceOf(Response);
63:     const dataAndResponse = await responsePromise.withResponse();
64:     expect(dataAndResponse.data).toBe(response);
65:     expect(dataAndResponse.response).toBe(rawResponse);
66:   });
67: 
68:   test('retrieveMetadata: request options and params are passed correctly', async () => {
69:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
70:     await expect(
71:       client.beta.files.retrieveMetadata(
72:         'file_id',
73:         { betas: ['string'] },
74:         { path: '/_stainless_unknown_path' },
75:       ),
76:     ).rejects.toThrow(Anthropic.NotFoundError);
77:   });
78: 
79:   test('upload: only required params', async () => {
80:     const responsePromise = client.beta.files.upload({
81:       file: await toFile(Buffer.from('# my file contents'), 'README.md'),
82:     });
83:     const rawResponse = await responsePromise.asResponse();
84:     expect(rawResponse).toBeInstanceOf(Response);
85:     const response = await responsePromise;
86:     expect(response).not.toBeInstanceOf(Response);
87:     const dataAndResponse = await responsePromise.withResponse();
88:     expect(dataAndResponse.data).toBe(response);
89:     expect(dataAndResponse.response).toBe(rawResponse);
90:   });
91: 
92:   test('upload: required and optional params', async () => {
93:     const response = await client.beta.files.upload({
94:       file: await toFile(Buffer.from('# my file contents'), 'README.md'),
95:       betas: ['string'],
96:     });
97:   });
98: });
````

## File: tests/api-resources/beta/models.test.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic({
 6:   apiKey: 'my-anthropic-api-key',
 7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
 8: });
 9: 
10: describe('resource models', () => {
11:   test('retrieve', async () => {
12:     const responsePromise = client.beta.models.retrieve('model_id');
13:     const rawResponse = await responsePromise.asResponse();
14:     expect(rawResponse).toBeInstanceOf(Response);
15:     const response = await responsePromise;
16:     expect(response).not.toBeInstanceOf(Response);
17:     const dataAndResponse = await responsePromise.withResponse();
18:     expect(dataAndResponse.data).toBe(response);
19:     expect(dataAndResponse.response).toBe(rawResponse);
20:   });
21: 
22:   test('retrieve: request options and params are passed correctly', async () => {
23:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
24:     await expect(
25:       client.beta.models.retrieve('model_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
26:     ).rejects.toThrow(Anthropic.NotFoundError);
27:   });
28: 
29:   test('retrieve: request options and params are passed correctly', async () => {
30:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
31:     await expect(
32:       client.beta.models.retrieve('model_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
33:     ).rejects.toThrow(Anthropic.NotFoundError);
34:   });
35: 
36:   test('list', async () => {
37:     const responsePromise = client.beta.models.list();
38:     const rawResponse = await responsePromise.asResponse();
39:     expect(rawResponse).toBeInstanceOf(Response);
40:     const response = await responsePromise;
41:     expect(response).not.toBeInstanceOf(Response);
42:     const dataAndResponse = await responsePromise.withResponse();
43:     expect(dataAndResponse.data).toBe(response);
44:     expect(dataAndResponse.response).toBe(rawResponse);
45:   });
46: 
47:   test('list: request options and params are passed correctly', async () => {
48:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
49:     await expect(
50:       client.beta.models.list(
51:         { after_id: 'after_id', before_id: 'before_id', limit: 1, betas: ['string'] },
52:         { path: '/_stainless_unknown_path' },
53:       ),
54:     ).rejects.toThrow(Anthropic.NotFoundError);
55:   });
56: });
````

## File: tests/api-resources/messages/batches.test.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import Anthropic from '@anthropic-ai/sdk';
  4: 
  5: const client = new Anthropic({
  6:   apiKey: 'my-anthropic-api-key',
  7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  8: });
  9: 
 10: describe('resource batches', () => {
 11:   test('create: only required params', async () => {
 12:     const responsePromise = client.messages.batches.create({
 13:       requests: [
 14:         {
 15:           custom_id: 'my-custom-id-1',
 16:           params: {
 17:             max_tokens: 1024,
 18:             messages: [{ content: 'Hello, world', role: 'user' }],
 19:             model: 'claude-3-7-sonnet-20250219',
 20:           },
 21:         },
 22:       ],
 23:     });
 24:     const rawResponse = await responsePromise.asResponse();
 25:     expect(rawResponse).toBeInstanceOf(Response);
 26:     const response = await responsePromise;
 27:     expect(response).not.toBeInstanceOf(Response);
 28:     const dataAndResponse = await responsePromise.withResponse();
 29:     expect(dataAndResponse.data).toBe(response);
 30:     expect(dataAndResponse.response).toBe(rawResponse);
 31:   });
 32: 
 33:   test('create: required and optional params', async () => {
 34:     const response = await client.messages.batches.create({
 35:       requests: [
 36:         {
 37:           custom_id: 'my-custom-id-1',
 38:           params: {
 39:             max_tokens: 1024,
 40:             messages: [{ content: 'Hello, world', role: 'user' }],
 41:             model: 'claude-3-7-sonnet-20250219',
 42:             metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
 43:             service_tier: 'auto',
 44:             stop_sequences: ['string'],
 45:             system: [
 46:               {
 47:                 text: "Today's date is 2024-06-01.",
 48:                 type: 'text',
 49:                 cache_control: { type: 'ephemeral' },
 50:                 citations: [
 51:                   {
 52:                     cited_text: 'cited_text',
 53:                     document_index: 0,
 54:                     document_title: 'x',
 55:                     end_char_index: 0,
 56:                     start_char_index: 0,
 57:                     type: 'char_location',
 58:                   },
 59:                 ],
 60:               },
 61:             ],
 62:             temperature: 1,
 63:             thinking: { budget_tokens: 1024, type: 'enabled' },
 64:             tool_choice: { type: 'auto', disable_parallel_tool_use: true },
 65:             tools: [
 66:               {
 67:                 input_schema: {
 68:                   type: 'object',
 69:                   properties: {
 70:                     location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
 71:                     unit: {
 72:                       description: 'Unit for the output - one of (celsius, fahrenheit)',
 73:                       type: 'string',
 74:                     },
 75:                   },
 76:                 },
 77:                 name: 'name',
 78:                 cache_control: { type: 'ephemeral' },
 79:                 description: 'Get the current weather in a given location',
 80:                 type: 'custom',
 81:               },
 82:             ],
 83:             top_k: 5,
 84:             top_p: 0.7,
 85:           },
 86:         },
 87:       ],
 88:     });
 89:   });
 90: 
 91:   test('retrieve', async () => {
 92:     const responsePromise = client.messages.batches.retrieve('message_batch_id');
 93:     const rawResponse = await responsePromise.asResponse();
 94:     expect(rawResponse).toBeInstanceOf(Response);
 95:     const response = await responsePromise;
 96:     expect(response).not.toBeInstanceOf(Response);
 97:     const dataAndResponse = await responsePromise.withResponse();
 98:     expect(dataAndResponse.data).toBe(response);
 99:     expect(dataAndResponse.response).toBe(rawResponse);
100:   });
101: 
102:   test('list', async () => {
103:     const responsePromise = client.messages.batches.list();
104:     const rawResponse = await responsePromise.asResponse();
105:     expect(rawResponse).toBeInstanceOf(Response);
106:     const response = await responsePromise;
107:     expect(response).not.toBeInstanceOf(Response);
108:     const dataAndResponse = await responsePromise.withResponse();
109:     expect(dataAndResponse.data).toBe(response);
110:     expect(dataAndResponse.response).toBe(rawResponse);
111:   });
112: 
113:   test('list: request options and params are passed correctly', async () => {
114:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
115:     await expect(
116:       client.messages.batches.list(
117:         { after_id: 'after_id', before_id: 'before_id', limit: 1 },
118:         { path: '/_stainless_unknown_path' },
119:       ),
120:     ).rejects.toThrow(Anthropic.NotFoundError);
121:   });
122: 
123:   test('delete', async () => {
124:     const responsePromise = client.messages.batches.delete('message_batch_id');
125:     const rawResponse = await responsePromise.asResponse();
126:     expect(rawResponse).toBeInstanceOf(Response);
127:     const response = await responsePromise;
128:     expect(response).not.toBeInstanceOf(Response);
129:     const dataAndResponse = await responsePromise.withResponse();
130:     expect(dataAndResponse.data).toBe(response);
131:     expect(dataAndResponse.response).toBe(rawResponse);
132:   });
133: 
134:   test('cancel', async () => {
135:     const responsePromise = client.messages.batches.cancel('message_batch_id');
136:     const rawResponse = await responsePromise.asResponse();
137:     expect(rawResponse).toBeInstanceOf(Response);
138:     const response = await responsePromise;
139:     expect(response).not.toBeInstanceOf(Response);
140:     const dataAndResponse = await responsePromise.withResponse();
141:     expect(dataAndResponse.data).toBe(response);
142:     expect(dataAndResponse.response).toBe(rawResponse);
143:   });
144: 
145:   test('cancel: request options instead of params are passed correctly', async () => {
146:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
147:     await expect(
148:       client.messages.batches.cancel('message_batch_id', { path: '/_stainless_unknown_path' }),
149:     ).rejects.toThrow(Anthropic.NotFoundError);
150:   });
151: });
````

## File: tests/api-resources/messages/messages.test.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import Anthropic from '@anthropic-ai/sdk';
  4: 
  5: const client = new Anthropic({
  6:   apiKey: 'my-anthropic-api-key',
  7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
  8: });
  9: 
 10: describe('resource messages', () => {
 11:   test('create: only required params', async () => {
 12:     const responsePromise = client.messages.create({
 13:       max_tokens: 1024,
 14:       messages: [{ content: 'Hello, world', role: 'user' }],
 15:       model: 'claude-3-7-sonnet-20250219',
 16:     });
 17:     const rawResponse = await responsePromise.asResponse();
 18:     expect(rawResponse).toBeInstanceOf(Response);
 19:     const response = await responsePromise;
 20:     expect(response).not.toBeInstanceOf(Response);
 21:     const dataAndResponse = await responsePromise.withResponse();
 22:     expect(dataAndResponse.data).toBe(response);
 23:     expect(dataAndResponse.response).toBe(rawResponse);
 24:   });
 25: 
 26:   test('create: required and optional params', async () => {
 27:     const response = await client.messages.create({
 28:       max_tokens: 1024,
 29:       messages: [{ content: 'Hello, world', role: 'user' }],
 30:       model: 'claude-3-7-sonnet-20250219',
 31:       metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
 32:       service_tier: 'auto',
 33:       stop_sequences: ['string'],
 34:       stream: false,
 35:       system: [
 36:         {
 37:           text: "Today's date is 2024-06-01.",
 38:           type: 'text',
 39:           cache_control: { type: 'ephemeral' },
 40:           citations: [
 41:             {
 42:               cited_text: 'cited_text',
 43:               document_index: 0,
 44:               document_title: 'x',
 45:               end_char_index: 0,
 46:               start_char_index: 0,
 47:               type: 'char_location',
 48:             },
 49:           ],
 50:         },
 51:       ],
 52:       temperature: 1,
 53:       thinking: { budget_tokens: 1024, type: 'enabled' },
 54:       tool_choice: { type: 'auto', disable_parallel_tool_use: true },
 55:       tools: [
 56:         {
 57:           input_schema: {
 58:             type: 'object',
 59:             properties: {
 60:               location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
 61:               unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
 62:             },
 63:           },
 64:           name: 'name',
 65:           cache_control: { type: 'ephemeral' },
 66:           description: 'Get the current weather in a given location',
 67:           type: 'custom',
 68:         },
 69:       ],
 70:       top_k: 5,
 71:       top_p: 0.7,
 72:     });
 73:   });
 74: 
 75:   test('countTokens: only required params', async () => {
 76:     const responsePromise = client.messages.countTokens({
 77:       messages: [{ content: 'string', role: 'user' }],
 78:       model: 'claude-3-7-sonnet-latest',
 79:     });
 80:     const rawResponse = await responsePromise.asResponse();
 81:     expect(rawResponse).toBeInstanceOf(Response);
 82:     const response = await responsePromise;
 83:     expect(response).not.toBeInstanceOf(Response);
 84:     const dataAndResponse = await responsePromise.withResponse();
 85:     expect(dataAndResponse.data).toBe(response);
 86:     expect(dataAndResponse.response).toBe(rawResponse);
 87:   });
 88: 
 89:   test('countTokens: required and optional params', async () => {
 90:     const response = await client.messages.countTokens({
 91:       messages: [{ content: 'string', role: 'user' }],
 92:       model: 'claude-3-7-sonnet-latest',
 93:       system: [
 94:         {
 95:           text: "Today's date is 2024-06-01.",
 96:           type: 'text',
 97:           cache_control: { type: 'ephemeral' },
 98:           citations: [
 99:             {
100:               cited_text: 'cited_text',
101:               document_index: 0,
102:               document_title: 'x',
103:               end_char_index: 0,
104:               start_char_index: 0,
105:               type: 'char_location',
106:             },
107:           ],
108:         },
109:       ],
110:       thinking: { budget_tokens: 1024, type: 'enabled' },
111:       tool_choice: { type: 'auto', disable_parallel_tool_use: true },
112:       tools: [
113:         {
114:           input_schema: {
115:             type: 'object',
116:             properties: {
117:               location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
118:               unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
119:             },
120:           },
121:           name: 'name',
122:           cache_control: { type: 'ephemeral' },
123:           description: 'Get the current weather in a given location',
124:           type: 'custom',
125:         },
126:       ],
127:     });
128:   });
129: });
130: 
131: test('create: warns when using a deprecated model', async () => {
132:   const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
133: 
134:   await client.messages.create({
135:     max_tokens: 1024,
136:     messages: [{ content: 'Hello, world', role: 'user' }],
137:     model: 'claude-instant-1.2',
138:   });
139: 
140:   expect(consoleSpy).toHaveBeenCalledWith(
141:     "The model 'claude-instant-1.2' is deprecated and will reach end-of-life on November 6th, 2024\n" +
142:       'Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.',
143:   );
144: 
145:   consoleSpy.mockRestore();
146: });
147: 
148: test('create: does not warn for non-deprecated models', async () => {
149:   const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
150: 
151:   await client.messages.create({
152:     max_tokens: 1024,
153:     messages: [{ content: 'Hello, world', role: 'user' }],
154:     model: 'claude-3-5-sonnet-20240620',
155:   });
156: 
157:   expect(consoleSpy).not.toHaveBeenCalled();
158: 
159:   consoleSpy.mockRestore();
160: });
````

## File: tests/api-resources/completions.test.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic({
 6:   apiKey: 'my-anthropic-api-key',
 7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
 8: });
 9: 
10: describe('resource completions', () => {
11:   test('create: only required params', async () => {
12:     const responsePromise = client.completions.create({
13:       max_tokens_to_sample: 256,
14:       model: 'claude-3-7-sonnet-latest',
15:       prompt: '\n\nHuman: Hello, world!\n\nAssistant:',
16:     });
17:     const rawResponse = await responsePromise.asResponse();
18:     expect(rawResponse).toBeInstanceOf(Response);
19:     const response = await responsePromise;
20:     expect(response).not.toBeInstanceOf(Response);
21:     const dataAndResponse = await responsePromise.withResponse();
22:     expect(dataAndResponse.data).toBe(response);
23:     expect(dataAndResponse.response).toBe(rawResponse);
24:   });
25: 
26:   test('create: required and optional params', async () => {
27:     const response = await client.completions.create({
28:       max_tokens_to_sample: 256,
29:       model: 'claude-3-7-sonnet-latest',
30:       prompt: '\n\nHuman: Hello, world!\n\nAssistant:',
31:       metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
32:       stop_sequences: ['string'],
33:       stream: false,
34:       temperature: 1,
35:       top_k: 5,
36:       top_p: 0.7,
37:       betas: ['string'],
38:     });
39:   });
40: });
````

## File: tests/api-resources/MessageStream.test.ts
````typescript
  1: import { PassThrough } from 'stream';
  2: import Anthropic, { APIConnectionError, APIUserAbortError } from '@anthropic-ai/sdk';
  3: import { Message, MessageStreamEvent } from '@anthropic-ai/sdk/resources/messages';
  4: import {
  5:   type Fetch,
  6:   type RequestInfo,
  7:   type RequestInit,
  8:   type Response,
  9: } from '@anthropic-ai/sdk/internal/builtin-types';
 10: 
 11: function assertNever(x: never): never {
 12:   throw new Error(`unreachable: ${x}`);
 13: }
 14: 
 15: async function* messageIterable(message: Message): AsyncGenerator<MessageStreamEvent> {
 16:   yield {
 17:     type: 'message_start',
 18:     // @ts-ignore
 19:     message: { ...message, content: [], stop_reason: null, stop_sequence: null },
 20:   };
 21: 
 22:   for (let idx = 0; idx < message.content.length; idx++) {
 23:     const content = message.content[idx]!;
 24:     yield {
 25:       type: 'content_block_start',
 26:       content_block:
 27:         content.type === 'text' ? { type: 'text', text: '', citations: null }
 28:         : content.type === 'tool_use' ?
 29:           {
 30:             type: 'tool_use',
 31:             id: 'toolu_01Up7oRoHeGvhded7n66nPzP',
 32:             name: 'get_weather',
 33:             input: {},
 34:           }
 35:         : content.type === 'thinking' ? { type: 'thinking', thinking: '', signature: '' }
 36:         : content.type === 'redacted_thinking' ? { type: 'redacted_thinking', data: '' }
 37:         : content.type === 'server_tool_use' ?
 38:           {
 39:             type: 'server_tool_use',
 40:             id: 'toolu_01Up7oRoHeGvhded7n66nPzP',
 41:             name: 'web_search',
 42:             input: {},
 43:           }
 44:         : content.type === 'web_search_tool_result' ?
 45:           {
 46:             type: 'web_search_tool_result',
 47:             tool_use_id: 'toolu_01Up7oRoHeGvhded7n66nPzP',
 48:             content: [],
 49:           }
 50:         : assertNever(content),
 51:       index: idx,
 52:     };
 53: 
 54:     if (content.type === 'text') {
 55:       for (let chunk = 0; chunk * 5 < content.text.length; chunk++) {
 56:         yield {
 57:           type: 'content_block_delta',
 58:           delta: { type: 'text_delta', text: content.text.slice(chunk * 5, (chunk + 1) * 5) },
 59:           index: idx,
 60:         };
 61:       }
 62:     } else if (content.type === 'tool_use') {
 63:       const jsonString = JSON.stringify(content.input);
 64: 
 65:       for (let chunk = 0; chunk * 5 < jsonString.length; chunk++) {
 66:         yield {
 67:           type: 'content_block_delta',
 68:           delta: { type: 'input_json_delta', partial_json: jsonString.slice(chunk * 5, (chunk + 1) * 5) },
 69:           index: idx,
 70:         };
 71:       }
 72:     } else if (content.type === 'thinking') {
 73:       throw new Error('thinking not implemented yet');
 74:     } else if (content.type === 'redacted_thinking') {
 75:       throw new Error('redacted_thinking not implemented yet');
 76:     } else if (content.type === 'server_tool_use') {
 77:       throw new Error('server_tool_use not implemented yet');
 78:     } else if (content.type === 'web_search_tool_result') {
 79:       throw new Error('web_search_tool_result not implemented yet');
 80:     } else {
 81:       assertNever(content);
 82:     }
 83: 
 84:     yield {
 85:       type: 'content_block_stop',
 86:       index: idx,
 87:     };
 88:   }
 89: 
 90:   yield {
 91:     type: 'message_delta',
 92:     usage: {
 93:       output_tokens: 6,
 94:       input_tokens: null,
 95:       cache_creation_input_tokens: null,
 96:       cache_read_input_tokens: null,
 97:       server_tool_use: null,
 98:     },
 99:     // @ts-ignore
100:     delta: { stop_reason: message.stop_reason, stop_sequence: message.stop_sequence },
101:   };
102: 
103:   yield {
104:     type: 'message_stop',
105:   };
106: }
107: 
108: function mockFetch(): {
109:   fetch: Fetch;
110:   handleRequest: (handle: Fetch) => void;
111:   handleMessageStreamEvents: (iter: AsyncIterable<MessageStreamEvent>) => void;
112: } {
113:   const queue: Promise<typeof fetch>[] = [];
114:   const readResolvers: ((handler: typeof fetch) => void)[] = [];
115: 
116:   let index = 0;
117: 
118:   async function fetch(req: string | RequestInfo, init?: RequestInit): Promise<Response> {
119:     const idx = index++;
120:     if (!queue[idx]) {
121:       queue.push(new Promise((resolve) => readResolvers.push(resolve)));
122:     }
123: 
124:     const handler = await queue[idx]!;
125:     return await Promise.race([
126:       handler(req, init),
127:       new Promise<Response>((_resolve, reject) => {
128:         if (init?.signal?.aborted) {
129:           // @ts-ignore
130:           reject(new DOMException('The user aborted a request.', 'AbortError'));
131:           return;
132:         }
133:         init?.signal?.addEventListener('abort', (_e) => {
134:           // @ts-ignore
135:           reject(new DOMException('The user aborted a request.', 'AbortError'));
136:         });
137:       }),
138:     ]);
139:   }
140: 
141:   function handleRequest(handler: typeof fetch): void {
142:     if (readResolvers.length) {
143:       const resolver = readResolvers.shift()!;
144:       resolver(handler);
145:       return;
146:     }
147:     queue.push(Promise.resolve(handler));
148:   }
149: 
150:   function handleMessageStreamEvents(iter: AsyncIterable<MessageStreamEvent>) {
151:     handleRequest(async () => {
152:       const stream = new PassThrough();
153:       (async () => {
154:         for await (const chunk of iter) {
155:           stream.write(`event: ${chunk.type}\n`);
156:           stream.write(`data: ${JSON.stringify(chunk)}\n\n`);
157:         }
158:         stream.end(`done: [DONE]\n\n`);
159:       })();
160:       return new Response(stream, {
161:         headers: {
162:           'Content-Type': 'text/event-stream',
163:           'Transfer-Encoding': 'chunked',
164:         },
165:       });
166:     });
167:   }
168: 
169:   return { fetch: fetch as any, handleRequest, handleMessageStreamEvents };
170: }
171: 
172: describe('MessageStream class', () => {
173:   it('matches snapshot', async () => {
174:     const { fetch, handleMessageStreamEvents } = mockFetch();
175: 
176:     const anthropic = new Anthropic({ apiKey: '...', fetch });
177: 
178:     handleMessageStreamEvents(
179:       messageIterable({
180:         type: 'message',
181:         id: 'msg_01hhptzfxdaeehfxfv070yb6b8',
182:         role: 'assistant',
183:         content: [{ type: 'text', text: 'Hello there!', citations: null }],
184:         model: 'claude-3-opus-20240229',
185:         stop_reason: 'end_turn',
186:         stop_sequence: null,
187:         usage: {
188:           output_tokens: 6,
189:           input_tokens: 10,
190:           cache_creation_input_tokens: null,
191:           cache_read_input_tokens: null,
192:           server_tool_use: null,
193:           service_tier: 'standard',
194:         },
195:       }),
196:     );
197: 
198:     const stream = anthropic.messages.stream({
199:       max_tokens: 1024,
200:       model: 'claude-3-opus-20240229',
201:       messages: [{ role: 'user', content: 'Say hello there!' }],
202:     });
203: 
204:     const events: any[] = [];
205:     const addEvent = (type: string, ...args: any[]) => {
206:       events.push({ type, args: args.map((arg) => JSON.stringify(arg)) });
207:     };
208: 
209:     for (const eventType of [
210:       'connect',
211:       'streamEvent',
212:       'text',
213:       'message',
214:       'contentBlock',
215:       'finalMessage',
216:       'error',
217:       'abort',
218:       'end',
219:     ] as const) {
220:       stream.on(eventType, addEvent.bind(null, eventType));
221:     }
222: 
223:     await stream.done();
224: 
225:     expect(events.map((event) => event.type)).toMatchInlineSnapshot(`
226:            [
227:              "connect",
228:              "streamEvent",
229:              "streamEvent",
230:              "streamEvent",
231:              "text",
232:              "streamEvent",
233:              "text",
234:              "streamEvent",
235:              "text",
236:              "streamEvent",
237:              "contentBlock",
238:              "streamEvent",
239:              "streamEvent",
240:              "message",
241:              "finalMessage",
242:              "end",
243:            ]
244:         `);
245: 
246:     expect(events).toMatchInlineSnapshot(`
247:       [
248:         {
249:           "args": [],
250:           "type": "connect",
251:         },
252:         {
253:           "args": [
254:             "{"type":"message_start","message":{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}}",
255:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
256:           ],
257:           "type": "streamEvent",
258:         },
259:         {
260:           "args": [
261:             "{"type":"content_block_start","content_block":{"type":"text","text":"","citations":null},"index":0}",
262:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"","citations":null}],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
263:           ],
264:           "type": "streamEvent",
265:         },
266:         {
267:           "args": [
268:             "{"type":"content_block_delta","delta":{"type":"text_delta","text":"Hello"},"index":0}",
269:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello","citations":null}],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
270:           ],
271:           "type": "streamEvent",
272:         },
273:         {
274:           "args": [
275:             ""Hello"",
276:             ""Hello"",
277:           ],
278:           "type": "text",
279:         },
280:         {
281:           "args": [
282:             "{"type":"content_block_delta","delta":{"type":"text_delta","text":" ther"},"index":0}",
283:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello ther","citations":null}],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
284:           ],
285:           "type": "streamEvent",
286:         },
287:         {
288:           "args": [
289:             "" ther"",
290:             ""Hello ther"",
291:           ],
292:           "type": "text",
293:         },
294:         {
295:           "args": [
296:             "{"type":"content_block_delta","delta":{"type":"text_delta","text":"e!"},"index":0}",
297:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
298:           ],
299:           "type": "streamEvent",
300:         },
301:         {
302:           "args": [
303:             ""e!"",
304:             ""Hello there!"",
305:           ],
306:           "type": "text",
307:         },
308:         {
309:           "args": [
310:             "{"type":"content_block_stop","index":0}",
311:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":null,"stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
312:           ],
313:           "type": "streamEvent",
314:         },
315:         {
316:           "args": [
317:             "{"type":"text","text":"Hello there!","citations":null}",
318:           ],
319:           "type": "contentBlock",
320:         },
321:         {
322:           "args": [
323:             "{"type":"message_delta","usage":{"output_tokens":6,"input_tokens":null,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null},"delta":{"stop_reason":"end_turn","stop_sequence":null}}",
324:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":"end_turn","stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
325:           ],
326:           "type": "streamEvent",
327:         },
328:         {
329:           "args": [
330:             "{"type":"message_stop"}",
331:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":"end_turn","stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
332:           ],
333:           "type": "streamEvent",
334:         },
335:         {
336:           "args": [
337:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":"end_turn","stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
338:           ],
339:           "type": "message",
340:         },
341:         {
342:           "args": [
343:             "{"type":"message","id":"msg_01hhptzfxdaeehfxfv070yb6b8","role":"assistant","content":[{"type":"text","text":"Hello there!","citations":null}],"model":"claude-3-opus-20240229","stop_reason":"end_turn","stop_sequence":null,"usage":{"output_tokens":6,"input_tokens":10,"cache_creation_input_tokens":null,"cache_read_input_tokens":null,"server_tool_use":null,"service_tier":"standard"}}",
344:           ],
345:           "type": "finalMessage",
346:         },
347:         {
348:           "args": [],
349:           "type": "end",
350:         },
351:       ]
352:     `);
353: 
354:     expect(await stream.finalText()).toMatchInlineSnapshot(`"Hello there!"`);
355: 
356:     expect(await stream.finalMessage()).toMatchInlineSnapshot(`
357:       {
358:         "content": [
359:           {
360:             "citations": null,
361:             "text": "Hello there!",
362:             "type": "text",
363:           },
364:         ],
365:         "id": "msg_01hhptzfxdaeehfxfv070yb6b8",
366:         "model": "claude-3-opus-20240229",
367:         "role": "assistant",
368:         "stop_reason": "end_turn",
369:         "stop_sequence": null,
370:         "type": "message",
371:         "usage": {
372:           "cache_creation_input_tokens": null,
373:           "cache_read_input_tokens": null,
374:           "input_tokens": 10,
375:           "output_tokens": 6,
376:           "server_tool_use": null,
377:           "service_tier": "standard",
378:         },
379:       }
380:     `);
381:   });
382: 
383:   it('aborts on break', async () => {
384:     const { fetch, handleMessageStreamEvents } = mockFetch();
385: 
386:     const anthropic = new Anthropic({ apiKey: '...', fetch });
387: 
388:     const stream = anthropic.messages.stream({
389:       max_tokens: 1024,
390:       model: 'claude-3-opus-20240229',
391:       messages: [{ role: 'user', content: 'Say hello there!' }],
392:     });
393: 
394:     handleMessageStreamEvents(
395:       messageIterable({
396:         type: 'message',
397:         id: 'msg_01hhptzfxdaeehfxfv070yb6b8',
398:         role: 'assistant',
399:         content: [{ type: 'text', text: 'Hello there!', citations: null }],
400:         model: 'claude-3-opus-20240229',
401:         stop_reason: 'end_turn',
402:         stop_sequence: null,
403:         usage: {
404:           output_tokens: 6,
405:           input_tokens: 10,
406:           cache_creation_input_tokens: null,
407:           cache_read_input_tokens: null,
408:           server_tool_use: null,
409:           service_tier: 'standard',
410:         },
411:       }),
412:     );
413: 
414:     for await (const event of stream) {
415:       if (
416:         event.type === 'content_block_delta' &&
417:         event.delta.type == 'text_delta' &&
418:         event.delta.text.includes('He')
419:       ) {
420:         break;
421:       }
422:     }
423: 
424:     await expect(async () => stream.done()).rejects.toThrow(APIUserAbortError);
425: 
426:     expect(stream.aborted).toBe(true);
427:   });
428: 
429:   it('handles network errors', async () => {
430:     const { fetch, handleRequest } = mockFetch();
431: 
432:     const anthropic = new Anthropic({ apiKey: '...', fetch });
433: 
434:     const stream = anthropic.messages.stream(
435:       {
436:         max_tokens: 1024,
437:         model: 'claude-3-7-sonnet-20250219',
438:         messages: [{ role: 'user', content: 'Say hello there!' }],
439:       },
440:       { maxRetries: 0 },
441:     );
442: 
443:     handleRequest(async () => {
444:       throw new Error('mock request error');
445:     });
446: 
447:     async function runStream() {
448:       await stream.done();
449:     }
450: 
451:     await expect(runStream).rejects.toThrow(APIConnectionError);
452:   });
453: 
454:   it('handles network errors on async iterator', async () => {
455:     const { fetch, handleRequest } = mockFetch();
456: 
457:     const anthropic = new Anthropic({ apiKey: '...', fetch });
458: 
459:     const stream = anthropic.messages.stream(
460:       {
461:         max_tokens: 1024,
462:         model: 'claude-3-7-sonnet-20250219',
463:         messages: [{ role: 'user', content: 'Say hello there!' }],
464:       },
465:       { maxRetries: 0 },
466:     );
467: 
468:     handleRequest(async () => {
469:       throw new Error('mock request error');
470:     });
471: 
472:     async function runStream() {
473:       for await (const event of stream) {
474:         if (
475:           event.type === 'content_block_delta' &&
476:           event.delta.type === 'text_delta' &&
477:           event.delta.text.includes('He')
478:         ) {
479:           break;
480:         }
481:       }
482:     }
483: 
484:     await expect(runStream).rejects.toThrow(APIConnectionError);
485:   });
486: });
````

## File: tests/api-resources/models.test.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import Anthropic from '@anthropic-ai/sdk';
 4: 
 5: const client = new Anthropic({
 6:   apiKey: 'my-anthropic-api-key',
 7:   baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
 8: });
 9: 
10: describe('resource models', () => {
11:   test('retrieve', async () => {
12:     const responsePromise = client.models.retrieve('model_id');
13:     const rawResponse = await responsePromise.asResponse();
14:     expect(rawResponse).toBeInstanceOf(Response);
15:     const response = await responsePromise;
16:     expect(response).not.toBeInstanceOf(Response);
17:     const dataAndResponse = await responsePromise.withResponse();
18:     expect(dataAndResponse.data).toBe(response);
19:     expect(dataAndResponse.response).toBe(rawResponse);
20:   });
21: 
22:   test('retrieve: request options and params are passed correctly', async () => {
23:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
24:     await expect(
25:       client.models.retrieve('model_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
26:     ).rejects.toThrow(Anthropic.NotFoundError);
27:   });
28: 
29:   test('retrieve: request options and params are passed correctly', async () => {
30:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
31:     await expect(
32:       client.models.retrieve('model_id', { betas: ['string'] }, { path: '/_stainless_unknown_path' }),
33:     ).rejects.toThrow(Anthropic.NotFoundError);
34:   });
35: 
36:   test('list', async () => {
37:     const responsePromise = client.models.list();
38:     const rawResponse = await responsePromise.asResponse();
39:     expect(rawResponse).toBeInstanceOf(Response);
40:     const response = await responsePromise;
41:     expect(response).not.toBeInstanceOf(Response);
42:     const dataAndResponse = await responsePromise.withResponse();
43:     expect(dataAndResponse.data).toBe(response);
44:     expect(dataAndResponse.response).toBe(rawResponse);
45:   });
46: 
47:   test('list: request options and params are passed correctly', async () => {
48:     // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
49:     await expect(
50:       client.models.list(
51:         { after_id: 'after_id', before_id: 'before_id', limit: 1, betas: ['string'] },
52:         { path: '/_stainless_unknown_path' },
53:       ),
54:     ).rejects.toThrow(Anthropic.NotFoundError);
55:   });
56: });
````

## File: tests/internal/decoders/line.test.ts
````typescript
  1: import { findDoubleNewlineIndex, LineDecoder } from '@anthropic-ai/sdk/internal/decoders/line';
  2: 
  3: function decodeChunks(chunks: string[], { flush }: { flush: boolean } = { flush: false }): string[] {
  4:   const decoder = new LineDecoder();
  5:   const lines: string[] = [];
  6:   for (const chunk of chunks) {
  7:     lines.push(...decoder.decode(chunk));
  8:   }
  9: 
 10:   if (flush) {
 11:     lines.push(...decoder.flush());
 12:   }
 13: 
 14:   return lines;
 15: }
 16: 
 17: describe('line decoder', () => {
 18:   test('basic', () => {
 19:     // baz is not included because the line hasn't ended yet
 20:     expect(decodeChunks(['foo', ' bar\nbaz'])).toEqual(['foo bar']);
 21:   });
 22: 
 23:   test('basic with \\r', () => {
 24:     expect(decodeChunks(['foo', ' bar\r\nbaz'])).toEqual(['foo bar']);
 25:     expect(decodeChunks(['foo', ' bar\r\nbaz'], { flush: true })).toEqual(['foo bar', 'baz']);
 26:   });
 27: 
 28:   test('trailing new lines', () => {
 29:     expect(decodeChunks(['foo', ' bar', 'baz\n', 'thing\n'])).toEqual(['foo barbaz', 'thing']);
 30:   });
 31: 
 32:   test('trailing new lines with \\r', () => {
 33:     expect(decodeChunks(['foo', ' bar', 'baz\r\n', 'thing\r\n'])).toEqual(['foo barbaz', 'thing']);
 34:   });
 35: 
 36:   test('escaped new lines', () => {
 37:     expect(decodeChunks(['foo', ' bar\\nbaz\n'])).toEqual(['foo bar\\nbaz']);
 38:   });
 39: 
 40:   test('escaped new lines with \\r', () => {
 41:     expect(decodeChunks(['foo', ' bar\\r\\nbaz\n'])).toEqual(['foo bar\\r\\nbaz']);
 42:   });
 43: 
 44:   test('\\r & \\n split across multiple chunks', () => {
 45:     expect(decodeChunks(['foo\r', '\n', 'bar'], { flush: true })).toEqual(['foo', 'bar']);
 46:   });
 47: 
 48:   test('single \\r', () => {
 49:     expect(decodeChunks(['foo\r', 'bar'], { flush: true })).toEqual(['foo', 'bar']);
 50:   });
 51: 
 52:   test('double \\r', () => {
 53:     expect(decodeChunks(['foo\r', 'bar\r'], { flush: true })).toEqual(['foo', 'bar']);
 54:     expect(decodeChunks(['foo\r', '\r', 'bar'], { flush: true })).toEqual(['foo', '', 'bar']);
 55:     // implementation detail that we don't yield the single \r line until a new \r or \n is encountered
 56:     expect(decodeChunks(['foo\r', '\r', 'bar'], { flush: false })).toEqual(['foo']);
 57:   });
 58: 
 59:   test('double \\r then \\r\\n', () => {
 60:     expect(decodeChunks(['foo\r', '\r', '\r', '\n', 'bar', '\n'])).toEqual(['foo', '', '', 'bar']);
 61:     expect(decodeChunks(['foo\n', '\n', '\n', 'bar', '\n'])).toEqual(['foo', '', '', 'bar']);
 62:   });
 63: 
 64:   test('double newline', () => {
 65:     expect(decodeChunks(['foo\n\nbar'], { flush: true })).toEqual(['foo', '', 'bar']);
 66:     expect(decodeChunks(['foo', '\n', '\nbar'], { flush: true })).toEqual(['foo', '', 'bar']);
 67:     expect(decodeChunks(['foo\n', '\n', 'bar'], { flush: true })).toEqual(['foo', '', 'bar']);
 68:     expect(decodeChunks(['foo', '\n', '\n', 'bar'], { flush: true })).toEqual(['foo', '', 'bar']);
 69:   });
 70: 
 71:   test('multi-byte characters across chunks', () => {
 72:     const decoder = new LineDecoder();
 73: 
 74:     // bytes taken from the string 'известни' and arbitrarily split
 75:     // so that some multi-byte characters span multiple chunks
 76:     expect(decoder.decode(new Uint8Array([0xd0]))).toHaveLength(0);
 77:     expect(decoder.decode(new Uint8Array([0xb8, 0xd0, 0xb7, 0xd0]))).toHaveLength(0);
 78:     expect(
 79:       decoder.decode(new Uint8Array([0xb2, 0xd0, 0xb5, 0xd1, 0x81, 0xd1, 0x82, 0xd0, 0xbd, 0xd0, 0xb8])),
 80:     ).toHaveLength(0);
 81: 
 82:     const decoded = decoder.decode(new Uint8Array([0xa]));
 83:     expect(decoded).toEqual(['известни']);
 84:   });
 85: 
 86:   test('flushing trailing newlines', () => {
 87:     expect(decodeChunks(['foo\n', '\nbar'], { flush: true })).toEqual(['foo', '', 'bar']);
 88:   });
 89: 
 90:   test('flushing empty buffer', () => {
 91:     expect(decodeChunks([], { flush: true })).toEqual([]);
 92:   });
 93: });
 94: 
 95: describe('findDoubleNewlineIndex', () => {
 96:   test('finds \\n\\n', () => {
 97:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\n\nbar'))).toBe(5);
 98:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\n\nbar'))).toBe(2);
 99:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\n\n'))).toBe(5);
100:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\n\n'))).toBe(2);
101:   });
102: 
103:   test('finds \\r\\r', () => {
104:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\rbar'))).toBe(5);
105:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\r\rbar'))).toBe(2);
106:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\r'))).toBe(5);
107:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\r\r'))).toBe(2);
108:   });
109: 
110:   test('finds \\r\\n\\r\\n', () => {
111:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r\nbar'))).toBe(7);
112:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\r\n\r\nbar'))).toBe(4);
113:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r\n'))).toBe(7);
114:     expect(findDoubleNewlineIndex(new TextEncoder().encode('\r\n\r\n'))).toBe(4);
115:   });
116: 
117:   test('returns -1 when no double newline found', () => {
118:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\nbar'))).toBe(-1);
119:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\rbar'))).toBe(-1);
120:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\nbar'))).toBe(-1);
121:     expect(findDoubleNewlineIndex(new TextEncoder().encode(''))).toBe(-1);
122:   });
123: 
124:   test('handles incomplete patterns', () => {
125:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n\r'))).toBe(-1);
126:     expect(findDoubleNewlineIndex(new TextEncoder().encode('foo\r\n'))).toBe(-1);
127:   });
128: });
````

## File: tests/lib/partial-json.test.ts
````typescript
 1: import { partialParse } from '@anthropic-ai/sdk/_vendor/partial-json-parser/parser';
 2: 
 3: describe('partialParse', () => {
 4:   test('a valid complete JSON string', () => {
 5:     expect(partialParse(`{"foo": "bar", "thing": "baz"}`)).toEqual({ foo: 'bar', thing: 'baz' });
 6:   });
 7: 
 8:   test('a valid partial JSON string', () => {
 9:     expect(partialParse(`{"foo": "bar", "thing": "`)).toEqual({ foo: 'bar' });
10:   });
11: 
12:   test('empty JSON object', () => {
13:     expect(partialParse(`{}`)).toEqual({});
14:   });
15: 
16:   test('incomplete nested JSON object', () => {
17:     expect(partialParse(`{"foo": {"bar": "baz"}`)).toEqual({ foo: { bar: 'baz' } });
18:   });
19: 
20:   test('complete nested JSON object', () => {
21:     expect(partialParse(`{"foo": {"bar": "baz"}}`)).toEqual({ foo: { bar: 'baz' } });
22:   });
23: 
24:   test('JSON array with incomplete object', () => {
25:     expect(partialParse(`{"foo": [{"bar": "baz"}`)).toEqual({ foo: [{ bar: 'baz' }] });
26:   });
27: 
28:   test('JSON array with complete objects', () => {
29:     expect(partialParse(`{"foo": [{"bar": "baz"}, {"qux": "quux"}]}`)).toEqual({
30:       foo: [{ bar: 'baz' }, { qux: 'quux' }],
31:     });
32:   });
33: 
34:   test('string with escaped characters', () => {
35:     expect(partialParse(`{"foo": "bar\\\"baz"}`)).toEqual({ foo: 'bar"baz' });
36:   });
37: 
38:   test('string with incomplete escape sequence', () => {
39:     expect(partialParse(`{"foo": "bar\\`)).toEqual({});
40:   });
41: 
42:   test('invalid JSON string gracefully', () => {
43:     expect(partialParse(`{"foo": "bar", "thing": "baz"`)).toEqual({ foo: 'bar', thing: 'baz' });
44:   });
45: 
46:   test('JSON string with null value', () => {
47:     expect(partialParse(`{"foo": null, "bar": "baz"}`)).toEqual({ foo: null, bar: 'baz' });
48:   });
49: 
50:   test('JSON string with number values', () => {
51:     expect(partialParse(`{"foo": 123, "bar": 45.67}`)).toEqual({ foo: 123, bar: 45.67 });
52:   });
53: 
54:   test('JSON string with boolean values', () => {
55:     expect(partialParse(`{"foo": true, "bar": false}`)).toEqual({ foo: true, bar: false });
56:   });
57: 
58:   test('JSON string with mixed data types', () => {
59:     expect(partialParse(`{"foo": "bar", "baz": 123, "qux": true, "quux": null}`)).toEqual({
60:       foo: 'bar',
61:       baz: 123,
62:       qux: true,
63:       quux: null,
64:     });
65:   });
66: 
67:   test('JSON string with partial literal tokens', () => {
68:     expect(partialParse(`{"foo": "bar", "baz": nul`)).toEqual({ foo: 'bar' });
69:     expect(partialParse(`{"foo": "bar", "baz": tr`)).toEqual({ foo: 'bar' });
70:     expect(partialParse(`{"foo": "bar", "baz": truee`)).toEqual({ foo: 'bar' });
71:     expect(partialParse(`{"foo": "bar", "baz": fal`)).toEqual({ foo: 'bar' });
72:   });
73: 
74:   test('deeply nested JSON objects', () => {
75:     expect(partialParse(`{"a": {"b": {"c": {"d": "e"}}}}`)).toEqual({ a: { b: { c: { d: 'e' } } } });
76:   });
77: 
78:   test('deeply nested partial JSON objects', () => {
79:     expect(partialParse(`{"a": {"b": {"c": {"d": "e`)).toEqual({ a: { b: { c: {} } } });
80:   });
81: });
````

## File: tests/utils/typing.ts
````typescript
1: type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
2: 
3: export const expectType = <T>(_expression: T): void => {
4:   return;
5: };
6: 
7: export const compareType = <T1, T2>(_expression: Equal<T1, T2>): void => {
8:   return;
9: };
````

## File: tests/base64.test.ts
````typescript
 1: import { fromBase64, toBase64 } from '@anthropic-ai/sdk/internal/utils/base64';
 2: 
 3: describe.each(['Buffer', 'atob'])('with %s', (mode) => {
 4:   let originalBuffer: BufferConstructor;
 5:   beforeAll(() => {
 6:     if (mode === 'atob') {
 7:       originalBuffer = globalThis.Buffer;
 8:       // @ts-expect-error Can't assign undefined to BufferConstructor
 9:       delete globalThis.Buffer;
10:     }
11:   });
12:   afterAll(() => {
13:     if (mode === 'atob') {
14:       globalThis.Buffer = originalBuffer;
15:     }
16:   });
17:   test('toBase64', () => {
18:     const testCases = [
19:       {
20:         input: 'hello world',
21:         expected: 'aGVsbG8gd29ybGQ=',
22:       },
23:       {
24:         input: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
25:         expected: 'aGVsbG8gd29ybGQ=',
26:       },
27:       {
28:         input: undefined,
29:         expected: '',
30:       },
31:       {
32:         input: new Uint8Array([
33:           229, 102, 215, 230, 65, 22, 46, 87, 243, 176, 99, 99, 31, 174, 8, 242, 83, 142, 169, 64, 122, 123,
34:           193, 71,
35:         ]),
36:         expected: '5WbX5kEWLlfzsGNjH64I8lOOqUB6e8FH',
37:       },
38:       {
39:         input: '✓',
40:         expected: '4pyT',
41:       },
42:       {
43:         input: new Uint8Array([226, 156, 147]),
44:         expected: '4pyT',
45:       },
46:     ];
47: 
48:     testCases.forEach(({ input, expected }) => {
49:       expect(toBase64(input)).toBe(expected);
50:     });
51:   });
52: 
53:   test('fromBase64', () => {
54:     const testCases = [
55:       {
56:         input: 'aGVsbG8gd29ybGQ=',
57:         expected: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
58:       },
59:       {
60:         input: '',
61:         expected: new Uint8Array([]),
62:       },
63:       {
64:         input: '5WbX5kEWLlfzsGNjH64I8lOOqUB6e8FH',
65:         expected: new Uint8Array([
66:           229, 102, 215, 230, 65, 22, 46, 87, 243, 176, 99, 99, 31, 174, 8, 242, 83, 142, 169, 64, 122, 123,
67:           193, 71,
68:         ]),
69:       },
70:       {
71:         input: '4pyT',
72:         expected: new Uint8Array([226, 156, 147]),
73:       },
74:     ];
75: 
76:     testCases.forEach(({ input, expected }) => {
77:       expect(fromBase64(input)).toEqual(expected);
78:     });
79:   });
80: });
````

## File: tests/buildHeaders.test.ts
````typescript
 1: import { inspect } from 'node:util';
 2: import { buildHeaders, type HeadersLike, type NullableHeaders } from '@anthropic-ai/sdk/internal/headers';
 3: 
 4: function inspectNullableHeaders(headers: NullableHeaders) {
 5:   return `NullableHeaders {${[
 6:     ...[...headers.values.entries()].map(([name, value]) => ` ${inspect(name)}: ${inspect(value)}`),
 7:     ...[...headers.nulls].map((name) => ` ${inspect(name)}: null`),
 8:   ].join(', ')} }`;
 9: }
10: 
11: describe('buildHeaders', () => {
12:   const cases: [HeadersLike[], string][] = [
13:     [[new Headers({ 'content-type': 'text/plain' })], `NullableHeaders { 'content-type': 'text/plain' }`],
14:     [
15:       [
16:         {
17:           'content-type': 'text/plain',
18:         },
19:         {
20:           'Content-Type': undefined,
21:         },
22:       ],
23:       `NullableHeaders { 'content-type': 'text/plain' }`,
24:     ],
25:     [
26:       [
27:         {
28:           'content-type': 'text/plain',
29:         },
30:         {
31:           'Content-Type': null,
32:         },
33:       ],
34:       `NullableHeaders { 'content-type': null }`,
35:     ],
36:     [
37:       [
38:         {
39:           cookie: 'name1=value1',
40:           Cookie: 'name2=value2',
41:         },
42:       ],
43:       `NullableHeaders { 'cookie': 'name2=value2' }`,
44:     ],
45:     [
46:       [
47:         {
48:           cookie: 'name1=value1',
49:           Cookie: undefined,
50:         },
51:       ],
52:       `NullableHeaders { 'cookie': 'name1=value1' }`,
53:     ],
54:     [
55:       [
56:         {
57:           cookie: ['name1=value1', 'name2=value2'],
58:         },
59:       ],
60:       `NullableHeaders { 'cookie': 'name1=value1; name2=value2' }`,
61:     ],
62:     [
63:       [
64:         {
65:           'x-foo': ['name1=value1', 'name2=value2'],
66:         },
67:       ],
68:       `NullableHeaders { 'x-foo': 'name1=value1, name2=value2' }`,
69:     ],
70:     [
71:       [
72:         [
73:           ['cookie', 'name1=value1'],
74:           ['cookie', 'name2=value2'],
75:           ['Cookie', 'name3=value3'],
76:         ],
77:       ],
78:       `NullableHeaders { 'cookie': 'name1=value1; name2=value2; name3=value3' }`,
79:     ],
80:     [[undefined], `NullableHeaders { }`],
81:     [[null], `NullableHeaders { }`],
82:   ];
83:   for (const [input, expected] of cases) {
84:     test(expected, () => {
85:       expect(inspectNullableHeaders(buildHeaders(input))).toEqual(expected);
86:     });
87:   }
88: });
````

## File: tests/form.test.ts
````typescript
 1: import { multipartFormRequestOptions, createForm } from '@anthropic-ai/sdk/internal/uploads';
 2: import { toFile } from '@anthropic-ai/sdk/core/uploads';
 3: 
 4: describe('form data validation', () => {
 5:   test('valid values do not error', async () => {
 6:     await multipartFormRequestOptions(
 7:       {
 8:         body: {
 9:           foo: 'foo',
10:           string: 1,
11:           bool: true,
12:           file: await toFile(Buffer.from('some-content')),
13:           blob: new Blob(['Some content'], { type: 'text/plain' }),
14:         },
15:       },
16:       fetch,
17:     );
18:   });
19: 
20:   test('null', async () => {
21:     await expect(() =>
22:       multipartFormRequestOptions(
23:         {
24:           body: {
25:             null: null,
26:           },
27:         },
28:         fetch,
29:       ),
30:     ).rejects.toThrow(TypeError);
31:   });
32: 
33:   test('undefined is stripped', async () => {
34:     const form = await createForm(
35:       {
36:         foo: undefined,
37:         bar: 'baz',
38:       },
39:       fetch,
40:     );
41:     expect(form.has('foo')).toBe(false);
42:     expect(form.get('bar')).toBe('baz');
43:   });
44: 
45:   test('nested undefined property is stripped', async () => {
46:     const form = await createForm(
47:       {
48:         bar: {
49:           baz: undefined,
50:         },
51:       },
52:       fetch,
53:     );
54:     expect(Array.from(form.entries())).toEqual([]);
55: 
56:     const form2 = await createForm(
57:       {
58:         bar: {
59:           foo: 'string',
60:           baz: undefined,
61:         },
62:       },
63:       fetch,
64:     );
65:     expect(Array.from(form2.entries())).toEqual([['bar[foo]', 'string']]);
66:   });
67: 
68:   test('nested undefined array item is stripped', async () => {
69:     const form = await createForm(
70:       {
71:         bar: [undefined, undefined],
72:       },
73:       fetch,
74:     );
75:     expect(Array.from(form.entries())).toEqual([]);
76: 
77:     const form2 = await createForm(
78:       {
79:         bar: [undefined, 'foo'],
80:       },
81:       fetch,
82:     );
83:     expect(Array.from(form2.entries())).toEqual([['bar[]', 'foo']]);
84:   });
85: });
````

## File: tests/index.test.ts
````typescript
  1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  2: 
  3: import { APIPromise } from '@anthropic-ai/sdk/core/api-promise';
  4: 
  5: import util from 'node:util';
  6: import Anthropic from '@anthropic-ai/sdk';
  7: import { APIUserAbortError } from '@anthropic-ai/sdk';
  8: const defaultFetch = fetch;
  9: 
 10: describe('instantiate client', () => {
 11:   const env = process.env;
 12: 
 13:   beforeEach(() => {
 14:     jest.resetModules();
 15:     process.env = { ...env };
 16:   });
 17: 
 18:   afterEach(() => {
 19:     process.env = env;
 20:   });
 21: 
 22:   describe('defaultHeaders', () => {
 23:     const client = new Anthropic({
 24:       baseURL: 'http://localhost:5000/',
 25:       defaultHeaders: { 'X-My-Default-Header': '2' },
 26:       apiKey: 'my-anthropic-api-key',
 27:     });
 28: 
 29:     test('they are used in the request', () => {
 30:       const { req } = client.buildRequest({ path: '/foo', method: 'post' });
 31:       expect(req.headers.get('x-my-default-header')).toEqual('2');
 32:     });
 33: 
 34:     test('can ignore `undefined` and leave the default', () => {
 35:       const { req } = client.buildRequest({
 36:         path: '/foo',
 37:         method: 'post',
 38:         headers: { 'X-My-Default-Header': undefined },
 39:       });
 40:       expect(req.headers.get('x-my-default-header')).toEqual('2');
 41:     });
 42: 
 43:     test('can be removed with `null`', () => {
 44:       const { req } = client.buildRequest({
 45:         path: '/foo',
 46:         method: 'post',
 47:         headers: { 'X-My-Default-Header': null },
 48:       });
 49:       expect(req.headers.has('x-my-default-header')).toBe(false);
 50:     });
 51:   });
 52:   describe('logging', () => {
 53:     const env = process.env;
 54: 
 55:     beforeEach(() => {
 56:       process.env = { ...env };
 57:       process.env['ANTHROPIC_LOG'] = undefined;
 58:     });
 59: 
 60:     afterEach(() => {
 61:       process.env = env;
 62:     });
 63: 
 64:     const forceAPIResponseForClient = async (client: Anthropic) => {
 65:       await new APIPromise(
 66:         client,
 67:         Promise.resolve({
 68:           response: new Response(),
 69:           controller: new AbortController(),
 70:           requestLogID: 'log_000000',
 71:           retryOfRequestLogID: undefined,
 72:           startTime: Date.now(),
 73:           options: {
 74:             method: 'get',
 75:             path: '/',
 76:           },
 77:         }),
 78:       );
 79:     };
 80: 
 81:     test('debug logs when log level is debug', async () => {
 82:       const debugMock = jest.fn();
 83:       const logger = {
 84:         debug: debugMock,
 85:         info: jest.fn(),
 86:         warn: jest.fn(),
 87:         error: jest.fn(),
 88:       };
 89: 
 90:       const client = new Anthropic({ logger: logger, logLevel: 'debug', apiKey: 'my-anthropic-api-key' });
 91: 
 92:       await forceAPIResponseForClient(client);
 93:       expect(debugMock).toHaveBeenCalled();
 94:     });
 95: 
 96:     test('default logLevel is warn', async () => {
 97:       const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
 98:       expect(client.logLevel).toBe('warn');
 99:     });
100: 
101:     test('debug logs are skipped when log level is info', async () => {
102:       const debugMock = jest.fn();
103:       const logger = {
104:         debug: debugMock,
105:         info: jest.fn(),
106:         warn: jest.fn(),
107:         error: jest.fn(),
108:       };
109: 
110:       const client = new Anthropic({ logger: logger, logLevel: 'info', apiKey: 'my-anthropic-api-key' });
111: 
112:       await forceAPIResponseForClient(client);
113:       expect(debugMock).not.toHaveBeenCalled();
114:     });
115: 
116:     test('debug logs happen with debug env var', async () => {
117:       const debugMock = jest.fn();
118:       const logger = {
119:         debug: debugMock,
120:         info: jest.fn(),
121:         warn: jest.fn(),
122:         error: jest.fn(),
123:       };
124: 
125:       process.env['ANTHROPIC_LOG'] = 'debug';
126:       const client = new Anthropic({ logger: logger, apiKey: 'my-anthropic-api-key' });
127:       expect(client.logLevel).toBe('debug');
128: 
129:       await forceAPIResponseForClient(client);
130:       expect(debugMock).toHaveBeenCalled();
131:     });
132: 
133:     test('warn when env var level is invalid', async () => {
134:       const warnMock = jest.fn();
135:       const logger = {
136:         debug: jest.fn(),
137:         info: jest.fn(),
138:         warn: warnMock,
139:         error: jest.fn(),
140:       };
141: 
142:       process.env['ANTHROPIC_LOG'] = 'not a log level';
143:       const client = new Anthropic({ logger: logger, apiKey: 'my-anthropic-api-key' });
144:       expect(client.logLevel).toBe('warn');
145:       expect(warnMock).toHaveBeenCalledWith(
146:         'process.env[\'ANTHROPIC_LOG\'] was set to "not a log level", expected one of ["off","error","warn","info","debug"]',
147:       );
148:     });
149: 
150:     test('client log level overrides env var', async () => {
151:       const debugMock = jest.fn();
152:       const logger = {
153:         debug: debugMock,
154:         info: jest.fn(),
155:         warn: jest.fn(),
156:         error: jest.fn(),
157:       };
158: 
159:       process.env['ANTHROPIC_LOG'] = 'debug';
160:       const client = new Anthropic({ logger: logger, logLevel: 'off', apiKey: 'my-anthropic-api-key' });
161: 
162:       await forceAPIResponseForClient(client);
163:       expect(debugMock).not.toHaveBeenCalled();
164:     });
165: 
166:     test('no warning logged for invalid env var level + valid client level', async () => {
167:       const warnMock = jest.fn();
168:       const logger = {
169:         debug: jest.fn(),
170:         info: jest.fn(),
171:         warn: warnMock,
172:         error: jest.fn(),
173:       };
174: 
175:       process.env['ANTHROPIC_LOG'] = 'not a log level';
176:       const client = new Anthropic({ logger: logger, logLevel: 'debug', apiKey: 'my-anthropic-api-key' });
177:       expect(client.logLevel).toBe('debug');
178:       expect(warnMock).not.toHaveBeenCalled();
179:     });
180:   });
181: 
182:   describe('defaultQuery', () => {
183:     test('with null query params given', () => {
184:       const client = new Anthropic({
185:         baseURL: 'http://localhost:5000/',
186:         defaultQuery: { apiVersion: 'foo' },
187:         apiKey: 'my-anthropic-api-key',
188:       });
189:       expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/foo?apiVersion=foo');
190:     });
191: 
192:     test('multiple default query params', () => {
193:       const client = new Anthropic({
194:         baseURL: 'http://localhost:5000/',
195:         defaultQuery: { apiVersion: 'foo', hello: 'world' },
196:         apiKey: 'my-anthropic-api-key',
197:       });
198:       expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/foo?apiVersion=foo&hello=world');
199:     });
200: 
201:     test('overriding with `undefined`', () => {
202:       const client = new Anthropic({
203:         baseURL: 'http://localhost:5000/',
204:         defaultQuery: { hello: 'world' },
205:         apiKey: 'my-anthropic-api-key',
206:       });
207:       expect(client.buildURL('/foo', { hello: undefined })).toEqual('http://localhost:5000/foo');
208:     });
209:   });
210: 
211:   test('custom fetch', async () => {
212:     const client = new Anthropic({
213:       baseURL: 'http://localhost:5000/',
214:       apiKey: 'my-anthropic-api-key',
215:       fetch: (url) => {
216:         return Promise.resolve(
217:           new Response(JSON.stringify({ url, custom: true }), {
218:             headers: { 'Content-Type': 'application/json' },
219:           }),
220:         );
221:       },
222:     });
223: 
224:     const response = await client.get('/foo');
225:     expect(response).toEqual({ url: 'http://localhost:5000/foo', custom: true });
226:   });
227: 
228:   test('explicit global fetch', async () => {
229:     // make sure the global fetch type is assignable to our Fetch type
230:     const client = new Anthropic({
231:       baseURL: 'http://localhost:5000/',
232:       apiKey: 'my-anthropic-api-key',
233:       fetch: defaultFetch,
234:     });
235:   });
236: 
237:   test('custom signal', async () => {
238:     const client = new Anthropic({
239:       baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
240:       apiKey: 'my-anthropic-api-key',
241:       fetch: (...args) => {
242:         return new Promise((resolve, reject) =>
243:           setTimeout(
244:             () =>
245:               defaultFetch(...args)
246:                 .then(resolve)
247:                 .catch(reject),
248:             300,
249:           ),
250:         );
251:       },
252:     });
253: 
254:     const controller = new AbortController();
255:     setTimeout(() => controller.abort(), 200);
256: 
257:     const spy = jest.spyOn(client, 'request');
258: 
259:     await expect(client.get('/foo', { signal: controller.signal })).rejects.toThrowError(APIUserAbortError);
260:     expect(spy).toHaveBeenCalledTimes(1);
261:   });
262: 
263:   test('normalized method', async () => {
264:     let capturedRequest: RequestInit | undefined;
265:     const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
266:       capturedRequest = init;
267:       return new Response(JSON.stringify({}), { headers: { 'Content-Type': 'application/json' } });
268:     };
269: 
270:     const client = new Anthropic({
271:       baseURL: 'http://localhost:5000/',
272:       apiKey: 'my-anthropic-api-key',
273:       fetch: testFetch,
274:     });
275: 
276:     await client.patch('/foo');
277:     expect(capturedRequest?.method).toEqual('PATCH');
278:   });
279: 
280:   describe('baseUrl', () => {
281:     test('trailing slash', () => {
282:       const client = new Anthropic({
283:         baseURL: 'http://localhost:5000/custom/path/',
284:         apiKey: 'my-anthropic-api-key',
285:       });
286:       expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
287:     });
288: 
289:     test('no trailing slash', () => {
290:       const client = new Anthropic({
291:         baseURL: 'http://localhost:5000/custom/path',
292:         apiKey: 'my-anthropic-api-key',
293:       });
294:       expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
295:     });
296: 
297:     afterEach(() => {
298:       process.env['ANTHROPIC_BASE_URL'] = undefined;
299:     });
300: 
301:     test('explicit option', () => {
302:       const client = new Anthropic({ baseURL: 'https://example.com', apiKey: 'my-anthropic-api-key' });
303:       expect(client.baseURL).toEqual('https://example.com');
304:     });
305: 
306:     test('env variable', () => {
307:       process.env['ANTHROPIC_BASE_URL'] = 'https://example.com/from_env';
308:       const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
309:       expect(client.baseURL).toEqual('https://example.com/from_env');
310:     });
311: 
312:     test('empty env variable', () => {
313:       process.env['ANTHROPIC_BASE_URL'] = ''; // empty
314:       const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
315:       expect(client.baseURL).toEqual('https://api.anthropic.com');
316:     });
317: 
318:     test('blank env variable', () => {
319:       process.env['ANTHROPIC_BASE_URL'] = '  '; // blank
320:       const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
321:       expect(client.baseURL).toEqual('https://api.anthropic.com');
322:     });
323:   });
324: 
325:   test('maxRetries option is correctly set', () => {
326:     const client = new Anthropic({ maxRetries: 4, apiKey: 'my-anthropic-api-key' });
327:     expect(client.maxRetries).toEqual(4);
328: 
329:     // default
330:     const client2 = new Anthropic({ apiKey: 'my-anthropic-api-key' });
331:     expect(client2.maxRetries).toEqual(2);
332:   });
333: 
334:   describe('withOptions', () => {
335:     test('creates a new client with overridden options', () => {
336:       const client = new Anthropic({
337:         baseURL: 'http://localhost:5000/',
338:         maxRetries: 3,
339:         apiKey: 'my-anthropic-api-key',
340:       });
341: 
342:       const newClient = client.withOptions({
343:         maxRetries: 5,
344:         baseURL: 'http://localhost:5001/',
345:       });
346: 
347:       // Verify the new client has updated options
348:       expect(newClient.maxRetries).toEqual(5);
349:       expect(newClient.baseURL).toEqual('http://localhost:5001/');
350: 
351:       // Verify the original client is unchanged
352:       expect(client.maxRetries).toEqual(3);
353:       expect(client.baseURL).toEqual('http://localhost:5000/');
354: 
355:       // Verify it's a different instance
356:       expect(newClient).not.toBe(client);
357:       expect(newClient.constructor).toBe(client.constructor);
358:     });
359: 
360:     test('inherits options from the parent client', () => {
361:       const client = new Anthropic({
362:         baseURL: 'http://localhost:5000/',
363:         defaultHeaders: { 'X-Test-Header': 'test-value' },
364:         defaultQuery: { 'test-param': 'test-value' },
365:         apiKey: 'my-anthropic-api-key',
366:       });
367: 
368:       const newClient = client.withOptions({
369:         baseURL: 'http://localhost:5001/',
370:       });
371: 
372:       // Test inherited options remain the same
373:       expect(newClient.buildURL('/foo', null)).toEqual('http://localhost:5001/foo?test-param=test-value');
374: 
375:       const { req } = newClient.buildRequest({ path: '/foo', method: 'get' });
376:       expect(req.headers.get('x-test-header')).toEqual('test-value');
377:     });
378: 
379:     test('respects runtime property changes when creating new client', () => {
380:       const client = new Anthropic({
381:         baseURL: 'http://localhost:5000/',
382:         timeout: 1000,
383:         apiKey: 'my-anthropic-api-key',
384:       });
385: 
386:       // Modify the client properties directly after creation
387:       client.baseURL = 'http://localhost:6000/';
388:       client.timeout = 2000;
389: 
390:       // Create a new client with withOptions
391:       const newClient = client.withOptions({
392:         maxRetries: 10,
393:       });
394: 
395:       // Verify the new client uses the updated properties, not the original ones
396:       expect(newClient.baseURL).toEqual('http://localhost:6000/');
397:       expect(newClient.timeout).toEqual(2000);
398:       expect(newClient.maxRetries).toEqual(10);
399: 
400:       // Original client should still have its modified properties
401:       expect(client.baseURL).toEqual('http://localhost:6000/');
402:       expect(client.timeout).toEqual(2000);
403:       expect(client.maxRetries).not.toEqual(10);
404: 
405:       // Verify URL building uses the updated baseURL
406:       expect(newClient.buildURL('/bar', null)).toEqual('http://localhost:6000/bar');
407:     });
408:   });
409: 
410:   test('with environment variable arguments', () => {
411:     // set options via env var
412:     process.env['ANTHROPIC_API_KEY'] = 'my-anthropic-api-key';
413:     const client = new Anthropic();
414:     expect(client.apiKey).toBe('my-anthropic-api-key');
415:   });
416: 
417:   test('with overridden environment variable arguments', () => {
418:     // set options via env var
419:     process.env['ANTHROPIC_API_KEY'] = 'another my-anthropic-api-key';
420:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
421:     expect(client.apiKey).toBe('my-anthropic-api-key');
422:   });
423: });
424: 
425: describe('request building', () => {
426:   const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
427: 
428:   describe('custom headers', () => {
429:     test('handles undefined', () => {
430:       const { req } = client.buildRequest({
431:         path: '/foo',
432:         method: 'post',
433:         body: { value: 'hello' },
434:         headers: { 'X-Foo': 'baz', 'x-foo': 'bar', 'x-Foo': undefined, 'x-baz': 'bam', 'X-Baz': null },
435:       });
436:       expect(req.headers.get('x-foo')).toEqual('bar');
437:       expect(req.headers.get('x-Foo')).toEqual('bar');
438:       expect(req.headers.get('X-Foo')).toEqual('bar');
439:       expect(req.headers.get('x-baz')).toEqual(null);
440:     });
441:   });
442: });
443: 
444: describe('default encoder', () => {
445:   const client = new Anthropic({ apiKey: 'my-anthropic-api-key' });
446: 
447:   class Serializable {
448:     toJSON() {
449:       return { $type: 'Serializable' };
450:     }
451:   }
452:   class Collection<T> {
453:     #things: T[];
454:     constructor(things: T[]) {
455:       this.#things = Array.from(things);
456:     }
457:     toJSON() {
458:       return Array.from(this.#things);
459:     }
460:     [Symbol.iterator]() {
461:       return this.#things[Symbol.iterator];
462:     }
463:   }
464:   for (const jsonValue of [{}, [], { __proto__: null }, new Serializable(), new Collection(['item'])]) {
465:     test(`serializes ${util.inspect(jsonValue)} as json`, () => {
466:       const { req } = client.buildRequest({
467:         path: '/foo',
468:         method: 'post',
469:         body: jsonValue,
470:       });
471:       expect(req.headers).toBeInstanceOf(Headers);
472:       expect(req.headers.get('content-type')).toEqual('application/json');
473:       expect(req.body).toBe(JSON.stringify(jsonValue));
474:     });
475:   }
476: 
477:   const encoder = new TextEncoder();
478:   const asyncIterable = (async function* () {
479:     yield encoder.encode('a\n');
480:     yield encoder.encode('b\n');
481:     yield encoder.encode('c\n');
482:   })();
483:   for (const streamValue of [
484:     [encoder.encode('a\nb\nc\n')][Symbol.iterator](),
485:     new Response('a\nb\nc\n').body,
486:     asyncIterable,
487:   ]) {
488:     test(`converts ${util.inspect(streamValue)} to ReadableStream`, async () => {
489:       const { req } = client.buildRequest({
490:         path: '/foo',
491:         method: 'post',
492:         body: streamValue,
493:       });
494:       expect(req.headers).toBeInstanceOf(Headers);
495:       expect(req.headers.get('content-type')).toEqual(null);
496:       expect(req.body).toBeInstanceOf(ReadableStream);
497:       expect(await new Response(req.body).text()).toBe('a\nb\nc\n');
498:     });
499:   }
500: 
501:   test(`can set content-type for ReadableStream`, async () => {
502:     const { req } = client.buildRequest({
503:       path: '/foo',
504:       method: 'post',
505:       body: new Response('a\nb\nc\n').body,
506:       headers: { 'Content-Type': 'text/plain' },
507:     });
508:     expect(req.headers).toBeInstanceOf(Headers);
509:     expect(req.headers.get('content-type')).toEqual('text/plain');
510:     expect(req.body).toBeInstanceOf(ReadableStream);
511:     expect(await new Response(req.body).text()).toBe('a\nb\nc\n');
512:   });
513: });
514: 
515: describe('retries', () => {
516:   test('retry on timeout', async () => {
517:     let count = 0;
518:     const testFetch = async (
519:       url: string | URL | Request,
520:       { signal }: RequestInit = {},
521:     ): Promise<Response> => {
522:       if (count++ === 0) {
523:         return new Promise(
524:           (resolve, reject) => signal?.addEventListener('abort', () => reject(new Error('timed out'))),
525:         );
526:       }
527:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
528:     };
529: 
530:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', timeout: 10, fetch: testFetch });
531: 
532:     expect(await client.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
533:     expect(count).toEqual(2);
534:     expect(
535:       await client
536:         .request({ path: '/foo', method: 'get' })
537:         .asResponse()
538:         .then((r) => r.text()),
539:     ).toEqual(JSON.stringify({ a: 1 }));
540:     expect(count).toEqual(3);
541:   });
542: 
543:   test('retry count header', async () => {
544:     let count = 0;
545:     let capturedRequest: RequestInit | undefined;
546:     const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
547:       count++;
548:       if (count <= 2) {
549:         return new Response(undefined, {
550:           status: 429,
551:           headers: {
552:             'Retry-After': '0.1',
553:           },
554:         });
555:       }
556:       capturedRequest = init;
557:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
558:     };
559: 
560:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', fetch: testFetch, maxRetries: 4 });
561: 
562:     expect(await client.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
563: 
564:     expect((capturedRequest!.headers as Headers).get('x-stainless-retry-count')).toEqual('2');
565:     expect(count).toEqual(3);
566:   });
567: 
568:   test('omit retry count header', async () => {
569:     let count = 0;
570:     let capturedRequest: RequestInit | undefined;
571:     const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
572:       count++;
573:       if (count <= 2) {
574:         return new Response(undefined, {
575:           status: 429,
576:           headers: {
577:             'Retry-After': '0.1',
578:           },
579:         });
580:       }
581:       capturedRequest = init;
582:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
583:     };
584:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', fetch: testFetch, maxRetries: 4 });
585: 
586:     expect(
587:       await client.request({
588:         path: '/foo',
589:         method: 'get',
590:         headers: { 'X-Stainless-Retry-Count': null },
591:       }),
592:     ).toEqual({ a: 1 });
593: 
594:     expect((capturedRequest!.headers as Headers).has('x-stainless-retry-count')).toBe(false);
595:   });
596: 
597:   test('omit retry count header by default', async () => {
598:     let count = 0;
599:     let capturedRequest: RequestInit | undefined;
600:     const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
601:       count++;
602:       if (count <= 2) {
603:         return new Response(undefined, {
604:           status: 429,
605:           headers: {
606:             'Retry-After': '0.1',
607:           },
608:         });
609:       }
610:       capturedRequest = init;
611:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
612:     };
613:     const client = new Anthropic({
614:       apiKey: 'my-anthropic-api-key',
615:       fetch: testFetch,
616:       maxRetries: 4,
617:       defaultHeaders: { 'X-Stainless-Retry-Count': null },
618:     });
619: 
620:     expect(
621:       await client.request({
622:         path: '/foo',
623:         method: 'get',
624:       }),
625:     ).toEqual({ a: 1 });
626: 
627:     expect(capturedRequest!.headers as Headers).not.toHaveProperty('x-stainless-retry-count');
628:   });
629: 
630:   test('overwrite retry count header', async () => {
631:     let count = 0;
632:     let capturedRequest: RequestInit | undefined;
633:     const testFetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
634:       count++;
635:       if (count <= 2) {
636:         return new Response(undefined, {
637:           status: 429,
638:           headers: {
639:             'Retry-After': '0.1',
640:           },
641:         });
642:       }
643:       capturedRequest = init;
644:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
645:     };
646:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', fetch: testFetch, maxRetries: 4 });
647: 
648:     expect(
649:       await client.request({
650:         path: '/foo',
651:         method: 'get',
652:         headers: { 'X-Stainless-Retry-Count': '42' },
653:       }),
654:     ).toEqual({ a: 1 });
655: 
656:     expect((capturedRequest!.headers as Headers).get('x-stainless-retry-count')).toEqual('42');
657:   });
658: 
659:   test('retry on 429 with retry-after', async () => {
660:     let count = 0;
661:     const testFetch = async (
662:       url: string | URL | Request,
663:       { signal }: RequestInit = {},
664:     ): Promise<Response> => {
665:       if (count++ === 0) {
666:         return new Response(undefined, {
667:           status: 429,
668:           headers: {
669:             'Retry-After': '0.1',
670:           },
671:         });
672:       }
673:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
674:     };
675: 
676:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', fetch: testFetch });
677: 
678:     expect(await client.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
679:     expect(count).toEqual(2);
680:     expect(
681:       await client
682:         .request({ path: '/foo', method: 'get' })
683:         .asResponse()
684:         .then((r) => r.text()),
685:     ).toEqual(JSON.stringify({ a: 1 }));
686:     expect(count).toEqual(3);
687:   });
688: 
689:   test('retry on 429 with retry-after-ms', async () => {
690:     let count = 0;
691:     const testFetch = async (
692:       url: string | URL | Request,
693:       { signal }: RequestInit = {},
694:     ): Promise<Response> => {
695:       if (count++ === 0) {
696:         return new Response(undefined, {
697:           status: 429,
698:           headers: {
699:             'Retry-After-Ms': '10',
700:           },
701:         });
702:       }
703:       return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
704:     };
705: 
706:     const client = new Anthropic({ apiKey: 'my-anthropic-api-key', fetch: testFetch });
707: 
708:     expect(await client.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
709:     expect(count).toEqual(2);
710:     expect(
711:       await client
712:         .request({ path: '/foo', method: 'get' })
713:         .asResponse()
714:         .then((r) => r.text()),
715:     ).toEqual(JSON.stringify({ a: 1 }));
716:     expect(count).toEqual(3);
717:   });
718: });
````

## File: tests/path.test.ts
````typescript
  1: import { createPathTagFunction, encodeURIPath } from '@anthropic-ai/sdk/internal/utils/path';
  2: import { inspect } from 'node:util';
  3: 
  4: describe('path template tag function', () => {
  5:   test('validates input', () => {
  6:     const testParams = ['', '.', '..', 'x', '%2e', '%2E', '%2e%2e', '%2E%2e', '%2e%2E', '%2E%2E'];
  7:     const testCases = [
  8:       ['/path_params/', '/a'],
  9:       ['/path_params/', '/'],
 10:       ['/path_params/', ''],
 11:       ['', '/a'],
 12:       ['', '/'],
 13:       ['', ''],
 14:       ['a'],
 15:       [''],
 16:       ['/path_params/', ':initiate'],
 17:       ['/path_params/', '.json'],
 18:       ['/path_params/', '?beta=true'],
 19:       ['/path_params/', '.?beta=true'],
 20:       ['/path_params/', '/', '/download'],
 21:       ['/path_params/', '-', '/download'],
 22:       ['/path_params/', '', '/download'],
 23:       ['/path_params/', '.', '/download'],
 24:       ['/path_params/', '..', '/download'],
 25:       ['/plain/path'],
 26:     ];
 27: 
 28:     function paramPermutations(len: number): string[][] {
 29:       if (len === 0) return [];
 30:       if (len === 1) return testParams.map((e) => [e]);
 31:       const rest = paramPermutations(len - 1);
 32:       return testParams.flatMap((e) => rest.map((r) => [e, ...r]));
 33:     }
 34: 
 35:     // we need to test how %2E is handled so we use a custom encoder that does no escaping
 36:     const rawPath = createPathTagFunction((s) => s);
 37: 
 38:     const results: {
 39:       [pathParts: string]: {
 40:         [params: string]: { valid: boolean; result?: string; error?: string };
 41:       };
 42:     } = {};
 43: 
 44:     for (const pathParts of testCases) {
 45:       const pathResults: Record<string, { valid: boolean; result?: string; error?: string }> = {};
 46:       results[JSON.stringify(pathParts)] = pathResults;
 47:       for (const params of paramPermutations(pathParts.length - 1)) {
 48:         const stringRaw = String.raw({ raw: pathParts }, ...params);
 49:         const plainString = String.raw(
 50:           { raw: pathParts.map((e) => e.replace(/\./g, 'x')) },
 51:           ...params.map((e) => 'X'.repeat(e.length)),
 52:         );
 53:         const normalizedStringRaw = new URL(stringRaw, 'https://example.com').href;
 54:         const normalizedPlainString = new URL(plainString, 'https://example.com').href;
 55:         const pathResultsKey = JSON.stringify(params);
 56:         try {
 57:           const result = rawPath(pathParts, ...params);
 58:           expect(result).toBe(stringRaw);
 59:           // there are no special segments, so the length of the normalized path is
 60:           // equal to the length of the normalized plain path.
 61:           expect(normalizedStringRaw.length).toBe(normalizedPlainString.length);
 62:           pathResults[pathResultsKey] = {
 63:             valid: true,
 64:             result,
 65:           };
 66:         } catch (e) {
 67:           const error = String(e);
 68:           expect(error).toMatch(/Path parameters result in path with invalid segment/);
 69:           // there are special segments, so the length of the normalized path is
 70:           // different than the length of the normalized plain path.
 71:           expect(normalizedStringRaw.length).not.toBe(normalizedPlainString.length);
 72:           pathResults[pathResultsKey] = {
 73:             valid: false,
 74:             error,
 75:           };
 76:         }
 77:       }
 78:     }
 79: 
 80:     expect(results).toMatchObject({
 81:       '["/path_params/","/a"]': {
 82:         '["x"]': { valid: true, result: '/path_params/x/a' },
 83:         '[""]': { valid: true, result: '/path_params//a' },
 84:         '["%2E%2e"]': {
 85:           valid: false,
 86:           error:
 87:             'Error: Path parameters result in path with invalid segments:\n' +
 88:             '/path_params/%2E%2e/a\n' +
 89:             '             ^^^^^^',
 90:         },
 91:         '["%2E"]': {
 92:           valid: false,
 93:           error:
 94:             'Error: Path parameters result in path with invalid segments:\n' +
 95:             '/path_params/%2E/a\n' +
 96:             '             ^^^',
 97:         },
 98:       },
 99:       '["/path_params/","/"]': {
100:         '["x"]': { valid: true, result: '/path_params/x/' },
101:         '[""]': { valid: true, result: '/path_params//' },
102:         '["%2e%2E"]': {
103:           valid: false,
104:           error:
105:             'Error: Path parameters result in path with invalid segments:\n' +
106:             '/path_params/%2e%2E/\n' +
107:             '             ^^^^^^',
108:         },
109:         '["%2e"]': {
110:           valid: false,
111:           error:
112:             'Error: Path parameters result in path with invalid segments:\n' +
113:             '/path_params/%2e/\n' +
114:             '             ^^^',
115:         },
116:       },
117:       '["/path_params/",""]': {
118:         '[""]': { valid: true, result: '/path_params/' },
119:         '["x"]': { valid: true, result: '/path_params/x' },
120:         '["%2E"]': {
121:           valid: false,
122:           error:
123:             'Error: Path parameters result in path with invalid segments:\n' +
124:             '/path_params/%2E\n' +
125:             '             ^^^',
126:         },
127:         '["%2E%2e"]': {
128:           valid: false,
129:           error:
130:             'Error: Path parameters result in path with invalid segments:\n' +
131:             '/path_params/%2E%2e\n' +
132:             '             ^^^^^^',
133:         },
134:       },
135:       '["","/a"]': {
136:         '[""]': { valid: true, result: '/a' },
137:         '["x"]': { valid: true, result: 'x/a' },
138:         '["%2E"]': {
139:           valid: false,
140:           error: 'Error: Path parameters result in path with invalid segments:\n%2E/a\n^^^',
141:         },
142:         '["%2e%2E"]': {
143:           valid: false,
144:           error: 'Error: Path parameters result in path with invalid segments:\n' + '%2e%2E/a\n' + '^^^^^^',
145:         },
146:       },
147:       '["","/"]': {
148:         '["x"]': { valid: true, result: 'x/' },
149:         '[""]': { valid: true, result: '/' },
150:         '["%2E%2e"]': {
151:           valid: false,
152:           error: 'Error: Path parameters result in path with invalid segments:\n' + '%2E%2e/\n' + '^^^^^^',
153:         },
154:         '["."]': {
155:           valid: false,
156:           error: 'Error: Path parameters result in path with invalid segments:\n./\n^',
157:         },
158:       },
159:       '["",""]': {
160:         '[""]': { valid: true, result: '' },
161:         '["x"]': { valid: true, result: 'x' },
162:         '[".."]': {
163:           valid: false,
164:           error: 'Error: Path parameters result in path with invalid segments:\n..\n^^',
165:         },
166:         '["."]': {
167:           valid: false,
168:           error: 'Error: Path parameters result in path with invalid segments:\n.\n^',
169:         },
170:       },
171:       '["a"]': {},
172:       '[""]': {},
173:       '["/path_params/",":initiate"]': {
174:         '[""]': { valid: true, result: '/path_params/:initiate' },
175:         '["."]': { valid: true, result: '/path_params/.:initiate' },
176:       },
177:       '["/path_params/",".json"]': {
178:         '["x"]': { valid: true, result: '/path_params/x.json' },
179:         '["."]': { valid: true, result: '/path_params/..json' },
180:       },
181:       '["/path_params/","?beta=true"]': {
182:         '["x"]': { valid: true, result: '/path_params/x?beta=true' },
183:         '[""]': { valid: true, result: '/path_params/?beta=true' },
184:         '["%2E%2E"]': {
185:           valid: false,
186:           error:
187:             'Error: Path parameters result in path with invalid segments:\n' +
188:             '/path_params/%2E%2E?beta=true\n' +
189:             '             ^^^^^^',
190:         },
191:         '["%2e%2E"]': {
192:           valid: false,
193:           error:
194:             'Error: Path parameters result in path with invalid segments:\n' +
195:             '/path_params/%2e%2E?beta=true\n' +
196:             '             ^^^^^^',
197:         },
198:       },
199:       '["/path_params/",".?beta=true"]': {
200:         '[".."]': { valid: true, result: '/path_params/...?beta=true' },
201:         '["x"]': { valid: true, result: '/path_params/x.?beta=true' },
202:         '[""]': {
203:           valid: false,
204:           error:
205:             'Error: Path parameters result in path with invalid segments:\n' +
206:             '/path_params/.?beta=true\n' +
207:             '             ^',
208:         },
209:         '["%2e"]': {
210:           valid: false,
211:           error:
212:             'Error: Path parameters result in path with invalid segments:\n' +
213:             '/path_params/%2e.?beta=true\n' +
214:             '             ^^^^',
215:         },
216:       },
217:       '["/path_params/","/","/download"]': {
218:         '["",""]': { valid: true, result: '/path_params///download' },
219:         '["","x"]': { valid: true, result: '/path_params//x/download' },
220:         '[".","%2e"]': {
221:           valid: false,
222:           error:
223:             'Error: Path parameters result in path with invalid segments:\n' +
224:             '/path_params/./%2e/download\n' +
225:             '             ^ ^^^',
226:         },
227:         '["%2E%2e","%2e"]': {
228:           valid: false,
229:           error:
230:             'Error: Path parameters result in path with invalid segments:\n' +
231:             '/path_params/%2E%2e/%2e/download\n' +
232:             '             ^^^^^^ ^^^',
233:         },
234:       },
235:       '["/path_params/","-","/download"]': {
236:         '["","%2e"]': { valid: true, result: '/path_params/-%2e/download' },
237:         '["%2E",".."]': { valid: true, result: '/path_params/%2E-../download' },
238:       },
239:       '["/path_params/","","/download"]': {
240:         '["%2E%2e","%2e%2E"]': { valid: true, result: '/path_params/%2E%2e%2e%2E/download' },
241:         '["%2E",".."]': { valid: true, result: '/path_params/%2E../download' },
242:         '["","%2E"]': {
243:           valid: false,
244:           error:
245:             'Error: Path parameters result in path with invalid segments:\n' +
246:             '/path_params/%2E/download\n' +
247:             '             ^^^',
248:         },
249:         '["%2E","."]': {
250:           valid: false,
251:           error:
252:             'Error: Path parameters result in path with invalid segments:\n' +
253:             '/path_params/%2E./download\n' +
254:             '             ^^^^',
255:         },
256:       },
257:       '["/path_params/",".","/download"]': {
258:         '["%2e%2e",""]': { valid: true, result: '/path_params/%2e%2e./download' },
259:         '["","%2e%2e"]': { valid: true, result: '/path_params/.%2e%2e/download' },
260:         '["",""]': {
261:           valid: false,
262:           error:
263:             'Error: Path parameters result in path with invalid segments:\n' +
264:             '/path_params/./download\n' +
265:             '             ^',
266:         },
267:         '["","."]': {
268:           valid: false,
269:           error:
270:             'Error: Path parameters result in path with invalid segments:\n' +
271:             '/path_params/../download\n' +
272:             '             ^^',
273:         },
274:       },
275:       '["/path_params/","..","/download"]': {
276:         '["","%2E"]': { valid: true, result: '/path_params/..%2E/download' },
277:         '["","x"]': { valid: true, result: '/path_params/..x/download' },
278:         '["",""]': {
279:           valid: false,
280:           error:
281:             'Error: Path parameters result in path with invalid segments:\n' +
282:             '/path_params/../download\n' +
283:             '             ^^',
284:         },
285:       },
286:     });
287:   });
288: });
289: 
290: describe('encodeURIPath', () => {
291:   const testCases: string[] = [
292:     '',
293:     // Every ASCII character
294:     ...Array.from({ length: 0x7f }, (_, i) => String.fromCharCode(i)),
295:     // Unicode BMP codepoint
296:     'å',
297:     // Unicode supplementary codepoint
298:     '😃',
299:   ];
300: 
301:   for (const param of testCases) {
302:     test('properly encodes ' + inspect(param), () => {
303:       const encoded = encodeURIPath(param);
304:       const naiveEncoded = encodeURIComponent(param);
305:       // we should never encode more characters than encodeURIComponent
306:       expect(naiveEncoded.length).toBeGreaterThanOrEqual(encoded.length);
307:       expect(decodeURIComponent(encoded)).toBe(param);
308:     });
309:   }
310: 
311:   test("leaves ':' intact", () => {
312:     expect(encodeURIPath(':')).toBe(':');
313:   });
314: 
315:   test("leaves '@' intact", () => {
316:     expect(encodeURIPath('@')).toBe('@');
317:   });
318: });
````

## File: tests/responses.test.ts
````typescript
  1: import { APIPromise } from '@anthropic-ai/sdk/api-promise';
  2: import Anthropic from '@anthropic-ai/sdk/index';
  3: import { compareType } from './utils/typing';
  4: 
  5: const client = new Anthropic({ apiKey: 'dummy' });
  6: 
  7: describe('request id', () => {
  8:   test('types', () => {
  9:     compareType<Awaited<APIPromise<string>>, string>(true);
 10:     compareType<Awaited<APIPromise<number>>, number>(true);
 11:     compareType<Awaited<APIPromise<null>>, null>(true);
 12:     compareType<Awaited<APIPromise<void>>, void>(true);
 13:     compareType<Awaited<APIPromise<Response>>, Response>(true);
 14:     compareType<Awaited<APIPromise<Response>>, Response>(true);
 15:     compareType<Awaited<APIPromise<{ foo: string }>>, { foo: string } & { _request_id?: string | null }>(
 16:       true,
 17:     );
 18:     compareType<Awaited<APIPromise<Array<{ foo: string }>>>, Array<{ foo: string }>>(true);
 19:   });
 20: 
 21:   test('withResponse', async () => {
 22:     const client = new Anthropic({
 23:       apiKey: 'dummy',
 24:       fetch: async () =>
 25:         new Response(JSON.stringify({ id: 'bar' }), {
 26:           headers: { 'request-id': 'req_xxx', 'content-type': 'application/json' },
 27:         }),
 28:     });
 29: 
 30:     const {
 31:       data: message,
 32:       response,
 33:       request_id,
 34:     } = await client.messages
 35:       .create({ messages: [], model: 'claude-3-opus-20240229', max_tokens: 1024 })
 36:       .withResponse();
 37: 
 38:     expect(request_id).toBe('req_xxx');
 39:     expect(response.headers.get('request-id')).toBe('req_xxx');
 40:     expect(message.id).toBe('bar');
 41:     expect(JSON.stringify(message)).toBe('{"id":"bar"}');
 42:   });
 43: 
 44:   test('object response', async () => {
 45:     const client = new Anthropic({
 46:       apiKey: 'dummy',
 47:       fetch: async () =>
 48:         new Response(JSON.stringify({ id: 'bar' }), {
 49:           headers: { 'request-id': 'req_xxx', 'content-type': 'application/json' },
 50:         }),
 51:     });
 52: 
 53:     const rsp = await client.messages.create({
 54:       messages: [],
 55:       model: 'claude-3-opus-20240229',
 56:       max_tokens: 1024,
 57:     });
 58:     expect(rsp.id).toBe('bar');
 59:     expect(rsp._request_id).toBe('req_xxx');
 60:     expect(JSON.stringify(rsp)).toBe('{"id":"bar"}');
 61:   });
 62: 
 63:   test('envelope response', async () => {
 64:     const promise = new APIPromise<{ data: { foo: string } }>(
 65:       client,
 66:       (async () => {
 67:         return {
 68:           response: new Response(JSON.stringify({ data: { foo: 'bar' } }), {
 69:             headers: { 'request-id': 'req_xxx', 'content-type': 'application/json' },
 70:           }),
 71:           controller: {} as any,
 72:           options: {} as any,
 73:           requestLogID: 'log_000000',
 74:           retryOfRequestLogID: undefined,
 75:           startTime: Date.now(),
 76:         };
 77:       })(),
 78:     )._thenUnwrap((d) => d.data);
 79: 
 80:     const rsp = await promise;
 81:     expect(rsp.foo).toBe('bar');
 82:     expect(rsp._request_id).toBe('req_xxx');
 83:   });
 84: 
 85:   test('page response', async () => {
 86:     const client = new Anthropic({
 87:       apiKey: 'dummy',
 88:       fetch: async () =>
 89:         new Response(JSON.stringify({ data: [{ foo: 'bar' }] }), {
 90:           headers: { 'request-id': 'req_xxx', 'content-type': 'application/json' },
 91:         }),
 92:     });
 93: 
 94:     const page = await client.beta.messages.batches.list();
 95:     expect(page.data).toMatchObject([{ foo: 'bar' }]);
 96:     expect((page as any)._request_id).toBeUndefined();
 97:   });
 98: 
 99:   test('array response', async () => {
100:     const promise = new APIPromise<Array<{ foo: string }>>(
101:       client,
102:       (async () => {
103:         return {
104:           response: new Response(JSON.stringify([{ foo: 'bar' }]), {
105:             headers: { 'request-id': 'req_xxx', 'content-type': 'application/json' },
106:           }),
107:           controller: {} as any,
108:           options: {} as any,
109:           requestLogID: 'log_000000',
110:           retryOfRequestLogID: undefined,
111:           startTime: Date.now(),
112:         };
113:       })(),
114:     );
115: 
116:     const rsp = await promise;
117:     expect(rsp.length).toBe(1);
118:     expect(rsp[0]).toMatchObject({ foo: 'bar' });
119:     expect((rsp as any)._request_id).toBeUndefined();
120:   });
121: 
122:   test('string response', async () => {
123:     const promise = new APIPromise<string>(
124:       client,
125:       (async () => {
126:         return {
127:           response: new Response('hello world', {
128:             headers: { 'request-id': 'req_xxx', 'content-type': 'application/text' },
129:           }),
130:           controller: {} as any,
131:           options: {} as any,
132:           requestLogID: 'log_000000',
133:           retryOfRequestLogID: undefined,
134:           startTime: Date.now(),
135:         };
136:       })(),
137:     );
138: 
139:     const result = await promise;
140:     expect(result).toBe('hello world');
141:     expect((result as any)._request_id).toBeUndefined();
142:   });
143: });
````

## File: tests/streaming.test.ts
````typescript
  1: import assert from 'assert';
  2: import { Stream, _iterSSEMessages } from '@anthropic-ai/sdk/core/streaming';
  3: import { APIError } from '@anthropic-ai/sdk/core/error';
  4: import { ReadableStreamFrom } from '@anthropic-ai/sdk/internal/shims';
  5: 
  6: describe('streaming decoding', () => {
  7:   test('basic', async () => {
  8:     async function* body(): AsyncGenerator<Buffer> {
  9:       yield Buffer.from('event: completion\n');
 10:       yield Buffer.from('data: {"foo":true}\n');
 11:       yield Buffer.from('\n');
 12:     }
 13: 
 14:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
 15:       Symbol.asyncIterator
 16:     ]();
 17: 
 18:     let event = await stream.next();
 19:     assert(event.value);
 20:     expect(JSON.parse(event.value.data)).toEqual({ foo: true });
 21: 
 22:     event = await stream.next();
 23:     expect(event.done).toBeTruthy();
 24:   });
 25: 
 26:   test('data without event', async () => {
 27:     async function* body(): AsyncGenerator<Buffer> {
 28:       yield Buffer.from('data: {"foo":true}\n');
 29:       yield Buffer.from('\n');
 30:     }
 31: 
 32:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
 33:       Symbol.asyncIterator
 34:     ]();
 35: 
 36:     let event = await stream.next();
 37:     assert(event.value);
 38:     expect(event.value.event).toBeNull();
 39:     expect(JSON.parse(event.value.data)).toEqual({ foo: true });
 40: 
 41:     event = await stream.next();
 42:     expect(event.done).toBeTruthy();
 43:   });
 44: 
 45:   test('event without data', async () => {
 46:     async function* body(): AsyncGenerator<Buffer> {
 47:       yield Buffer.from('event: foo\n');
 48:       yield Buffer.from('\n');
 49:     }
 50: 
 51:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
 52:       Symbol.asyncIterator
 53:     ]();
 54: 
 55:     let event = await stream.next();
 56:     assert(event.value);
 57:     expect(event.value.event).toEqual('foo');
 58:     expect(event.value.data).toEqual('');
 59: 
 60:     event = await stream.next();
 61:     expect(event.done).toBeTruthy();
 62:   });
 63: 
 64:   test('multiple events', async () => {
 65:     async function* body(): AsyncGenerator<Buffer> {
 66:       yield Buffer.from('event: foo\n');
 67:       yield Buffer.from('\n');
 68:       yield Buffer.from('event: ping\n');
 69:       yield Buffer.from('\n');
 70:     }
 71: 
 72:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
 73:       Symbol.asyncIterator
 74:     ]();
 75: 
 76:     let event = await stream.next();
 77:     assert(event.value);
 78:     expect(event.value.event).toEqual('foo');
 79:     expect(event.value.data).toEqual('');
 80: 
 81:     event = await stream.next();
 82:     assert(event.value);
 83:     expect(event.value.event).toEqual('ping');
 84:     expect(event.value.data).toEqual('');
 85: 
 86:     event = await stream.next();
 87:     expect(event.done).toBeTruthy();
 88:   });
 89: 
 90:   test('multiple events with data', async () => {
 91:     async function* body(): AsyncGenerator<Buffer> {
 92:       yield Buffer.from('event: foo\n');
 93:       yield Buffer.from('data: {"foo":true}\n');
 94:       yield Buffer.from('\n');
 95:       yield Buffer.from('event: ping\n');
 96:       yield Buffer.from('data: {"bar":false}\n');
 97:       yield Buffer.from('\n');
 98:     }
 99: 
100:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
101:       Symbol.asyncIterator
102:     ]();
103: 
104:     let event = await stream.next();
105:     assert(event.value);
106:     expect(event.value.event).toEqual('foo');
107:     expect(JSON.parse(event.value.data)).toEqual({ foo: true });
108: 
109:     event = await stream.next();
110:     assert(event.value);
111:     expect(event.value.event).toEqual('ping');
112:     expect(JSON.parse(event.value.data)).toEqual({ bar: false });
113: 
114:     event = await stream.next();
115:     expect(event.done).toBeTruthy();
116:   });
117: 
118:   test('multiple data lines with empty line', async () => {
119:     async function* body(): AsyncGenerator<Buffer> {
120:       yield Buffer.from('event: ping\n');
121:       yield Buffer.from('data: {\n');
122:       yield Buffer.from('data: "foo":\n');
123:       yield Buffer.from('data: \n');
124:       yield Buffer.from('data:\n');
125:       yield Buffer.from('data: true}\n');
126:       yield Buffer.from('\n\n');
127:     }
128: 
129:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
130:       Symbol.asyncIterator
131:     ]();
132: 
133:     let event = await stream.next();
134:     assert(event.value);
135:     expect(event.value.event).toEqual('ping');
136:     expect(JSON.parse(event.value.data)).toEqual({ foo: true });
137:     expect(event.value.data).toEqual('{\n"foo":\n\n\ntrue}');
138: 
139:     event = await stream.next();
140:     expect(event.done).toBeTruthy();
141:   });
142: 
143:   test('data json escaped double new line', async () => {
144:     async function* body(): AsyncGenerator<Buffer> {
145:       yield Buffer.from('event: ping\n');
146:       yield Buffer.from('data: {"foo": "my long\\n\\ncontent"}');
147:       yield Buffer.from('\n\n');
148:     }
149: 
150:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
151:       Symbol.asyncIterator
152:     ]();
153: 
154:     let event = await stream.next();
155:     assert(event.value);
156:     expect(event.value.event).toEqual('ping');
157:     expect(JSON.parse(event.value.data)).toEqual({ foo: 'my long\n\ncontent' });
158: 
159:     event = await stream.next();
160:     expect(event.done).toBeTruthy();
161:   });
162: 
163:   test('special new line characters', async () => {
164:     async function* body(): AsyncGenerator<Buffer> {
165:       yield Buffer.from('data: {"content": "culpa "}\n');
166:       yield Buffer.from('\n');
167:       yield Buffer.from('data: {"content": "');
168:       yield Buffer.from([0xe2, 0x80, 0xa8]);
169:       yield Buffer.from('"}\n');
170:       yield Buffer.from('\n');
171:       yield Buffer.from('data: {"content": "foo"}\n');
172:       yield Buffer.from('\n');
173:     }
174: 
175:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
176:       Symbol.asyncIterator
177:     ]();
178: 
179:     let event = await stream.next();
180:     assert(event.value);
181:     expect(JSON.parse(event.value.data)).toEqual({ content: 'culpa ' });
182: 
183:     event = await stream.next();
184:     assert(event.value);
185:     expect(JSON.parse(event.value.data)).toEqual({ content: Buffer.from([0xe2, 0x80, 0xa8]).toString() });
186: 
187:     event = await stream.next();
188:     assert(event.value);
189:     expect(JSON.parse(event.value.data)).toEqual({ content: 'foo' });
190: 
191:     event = await stream.next();
192:     expect(event.done).toBeTruthy();
193:   });
194: 
195:   test('multi-byte characters across chunks', async () => {
196:     async function* body(): AsyncGenerator<Buffer> {
197:       yield Buffer.from('event: completion\n');
198:       yield Buffer.from('data: {"content": "');
199:       // bytes taken from the string 'известни' and arbitrarily split
200:       // so that some multi-byte characters span multiple chunks
201:       yield Buffer.from([0xd0]);
202:       yield Buffer.from([0xb8, 0xd0, 0xb7, 0xd0]);
203:       yield Buffer.from([0xb2, 0xd0, 0xb5, 0xd1, 0x81, 0xd1, 0x82, 0xd0, 0xbd, 0xd0, 0xb8]);
204:       yield Buffer.from('"}\n');
205:       yield Buffer.from('\n');
206:     }
207: 
208:     const stream = _iterSSEMessages(new Response(ReadableStreamFrom(body())), new AbortController())[
209:       Symbol.asyncIterator
210:     ]();
211: 
212:     let event = await stream.next();
213:     assert(event.value);
214:     expect(event.value.event).toEqual('completion');
215:     expect(JSON.parse(event.value.data)).toEqual({ content: 'известни' });
216: 
217:     event = await stream.next();
218:     expect(event.done).toBeTruthy();
219:   });
220: });
221: 
222: test('error handling', async () => {
223:   async function* body(): AsyncGenerator<Buffer> {
224:     yield Buffer.from('event: error\n');
225:     yield Buffer.from('data: {"type":"error","error":{"type":"overloaded_error","message":"Overloaded"}}');
226:     yield Buffer.from('\n\n');
227:   }
228: 
229:   const stream = Stream.fromSSEResponse(
230:     new Response(await ReadableStreamFrom(body())),
231:     new AbortController(),
232:   );
233: 
234:   const err = expect(
235:     (async () => {
236:       for await (const _event of stream) {
237:       }
238:     })(),
239:   ).rejects;
240: 
241:   await err.toMatchInlineSnapshot(
242:     `[Error: {"type":"error","error":{"type":"overloaded_error","message":"Overloaded"}}]`,
243:   );
244:   await err.toBeInstanceOf(APIError);
245: });
````

## File: tests/stringifyQuery.test.ts
````typescript
 1: // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
 2: 
 3: import { Anthropic } from '@anthropic-ai/sdk';
 4: 
 5: const { stringifyQuery } = Anthropic.prototype as any;
 6: 
 7: describe(stringifyQuery, () => {
 8:   for (const [input, expected] of [
 9:     [{ a: '1', b: 2, c: true }, 'a=1&b=2&c=true'],
10:     [{ a: null, b: false, c: undefined }, 'a=&b=false'],
11:     [{ 'a/b': 1.28341 }, `${encodeURIComponent('a/b')}=1.28341`],
12:     [
13:       { 'a/b': 'c/d', 'e=f': 'g&h' },
14:       `${encodeURIComponent('a/b')}=${encodeURIComponent('c/d')}&${encodeURIComponent(
15:         'e=f',
16:       )}=${encodeURIComponent('g&h')}`,
17:     ],
18:   ]) {
19:     it(`${JSON.stringify(input)} -> ${expected}`, () => {
20:       expect(stringifyQuery(input)).toEqual(expected);
21:     });
22:   }
23: 
24:   for (const value of [[], {}, new Date()]) {
25:     it(`${JSON.stringify(value)} -> <error>`, () => {
26:       expect(() => stringifyQuery({ value })).toThrow(`Cannot stringify type ${typeof value}`);
27:     });
28:   }
29: });
````

## File: tests/uploads.test.ts
````typescript
  1: import fs from 'fs';
  2: import type { ResponseLike } from '@anthropic-ai/sdk/internal/to-file';
  3: import { toFile } from '@anthropic-ai/sdk/core/uploads';
  4: import { File } from 'node:buffer';
  5: 
  6: class MyClass {
  7:   name: string = 'foo';
  8: }
  9: 
 10: function mockResponse({ url, content }: { url: string; content?: Blob }): ResponseLike {
 11:   return {
 12:     url,
 13:     blob: async () => content || new Blob([]),
 14:   };
 15: }
 16: 
 17: describe('toFile', () => {
 18:   it('throws a helpful error for mismatched types', async () => {
 19:     await expect(
 20:       // @ts-expect-error intentionally mismatched type
 21:       toFile({ foo: 'string' }),
 22:     ).rejects.toThrowErrorMatchingInlineSnapshot(
 23:       `"Unexpected data type: object; constructor: Object; props: ["foo"]"`,
 24:     );
 25: 
 26:     await expect(
 27:       // @ts-expect-error intentionally mismatched type
 28:       toFile(new MyClass()),
 29:     ).rejects.toThrowErrorMatchingInlineSnapshot(
 30:       `"Unexpected data type: object; constructor: MyClass; props: ["name"]"`,
 31:     );
 32:   });
 33: 
 34:   it('disallows string at the type-level', async () => {
 35:     // @ts-expect-error we intentionally do not type support for `string`
 36:     // to help people avoid passing a file path
 37:     const file = await toFile('contents');
 38:     expect(file.text()).resolves.toEqual('contents');
 39:   });
 40: 
 41:   it('extracts a file name from a Response', async () => {
 42:     const response = mockResponse({ url: 'https://example.com/my/audio.mp3' });
 43:     const file = await toFile(response);
 44:     expect(file.name).toEqual('audio.mp3');
 45:   });
 46: 
 47:   it('extracts a file name from a File', async () => {
 48:     const input = new File(['foo'], 'input.jsonl');
 49:     const file = await toFile(input);
 50:     expect(file.name).toEqual('input.jsonl');
 51:   });
 52: 
 53:   it('extracts a file name from a ReadStream', async () => {
 54:     const input = fs.createReadStream('tests/uploads.test.ts');
 55:     const file = await toFile(input);
 56:     expect(file.name).toEqual('uploads.test.ts');
 57:     expect(file.type).toEqual('');
 58:   });
 59: 
 60:   it('allows overriding props from a ReadStream', async () => {
 61:     var file = await toFile(fs.createReadStream('tests/uploads.test.ts'), undefined, {
 62:       type: 'application/typescript',
 63:     });
 64:     expect(file.name).toEqual('uploads.test.ts');
 65:     expect(file.type).toEqual('application/typescript');
 66: 
 67:     const time = new Date().getTime();
 68:     var file = await toFile(fs.createReadStream('tests/uploads.test.ts'), 'my-uploads.test.ts', {
 69:       type: 'application/typescript',
 70:       lastModified: time,
 71:     });
 72:     expect(file.name).toEqual('my-uploads.test.ts');
 73:     expect(file.type).toEqual('application/typescript');
 74:     expect(file.lastModified).toEqual(time);
 75:   });
 76: 
 77:   it('does not copy File objects by default', async () => {
 78:     const input = new File(['foo'], 'input.jsonl', { type: 'jsonl' });
 79:     const file = await toFile(input);
 80:     expect(file).toStrictEqual(input);
 81:     expect(file.name).toEqual('input.jsonl');
 82:     expect(file.type).toBe('jsonl');
 83:   });
 84: 
 85:   it('allows overriding props from a File', async () => {
 86:     const time = new Date().getTime();
 87:     var input = new File(['foo'], 'input.jsonl', { type: 'jsonl', lastModified: time - 10000 });
 88:     var file = await toFile(input, 'foo.jsonl', { type: 'plain/text', lastModified: time });
 89:     expect(file).not.toStrictEqual(input);
 90:     expect(file.name).toEqual('foo.jsonl');
 91:     expect(file.type).toEqual('plain/text');
 92:     expect(file.lastModified).toEqual(time);
 93:   });
 94: 
 95:   it('is assignable to File and Blob', async () => {
 96:     const input = new File(['foo'], 'input.jsonl', { type: 'jsonl' });
 97:     const result = await toFile(input);
 98:     const file: File = result;
 99:     const blob: Blob = result;
100:     void file, blob;
101:   });
102: });
103: 
104: describe('missing File error message', () => {
105:   let prevGlobalFile: unknown;
106:   let prevNodeFile: unknown;
107:   beforeEach(() => {
108:     // The file shim captures the global File object when it's first imported.
109:     // Reset modules before each test so we can test the error thrown when it's undefined.
110:     jest.resetModules();
111:     const buffer = require('node:buffer');
112:     // @ts-ignore
113:     prevGlobalFile = globalThis.File;
114:     prevNodeFile = buffer.File;
115:     // @ts-ignore
116:     globalThis.File = undefined;
117:     buffer.File = undefined;
118:   });
119:   afterEach(() => {
120:     // Clean up
121:     // @ts-ignore
122:     globalThis.File = prevGlobalFile;
123:     require('node:buffer').File = prevNodeFile;
124:     jest.resetModules();
125:   });
126: 
127:   test('is thrown', async () => {
128:     const uploads = await import('@anthropic-ai/sdk/core/uploads');
129:     await expect(
130:       uploads.toFile(mockResponse({ url: 'https://example.com/my/audio.mp3' })),
131:     ).rejects.toMatchInlineSnapshot(
132:       `[Error: \`File\` is not defined as a global, which is required for file uploads.]`,
133:     );
134:   });
135: });
````

## File: .gitignore
````
1: .prism.log
2: node_modules
3: yarn-error.log
4: codegen.log
5: Brewfile.lock.json
6: dist
7: dist-deno
8: /*.tgz
9: .idea/
````

## File: .prettierignore
````
1: CHANGELOG.md
2: /ecosystem-tests/*/**
3: /node_modules
4: /deno
5: 
6: # don't format tsc output, will break source maps
7: /dist
8: /packages/*/dist
````

## File: .prettierrc.json
````json
1: {
2:   "arrowParens": "always",
3:   "experimentalTernaries": true,
4:   "printWidth": 110,
5:   "singleQuote": true,
6:   "trailingComma": "all"
7: }
````

## File: .release-please-manifest.json
````json
1: {
2:   ".": "0.52.0",
3:   "packages/vertex-sdk": "0.11.4",
4:   "packages/bedrock-sdk": "0.22.1"
5: }
````

## File: .stats.yml
````yaml
1: configured_endpoints: 26
2: openapi_spec_url: https://storage.googleapis.com/stainless-sdk-openapi-specs/anthropic%2Fanthropic-1fdf23e8226430012c21819427e8d1ed16c08c0fb2d4abf69b8e318a42e99552.yml
3: openapi_spec_hash: 836bbb4ab7c33c37456d1842876d7aba
4: config_hash: 7b17fe2f10f5942177ff51b0a13506fa
````

## File: api.md
````markdown
  1: # Anthropic
  2: 
  3: # Shared
  4: 
  5: Types:
  6: 
  7: - <code><a href="./src/resources/shared.ts">APIErrorObject</a></code>
  8: - <code><a href="./src/resources/shared.ts">AuthenticationError</a></code>
  9: - <code><a href="./src/resources/shared.ts">BillingError</a></code>
 10: - <code><a href="./src/resources/shared.ts">ErrorObject</a></code>
 11: - <code><a href="./src/resources/shared.ts">ErrorResponse</a></code>
 12: - <code><a href="./src/resources/shared.ts">GatewayTimeoutError</a></code>
 13: - <code><a href="./src/resources/shared.ts">InvalidRequestError</a></code>
 14: - <code><a href="./src/resources/shared.ts">NotFoundError</a></code>
 15: - <code><a href="./src/resources/shared.ts">OverloadedError</a></code>
 16: - <code><a href="./src/resources/shared.ts">PermissionError</a></code>
 17: - <code><a href="./src/resources/shared.ts">RateLimitError</a></code>
 18: 
 19: # Messages
 20: 
 21: Types:
 22: 
 23: - <code><a href="./src/resources/messages/messages.ts">Base64ImageSource</a></code>
 24: - <code><a href="./src/resources/messages/messages.ts">Base64PDFSource</a></code>
 25: - <code><a href="./src/resources/messages/messages.ts">CacheControlEphemeral</a></code>
 26: - <code><a href="./src/resources/messages/messages.ts">CitationCharLocation</a></code>
 27: - <code><a href="./src/resources/messages/messages.ts">CitationCharLocationParam</a></code>
 28: - <code><a href="./src/resources/messages/messages.ts">CitationContentBlockLocation</a></code>
 29: - <code><a href="./src/resources/messages/messages.ts">CitationContentBlockLocationParam</a></code>
 30: - <code><a href="./src/resources/messages/messages.ts">CitationPageLocation</a></code>
 31: - <code><a href="./src/resources/messages/messages.ts">CitationPageLocationParam</a></code>
 32: - <code><a href="./src/resources/messages/messages.ts">CitationWebSearchResultLocationParam</a></code>
 33: - <code><a href="./src/resources/messages/messages.ts">CitationsConfigParam</a></code>
 34: - <code><a href="./src/resources/messages/messages.ts">CitationsDelta</a></code>
 35: - <code><a href="./src/resources/messages/messages.ts">CitationsWebSearchResultLocation</a></code>
 36: - <code><a href="./src/resources/messages/messages.ts">ContentBlock</a></code>
 37: - <code><a href="./src/resources/messages/messages.ts">ContentBlockParam</a></code>
 38: - <code><a href="./src/resources/messages/messages.ts">ContentBlockSource</a></code>
 39: - <code><a href="./src/resources/messages/messages.ts">ContentBlockSourceContent</a></code>
 40: - <code><a href="./src/resources/messages/messages.ts">ContentBlockStartEvent</a></code>
 41: - <code><a href="./src/resources/messages/messages.ts">ContentBlockStopEvent</a></code>
 42: - <code><a href="./src/resources/messages/messages.ts">DocumentBlockParam</a></code>
 43: - <code><a href="./src/resources/messages/messages.ts">ImageBlockParam</a></code>
 44: - <code><a href="./src/resources/messages/messages.ts">InputJSONDelta</a></code>
 45: - <code><a href="./src/resources/messages/messages.ts">Message</a></code>
 46: - <code><a href="./src/resources/messages/messages.ts">MessageCountTokensTool</a></code>
 47: - <code><a href="./src/resources/messages/messages.ts">MessageDeltaEvent</a></code>
 48: - <code><a href="./src/resources/messages/messages.ts">MessageDeltaUsage</a></code>
 49: - <code><a href="./src/resources/messages/messages.ts">MessageParam</a></code>
 50: - <code><a href="./src/resources/messages/messages.ts">MessageTokensCount</a></code>
 51: - <code><a href="./src/resources/messages/messages.ts">Metadata</a></code>
 52: - <code><a href="./src/resources/messages/messages.ts">Model</a></code>
 53: - <code><a href="./src/resources/messages/messages.ts">PlainTextSource</a></code>
 54: - <code><a href="./src/resources/messages/messages.ts">RawContentBlockDelta</a></code>
 55: - <code><a href="./src/resources/messages/messages.ts">RawContentBlockDeltaEvent</a></code>
 56: - <code><a href="./src/resources/messages/messages.ts">RawContentBlockStartEvent</a></code>
 57: - <code><a href="./src/resources/messages/messages.ts">RawContentBlockStopEvent</a></code>
 58: - <code><a href="./src/resources/messages/messages.ts">RawMessageDeltaEvent</a></code>
 59: - <code><a href="./src/resources/messages/messages.ts">RawMessageStartEvent</a></code>
 60: - <code><a href="./src/resources/messages/messages.ts">RawMessageStopEvent</a></code>
 61: - <code><a href="./src/resources/messages/messages.ts">RawMessageStreamEvent</a></code>
 62: - <code><a href="./src/resources/messages/messages.ts">RedactedThinkingBlock</a></code>
 63: - <code><a href="./src/resources/messages/messages.ts">RedactedThinkingBlockParam</a></code>
 64: - <code><a href="./src/resources/messages/messages.ts">ServerToolUsage</a></code>
 65: - <code><a href="./src/resources/messages/messages.ts">ServerToolUseBlock</a></code>
 66: - <code><a href="./src/resources/messages/messages.ts">ServerToolUseBlockParam</a></code>
 67: - <code><a href="./src/resources/messages/messages.ts">SignatureDelta</a></code>
 68: - <code><a href="./src/resources/messages/messages.ts">StopReason</a></code>
 69: - <code><a href="./src/resources/messages/messages.ts">TextBlock</a></code>
 70: - <code><a href="./src/resources/messages/messages.ts">TextBlockParam</a></code>
 71: - <code><a href="./src/resources/messages/messages.ts">TextCitation</a></code>
 72: - <code><a href="./src/resources/messages/messages.ts">TextCitationParam</a></code>
 73: - <code><a href="./src/resources/messages/messages.ts">TextDelta</a></code>
 74: - <code><a href="./src/resources/messages/messages.ts">ThinkingBlock</a></code>
 75: - <code><a href="./src/resources/messages/messages.ts">ThinkingBlockParam</a></code>
 76: - <code><a href="./src/resources/messages/messages.ts">ThinkingConfigDisabled</a></code>
 77: - <code><a href="./src/resources/messages/messages.ts">ThinkingConfigEnabled</a></code>
 78: - <code><a href="./src/resources/messages/messages.ts">ThinkingConfigParam</a></code>
 79: - <code><a href="./src/resources/messages/messages.ts">ThinkingDelta</a></code>
 80: - <code><a href="./src/resources/messages/messages.ts">Tool</a></code>
 81: - <code><a href="./src/resources/messages/messages.ts">ToolBash20250124</a></code>
 82: - <code><a href="./src/resources/messages/messages.ts">ToolChoice</a></code>
 83: - <code><a href="./src/resources/messages/messages.ts">ToolChoiceAny</a></code>
 84: - <code><a href="./src/resources/messages/messages.ts">ToolChoiceAuto</a></code>
 85: - <code><a href="./src/resources/messages/messages.ts">ToolChoiceNone</a></code>
 86: - <code><a href="./src/resources/messages/messages.ts">ToolChoiceTool</a></code>
 87: - <code><a href="./src/resources/messages/messages.ts">ToolResultBlockParam</a></code>
 88: - <code><a href="./src/resources/messages/messages.ts">ToolTextEditor20250124</a></code>
 89: - <code><a href="./src/resources/messages/messages.ts">ToolUnion</a></code>
 90: - <code><a href="./src/resources/messages/messages.ts">ToolUseBlock</a></code>
 91: - <code><a href="./src/resources/messages/messages.ts">ToolUseBlockParam</a></code>
 92: - <code><a href="./src/resources/messages/messages.ts">URLImageSource</a></code>
 93: - <code><a href="./src/resources/messages/messages.ts">URLPDFSource</a></code>
 94: - <code><a href="./src/resources/messages/messages.ts">Usage</a></code>
 95: - <code><a href="./src/resources/messages/messages.ts">WebSearchResultBlock</a></code>
 96: - <code><a href="./src/resources/messages/messages.ts">WebSearchResultBlockParam</a></code>
 97: - <code><a href="./src/resources/messages/messages.ts">WebSearchTool20250305</a></code>
 98: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolRequestError</a></code>
 99: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolResultBlock</a></code>
100: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolResultBlockContent</a></code>
101: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolResultBlockParam</a></code>
102: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolResultBlockParamContent</a></code>
103: - <code><a href="./src/resources/messages/messages.ts">WebSearchToolResultError</a></code>
104: - <code><a href="./src/resources/messages/messages.ts">MessageStreamEvent</a></code>
105: - <code><a href="./src/resources/messages/messages.ts">MessageStartEvent</a></code>
106: - <code><a href="./src/resources/messages/messages.ts">MessageDeltaEvent</a></code>
107: - <code><a href="./src/resources/messages/messages.ts">MessageStopEvent</a></code>
108: - <code><a href="./src/resources/messages/messages.ts">ContentBlockStartEvent</a></code>
109: - <code><a href="./src/resources/messages/messages.ts">ContentBlockDeltaEvent</a></code>
110: - <code><a href="./src/resources/messages/messages.ts">ContentBlockStopEvent</a></code>
111: 
112: Methods:
113: 
114: - <code title="post /v1/messages">client.messages.<a href="./src/resources/messages/messages.ts">create</a>({ ...params }) -> Message</code>
115: - <code title="post /v1/messages/count_tokens">client.messages.<a href="./src/resources/messages/messages.ts">countTokens</a>({ ...params }) -> MessageTokensCount</code>
116: - <code>client.messages.<a href="./src/resources/messages.ts">stream</a>(body, options?) -> MessageStream</code>
117: 
118: ## Batches
119: 
120: Types:
121: 
122: - <code><a href="./src/resources/messages/batches.ts">DeletedMessageBatch</a></code>
123: - <code><a href="./src/resources/messages/batches.ts">MessageBatch</a></code>
124: - <code><a href="./src/resources/messages/batches.ts">MessageBatchCanceledResult</a></code>
125: - <code><a href="./src/resources/messages/batches.ts">MessageBatchErroredResult</a></code>
126: - <code><a href="./src/resources/messages/batches.ts">MessageBatchExpiredResult</a></code>
127: - <code><a href="./src/resources/messages/batches.ts">MessageBatchIndividualResponse</a></code>
128: - <code><a href="./src/resources/messages/batches.ts">MessageBatchRequestCounts</a></code>
129: - <code><a href="./src/resources/messages/batches.ts">MessageBatchResult</a></code>
130: - <code><a href="./src/resources/messages/batches.ts">MessageBatchSucceededResult</a></code>
131: 
132: Methods:
133: 
134: - <code title="post /v1/messages/batches">client.messages.batches.<a href="./src/resources/messages/batches.ts">create</a>({ ...params }) -> MessageBatch</code>
135: - <code title="get /v1/messages/batches/{message_batch_id}">client.messages.batches.<a href="./src/resources/messages/batches.ts">retrieve</a>(messageBatchID) -> MessageBatch</code>
136: - <code title="get /v1/messages/batches">client.messages.batches.<a href="./src/resources/messages/batches.ts">list</a>({ ...params }) -> MessageBatchesPage</code>
137: - <code title="delete /v1/messages/batches/{message_batch_id}">client.messages.batches.<a href="./src/resources/messages/batches.ts">delete</a>(messageBatchID) -> DeletedMessageBatch</code>
138: - <code title="post /v1/messages/batches/{message_batch_id}/cancel">client.messages.batches.<a href="./src/resources/messages/batches.ts">cancel</a>(messageBatchID) -> MessageBatch</code>
139: - <code title="get /v1/messages/batches/{message_batch_id}/results">client.messages.batches.<a href="./src/resources/messages/batches.ts">results</a>(messageBatchID) -> MessageBatchIndividualResponse</code>
140: 
141: # Models
142: 
143: Types:
144: 
145: - <code><a href="./src/resources/models.ts">ModelInfo</a></code>
146: 
147: Methods:
148: 
149: - <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(modelID, { ...params }) -> ModelInfo</code>
150: - <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelInfosPage</code>
151: 
152: # Beta
153: 
154: Types:
155: 
156: - <code><a href="./src/resources/beta/beta.ts">AnthropicBeta</a></code>
157: - <code><a href="./src/resources/beta/beta.ts">BetaAPIError</a></code>
158: - <code><a href="./src/resources/beta/beta.ts">BetaAuthenticationError</a></code>
159: - <code><a href="./src/resources/beta/beta.ts">BetaBillingError</a></code>
160: - <code><a href="./src/resources/beta/beta.ts">BetaError</a></code>
161: - <code><a href="./src/resources/beta/beta.ts">BetaErrorResponse</a></code>
162: - <code><a href="./src/resources/beta/beta.ts">BetaGatewayTimeoutError</a></code>
163: - <code><a href="./src/resources/beta/beta.ts">BetaInvalidRequestError</a></code>
164: - <code><a href="./src/resources/beta/beta.ts">BetaNotFoundError</a></code>
165: - <code><a href="./src/resources/beta/beta.ts">BetaOverloadedError</a></code>
166: - <code><a href="./src/resources/beta/beta.ts">BetaPermissionError</a></code>
167: - <code><a href="./src/resources/beta/beta.ts">BetaRateLimitError</a></code>
168: 
169: ## Models
170: 
171: Types:
172: 
173: - <code><a href="./src/resources/beta/models.ts">BetaModelInfo</a></code>
174: 
175: Methods:
176: 
177: - <code title="get /v1/models/{model_id}?beta=true">client.beta.models.<a href="./src/resources/beta/models.ts">retrieve</a>(modelID, { ...params }) -> BetaModelInfo</code>
178: - <code title="get /v1/models?beta=true">client.beta.models.<a href="./src/resources/beta/models.ts">list</a>({ ...params }) -> BetaModelInfosPage</code>
179: 
180: ## Messages
181: 
182: Types:
183: 
184: - <code><a href="./src/resources/beta/messages/messages.ts">BetaBase64ImageSource</a></code>
185: - <code><a href="./src/resources/beta/messages/messages.ts">BetaBase64PDFBlock</a></code>
186: - <code><a href="./src/resources/beta/messages/messages.ts">BetaBase64PDFSource</a></code>
187: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCacheControlEphemeral</a></code>
188: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCacheCreation</a></code>
189: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationCharLocation</a></code>
190: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationCharLocationParam</a></code>
191: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationContentBlockLocation</a></code>
192: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationContentBlockLocationParam</a></code>
193: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationPageLocation</a></code>
194: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationPageLocationParam</a></code>
195: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationWebSearchResultLocationParam</a></code>
196: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationsConfigParam</a></code>
197: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationsDelta</a></code>
198: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCitationsWebSearchResultLocation</a></code>
199: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionOutputBlock</a></code>
200: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionOutputBlockParam</a></code>
201: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionResultBlock</a></code>
202: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionResultBlockParam</a></code>
203: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionTool20250522</a></code>
204: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultBlock</a></code>
205: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultBlockContent</a></code>
206: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultBlockParam</a></code>
207: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultBlockParamContent</a></code>
208: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultError</a></code>
209: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultErrorCode</a></code>
210: - <code><a href="./src/resources/beta/messages/messages.ts">BetaCodeExecutionToolResultErrorParam</a></code>
211: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContainer</a></code>
212: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContainerUploadBlock</a></code>
213: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContainerUploadBlockParam</a></code>
214: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContentBlock</a></code>
215: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContentBlockParam</a></code>
216: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContentBlockSource</a></code>
217: - <code><a href="./src/resources/beta/messages/messages.ts">BetaContentBlockSourceContent</a></code>
218: - <code><a href="./src/resources/beta/messages/messages.ts">BetaFileDocumentSource</a></code>
219: - <code><a href="./src/resources/beta/messages/messages.ts">BetaFileImageSource</a></code>
220: - <code><a href="./src/resources/beta/messages/messages.ts">BetaImageBlockParam</a></code>
221: - <code><a href="./src/resources/beta/messages/messages.ts">BetaInputJSONDelta</a></code>
222: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMCPToolResultBlock</a></code>
223: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMCPToolUseBlock</a></code>
224: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMCPToolUseBlockParam</a></code>
225: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMessage</a></code>
226: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMessageDeltaUsage</a></code>
227: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMessageParam</a></code>
228: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMessageTokensCount</a></code>
229: - <code><a href="./src/resources/beta/messages/messages.ts">BetaMetadata</a></code>
230: - <code><a href="./src/resources/beta/messages/messages.ts">BetaPlainTextSource</a></code>
231: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawContentBlockDelta</a></code>
232: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawContentBlockDeltaEvent</a></code>
233: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawContentBlockStartEvent</a></code>
234: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawContentBlockStopEvent</a></code>
235: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawMessageDeltaEvent</a></code>
236: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawMessageStartEvent</a></code>
237: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawMessageStopEvent</a></code>
238: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRawMessageStreamEvent</a></code>
239: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRedactedThinkingBlock</a></code>
240: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRedactedThinkingBlockParam</a></code>
241: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRequestMCPServerToolConfiguration</a></code>
242: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRequestMCPServerURLDefinition</a></code>
243: - <code><a href="./src/resources/beta/messages/messages.ts">BetaRequestMCPToolResultBlockParam</a></code>
244: - <code><a href="./src/resources/beta/messages/messages.ts">BetaServerToolUsage</a></code>
245: - <code><a href="./src/resources/beta/messages/messages.ts">BetaServerToolUseBlock</a></code>
246: - <code><a href="./src/resources/beta/messages/messages.ts">BetaServerToolUseBlockParam</a></code>
247: - <code><a href="./src/resources/beta/messages/messages.ts">BetaSignatureDelta</a></code>
248: - <code><a href="./src/resources/beta/messages/messages.ts">BetaStopReason</a></code>
249: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTextBlock</a></code>
250: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTextBlockParam</a></code>
251: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTextCitation</a></code>
252: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTextCitationParam</a></code>
253: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTextDelta</a></code>
254: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingBlock</a></code>
255: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingBlockParam</a></code>
256: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingConfigDisabled</a></code>
257: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingConfigEnabled</a></code>
258: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingConfigParam</a></code>
259: - <code><a href="./src/resources/beta/messages/messages.ts">BetaThinkingDelta</a></code>
260: - <code><a href="./src/resources/beta/messages/messages.ts">BetaTool</a></code>
261: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolBash20241022</a></code>
262: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolBash20250124</a></code>
263: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolChoice</a></code>
264: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolChoiceAny</a></code>
265: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolChoiceAuto</a></code>
266: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolChoiceNone</a></code>
267: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolChoiceTool</a></code>
268: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolComputerUse20241022</a></code>
269: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolComputerUse20250124</a></code>
270: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolResultBlockParam</a></code>
271: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolTextEditor20241022</a></code>
272: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolTextEditor20250124</a></code>
273: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolTextEditor20250429</a></code>
274: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolUnion</a></code>
275: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolUseBlock</a></code>
276: - <code><a href="./src/resources/beta/messages/messages.ts">BetaToolUseBlockParam</a></code>
277: - <code><a href="./src/resources/beta/messages/messages.ts">BetaURLImageSource</a></code>
278: - <code><a href="./src/resources/beta/messages/messages.ts">BetaURLPDFSource</a></code>
279: - <code><a href="./src/resources/beta/messages/messages.ts">BetaUsage</a></code>
280: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchResultBlock</a></code>
281: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchResultBlockParam</a></code>
282: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchTool20250305</a></code>
283: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolRequestError</a></code>
284: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultBlock</a></code>
285: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultBlockContent</a></code>
286: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultBlockParam</a></code>
287: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultBlockParamContent</a></code>
288: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultError</a></code>
289: - <code><a href="./src/resources/beta/messages/messages.ts">BetaWebSearchToolResultErrorCode</a></code>
290: 
291: Methods:
292: 
293: - <code title="post /v1/messages?beta=true">client.beta.messages.<a href="./src/resources/beta/messages/messages.ts">create</a>({ ...params }) -> BetaMessage</code>
294: - <code title="post /v1/messages/count_tokens?beta=true">client.beta.messages.<a href="./src/resources/beta/messages/messages.ts">countTokens</a>({ ...params }) -> BetaMessageTokensCount</code>
295: 
296: ### Batches
297: 
298: Types:
299: 
300: - <code><a href="./src/resources/beta/messages/batches.ts">BetaDeletedMessageBatch</a></code>
301: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatch</a></code>
302: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchCanceledResult</a></code>
303: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchErroredResult</a></code>
304: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchExpiredResult</a></code>
305: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchIndividualResponse</a></code>
306: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchRequestCounts</a></code>
307: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchResult</a></code>
308: - <code><a href="./src/resources/beta/messages/batches.ts">BetaMessageBatchSucceededResult</a></code>
309: 
310: Methods:
311: 
312: - <code title="post /v1/messages/batches?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">create</a>({ ...params }) -> BetaMessageBatch</code>
313: - <code title="get /v1/messages/batches/{message_batch_id}?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">retrieve</a>(messageBatchID, { ...params }) -> BetaMessageBatch</code>
314: - <code title="get /v1/messages/batches?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">list</a>({ ...params }) -> BetaMessageBatchesPage</code>
315: - <code title="delete /v1/messages/batches/{message_batch_id}?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">delete</a>(messageBatchID, { ...params }) -> BetaDeletedMessageBatch</code>
316: - <code title="post /v1/messages/batches/{message_batch_id}/cancel?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">cancel</a>(messageBatchID, { ...params }) -> BetaMessageBatch</code>
317: - <code title="get /v1/messages/batches/{message_batch_id}/results?beta=true">client.beta.messages.batches.<a href="./src/resources/beta/messages/batches.ts">results</a>(messageBatchID, { ...params }) -> BetaMessageBatchIndividualResponse</code>
318: 
319: ## Files
320: 
321: Types:
322: 
323: - <code><a href="./src/resources/beta/files.ts">DeletedFile</a></code>
324: - <code><a href="./src/resources/beta/files.ts">FileMetadata</a></code>
325: 
326: Methods:
327: 
328: - <code title="get /v1/files?beta=true">client.beta.files.<a href="./src/resources/beta/files.ts">list</a>({ ...params }) -> FileMetadataPage</code>
329: - <code title="delete /v1/files/{file_id}?beta=true">client.beta.files.<a href="./src/resources/beta/files.ts">delete</a>(fileID, { ...params }) -> DeletedFile</code>
330: - <code title="get /v1/files/{file_id}/content?beta=true">client.beta.files.<a href="./src/resources/beta/files.ts">download</a>(fileID, { ...params }) -> Response</code>
331: - <code title="get /v1/files/{file_id}?beta=true">client.beta.files.<a href="./src/resources/beta/files.ts">retrieveMetadata</a>(fileID, { ...params }) -> FileMetadata</code>
332: - <code title="post /v1/files?beta=true">client.beta.files.<a href="./src/resources/beta/files.ts">upload</a>({ ...params }) -> FileMetadata</code>
````

## File: CHANGELOG.md
````markdown
   1: # Changelog
   2: 
   3: ## 0.52.0 (2025-05-22)
   4: 
   5: Full Changelog: [sdk-v0.51.0...sdk-v0.52.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.51.0...sdk-v0.52.0)
   6: 
   7: ### Features
   8: 
   9: * **api:** add claude 4 models, files API, code execution tool, MCP connector and more ([769f9da](https://github.com/anthropics/anthropic-sdk-typescript/commit/769f9da91cf4480d1e4aa4bb488d6d9cc2471985))
  10: 
  11: 
  12: ### Chores
  13: 
  14: * **internal:** codegen related update ([2ed236d](https://github.com/anthropics/anthropic-sdk-typescript/commit/2ed236ddb9977a91289c4799692a583f460ce8b6))
  15: * **internal:** version bump ([8ebaf61](https://github.com/anthropics/anthropic-sdk-typescript/commit/8ebaf616d2e5c6aebc153f19a403dde41ab5a9f1))
  16: 
  17: ## 0.51.0 (2025-05-15)
  18: 
  19: Full Changelog: [sdk-v0.50.4...sdk-v0.51.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.50.4...sdk-v0.51.0)
  20: 
  21: ### Features
  22: 
  23: * **bedrock:** support skipAuth on Bedrock client to bypass local auth requirements ([b661c5f](https://github.com/anthropics/anthropic-sdk-typescript/commit/b661c5fe4d93fa749de5b7cbbce98dc224a68adc))
  24: 
  25: 
  26: ### Bug Fixes
  27: 
  28: * **bedrock:** support model names with slashes ([cb5fa8a](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb5fa8a8f55ed12382aeb5f09110b0d5fefc46bb))
  29: 
  30: 
  31: ### Chores
  32: 
  33: * **package:** remove engines ([f0378ec](https://github.com/anthropics/anthropic-sdk-typescript/commit/f0378ec0be0cac0b165d169a05548692f8ef3b69))
  34: 
  35: ## 0.50.4 (2025-05-12)
  36: 
  37: Full Changelog: [sdk-v0.50.3...sdk-v0.50.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.50.3...sdk-v0.50.4)
  38: 
  39: ### Bug Fixes
  40: 
  41: * **stream:** correctly accumulate usage ([c55b4f0](https://github.com/anthropics/anthropic-sdk-typescript/commit/c55b4f01cdd545faf93d6f463caef6f6c5839f07))
  42: 
  43: ## 0.50.3 (2025-05-09)
  44: 
  45: Full Changelog: [sdk-v0.50.2...sdk-v0.50.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.50.2...sdk-v0.50.3)
  46: 
  47: ### Bug Fixes
  48: 
  49: * **client:** always overwrite when merging headers ([657912a](https://github.com/anthropics/anthropic-sdk-typescript/commit/657912ad66f86e878291a4cab5436844efbb633b))
  50: * **client:** always overwrite when merging headers ([bf70c9f](https://github.com/anthropics/anthropic-sdk-typescript/commit/bf70c9f6c8031616cb3927d86272dbcce2158b4e))
  51: 
  52: ## 0.50.2 (2025-05-09)
  53: 
  54: Full Changelog: [sdk-v0.50.1...sdk-v0.50.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.50.1...sdk-v0.50.2)
  55: 
  56: ### Bug Fixes
  57: 
  58: * **ci:** bump publish workflow to node 20 ([306a081](https://github.com/anthropics/anthropic-sdk-typescript/commit/306a0816c3fe383ae8ac78a43ebb57927597417e))
  59: 
  60: 
  61: ### Chores
  62: 
  63: * **internal:** minor sync ([d89476f](https://github.com/anthropics/anthropic-sdk-typescript/commit/d89476ffacccdf1c30c03bbfac8ae3280a4e8d08))
  64: * sync repo ([508e385](https://github.com/anthropics/anthropic-sdk-typescript/commit/508e38511c13ba8842065d0dafbc7f462abe0322))
  65: 
  66: 
  67: ### Documentation
  68: 
  69: * update readme ([ef0c60a](https://github.com/anthropics/anthropic-sdk-typescript/commit/ef0c60afc9ebc690c6179466a22d3e26c77f71db))
  70: 
  71: ## 0.50.1 (2025-05-09)
  72: 
  73: Full Changelog: [sdk-v0.50.0...sdk-v0.50.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.50.0...sdk-v0.50.1)
  74: 
  75: ## 0.50.0 (2025-05-09)
  76: 
  77: Full Changelog: [sdk-v0.41.0...sdk-v0.50.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.41.0...sdk-v0.42.0)
  78: 
  79: ### Features
  80: 
  81: * **api:** adds web search capabilities to the Claude API ([b36623f](https://github.com/anthropics/anthropic-sdk-typescript/commit/b36623f33134e937ba8fc7585ab5fab3b31203ed))
  82: * **api:** manual updates ([80d5daa](https://github.com/anthropics/anthropic-sdk-typescript/commit/80d5daaff943536fbf300f5f19d7c9922294e837))
  83: * **api:** manual updates ([3124e2b](https://github.com/anthropics/anthropic-sdk-typescript/commit/3124e2b5fc5d279403f409168186cb08de3b0d13))
  84: * **client:** add withOptions helper ([caab783](https://github.com/anthropics/anthropic-sdk-typescript/commit/caab78382741526d50e0c6d3a3e2834ac889fbd7))
  85: 
  86: 
  87: ### Bug Fixes
  88: 
  89: * **bedrock,vertex:** update to new SDK version ([cb620bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/cb620bbb60e64f27168f74db7a48ad8c2d5f953e))
  90: * **client:** send all configured auth headers ([3961628](https://github.com/anthropics/anthropic-sdk-typescript/commit/3961628811d807cc967b9f0f781e55415b578f5d))
  91: * **internal:** fix file uploads in node 18 jest ([1071b34](https://github.com/anthropics/anthropic-sdk-typescript/commit/1071b342d56a81d375f2b373c649843f800a3ad5))
  92: * **mcp:** remove unused tools.ts ([4c4d763](https://github.com/anthropics/anthropic-sdk-typescript/commit/4c4d7635bf6c6ef3fd810adefb3a290ad0f59576))
  93: * **messages:** updates for server tools ([c2709b2](https://github.com/anthropics/anthropic-sdk-typescript/commit/c2709b27b17a5a80daf399b7bfca41b953706d51))
  94: * update old links ([f33a68a](https://github.com/anthropics/anthropic-sdk-typescript/commit/f33a68abddd29ef8f8fe1a334d7dcd259595c4cb))
  95: * **vertex,bedrock:** correct build script ([df895a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/df895a7d7cbd51422343fca95ab9f1d58918b2a1))
  96: 
  97: 
  98: ### Chores
  99: 
 100: * **bedrock:** add `skipAuth` option to allow users to let authorization be handled elsewhere ([ee58772](https://github.com/anthropics/anthropic-sdk-typescript/commit/ee587723718109797efa80b020076c43a300f1b9))
 101: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([ff925db](https://github.com/anthropics/anthropic-sdk-typescript/commit/ff925db987a66950c997ec50b9c55e67152d1945))
 102: * **bedrock:** bump @aws-sdk/credential-providers ([9f611d6](https://github.com/anthropics/anthropic-sdk-typescript/commit/9f611d6ba8c6b3de02c3183e4f2f42d1540525f0))
 103: * **ci:** add timeout thresholds for CI jobs ([385f900](https://github.com/anthropics/anthropic-sdk-typescript/commit/385f900ae36892a8c65e2568faf46ce7bb011206))
 104: * **ci:** only use depot for staging repos ([1f05880](https://github.com/anthropics/anthropic-sdk-typescript/commit/1f058806ccd549aa99194fc8b808ab21c7655bcf))
 105: * **ci:** run on more branches and use depot runners ([7176150](https://github.com/anthropics/anthropic-sdk-typescript/commit/7176150915334f06ac2ee3ed854ddf6752c1e113))
 106: * **client:** drop support for EOL node versions ([ffbb2da](https://github.com/anthropics/anthropic-sdk-typescript/commit/ffbb2dac2b9e3b82c57d043dfb279ab95948cbc0))
 107: * **client:** minor internal fixes ([595678f](https://github.com/anthropics/anthropic-sdk-typescript/commit/595678f2b8588f20d7ca3d9219878a4d72c56c7d))
 108: * **internal:** codegen related update ([a6ae129](https://github.com/anthropics/anthropic-sdk-typescript/commit/a6ae12953f6f841d4585a8cf8cf03fa24f17d57c))
 109: * **internal:** fix format script ([9ce30ba](https://github.com/anthropics/anthropic-sdk-typescript/commit/9ce30ba225a37feb50c0089164bbec830ab18a1c))
 110: * **internal:** formatting fixes ([7bd4594](https://github.com/anthropics/anthropic-sdk-typescript/commit/7bd45941a46703db869161fd0585cd209efc782c))
 111: * **internal:** improve index signature formatting ([7dc3e19](https://github.com/anthropics/anthropic-sdk-typescript/commit/7dc3e190c854623c030d20530cef2f16798dae50))
 112: * **internal:** improve node 18 shims ([c6780dd](https://github.com/anthropics/anthropic-sdk-typescript/commit/c6780ddc12282ae1e6796825c713bacf5a50812c))
 113: * **internal:** reduce CI branch coverage ([464431d](https://github.com/anthropics/anthropic-sdk-typescript/commit/464431d1e57954812b10baa04d12795f4cba6b76))
 114: * **internal:** refactor utils ([b3dee57](https://github.com/anthropics/anthropic-sdk-typescript/commit/b3dee573e69afe41d1c588e732780b5d370980dd))
 115: * **internal:** share typescript helpers ([74187db](https://github.com/anthropics/anthropic-sdk-typescript/commit/74187dbc73585c68aa6ae0f05bcba6053d257434))
 116: * **internal:** upload builds and expand CI branch coverage ([bbda5d3](https://github.com/anthropics/anthropic-sdk-typescript/commit/bbda5d3ccd5c10abbd0727c33c9d63bd366ef557))
 117: * **perf:** faster base64 decoding ([975795a](https://github.com/anthropics/anthropic-sdk-typescript/commit/975795a61b3067396035621638feb631a7e44dbc))
 118: * **tests:** improve enum examples ([66cf6d4](https://github.com/anthropics/anthropic-sdk-typescript/commit/66cf6d4d460f93c728aeee069af4f134b853b7d7))
 119: 
 120: 
 121: ### Documentation
 122: 
 123: * **readme:** fix typo ([6f8fce9](https://github.com/anthropics/anthropic-sdk-typescript/commit/6f8fce9cf7a921b0fc7a5cf0aada0ce130667082))
 124: 
 125: ## 0.41.0 (2025-05-07)
 126: 
 127: Full Changelog: [sdk-v0.40.1...sdk-v0.41.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.40.1...sdk-v0.41.0)
 128: 
 129: ### Features
 130: 
 131: * **api:** adds web search capabilities to the Claude API ([fae7e52](https://github.com/anthropics/anthropic-sdk-typescript/commit/fae7e521568d9659e376d13c4e4a6c320b13b1d4))
 132: 
 133: 
 134: ### Chores
 135: 
 136: * **ci:** bump node version for release workflows ([3502747](https://github.com/anthropics/anthropic-sdk-typescript/commit/350274792ed3d9b7ea237ee60876883373344016))
 137: 
 138: 
 139: ### Documentation
 140: 
 141: * add examples to tsdocs ([19a9285](https://github.com/anthropics/anthropic-sdk-typescript/commit/19a928512b1616f2cac9c82f02e7bd9a158dab95))
 142: * **readme:** fix typo ([735574e](https://github.com/anthropics/anthropic-sdk-typescript/commit/735574e23b7956cbfd0c05d0374079391d5d4e96))
 143: 
 144: ## 0.40.1 (2025-04-28)
 145: 
 146: Full Changelog: [sdk-v0.40.0...sdk-v0.40.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.40.0...sdk-v0.40.1)
 147: 
 148: ### Chores
 149: 
 150: * **bedrock:** bump [@aws-sdk](https://github.com/aws-sdk) dependencies ([6440e1d](https://github.com/anthropics/anthropic-sdk-typescript/commit/6440e1db992779aeead231b420a55002ec0991d1))
 151: 
 152: ## 0.40.0 (2025-04-25)
 153: 
 154: Full Changelog: [sdk-v0.39.0...sdk-v0.40.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.39.0...sdk-v0.40.0)
 155: 
 156: ### Features
 157: 
 158: * add SKIP_BREW env var to ./scripts/bootstrap ([#710](https://github.com/anthropics/anthropic-sdk-typescript/issues/710)) ([1b8376a](https://github.com/anthropics/anthropic-sdk-typescript/commit/1b8376aac5475e1bb6b5f79c7c5684ab77908c1f))
 159: * **api:** extract ContentBlockDelta events into their own schemas ([#732](https://github.com/anthropics/anthropic-sdk-typescript/issues/732)) ([fd0ec83](https://github.com/anthropics/anthropic-sdk-typescript/commit/fd0ec836ab9244c05b913a68224f806b4ac8da60))
 160: * **api:** manual updates ([39b64c9](https://github.com/anthropics/anthropic-sdk-typescript/commit/39b64c96679efa08e9220c6c3ecff297c6aa8b7c))
 161: * **api:** manual updates ([771e05b](https://github.com/anthropics/anthropic-sdk-typescript/commit/771e05b24690dbda1d2118f10fd19304db4f0826))
 162: * **api:** manual updates ([ca6dbd6](https://github.com/anthropics/anthropic-sdk-typescript/commit/ca6dbd6b1588b94da6d1763cb52f54cc42aacaa1))
 163: * **api:** manual updates ([14df8cc](https://github.com/anthropics/anthropic-sdk-typescript/commit/14df8cce890993e7056dfe5432f86b53faf7a044))
 164: * **client:** accept RFC6838 JSON content types ([#713](https://github.com/anthropics/anthropic-sdk-typescript/issues/713)) ([fc32787](https://github.com/anthropics/anthropic-sdk-typescript/commit/fc3278702b3d27f792006e9710432f612e856af1))
 165: * **mcp:** allow opt-in mcp resources and endpoints ([#720](https://github.com/anthropics/anthropic-sdk-typescript/issues/720)) ([9f3a54e](https://github.com/anthropics/anthropic-sdk-typescript/commit/9f3a54e868feb78e63a4593aae3b7fffc4ce588f))
 166: 
 167: 
 168: ### Bug Fixes
 169: 
 170: * **api:** improve type resolution when importing as a package ([#738](https://github.com/anthropics/anthropic-sdk-typescript/issues/738)) ([8992ed4](https://github.com/anthropics/anthropic-sdk-typescript/commit/8992ed4b8fa3ce7216c0d8414b79ad71adefdf42))
 171: * avoid type error in certain environments ([#723](https://github.com/anthropics/anthropic-sdk-typescript/issues/723)) ([208fdaf](https://github.com/anthropics/anthropic-sdk-typescript/commit/208fdaf0e00ab4cb12c0172cda870f3f1e13098c))
 172: * **client:** deduplicate stop reason type ([#726](https://github.com/anthropics/anthropic-sdk-typescript/issues/726)) ([2d7cef1](https://github.com/anthropics/anthropic-sdk-typescript/commit/2d7cef14ecdb0501deac02ca270b355ffa5275f2))
 173: * **client:** send `X-Stainless-Timeout` in seconds ([#733](https://github.com/anthropics/anthropic-sdk-typescript/issues/733)) ([cae4f77](https://github.com/anthropics/anthropic-sdk-typescript/commit/cae4f77474a84d2ce81b890dfb39d3b28c8b5834))
 174: * **client:** send all configured auth headers ([#742](https://github.com/anthropics/anthropic-sdk-typescript/issues/742)) ([86708b4](https://github.com/anthropics/anthropic-sdk-typescript/commit/86708b496558fe52d46bd6a77f705273fad374b1))
 175: * **exports:** ensure resource imports don't require /index ([#717](https://github.com/anthropics/anthropic-sdk-typescript/issues/717)) ([56b2a80](https://github.com/anthropics/anthropic-sdk-typescript/commit/56b2a80145999256d4c075cf48be891df7832aad))
 176: * **internal:** work around https://github.com/vercel/next.js/issues/76881 ([#727](https://github.com/anthropics/anthropic-sdk-typescript/issues/727)) ([36ea0ef](https://github.com/anthropics/anthropic-sdk-typescript/commit/36ea0efd017d48931b3954034744234aec084a42))
 177: * **mcp:** remove unused tools.ts ([#740](https://github.com/anthropics/anthropic-sdk-typescript/issues/740)) ([26793e7](https://github.com/anthropics/anthropic-sdk-typescript/commit/26793e7fe5a7c03d5adac69564a588e5a030c01c))
 178: * remove duplicate exports ([2df4cdd](https://github.com/anthropics/anthropic-sdk-typescript/commit/2df4cdd6f3a4f35a858fde57ce6327c50d3319d8))
 179: 
 180: 
 181: ### Chores
 182: 
 183: * add hash of OpenAPI spec/config inputs to .stats.yml ([#725](https://github.com/anthropics/anthropic-sdk-typescript/issues/725)) ([271be7d](https://github.com/anthropics/anthropic-sdk-typescript/commit/271be7d6d3cc615df3c8c48d4e1fb907d286df62))
 184: * **bedrock:** bump @aws-sdk/credential-providers ([a4d88d7](https://github.com/anthropics/anthropic-sdk-typescript/commit/a4d88d7807e2cf1a0836dc05d9deff5bfc0c665f))
 185: * **ci:** add timeout thresholds for CI jobs ([1080c70](https://github.com/anthropics/anthropic-sdk-typescript/commit/1080c704f2e6c08d396aec7e3782c86c705cfe49))
 186: * **ci:** only use depot for staging repos ([359dafa](https://github.com/anthropics/anthropic-sdk-typescript/commit/359dafae718f626d1b0883fb40c0df3421d5939c))
 187: * **ci:** run on more branches and use depot runners ([3331315](https://github.com/anthropics/anthropic-sdk-typescript/commit/333131560d0e1557e037fbc2bc7b60b74d0c3fed))
 188: * **client:** minor internal fixes ([fcf3e35](https://github.com/anthropics/anthropic-sdk-typescript/commit/fcf3e3559692d09e5b5568a6cfa90c342bb33c60))
 189: * **internal:** add aliases for Record and Array ([#735](https://github.com/anthropics/anthropic-sdk-typescript/issues/735)) ([e0a4bec](https://github.com/anthropics/anthropic-sdk-typescript/commit/e0a4becfdd79898b1187b50b18bb5a082e67c7cd))
 190: * **internal:** add back release workflow ([68d54e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/68d54e5540bf5cc9c9bf21c8e21a3d7225e17bba))
 191: * **internal:** codegen related update ([#737](https://github.com/anthropics/anthropic-sdk-typescript/issues/737)) ([2a368bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/2a368bbb8d13d409116881ece456af3c36998c8f))
 192: * **internal:** fix lint ([2cf3641](https://github.com/anthropics/anthropic-sdk-typescript/commit/2cf3641681fdfc01bd8ffbb7154d2ebcb5d8a8d3))
 193: * **internal:** import ordering changes ([#708](https://github.com/anthropics/anthropic-sdk-typescript/issues/708)) ([a5680e1](https://github.com/anthropics/anthropic-sdk-typescript/commit/a5680e1466a6ea1bed0ddc4c880dd4e342ea1350))
 194: * **internal:** improve index signature formatting ([#739](https://github.com/anthropics/anthropic-sdk-typescript/issues/739)) ([627c5fa](https://github.com/anthropics/anthropic-sdk-typescript/commit/627c5fadfb1a0b84dd4715d96cb9234607952957))
 195: * **internal:** reduce CI branch coverage ([6ed0bd6](https://github.com/anthropics/anthropic-sdk-typescript/commit/6ed0bd6fa8e3076ff908a1cd1cec3f110afef431))
 196: * **internal:** remove CI condition ([#730](https://github.com/anthropics/anthropic-sdk-typescript/issues/730)) ([cc31518](https://github.com/anthropics/anthropic-sdk-typescript/commit/cc3151809070c885450f0884fb5120e0276e2d66))
 197: * **internal:** remove extra empty newlines ([#716](https://github.com/anthropics/anthropic-sdk-typescript/issues/716)) ([4d3c024](https://github.com/anthropics/anthropic-sdk-typescript/commit/4d3c02496ee09625fbcb5da545e90faa3890a885))
 198: * **internal:** update config ([#728](https://github.com/anthropics/anthropic-sdk-typescript/issues/728)) ([ababd80](https://github.com/anthropics/anthropic-sdk-typescript/commit/ababd809519fb31ae82395c77b997fd76a3d804e))
 199: * **internal:** upload builds and expand CI branch coverage ([#744](https://github.com/anthropics/anthropic-sdk-typescript/issues/744)) ([0b7432a](https://github.com/anthropics/anthropic-sdk-typescript/commit/0b7432a3f1088f36ae4c45f99872d18ad9167d80))
 200: * **tests:** improve enum examples ([#743](https://github.com/anthropics/anthropic-sdk-typescript/issues/743)) ([c1c93a7](https://github.com/anthropics/anthropic-sdk-typescript/commit/c1c93a7ecf17b4cd1956344678d325b36fafd598))
 201: 
 202: ## 0.39.0 (2025-02-28)
 203: 
 204: Full Changelog: [sdk-v0.38.0...sdk-v0.39.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.38.0...sdk-v0.39.0)
 205: 
 206: ### Features
 207: 
 208: * **api:** add support for disabling tool calls ([#701](https://github.com/anthropics/anthropic-sdk-typescript/issues/701)) ([1602b51](https://github.com/anthropics/anthropic-sdk-typescript/commit/1602b5156432d587c3fd55abb719cab98ef50928))
 209: 
 210: 
 211: ### Documentation
 212: 
 213: * update URLs from stainlessapi.com to stainless.com ([#699](https://github.com/anthropics/anthropic-sdk-typescript/issues/699)) ([05e33b7](https://github.com/anthropics/anthropic-sdk-typescript/commit/05e33b7f5fbcc2adacd2c3ab1d4c7806ea7d40fd))
 214: 
 215: ## 0.38.0 (2025-02-27)
 216: 
 217: Full Changelog: [sdk-v0.37.0...sdk-v0.38.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.37.0...sdk-v0.38.0)
 218: 
 219: ### Features
 220: 
 221: * **api:** add URL source blocks for images and PDFs ([#698](https://github.com/anthropics/anthropic-sdk-typescript/issues/698)) ([16e7336](https://github.com/anthropics/anthropic-sdk-typescript/commit/16e7336ca99f261ab21efabfadc927f3e3c34198))
 222: 
 223: 
 224: ### Chores
 225: 
 226: * **internal:** update spec ([#692](https://github.com/anthropics/anthropic-sdk-typescript/issues/692)) ([142f221](https://github.com/anthropics/anthropic-sdk-typescript/commit/142f221d364c7450f3397563f59e56f8d9a41e02))
 227: 
 228: 
 229: ### Documentation
 230: 
 231: * add thinking examples ([db6f761](https://github.com/anthropics/anthropic-sdk-typescript/commit/db6f761007b29b2ace293723f20728ad31b316dd))
 232: 
 233: ## 0.37.0 (2025-02-24)
 234: 
 235: Full Changelog: [sdk-v0.36.3...sdk-v0.37.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.36.3...sdk-v0.37.0)
 236: 
 237: ### Features
 238: 
 239: * **api:** add claude-3.7 + support for thinking ([ffab311](https://github.com/anthropics/anthropic-sdk-typescript/commit/ffab3113ddb042951a35d71e571727f8cce184ee))
 240: * **client:** send `X-Stainless-Timeout` header ([#679](https://github.com/anthropics/anthropic-sdk-typescript/issues/679)) ([1172430](https://github.com/anthropics/anthropic-sdk-typescript/commit/1172430c87ba42acd2e16f4960247fe4003641a5))
 241: * **pagination:** avoid fetching when has_more: false ([#680](https://github.com/anthropics/anthropic-sdk-typescript/issues/680)) ([d4df248](https://github.com/anthropics/anthropic-sdk-typescript/commit/d4df248ff4eafa15b5f4b21b3da69d1a710052fa))
 242: 
 243: 
 244: ### Bug Fixes
 245: 
 246: * **client:** fix export map for index exports ([#684](https://github.com/anthropics/anthropic-sdk-typescript/issues/684)) ([56d9c7a](https://github.com/anthropics/anthropic-sdk-typescript/commit/56d9c7ab269af132d2ac374b6b7b9e5e523e0720))
 247: * correctly decode multi-byte characters over multiple chunks ([#681](https://github.com/anthropics/anthropic-sdk-typescript/issues/681)) ([e369e3d](https://github.com/anthropics/anthropic-sdk-typescript/commit/e369e3d650f2d761c3479935502615cab2a42b8d))
 248: * optimize sse chunk reading off-by-one error ([#686](https://github.com/anthropics/anthropic-sdk-typescript/issues/686)) ([53669af](https://github.com/anthropics/anthropic-sdk-typescript/commit/53669af8507c503dfd109ea34896dd018fbb1fc8))
 249: 
 250: 
 251: ### Chores
 252: 
 253: * **api:** update openapi spec url ([#678](https://github.com/anthropics/anthropic-sdk-typescript/issues/678)) ([84401b1](https://github.com/anthropics/anthropic-sdk-typescript/commit/84401b1068a11ae241a03643d32c459d837a82c6))
 254: * **internal:** add missing return type annotation ([#685](https://github.com/anthropics/anthropic-sdk-typescript/issues/685)) ([a8862b9](https://github.com/anthropics/anthropic-sdk-typescript/commit/a8862b9d39f688707ecf2142b002aa27a3cbd09b))
 255: * **internal:** fix devcontainers setup ([#689](https://github.com/anthropics/anthropic-sdk-typescript/issues/689)) ([8665946](https://github.com/anthropics/anthropic-sdk-typescript/commit/8665946ded8472e892301449569aae30613175fa))
 256: * **internal:** reorder model constants ([#676](https://github.com/anthropics/anthropic-sdk-typescript/issues/676)) ([52a2a11](https://github.com/anthropics/anthropic-sdk-typescript/commit/52a2a11467e4c117b50516104eb9b29aca86e232))
 257: * **internal:** update models used in tests ([52a2a11](https://github.com/anthropics/anthropic-sdk-typescript/commit/52a2a11467e4c117b50516104eb9b29aca86e232))
 258: 
 259: ## 0.36.3 (2025-01-27)
 260: 
 261: Full Changelog: [sdk-v0.36.2...sdk-v0.36.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.36.2...sdk-v0.36.3)
 262: 
 263: ### Bug Fixes
 264: 
 265: * **streaming:** accumulate citations ([#675](https://github.com/anthropics/anthropic-sdk-typescript/issues/675)) ([522118f](https://github.com/anthropics/anthropic-sdk-typescript/commit/522118ffeab327e8476f12d9b9fa1f19042ed714))
 266: 
 267: 
 268: ### Chores
 269: 
 270: * **docs:** updates ([#673](https://github.com/anthropics/anthropic-sdk-typescript/issues/673)) ([751ecd0](https://github.com/anthropics/anthropic-sdk-typescript/commit/751ecd0d44707b21ccb390c81716937fae3d8e35))
 271: 
 272: ## 0.36.2 (2025-01-23)
 273: 
 274: Full Changelog: [sdk-v0.36.1...sdk-v0.36.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.36.1...sdk-v0.36.2)
 275: 
 276: ### Bug Fixes
 277: 
 278: * **bedrock:** update streaming util import ([255c059](https://github.com/anthropics/anthropic-sdk-typescript/commit/255c0599e333e6fae582255e3b0631538b168c69))
 279: 
 280: ## 0.36.1 (2025-01-23)
 281: 
 282: Full Changelog: [sdk-v0.36.0...sdk-v0.36.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.36.0...sdk-v0.36.1)
 283: 
 284: ### Chores
 285: 
 286: * **tests:** fix types ([9efe3ee](https://github.com/anthropics/anthropic-sdk-typescript/commit/9efe3eebf64bd762a34caf362a1cd1a0f0858f92))
 287: 
 288: ## 0.36.0 (2025-01-23)
 289: 
 290: Full Changelog: [sdk-v0.35.0...sdk-v0.36.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.35.0...sdk-v0.36.0)
 291: 
 292: ### Features
 293: 
 294: * **api:** add citations ([#668](https://github.com/anthropics/anthropic-sdk-typescript/issues/668)) ([1fef177](https://github.com/anthropics/anthropic-sdk-typescript/commit/1fef17749adbbeb243480b96c04941be29c0746c))
 295: * **client:** support results endpoint ([#666](https://github.com/anthropics/anthropic-sdk-typescript/issues/666)) ([db5fffe](https://github.com/anthropics/anthropic-sdk-typescript/commit/db5fffeb38a99a3e9283ebf001fbf767d756162e))
 296: * **stream:** expose `response` property as well ([b0235c7](https://github.com/anthropics/anthropic-sdk-typescript/commit/b0235c7b3ac174b3c8e670e381b4aa038e61c826))
 297: 
 298: 
 299: ### Chores
 300: 
 301: * **bedrock:** bump dependency on @anthropic-ai/sdk ([8745ca2](https://github.com/anthropics/anthropic-sdk-typescript/commit/8745ca2160f5af4d89e5732a44e560c5e2787aa8))
 302: * **internal:** fix import ([628b55e](https://github.com/anthropics/anthropic-sdk-typescript/commit/628b55ef5ff8f0245287ecaea688480a0174e2e9))
 303: * **internal:** minor restructuring ([#664](https://github.com/anthropics/anthropic-sdk-typescript/issues/664)) ([57aefa7](https://github.com/anthropics/anthropic-sdk-typescript/commit/57aefa73230d54da24d787a89adc277481986d02))
 304: * **vertex:** bump dependency on @anthropic-ai/sdk ([a1c7fcd](https://github.com/anthropics/anthropic-sdk-typescript/commit/a1c7fcdce081f860cbb1148c3862e3303ddb8a62))
 305: 
 306: ## 0.35.0 (2025-01-21)
 307: 
 308: Full Changelog: [sdk-v0.34.0...sdk-v0.35.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.34.0...sdk-v0.35.0)
 309: 
 310: ### Features
 311: 
 312: * add beta message streaming helpers ([#655](https://github.com/anthropics/anthropic-sdk-typescript/issues/655)) ([d7b5af1](https://github.com/anthropics/anthropic-sdk-typescript/commit/d7b5af1629dbcefdb7bfdca271ab497567830227))
 313: * **stream:** add `.withResponse()` ([#654](https://github.com/anthropics/anthropic-sdk-typescript/issues/654)) ([b54477f](https://github.com/anthropics/anthropic-sdk-typescript/commit/b54477f20c92db4c2c5ed89af5d46c36b035bf1e))
 314: * **streaming:** add `.request_id` getter ([4572478](https://github.com/anthropics/anthropic-sdk-typescript/commit/4572478266a67e12e32ffef69817cbc495943b1d))
 315: 
 316: 
 317: ### Bug Fixes
 318: 
 319: * **docs:** correct results return type ([#657](https://github.com/anthropics/anthropic-sdk-typescript/issues/657)) ([4e6d031](https://github.com/anthropics/anthropic-sdk-typescript/commit/4e6d031a41625ebf9c4311638e0c149179fcae0c))
 320: * **examples:** add token counting example ([2498e2e](https://github.com/anthropics/anthropic-sdk-typescript/commit/2498e2eaf49d66a664ed1fdcd7bbd331979cf5b2))
 321: * send correct Accept header for certain endpoints ([#651](https://github.com/anthropics/anthropic-sdk-typescript/issues/651)) ([17ffaeb](https://github.com/anthropics/anthropic-sdk-typescript/commit/17ffaeba5af48d13b08483973b82cfe1ae79347f))
 322: * **vertex:** add beta.messages.countTokens method ([51d3f23](https://github.com/anthropics/anthropic-sdk-typescript/commit/51d3f23a7cc1bea798cc8e4041e08114ebc3a4eb))
 323: 
 324: 
 325: ### Chores
 326: 
 327: * deprecate more models ([661f5f9](https://github.com/anthropics/anthropic-sdk-typescript/commit/661f5f9d9b24f3661df246dcf101dd9812b3e19e))
 328: * **internal:** add test ([#660](https://github.com/anthropics/anthropic-sdk-typescript/issues/660)) ([3ec7d1a](https://github.com/anthropics/anthropic-sdk-typescript/commit/3ec7d1a9eea30255b24cdb16c1a26705bdfea0ac))
 329: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([43dd43c](https://github.com/anthropics/anthropic-sdk-typescript/commit/43dd43c4c8ab69d5a60e59473af7dff5f7799048))
 330: * **internal:** update examples ([#649](https://github.com/anthropics/anthropic-sdk-typescript/issues/649)) ([036a239](https://github.com/anthropics/anthropic-sdk-typescript/commit/036a239800fec7e6cbc439f125101d5475eae5b3))
 331: * **types:** add `| undefined` to client options properties ([#656](https://github.com/anthropics/anthropic-sdk-typescript/issues/656)) ([d642298](https://github.com/anthropics/anthropic-sdk-typescript/commit/d642298334529ff95b9d7ac497d548a6b04dbcfb))
 332: 
 333: 
 334: ### Documentation
 335: 
 336: * **readme:** fix misplaced period ([#650](https://github.com/anthropics/anthropic-sdk-typescript/issues/650)) ([8754744](https://github.com/anthropics/anthropic-sdk-typescript/commit/87547448c8b4bf69a61756af1f12927f33b68680))
 337: * **readme:** fix Request IDs example ([#659](https://github.com/anthropics/anthropic-sdk-typescript/issues/659)) ([6d3162d](https://github.com/anthropics/anthropic-sdk-typescript/commit/6d3162da1ddb964b75e575376f278468ba1ed9f5))
 338: 
 339: ## 0.34.0 (2024-12-20)
 340: 
 341: Full Changelog: [sdk-v0.33.1...sdk-v0.34.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.33.1...sdk-v0.34.0)
 342: 
 343: ### Features
 344: 
 345: * **api:** add message batch delete endpoint ([#640](https://github.com/anthropics/anthropic-sdk-typescript/issues/640)) ([54f7e1f](https://github.com/anthropics/anthropic-sdk-typescript/commit/54f7e1ffb9a2956ee27a4a715b84717aa681eb7c))
 346: 
 347: 
 348: ### Bug Fixes
 349: 
 350: * **client:** normalize method ([#639](https://github.com/anthropics/anthropic-sdk-typescript/issues/639)) ([384bb04](https://github.com/anthropics/anthropic-sdk-typescript/commit/384bb042dd854ed753c6bd8e25f522d0e042bfbf))
 351: 
 352: 
 353: ### Chores
 354: 
 355: * bump testing data uri ([#637](https://github.com/anthropics/anthropic-sdk-typescript/issues/637)) ([3f23530](https://github.com/anthropics/anthropic-sdk-typescript/commit/3f23530fb55d9fec7278967ea02600e44e9f58e2))
 356: * **internal:** temporary revert commit ([#643](https://github.com/anthropics/anthropic-sdk-typescript/issues/643)) ([8057b1e](https://github.com/anthropics/anthropic-sdk-typescript/commit/8057b1eb67ccccee042a45f2efe53cccced15682))
 357: 
 358: 
 359: ### Documentation
 360: 
 361: * minor formatting changes ([#641](https://github.com/anthropics/anthropic-sdk-typescript/issues/641)) ([8b362ee](https://github.com/anthropics/anthropic-sdk-typescript/commit/8b362ee72954b31b4de920b35aed97255efa5e2e))
 362: * **readme:** add alpha callout ([#646](https://github.com/anthropics/anthropic-sdk-typescript/issues/646)) ([640304c](https://github.com/anthropics/anthropic-sdk-typescript/commit/640304c7c7e8bc67cbf799a646169736d89ad4c8))
 363: 
 364: ## 0.33.1 (2024-12-17)
 365: 
 366: Full Changelog: [sdk-v0.33.0...sdk-v0.33.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.33.0...sdk-v0.33.1)
 367: 
 368: ### Bug Fixes
 369: 
 370: * **vertex:** remove `anthropic_version` deletion for token counting ([88221be](https://github.com/anthropics/anthropic-sdk-typescript/commit/88221be305d6e13ccf92e6e9cdb00daba45b57db))
 371: 
 372: 
 373: ### Chores
 374: 
 375: * **internal:** fix some typos ([#633](https://github.com/anthropics/anthropic-sdk-typescript/issues/633)) ([a0298f5](https://github.com/anthropics/anthropic-sdk-typescript/commit/a0298f5f67b8ecd25de416dbb3eada68b86befd7))
 376: 
 377: ## 0.33.0 (2024-12-17)
 378: 
 379: Full Changelog: [sdk-v0.32.1...sdk-v0.33.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.32.1...sdk-v0.33.0)
 380: 
 381: ### Features
 382: 
 383: * **api:** general availability updates ([93d1316](https://github.com/anthropics/anthropic-sdk-typescript/commit/93d13168f950b2cdfc3b7c6664205b06418fea79))
 384: * **api:** general availability updates ([#631](https://github.com/anthropics/anthropic-sdk-typescript/issues/631)) ([b5c92e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/b5c92e5b74c370ac3f9ba28e915bd54588a42be0))
 385: * **client:** add ._request_id property to object responses ([#596](https://github.com/anthropics/anthropic-sdk-typescript/issues/596)) ([9d6d584](https://github.com/anthropics/anthropic-sdk-typescript/commit/9d6d58430a216df9888434158bf628ae4b067aba))
 386: * **internal:** make git install file structure match npm ([#617](https://github.com/anthropics/anthropic-sdk-typescript/issues/617)) ([d3dd7d5](https://github.com/anthropics/anthropic-sdk-typescript/commit/d3dd7d5f8cad460dd18725d5c0f3c8db3f00115d))
 387: * **vertex:** support token counting ([9e76b4d](https://github.com/anthropics/anthropic-sdk-typescript/commit/9e76b4dc22d62b1239b382bb771b69ad8cff9442))
 388: 
 389: 
 390: ### Bug Fixes
 391: 
 392: * **docs:** add missing await to pagination example ([#609](https://github.com/anthropics/anthropic-sdk-typescript/issues/609)) ([e303077](https://github.com/anthropics/anthropic-sdk-typescript/commit/e303077ebab73c41adee7d25375b767c3fc78998))
 393: * **types:** remove anthropic-instant-1.2 model ([#599](https://github.com/anthropics/anthropic-sdk-typescript/issues/599)) ([e222a4d](https://github.com/anthropics/anthropic-sdk-typescript/commit/e222a4d0518aa80671c66ee2a25d87dc87a51316))
 394: 
 395: 
 396: ### Chores
 397: 
 398: * **api:** update spec version ([#607](https://github.com/anthropics/anthropic-sdk-typescript/issues/607)) ([ea44f9a](https://github.com/anthropics/anthropic-sdk-typescript/commit/ea44f9ac49dcc25a5dfa53880ebf61318ee90f6c))
 399: * **api:** update spec version ([#629](https://github.com/anthropics/anthropic-sdk-typescript/issues/629)) ([a25295c](https://github.com/anthropics/anthropic-sdk-typescript/commit/a25295cd6db7b57162fdd9049eb8a3c37bb94f08))
 400: * **bedrock,vertex:** remove unsupported countTokens method ([#597](https://github.com/anthropics/anthropic-sdk-typescript/issues/597)) ([17b7da5](https://github.com/anthropics/anthropic-sdk-typescript/commit/17b7da5ee6f35ea2bdd53a66a662871affae6341))
 401: * **bedrock:** remove unsupported methods ([6458dc1](https://github.com/anthropics/anthropic-sdk-typescript/commit/6458dc14544c16240a6580a21a36fcf5bde594b2))
 402: * **ci:** remove unneeded workflow ([#594](https://github.com/anthropics/anthropic-sdk-typescript/issues/594)) ([7572e48](https://github.com/anthropics/anthropic-sdk-typescript/commit/7572e48dbccb2090562399c7ff2d01503c86f445))
 403: * **client:** drop unused devDependency ([#610](https://github.com/anthropics/anthropic-sdk-typescript/issues/610)) ([5d0d523](https://github.com/anthropics/anthropic-sdk-typescript/commit/5d0d523390d8c34cae836c423940b67defb9d2aa))
 404: * improve browser error message ([#613](https://github.com/anthropics/anthropic-sdk-typescript/issues/613)) ([c26121e](https://github.com/anthropics/anthropic-sdk-typescript/commit/c26121e84039b7430995b6363876ea9795ba31ed))
 405: * **internal:** bump cross-spawn to v7.0.6 ([#624](https://github.com/anthropics/anthropic-sdk-typescript/issues/624)) ([e58ba9a](https://github.com/anthropics/anthropic-sdk-typescript/commit/e58ba9a177ec5c8545fd3a3f4fd3d2e7c722f023))
 406: * **internal:** remove unnecessary getRequestClient function ([#623](https://github.com/anthropics/anthropic-sdk-typescript/issues/623)) ([882c45f](https://github.com/anthropics/anthropic-sdk-typescript/commit/882c45f5a0bd1f4b996d59e6589a205c2111f46b))
 407: * **internal:** update isAbsoluteURL ([#627](https://github.com/anthropics/anthropic-sdk-typescript/issues/627)) ([2528ea0](https://github.com/anthropics/anthropic-sdk-typescript/commit/2528ea0dcfc83f38e76b58eaadaa5e8c5c0b188d))
 408: * **internal:** update spec ([#630](https://github.com/anthropics/anthropic-sdk-typescript/issues/630)) ([82cac06](https://github.com/anthropics/anthropic-sdk-typescript/commit/82cac065e2711467773c0ea62848cdf139ed5a11))
 409: * **internal:** use reexports not destructuring ([#604](https://github.com/anthropics/anthropic-sdk-typescript/issues/604)) ([e4daff2](https://github.com/anthropics/anthropic-sdk-typescript/commit/e4daff2b6a3fb42876ebd06ed4947c88cff919d8))
 410: * remove redundant word in comment ([#615](https://github.com/anthropics/anthropic-sdk-typescript/issues/615)) ([ef57a10](https://github.com/anthropics/anthropic-sdk-typescript/commit/ef57a103bcfc922a724a7c878f970dbd369b305e))
 411: * **tests:** limit array example length ([#611](https://github.com/anthropics/anthropic-sdk-typescript/issues/611)) ([91dc181](https://github.com/anthropics/anthropic-sdk-typescript/commit/91dc1812db2cc9e1f4660a13106bad932518b7cf))
 412: * **types:** nicer error class types + jsdocs ([#626](https://github.com/anthropics/anthropic-sdk-typescript/issues/626)) ([0287993](https://github.com/anthropics/anthropic-sdk-typescript/commit/0287993912ef81bd2c49603d120f49f4f979d75e))
 413: 
 414: 
 415: ### Documentation
 416: 
 417: * remove suggestion to use `npm` call out ([#614](https://github.com/anthropics/anthropic-sdk-typescript/issues/614)) ([6369261](https://github.com/anthropics/anthropic-sdk-typescript/commit/6369261e3597351f17b8f1a3945ca56b00eba177))
 418: * use latest sonnet in example snippets ([#625](https://github.com/anthropics/anthropic-sdk-typescript/issues/625)) ([f70882b](https://github.com/anthropics/anthropic-sdk-typescript/commit/f70882b0e8119a414b01b9f0b85fbe1ccb06f122))
 419: 
 420: ## 0.32.1 (2024-11-05)
 421: 
 422: Full Changelog: [sdk-v0.32.0...sdk-v0.32.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.32.0...sdk-v0.32.1)
 423: 
 424: ### Bug Fixes
 425: 
 426: * **bedrock:** don't mutate request body inputs ([f83b535](https://github.com/anthropics/anthropic-sdk-typescript/commit/f83b53520262219229cecc388f95d92be83c09d5))
 427: * **vertex:** don't mutate request body inputs ([e9a82e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/e9a82e56f0d7fff956c2ebd19e103a190f8beb83))
 428: 
 429: ## 0.32.0 (2024-11-04)
 430: 
 431: Full Changelog: [sdk-v0.31.0...sdk-v0.32.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.31.0...sdk-v0.32.0)
 432: 
 433: ### Features
 434: 
 435: * **api:** add new haiku model ([#587](https://github.com/anthropics/anthropic-sdk-typescript/issues/587)) ([983b13c](https://github.com/anthropics/anthropic-sdk-typescript/commit/983b13c9e4f55b832fc4fddfd46bed89756d745e))
 436: 
 437: 
 438: ### Bug Fixes
 439: 
 440: * don't require deno to run build-deno ([#586](https://github.com/anthropics/anthropic-sdk-typescript/issues/586)) ([0e431d6](https://github.com/anthropics/anthropic-sdk-typescript/commit/0e431d61ec318aae09687dee0bfb922ccb8ddd15))
 441: * **types:** add missing token-counting-2024-11-01 ([#583](https://github.com/anthropics/anthropic-sdk-typescript/issues/583)) ([13d629c](https://github.com/anthropics/anthropic-sdk-typescript/commit/13d629c9b444a32b69729df7792199556a2b95f2))
 442: 
 443: 
 444: ### Chores
 445: 
 446: * remove unused build-deno condition ([#585](https://github.com/anthropics/anthropic-sdk-typescript/issues/585)) ([491e8fe](https://github.com/anthropics/anthropic-sdk-typescript/commit/491e8fe28745aeb55217809f94ad4e37900f4675))
 447: 
 448: ## 0.31.0 (2024-11-01)
 449: 
 450: Full Changelog: [sdk-v0.30.1...sdk-v0.31.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.30.1...sdk-v0.31.0)
 451: 
 452: ### Features
 453: 
 454: * **api:** add message token counting & PDFs support ([#582](https://github.com/anthropics/anthropic-sdk-typescript/issues/582)) ([b593837](https://github.com/anthropics/anthropic-sdk-typescript/commit/b593837ae2d320414a26b5ec53aa6d3f30a3e6bc))
 455: 
 456: 
 457: ### Bug Fixes
 458: 
 459: * **countTokens:** correctly set beta header ([1680757](https://github.com/anthropics/anthropic-sdk-typescript/commit/16807572af923831e384869a0a6ccccaa8dbec84))
 460: * **internal:** support pnpm git installs ([#579](https://github.com/anthropics/anthropic-sdk-typescript/issues/579)) ([86bb102](https://github.com/anthropics/anthropic-sdk-typescript/commit/86bb102ce33346930a8b0a553a909fcc7d964a36))
 461: * **types:** add missing token-counting-2024-11-01 ([aff1546](https://github.com/anthropics/anthropic-sdk-typescript/commit/aff1546cd84ce50a52d17bcdcaba54e60e92955a))
 462: 
 463: 
 464: ### Reverts
 465: 
 466: * disable isolatedModules and change imports ([#575](https://github.com/anthropics/anthropic-sdk-typescript/issues/575)) ([2c3b176](https://github.com/anthropics/anthropic-sdk-typescript/commit/2c3b176fc551c21abef240b4fa6a98d33ca52048))
 467: 
 468: 
 469: ### Chores
 470: 
 471: * **internal:** update spec version ([#571](https://github.com/anthropics/anthropic-sdk-typescript/issues/571)) ([5760012](https://github.com/anthropics/anthropic-sdk-typescript/commit/576001245f0b5222cb9b17fafb8619f68d51bec3))
 472: 
 473: 
 474: ### Documentation
 475: 
 476: * **readme:** minor typo fixes ([#577](https://github.com/anthropics/anthropic-sdk-typescript/issues/577)) ([8412854](https://github.com/anthropics/anthropic-sdk-typescript/commit/8412854c05837cdb8b8ff898bef2a4e0dbb23cd2))
 477: 
 478: 
 479: ### Refactors
 480: 
 481: * enable isolatedModules and change imports ([#573](https://github.com/anthropics/anthropic-sdk-typescript/issues/573)) ([9068b4b](https://github.com/anthropics/anthropic-sdk-typescript/commit/9068b4b0a0a08a69a9330ce03418135e11aa539e))
 482: * use type imports for type-only imports ([#580](https://github.com/anthropics/anthropic-sdk-typescript/issues/580)) ([2c8a337](https://github.com/anthropics/anthropic-sdk-typescript/commit/2c8a337033e850b7282d35b37c3ce36d5b0dabbe))
 483: 
 484: ## 0.30.1 (2024-10-23)
 485: 
 486: Full Changelog: [sdk-v0.30.0...sdk-v0.30.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.30.0...sdk-v0.30.1)
 487: 
 488: ### Bug Fixes
 489: 
 490: * **bedrock:** correct messages beta handling ([9b57586](https://github.com/anthropics/anthropic-sdk-typescript/commit/9b57586456221f8900902b8e85c7c017959c150a))
 491: * **vertex:** correct messages beta handling ([26f21ee](https://github.com/anthropics/anthropic-sdk-typescript/commit/26f21ee5f524f4cbfb7a97d40aa62553608b1d99))
 492: 
 493: 
 494: ### Chores
 495: 
 496: * **internal:** bumps eslint and related dependencies ([#570](https://github.com/anthropics/anthropic-sdk-typescript/issues/570)) ([0b3ebb0](https://github.com/anthropics/anthropic-sdk-typescript/commit/0b3ebb01c07356e09f0100c235200ca91384aa6a))
 497: 
 498: ## 0.30.0 (2024-10-22)
 499: 
 500: Full Changelog: [sdk-v0.29.2...sdk-v0.30.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.29.2...sdk-v0.30.0)
 501: 
 502: ### Features
 503: 
 504: * **api:** add new model and `computer-use-2024-10-22` beta ([6981d89](https://github.com/anthropics/anthropic-sdk-typescript/commit/6981d89d3efe6ae8d35c7562527a6c81ad8ed78f))
 505: * **bedrock:** add beta.messages.create() method ([6317592](https://github.com/anthropics/anthropic-sdk-typescript/commit/63175920a016a2ad187dd1127d263357cf6c007e))
 506: * **vertex:** add beta.messages.create() ([22cfdba](https://github.com/anthropics/anthropic-sdk-typescript/commit/22cfdba2a3a54e916f2efcbce62990544d3e5f5f))
 507: 
 508: 
 509: ### Bug Fixes
 510: 
 511: * **client:** respect x-stainless-retry-count default headers ([#562](https://github.com/anthropics/anthropic-sdk-typescript/issues/562)) ([274573f](https://github.com/anthropics/anthropic-sdk-typescript/commit/274573f5bc74e382302071850dee058ea2920f0c))
 512: 
 513: 
 514: ### Chores
 515: 
 516: * **api:** add title ([#564](https://github.com/anthropics/anthropic-sdk-typescript/issues/564)) ([a8b7544](https://github.com/anthropics/anthropic-sdk-typescript/commit/a8b7544e56d4a1dfa1f6de530ddaa728ae52c87f))
 517: * **internal:** update spec ([#566](https://github.com/anthropics/anthropic-sdk-typescript/issues/566)) ([5b998ea](https://github.com/anthropics/anthropic-sdk-typescript/commit/5b998eaf3216fba2283e7762faa115bd5f47a239))
 518: 
 519: ## 0.29.2 (2024-10-17)
 520: 
 521: Full Changelog: [sdk-v0.29.1...sdk-v0.29.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.29.1...sdk-v0.29.2)
 522: 
 523: ### Bug Fixes
 524: 
 525: * **types:** remove misleading betas TypedDict property for the Batch API ([#559](https://github.com/anthropics/anthropic-sdk-typescript/issues/559)) ([4de5d0a](https://github.com/anthropics/anthropic-sdk-typescript/commit/4de5d0a9d0a8733987d13dcef968146620d3b110))
 526: 
 527: ## 0.29.1 (2024-10-15)
 528: 
 529: Full Changelog: [sdk-v0.29.0...sdk-v0.29.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.29.0...sdk-v0.29.1)
 530: 
 531: ### Bug Fixes
 532: 
 533: * **beta:** merge betas param with the default value ([#556](https://github.com/anthropics/anthropic-sdk-typescript/issues/556)) ([5520bbc](https://github.com/anthropics/anthropic-sdk-typescript/commit/5520bbccaa75fbab5aa321402637c77651ae3c87))
 534: 
 535: 
 536: ### Chores
 537: 
 538: * **internal:** update spec URL ([#554](https://github.com/anthropics/anthropic-sdk-typescript/issues/554)) ([1fb6448](https://github.com/anthropics/anthropic-sdk-typescript/commit/1fb64489aa1b13c266692c7d14d2dd9b5350b7fc))
 539: 
 540: ## 0.29.0 (2024-10-08)
 541: 
 542: Full Changelog: [sdk-v0.28.0...sdk-v0.29.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.28.0...sdk-v0.29.0)
 543: 
 544: ### Features
 545: 
 546: * **api:** add message batches api ([4f114d5](https://github.com/anthropics/anthropic-sdk-typescript/commit/4f114d5121f5c66619c7bdd18d0aa2b7a627e3ff))
 547: 
 548: 
 549: ### Chores
 550: 
 551: * **internal:** move LineDecoder to a separate file ([#541](https://github.com/anthropics/anthropic-sdk-typescript/issues/541)) ([fd42469](https://github.com/anthropics/anthropic-sdk-typescript/commit/fd4246928d11347147955ca19efcd4c5b0accb10))
 552: * **internal:** pass props through internal parser ([#549](https://github.com/anthropics/anthropic-sdk-typescript/issues/549)) ([dd71955](https://github.com/anthropics/anthropic-sdk-typescript/commit/dd7195501e0419ca1e6bafd7341b0726e8b809ab))
 553: 
 554: 
 555: ### Refactors
 556: 
 557: * **types:** improve metadata type names ([#547](https://github.com/anthropics/anthropic-sdk-typescript/issues/547)) ([cef499c](https://github.com/anthropics/anthropic-sdk-typescript/commit/cef499cf3b01643f7e5e3c09524f49e198b940be))
 558: * **types:** improve metadata types ([#546](https://github.com/anthropics/anthropic-sdk-typescript/issues/546)) ([3fe538b](https://github.com/anthropics/anthropic-sdk-typescript/commit/3fe538bb8cd50e6d68cacc0846f287dc539238d3))
 559: * **types:** improve tool type names ([#543](https://github.com/anthropics/anthropic-sdk-typescript/issues/543)) ([18dbe77](https://github.com/anthropics/anthropic-sdk-typescript/commit/18dbe7773781eb3917c9609bf490b515d75e6841))
 560: * **types:** improve tool type names ([#544](https://github.com/anthropics/anthropic-sdk-typescript/issues/544)) ([fc2d823](https://github.com/anthropics/anthropic-sdk-typescript/commit/fc2d8230c6fb68e247743ffa82c3ba9f8b989adf))
 561: 
 562: ## 0.28.0 (2024-10-04)
 563: 
 564: Full Changelog: [sdk-v0.27.3...sdk-v0.28.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.27.3...sdk-v0.28.0)
 565: 
 566: ### Features
 567: 
 568: * **api:** support disabling parallel tool use ([#540](https://github.com/anthropics/anthropic-sdk-typescript/issues/540)) ([df0032f](https://github.com/anthropics/anthropic-sdk-typescript/commit/df0032f263884190b31a63ddcb20429372617deb))
 569: * **client:** allow overriding retry count header ([#536](https://github.com/anthropics/anthropic-sdk-typescript/issues/536)) ([ec11f91](https://github.com/anthropics/anthropic-sdk-typescript/commit/ec11f9189e9a24f413a9d48b21a10ce88e367ac3))
 570: * **client:** send retry count header ([#533](https://github.com/anthropics/anthropic-sdk-typescript/issues/533)) ([401b81c](https://github.com/anthropics/anthropic-sdk-typescript/commit/401b81c55c1f998dc917fc268884c162f214df20))
 571: 
 572: 
 573: ### Bug Fixes
 574: 
 575: * **types:** remove leftover polyfill usage ([#532](https://github.com/anthropics/anthropic-sdk-typescript/issues/532)) ([ac188b2](https://github.com/anthropics/anthropic-sdk-typescript/commit/ac188b29670d409c15e740bca26f8ef488cb7d05))
 576: 
 577: 
 578: ### Chores
 579: 
 580: * better object fallback behaviour for casting errors ([#503](https://github.com/anthropics/anthropic-sdk-typescript/issues/503)) ([3660e97](https://github.com/anthropics/anthropic-sdk-typescript/commit/3660e977e7127b10446b24b0a76b0133b3f666de))
 581: * better object fallback behaviour for casting errors ([#526](https://github.com/anthropics/anthropic-sdk-typescript/issues/526)) ([4ffb2e4](https://github.com/anthropics/anthropic-sdk-typescript/commit/4ffb2e4e1f5fef3ae58d9f4c99a63e75dd459c5b))
 582: * **internal:** add dev dependency ([#531](https://github.com/anthropics/anthropic-sdk-typescript/issues/531)) ([a9c127b](https://github.com/anthropics/anthropic-sdk-typescript/commit/a9c127b2854d0cf7efd49e7d46ff10fe52372949))
 583: 
 584: 
 585: ### Documentation
 586: 
 587: * improve and reference contributing documentation ([#539](https://github.com/anthropics/anthropic-sdk-typescript/issues/539)) ([cbef925](https://github.com/anthropics/anthropic-sdk-typescript/commit/cbef925519c63f09626ea7aa61ab8ba9d36bc35d))
 588: * update CONTRIBUTING.md ([#528](https://github.com/anthropics/anthropic-sdk-typescript/issues/528)) ([2609dec](https://github.com/anthropics/anthropic-sdk-typescript/commit/2609dec770d33b828c957e431f2d03871e67e629))
 589: 
 590: ## 0.27.3 (2024-09-09)
 591: 
 592: Full Changelog: [sdk-v0.27.2...sdk-v0.27.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.27.2...sdk-v0.27.3)
 593: 
 594: ### Bug Fixes
 595: 
 596: * **streaming:** correct error message serialisation ([#524](https://github.com/anthropics/anthropic-sdk-typescript/issues/524)) ([e150fa4](https://github.com/anthropics/anthropic-sdk-typescript/commit/e150fa47d0cd4cbbe1269e3971085d4a434fc3ba))
 597: * **uploads:** avoid making redundant memory copies ([#520](https://github.com/anthropics/anthropic-sdk-typescript/issues/520)) ([b6d2638](https://github.com/anthropics/anthropic-sdk-typescript/commit/b6d2638387612def84cebac2dedd5fbbea776d09))
 598: 
 599: 
 600: ### Chores
 601: 
 602: * **docs:** update browser support information ([#522](https://github.com/anthropics/anthropic-sdk-typescript/issues/522)) ([ce7aeb5](https://github.com/anthropics/anthropic-sdk-typescript/commit/ce7aeb59ccba4e4d19cb9aa88d7055fb585865ae))
 603: 
 604: ## 0.27.2 (2024-09-04)
 605: 
 606: Full Changelog: [sdk-v0.27.1...sdk-v0.27.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.27.1...sdk-v0.27.2)
 607: 
 608: ### Bug Fixes
 609: 
 610: * **client:** correct File construction from node-fetch Responses ([#518](https://github.com/anthropics/anthropic-sdk-typescript/issues/518)) ([62ae46f](https://github.com/anthropics/anthropic-sdk-typescript/commit/62ae46fb1e1b360850aafc9e935411c9b7d1c3bb))
 611: 
 612: 
 613: ### Chores
 614: 
 615: * **api:** deprecate claude-1 models ([53644d2](https://github.com/anthropics/anthropic-sdk-typescript/commit/53644d2690e62623afc04383cad0126f98ea37e8))
 616: * **ci:** install deps via ./script/bootstrap ([#515](https://github.com/anthropics/anthropic-sdk-typescript/issues/515)) ([90a8da1](https://github.com/anthropics/anthropic-sdk-typescript/commit/90a8da1dc937e9aea9fdf6862c3ddb414b39963a))
 617: * **internal:** dependency updates ([#519](https://github.com/anthropics/anthropic-sdk-typescript/issues/519)) ([b7b0cd6](https://github.com/anthropics/anthropic-sdk-typescript/commit/b7b0cd6579cd987662e7118f8563f68c0903f8da))
 618: * run tsc as part of lint script ([#513](https://github.com/anthropics/anthropic-sdk-typescript/issues/513)) ([c8127cf](https://github.com/anthropics/anthropic-sdk-typescript/commit/c8127cfa3bdd1370934fe122018e20fc659a4dbb))
 619: 
 620: ## 0.27.1 (2024-08-27)
 621: 
 622: Full Changelog: [sdk-v0.27.0...sdk-v0.27.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.27.0...sdk-v0.27.1)
 623: 
 624: ### Chores
 625: 
 626: * **ci:** check for build errors ([#511](https://github.com/anthropics/anthropic-sdk-typescript/issues/511)) ([3ab1d3d](https://github.com/anthropics/anthropic-sdk-typescript/commit/3ab1d3d936f5ba3500f2ce87012c38bd198c3cbd))
 627: 
 628: ## 0.27.0 (2024-08-21)
 629: 
 630: Full Changelog: [sdk-v0.26.1...sdk-v0.27.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.26.1...sdk-v0.27.0)
 631: 
 632: ### Features
 633: 
 634: * **client:** add support for browser usage ([#504](https://github.com/anthropics/anthropic-sdk-typescript/issues/504)) ([93c5f16](https://github.com/anthropics/anthropic-sdk-typescript/commit/93c5f16b4b8c3404bd67d6eb5a0556a8b0a5d027))
 635: 
 636: 
 637: ### Documentation
 638: 
 639: * **readme:** update formatting and clarity for CORS flag ([9cb2c35](https://github.com/anthropics/anthropic-sdk-typescript/commit/9cb2c35f92827eb8654b1669db5ba702770fcae4))
 640: 
 641: ## 0.26.1 (2024-08-15)
 642: 
 643: Full Changelog: [sdk-v0.26.0...sdk-v0.26.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.26.0...sdk-v0.26.1)
 644: 
 645: ### Chores
 646: 
 647: * **ci:** add CODEOWNERS file ([#498](https://github.com/anthropics/anthropic-sdk-typescript/issues/498)) ([c34433f](https://github.com/anthropics/anthropic-sdk-typescript/commit/c34433fb6528fdd00d189ea0a3b177d95c7c7fa9))
 648: * **docs/api:** update prompt caching helpers ([04195a3](https://github.com/anthropics/anthropic-sdk-typescript/commit/04195a345d62c98f826e5eecdad20f497db5b3e5))
 649: 
 650: ## 0.26.0 (2024-08-14)
 651: 
 652: Full Changelog: [sdk-v0.25.2...sdk-v0.26.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.25.2...sdk-v0.26.0)
 653: 
 654: ### Features
 655: 
 656: * **api:** add prompt caching beta ([c920b77](https://github.com/anthropics/anthropic-sdk-typescript/commit/c920b77fc67bd839bfeb6716ceab9d7c9bbe7393))
 657: * **client:** add streaming helpers ([39abc26](https://github.com/anthropics/anthropic-sdk-typescript/commit/39abc2635517d564ac8b7e63235f0a338fc4bed0))
 658: 
 659: 
 660: ### Chores
 661: 
 662: * **examples:** minor formatting changes ([#491](https://github.com/anthropics/anthropic-sdk-typescript/issues/491)) ([8afef58](https://github.com/anthropics/anthropic-sdk-typescript/commit/8afef584895ffa3f8382c98d2c0a3fc6138e9420))
 663: 
 664: ## 0.25.2 (2024-08-12)
 665: 
 666: Full Changelog: [sdk-v0.25.1...sdk-v0.25.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.25.1...sdk-v0.25.2)
 667: 
 668: ### Chores
 669: 
 670: * **ci:** bump prism mock server version ([#490](https://github.com/anthropics/anthropic-sdk-typescript/issues/490)) ([bfb27f5](https://github.com/anthropics/anthropic-sdk-typescript/commit/bfb27f54c9b4ff4f9ae06327db454f72431b5bf4))
 671: * **ci:** minor changes ([#488](https://github.com/anthropics/anthropic-sdk-typescript/issues/488)) ([747fd97](https://github.com/anthropics/anthropic-sdk-typescript/commit/747fd973af594cc52f244b33f31bcf8079733e7d))
 672: 
 673: ## 0.25.1 (2024-08-09)
 674: 
 675: Full Changelog: [sdk-v0.25.0...sdk-v0.25.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.25.0...sdk-v0.25.1)
 676: 
 677: ### Chores
 678: 
 679: * **internal:** update publish npm script ([#483](https://github.com/anthropics/anthropic-sdk-typescript/issues/483)) ([fb862ff](https://github.com/anthropics/anthropic-sdk-typescript/commit/fb862ff18be308ff710a2f97716f0ad1a62b9fbd))
 680: * **internal:** updates ([#487](https://github.com/anthropics/anthropic-sdk-typescript/issues/487)) ([67a3325](https://github.com/anthropics/anthropic-sdk-typescript/commit/67a3325aa05c5a19f06b0cb1e67517168427c300))
 681: * sync openapi version ([#481](https://github.com/anthropics/anthropic-sdk-typescript/issues/481)) ([5fd7e21](https://github.com/anthropics/anthropic-sdk-typescript/commit/5fd7e219732a4483c2edd9a812049569b31943c4))
 682: * sync openapi version ([#485](https://github.com/anthropics/anthropic-sdk-typescript/issues/485)) ([e74c522](https://github.com/anthropics/anthropic-sdk-typescript/commit/e74c522989cfb979ca916e416c7c14a349b32ef5))
 683: * sync openapi version ([#486](https://github.com/anthropics/anthropic-sdk-typescript/issues/486)) ([ad98e9e](https://github.com/anthropics/anthropic-sdk-typescript/commit/ad98e9eca5db4f5a04bf8c26e4c53050985cec33))
 684: 
 685: ## 0.25.0 (2024-07-29)
 686: 
 687: Full Changelog: [sdk-v0.24.3...sdk-v0.25.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.24.3...sdk-v0.25.0)
 688: 
 689: ### Features
 690: 
 691: * add back compat alias for InputJsonDelta ([8b08161](https://github.com/anthropics/anthropic-sdk-typescript/commit/8b081613a50821b8dfa8a1251d42337a20607411))
 692: * **client:** make request-id header more accessible ([#462](https://github.com/anthropics/anthropic-sdk-typescript/issues/462)) ([5ea6f8b](https://github.com/anthropics/anthropic-sdk-typescript/commit/5ea6f8be0696e3753d8624f72328a5cba3a86056))
 693: 
 694: 
 695: ### Bug Fixes
 696: 
 697: * **compat:** remove ReadableStream polyfill redundant since node v16 ([#478](https://github.com/anthropics/anthropic-sdk-typescript/issues/478)) ([75f5710](https://github.com/anthropics/anthropic-sdk-typescript/commit/75f5710d57e6f72b6770d32d9c6dd71bbfb43d85))
 698: * use relative paths ([#475](https://github.com/anthropics/anthropic-sdk-typescript/issues/475)) ([a8ca93c](https://github.com/anthropics/anthropic-sdk-typescript/commit/a8ca93cc40464dc76118f7dd72e94c52693f3d63))
 699: 
 700: 
 701: ### Chores
 702: 
 703: * **bedrock:** use `chunk` for internal SSE parsing instead of `completion` ([#472](https://github.com/anthropics/anthropic-sdk-typescript/issues/472)) ([0f6190a](https://github.com/anthropics/anthropic-sdk-typescript/commit/0f6190a69d8986ac3779441eba43d345ec3fb342))
 704: * **ci:** also run workflows for PRs targeting `next` ([#464](https://github.com/anthropics/anthropic-sdk-typescript/issues/464)) ([cc405a8](https://github.com/anthropics/anthropic-sdk-typescript/commit/cc405a8cc4ea26389b9d857d75818722d0bcbfcd))
 705: * **docs:** fix incorrect client var names ([#479](https://github.com/anthropics/anthropic-sdk-typescript/issues/479)) ([a247935](https://github.com/anthropics/anthropic-sdk-typescript/commit/a247935a86b87b90209f493921661d20c9bc6457))
 706: * **docs:** mention lack of support for web browser runtimes ([#468](https://github.com/anthropics/anthropic-sdk-typescript/issues/468)) ([968a7fb](https://github.com/anthropics/anthropic-sdk-typescript/commit/968a7fbb6cb779d17d9f6c485c0b61f241e327bc))
 707: * **docs:** minor update to formatting of API link in README ([#467](https://github.com/anthropics/anthropic-sdk-typescript/issues/467)) ([50b9f2b](https://github.com/anthropics/anthropic-sdk-typescript/commit/50b9f2b0c3feb4707af2b9e5f006a3f726782803))
 708: * **docs:** rename anthropic const to client ([#471](https://github.com/anthropics/anthropic-sdk-typescript/issues/471)) ([e1a7f9f](https://github.com/anthropics/anthropic-sdk-typescript/commit/e1a7f9f813077fb033c732c004c7bda85738a321))
 709: * **docs:** use client instead of package name in Node examples ([#469](https://github.com/anthropics/anthropic-sdk-typescript/issues/469)) ([8961ebf](https://github.com/anthropics/anthropic-sdk-typescript/commit/8961ebf54bbab898667119c8d9551e33a4de6846))
 710: * **internal:** add constant for default timeout ([#480](https://github.com/anthropics/anthropic-sdk-typescript/issues/480)) ([dc89753](https://github.com/anthropics/anthropic-sdk-typescript/commit/dc897537789c6b4bc31ee8238aad8ffaaa65df5e))
 711: * **internal:** minor changes to tests ([#465](https://github.com/anthropics/anthropic-sdk-typescript/issues/465)) ([c1fd563](https://github.com/anthropics/anthropic-sdk-typescript/commit/c1fd563693bd354a81e0ae55c7355144f06b7f0b))
 712: * **internal:** remove old reference to check-test-server ([8dc9afc](https://github.com/anthropics/anthropic-sdk-typescript/commit/8dc9afcf00c4a38c2d85171ebceafc5f6a47c117))
 713: * sync spec ([#470](https://github.com/anthropics/anthropic-sdk-typescript/issues/470)) ([b493aa4](https://github.com/anthropics/anthropic-sdk-typescript/commit/b493aa49d3d6e67be22c3e8255dd4286e6bbcdeb))
 714: * **tests:** update prism version ([#473](https://github.com/anthropics/anthropic-sdk-typescript/issues/473)) ([6f21ecf](https://github.com/anthropics/anthropic-sdk-typescript/commit/6f21ecfd781d04a7dc83641f069bb38d5584a320))
 715: 
 716: 
 717: ### Refactors
 718: 
 719: * extract model out to a named type and rename partialjson ([#477](https://github.com/anthropics/anthropic-sdk-typescript/issues/477)) ([d2d4e36](https://github.com/anthropics/anthropic-sdk-typescript/commit/d2d4e36b995cc84e8a3a7c64eb614011df399c5e))
 720: 
 721: ## 0.24.3 (2024-07-01)
 722: 
 723: Full Changelog: [sdk-v0.24.2...sdk-v0.24.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.24.2...sdk-v0.24.3)
 724: 
 725: ### Bug Fixes
 726: 
 727: * **types:** avoid errors on certain TS versions ([dd6aca5](https://github.com/anthropics/anthropic-sdk-typescript/commit/dd6aca56e58d52f09e67e227cccbf273b92adb13))
 728: 
 729: ## 0.24.2 (2024-06-28)
 730: 
 731: Full Changelog: [sdk-v0.24.1...sdk-v0.24.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.24.1...sdk-v0.24.2)
 732: 
 733: ### Bug Fixes
 734: 
 735: * **partial-json:** don't error on unknown tokens ([d212ce1](https://github.com/anthropics/anthropic-sdk-typescript/commit/d212ce152ca0b8846e7891636ad4ba287da50958))
 736: * **partial-json:** handle `null` token properly ([f53742f](https://github.com/anthropics/anthropic-sdk-typescript/commit/f53742f497a33b8f0639a63cec828d430a19cb27))
 737: 
 738: 
 739: ### Chores
 740: 
 741: * gitignore test server logs ([#451](https://github.com/anthropics/anthropic-sdk-typescript/issues/451)) ([ee1308f](https://github.com/anthropics/anthropic-sdk-typescript/commit/ee1308f74e5544ed0ce53bfd14ca49d0f03bcffb))
 742: * **tests:** add unit tests for partial-json-parser ([4fb3bea](https://github.com/anthropics/anthropic-sdk-typescript/commit/4fb3bea74538823c8ab359048f823029d4716277))
 743: 
 744: ## 0.24.1 (2024-06-25)
 745: 
 746: Full Changelog: [sdk-v0.24.0...sdk-v0.24.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.24.0...sdk-v0.24.1)
 747: 
 748: ### Bug Fixes
 749: 
 750: * **api:** add string to tool result block ([#448](https://github.com/anthropics/anthropic-sdk-typescript/issues/448)) ([87af4e9](https://github.com/anthropics/anthropic-sdk-typescript/commit/87af4e9280923ac73295f9b32086f82c2ed0c6f2))
 751: 
 752: 
 753: ### Chores
 754: 
 755: * **internal:** minor reformatting ([#444](https://github.com/anthropics/anthropic-sdk-typescript/issues/444)) ([46790bb](https://github.com/anthropics/anthropic-sdk-typescript/commit/46790bb462db01ae1725e120f2bdca0a89c8f722))
 756: * **internal:** replace deprecated aws-sdk packages with [@smithy](https://github.com/smithy) ([#447](https://github.com/anthropics/anthropic-sdk-typescript/issues/447)) ([4328cbf](https://github.com/anthropics/anthropic-sdk-typescript/commit/4328cbf9e64f8bfc9b95a9048b18729c9a938ba5))
 757: 
 758: ## 0.24.0 (2024-06-20)
 759: 
 760: Full Changelog: [sdk-v0.23.0...sdk-v0.24.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.23.0...sdk-v0.24.0)
 761: 
 762: ### Features
 763: 
 764: * **api:** add new claude-3-5-sonnet-20240620 model ([#438](https://github.com/anthropics/anthropic-sdk-typescript/issues/438)) ([8d60d1b](https://github.com/anthropics/anthropic-sdk-typescript/commit/8d60d1b6fb14988a2257727a1aaab9fbc8f75be3))
 765: 
 766: ## 0.23.0 (2024-06-14)
 767: 
 768: Full Changelog: [sdk-v0.22.0...sdk-v0.23.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.22.0...sdk-v0.23.0)
 769: 
 770: ### Features
 771: 
 772: * support `application/octet-stream` request bodies ([#436](https://github.com/anthropics/anthropic-sdk-typescript/issues/436)) ([3a8e6ed](https://github.com/anthropics/anthropic-sdk-typescript/commit/3a8e6ed7cc057b77fabeaf8f774f6231836022d7))
 773: 
 774: 
 775: ### Bug Fixes
 776: 
 777: * allow git imports for pnpm ([#433](https://github.com/anthropics/anthropic-sdk-typescript/issues/433)) ([a4f5263](https://github.com/anthropics/anthropic-sdk-typescript/commit/a4f5263692aea74fbf91d0591958aca16c820e00))
 778: 
 779: ## 0.22.0 (2024-05-30)
 780: 
 781: Full Changelog: [sdk-v0.21.1...sdk-v0.22.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.21.1...sdk-v0.22.0)
 782: 
 783: ### Features
 784: 
 785: * **api/types:** add stream event type aliases with a Raw prefix ([#428](https://github.com/anthropics/anthropic-sdk-typescript/issues/428)) ([1e367e4](https://github.com/anthropics/anthropic-sdk-typescript/commit/1e367e4020fa4691c565c89bdfba40c2f6060871))
 786: * **api:** tool use is GA and available on 3P ([#429](https://github.com/anthropics/anthropic-sdk-typescript/issues/429)) ([2decf85](https://github.com/anthropics/anthropic-sdk-typescript/commit/2decf85e7471932dad98c21d4ed2d476ab1588a6))
 787: * **bedrock:** support tools ([91fc61a](https://github.com/anthropics/anthropic-sdk-typescript/commit/91fc61ae7246705d26e96a95dae38b46e9ad9290))
 788: * **streaming:** add tools support ([4c83bb1](https://github.com/anthropics/anthropic-sdk-typescript/commit/4c83bb111735cd513c09d5ed57a5cb0888534afd))
 789: * **vertex:** support tools ([acf0aa7](https://github.com/anthropics/anthropic-sdk-typescript/commit/acf0aa7571425c8582740616e24883c2ec65218b))
 790: 
 791: 
 792: ### Documentation
 793: 
 794: * **helpers:** mention inputJson event ([0ef0e39](https://github.com/anthropics/anthropic-sdk-typescript/commit/0ef0e39a870541bbe800b03c1bdcf88eb6e1350c))
 795: * **readme:** add bundle size badge ([#426](https://github.com/anthropics/anthropic-sdk-typescript/issues/426)) ([bf7c1fd](https://github.com/anthropics/anthropic-sdk-typescript/commit/bf7c1fdaf3476d5c43079e8a0789ed0dd0c807a6))
 796: 
 797: ## 0.21.1 (2024-05-21)
 798: 
 799: Full Changelog: [sdk-v0.21.0...sdk-v0.21.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.21.0...sdk-v0.21.1)
 800: 
 801: ### Chores
 802: 
 803: * **docs:** fix typo ([#423](https://github.com/anthropics/anthropic-sdk-typescript/issues/423)) ([d42f458](https://github.com/anthropics/anthropic-sdk-typescript/commit/d42f45820347171bd456b0038406a53b098a4fa2))
 804: * **internal:** run build script over sub-packages ([6f04f66](https://github.com/anthropics/anthropic-sdk-typescript/commit/6f04f6689603ef5a59ce15f490d74392241694c3))
 805: 
 806: ## 0.21.0 (2024-05-16)
 807: 
 808: Full Changelog: [sdk-v0.20.9...sdk-v0.21.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.9...sdk-v0.21.0)
 809: 
 810: ### Features
 811: 
 812: * **api:** add `tool_choice` param, image block params inside `tool_result.content`, and streaming for `tool_use` blocks ([#418](https://github.com/anthropics/anthropic-sdk-typescript/issues/418)) ([421a1e6](https://github.com/anthropics/anthropic-sdk-typescript/commit/421a1e6f53cbb2f440e3668be3e13475976eebbf))
 813: 
 814: 
 815: ### Chores
 816: 
 817: * **docs:** add SECURITY.md ([#411](https://github.com/anthropics/anthropic-sdk-typescript/issues/411)) ([bf2ad84](https://github.com/anthropics/anthropic-sdk-typescript/commit/bf2ad8496d97de46b28575dfa37fa9cf15341eb4))
 818: * **internal:** add slightly better logging to scripts ([#415](https://github.com/anthropics/anthropic-sdk-typescript/issues/415)) ([7a042d2](https://github.com/anthropics/anthropic-sdk-typescript/commit/7a042d2dd5a5e310f15c02277c7f7a19e9772872))
 819: * **internal:** fix generated version numbers ([#413](https://github.com/anthropics/anthropic-sdk-typescript/issues/413)) ([ea77063](https://github.com/anthropics/anthropic-sdk-typescript/commit/ea770630897bb85caaecd39bccf478e4dd3f169c))
 820: 
 821: ## 0.20.9 (2024-05-07)
 822: 
 823: Full Changelog: [sdk-v0.20.8...sdk-v0.20.9](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.8...sdk-v0.20.9)
 824: 
 825: ### Bug Fixes
 826: 
 827: * **package:** revert recent client file change ([#409](https://github.com/anthropics/anthropic-sdk-typescript/issues/409)) ([9054249](https://github.com/anthropics/anthropic-sdk-typescript/commit/90542499ccf9f5d020e71e1c8dc8935e0c86ede4))
 828: 
 829: 
 830: ### Chores
 831: 
 832: * **internal:** add link to openapi spec ([#406](https://github.com/anthropics/anthropic-sdk-typescript/issues/406)) ([39c856d](https://github.com/anthropics/anthropic-sdk-typescript/commit/39c856d02abbb1d54efbacef087cc89b79bce017))
 833: * **internal:** bump prism version ([#407](https://github.com/anthropics/anthropic-sdk-typescript/issues/407)) ([0c1eb5d](https://github.com/anthropics/anthropic-sdk-typescript/commit/0c1eb5d5c500ea95fbf9a5ccce37c74170c6a84f))
 834: * **internal:** move client class to separate file ([#408](https://github.com/anthropics/anthropic-sdk-typescript/issues/408)) ([b5e1e4a](https://github.com/anthropics/anthropic-sdk-typescript/commit/b5e1e4a68c9fc00bede9134fa2214480bbbf5f2d))
 835: * **internal:** refactor scripts ([#404](https://github.com/anthropics/anthropic-sdk-typescript/issues/404)) ([f60e2d8](https://github.com/anthropics/anthropic-sdk-typescript/commit/f60e2d81bb241063507d2d7e728c78e78c1c5e51))
 836: 
 837: ## 0.20.8 (2024-04-29)
 838: 
 839: Full Changelog: [sdk-v0.20.7...sdk-v0.20.8](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.7...sdk-v0.20.8)
 840: 
 841: ### Chores
 842: 
 843: * **internal:** add scripts/test and scripts/mock ([#403](https://github.com/anthropics/anthropic-sdk-typescript/issues/403)) ([bdc6011](https://github.com/anthropics/anthropic-sdk-typescript/commit/bdc601192d651f9a7f6bf822c631db1d652d796c))
 844: * **internal:** use actions/checkout@v4 for codeflow ([#400](https://github.com/anthropics/anthropic-sdk-typescript/issues/400)) ([6d565d3](https://github.com/anthropics/anthropic-sdk-typescript/commit/6d565d366f8787e87cbe9ac851e42c13f88c2579))
 845: 
 846: ## 0.20.7 (2024-04-24)
 847: 
 848: Full Changelog: [sdk-v0.20.6...sdk-v0.20.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.6...sdk-v0.20.7)
 849: 
 850: ### Chores
 851: 
 852: * **internal:** use @swc/jest for running tests ([#397](https://github.com/anthropics/anthropic-sdk-typescript/issues/397)) ([0dbca67](https://github.com/anthropics/anthropic-sdk-typescript/commit/0dbca679f26f4a301810290601cc41f18525fe6e))
 853: 
 854: ## 0.20.6 (2024-04-17)
 855: 
 856: Full Changelog: [sdk-v0.20.5...sdk-v0.20.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.5...sdk-v0.20.6)
 857: 
 858: ### Build System
 859: 
 860: * configure UTF-8 locale in devcontainer ([#393](https://github.com/anthropics/anthropic-sdk-typescript/issues/393)) ([db10244](https://github.com/anthropics/anthropic-sdk-typescript/commit/db10244fa87a653c48bbcc2fffbad206dbe39645))
 861: 
 862: ## 0.20.5 (2024-04-15)
 863: 
 864: Full Changelog: [sdk-v0.20.4...sdk-v0.20.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.4...sdk-v0.20.5)
 865: 
 866: ### Chores
 867: 
 868: * **internal:** formatting ([#390](https://github.com/anthropics/anthropic-sdk-typescript/issues/390)) ([b7861b9](https://github.com/anthropics/anthropic-sdk-typescript/commit/b7861b940dc9c1c21eb6edf3bac8d1d62d2d372f))
 869: 
 870: ## 0.20.4 (2024-04-11)
 871: 
 872: Full Changelog: [sdk-v0.20.3...sdk-v0.20.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.3...sdk-v0.20.4)
 873: 
 874: ### Chores
 875: 
 876: * **internal:** update gitignore ([#388](https://github.com/anthropics/anthropic-sdk-typescript/issues/388)) ([03f03a2](https://github.com/anthropics/anthropic-sdk-typescript/commit/03f03a22532680a3b9bbd2e49116ef760b07a498))
 877: 
 878: ## 0.20.3 (2024-04-10)
 879: 
 880: Full Changelog: [sdk-v0.20.2...sdk-v0.20.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.2...sdk-v0.20.3)
 881: 
 882: ### Bug Fixes
 883: 
 884: * **vertex:** correct core client dependency constraint ([#384](https://github.com/anthropics/anthropic-sdk-typescript/issues/384)) ([de29699](https://github.com/anthropics/anthropic-sdk-typescript/commit/de2969902b68b5c46b6e682b8b947426c6ccf195))
 885: 
 886: ## 0.20.2 (2024-04-09)
 887: 
 888: Full Changelog: [sdk-v0.20.1...sdk-v0.20.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.1...sdk-v0.20.2)
 889: 
 890: ### Chores
 891: 
 892: * **internal:** update lock files ([#377](https://github.com/anthropics/anthropic-sdk-typescript/issues/377)) ([6d239ef](https://github.com/anthropics/anthropic-sdk-typescript/commit/6d239efaca730baba374a1b49f6b1a4037b3e163))
 893: 
 894: ## 0.20.1 (2024-04-04)
 895: 
 896: Full Changelog: [sdk-v0.20.0...sdk-v0.20.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.20.0...sdk-v0.20.1)
 897: 
 898: ### Documentation
 899: 
 900: * **readme:** mention tool use ([#375](https://github.com/anthropics/anthropic-sdk-typescript/issues/375)) ([72356dd](https://github.com/anthropics/anthropic-sdk-typescript/commit/72356dd9c498344074c292ffdab602d54c4fa13e))
 901: 
 902: ## 0.20.0 (2024-04-04)
 903: 
 904: Full Changelog: [sdk-v0.19.2...sdk-v0.20.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.19.2...sdk-v0.20.0)
 905: 
 906: ### Features
 907: 
 908: * **api:** tool use beta ([#374](https://github.com/anthropics/anthropic-sdk-typescript/issues/374)) ([e28514a](https://github.com/anthropics/anthropic-sdk-typescript/commit/e28514a305908f71e98bc33123bc99ed6bf7348f))
 909: 
 910: 
 911: ### Bug Fixes
 912: 
 913: * **types:** correctly mark type as a required property in requests ([#371](https://github.com/anthropics/anthropic-sdk-typescript/issues/371)) ([a04edd8](https://github.com/anthropics/anthropic-sdk-typescript/commit/a04edd8d7f4c552281b37a44099edf432d7fcb27))
 914: 
 915: 
 916: ### Chores
 917: 
 918: * **types:** consistent naming for text block types ([#373](https://github.com/anthropics/anthropic-sdk-typescript/issues/373)) ([84a6a58](https://github.com/anthropics/anthropic-sdk-typescript/commit/84a6a58ff978cc274b85656ca4394396e8b360e3))
 919: 
 920: ## 0.19.2 (2024-04-04)
 921: 
 922: Full Changelog: [sdk-v0.19.1...sdk-v0.19.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.19.1...sdk-v0.19.2)
 923: 
 924: ### Bug Fixes
 925: 
 926: * **streaming:** handle special line characters and fix multi-byte character decoding ([#370](https://github.com/anthropics/anthropic-sdk-typescript/issues/370)) ([7a97b38](https://github.com/anthropics/anthropic-sdk-typescript/commit/7a97b38e389809ef75c307d26fc671c829b5ea29))
 927: 
 928: 
 929: ### Chores
 930: 
 931: * **deps:** bump yarn to v1.22.22 ([#369](https://github.com/anthropics/anthropic-sdk-typescript/issues/369)) ([603d7b1](https://github.com/anthropics/anthropic-sdk-typescript/commit/603d7b17411bc25a562acb80ebde71ae058892d0))
 932: * **deps:** remove unused dependency digest-fetch ([#368](https://github.com/anthropics/anthropic-sdk-typescript/issues/368)) ([df1df0f](https://github.com/anthropics/anthropic-sdk-typescript/commit/df1df0f509682841c703fa1ea5062a796cfe2091))
 933: 
 934: 
 935: ### Documentation
 936: 
 937: * **readme:** change undocumented params wording ([#363](https://github.com/anthropics/anthropic-sdk-typescript/issues/363)) ([4222e08](https://github.com/anthropics/anthropic-sdk-typescript/commit/4222e088aff5e26a3d2fbe1b622781c6194b0469))
 938: 
 939: ## 0.19.1 (2024-03-29)
 940: 
 941: Full Changelog: [sdk-v0.19.0...sdk-v0.19.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.19.0...sdk-v0.19.1)
 942: 
 943: ### Bug Fixes
 944: 
 945: * **client:** correctly send deno version header ([#354](https://github.com/anthropics/anthropic-sdk-typescript/issues/354)) ([ad5162b](https://github.com/anthropics/anthropic-sdk-typescript/commit/ad5162be2ccb122eb355577f481732121b130b0b))
 946: * handle process.env being undefined in debug func ([#351](https://github.com/anthropics/anthropic-sdk-typescript/issues/351)) ([3b0f38a](https://github.com/anthropics/anthropic-sdk-typescript/commit/3b0f38ab427ae7d31c800cd5c8be1653da9ae709))
 947: * **streaming:** correct accumulation of output tokens ([#361](https://github.com/anthropics/anthropic-sdk-typescript/issues/361)) ([76af283](https://github.com/anthropics/anthropic-sdk-typescript/commit/76af283596530ccd3a77ed86788bc0ea1e93f3c1))
 948: * **types:** correct typo claude-2.1' to claude-2.1 ([#352](https://github.com/anthropics/anthropic-sdk-typescript/issues/352)) ([0d5efb9](https://github.com/anthropics/anthropic-sdk-typescript/commit/0d5efb9a0b9eb3ebe1df5ed10164fadfd886eac6))
 949: 
 950: 
 951: ### Chores
 952: 
 953: * **internal:** add type ([#359](https://github.com/anthropics/anthropic-sdk-typescript/issues/359)) ([9456414](https://github.com/anthropics/anthropic-sdk-typescript/commit/945641467deffb674f762920955c98d10f287c8e))
 954: 
 955: 
 956: ### Documentation
 957: 
 958: * **bedrock:** fix dead link ([#356](https://github.com/anthropics/anthropic-sdk-typescript/issues/356)) ([a953e00](https://github.com/anthropics/anthropic-sdk-typescript/commit/a953e0070698f3238b728ffe06a056a9f2d6b7ff))
 959: * **readme:** consistent use of sentence case in headings ([#347](https://github.com/anthropics/anthropic-sdk-typescript/issues/347)) ([30f45d1](https://github.com/anthropics/anthropic-sdk-typescript/commit/30f45d14a534d7392dfcc4fb503bf07ab8cf038d))
 960: * **readme:** document how to make undocumented requests ([#349](https://github.com/anthropics/anthropic-sdk-typescript/issues/349)) ([f92c50a](https://github.com/anthropics/anthropic-sdk-typescript/commit/f92c50ac6d9d1b8bdb837e52414aafd3224553da))
 961: 
 962: ## 0.19.0 (2024-03-19)
 963: 
 964: Full Changelog: [sdk-v0.18.0...sdk-v0.19.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.18.0...sdk-v0.19.0)
 965: 
 966: ### Features
 967: 
 968: * **vertex:** add support for overriding google auth ([#338](https://github.com/anthropics/anthropic-sdk-typescript/issues/338)) ([28d98c4](https://github.com/anthropics/anthropic-sdk-typescript/commit/28d98c487257a3c6b3c6d84597768d484fadb86d))
 969: * **vertex:** api is no longer in private beta ([#344](https://github.com/anthropics/anthropic-sdk-typescript/issues/344)) ([892127c](https://github.com/anthropics/anthropic-sdk-typescript/commit/892127cdac059eee11c1a322a5512f9250868023))
 970: 
 971: 
 972: ### Bug Fixes
 973: 
 974: * **internal:** make toFile use input file's options ([#343](https://github.com/anthropics/anthropic-sdk-typescript/issues/343)) ([2dc2174](https://github.com/anthropics/anthropic-sdk-typescript/commit/2dc217441d6da8f2192b3e81b03c985383b6816e))
 975: 
 976: 
 977: ### Chores
 978: 
 979: * **internal:** update generated pragma comment ([#341](https://github.com/anthropics/anthropic-sdk-typescript/issues/341)) ([fd60f63](https://github.com/anthropics/anthropic-sdk-typescript/commit/fd60f63d5e5cd978b287d66fd95deabe2ff089d2))
 980: 
 981: 
 982: ### Documentation
 983: 
 984: * fix typo in CONTRIBUTING.md ([#340](https://github.com/anthropics/anthropic-sdk-typescript/issues/340)) ([ba9f3fa](https://github.com/anthropics/anthropic-sdk-typescript/commit/ba9f3faa5e3d116fce232d81f554b2f95f573ec8))
 985: 
 986: ## 0.18.0 (2024-03-13)
 987: 
 988: Full Changelog: [sdk-v0.17.2...sdk-v0.18.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.17.2...sdk-v0.18.0)
 989: 
 990: ### Features
 991: 
 992: * **api:** add haiku model ([#333](https://github.com/anthropics/anthropic-sdk-typescript/issues/333)) ([11becc6](https://github.com/anthropics/anthropic-sdk-typescript/commit/11becc64a8b07b353835678e063a70e3a0bd85e3))
 993: 
 994: 
 995: ### Documentation
 996: 
 997: * update models in vertex examples ([#331](https://github.com/anthropics/anthropic-sdk-typescript/issues/331)) ([3d139b3](https://github.com/anthropics/anthropic-sdk-typescript/commit/3d139b374179ef5540a8e9436df06501c6ada6c5))
 998: 
 999: ## 0.17.2 (2024-03-12)
1000: 
1001: Full Changelog: [sdk-v0.17.1...sdk-v0.17.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.17.1...sdk-v0.17.2)
1002: 
1003: ### Chores
1004: 
1005: * **internal:** add explicit type annotation to decoder ([#324](https://github.com/anthropics/anthropic-sdk-typescript/issues/324)) ([7e172c7](https://github.com/anthropics/anthropic-sdk-typescript/commit/7e172c74f75414ee246cbd71104454c9e81efc0d))
1006: 
1007: ## 0.17.1 (2024-03-06)
1008: 
1009: Full Changelog: [sdk-v0.17.0...sdk-v0.17.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.17.0...sdk-v0.17.1)
1010: 
1011: ### Documentation
1012: 
1013: * deprecate old access token getter ([#322](https://github.com/anthropics/anthropic-sdk-typescript/issues/322)) ([1110548](https://github.com/anthropics/anthropic-sdk-typescript/commit/1110548d4543fab83bc0ef3beb99a75711cb028a))
1014: * remove extraneous --save and yarn install instructions ([#323](https://github.com/anthropics/anthropic-sdk-typescript/issues/323)) ([775ecb9](https://github.com/anthropics/anthropic-sdk-typescript/commit/775ecb9ef3ab17e88dabc149faa0876cd6ab5f0b))
1015: 
1016: ## 0.17.0 (2024-03-06)
1017: 
1018: Full Changelog: [sdk-v0.16.1...sdk-v0.17.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.16.1...sdk-v0.17.0)
1019: 
1020: ### Features
1021: 
1022: * **api:** add enum to model param for message ([#315](https://github.com/anthropics/anthropic-sdk-typescript/issues/315)) ([0c44de0](https://github.com/anthropics/anthropic-sdk-typescript/commit/0c44de01a5d5fc6dda3667f03779eb029247c18e))
1023: 
1024: 
1025: ### Bug Fixes
1026: 
1027: * **streaming:** correctly handle trailing new lines in byte chunks ([#317](https://github.com/anthropics/anthropic-sdk-typescript/issues/317)) ([0147b46](https://github.com/anthropics/anthropic-sdk-typescript/commit/0147b4693bd4b1dc3c9cba04a7082aad3c3cb42c))
1028: 
1029: 
1030: ### Chores
1031: 
1032: * **types:** fix accidental exposure of Buffer type to cloudflare ([#319](https://github.com/anthropics/anthropic-sdk-typescript/issues/319)) ([a5e4462](https://github.com/anthropics/anthropic-sdk-typescript/commit/a5e4462bcf054e8324cbcaa31d1b85ffc58113fd))
1033: 
1034: 
1035: ### Documentation
1036: 
1037: * **readme:** fix https proxy example ([#310](https://github.com/anthropics/anthropic-sdk-typescript/issues/310)) ([99d3c54](https://github.com/anthropics/anthropic-sdk-typescript/commit/99d3c545f45230ec5862ddbbfcb64f46b54d7d13))
1038: * **readme:** fix https proxy example ([#311](https://github.com/anthropics/anthropic-sdk-typescript/issues/311)) ([ffb603c](https://github.com/anthropics/anthropic-sdk-typescript/commit/ffb603c15a0f5d396c96ac545a0cdd0c814ec4ef))
1039: 
1040: ## 0.16.1 (2024-03-04)
1041: 
1042: Full Changelog: [sdk-v0.16.0...sdk-v0.16.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.16.0...sdk-v0.16.1)
1043: 
1044: ### Chores
1045: 
1046: * fix error handler in readme ([#307](https://github.com/anthropics/anthropic-sdk-typescript/issues/307)) ([5007a1e](https://github.com/anthropics/anthropic-sdk-typescript/commit/5007a1e71907648ea44e1663f5b7f71bb20d001d))
1047: 
1048: 
1049: ### Documentation
1050: 
1051: * **readme:** reference bedrock sdk ([#309](https://github.com/anthropics/anthropic-sdk-typescript/issues/309)) ([0fd0416](https://github.com/anthropics/anthropic-sdk-typescript/commit/0fd041617eca18dd506efffe5a4e2505dd1aa004))
1052: 
1053: ## 0.16.0 (2024-03-04)
1054: 
1055: Full Changelog: [sdk-v0.15.0...sdk-v0.16.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.15.0...sdk-v0.16.0)
1056: 
1057: ### Features
1058: 
1059: * **bedrock:** add messages API ([#305](https://github.com/anthropics/anthropic-sdk-typescript/issues/305)) ([8b7f89e](https://github.com/anthropics/anthropic-sdk-typescript/commit/8b7f89e1e60416f9ad5b575d43238a4259654395))
1060: 
1061: 
1062: ### Chores
1063: 
1064: * update examples ([459956a](https://github.com/anthropics/anthropic-sdk-typescript/commit/459956ac44b5a2fd1dd0d0828e0281875b5900e9))
1065: 
1066: ## 0.15.0 (2024-03-04)
1067: 
1068: Full Changelog: [sdk-v0.14.1...sdk-v0.15.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.14.1...sdk-v0.15.0)
1069: 
1070: ### Features
1071: 
1072: * **messages:** add support for image inputs ([#303](https://github.com/anthropics/anthropic-sdk-typescript/issues/303)) ([7663bd6](https://github.com/anthropics/anthropic-sdk-typescript/commit/7663bd6e1a4427483cf5f13889bc5c63314e5bae))
1073: 
1074: 
1075: ### Bug Fixes
1076: 
1077: * **MessageStream:** handle errors more gracefully in async iterator ([#301](https://github.com/anthropics/anthropic-sdk-typescript/issues/301)) ([9cc0daa](https://github.com/anthropics/anthropic-sdk-typescript/commit/9cc0daa9af5717953933e12b487bdbdd5b762cc7))
1078: 
1079: 
1080: ### Chores
1081: 
1082: * **docs:** mention install from git repo ([#302](https://github.com/anthropics/anthropic-sdk-typescript/issues/302)) ([dd2627b](https://github.com/anthropics/anthropic-sdk-typescript/commit/dd2627bc6404afbdccb2c2b66ee0dfcc3fc80031))
1083: * **internal:** update deps ([#296](https://github.com/anthropics/anthropic-sdk-typescript/issues/296)) ([8804a92](https://github.com/anthropics/anthropic-sdk-typescript/commit/8804a92e3c873d712cac75089af0e82104e6381c))
1084: 
1085: 
1086: ### Documentation
1087: 
1088: * **contributing:** improve wording ([#299](https://github.com/anthropics/anthropic-sdk-typescript/issues/299)) ([7697fa1](https://github.com/anthropics/anthropic-sdk-typescript/commit/7697fa1a3b680015c55ed715a1496c727630a3dc))
1089: * **readme:** fix typo in custom fetch implementation ([#300](https://github.com/anthropics/anthropic-sdk-typescript/issues/300)) ([a4974c3](https://github.com/anthropics/anthropic-sdk-typescript/commit/a4974c3080c6b592c2a25367932481a154e6c280))
1090: 
1091: ## 0.14.1 (2024-02-22)
1092: 
1093: Full Changelog: [sdk-v0.14.0...sdk-v0.14.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.14.0...sdk-v0.14.1)
1094: 
1095: ### Chores
1096: 
1097: * **ci:** update actions/setup-node action to v4 ([#295](https://github.com/anthropics/anthropic-sdk-typescript/issues/295)) ([359a856](https://github.com/anthropics/anthropic-sdk-typescript/commit/359a856c4c93d962ca3e117f4dd799849eb5fa7d))
1098: * **docs:** remove references to old bedrock package ([#289](https://github.com/anthropics/anthropic-sdk-typescript/issues/289)) ([33b935e](https://github.com/anthropics/anthropic-sdk-typescript/commit/33b935e3d840346dd464445901846d2b22888e1c))
1099: * **internal:** refactor release environment script ([#294](https://github.com/anthropics/anthropic-sdk-typescript/issues/294)) ([b7f8714](https://github.com/anthropics/anthropic-sdk-typescript/commit/b7f87143b16ad413adb943297e65473fd9b93b71))
1100: 
1101: 
1102: ### Documentation
1103: 
1104: * **readme:** fix header for streaming helpers ([#293](https://github.com/anthropics/anthropic-sdk-typescript/issues/293)) ([7278e6f](https://github.com/anthropics/anthropic-sdk-typescript/commit/7278e6f7d62d837c2af0b1a440dfa97b6a3f6b4e))
1105: 
1106: 
1107: ### Refactors
1108: 
1109: * **api:** mark completions API as legacy ([#291](https://github.com/anthropics/anthropic-sdk-typescript/issues/291)) ([c78e2e2](https://github.com/anthropics/anthropic-sdk-typescript/commit/c78e2e215067fabcc3eaee0a537213f55735b42e))
1110: 
1111: ## 0.14.0 (2024-02-13)
1112: 
1113: Full Changelog: [sdk-v0.13.1...sdk-v0.14.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.13.1...sdk-v0.14.0)
1114: 
1115: ### ⚠ BREAKING CHANGES
1116: 
1117: * **api:** messages is generally available ([#287](https://github.com/anthropics/anthropic-sdk-typescript/issues/287))
1118: 
1119: ### Features
1120: 
1121: * **api:** messages is generally available ([#287](https://github.com/anthropics/anthropic-sdk-typescript/issues/287)) ([be0a828](https://github.com/anthropics/anthropic-sdk-typescript/commit/be0a82883cf9b1b9d2944525b86e40f2b42cea4f))
1122: 
1123: ## 0.13.1 (2024-02-07)
1124: 
1125: Full Changelog: [sdk-v0.13.0...sdk-v0.13.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.13.0...sdk-v0.13.1)
1126: 
1127: ### Chores
1128: 
1129: * **internal:** reformat pacakge.json ([#284](https://github.com/anthropics/anthropic-sdk-typescript/issues/284)) ([3760c68](https://github.com/anthropics/anthropic-sdk-typescript/commit/3760c68f207b596261da336cbe62b4b84fb1763f))
1130: * respect `application/vnd.api+json` content-type header ([#286](https://github.com/anthropics/anthropic-sdk-typescript/issues/286)) ([daf0cae](https://github.com/anthropics/anthropic-sdk-typescript/commit/daf0cae6087580d61d4423e113259c8315c2b85a))
1131: 
1132: ## 0.13.0 (2024-02-02)
1133: 
1134: Full Changelog: [sdk-v0.12.8...sdk-v0.13.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.8...sdk-v0.13.0)
1135: 
1136: ### Features
1137: 
1138: * **api:** add new usage response fields ([#281](https://github.com/anthropics/anthropic-sdk-typescript/issues/281)) ([77bd18f](https://github.com/anthropics/anthropic-sdk-typescript/commit/77bd18fb3d149c0706664304102fc5f12830f761))
1139: 
1140: 
1141: ### Chores
1142: 
1143: * **package:** fix formatting ([#283](https://github.com/anthropics/anthropic-sdk-typescript/issues/283)) ([f88579a](https://github.com/anthropics/anthropic-sdk-typescript/commit/f88579a0768e0a7d5064eec9e1dd79e86c66bce7))
1144: 
1145: ## 0.12.8 (2024-02-02)
1146: 
1147: Full Changelog: [sdk-v0.12.7...sdk-v0.12.8](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.7...sdk-v0.12.8)
1148: 
1149: ### Chores
1150: 
1151: * **interal:** make link to api.md relative ([#278](https://github.com/anthropics/anthropic-sdk-typescript/issues/278)) ([46f8c28](https://github.com/anthropics/anthropic-sdk-typescript/commit/46f8c2805af75a5a733fdaa53936765a483471cb))
1152: * **internal:** enable building when git installed ([#279](https://github.com/anthropics/anthropic-sdk-typescript/issues/279)) ([3065001](https://github.com/anthropics/anthropic-sdk-typescript/commit/3065001610041b0c74cc640b72f646b6ff867db1))
1153: 
1154: 
1155: ### Documentation
1156: 
1157: * add a CONTRIBUTING.md ([#280](https://github.com/anthropics/anthropic-sdk-typescript/issues/280)) ([5b53551](https://github.com/anthropics/anthropic-sdk-typescript/commit/5b535512f2eacdb9f2fef795c85f2d2aaeedaea3))
1158: 
1159: ## 0.12.7 (2024-01-31)
1160: 
1161: Full Changelog: [sdk-v0.12.6...sdk-v0.12.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.6...sdk-v0.12.7)
1162: 
1163: ### Chores
1164: 
1165: * **bedrock:** move bedrock SDK to the main repo ([#274](https://github.com/anthropics/anthropic-sdk-typescript/issues/274)) ([b4ef3a8](https://github.com/anthropics/anthropic-sdk-typescript/commit/b4ef3a854e447744a1e270ec1e7e6da81b98ade3))
1166: * **ci:** fix publish packages script ([#272](https://github.com/anthropics/anthropic-sdk-typescript/issues/272)) ([db3585d](https://github.com/anthropics/anthropic-sdk-typescript/commit/db3585daf759c9794ec307b05a568527a2e7df99))
1167: 
1168: ## 0.12.6 (2024-01-30)
1169: 
1170: Full Changelog: [sdk-v0.12.5...sdk-v0.12.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.5...sdk-v0.12.6)
1171: 
1172: ### Chores
1173: 
1174: * **internal:** support pre-release versioning ([#270](https://github.com/anthropics/anthropic-sdk-typescript/issues/270)) ([566069d](https://github.com/anthropics/anthropic-sdk-typescript/commit/566069d4eb1dbcc2123f4b455f855b0748d586ee))
1175: 
1176: ## 0.12.5 (2024-01-25)
1177: 
1178: Full Changelog: [sdk-v0.12.4...sdk-v0.12.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.4...sdk-v0.12.5)
1179: 
1180: ### Chores
1181: 
1182: * **internal:** don't re-export streaming type ([#267](https://github.com/anthropics/anthropic-sdk-typescript/issues/267)) ([bcae5a9](https://github.com/anthropics/anthropic-sdk-typescript/commit/bcae5a95078dfe091d01823cd38cf3c63d28026d))
1183: * **internal:** update release-please config ([#269](https://github.com/anthropics/anthropic-sdk-typescript/issues/269)) ([80952e6](https://github.com/anthropics/anthropic-sdk-typescript/commit/80952e6ff6aea24ade9ea45dcbe8bb61da385304))
1184: 
1185: ## 0.12.4 (2024-01-23)
1186: 
1187: Full Changelog: [sdk-v0.12.3...sdk-v0.12.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/sdk-v0.12.3...sdk-v0.12.4)
1188: 
1189: ### Chores
1190: 
1191: * **internal:** add internal helpers & improve build scripts ([#261](https://github.com/anthropics/anthropic-sdk-typescript/issues/261)) ([4c1504a](https://github.com/anthropics/anthropic-sdk-typescript/commit/4c1504abc7eb8685a8409c4a19dc46d83ea26392))
1192: * **internal:** minor streaming updates ([#264](https://github.com/anthropics/anthropic-sdk-typescript/issues/264)) ([d4414ff](https://github.com/anthropics/anthropic-sdk-typescript/commit/d4414ffeafbc47769b91c4b2681f130b46d1a7c1))
1193: * **internal:** update resource client type ([#263](https://github.com/anthropics/anthropic-sdk-typescript/issues/263)) ([bc4f115](https://github.com/anthropics/anthropic-sdk-typescript/commit/bc4f115900cbeba1ff09d6f3cec79e639a8fda5e))
1194: 
1195: ## 0.12.3 (2024-01-19)
1196: 
1197: Full Changelog: [v0.12.2...v0.12.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.12.2...v0.12.3)
1198: 
1199: ### Bug Fixes
1200: 
1201: * allow body type in RequestOptions to be null ([#259](https://github.com/anthropics/anthropic-sdk-typescript/issues/259)) ([2f98de1](https://github.com/anthropics/anthropic-sdk-typescript/commit/2f98de1a42568b1242ce313ba046febb1c6625b5))
1202: 
1203: ## 0.12.2 (2024-01-18)
1204: 
1205: Full Changelog: [v0.12.1...v0.12.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.12.1...v0.12.2)
1206: 
1207: ### Bug Fixes
1208: 
1209: * **ci:** ignore stainless-app edits to release PR title ([#258](https://github.com/anthropics/anthropic-sdk-typescript/issues/258)) ([87e4ba8](https://github.com/anthropics/anthropic-sdk-typescript/commit/87e4ba82c5b498f881db9590edbfd68c8aba0930))
1210: * **types:** accept undefined for optional client options ([#257](https://github.com/anthropics/anthropic-sdk-typescript/issues/257)) ([a0e2c4a](https://github.com/anthropics/anthropic-sdk-typescript/commit/a0e2c4a4c4a269ad011d9a6c717c1ded2405711b))
1211: * use default base url if BASE_URL env var is blank ([#250](https://github.com/anthropics/anthropic-sdk-typescript/issues/250)) ([e38f32f](https://github.com/anthropics/anthropic-sdk-typescript/commit/e38f32f52398f3a082eb745e85179242ecee7663))
1212: 
1213: 
1214: ### Chores
1215: 
1216: * **internal:** debug logging for retries; speculative retry-after-ms support ([#256](https://github.com/anthropics/anthropic-sdk-typescript/issues/256)) ([b4b70fd](https://github.com/anthropics/anthropic-sdk-typescript/commit/b4b70fdbee45dd2a68e46135db45b61381538ae8))
1217: * **internal:** narrow type into stringifyQuery ([#253](https://github.com/anthropics/anthropic-sdk-typescript/issues/253)) ([3f42e07](https://github.com/anthropics/anthropic-sdk-typescript/commit/3f42e0702ab55cd841c0dc186732028d2fb9f5bb))
1218: 
1219: 
1220: ### Documentation
1221: 
1222: * fix missing async in readme code sample ([#255](https://github.com/anthropics/anthropic-sdk-typescript/issues/255)) ([553fb37](https://github.com/anthropics/anthropic-sdk-typescript/commit/553fb37159a9424a40df1e0f6bb36962ba9f5be8))
1223: * **readme:** improve api reference ([#254](https://github.com/anthropics/anthropic-sdk-typescript/issues/254)) ([3721927](https://github.com/anthropics/anthropic-sdk-typescript/commit/3721927e895d42c167e2464f30f7f2addb690ec6))
1224: 
1225: ## 0.12.1 (2024-01-08)
1226: 
1227: Full Changelog: [v0.12.0...v0.12.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.12.0...v0.12.1)
1228: 
1229: ### Bug Fixes
1230: 
1231: * **headers:** always send lowercase headers and strip undefined (BREAKING in rare cases) ([#245](https://github.com/anthropics/anthropic-sdk-typescript/issues/245)) ([7703066](https://github.com/anthropics/anthropic-sdk-typescript/commit/77030661f5612ea5312cb2fecf7987024ffd6ede))
1232: 
1233: 
1234: ### Chores
1235: 
1236: * add .keep files for examples and custom code directories ([#249](https://github.com/anthropics/anthropic-sdk-typescript/issues/249)) ([26b9062](https://github.com/anthropics/anthropic-sdk-typescript/commit/26b9062c7489dd3ee7f620edfea9888f92a859d7))
1237: * **internal:** improve type signatures ([#247](https://github.com/anthropics/anthropic-sdk-typescript/issues/247)) ([40edd29](https://github.com/anthropics/anthropic-sdk-typescript/commit/40edd299a83f1f60e973080d1fa84f6f42752663))
1238: 
1239: ## 0.12.0 (2023-12-21)
1240: 
1241: Full Changelog: [v0.11.0...v0.12.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.11.0...v0.12.0)
1242: 
1243: ### ⚠ BREAKING CHANGES
1244: 
1245: * remove anthropic-beta and x-api-key headers from param types ([#243](https://github.com/anthropics/anthropic-sdk-typescript/issues/243))
1246: 
1247: ### Bug Fixes
1248: 
1249: * remove anthropic-beta and x-api-key headers from param types ([#243](https://github.com/anthropics/anthropic-sdk-typescript/issues/243)) ([60f67ae](https://github.com/anthropics/anthropic-sdk-typescript/commit/60f67ae757cfe8e482327f508a802b30ec3805a0))
1250: 
1251: 
1252: ### Documentation
1253: 
1254: * **readme:** add streaming helper documentation ([#238](https://github.com/anthropics/anthropic-sdk-typescript/issues/238)) ([d74ee71](https://github.com/anthropics/anthropic-sdk-typescript/commit/d74ee7159f366a3f78091eacdcea3049c1e81ec7))
1255: * **readme:** remove old migration guide ([#236](https://github.com/anthropics/anthropic-sdk-typescript/issues/236)) ([65dff0a](https://github.com/anthropics/anthropic-sdk-typescript/commit/65dff0adb2ec836b81da4f71fb94a316c5f1a942))
1256: * reformat README.md ([#241](https://github.com/anthropics/anthropic-sdk-typescript/issues/241)) ([eb12705](https://github.com/anthropics/anthropic-sdk-typescript/commit/eb12705a7d975f584ca31f24b99c35318cf6419b))
1257: 
1258: 
1259: ### Refactors
1260: 
1261: * write jest config in typescript ([#239](https://github.com/anthropics/anthropic-sdk-typescript/issues/239)) ([7c87f24](https://github.com/anthropics/anthropic-sdk-typescript/commit/7c87f242d921adfbd2bb21ed5f2c37ada2043f95))
1262: 
1263: ## 0.11.0 (2023-12-19)
1264: 
1265: Full Changelog: [v0.10.2...v0.11.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.10.2...v0.11.0)
1266: 
1267: ### Features
1268: 
1269: * **api:** add messages endpoint with streaming helpers ([#235](https://github.com/anthropics/anthropic-sdk-typescript/issues/235)) ([12b914f](https://github.com/anthropics/anthropic-sdk-typescript/commit/12b914f46f4aa625ff141ec0b6631400d0994f76))
1270: * **client:** support reading the base url from an env variable ([#223](https://github.com/anthropics/anthropic-sdk-typescript/issues/223)) ([5bc3600](https://github.com/anthropics/anthropic-sdk-typescript/commit/5bc3600a487e7ed49d944aaf36a43e0d895e907b))
1271: 
1272: 
1273: ### Chores
1274: 
1275: * **ci:** run release workflow once per day ([#232](https://github.com/anthropics/anthropic-sdk-typescript/issues/232)) ([115479f](https://github.com/anthropics/anthropic-sdk-typescript/commit/115479f403838a6d2c81587220029b68a4371c02))
1276: * **deps:** update dependency ts-jest to v29.1.1 ([#233](https://github.com/anthropics/anthropic-sdk-typescript/issues/233)) ([bec6ab1](https://github.com/anthropics/anthropic-sdk-typescript/commit/bec6ab127d9b20071ab673e8e37087a879467b74))
1277: * **deps:** update jest ([#234](https://github.com/anthropics/anthropic-sdk-typescript/issues/234)) ([5506174](https://github.com/anthropics/anthropic-sdk-typescript/commit/5506174092d5248354f3d288c84da5ba4749375c))
1278: * update dependencies ([#231](https://github.com/anthropics/anthropic-sdk-typescript/issues/231)) ([4e34536](https://github.com/anthropics/anthropic-sdk-typescript/commit/4e345362c9002528fb0d95ca739fb8211ab3aec8))
1279: * update prettier ([#230](https://github.com/anthropics/anthropic-sdk-typescript/issues/230)) ([173603e](https://github.com/anthropics/anthropic-sdk-typescript/commit/173603e14fc5fe87c056553ecec3278059fe58d9))
1280: 
1281: 
1282: ### Documentation
1283: 
1284: * update examples to show claude-2.1 ([#227](https://github.com/anthropics/anthropic-sdk-typescript/issues/227)) ([4b00d84](https://github.com/anthropics/anthropic-sdk-typescript/commit/4b00d84aee56090b5d576fdff9c3a07386475c72))
1285: 
1286: 
1287: ### Build System
1288: 
1289: * specify `packageManager: yarn` ([#229](https://github.com/anthropics/anthropic-sdk-typescript/issues/229)) ([d31dae4](https://github.com/anthropics/anthropic-sdk-typescript/commit/d31dae455d750a61ae3b9a751ab73309b0f87417))
1290: 
1291: ## 0.10.2 (2023-11-28)
1292: 
1293: Full Changelog: [v0.10.1...v0.10.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.10.1...v0.10.2)
1294: 
1295: ## 0.10.1 (2023-11-24)
1296: 
1297: Full Changelog: [v0.10.0...v0.10.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.10.0...v0.10.1)
1298: 
1299: ### Chores
1300: 
1301: * **internal:** remove file import and conditionally run prepare ([#217](https://github.com/anthropics/anthropic-sdk-typescript/issues/217)) ([8ac5c7a](https://github.com/anthropics/anthropic-sdk-typescript/commit/8ac5c7ae63a7aa4262ad95e0f4d6a509428de794))
1302: 
1303: ## 0.10.0 (2023-11-21)
1304: 
1305: Full Changelog: [v0.9.1...v0.10.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.9.1...v0.10.0)
1306: 
1307: ### Features
1308: 
1309: * allow installing package directly from github ([#215](https://github.com/anthropics/anthropic-sdk-typescript/issues/215)) ([3de3f1b](https://github.com/anthropics/anthropic-sdk-typescript/commit/3de3f1b8124c110ead3ebedf709f4d5d088230cd))
1310: 
1311: 
1312: ### Chores
1313: 
1314: * **ci:** fix publish-npm ([#213](https://github.com/anthropics/anthropic-sdk-typescript/issues/213)) ([4ab77b7](https://github.com/anthropics/anthropic-sdk-typescript/commit/4ab77b7b323f22019193ba4f0a85fc89af193fbf))
1315: * **internal:** don't call prepare in dist ([#216](https://github.com/anthropics/anthropic-sdk-typescript/issues/216)) ([b031904](https://github.com/anthropics/anthropic-sdk-typescript/commit/b031904901a17878545cd8ce5c43f03cd364a8fe))
1316: 
1317: ## 0.9.1 (2023-11-14)
1318: 
1319: Full Changelog: [v0.9.0...v0.9.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.9.0...v0.9.1)
1320: 
1321: ### Chores
1322: 
1323: * **ci:** update release-please config ([#206](https://github.com/anthropics/anthropic-sdk-typescript/issues/206)) ([270b0b7](https://github.com/anthropics/anthropic-sdk-typescript/commit/270b0b725ea559ca4616ec8d8bac5a5cde1de0db))
1324: * **docs:** fix github links ([#208](https://github.com/anthropics/anthropic-sdk-typescript/issues/208)) ([b316603](https://github.com/anthropics/anthropic-sdk-typescript/commit/b3166033cffe31f5d11793ddd32e595161f1a2e6))
1325: * **internal:** update APIResource structure ([#211](https://github.com/anthropics/anthropic-sdk-typescript/issues/211)) ([0d6bbce](https://github.com/anthropics/anthropic-sdk-typescript/commit/0d6bbce8ff699b511133ee6bfb72c1244d85eb32))
1326: * **internal:** update jest config ([#210](https://github.com/anthropics/anthropic-sdk-typescript/issues/210)) ([b0c64eb](https://github.com/anthropics/anthropic-sdk-typescript/commit/b0c64eb9531d417f024567a4c74d9dd64743b889))
1327: * **internal:** update tsconfig ([#209](https://github.com/anthropics/anthropic-sdk-typescript/issues/209)) ([81b3e0b](https://github.com/anthropics/anthropic-sdk-typescript/commit/81b3e0b59801f737c6f1783e59eef8c1af77b1ad))
1328: 
1329: ## 0.9.0 (2023-11-05)
1330: 
1331: Full Changelog: [v0.8.1...v0.9.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.8.1...v0.9.0)
1332: 
1333: ### Features
1334: 
1335: * **client:** allow binary returns ([#203](https://github.com/anthropics/anthropic-sdk-typescript/issues/203)) ([5983d5e](https://github.com/anthropics/anthropic-sdk-typescript/commit/5983d5e5de327d6835c7baaea022914a101865a2))
1336: * **github:** include a devcontainer setup ([#202](https://github.com/anthropics/anthropic-sdk-typescript/issues/202)) ([ea97913](https://github.com/anthropics/anthropic-sdk-typescript/commit/ea97913a04a508da7704758b78a9b96d097be5a2))
1337: 
1338: 
1339: ### Chores
1340: 
1341: * **internal:** update gitignore ([#198](https://github.com/anthropics/anthropic-sdk-typescript/issues/198)) ([3048738](https://github.com/anthropics/anthropic-sdk-typescript/commit/3048738235b9dff9de19aae59ff66487dffb9e8e))
1342: * small cleanups ([#201](https://github.com/anthropics/anthropic-sdk-typescript/issues/201)) ([9f0a73d](https://github.com/anthropics/anthropic-sdk-typescript/commit/9f0a73d794fc110689ce1c67b68d0a68133adb8d))
1343: 
1344: 
1345: ### Documentation
1346: 
1347: * document customizing fetch ([#204](https://github.com/anthropics/anthropic-sdk-typescript/issues/204)) ([d2df724](https://github.com/anthropics/anthropic-sdk-typescript/commit/d2df7246ec244f2de73d359ffbff3f88acec781d))
1348: * fix github links ([#200](https://github.com/anthropics/anthropic-sdk-typescript/issues/200)) ([4038acd](https://github.com/anthropics/anthropic-sdk-typescript/commit/4038acd91f4de7c3b20efe7f76523d1e6970f5d9))
1349: * **readme:** mention version header ([#205](https://github.com/anthropics/anthropic-sdk-typescript/issues/205)) ([a8d8f07](https://github.com/anthropics/anthropic-sdk-typescript/commit/a8d8f07f9d4890195847b6ea86eb311e258e655f))
1350: 
1351: ## 0.8.1 (2023-10-25)
1352: 
1353: Full Changelog: [v0.8.0...v0.8.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.8.0...v0.8.1)
1354: 
1355: ### Bug Fixes
1356: 
1357: * typo in build script ([#197](https://github.com/anthropics/anthropic-sdk-typescript/issues/197)) ([212e990](https://github.com/anthropics/anthropic-sdk-typescript/commit/212e9903e9b72b3169f450d8ab11ebd384951dba))
1358: 
1359: ## 0.8.0 (2023-10-24)
1360: 
1361: Full Changelog: [v0.7.0...v0.8.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.7.0...v0.8.0)
1362: 
1363: ### Features
1364: 
1365: * **client:** adjust retry behavior to be exponential backoff ([#192](https://github.com/anthropics/anthropic-sdk-typescript/issues/192)) ([747afe2](https://github.com/anthropics/anthropic-sdk-typescript/commit/747afe2bdbbe3a5489e9b9bc6ed4fcf2a276e40b))
1366: 
1367: ## 0.7.0 (2023-10-19)
1368: 
1369: Full Changelog: [v0.6.8...v0.7.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.8...v0.7.0)
1370: 
1371: ### Features
1372: 
1373: * handle 204 No Content gracefully ([#190](https://github.com/anthropics/anthropic-sdk-typescript/issues/190)) ([c8a8bec](https://github.com/anthropics/anthropic-sdk-typescript/commit/c8a8becd127e5275333900c3bb76955605ae0f02))
1374: 
1375: ## 0.6.8 (2023-10-17)
1376: 
1377: Full Changelog: [v0.6.7...v0.6.8](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.7...v0.6.8)
1378: 
1379: ### Bug Fixes
1380: 
1381: * import web-streams-polyfill without overriding globals ([#186](https://github.com/anthropics/anthropic-sdk-typescript/issues/186)) ([e774e17](https://github.com/anthropics/anthropic-sdk-typescript/commit/e774e1774642668e080de5233aeaa33cf5f1b3ae))
1382: 
1383: ## 0.6.7 (2023-10-16)
1384: 
1385: Full Changelog: [v0.6.6...v0.6.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.6...v0.6.7)
1386: 
1387: ### Bug Fixes
1388: 
1389: * improve status code in error messages ([#183](https://github.com/anthropics/anthropic-sdk-typescript/issues/183)) ([7d3bbd4](https://github.com/anthropics/anthropic-sdk-typescript/commit/7d3bbd485c9628bb7c3fb5d1660934198981fcc7))
1390: 
1391: 
1392: ### Chores
1393: 
1394: * add case insensitive get header function ([#178](https://github.com/anthropics/anthropic-sdk-typescript/issues/178)) ([13c398d](https://github.com/anthropics/anthropic-sdk-typescript/commit/13c398dee3ff2eaa3b6046630eda9831580348f4))
1395: * **internal:** add debug logs for stream responses ([#182](https://github.com/anthropics/anthropic-sdk-typescript/issues/182)) ([a1fa1b7](https://github.com/anthropics/anthropic-sdk-typescript/commit/a1fa1b7766248f3178cb55ac5342409a57c1dbb8))
1396: * update comment ([#179](https://github.com/anthropics/anthropic-sdk-typescript/issues/179)) ([27a425e](https://github.com/anthropics/anthropic-sdk-typescript/commit/27a425ee64dcdc569b92ac27b501bca0dadf2dea))
1397: 
1398: 
1399: ### Documentation
1400: 
1401: * organisation -&gt; organization (UK to US English) ([#185](https://github.com/anthropics/anthropic-sdk-typescript/issues/185)) ([70257d4](https://github.com/anthropics/anthropic-sdk-typescript/commit/70257d43296f5b448b5649a34b67a3a3a26704ab))
1402: 
1403: 
1404: ### Refactors
1405: 
1406: * **streaming:** change Stream constructor signature ([#174](https://github.com/anthropics/anthropic-sdk-typescript/issues/174)) ([1951824](https://github.com/anthropics/anthropic-sdk-typescript/commit/195182432c41a2a8a4fc425788267e60f36f5820))
1407: * **test:** refactor authentication tests ([#176](https://github.com/anthropics/anthropic-sdk-typescript/issues/176)) ([f59daad](https://github.com/anthropics/anthropic-sdk-typescript/commit/f59daad06cab4c5df3068ea7f71ecbb20d8af141))
1408: 
1409: ## 0.6.6 (2023-10-11)
1410: 
1411: Full Changelog: [v0.6.5...v0.6.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.5...v0.6.6)
1412: 
1413: ### Chores
1414: 
1415: * update README ([#173](https://github.com/anthropics/anthropic-sdk-typescript/issues/173)) ([5f50c1b](https://github.com/anthropics/anthropic-sdk-typescript/commit/5f50c1b2f160610c89f158a10d83029c356d925a))
1416: 
1417: ## 0.6.5 (2023-10-11)
1418: 
1419: Full Changelog: [v0.6.4...v0.6.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.4...v0.6.5)
1420: 
1421: ### Features
1422: 
1423: * **client:** handle retry-after with a date ([#162](https://github.com/anthropics/anthropic-sdk-typescript/issues/162)) ([31bd609](https://github.com/anthropics/anthropic-sdk-typescript/commit/31bd60905858a6532414665a1368ae9f5fd29370))
1424: * **client:** retry on 408 Request Timeout ([#151](https://github.com/anthropics/anthropic-sdk-typescript/issues/151)) ([3523ffe](https://github.com/anthropics/anthropic-sdk-typescript/commit/3523ffe5647448d5a5960b1339c9a17374e85dd5))
1425: * **client:** support importing node or web shims manually ([#157](https://github.com/anthropics/anthropic-sdk-typescript/issues/157)) ([c1237fe](https://github.com/anthropics/anthropic-sdk-typescript/commit/c1237feaea9ca2d244720f2f75e023450a78019f))
1426: * **errors:** add status code to error message ([#155](https://github.com/anthropics/anthropic-sdk-typescript/issues/155)) ([76cf128](https://github.com/anthropics/anthropic-sdk-typescript/commit/76cf128b68f206038945ac4f54f6f50e8a6a2c1b))
1427: * **package:** export a root error type ([#160](https://github.com/anthropics/anthropic-sdk-typescript/issues/160)) ([51d8d60](https://github.com/anthropics/anthropic-sdk-typescript/commit/51d8d60b72fbe99dcb4d5a9ec32abbcb21ba1460))
1428: 
1429: 
1430: ### Bug Fixes
1431: 
1432: * **client:** eliminate circular imports, which cause runtime errors in webpack dev bundles ([#170](https://github.com/anthropics/anthropic-sdk-typescript/issues/170)) ([4a86733](https://github.com/anthropics/anthropic-sdk-typescript/commit/4a86733b9d11349fca041683ac9d89685133557d))
1433: * fix namespace exports regression ([#171](https://github.com/anthropics/anthropic-sdk-typescript/issues/171)) ([0689a91](https://github.com/anthropics/anthropic-sdk-typescript/commit/0689a9196619d968870b7fd2e1a0f037a1aee282))
1434: * prevent ReferenceError, update compatibility to ES2020 and Node 18+ ([#169](https://github.com/anthropics/anthropic-sdk-typescript/issues/169)) ([9753314](https://github.com/anthropics/anthropic-sdk-typescript/commit/9753314b7e36a270bb4c29f2981c521ec9c17773))
1435: 
1436: 
1437: ### Chores
1438: 
1439: * **internal:** bump lock file ([#159](https://github.com/anthropics/anthropic-sdk-typescript/issues/159)) ([e6030fa](https://github.com/anthropics/anthropic-sdk-typescript/commit/e6030fa915f26569f9c48c478a5e6c01910a6557))
1440: * **internal:** minor formatting improvement ([#168](https://github.com/anthropics/anthropic-sdk-typescript/issues/168)) ([6447608](https://github.com/anthropics/anthropic-sdk-typescript/commit/644760883802bc2769a916fa477f2c6491f018fd))
1441: * **internal:** update lock file ([#161](https://github.com/anthropics/anthropic-sdk-typescript/issues/161)) ([370ce3c](https://github.com/anthropics/anthropic-sdk-typescript/commit/370ce3c34b87591071fefc8b53977078603b6ca4))
1442: * **internal:** update lock file ([#163](https://github.com/anthropics/anthropic-sdk-typescript/issues/163)) ([4a37181](https://github.com/anthropics/anthropic-sdk-typescript/commit/4a37181e0ceada13e3ed61d6df7aa34492dc57a7))
1443: * **internal:** update lock file ([#164](https://github.com/anthropics/anthropic-sdk-typescript/issues/164)) ([939c155](https://github.com/anthropics/anthropic-sdk-typescript/commit/939c155277e67c19f7b2ff956f7cf0d40d4671cd))
1444: 
1445: 
1446: ### Documentation
1447: 
1448: * **api.md:** add shared models ([#158](https://github.com/anthropics/anthropic-sdk-typescript/issues/158)) ([33e5518](https://github.com/anthropics/anthropic-sdk-typescript/commit/33e5518bdeca83bbbde0e144e444609f569f1477))
1449: * declare Bun 1.0 officially supported ([#154](https://github.com/anthropics/anthropic-sdk-typescript/issues/154)) ([429d8f4](https://github.com/anthropics/anthropic-sdk-typescript/commit/429d8f44b113a91599f0ebb69128636da82a5050))
1450: * **readme:** remove incorrect wording in opening ([#156](https://github.com/anthropics/anthropic-sdk-typescript/issues/156)) ([01973fe](https://github.com/anthropics/anthropic-sdk-typescript/commit/01973fe50b13ce2981656f8c13603975e7c43efd))
1451: 
1452: ## 0.6.4 (2023-09-08)
1453: 
1454: Full Changelog: [v0.6.3...v0.6.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.3...v0.6.4)
1455: 
1456: ### Features
1457: 
1458: * **package:** add Bun export map ([#139](https://github.com/anthropics/anthropic-sdk-typescript/issues/139)) ([ba3310d](https://github.com/anthropics/anthropic-sdk-typescript/commit/ba3310d903cd5fda91168266335f4e445e60cad4))
1459: 
1460: 
1461: ### Bug Fixes
1462: 
1463: * **client:** fix TS errors that appear when users Go to Source in VSCode ([#142](https://github.com/anthropics/anthropic-sdk-typescript/issues/142)) ([f7bfbea](https://github.com/anthropics/anthropic-sdk-typescript/commit/f7bfbeaa54d364201bbe5cddf3132875ae2a3ccf))
1464: * **client:** handle case where the client is instantiated with a undefined baseURL ([#143](https://github.com/anthropics/anthropic-sdk-typescript/issues/143)) ([10e5203](https://github.com/anthropics/anthropic-sdk-typescript/commit/10e52034990d90dcdaf26672ea384545b88ddf35))
1465: * **client:** use explicit file extensions in _shims imports ([#141](https://github.com/anthropics/anthropic-sdk-typescript/issues/141)) ([10fd687](https://github.com/anthropics/anthropic-sdk-typescript/commit/10fd68742a202c5c0a8b520db190c239dce9b676))
1466: * fix module not found errors in Vercel edge ([#148](https://github.com/anthropics/anthropic-sdk-typescript/issues/148)) ([72e51a1](https://github.com/anthropics/anthropic-sdk-typescript/commit/72e51a170855281a8d099b00c6fb1e9ccb276212))
1467: * **readme:** update link to api.md to use the correct branch ([#145](https://github.com/anthropics/anthropic-sdk-typescript/issues/145)) ([5db78ed](https://github.com/anthropics/anthropic-sdk-typescript/commit/5db78edec4826f86b2fc21ee3f470b49a4987029))
1468: 
1469: 
1470: ### Chores
1471: 
1472: * **internal:** export helper from core ([#147](https://github.com/anthropics/anthropic-sdk-typescript/issues/147)) ([7e79de1](https://github.com/anthropics/anthropic-sdk-typescript/commit/7e79de14edeab8110d740e996653e9f9cc2299a4))
1473: 
1474: 
1475: ### Documentation
1476: 
1477: * **readme:** add link to api.md ([#144](https://github.com/anthropics/anthropic-sdk-typescript/issues/144)) ([716c9f0](https://github.com/anthropics/anthropic-sdk-typescript/commit/716c9f0714c0e9c26cb6cdcb007457aff1284cf4))
1478: 
1479: ## 0.6.3 (2023-08-28)
1480: 
1481: Full Changelog: [v0.6.2...v0.6.3](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.2...v0.6.3)
1482: 
1483: ### Bug Fixes
1484: 
1485: * **types:** improve getNextPage() return type ([#137](https://github.com/anthropics/anthropic-sdk-typescript/issues/137)) ([713d603](https://github.com/anthropics/anthropic-sdk-typescript/commit/713d6032c2c3b3630314a9625a1672147ef19258))
1486: 
1487: 
1488: ### Chores
1489: 
1490: * **ci:** setup workflows to create releases and release PRs ([#135](https://github.com/anthropics/anthropic-sdk-typescript/issues/135)) ([56229d9](https://github.com/anthropics/anthropic-sdk-typescript/commit/56229d964733a8b00625dac4ff138b3ade7e4202))
1491: 
1492: ## [0.6.2](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.1...v0.6.2) (2023-08-26)
1493: 
1494: 
1495: ### Bug Fixes
1496: 
1497: * **stream:** declare Stream.controller as public ([#132](https://github.com/anthropics/anthropic-sdk-typescript/issues/132)) ([ff33a89](https://github.com/anthropics/anthropic-sdk-typescript/commit/ff33a893747aa708133bab14e97fba34ec776303))
1498: 
1499: 
1500: ### Refactors
1501: 
1502: * remove unnecessary line in constructor ([#131](https://github.com/anthropics/anthropic-sdk-typescript/issues/131)) ([dcdf5e5](https://github.com/anthropics/anthropic-sdk-typescript/commit/dcdf5e5183e99ae91d170ca09cc6da5e5637783f))
1503: 
1504: 
1505: ### Chores
1506: 
1507: * **internal:** add helper method ([#133](https://github.com/anthropics/anthropic-sdk-typescript/issues/133)) ([4c6950a](https://github.com/anthropics/anthropic-sdk-typescript/commit/4c6950a489b818151127aa1a39c239e4fd58a06e))
1508: * **internal:** export HeadersInit type shim ([#129](https://github.com/anthropics/anthropic-sdk-typescript/issues/129)) ([bcd51bd](https://github.com/anthropics/anthropic-sdk-typescript/commit/bcd51bd12ad0854baf28b59dcada871889032515))
1509: 
1510: ## [0.6.1](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.6.0...v0.6.1) (2023-08-23)
1511: 
1512: 
1513: ### Features
1514: 
1515: * allow a default timeout to be set for clients ([#113](https://github.com/anthropics/anthropic-sdk-typescript/issues/113)) ([1c5b2e2](https://github.com/anthropics/anthropic-sdk-typescript/commit/1c5b2e29926100a6e4a6176f0943e2c98991175d))
1516: * **client:** improve compatibility with Bun ([#119](https://github.com/anthropics/anthropic-sdk-typescript/issues/119)) ([fe4f5d5](https://github.com/anthropics/anthropic-sdk-typescript/commit/fe4f5d5e35e35cab2a62388eb595519e9c14635c))
1517: * **docs:** add documentation to the client constructor ([#118](https://github.com/anthropics/anthropic-sdk-typescript/issues/118)) ([79303f9](https://github.com/anthropics/anthropic-sdk-typescript/commit/79303f9c46a8248abd05fedbedbbed6e735c046d))
1518: * **types:** export RequestOptions type ([#127](https://github.com/anthropics/anthropic-sdk-typescript/issues/127)) ([9769751](https://github.com/anthropics/anthropic-sdk-typescript/commit/9769751b84853822e3e6596110ecb2c367f07438))
1519: * **types:** remove footgun with streaming params ([#125](https://github.com/anthropics/anthropic-sdk-typescript/issues/125)) ([3ed67b6](https://github.com/anthropics/anthropic-sdk-typescript/commit/3ed67b670bae14bc586df224aa57dd4dfa6e71f5))
1520: 
1521: 
1522: ### Bug Fixes
1523: 
1524: * **client:** fix TypeError when a request gets retried ([#117](https://github.com/anthropics/anthropic-sdk-typescript/issues/117)) ([0ade979](https://github.com/anthropics/anthropic-sdk-typescript/commit/0ade979a322c07f9a8f5322407b38352fe99b3ce))
1525: * **core:** fix navigator check for strange environments ([#124](https://github.com/anthropics/anthropic-sdk-typescript/issues/124)) ([c783604](https://github.com/anthropics/anthropic-sdk-typescript/commit/c7836040017d5ce35204c07be0b018e87e827fdb))
1526: * **types:** add catch-all overload to streaming methods ([#123](https://github.com/anthropics/anthropic-sdk-typescript/issues/123)) ([7c229a2](https://github.com/anthropics/anthropic-sdk-typescript/commit/7c229a24e6751bad22acb8c544113713140120fd))
1527: 
1528: 
1529: ### Documentation
1530: 
1531: * **readme:** fix typo ([#121](https://github.com/anthropics/anthropic-sdk-typescript/issues/121)) ([c5dbc3f](https://github.com/anthropics/anthropic-sdk-typescript/commit/c5dbc3fe89c84a728b6a4d7a4f6eadb228ac5688))
1532: 
1533: 
1534: ### Chores
1535: 
1536: * assign default reviewers to release PRs ([#115](https://github.com/anthropics/anthropic-sdk-typescript/issues/115)) ([1df3965](https://github.com/anthropics/anthropic-sdk-typescript/commit/1df3965a10256d30f8ce2af8d9890a26522117a9))
1537: * **internal:** add missing eslint-plugin-prettier ([#122](https://github.com/anthropics/anthropic-sdk-typescript/issues/122)) ([66bede0](https://github.com/anthropics/anthropic-sdk-typescript/commit/66bede0ae3ed7b5baa002bbb0c87b4156306f982))
1538: * **internal:** fix error happening in CloudFlare pages ([#116](https://github.com/anthropics/anthropic-sdk-typescript/issues/116)) ([b0dc7b3](https://github.com/anthropics/anthropic-sdk-typescript/commit/b0dc7b3b14520ce1f66c2b9d6a0f5aae4028985b))
1539: * **internal:** minor reformatting of code ([#120](https://github.com/anthropics/anthropic-sdk-typescript/issues/120)) ([4bcaf9e](https://github.com/anthropics/anthropic-sdk-typescript/commit/4bcaf9e30a312284cb22c2084e8242ad7d181ba8))
1540: 
1541: ## [0.6.0](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.10...v0.6.0) (2023-08-12)
1542: 
1543: 
1544: ### Features
1545: 
1546: * **client:** add support for accessing the raw response object ([#105](https://github.com/anthropics/anthropic-sdk-typescript/issues/105)) ([c86b059](https://github.com/anthropics/anthropic-sdk-typescript/commit/c86b0593a630f3adafc5c329019ea7028b6a41cd))
1547: * **client:** detect browser usage ([#101](https://github.com/anthropics/anthropic-sdk-typescript/issues/101)) ([f4cae3f](https://github.com/anthropics/anthropic-sdk-typescript/commit/f4cae3f63c2e65e087a7bf27dac1eeb8200e0a36))
1548: * **types:** improve streaming params types ([#102](https://github.com/anthropics/anthropic-sdk-typescript/issues/102)) ([cdf808c](https://github.com/anthropics/anthropic-sdk-typescript/commit/cdf808ca2a18cd744a5d1840e5e2adb3015e8d1d))
1549: 
1550: 
1551: ### Documentation
1552: 
1553: * **readme:** minor updates ([#107](https://github.com/anthropics/anthropic-sdk-typescript/issues/107)) ([406fd97](https://github.com/anthropics/anthropic-sdk-typescript/commit/406fd97d4cee0dd363ad548c9a251f78091a70e3))
1554: * **readme:** remove beta status + document versioning policy ([#100](https://github.com/anthropics/anthropic-sdk-typescript/issues/100)) ([e9ef3d2](https://github.com/anthropics/anthropic-sdk-typescript/commit/e9ef3d21a25e355d8bf94b7a941ad82ec5eafec8))
1555: 
1556: 
1557: ### Chores
1558: 
1559: * **docs:** remove trailing spaces ([#108](https://github.com/anthropics/anthropic-sdk-typescript/issues/108)) ([4ba2c6f](https://github.com/anthropics/anthropic-sdk-typescript/commit/4ba2c6f181521ed9a60ed45c35d2276129cd7a0b))
1560: * **internal:** conditionally include bin during build output ([#109](https://github.com/anthropics/anthropic-sdk-typescript/issues/109)) ([58ac305](https://github.com/anthropics/anthropic-sdk-typescript/commit/58ac305d752d6b5c378f91b988ddfb97231c003c))
1561: * **internal:** fix deno build ([#98](https://github.com/anthropics/anthropic-sdk-typescript/issues/98)) ([f011e04](https://github.com/anthropics/anthropic-sdk-typescript/commit/f011e041f2f9cabb12951013825c0f0a2a569053))
1562: * **internal:** remove deno build ([#103](https://github.com/anthropics/anthropic-sdk-typescript/issues/103)) ([9af1527](https://github.com/anthropics/anthropic-sdk-typescript/commit/9af152707a9bcf3027afc64f027566be25da2eb9))
1563: 
1564: 
1565: ### Refactors
1566: 
1567: * **client:** remove Stream.toReadableStream() ([#110](https://github.com/anthropics/anthropic-sdk-typescript/issues/110)) ([c370412](https://github.com/anthropics/anthropic-sdk-typescript/commit/c37041285ed9cccf6d980a953e14ffd4006a8acc))
1568: 
1569: ## [0.5.10](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.9...v0.5.10) (2023-08-01)
1570: 
1571: 
1572: ### Refactors
1573: 
1574: * create build for deno.land ([#93](https://github.com/anthropics/anthropic-sdk-typescript/issues/93)) ([2ea741a](https://github.com/anthropics/anthropic-sdk-typescript/commit/2ea741a4d4a3123b2eaafb87b73d7884c69ae23b))
1575: 
1576: 
1577: ### Documentation
1578: 
1579: * **readme:** add token counting reference ([#94](https://github.com/anthropics/anthropic-sdk-typescript/issues/94)) ([2c6a699](https://github.com/anthropics/anthropic-sdk-typescript/commit/2c6a699d499a3468fc4312a6b6c9493ffd1806a2))
1580: 
1581: 
1582: ### Chores
1583: 
1584: * **internal:** allow the build script to be run without yarn installed ([#91](https://github.com/anthropics/anthropic-sdk-typescript/issues/91)) ([9bd2b28](https://github.com/anthropics/anthropic-sdk-typescript/commit/9bd2b2871ca8a3b5f2466a904153d5c234094372))
1585: * **internal:** fix deno build ([#96](https://github.com/anthropics/anthropic-sdk-typescript/issues/96)) ([3fdab4e](https://github.com/anthropics/anthropic-sdk-typescript/commit/3fdab4e33b4c8668d17b8cddabbb09a22adf4124))
1586: 
1587: ## [0.5.9](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.8...v0.5.9) (2023-07-29)
1588: 
1589: 
1590: ### Bug Fixes
1591: 
1592: * **client:** handle undefined process in more places ([#87](https://github.com/anthropics/anthropic-sdk-typescript/issues/87)) ([d950c25](https://github.com/anthropics/anthropic-sdk-typescript/commit/d950c25469a6c6b0dd3cfecd282db078826366ba))
1593: * **examples:** avoid swallowing errors in example scripts ([#82](https://github.com/anthropics/anthropic-sdk-typescript/issues/82)) ([b27cfe9](https://github.com/anthropics/anthropic-sdk-typescript/commit/b27cfe9323bce983bb49f57dece98f1d9e507034))
1594: * fix undefined message in errors ([#86](https://github.com/anthropics/anthropic-sdk-typescript/issues/86)) ([5714a14](https://github.com/anthropics/anthropic-sdk-typescript/commit/5714a14d9af282a3d308b8694e6e03309d4b5642))
1595: 
1596: 
1597: ### Chores
1598: 
1599: * **internal:** minor refactoring of client instantiation ([#88](https://github.com/anthropics/anthropic-sdk-typescript/issues/88)) ([2c53e1c](https://github.com/anthropics/anthropic-sdk-typescript/commit/2c53e1ca28a444a48e5f1041d9eb9077608b3fc7))
1600: 
1601: 
1602: ### Refactors
1603: 
1604: * use destructuring arguments in client constructor and respect false values ([#89](https://github.com/anthropics/anthropic-sdk-typescript/issues/89)) ([8d4c686](https://github.com/anthropics/anthropic-sdk-typescript/commit/8d4c6860273bbd16027023700d521a5e48db76f7))
1605: 
1606: ## [0.5.8](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.7...v0.5.8) (2023-07-22)
1607: 
1608: 
1609: ### Features
1610: 
1611: * **streaming:** make requests immediately throw an error if an aborted signal is passed in ([#79](https://github.com/anthropics/anthropic-sdk-typescript/issues/79)) ([5c86597](https://github.com/anthropics/anthropic-sdk-typescript/commit/5c865979a21d18db87df43a9bdb27b701815f4bb))
1612: 
1613: ## [0.5.7](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.6...v0.5.7) (2023-07-19)
1614: 
1615: 
1616: ### Features
1617: 
1618: * add flexible enum to model param ([#73](https://github.com/anthropics/anthropic-sdk-typescript/issues/73)) ([a6bbcad](https://github.com/anthropics/anthropic-sdk-typescript/commit/a6bbcadb447060f3c2e60881d31d7b7fb7a50512))
1619: * **client:** export ClientOptions interface ([#75](https://github.com/anthropics/anthropic-sdk-typescript/issues/75)) ([0315ce1](https://github.com/anthropics/anthropic-sdk-typescript/commit/0315ce170db463ad900384ab7e4f62885cb471a2))
1620: * **deps:** remove unneeded qs dep ([#72](https://github.com/anthropics/anthropic-sdk-typescript/issues/72)) ([0aea5a6](https://github.com/anthropics/anthropic-sdk-typescript/commit/0aea5a6f4852f351ecbe9f46d6857a6fafc7e864))
1621: 
1622: 
1623: ### Bug Fixes
1624: 
1625: * **client:** fix errors with file uploads in the browser ([#76](https://github.com/anthropics/anthropic-sdk-typescript/issues/76)) ([ac48fa7](https://github.com/anthropics/anthropic-sdk-typescript/commit/ac48fa72bb764b2abed95f200bc658f65725e2b3))
1626: * fix error in environments without `TextEncoder` ([#70](https://github.com/anthropics/anthropic-sdk-typescript/issues/70)) ([5b78e05](https://github.com/anthropics/anthropic-sdk-typescript/commit/5b78e0586fd351258ccc05c8ba89a2ba66681b0d))
1627: * fix export map order ([#74](https://github.com/anthropics/anthropic-sdk-typescript/issues/74)) ([51e70cb](https://github.com/anthropics/anthropic-sdk-typescript/commit/51e70cb9b55128d4de1b0597fad475d0f4bc836c))
1628: 
1629: ## [0.5.6](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.5...v0.5.6) (2023-07-15)
1630: 
1631: 
1632: ### Bug Fixes
1633: 
1634: * fix errors with "named" client export in CJS ([#67](https://github.com/anthropics/anthropic-sdk-typescript/issues/67)) ([08ef69c](https://github.com/anthropics/anthropic-sdk-typescript/commit/08ef69cca87bbdf82440d163611f45e04e894234))
1635: 
1636: ## [0.5.5](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.4...v0.5.5) (2023-07-13)
1637: 
1638: 
1639: ### Features
1640: 
1641: * **client:** add support for passing a `signal` request option ([#55](https://github.com/anthropics/anthropic-sdk-typescript/issues/55)) ([09604e9](https://github.com/anthropics/anthropic-sdk-typescript/commit/09604e9990e13dd703f4bcfd0a241b8ec2ebbc71))
1642: 
1643: 
1644: ### Bug Fixes
1645: 
1646: * **streaming:** do not abort successfully completed streams ([#53](https://github.com/anthropics/anthropic-sdk-typescript/issues/53)) ([950dd49](https://github.com/anthropics/anthropic-sdk-typescript/commit/950dd4930429010d89ae31eef9ebb193be9517ad))
1647: 
1648: 
1649: ### Documentation
1650: 
1651: * **examples:** bump model to claude-2 in example scripts ([#57](https://github.com/anthropics/anthropic-sdk-typescript/issues/57)) ([f85c05d](https://github.com/anthropics/anthropic-sdk-typescript/commit/f85c05d49a7a9db1deb8eed9124934da763b721b))
1652: * **readme:** improvements to formatting code snippets ([#58](https://github.com/anthropics/anthropic-sdk-typescript/issues/58)) ([67bae64](https://github.com/anthropics/anthropic-sdk-typescript/commit/67bae64d5388e7e71ea3a891b3579c072b743f38))
1653: 
1654: 
1655: ### Chores
1656: 
1657: * **internal:** add helper function for b64 ([#62](https://github.com/anthropics/anthropic-sdk-typescript/issues/62)) ([04e303c](https://github.com/anthropics/anthropic-sdk-typescript/commit/04e303c5cc7b14a862b81379d547b3dc6e908720))
1658: * **internal:** let `toFile` helper accept promises to objects with name/type properties ([#63](https://github.com/anthropics/anthropic-sdk-typescript/issues/63)) ([93f9af2](https://github.com/anthropics/anthropic-sdk-typescript/commit/93f9af29a91cfced533d309d1816c58bc2efa355))
1659: * **internal:** remove unneeded type var usage ([#59](https://github.com/anthropics/anthropic-sdk-typescript/issues/59)) ([42fc4a9](https://github.com/anthropics/anthropic-sdk-typescript/commit/42fc4a90cc267f077b26d2bafebe487a74cae067))
1660: 
1661: ## [0.5.4](https://github.com/anthropics/anthropic-sdk-typescript/compare/v0.5.3...v0.5.4) (2023-07-11)
1662: 
1663: 
1664: ### Features
1665: 
1666: * **api:** reference claude-2 in examples ([#50](https://github.com/anthropics/anthropic-sdk-typescript/issues/50)) ([7c53ded](https://github.com/anthropics/anthropic-sdk-typescript/commit/7c53ded6b7f5f3efec0df295181f18469c37e09d))
1667: * **client:** support passing a custom `fetch` function ([#46](https://github.com/anthropics/anthropic-sdk-typescript/issues/46)) ([7d54366](https://github.com/anthropics/anthropic-sdk-typescript/commit/7d54366fcefa0267e831a0cca4d10c9a146d9f6c))
1668: 
1669: 
1670: ### Bug Fixes
1671: 
1672: * **client:** properly handle multi-byte characters in Content-Length ([#47](https://github.com/anthropics/anthropic-sdk-typescript/issues/47)) ([8dfff26](https://github.com/anthropics/anthropic-sdk-typescript/commit/8dfff2691a3ebd5721462c055d8da638ac77e571))
1673: 
1674: 
1675: ### Refactors
1676: 
1677: * **streaming:** make response body streaming polyfill more spec-compliant ([#44](https://github.com/anthropics/anthropic-sdk-typescript/issues/44)) ([047d328](https://github.com/anthropics/anthropic-sdk-typescript/commit/047d328cb0968fb1926e41326d35b595ba3fb3bc))
````

## File: CONTRIBUTING.md
````markdown
  1: ## Setting up the environment
  2: 
  3: This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).
  4: Other package managers may work but are not officially supported for development.
  5: 
  6: To set up the repository, run:
  7: 
  8: ```sh
  9: $ yarn
 10: $ yarn build
 11: ```
 12: 
 13: This will install all the required dependencies and build output files to `dist/`.
 14: 
 15: ## Modifying/Adding code
 16: 
 17: Most of the SDK is generated code. Modifications to code will be persisted between generations, but may
 18: result in merge conflicts between manual patches and changes from the generator. The generator will never
 19: modify the contents of the `src/lib/` and `examples/` directories.
 20: 
 21: ## Adding and running examples
 22: 
 23: All files in the `examples/` directory are not modified by the generator and can be freely edited or added to.
 24: 
 25: ```ts
 26: // add an example to examples/<your-example>.ts
 27: 
 28: #!/usr/bin/env -S npm run tsn -T
 29: …
 30: ```
 31: 
 32: ```sh
 33: $ chmod +x examples/<your-example>.ts
 34: # run the example against your api
 35: $ yarn tsn -T examples/<your-example>.ts
 36: ```
 37: 
 38: ## Using the repository from source
 39: 
 40: If you’d like to use the repository from source, you can either install from git or link to a cloned repository:
 41: 
 42: To install via git:
 43: 
 44: ```sh
 45: $ npm install git+ssh://git@github.com:anthropics/anthropic-sdk-typescript.git
 46: ```
 47: 
 48: Alternatively, to link a local copy of the repo:
 49: 
 50: ```sh
 51: # Clone
 52: $ git clone https://www.github.com/anthropics/anthropic-sdk-typescript
 53: $ cd anthropic-sdk-typescript
 54: 
 55: # With yarn
 56: $ yarn link
 57: $ cd ../my-package
 58: $ yarn link @anthropic-ai/sdk
 59: 
 60: # With pnpm
 61: $ pnpm link --global
 62: $ cd ../my-package
 63: $ pnpm link -—global @anthropic-ai/sdk
 64: ```
 65: 
 66: ## Running tests
 67: 
 68: Most tests require you to [set up a mock server](https://github.com/stoplightio/prism) against the OpenAPI spec to run the tests.
 69: 
 70: ```sh
 71: $ npx prism mock path/to/your/openapi.yml
 72: ```
 73: 
 74: ```sh
 75: $ yarn run test
 76: ```
 77: 
 78: ## Linting and formatting
 79: 
 80: This repository uses [prettier](https://www.npmjs.com/package/prettier) and
 81: [eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.
 82: 
 83: To lint:
 84: 
 85: ```sh
 86: $ yarn lint
 87: ```
 88: 
 89: To format and fix all lint issues automatically:
 90: 
 91: ```sh
 92: $ yarn fix
 93: ```
 94: 
 95: ## Publishing and releases
 96: 
 97: Changes made to this repository via the automated release PR pipeline should publish to npm automatically. If
 98: the changes aren't made through the automated pipeline, you may want to make releases manually.
 99: 
100: ### Publish with a GitHub workflow
101: 
102: You can release to package managers by using [the `Publish NPM` GitHub action](https://www.github.com/anthropics/anthropic-sdk-typescript/actions/workflows/publish-npm.yml). This requires a setup organization or repository secret to be set up.
103: 
104: ### Publish manually
105: 
106: If you need to manually release a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
107: the environment.
````

## File: eslint.config.mjs
````
 1: // @ts-check
 2: import tseslint from 'typescript-eslint';
 3: import unusedImports from 'eslint-plugin-unused-imports';
 4: import prettier from 'eslint-plugin-prettier';
 5: 
 6: export default tseslint.config(
 7:   {
 8:     languageOptions: {
 9:       parser: tseslint.parser,
10:       parserOptions: { sourceType: 'module' },
11:     },
12:     files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs', '**/*.cjs'],
13:     ignores: ['dist/**'],
14:     plugins: {
15:       '@typescript-eslint': tseslint.plugin,
16:       'unused-imports': unusedImports,
17:       prettier,
18:     },
19:     rules: {
20:       'no-unused-vars': 'off',
21:       'prettier/prettier': 'error',
22:       'unused-imports/no-unused-imports': 'error',
23:       'no-restricted-imports': [
24:         'error',
25:         {
26:           patterns: [
27:             {
28:               regex: '^@anthropic-ai/sdk(/.*)?',
29:               message: 'Use a relative import, not a package import.',
30:             },
31:           ],
32:         },
33:       ],
34:     },
35:   },
36:   {
37:     files: ['tests/**', 'examples/**', 'packages/**'],
38:     rules: {
39:       'no-restricted-imports': 'off',
40:     },
41:   },
42: );
````

## File: helpers.md
````markdown
  1: # Message Helpers
  2: 
  3: ## Streaming Responses
  4: 
  5: ```ts
  6: anthropic.messages.stream({ … }, options?): MessageStream
  7: ```
  8: 
  9: `anthropic.messages.stream()` returns a `MessageStream`, which emits events, has an async
 10: iterator, and exposes helper methods to accumulate stream events into a convenient shape and make it easy to reason
 11: about the conversation.
 12: 
 13: Alternatively, you can use `anthropic.messages.create({ stream: true, … })` which returns an async
 14: iterable of the chunks in the stream and uses less memory (most notably, it does not accumulate a message
 15: object for you).
 16: 
 17: If you need to cancel a stream, you can `break` from a `for await` loop or call `stream.abort()`.
 18: 
 19: See an example of streaming helpers in action in [`examples/streaming.ts`](examples/streaming.ts).
 20: 
 21: ## MessageStream API
 22: 
 23: ### Events
 24: 
 25: #### `.on('connect', () => …)`
 26: 
 27: The first event that is fired when the connection with the Anthropic API is established.
 28: 
 29: #### `.on('streamEvent', (event: MessageStreamEvent, snapshot: Message) => …)`
 30: 
 31: The event fired when a stream event is received from the API. Not fired when it is not streaming. The snapshot
 32: returns an accumulated `Message` which is progressively built-up over events.
 33: 
 34: #### `.on('text', (textDelta: string, textSnapshot: string) => …)`
 35: 
 36: The event fired when a text delta is sent by the API. The second parameter returns a `textSnapshot`.
 37: 
 38: #### `.on('inputJson', (patialJson: string, jsonSnapshot: unknown) => …)`
 39: 
 40: The event fired when a json delta is sent by the API. The second parameter returns a `jsonSnapshot`.
 41: 
 42: #### `.on('message', (message: Message) => …)`
 43: 
 44: The event fired when a message is done being streamed by the API. Corresponds to the `message_stop` SSE event.
 45: 
 46: #### `.on('contentBlock', (content: ContentBlock) => …)`
 47: 
 48: The event fired when a content block is done being streamed by the API. Corresponds to the
 49: `content_block_stop` SSE event.
 50: 
 51: #### `.on('finalMessage', (message: Message) => …)`
 52: 
 53: The event fired for the final message. Currently this is equivalent to the `message` event, but is fired after
 54: it.
 55: 
 56: #### `.on('error', (error: AnthropicError) => …)`
 57: 
 58: The event fired when an error is encountered while streaming.
 59: 
 60: #### `.on('abort', (error: APIUserAbortError) => …)`
 61: 
 62: The event fired when the stream receives a signal to abort.
 63: 
 64: #### `.on('end', () => …)`
 65: 
 66: The last event fired in the stream.
 67: 
 68: ### Methods
 69: 
 70: #### `.abort()`
 71: 
 72: Aborts the runner and the streaming request, equivalent to `.controller.abort()`. Calling `.abort()` on a
 73: `MessageStream` will also abort any in-flight network requests.
 74: 
 75: #### `await .done()`
 76: 
 77: An empty promise which resolves when the stream is done.
 78: 
 79: #### `.currentMessage`
 80: 
 81: Returns the current state of the message that is being accumulated, or `undefined` if there is no such
 82: message.
 83: 
 84: #### `await .finalMessage()`
 85: 
 86: A promise which resolves with the last message received from the API. Throws if no such message exists.
 87: 
 88: #### `await .finalText()`
 89: 
 90: A promise which resolves with the text of the last message received from the API.
 91: 
 92: ### Fields
 93: 
 94: #### `.messages`
 95: 
 96: A mutable array of all messages in the conversation.
 97: 
 98: #### `.controller`
 99: 
100: The underlying `AbortController` for the runner.
````

## File: jest.config.ts
````typescript
 1: import type { JestConfigWithTsJest } from 'ts-jest';
 2: 
 3: const config: JestConfigWithTsJest = {
 4:   preset: 'ts-jest/presets/default-esm',
 5:   testEnvironment: 'node',
 6:   transform: {
 7:     '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
 8:   },
 9:   moduleNameMapper: {
10:     '^@anthropic-ai/sdk$': '<rootDir>/src/index.ts',
11:     '^@anthropic-ai/sdk/(.*)$': '<rootDir>/src/$1',
12:   },
13:   modulePathIgnorePatterns: [
14:     '<rootDir>/ecosystem-tests/',
15:     '<rootDir>/dist/',
16:     '<rootDir>/deno/',
17:     '<rootDir>/deno_tests/',
18:   ],
19:   testPathIgnorePatterns: ['scripts'],
20: };
21: 
22: export default config;
````

## File: MIGRATION.md
````markdown
  1: # Migration guide
  2: 
  3: This guide outlines the changes and steps needed to migrate your codebase to the latest version of the Anthropic TypeScript SDK.
  4: 
  5: The main changes are that the SDK now relies on the [builtin Web fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) instead of `node-fetch` and has zero dependencies.
  6: 
  7: ## Migration CLI
  8: 
  9: Most programs will only need minimal changes, but to assist there is a migration tool that will automatically update your code for the new version.
 10: To use it, upgrade the `@anthropic-ai/sdk` package, then run `./node_modules/.bin/anthropic-ai-sdk migrate ./your/src/folders` to update your code.
 11: To preview the changes without writing them to disk, run the tool with `--dry`.
 12: 
 13: ## Environment requirements
 14: 
 15: The minimum supported runtime and tooling versions are now:
 16: 
 17: - Node.js 20 LTS (Most recent non-EOL Node version)
 18: - TypeScript 4.9
 19: - Jest 28
 20: 
 21: ## Breaking changes
 22: 
 23: ### Web types for `withResponse`, `asResponse`, and `APIError.headers`
 24: 
 25: Because we now use the builtin Web fetch API on all platforms, if you wrote code that used `withResponse` or `asResponse` and then accessed `node-fetch`-specific properties on the result, you will need to switch to standardized alternatives.
 26: For example, `body` is now a [Web `ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) rather than a [node `Readable`](https://nodejs.org/api/stream.html#readable-streams).
 27: 
 28: ```ts
 29: // Before:
 30: const res = await client.example.retrieve('string/with/slash').asResponse();
 31: res.body.pipe(process.stdout);
 32: 
 33: // After:
 34: import { Readable } from 'node:stream';
 35: const res = await client.example.retrieve('string/with/slash').asResponse();
 36: Readable.fromWeb(res.body).pipe(process.stdout);
 37: ```
 38: 
 39: Additionally, the `headers` property on `APIError` objects is now an instance of the Web [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) class. It was previously defined as `Record<string, string | null | undefined>`.
 40: 
 41: ### URI encoded path parameters
 42: 
 43: Path params are now properly encoded by default. If you were manually encoding path parameters before giving them to the SDK, you must now stop doing that and pass the
 44: param without any encoding applied.
 45: 
 46: For example:
 47: 
 48: ```diff
 49: - client.example.retrieve(encodeURIComponent('string/with/slash'))
 50: + client.example.retrieve('string/with/slash') // retrieves /example/string%2Fwith%2Fslash
 51: ```
 52: 
 53: Previously without the `encodeURIComponent()` call we would have used the path `/example/string/with/slash`; now we'll use `/example/string%2Fwith%2Fslash`.
 54: 
 55: ### Removed request options overloads
 56: 
 57: When making requests with no required body, query or header parameters, you must now explicitly pass `null`, `undefined` or an empty object `{}` to the params argument in order to customise request options.
 58: 
 59: ```diff
 60: client.example.list();
 61: client.example.list({}, { headers: { ... } });
 62: client.example.list(null, { headers: { ... } });
 63: client.example.list(undefined, { headers: { ... } });
 64: - client.example.list({ headers: { ... } });
 65: + client.example.list({}, { headers: { ... } });
 66: ```
 67: 
 68: This affects the following methods:
 69: 
 70: - `client.messages.batches.list()`
 71: - `client.models.retrieve()`
 72: - `client.models.list()`
 73: - `client.beta.models.retrieve()`
 74: - `client.beta.models.list()`
 75: - `client.beta.messages.batches.retrieve()`
 76: - `client.beta.messages.batches.list()`
 77: - `client.beta.messages.batches.delete()`
 78: - `client.beta.messages.batches.cancel()`
 79: - `client.beta.messages.batches.results()`
 80: - `client.beta.files.list()`
 81: - `client.beta.files.delete()`
 82: - `client.beta.files.download()`
 83: - `client.beta.files.retrieveMetadata()`
 84: 
 85: ### Removed `httpAgent` in favor of `fetchOptions`
 86: 
 87: The `httpAgent` client option has been removed in favor of a [platform-specific `fetchOptions` property](https://github.com/anthropics/anthropic-sdk-typescript#fetch-options).
 88: This change was made as `httpAgent` relied on `node:http` agents which are not supported by any runtime's builtin fetch implementation.
 89: 
 90: If you were using `httpAgent` for proxy support, check out the [new proxy documentation](https://github.com/anthropics/anthropic-sdk-typescript#configuring-proxies).
 91: 
 92: Before:
 93: 
 94: ```ts
 95: import Anthropic from '@anthropic-ai/sdk';
 96: import http from 'http';
 97: import { HttpsProxyAgent } from 'https-proxy-agent';
 98: 
 99: // Configure the default for all requests:
100: const client = new Anthropic({
101:   httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
102: });
103: ```
104: 
105: After:
106: 
107: ```ts
108: import Anthropic from '@anthropic-ai/sdk';
109: import * as undici from 'undici';
110: 
111: const proxyAgent = new undici.ProxyAgent(process.env.PROXY_URL);
112: const client = new Anthropic({
113:   fetchOptions: {
114:     dispatcher: proxyAgent,
115:   },
116: });
117: ```
118: 
119: ### Changed exports
120: 
121: #### Refactor of `@anthropic-ai/sdk/core`, `error`, `pagination`, `resource`, `streaming` and `uploads`
122: 
123: Much of the `@anthropic-ai/sdk/core` file was intended to be internal-only but it was publicly accessible, as such it has been refactored and split up into internal and public files, with public-facing code moved to a new `core` folder and internal code moving to the private `internal` folder.
124: 
125: At the same time, we moved some public-facing files which were previously at the top level into `core` to make the file structure cleaner and more clear:
126: 
127: ```typescript
128: // Before
129: import '@anthropic-ai/sdk/error';
130: import '@anthropic-ai/sdk/pagination';
131: import '@anthropic-ai/sdk/resource';
132: import '@anthropic-ai/sdk/streaming';
133: import '@anthropic-ai/sdk/uploads';
134: 
135: // After
136: import '@anthropic-ai/sdk/core/error';
137: import '@anthropic-ai/sdk/core/pagination';
138: import '@anthropic-ai/sdk/core/resource';
139: import '@anthropic-ai/sdk/core/streaming';
140: import '@anthropic-ai/sdk/core/uploads';
141: ```
142: 
143: If you were relying on anything that was only exported from `@anthropic-ai/sdk/core` and is also not accessible anywhere else, please open an issue and we'll consider adding it to the public API.
144: 
145: #### Resource classes
146: 
147: Previously under certain circumstances it was possible to import resource classes like `Completions` directly from the root of the package. This was never valid at the type level and only worked in CommonJS files.
148: Now you must always either reference them as static class properties or import them directly from the files in which they are defined.
149: 
150: ```typescript
151: // Before
152: const { Completions } = require('@anthropic-ai/sdk');
153: 
154: // After
155: const { Anthropic } = require('@anthropic-ai/sdk');
156: Anthropic.Completions; // or import directly from @anthropic-ai/sdk/resources/completions
157: ```
158: 
159: #### Cleaned up `uploads` exports
160: 
161: As part of the `core` refactor, `@anthropic-ai/sdk/uploads` was moved to `@anthropic-ai/sdk/core/uploads`
162: and the following exports were removed, as they were not intended to be a part of the public API:
163: 
164: - `fileFromPath`
165: - `BlobPart`
166: - `BlobLike`
167: - `FileLike`
168: - `ResponseLike`
169: - `isResponseLike`
170: - `isBlobLike`
171: - `isFileLike`
172: - `isUploadable`
173: - `isMultipartBody`
174: - `maybeMultipartFormRequestOptions`
175: - `multipartFormRequestOptions`
176: - `createForm`
177: 
178: Note that `Uploadable` & `toFile` **are** still exported:
179: 
180: ```typescript
181: import { type Uploadable, toFile } from '@anthropic-ai/sdk/core/uploads';
182: ```
183: 
184: #### `APIClient`
185: 
186: The `APIClient` base client class has been replaced with a new `BaseAnthropic` class:
187: 
188: ```typescript
189: // Before
190: import { APIClient } from '@anthropic-ai/sdk/core';
191: 
192: // After
193: import { BaseAnthropic } from '@anthropic-ai/sdk/client';
194: ```
195: 
196: ### File handling
197: 
198: The deprecated `fileFromPath` helper has been removed in favor of native Node.js streams:
199: 
200: ```ts
201: // Before
202: Anthropic.fileFromPath('path/to/file');
203: 
204: // After
205: import fs from 'fs';
206: fs.createReadStream('path/to/file');
207: ```
208: 
209: Note that this function previously only worked on Node.js. If you're using Bun, you can use [`Bun.file`](https://bun.sh/docs/api/file-io) instead.
210: 
211: ### Shims removal
212: 
213: Previously you could configure the types that the SDK used like this:
214: 
215: ```ts
216: // Tell TypeScript and the package to use the global Web fetch instead of node-fetch.
217: import '@anthropic-ai/sdk/shims/web';
218: import Anthropic from '@anthropic-ai/sdk';
219: ```
220: 
221: The `@anthropic-ai/sdk/shims` imports have been removed. Your global types must now be [correctly configured](#minimum-types-requirements).
222: 
223: ### Pagination changes
224: 
225: The `for await` syntax **is not affected**. This still works as-is:
226: 
227: ```ts
228: // Automatically fetches more pages as needed.
229: for await (const betaMessageBatch of client.beta.messages.batches.list()) {
230:   console.log(betaMessageBatch);
231: }
232: ```
233: 
234: The interface for manually paginating through list results has been simplified:
235: 
236: ```ts
237: // Before
238: page.nextPageParams();
239: page.nextPageInfo();
240: // Required manually handling { url } | { params } type
241: 
242: // After
243: page.nextPageRequestOptions();
244: ```
245: 
246: #### Removed unnecessary classes
247: 
248: Page classes for individual methods are now type aliases:
249: 
250: ```ts
251: // Before
252: export class BetaMessageBatchesPage extends Page<BetaMessageBatch> {}
253: 
254: // After
255: export type BetaMessageBatchesPage = Page<BetaMessageBatch>;
256: ```
257: 
258: If you were importing these classes at runtime, you'll need to switch to importing the base class or only import them at the type-level.
259: 
260: ### `@anthropic-ai/sdk/src` directory removed
261: 
262: Previously IDEs may have auto-completed imports from the `@anthropic-ai/sdk/src` directory, however this
263: directory was only included for an improved go-to-definition experience and should not have been used at runtime.
264: 
265: If you have any `@anthropic-ai/sdk/src/*` imports, you will need to replace them with `@anthropic-ai/sdk/*`.
266: 
267: ```ts
268: // Before
269: import Anthropic from '@anthropic-ai/sdk/src';
270: 
271: // After
272: import Anthropic from '@anthropic-ai/sdk';
273: ```
274: 
275: ## TypeScript troubleshooting
276: 
277: When referencing the library after updating, you may encounter new type errors related to JS features like private properties or fetch classes like Request, Response, and Headers.
278: To resolve these issues, configure your tsconfig.json and install the appropriate `@types` packages for your runtime environment using the guidelines below:
279: 
280: ### Browsers
281: 
282: `tsconfig.json`
283: 
284: ```jsonc
285: {
286:   "target": "ES2018", // note: we recommend ES2020 or higher
287:   "lib": ["DOM", "DOM.Iterable", "ES2018"]
288: }
289: ```
290: 
291: ### Node.js
292: 
293: `tsconfig.json`
294: 
295: ```jsonc
296: {
297:   "target": "ES2018" // note: we recommend ES2020 or higher
298: }
299: ```
300: 
301: `package.json`
302: 
303: ```json
304: {
305:   "devDependencies": {
306:     "@types/node": ">= 20"
307:   }
308: }
309: ```
310: 
311: ### Cloudflare Workers
312: 
313: `tsconfig.json`
314: 
315: ```jsonc
316: {
317:   "target": "ES2018", // note: we recommend ES2020 or higher
318:   "lib": ["ES2020"], // <- needed by @cloudflare/workers-types
319:   "types": ["@cloudflare/workers-types"]
320: }
321: ```
322: 
323: `package.json`
324: 
325: ```json
326: {
327:   "devDependencies": {
328:     "@cloudflare/workers-types": ">= 0.20221111.0"
329:   }
330: }
331: ```
332: 
333: ### Bun
334: 
335: `tsconfig.json`
336: 
337: ```jsonc
338: {
339:   "target": "ES2018" // note: we recommend ES2020 or higher
340: }
341: ```
342: 
343: `package.json`
344: 
345: ```json
346: {
347:   "devDependencies": {
348:     "@types/bun": ">= 1.2.0"
349:   }
350: }
351: ```
````

## File: package.json
````json
 1: {
 2:   "name": "@anthropic-ai/sdk",
 3:   "version": "0.52.0",
 4:   "description": "The official TypeScript library for the Anthropic API",
 5:   "author": "Anthropic <support@anthropic.com>",
 6:   "types": "dist/index.d.ts",
 7:   "main": "dist/index.js",
 8:   "type": "commonjs",
 9:   "repository": "github:anthropics/anthropic-sdk-typescript",
10:   "license": "MIT",
11:   "packageManager": "yarn@1.22.22",
12:   "files": [
13:     "**/*"
14:   ],
15:   "private": false,
16:   "scripts": {
17:     "test": "./scripts/test",
18:     "build": "./scripts/build-all",
19:     "prepublishOnly": "echo 'to publish, run yarn build && (cd dist; yarn publish)' && exit 1",
20:     "format": "./scripts/format",
21:     "prepare": "if ./scripts/utils/check-is-in-git-install.sh; then ./scripts/build && ./scripts/utils/git-swap.sh; fi",
22:     "tsn": "ts-node -r tsconfig-paths/register",
23:     "lint": "./scripts/lint",
24:     "fix": "./scripts/format"
25:   },
26:   "dependencies": {},
27:   "devDependencies": {
28:     "@arethetypeswrong/cli": "^0.17.0",
29:     "@swc/core": "^1.3.102",
30:     "@swc/jest": "^0.2.29",
31:     "@types/jest": "^29.4.0",
32:     "@types/node": "^20.17.6",
33:     "typescript-eslint": "8.31.1",
34:     "@typescript-eslint/eslint-plugin": "8.31.1",
35:     "@typescript-eslint/parser": "8.31.1",
36:     "eslint": "^9.20.1",
37:     "eslint-plugin-prettier": "^5.2.3",
38:     "eslint-plugin-unused-imports": "^4.1.4",
39:     "iconv-lite": "^0.6.3",
40:     "jest": "^29.4.0",
41:     "prettier": "^3.0.0",
42:     "publint": "^0.2.12",
43:     "ts-jest": "^29.1.0",
44:     "ts-node": "^10.5.0",
45:     "tsc-multi": "https://github.com/stainless-api/tsc-multi/releases/download/v1.1.4/tsc-multi-1.1.4.tgz",
46:     "tsconfig-paths": "^4.0.0",
47:     "typescript": "5.8.3"
48:   },
49:   "resolutions": {
50:     "synckit": "0.8.8"
51:   },
52:   "imports": {
53:     "@anthropic-ai/sdk": ".",
54:     "@anthropic-ai/sdk/*": "./src/*"
55:   },
56:   "bin": {
57:     "anthropic-ai-sdk": "bin/cli"
58:   },
59:   "exports": {
60:     ".": {
61:       "import": "./dist/index.mjs",
62:       "require": "./dist/index.js"
63:     },
64:     "./*.mjs": {
65:       "default": "./dist/*.mjs"
66:     },
67:     "./*.js": {
68:       "default": "./dist/*.js"
69:     },
70:     "./*": {
71:       "import": "./dist/*.mjs",
72:       "require": "./dist/*.js"
73:     }
74:   }
75: }
````

## File: README.md
````markdown
  1: # Anthropic TypeScript API Library
  2: 
  3: [![NPM version](https://img.shields.io/npm/v/@anthropic-ai/sdk.svg)](https://npmjs.org/package/@anthropic-ai/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@anthropic-ai/sdk)
  4: 
  5: This library provides convenient access to the Anthropic REST API from server-side TypeScript or JavaScript.
  6: 
  7: The REST API documentation can be found on [docs.anthropic.com](https://docs.anthropic.com/claude/reference/). The full API of this library can be found in [api.md](api.md).
  8: 
  9: ## Installation
 10: 
 11: ```sh
 12: npm install @anthropic-ai/sdk
 13: ```
 14: 
 15: ## Usage
 16: 
 17: The full API of this library can be found in [api.md](api.md).
 18: 
 19: <!-- prettier-ignore -->
 20: ```js
 21: import Anthropic from '@anthropic-ai/sdk';
 22: 
 23: const client = new Anthropic({
 24:   apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
 25: });
 26: 
 27: async function main() {
 28:   const message = await client.messages.create({
 29:     max_tokens: 1024,
 30:     messages: [{ role: 'user', content: 'Hello, Claude' }],
 31:     model: 'claude-3-5-sonnet-latest',
 32:   });
 33: 
 34:   console.log(message.content);
 35: }
 36: 
 37: main();
 38: ```
 39: 
 40: ## Streaming responses
 41: 
 42: We provide support for streaming responses using Server Sent Events (SSE).
 43: 
 44: ```ts
 45: import Anthropic from '@anthropic-ai/sdk';
 46: 
 47: const client = new Anthropic();
 48: 
 49: const stream = await client.messages.create({
 50:   max_tokens: 1024,
 51:   messages: [{ role: 'user', content: 'Hello, Claude' }],
 52:   model: 'claude-3-5-sonnet-latest',
 53:   stream: true,
 54: });
 55: for await (const messageStreamEvent of stream) {
 56:   console.log(messageStreamEvent.type);
 57: }
 58: ```
 59: 
 60: If you need to cancel a stream, you can `break` from the loop
 61: or call `stream.controller.abort()`.
 62: 
 63: ### Request & Response types
 64: 
 65: This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:
 66: 
 67: <!-- prettier-ignore -->
 68: ```ts
 69: import Anthropic from '@anthropic-ai/sdk';
 70: 
 71: const client = new Anthropic({
 72:   apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
 73: });
 74: 
 75: async function main() {
 76:   const params: Anthropic.MessageCreateParams = {
 77:     max_tokens: 1024,
 78:     messages: [{ role: 'user', content: 'Hello, Claude' }],
 79:     model: 'claude-3-5-sonnet-latest',
 80:   };
 81:   const message: Anthropic.Message = await client.messages.create(params);
 82: }
 83: 
 84: main();
 85: ```
 86: 
 87: Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.
 88: 
 89: ## Counting Tokens
 90: 
 91: You can see the exact usage for a given request through the `usage` response property, e.g.
 92: 
 93: ```ts
 94: const message = await client.messages.create(...)
 95: console.log(message.usage)
 96: // { input_tokens: 25, output_tokens: 13 }
 97: ```
 98: 
 99: ## Streaming Helpers
100: 
101: This library provides several conveniences for streaming messages, for example:
102: 
103: ```ts
104: import Anthropic from '@anthropic-ai/sdk';
105: 
106: const anthropic = new Anthropic();
107: 
108: async function main() {
109:   const stream = anthropic.messages
110:     .stream({
111:       model: 'claude-3-5-sonnet-latest',
112:       max_tokens: 1024,
113:       messages: [
114:         {
115:           role: 'user',
116:           content: 'Say hello there!',
117:         },
118:       ],
119:     })
120:     .on('text', (text) => {
121:       console.log(text);
122:     });
123: 
124:   const message = await stream.finalMessage();
125:   console.log(message);
126: }
127: 
128: main();
129: ```
130: 
131: Streaming with `client.messages.stream(...)` exposes [various helpers for your convenience](helpers.md) including event handlers and accumulation.
132: 
133: Alternatively, you can use `client.messages.create({ ..., stream: true })` which only returns an async iterable of the events in the stream and thus uses less memory (it does not build up a final message object for you).
134: 
135: ## Message Batches
136: 
137: This SDK provides beta support for the [Message Batches API](https://docs.anthropic.com/en/docs/build-with-claude/message-batches) under the `client.beta.messages.batches` namespace.
138: 
139: ### Creating a batch
140: 
141: Message Batches takes an array of requests, where each object has a `custom_id` identifier, and the exact same request `params` as the standard Messages API:
142: 
143: ```ts
144: await anthropic.beta.messages.batches.create({
145:   requests: [
146:     {
147:       custom_id: 'my-first-request',
148:       params: {
149:         model: 'claude-3-5-sonnet-latest',
150:         max_tokens: 1024,
151:         messages: [{ role: 'user', content: 'Hello, world' }],
152:       },
153:     },
154:     {
155:       custom_id: 'my-second-request',
156:       params: {
157:         model: 'claude-3-5-sonnet-latest',
158:         max_tokens: 1024,
159:         messages: [{ role: 'user', content: 'Hi again, friend' }],
160:       },
161:     },
162:   ],
163: });
164: ```
165: 
166: ### Getting results from a batch
167: 
168: Once a Message Batch has been processed, indicated by `.processing_status === 'ended'`, you can access the results with `.batches.results()`
169: 
170: ```ts
171: const results = await anthropic.beta.messages.batches.results(batch_id);
172: for await (const entry of results) {
173:   if (entry.result.type === 'succeeded') {
174:     console.log(entry.result.message.content);
175:   }
176: }
177: ```
178: 
179: ## Tool use
180: 
181: This SDK provides support for tool use, aka function calling. More details can be found in [the documentation](https://docs.anthropic.com/claude/docs/tool-use).
182: 
183: ## AWS Bedrock
184: 
185: We provide support for the [Anthropic Bedrock API](https://aws.amazon.com/bedrock/claude/) through a [separate package](https://github.com/anthropics/anthropic-sdk-typescript/tree/main/packages/bedrock-sdk).
186: 
187: ## File uploads
188: 
189: Request parameters that correspond to file uploads can be passed in many different forms:
190: 
191: - `File` (or an object with the same structure)
192: - a `fetch` `Response` (or an object with the same structure)
193: - an `fs.ReadStream`
194: - the return value of our `toFile` helper
195: 
196: Note that we recommend you set the content-type explicitly as the files API will not infer it for you:
197: 
198: ```ts
199: import fs from 'fs';
200: import Anthropic, { toFile } from '@anthropic-ai/sdk';
201: 
202: const client = new Anthropic();
203: 
204: // If you have access to Node `fs` we recommend using `fs.createReadStream()`:
205: await client.beta.files.upload({
206:   file: await toFile(fs.createReadStream('/path/to/file'), undefined, { type: 'application/json' }),
207:   betas: ['files-api-2025-04-14'],
208: });
209: 
210: // Or if you have the web `File` API you can pass a `File` instance:
211: await client.beta.files.upload({
212:   file: new File(['my bytes'], 'file.txt', { type: 'text/plain' }),
213:   betas: ['files-api-2025-04-14'],
214: });
215: // You can also pass a `fetch` `Response`:
216: await client.beta.files.upload({
217:   file: await fetch('https://somesite/file'),
218:   betas: ['files-api-2025-04-14'],
219: });
220: 
221: // Or a `Buffer` / `Uint8Array`
222: await client.beta.files.upload({
223:   file: await toFile(Buffer.from('my bytes'), 'file', { type: 'text/plain' }),
224:   betas: ['files-api-2025-04-14'],
225: });
226: await client.beta.files.upload({
227:   file: await toFile(new Uint8Array([0, 1, 2]), 'file', { type: 'text/plain' }),
228:   betas: ['files-api-2025-04-14'],
229: });
230: ```
231: 
232: ## Handling errors
233: 
234: When the library is unable to connect to the API,
235: or if the API returns a non-success status code (i.e., 4xx or 5xx response),
236: a subclass of `APIError` will be thrown:
237: 
238: <!-- prettier-ignore -->
239: ```ts
240: async function main() {
241:   const message = await client.messages
242:     .create({
243:       max_tokens: 1024,
244:       messages: [{ role: 'user', content: 'Hello, Claude' }],
245:       model: 'claude-3-5-sonnet-latest',
246:     })
247:     .catch(async (err) => {
248:       if (err instanceof Anthropic.APIError) {
249:         console.log(err.status); // 400
250:         console.log(err.name); // BadRequestError
251:         console.log(err.headers); // {server: 'nginx', ...}
252:       } else {
253:         throw err;
254:       }
255:     });
256: }
257: 
258: main();
259: ```
260: 
261: Error codes are as follows:
262: 
263: | Status Code | Error Type                 |
264: | ----------- | -------------------------- |
265: | 400         | `BadRequestError`          |
266: | 401         | `AuthenticationError`      |
267: | 403         | `PermissionDeniedError`    |
268: | 404         | `NotFoundError`            |
269: | 422         | `UnprocessableEntityError` |
270: | 429         | `RateLimitError`           |
271: | >=500       | `InternalServerError`      |
272: | N/A         | `APIConnectionError`       |
273: 
274: ## Request IDs
275: 
276: > For more information on debugging requests, see [these docs](https://docs.anthropic.com/en/api/errors#request-id)
277: 
278: All object responses in the SDK provide a `_request_id` property which is added from the `request-id` response header so that you can quickly log failing requests and report them back to Anthropic.
279: 
280: ```ts
281: const message = await client.messages.create({
282:   max_tokens: 1024,
283:   messages: [{ role: 'user', content: 'Hello, Claude' }],
284:   model: 'claude-3-5-sonnet-latest',
285: });
286: console.log(message._request_id); // req_018EeWyXxfu5pfWkrYcMdjWG
287: ```
288: 
289: ### Retries
290: 
291: Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
292: Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
293: 429 Rate Limit, and >=500 Internal errors will all be retried by default.
294: 
295: You can use the `maxRetries` option to configure or disable this:
296: 
297: <!-- prettier-ignore -->
298: ```js
299: // Configure the default for all requests:
300: const client = new Anthropic({
301:   maxRetries: 0, // default is 2
302: });
303: 
304: // Or, configure per-request:
305: await client.messages.create({ max_tokens: 1024, messages: [{ role: 'user', content: 'Hello, Claude' }], model: 'claude-3-5-sonnet-latest' }, {
306:   maxRetries: 5,
307: });
308: ```
309: 
310: ### Timeouts
311: 
312: By default requests time out after 10 minutes. However if you have specified a large `max_tokens` value and are
313: _not_ streaming, the default timeout will be calculated dynamically using the formula:
314: 
315: ```typescript
316: const minimum = 10 * 60;
317: const calculated = (60 * 60 * maxTokens) / 128_000;
318: return calculated < minimum ? minimum * 1000 : calculated * 1000;
319: ```
320: 
321: which will result in a timeout up to 60 minutes, scaled by the `max_tokens` parameter, unless overriden at the request or client level.
322: 
323: You can configure this with a `timeout` option:
324: 
325: <!-- prettier-ignore -->
326: ```ts
327: // Configure the default for all requests:
328: const client = new Anthropic({
329:   timeout: 20 * 1000, // 20 seconds (default is 10 minutes)
330: });
331: 
332: // Override per-request:
333: await client.messages.create({ max_tokens: 1024, messages: [{ role: 'user', content: 'Hello, Claude' }], model: 'claude-3-5-sonnet-latest' }, {
334:   timeout: 5 * 1000,
335: });
336: ```
337: 
338: On timeout, an `APIConnectionTimeoutError` is thrown.
339: 
340: Note that requests which time out will be [retried twice by default](#retries).
341: 
342: ### Long Requests
343: 
344: > [!IMPORTANT]
345: > We highly encourage you use the streaming [Messages API](#streaming-responses) for longer running requests.
346: 
347: We do not recommend setting a large `max_tokens` values without using streaming.
348: Some networks may drop idle connections after a certain period of time, which
349: can cause the request to fail or [timeout](#timeouts) without receiving a response from Anthropic.
350: 
351: This SDK will also throw an error if a non-streaming request is expected to be above roughly 10 minutes long.
352: Passing `stream: true` or [overriding](#timeouts) the `timeout` option at the client or request level disables this error.
353: 
354: An expected request latency longer than the [timeout](#timeouts) for a non-streaming request
355: will result in the client terminating the connection and retrying without receiving a response.
356: 
357: When supported by the `fetch` implementation, we set a [TCP socket keep-alive](https://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) option in order
358: to reduce the impact of idle connection timeouts on some networks.
359: This can be [overriden](#configuring-an-https-agent-eg-for-proxies) by configuring a custom proxy.
360: 
361: ## Auto-pagination
362: 
363: List methods in the Anthropic API are paginated.
364: You can use the `for await … of` syntax to iterate through items across all pages:
365: 
366: ```ts
367: async function fetchAllBetaMessagesBatches(params) {
368:   const allBetaMessagesBatches = [];
369:   // Automatically fetches more pages as needed.
370:   for await (const betaMessageBatch of client.beta.messages.batches.list({ limit: 20 })) {
371:     allBetaMessagesBatches.push(betaMessageBatch);
372:   }
373:   return allBetaMessagesBatches;
374: }
375: ```
376: 
377: Alternatively, you can request a single page at a time:
378: 
379: ```ts
380: let page = await client.beta.messages.batches.list({ limit: 20 });
381: for (const betaMessageBatch of page.data) {
382:   console.log(betaMessageBatch);
383: }
384: 
385: // Convenience methods are provided for manually paginating:
386: while (page.hasNextPage()) {
387:   page = await page.getNextPage();
388:   // ...
389: }
390: ```
391: 
392: ## Default Headers
393: 
394: We automatically send the `anthropic-version` header set to `2023-06-01`.
395: 
396: If you need to, you can override it by setting default headers on a per-request basis.
397: 
398: Be aware that doing so may result in incorrect types and other unexpected or undefined behavior in the SDK.
399: 
400: ```ts
401: import Anthropic from '@anthropic-ai/sdk';
402: 
403: const client = new Anthropic();
404: 
405: const message = await client.messages.create(
406:   {
407:     max_tokens: 1024,
408:     messages: [{ role: 'user', content: 'Hello, Claude' }],
409:     model: 'claude-3-5-sonnet-latest',
410:   },
411:   { headers: { 'anthropic-version': 'My-Custom-Value' } },
412: );
413: ```
414: 
415: ## Advanced Usage
416: 
417: ### Accessing raw Response data (e.g., headers)
418: 
419: The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
420: This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.
421: 
422: You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
423: Unlike `.asResponse()` this method consumes the body, returning once it is parsed.
424: 
425: <!-- prettier-ignore -->
426: ```ts
427: const client = new Anthropic();
428: 
429: const response = await client.messages
430:   .create({
431:     max_tokens: 1024,
432:     messages: [{ role: 'user', content: 'Hello, Claude' }],
433:     model: 'claude-3-5-sonnet-latest',
434:   })
435:   .asResponse();
436: console.log(response.headers.get('X-My-Header'));
437: console.log(response.statusText); // access the underlying Response object
438: 
439: const { data: message, response: raw } = await client.messages
440:   .create({
441:     max_tokens: 1024,
442:     messages: [{ role: 'user', content: 'Hello, Claude' }],
443:     model: 'claude-3-5-sonnet-latest',
444:   })
445:   .withResponse();
446: console.log(raw.headers.get('X-My-Header'));
447: console.log(message.content);
448: ```
449: 
450: ### Logging
451: 
452: > [!IMPORTANT]
453: > All log messages are intended for debugging only. The format and content of log messages
454: > may change between releases.
455: 
456: #### Log levels
457: 
458: The log level can be configured in two ways:
459: 
460: 1. Via the `ANTHROPIC_LOG` environment variable
461: 2. Using the `logLevel` client option (overrides the environment variable if set)
462: 
463: ```ts
464: import Anthropic from '@anthropic-ai/sdk';
465: 
466: const client = new Anthropic({
467:   logLevel: 'debug', // Show all log messages
468: });
469: ```
470: 
471: Available log levels, from most to least verbose:
472: 
473: - `'debug'` - Show debug messages, info, warnings, and errors
474: - `'info'` - Show info messages, warnings, and errors
475: - `'warn'` - Show warnings and errors (default)
476: - `'error'` - Show only errors
477: - `'off'` - Disable all logging
478: 
479: At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
480: Some authentication-related headers are redacted, but sensitive data in request and response bodies
481: may still be visible.
482: 
483: #### Custom logger
484: 
485: By default, this library logs to `globalThis.console`. You can also provide a custom logger.
486: Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.
487: 
488: When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
489: below the configured level will not be sent to your logger.
490: 
491: ```ts
492: import Anthropic from '@anthropic-ai/sdk';
493: import pino from 'pino';
494: 
495: const logger = pino();
496: 
497: const client = new Anthropic({
498:   logger: logger.child({ name: 'Anthropic' }),
499:   logLevel: 'debug', // Send all messages to pino, allowing it to filter
500: });
501: ```
502: 
503: ### Making custom/undocumented requests
504: 
505: This library is typed for convenient access to the documented API. If you need to access undocumented
506: endpoints, params, or response properties, the library can still be used.
507: 
508: #### Undocumented endpoints
509: 
510: To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
511: Options on the client, such as retries, will be respected when making these requests.
512: 
513: ```ts
514: await client.post('/some/path', {
515:   body: { some_prop: 'foo' },
516:   query: { some_query_arg: 'bar' },
517: });
518: ```
519: 
520: #### Undocumented request params
521: 
522: To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
523: parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
524: send will be sent as-is.
525: 
526: ```ts
527: client.foo.create({
528:   foo: 'my_param',
529:   bar: 12,
530:   // @ts-expect-error baz is not yet public
531:   baz: 'undocumented option',
532: });
533: ```
534: 
535: For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
536: extra param in the body.
537: 
538: If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
539: options.
540: 
541: #### Undocumented response properties
542: 
543: To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
544: the response object, or cast the response object to the requisite type. Like the request params, we do not
545: validate or strip extra properties from the response from the API.
546: 
547: ### Customizing the fetch client
548: 
549: By default, this library expects a global `fetch` function is defined.
550: 
551: If you want to use a different `fetch` function, you can either polyfill the global:
552: 
553: ```ts
554: import fetch from 'my-fetch';
555: 
556: globalThis.fetch = fetch;
557: ```
558: 
559: Or pass it to the client:
560: 
561: ```ts
562: import Anthropic from '@anthropic-ai/sdk';
563: import fetch from 'my-fetch';
564: 
565: const client = new Anthropic({ fetch });
566: ```
567: 
568: ### Fetch options
569: 
570: If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)
571: 
572: ```ts
573: import Anthropic from '@anthropic-ai/sdk';
574: 
575: const client = new Anthropic({
576:   fetchOptions: {
577:     // `RequestInit` options
578:   },
579: });
580: ```
581: 
582: #### Configuring proxies
583: 
584: To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
585: options to requests:
586: 
587: <img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>
588: 
589: ```ts
590: import Anthropic from '@anthropic-ai/sdk';
591: import * as undici from 'undici';
592: 
593: const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
594: const client = new Anthropic({
595:   fetchOptions: {
596:     dispatcher: proxyAgent,
597:   },
598: });
599: ```
600: 
601: <img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>
602: 
603: ```ts
604: import Anthropic from '@anthropic-ai/sdk';
605: 
606: const client = new Anthropic({
607:   fetchOptions: {
608:     proxy: 'http://localhost:8888',
609:   },
610: });
611: ```
612: 
613: <img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>
614: 
615: ```ts
616: import Anthropic from 'npm:@anthropic-ai/sdk';
617: 
618: const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
619: const client = new Anthropic({
620:   fetchOptions: {
621:     client: httpClient,
622:   },
623: });
624: ```
625: 
626: ## Frequently Asked Questions
627: 
628: ## Semantic versioning
629: 
630: This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:
631: 
632: 1. Changes that only affect static types, without breaking runtime behavior.
633: 2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
634: 3. Changes that we do not expect to impact the vast majority of users in practice.
635: 
636: We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.
637: 
638: We are keen for your feedback; please open an [issue](https://www.github.com/anthropics/anthropic-sdk-typescript/issues) with questions, bugs, or suggestions.
639: 
640: ## Requirements
641: 
642: TypeScript >= 4.9 is supported.
643: 
644: The following runtimes are supported:
645: 
646: - Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
647: - Deno v1.28.0 or higher.
648: - Bun 1.0 or later.
649: - Cloudflare Workers.
650: - Vercel Edge Runtime.
651: - Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
652: - Nitro v2.6 or greater.
653: - Web browsers: disabled by default to avoid exposing your secret API credentials (see our help center for [best practices](https://support.anthropic.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure)). Enable browser support by explicitly setting `dangerouslyAllowBrowser` to `true`.
654: 
655: <details>
656:   <summary><b>More explanation</b></summary>
657:   <h3>Why is this dangerous?</h3>
658:   Enabling the <code>dangerouslyAllowBrowser</code> option can be dangerous because it exposes your secret API credentials in the client-side code. Web browsers are inherently less secure than server environments,
659:   any user with access to the browser can potentially inspect, extract, and misuse these credentials. This could lead to unauthorized access using your credentials and potentially compromise sensitive data or functionality.
660:   <h3>When might this not be dangerous?</h3>
661:   In certain scenarios where enabling browser support might not pose significant risks:
662:   <ul>
663:     <li>Internal Tools: If the application is used solely within a controlled internal environment where the users are trusted, the risk of credential exposure can be mitigated.</li>
664:     <li>Development or debugging purpose: Enabling this feature temporarily might be acceptable, provided the credentials are short-lived, aren't also used in production environments, or are frequently rotated.</li>
665:   </ul>
666: </details>
667: 
668: Note that React Native is not supported at this time.
669: 
670: If you are interested in other runtime environments, please open or upvote an issue on GitHub.
671: 
672: ## Contributing
673: 
674: See [the contributing documentation](./CONTRIBUTING.md).
````

## File: release-please-config.json
````json
 1: {
 2:   "packages": {
 3:     ".": {},
 4:     "packages/vertex-sdk": {},
 5:     "packages/bedrock-sdk": {}
 6:   },
 7:   "$schema": "https://raw.githubusercontent.com/stainless-api/release-please/main/schemas/config.json",
 8:   "include-v-in-tag": true,
 9:   "include-component-in-tag": true,
10:   "versioning": "prerelease",
11:   "prerelease": true,
12:   "bump-minor-pre-major": true,
13:   "bump-patch-for-minor-pre-major": false,
14:   "pull-request-header": "Automated Release PR",
15:   "pull-request-title-pattern": "release: ${version}",
16:   "changelog-sections": [
17:     {
18:       "type": "feat",
19:       "section": "Features"
20:     },
21:     {
22:       "type": "fix",
23:       "section": "Bug Fixes"
24:     },
25:     {
26:       "type": "perf",
27:       "section": "Performance Improvements"
28:     },
29:     {
30:       "type": "revert",
31:       "section": "Reverts"
32:     },
33:     {
34:       "type": "chore",
35:       "section": "Chores"
36:     },
37:     {
38:       "type": "docs",
39:       "section": "Documentation"
40:     },
41:     {
42:       "type": "style",
43:       "section": "Styles"
44:     },
45:     {
46:       "type": "refactor",
47:       "section": "Refactors"
48:     },
49:     {
50:       "type": "test",
51:       "section": "Tests",
52:       "hidden": true
53:     },
54:     {
55:       "type": "build",
56:       "section": "Build System"
57:     },
58:     {
59:       "type": "ci",
60:       "section": "Continuous Integration",
61:       "hidden": true
62:     }
63:   ],
64:   "release-type": "node",
65:   "extra-files": [
66:     "src/version.ts",
67:     "README.md",
68:     "packages/vertex-sdk/yarn.lock",
69:     "packages/bedrock-sdk/yarn.lock"
70:   ]
71: }
````

## File: SECURITY.md
````markdown
 1: # Security Policy
 2: 
 3: ## Reporting Security Issues
 4: 
 5: This SDK is generated by [Stainless Software Inc](http://stainless.com). Stainless takes security seriously, and encourages you to report any security vulnerability promptly so that appropriate action can be taken.
 6: 
 7: To report a security issue, please contact the Stainless team at security@stainless.com.
 8: 
 9: ## Responsible Disclosure
10: 
11: We appreciate the efforts of security researchers and individuals who help us maintain the security of
12: SDKs we generate. If you believe you have found a security vulnerability, please adhere to responsible
13: disclosure practices by allowing us a reasonable amount of time to investigate and address the issue
14: before making any information public.
15: 
16: ## Reporting Non-SDK Related Security Issues
17: 
18: If you encounter security issues that are not directly related to SDKs but pertain to the services
19: or products provided by Anthropic, please follow the respective company's security reporting guidelines.
20: 
21: ### Anthropic Terms and Policies
22: 
23: Please contact support@anthropic.com for any questions or concerns regarding the security of our services.
24: 
25: ---
26: 
27: Thank you for helping us keep the SDKs and systems they interact with secure.
````

## File: tsc-multi.json
````json
1: {
2:   "targets": [
3:     { "extname": ".js", "module": "commonjs", "shareHelpers": "internal/tslib.js" },
4:     { "extname": ".mjs", "module": "esnext", "shareHelpers": "internal/tslib.mjs" }
5:   ],
6:   "projects": ["tsconfig.build.json"]
7: }
````

## File: tsconfig.build.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["dist/src"],
 4:   "exclude": [],
 5:   "compilerOptions": {
 6:     "rootDir": "./dist/src",
 7:     "paths": {
 8:       "@anthropic-ai/sdk/*": ["dist/src/*"],
 9:       "@anthropic-ai/sdk": ["dist/src/index.ts"]
10:     },
11:     "noEmit": false,
12:     "declaration": true,
13:     "declarationMap": true,
14:     "outDir": "dist",
15:     "pretty": true,
16:     "sourceMap": true
17:   }
18: }
````

## File: tsconfig.deno.json
````json
 1: {
 2:   "extends": "./tsconfig.json",
 3:   "include": ["dist-deno"],
 4:   "exclude": [],
 5:   "compilerOptions": {
 6:     "rootDir": "./dist-deno",
 7:     "lib": ["es2020", "DOM"],
 8:     "noEmit": true,
 9:     "declaration": true,
10:     "declarationMap": true,
11:     "outDir": "dist-deno",
12:     "pretty": true,
13:     "sourceMap": true
14:   }
15: }
````

## File: tsconfig.dist-src.json
````json
 1: {
 2:   // this config is included in the published src directory to prevent TS errors
 3:   // from appearing when users go to source, and VSCode opens the source .ts file
 4:   // via declaration maps
 5:   "include": ["index.ts"],
 6:   "compilerOptions": {
 7:     "target": "ES2015",
 8:     "lib": ["DOM", "DOM.Iterable", "ES2018"],
 9:     "moduleResolution": "node"
10:   }
11: }
````

## File: tsconfig.json
````json
 1: {
 2:   "include": ["src", "tests", "examples"],
 3:   "exclude": [],
 4:   "compilerOptions": {
 5:     "target": "es2020",
 6:     "lib": ["es2020"],
 7:     "module": "commonjs",
 8:     "moduleResolution": "node",
 9:     "esModuleInterop": true,
10:     "baseUrl": "./",
11:     "paths": {
12:       "@anthropic-ai/sdk/*": ["src/*"],
13:       "@anthropic-ai/sdk": ["src/index.ts"]
14:     },
15:     "noEmit": true,
16: 
17:     "resolveJsonModule": true,
18: 
19:     "forceConsistentCasingInFileNames": true,
20: 
21:     "strict": true,
22:     "noImplicitAny": true,
23:     "strictNullChecks": true,
24:     "strictFunctionTypes": true,
25:     "strictBindCallApply": true,
26:     "strictPropertyInitialization": true,
27:     "noImplicitThis": true,
28:     "noImplicitReturns": true,
29:     "alwaysStrict": true,
30:     "exactOptionalPropertyTypes": true,
31:     "noUncheckedIndexedAccess": true,
32:     "noImplicitOverride": true,
33:     "noPropertyAccessFromIndexSignature": true,
34:     "isolatedModules": false,
35: 
36:     "skipLibCheck": true
37:   }
38: }
````
