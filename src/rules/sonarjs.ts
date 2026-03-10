import type { Linter } from 'eslint';
import sonarjs from 'eslint-plugin-sonarjs';

export const getSonarJSRules = (): Linter.RulesRecord => {
  const recommendedConfig = sonarjs.configs?.recommended;
  const rules = recommendedConfig && 'rules' in recommendedConfig ? recommendedConfig.rules : {};
  return {
    ...rules,
    'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
  };
};
