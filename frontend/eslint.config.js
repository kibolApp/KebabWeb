import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginCypress from "eslint-plugin-cypress";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        Cypress: true,
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["cypress/**/*.cy.{js,ts}"],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        cy: true,
        Cypress: true,
        describe: true,
        it: true,
        before: true,
        after: true,
        expect: true,
        on: true,
        config: true
      },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "warn",
    },
  },
];

config.ignores = ["cypress/"];

export default config;
