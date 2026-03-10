import type { Linter } from "eslint";

const MAX_COMPLEXITY = 10;
const MAX_STATEMENTS = 20;

export const createComplexityRules = (): Linter.RulesRecord => ({
  complexity: ["error", MAX_COMPLEXITY],
  "max-statements": ["error", MAX_STATEMENTS],
  "max-depth": ["error", 1],
  "max-params": ["error", 2],
});
