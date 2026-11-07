import { defineConfig } from "orval";


export default defineConfig({
  api: {
    input: "../backend/.temp/openapi.json",
    output: {
      mode: "tags-split",
      target: "src/common/api/generated/endpoints",
      schemas: "src/common/api/generated/models",
      client: "fetch",
      clean: true,
      tagsSplitDeduplication: true,
      override: {
        mutator: {
          path: "src/common/api/fetcher.ts",
          name: "apiFetch",
        },
        fetch: { includeHttpResponseReturnType: true },
      },
    },
  },
});
