import type { Linter } from 'eslint';

export const createImportRules = (): Linter.RulesRecord => ({
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      'newlines-between': 'never',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  'import/no-duplicates': 'error',
  'import/first': 'error',
  'import/no-cycle': 'error',
  'import/newline-after-import': 'error',
});
