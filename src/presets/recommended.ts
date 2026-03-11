import tsPlugin from "@typescript-eslint/eslint-plugin";
import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import canonical from "eslint-plugin-canonical";
import functionalPlugin from "eslint-plugin-functional";
import importPlugin from "eslint-plugin-import";
import noComments from "eslint-plugin-no-comments";
import preferArrowPlugin from "eslint-plugin-prefer-arrow-functions";
import prettierPlugin from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { createBaseRules } from "../rules/base.js";
import { createCommentRules } from "../rules/comments.js";
import { createComplexityRules } from "../rules/complexity.js";
import { createFunctionalRules } from "../rules/functional.js";
import { createImportRules } from "../rules/imports.js";
import { createReExportRules } from "../rules/re-exports.js";
import { createRestrictionRules } from "../rules/restrictions.js";
import { getSecurityRules } from "../rules/security.js";
import { getSonarJSRules } from "../rules/sonarjs.js";

const castPlugins = (
  plugins: Record<string, unknown>,
): Linter.Config["plugins"] => plugins as unknown as Linter.Config["plugins"];

const createPlugins = () =>
  castPlugins({
    prettier: prettierPlugin,
    "prefer-arrow-functions": preferArrowPlugin,
    unicorn,
    import: importPlugin,
    sonarjs: sonarjsPlugin,
    functional: functionalPlugin,
    canonical,
    "no-comments": noComments,
    security: securityPlugin,
    "@typescript-eslint": tsPlugin,
  });

const createSettings = () => ({
  "import/resolver": {
    typescript: {
      alwaysTryTypes: true,
    },
  },
  "import/parsers": {
    "@typescript-eslint/parser": [".ts", ".tsx"],
  },
});

const getUnicornRecommendedRules = (): Linter.RulesRecord => {
  const recommended = unicorn.configs.recommended;
  if (!recommended) return {};
  if (!("rules" in recommended)) return {};
  return recommended.rules as Linter.RulesRecord;
};

const createRules = (): Linter.RulesRecord => ({
  ...getUnicornRecommendedRules(),
  ...createBaseRules(),
  ...createFunctionalRules(),
  ...createImportRules(),
  ...createCommentRules(),
  ...createRestrictionRules(),
  ...createComplexityRules(),
  ...getSonarJSRules(),
  ...getSecurityRules(),
  ...createReExportRules(),
});

export const recommendedPreset: Linter.Config = {
  plugins: createPlugins(),
  settings: createSettings(),
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: createRules(),
};

export { eslintConfigPrettier as prettierConfig };
