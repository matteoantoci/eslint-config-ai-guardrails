import type { Linter } from "eslint";

export const createTestOverrides = (): Linter.RulesRecord => ({
  "import/order": "off",
  "max-lines-per-function": "off",
  "canonical/filename-no-index": "off",
  "functional/no-classes": "off",
  "functional/no-class-inheritance": "off",
  "functional/no-this-expressions": "off",
  "no-magic-numbers": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "no-restricted-syntax": "off",
  "unicorn/no-useless-undefined": "off",
});
