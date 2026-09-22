// @ts-check
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import vitest from "@vitest/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "coverage/**",
    "dist/**",
    "eslint.config.mjs",
    "node_modules/**",
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    name: "neurobrew/backend",
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "import-x": importX,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-argument": "error",

      "no-unused-vars": "off",
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

      "import-x/export": "error",
      "import-x/newline-after-import": [
        "error",
        {
          considerComments: true,
          count: 2,
          exactCount: true,
        },
      ],
      "import-x/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: [
            [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
          ],
          "newlines-between": "never",
        },
      ],

      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/keyword-spacing": [
        "error",
        {
          after: true,
          before: true,
        },
      ],
      "@stylistic/max-len": ["error", { code: 100 }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-in-parens": ["error", "never"],

      curly: ["error", "all"],
      "no-console": [
        "error",
        {
          allow: ["error", "info", "warn"],
        },
      ],
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: false,
          skipTemplates: false,
        },
      ],
    },
  },
  {
    ...vitest.configs.recommended,
    name: "neurobrew/backend/tests",
    files: ["**/*.spec.ts", "**/*.e2e-spec.ts", "test/**/*.ts"],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
]);
