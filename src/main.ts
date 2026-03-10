import type { Linter } from 'eslint';
import { functionalPreset } from './presets/functional.js';
import { recommendedPreset } from './presets/recommended.js';
import { typescriptPreset, createTypeScriptPreset } from './presets/typescript.js';
import { createBaseRules } from './rules/base.js';
import { createCommentRules } from './rules/comments.js';
import { createComplexityRules } from './rules/complexity.js';
import { createFunctionalRules } from './rules/functional.js';
import { createImportRules } from './rules/imports.js';
import { createReExportRules } from './rules/re-exports.js';
import { createRestrictionRules } from './rules/restrictions.js';
import { getSecurityRules } from './rules/security.js';
import { getSonarJSRules } from './rules/sonarjs.js';
import { createTestOverrides } from './rules/test-overrides.js';

export interface TypeScriptOptions {
  tsconfigPath?: string;
}

interface AiGuardrailsConfig {
  recommended: Linter.Config[];
  typescript: Linter.Config[];
  functional: Linter.Config[];
}

interface AiGuardrailsCreate {
  typescript: (options?: TypeScriptOptions) => Linter.Config[];
}

interface AiGuardrailsRules {
  base: Linter.RulesRecord;
  functional: Linter.RulesRecord;
  imports: Linter.RulesRecord;
  comments: Linter.RulesRecord;
  restrictions: Linter.RulesRecord;
  complexity: Linter.RulesRecord;
  reExports: Linter.RulesRecord;
  security: Linter.RulesRecord;
  sonarjs: Linter.RulesRecord;
  testOverrides: Linter.RulesRecord;
}

interface AiGuardrails {
  config: AiGuardrailsConfig;
  create: AiGuardrailsCreate;
  rules: AiGuardrailsRules;
}

const aiGuardrails: AiGuardrails = {
  config: {
    recommended: recommendedPreset,
    typescript: typescriptPreset,
    functional: functionalPreset,
  },
  create: {
    typescript: createTypeScriptPreset,
  },
  rules: {
    base: createBaseRules(),
    functional: createFunctionalRules(),
    imports: createImportRules(),
    comments: createCommentRules(),
    restrictions: createRestrictionRules(),
    complexity: createComplexityRules(),
    reExports: createReExportRules(),
    security: getSecurityRules(),
    sonarjs: getSonarJSRules(),
    testOverrides: createTestOverrides(),
  },
};

export default aiGuardrails;
