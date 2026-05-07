# eslint-config-ai-guardrails

> Strict, AI-friendly ESLint config for teams that value type safety and functional programming

[![npm version](https://img.shields.io/npm/v/eslint-config-ai-guardrails)](https://www.npmjs.com/package/eslint-config-ai-guardrails) [![license](https://img.shields.io/npm/l/eslint-config-ai-guardrails)](LICENSE)

## 🤔 Why This Exists

**Guardrails, not guidelines.**

AI coding tools are now used by most developers. They generate code fast—but often produce 180-line functions with magic numbers (`10000`), useless comments ("// download the file"), and spaghetti logic that *works* but nobody can maintain.

Traditional linting nudges humans. **AI needs hard constraints it cannot bypass.**

When you enforce:
- 🚫 **No comments** → AI writes self-documenting code with clear names
- 🔢 **Max 2 parameters** → Forces object destructuring instead of `func(a, b, c, d, e, f)`
- 📏 **50 lines per function** → AI extracts helpers as it develops
- 📦 **250 lines per file** → Proper module separation
- 🎯 **No magic numbers** → Named constants like `VISIBILITY_TIMEOUT_MS`

The agent has no choice but to refactor. It hits a limit, breaks things down, keeps going. The result is readable, maintainable code that you actually want to live with.

This isn't about rejecting AI. It's about **responsible AI coding**—getting quality output from agents that would otherwise produce chaos.

## 🚀 Quick Start

**📋 Copy-paste this** into `eslint.config.mjs`:

```js
import aiGuardrails from 'eslint-config-ai-guardrails';

// ✨ Includes all presets (recommended + typescript + functional)
// 📝 Remove typescript/functional lines if you don't need them
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

[📦 Installation](#installation) · [📋 Presets](#presets) · [🔧 Examples](#framework-examples) · [🛠️ Troubleshooting](#troubleshooting)

## 📦 Installation

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
  eslint-plugin-react eslint-plugin-react-hooks \
  eslint-config-prettier eslint-plugin-prettier
```

## 📋 Presets

Choose your strictness:

| Preset | Best For | Quick Start |
|--------|----------|-------------|
| `recommended` | Most projects | `...aiGuardrails.config.recommended` |
| `typescript` | TypeScript codebases | `...aiGuardrails.config.typescript` |
| `react` | React/Next.js projects | `...aiGuardrails.config.react` |
| `functional` ⭐ | FP-only codebases | `...aiGuardrails.config.functional` |

### 🧪 Test File Overrides

Test files often need relaxed rules (e.g., longer functions, more parameters). The `testOverrides` rule set disables strict complexity and functional rules for test files while keeping type safety.

```js
{
  files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
  rules: aiGuardrails.rules.testOverrides,
}
```

## ⚙️ Configuration

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

## ✨ What's Included

### `recommended`
- 🎨 **Prettier integration** — Consistent formatting
- 📦 **Import ordering** — Automatic deduplication & sorting
- 📏 **Complexity limits** — 50 lines/function, 250 lines/file
- 🔒 **Security** — Vulnerability detection (SonarJS)
- 🚫 **No comments policy** — Forces self-documenting code
- ➡️ **Arrow functions** — Consistent function style
- 🔄 **Early returns** — No nested else/else-if blocks

### `typescript`
- ⚠️ **No deprecated APIs** — Forces AI to use current library methods
- 🔒 **Strict type safety** — `no-unsafe-*`, `no-explicit-any`
- 📛 **Naming conventions** — camelCase, PascalCase, UPPER_CASE
- ❓ **Nullish coalescing** — Prefer `??` over `||`
- ❗ **No non-null assertions** — Safe null handling

### `functional` ⭐
- 🚫 **No `let` declarations** — Immutable data only
- 🚫 **No classes** — Functions over OOP
- 🚫 **No `this` expressions** — Pure functions
- 🚫 **No loops** — Use `map`, `filter`, `reduce`

### `react`
- ⚛️ **No inline components** — Prevents defining components inside components
- 🔑 **No array index keys** — Prevents unstable React keys
- 🪝 **Hooks rules** — Enforces rules of hooks and exhaustive deps
- 🔀 **Ternary over `&&`** — Prevents leaked falsy values in JSX
- 📏 **100 lines/function** — Relaxed limit for React components (vs 50 default)

## 🔧 Framework Examples

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

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.typescript.rules,
      ...aiGuardrails.config.react.rules,
    },
    plugins: {
      ...aiGuardrails.config.recommended.plugins,
      ...aiGuardrails.config.react.plugins,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: aiGuardrails.rules.testOverrides,
  },
  aiGuardrails.prettier,
  { ignores: ['dist/**', 'node_modules/**'] },
];
```

## 🛠️ Troubleshooting

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

React class components conflict with `functional/no-classes` and `functional/no-this-expressions`. Use function components exclusively:

```js
// ❌ Wrong
class MyComponent extends React.Component { ... }

// ✅ Correct
const MyComponent = () => { ... }
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

## 🎨 Prettier Options

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

## 🧪 Advanced Usage

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
aiGuardrails.rules.react         // React hooks, components, JSX rules
```

## 📄 License

MIT
