// @ts-check
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import { importX } from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "eslint.config.mjs",
    "dist/**",
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    name: "neurobrew/backend",
    files: ["**/*.ts"],
    plugins: {
      "@stylistic": stylistic,
      "import-x": importX,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.vitest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unused-vars": "off",
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
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "never",
        },
      ],
      "no-console": "error",
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: false,
          skipTemplates: false,
        },
      ],
      "no-unused-vars": "off",
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
  },
]);
