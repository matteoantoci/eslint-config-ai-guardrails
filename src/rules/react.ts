import type { Linter } from "eslint";

export const createReactRules = (): Linter.RulesRecord => ({
  "react/no-unstable-nested-components": "error",
  "react/no-array-index-key": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "error",
  "react/jsx-no-leaked-render": "error",
  "max-lines-per-function": ["error", { max: 100, skipBlankLines: true }],
});
