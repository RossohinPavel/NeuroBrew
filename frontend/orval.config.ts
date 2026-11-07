import { defineConfig } from "orval";


export default defineConfig({
  api: {
    input: "../backend/.temp/openapi.json",
    output: {
      mode: "tags-split",
      target: "src/shared/api/generated/endpoints",
      schemas: "src/shared/api/generated/models",
      client: "fetch",
      clean: true,
      tagsSplitDeduplication: true,
      override: {
        mutator: {
          path: "src/shared/api/fetcher.ts",
          name: "apiFetch",
        },
        fetch: { includeHttpResponseReturnType: true },
      },
    },
  },
});
