// @ts-check
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export const stylisticConfig = {
  name: "neurobrew/stylistic",
  plugins: {
    "@stylistic": stylistic,
  },
  rules: {
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "@stylistic/indent": ["error", 2],
    "@stylistic/keyword-spacing": ["error", { after: true, before: true }],
    "@stylistic/max-len": ["error", { code: 100 }],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/space-before-blocks": ["error", "always"],
    "@stylistic/space-in-parens": ["error", "never"],
  },
};

export const unusedCodeConfig = {
  name: "neurobrew/unused-code",
  plugins: {
    "unused-imports": unusedImports,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
};

export const importsConfig = {
  name: "neurobrew/imports",
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/export": "error",
    "import/newline-after-import": ["error", { count: 2, exactCount: true }],
  },
};

export const codeQualityConfig = {
  name: "neurobrew/code-quality",
  rules: {
    "no-console": "error",
    "no-irregular-whitespace": [
      "error",
      {
        skipStrings: false,
        skipTemplates: false,
      },
    ],
  },
};
