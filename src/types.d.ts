declare module 'eslint-plugin-no-comments' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;
  export default plugin;
}

declare module 'eslint-plugin-security' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: ESLint.ConfigData;
    };
  };
  export default plugin;
}

declare module 'eslint-plugin-deprecation' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;
  export default plugin;
}
