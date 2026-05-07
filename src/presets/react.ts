import type { Linter } from "eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { createReactRules } from "../rules/react.js";

const castPlugins = (
  plugins: Record<string, unknown>,
): Linter.Config["plugins"] => plugins as unknown as Linter.Config["plugins"];

const createPlugins = () =>
  castPlugins({
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
  });

export const reactPreset: Linter.Config = {
  plugins: createPlugins(),
  rules: createReactRules(),
};
