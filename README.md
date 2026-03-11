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

## Usage

**Important:** `aiGuardrails.prettier` must always be the **last config** in your array. This ensures Prettier's rule disables take effect after all other rules are applied.

### Plain JS/Node project

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
  aiGuardrails.prettier,
];
```

### TypeScript project

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.config.typescript,
  aiGuardrails.prettier,
];
```

### TypeScript + Strict Functional Programming

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.config.typescript,
  ...aiGuardrails.config.functional,
  aiGuardrails.prettier,
];
```

### With custom TypeScript config path

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.create.typescript({ tsconfigPath: './tsconfig.build.json' }),
  ...aiGuardrails.config.functional,
  aiGuardrails.prettier,
];
```

### With Next.js

```js
// eslint.config.mjs
import nextPlugin from '@next/eslint-plugin-next';
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.create.typescript(),
  aiGuardrails.prettier,
];
```

### With Prettier plugins (e.g., Tailwind)

If you use Prettier plugins like `prettier-plugin-tailwindcss`, create a minimal `.prettierrc` with just the plugin:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

All other Prettier options are configured via ESLint (see [Prettier Options](#prettier-options)).

## Presets

| Preset | Description |
|--------|-------------|
| `recommended` | Base rules: prettier, unicorn, imports, complexity, security, sonarjs, comments + test overrides |
| `typescript` | Type safety: `no-unsafe-*`, `no-any`, naming conventions, deprecation warnings |
| `functional` | FP strictness: `no-let`, `no-classes`, `no-this`, `no-loops` + test overrides |

## What's Included

### `recommended`
- Prettier integration
- Unicorn recommended rules (with sane defaults)
- Import ordering and deduplication
- Complexity limits (50 lines per function, 250 lines per file, max depth 1)
- Security rules from `eslint-plugin-security`
- Code quality from `eslint-plugin-sonarjs`
- No comments policy (except in test files)
- Arrow functions enforcement
- Early returns (no else/else-if)
- Test file relaxations

### `typescript`
- Strict type safety (`no-unsafe-*`, `no-explicit-any`)
- Deprecation warnings
- Nullish coalescing & optional chaining preference
- Naming conventions (camelCase, PascalCase, UPPER_CASE)
- No non-null assertions

### `functional`
- No `let` declarations
- No classes or inheritance
- No `this` expressions
- No loop statements
- Prefer property signatures

## Prettier Options

The following Prettier options are configured via ESLint:

| Option | Value |
|--------|-------|
| `printWidth` | 120 |
| `tabWidth` | 2 |
| `useTabs` | false |
| `semi` | true |
| `singleQuote` | true |
| `quoteProps` | "as-needed" |
| `trailingComma` | "es5" |
| `bracketSpacing` | true |
| `bracketSameLine` | false |
| `arrowParens` | "always" |
| `endOfLine` | "lf" |

Override these in your ESLint config if needed:

```js
export default [
  ...aiGuardrails.config.recommended,
  {
    rules: {
      'prettier/prettier': ['error', { printWidth: 80 }],
    },
  },
  aiGuardrails.prettier,
];
```

## Why `aiGuardrails.prettier` Must Be Last

In ESLint flat config, later configs override earlier ones. `eslint-config-prettier` disables formatting rules that conflict with Prettier. If it's not last, subsequent configs could re-enable those rules, causing conflicts.

**Wrong:**
```js
export default [
  ...aiGuardrails.config.recommended, // includes prettier disables
  ...aiGuardrails.config.typescript,  // might re-enable some rules ❌
];
```

**Correct:**
```js
export default [
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.config.typescript,
  aiGuardrails.prettier, // ensures all formatting rules are disabled ✅
];
```

## Advanced Usage

Access individual rule sets:

```js
import aiGuardrails from 'eslint-config-ai-guardrails';

console.log(aiGuardrails.rules.base);
console.log(aiGuardrails.rules.functional);
console.log(aiGuardrails.rules.imports);
// etc.
```

## License

MIT
