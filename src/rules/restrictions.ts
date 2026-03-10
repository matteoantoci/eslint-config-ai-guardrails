import type { Linter } from 'eslint';

export const createRestrictionRules = (): Linter.RulesRecord => ({
  'no-restricted-syntax': [
    'error',
    {
      selector: 'IfStatement[alternate]',
      message: 'Avoid else/else if. Use early returns instead',
    },
    {
      selector:
        'CallExpression[callee.type="FunctionExpression"], CallExpression[callee.type="ArrowFunctionExpression"]',
      message: 'Avoid IIFE. Extract a proper named function instead',
    },
    {
      selector: 'UnaryExpression[operator="void"]',
      message: 'Avoid using void operator. Use explicit control flow instead.',
    },
    {
      selector: 'TSAsExpression > TSAsExpression[typeAnnotation.type="TSUnknownKeyword"]',
      message: 'Avoid using "as unknown as" type assertions. Use proper type guards or narrowing instead.',
    },
  ],
});
