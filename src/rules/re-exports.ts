import type { Linter } from "eslint";

export const createReExportRules = (): Linter.RulesRecord => ({
  "canonical/no-export-all": "error",
  "canonical/filename-no-index": "error",
});
