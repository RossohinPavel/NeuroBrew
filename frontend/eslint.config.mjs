import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      "@stylistic": stylistic,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
      "@typescript-eslint/no-unused-vars": "off",
      "import/export": "error",
      "import/newline-after-import": ["error", { count: 2, exactCount: true }],
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never",
          pathGroups: [
            {
              group: "internal",
              pattern: "@/**",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
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
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
