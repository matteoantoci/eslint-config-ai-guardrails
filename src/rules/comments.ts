import type { Linter } from "eslint";

export const createCommentRules = (): Linter.RulesRecord => ({
  "no-comments/disallowComments": "error",
});
