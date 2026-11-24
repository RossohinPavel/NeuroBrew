import * as v from "valibot";
import { loadEnvFile } from "node:process";


const EnvSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
  JWT_ACCESS_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
  JWT_REFRESH_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
  DATABASE_URL: v.pipe(
    v.string(),
    v.url(),
  ),
  REDIS_URL: v.pipe(
    v.string(),
    v.url(),
  ),
  FRONTEND_API_URL: v.pipe(
    v.string(),
    v.url(),
  ),
});

// Loads environment variables from the local file during local development.
if (process.env.NODE_ENV === undefined) {
  loadEnvFile(".env");
}

export const ENV = v.parse(EnvSchema, process.env);
