import * as v from "valibot";


const envSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
  JWT_ACCESS_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
  JWT_REFRESH_SECRET: v.pipe(
    v.string(),
    v.minLength(32),
  ),
});

export const ENV = v.parse(envSchema, process.env);
