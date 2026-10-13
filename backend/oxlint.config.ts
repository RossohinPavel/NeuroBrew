import { defineConfig } from "oxlint";


export default defineConfig({
  categories: {
    correctness: "error",
  },
  env: {
    node: true,
  },
  ignorePatterns: [
    "dist/**",
    "oxlint.config.ts",
  ],
  plugins: [
    "eslint",
    "typescript",
    "import",
  ],
  jsPlugins: [
    {
      name: "@stylistic",
      specifier: "@stylistic/eslint-plugin",
    },
  ],
  options: {
    typeAware: true,
  },
  rules: {
    "typescript/no-explicit-any": "error",
    "typescript/no-unsafe-argument": "error",
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
    "import/newline-after-import": [
      "error",
      {
        considerComments: true,
        count: 2,
        exactCount: true,
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
      },
    ],
    "no-console": "error",
    "no-fallthrough": "off",
    "no-undef": "off",
    "no-unreachable": "off",
    "no-unused-labels": "off",
    "no-unused-private-class-members": "off",
    "no-unused-vars": "off",
  },
});
