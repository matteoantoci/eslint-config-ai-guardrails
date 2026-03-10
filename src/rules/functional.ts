import type { Linter } from 'eslint';

export const createFunctionalRules = (): Linter.RulesRecord => ({
  'unicorn/no-array-reduce': 'off',
  'unicorn/no-array-for-each': 'off',
  'functional/no-let': 'error',
  'functional/no-classes': 'error',
  'functional/no-class-inheritance': 'error',
  'functional/no-this-expressions': 'error',
  'functional/no-loop-statements': 'error',
  'functional/prefer-property-signatures': 'error',
});
