// @ts-check
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

import {
  codeQualityConfig,
  importsConfig,
  stylisticConfig,
  unusedCodeConfig,
} from "../eslint.common.mjs";

export default defineConfig([
  globalIgnores([
    "eslint.config.mjs",
    "dist/**",
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  stylisticConfig,
  unusedCodeConfig,
  importsConfig,
  codeQualityConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: [["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"]],
          "newlines-between": "never",
        },
      ],
    },
  },
  {
    files: ["**/*.spec.ts", "test/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);
