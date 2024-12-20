import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      curly: "error",
      "no-console": "error",
      "consistent-return": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-param-reassign": "error",
      "no-shadow": "error",
      indent: ["error", 2],
      quotes: "error",
      semi: "error",
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["error", { code: 80 }],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-body-style": "error",
      "no-useless-constructor": "error",
      "object-shorthand": "error",
      "no-dupe-keys": "error",
      "no-empty": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-irregular-whitespace": "error",
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
