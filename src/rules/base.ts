import type { Linter } from "eslint";

export const createBaseRules = (): Linter.RulesRecord => ({
  "prettier/prettier": "error",
  "prefer-arrow-callback": "error",
  "no-var": "error",
  "no-param-reassign": "error",
  "prefer-const": ["error", { destructuring: "all" }],
  "func-names": ["error", "never"],
  "prefer-arrow-functions/prefer-arrow-functions": "error",
  "arrow-body-style": ["error", "as-needed"],
  "max-lines-per-function": ["error", { max: 50, skipBlankLines: true }],
  "max-lines": ["error", { max: 250, skipBlankLines: true }],
  "no-magic-numbers": [
    "error",
    {
      detectObjects: false,
      enforceConst: true,
      ignore: [0, 1, -1, 2],
      ignoreArrayIndexes: true,
    },
  ],
  "unicorn/no-null": "off",
  "unicorn/no-array-callback-reference": "off",
  "unicorn/prefer-global-this": "off",
  "unicorn/prefer-top-level-await": "off",
  "unicorn/prevent-abbreviations": "off",
  "no-useless-undefined": "off",
  "unicorn/prefer-at": "error",
  "unicorn/prefer-negative-index": "error",
});
