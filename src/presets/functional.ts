import type { Linter } from "eslint";
import functionalPlugin from "eslint-plugin-functional";
import { createFunctionalRules } from "../rules/functional.js";

const createFunctionalConfig = (): Linter.Config => ({
  plugins: {
    functional: functionalPlugin,
  },
  rules: createFunctionalRules(),
});

const createFunctionalTestOverrides = (): Linter.Config => ({
  files: ["**/*.test.{ts,tsx,js,jsx}", "**/__tests__/**"],
  rules: {
    "functional/no-let": "off",
    "functional/no-loop-statements": "off",
  },
});

export const functionalPreset: Linter.Config[] = [
  createFunctionalConfig(),
  createFunctionalTestOverrides(),
];
