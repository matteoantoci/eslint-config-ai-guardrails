import type { Linter } from "eslint";
import securityPlugin from "eslint-plugin-security";

export const getSecurityRules = (): Linter.RulesRecord => {
  const recommendedConfig = securityPlugin.configs.recommended;
  const rules = "rules" in recommendedConfig ? recommendedConfig.rules : {};
  return {
    ...rules,
    "security/detect-object-injection": "off",
  };
};
