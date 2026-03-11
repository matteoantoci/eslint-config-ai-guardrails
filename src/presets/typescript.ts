import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import type { Linter } from "eslint";

export interface TypeScriptOptions {
  tsconfigPath?: string;
}

const castPlugins = (
  plugins: Record<string, unknown>,
): Linter.Config["plugins"] => plugins as unknown as Linter.Config["plugins"];

const createRules = (): Linter.RulesRecord => ({
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/prefer-optional-chain": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/no-non-null-assertion": "error",
  "@typescript-eslint/naming-convention": [
    "error",
    { selector: "function", format: ["camelCase", "PascalCase"] },
    {
      selector: "variable",
      format: ["camelCase", "UPPER_CASE", "PascalCase"],
      leadingUnderscore: "allow",
    },
    { selector: "typeLike", format: ["PascalCase"] },
    {
      selector: "parameter",
      format: ["camelCase"],
      leadingUnderscore: "allow",
    },
    { selector: "import", format: ["camelCase", "PascalCase", "snake_case"] },
  ],
});

const createPlugins = () =>
  castPlugins({
    "@typescript-eslint": tsPlugin,
  });

export const createTypeScriptPreset = (
  options: TypeScriptOptions = {},
): Linter.Config => {
  const { tsconfigPath = "./tsconfig.json" } = options;

  return {
    plugins: createPlugins(),
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: tsconfigPath,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: createRules(),
  };
};

export const typescriptPreset: Linter.Config = createTypeScriptPreset();
