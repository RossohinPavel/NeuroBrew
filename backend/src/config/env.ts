import * as v from "valibot";


const EnvSchema = v.object({
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

export type Env = v.InferOutput<typeof EnvSchema>;

/** Проверяет переменные серверного окружения при запуске приложения. */
export function validateEnv(config: Record<string, unknown>) {
  return v.parse(EnvSchema, config);
}
