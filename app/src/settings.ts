import "server-only";

import { Datebase } from "@neurobrew/shared";
import { z } from "zod";


const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
});

/** Содержит проверенные переменные серверного окружения. */
export const ENV = envSchema.parse(process.env);

/** Предоставляет общее подключение к базе данных для серверного кода фронтенда. */
export const DB = new Datebase({
  protocol: "postgresql",
  hostname: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});
