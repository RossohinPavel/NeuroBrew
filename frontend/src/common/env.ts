import "server-only";

import * as v from "valibot";


const EnvSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
  BACKEND_URL: v.pipe(
    v.string(),
    v.url(),
  ),
});

/** Содержит проверенные переменные серверного окружения. */
export const ENV = v.parse(EnvSchema, process.env);
