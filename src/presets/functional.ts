import type { Linter } from "eslint";
import functionalPlugin from "eslint-plugin-functional";
import { createFunctionalRules } from "../rules/functional.js";

const castPlugins = (
  plugins: Record<string, unknown>,
): Linter.Config["plugins"] => plugins as unknown as Linter.Config["plugins"];

export const functionalPreset: Linter.Config = {
  plugins: castPlugins({ functional: functionalPlugin }),
  rules: createFunctionalRules(),
};
