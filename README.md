# eslint-config-ai-guardrails

> Strict, AI-friendly ESLint config for teams that value type safety and functional programming

[![npm version](https://img.shields.io/npm/v/eslint-config-ai-guardrails)](https://www.npmjs.com/package/eslint-config-ai-guardrails) [![license](https://img.shields.io/npm/l/eslint-config-ai-guardrails)](LICENSE)

## 🤔 Why This Exists

**Guardrails, not guidelines.**

AI coding tools generate code fast but often produce 180-line functions with magic numbers, useless comments, and spaghetti logic that *works* but nobody can maintain.

This config enforces hard constraints the AI cannot bypass:

- 🚫 **No comments** (including `eslint-disable`) — forces self-documenting code
- 🔢 **Max 2 parameters** — forces object destructuring
- 📏 **50 lines per function** — forces extraction of helpers
- 📦 **250 lines per file** — forces module separation
- 🎯 **No magic numbers** — forces named constants

The agent hits a limit, breaks things down, keeps going. The result is readable, maintainable code.

## 🚀 Quick Start

Install:

```bash
npm install -D eslint-config-ai-guardrails
```

Peer dependencies (install what you need):

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

Full setup in `eslint.config.mjs`:

```js
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ...aiGuardrails.config.recommended,
    rules: {
      ...aiGuardrails.config.recommended.rules,
      ...aiGuardrails.config.typescript.rules,      // remove if not using TS
      ...aiGuardrails.config.functional.rules,      // remove if not using FP
      ...aiGuardrails.config.react.rules,           // remove if not using React
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: aiGuardrails.rules.testOverrides,
  },
  aiGuardrails.prettier,
  { ignores: ['dist/**', 'coverage/**', '*.generated.ts'] },
];
```

Custom TypeScript config:

```js
{
  files: ['**/*.ts', '**/*.tsx'],
  ...aiGuardrails.create.typescript({ tsconfigPath: './tsconfig.build.json' }),
}
```

## 📋 Presets

| Preset | Best For | Key Rules |
|--------|----------|-----------|
| `recommended` | Most projects | Prettier, import ordering, 50 lines/function, 250 lines/file, no comments, no magic numbers, no else/else-if, SonarJS security |
| `typescript` | TypeScript codebases | No `any`, no unsafe operations, naming conventions, nullish coalescing, no deprecated APIs, no non-null assertions |
| `functional` ⭐ | FP codebases | No `let`, no classes, no `this`, no loops — pure functions only |
| `react` | React/Next.js projects | No inline components, no array index keys, hooks rules, exhaustive deps, 100 lines/function |

### 🧪 Test File Overrides

## 🛠️ Troubleshooting

**Prettier must be last** — later entries override earlier ones in flat config:

```js
export default [
  { files: ['**/*.ts'], ...aiGuardrails.config.recommended },
  aiGuardrails.prettier,
];
```

**Functional rules blocking React** — use function components exclusively (`const MyComponent = () => {}`), not class components.

**TypeScript not detecting tsconfig** — use `aiGuardrails.create.typescript({ tsconfigPath: './tsconfig.app.json' })`.

## 🧪 Advanced Usage

Access individual rule sets for granular composition:

```js
aiGuardrails.rules.base          // Prettier, arrow functions, no-var
aiGuardrails.rules.functional    // No let, no classes, no this, no loops
aiGuardrails.rules.imports       // Import ordering and dedup
aiGuardrails.rules.comments      // No comments policy
aiGuardrails.rules.restrictions  // No else, no IIFE, no re-exports
aiGuardrails.rules.complexity    // Max lines, depth, params
aiGuardrails.rules.security      // Security plugin rules
aiGuardrails.rules.sonarjs       // SonarJS rules
aiGuardrails.rules.reExports     // Canonical re-export rules
aiGuardrails.rules.testOverrides // Relaxations for test files
aiGuardrails.rules.react         // React hooks, components, JSX rules
```

Override Prettier options per file pattern:

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

## License

MIT
