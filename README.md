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
  eslint-plugin-deprecation \
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

### Plain JS/Node project

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
];
```

### TypeScript project

```js
// eslint.config.mjs
import aiGuardrails from 'eslint-config-ai-guardrails';

export default [
  ...aiGuardrails.config.recommended,
  ...aiGuardrails.config.typescript,
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
];
```

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
