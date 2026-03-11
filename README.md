# eslint-config-ai-guardrails

Strict, AI-friendly ESLint config with functional programming and TypeScript guardrails.

## Installation

```bash
npm install -D eslint-config-ai-guardrails
```

### Peer Dependencies

```bash
npm install -D \
  eslint \
  prettier \
  typescript \
  @eslint/compat \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-prettier \
  eslint-plugin-canonical \
  eslint-plugin-functional \
  eslint-plugin-import \
  eslint-plugin-no-comments \
  eslint-plugin-prefer-arrow-functions \
  eslint-plugin-prettier \
  eslint-plugin-security \
  eslint-plugin-sonarjs \
  eslint-plugin-unicorn
```

## Quick Start

Copy this to your `eslint.config.mjs`:

```js
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...aiGuardrails.config.recommended,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...aiGuardrails.config.typescript,
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: aiGuardrails.rules.testOverrides,
  },
  aiGuardrails.prettier,
  { ignores: ['dist/**', 'node_modules/**'] },
];
```

**Important:** `aiGuardrails.prettier` must be last.

## Configuration

### File Patterns

You control which files each config applies to:

```js
{
  files: ['**/*.{ts,tsx,js,jsx}'],  // Your pattern here
  ...aiGuardrails.config.recommended,
}
```

Common patterns:
- Source files: `['**/*.{ts,tsx,js,jsx}']`
- TypeScript only: `['**/*.ts', '**/*.tsx']`
- Tests: `['**/*.test.{ts,tsx}', '**/__tests__/**']` or `['**/*.spec.{ts,tsx}', '**/test/**']`

### Ignore Patterns

Add your project-specific ignores:

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

## Presets

| Preset | Description |
|--------|-------------|
| `recommended` | Base rules: prettier, unicorn, imports, complexity, security, sonarjs, comments |
| `typescript` | Type safety: `no-unsafe-*`, `no-any`, naming conventions |
| `functional` | FP strictness: `no-let`, `no-classes`, `no-this`, `no-loops` |

### Combining Presets

```js
export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.functional.rules,
    },
  },
  // ...
];
```

Or use functional rules separately for stricter enforcement:

```js
{
  files: ['**/lib/**/*.ts'],  // Only core library files
  ...aiGuardrails.config.functional,
}
```

## What's Included

### `recommended`
- Prettier integration with sensible defaults
- Unicorn recommended rules (with sane defaults)
- Import ordering and deduplication
- Complexity limits (50 lines per function, 250 lines per file)
- Security rules from `eslint-plugin-security`
- Code quality from `eslint-plugin-sonarjs`
- No comments policy
- Arrow functions enforcement
- Early returns (no else/else-if)

### `typescript`
- Strict type safety (`no-unsafe-*`, `no-explicit-any`)
- Nullish coalescing & optional chaining preference
- Naming conventions (camelCase, PascalCase, UPPER_CASE)
- No non-null assertions

### `functional`
- No `let` declarations
- No classes or inheritance
- No `this` expressions
- No loop statements (use `Array#map`, `Array#filter`, etc.)

## Prettier Options

Configured via ESLint:

| Option | Value |
|--------|-------|
| `printWidth` | 120 |
| `tabWidth` | 2 |
| `semi` | true |
| `singleQuote` | true |
| `trailingComma` | "es5" |

### With Prettier Plugins

If you use plugins like `prettier-plugin-tailwindcss`, create a minimal `.prettierrc`:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Override Prettier Options

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
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...aiGuardrails.config.recommended,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...aiGuardrails.config.typescript,
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: aiGuardrails.rules.testOverrides,
  },
  aiGuardrails.prettier,
  { ignores: ['.next/**', 'next-env.d.ts', 'dist/**'] },
];
```

## Why `aiGuardrails.prettier` Must Be Last

`eslint-config-prettier` disables formatting rules that conflict with Prettier. In ESLint flat config, later entries override earlier ones. If prettier isn't last, subsequent configs could re-enable conflicting rules.

## Advanced Usage

Access individual rule sets:

```js
aiGuardrails.rules.base         // Base rules (prettier, arrow functions, etc.)
aiGuardrails.rules.functional   // Functional programming rules
aiGuardrails.rules.imports      // Import ordering rules
aiGuardrails.rules.comments     // No comments policy
aiGuardrails.rules.restrictions // No else, no IIFE
aiGuardrails.rules.complexity   // Max lines, depth, params
aiGuardrails.rules.security     // Security plugin rules
aiGuardrails.rules.sonarjs      // SonarJS rules
aiGuardrails.rules.reExports    // Canonical re-export rules
aiGuardrails.rules.testOverrides // Relaxations for test files
```

## License

MIT
