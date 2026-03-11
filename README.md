# eslint-config-ai-guardrails

> Strict, AI-friendly ESLint config for teams that value type safety and functional programming

[![npm version](https://img.shields.io/npm/v/eslint-config-ai-guardrails)](https://www.npmjs.com/package/eslint-config-ai-guardrails) [![license](https://img.shields.io/npm/l/eslint-config-ai-guardrails)](LICENSE)

## Quick Start

**Copy-paste this** into `eslint.config.mjs`:

```js
import aiGuardrails from 'eslint-config-ai-guardrails';

// Includes all presets (recommended + typescript + functional)
// Remove typescript/functional lines if you don't need them
export default [
  {
    files: ['**/*.{ts,tsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.typescript.rules,      // Optional: remove if not using TS
      ...aiGuardrails.config.functional.rules,      // Optional: remove if not using FP
    },
  },
  aiGuardrails.prettier,
];
```

[Installation](#installation) · [Presets](#presets) · [Examples](#framework-examples) · [Troubleshooting](#troubleshooting)

## Installation

```bash
npm install -D eslint-config-ai-guardrails
```

**Peer dependencies** (install if you don't have them):

```bash
npm install -D eslint prettier typescript \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-import eslint-plugin-unicorn \
  eslint-plugin-security eslint-plugin-sonarjs \
  eslint-plugin-functional eslint-plugin-canonical \
  eslint-plugin-prefer-arrow-functions eslint-plugin-no-comments \
  eslint-config-prettier eslint-plugin-prettier @eslint/compat
```

## Presets

Choose your strictness:

| Preset | Best For | Quick Start |
|--------|----------|-------------|
| `recommended` | Most projects | `...aiGuardrails.config.recommended` |
| `typescript` | TypeScript codebases | `...aiGuardrails.config.typescript` |
| `functional` | FP-only codebases | `...aiGuardrails.config.functional` |

### Test File Overrides

Test files often need relaxed rules (e.g., longer functions, more parameters). The `testOverrides` rule set disables strict complexity and functional rules for test files while keeping type safety.

```js
{
  files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
  rules: aiGuardrails.rules.testOverrides,
}
```

## Configuration

### File Patterns

Control which files each config applies to:

```js
{
  files: ['**/*.{ts,tsx}'],  // Your pattern here
  ...aiGuardrails.config.recommended,
}
```

Common patterns:
- Source files: `['**/*.{ts,tsx}']`
- TypeScript only: `['**/*.ts', '**/*.tsx']`
- Tests: `['**/*.test.{ts,tsx}', '**/__tests__/**']`

### Ignore Patterns

```js
{ ignores: ['dist/**', 'coverage/**', '.next/**', '*.generated.ts'] }
```

### Custom TypeScript Config

```js
{
  files: ['**/*.ts', '**/*.tsx'],
  ...aiGuardrails.create.typescript({ tsconfigPath: './tsconfig.build.json' }),
}
```

## What's Included

### `recommended`
- Prettier integration
- Import ordering & deduplication
- Complexity limits (50 lines/function, 250 lines/file)
- Security & code quality (SonarJS)
- No comments policy
- Arrow functions preferred
- Early returns enforced

### `typescript`
- Strict type safety (`no-unsafe-*`, `no-any`)
- Naming conventions (camelCase, PascalCase)
- Nullish coalescing preference
- No non-null assertions

### `functional` ⭐
- No `let` declarations
- No classes or inheritance
- No `this` expressions
- No loops (use `map`, `filter`, `reduce`)

## Framework Examples

### Next.js

```js
import nextPlugin from '@next/eslint-plugin-next';
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.typescript.rules,
      ...aiGuardrails.config.functional.rules,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: aiGuardrails.rules.testOverrides,
  },
  aiGuardrails.prettier,
  { ignores: ['.next/**', 'next-env.d.ts', 'dist/**'] },
];
```

### Vite + React

```js
import aiGuardrails from 'eslint-config-ai-guardrails';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.typescript.rules,
    },
  },
  aiGuardrails.prettier,
  { ignores: ['dist/**', 'node_modules/**'] },
];
```

## Troubleshooting

### "Prettier must be last"

`eslint-config-prettier` disables formatting rules that conflict with Prettier. In ESLint flat config, later entries override earlier ones.

```js
// ❌ Wrong - prettier first
export default [
  aiGuardrails.prettier,
  { files: ['**/*.ts'], ...aiGuardrails.config.recommended },
];

// ✅ Correct - prettier last
export default [
  { files: ['**/*.ts'], ...aiGuardrails.config.recommended },
  aiGuardrails.prettier,
];
```

### Functional rules blocking React components

React uses classes and `this`. Either exclude React files or disable specific rules:

```js
{
  files: ['**/components/**/*.tsx'],
  rules: {
    'functional/no-class-inheritance': 'off',
    'functional/no-this-expression': 'off',
  },
}
```

### TypeScript not detecting your tsconfig

```js
{
  files: ['**/*.ts'],
  ...aiGuardrails.create.typescript({
    tsconfigPath: './tsconfig.app.json',
  }),
}
```

## Prettier Options

| Option | Value |
|--------|-------|
| `printWidth` | 120 |
| `tabWidth` | 2 |
| `semi` | true |
| `singleQuote` | true |
| `trailingComma` | "es5" |

### With Prettier Plugins

Create `.prettierrc`:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Override Options

```js
{
  files: ['**/*.{ts,tsx}'],
  ...aiGuardrails.config.recommended,
  rules: {
    ...aiGuardrails.config.recommended.rules,
    'prettier/prettier': ['error', { printWidth: 80 }],
  },
}
```

## Advanced Usage

Access individual rule sets:

```js
aiGuardrails.rules.base          // Base rules (prettier, arrow functions, etc.)
aiGuardrails.rules.functional    // Functional programming rules
aiGuardrails.rules.imports       // Import ordering rules
aiGuardrails.rules.comments      // No comments policy
aiGuardrails.rules.restrictions  // No else, no IIFE
aiGuardrails.rules.complexity    // Max lines, depth, params
aiGuardrails.rules.security      // Security plugin rules
aiGuardrails.rules.sonarjs       // SonarJS rules
aiGuardrails.rules.reExports     // Canonical re-export rules
aiGuardrails.rules.testOverrides // Relaxations for test files
```

## License

MIT
