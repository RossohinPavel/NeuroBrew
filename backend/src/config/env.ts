import * as v from "valibot";
import { loadEnvFile } from "node:process";


const envSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
  DATABASE_URL: v.pipe(
    v.string(),
    v.minLength(1),
  ),
  JWT_ACCESS_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
  JWT_REFRESH_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
});

// Loads environment variables from the local file during local development.
if (process.env.NODE_ENV === undefined) {
  loadEnvFile(".env");
}

export const ENV = v.parse(envSchema, process.env);
