import type { Linter } from "eslint";

export const createReExportRules = (): Linter.RulesRecord => ({
  "canonical/no-re-export": "error",
  "canonical/no-export-all": "error",
  "canonical/filename-no-index": "error",
});
