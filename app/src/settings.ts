import "server-only";

import { Datebase } from "@neurobrew/shared";
import * as v from "valibot";


const EnvSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
  DB_HOST: v.pipe(v.string(), v.minLength(1)),
  DB_PORT: v.pipe(v.string(), v.minLength(1)),
  DB_USER: v.pipe(v.string(), v.minLength(1)),
  DB_PASSWORD: v.pipe(v.string(), v.minLength(1)),
  DB_NAME: v.pipe(v.string(), v.minLength(1)),
  JWT_ACCESS_SECRET: v.pipe(v.string(), v.minLength(32)),
  JWT_REFRESH_SECRET: v.pipe(v.string(), v.minLength(32)),
});

/** Содержит проверенные переменные серверного окружения. */
export const ENV = v.parse(EnvSchema, process.env);

/** Предоставляет общее подключение к базе данных для серверного кода фронтенда. */
export const DB = new Datebase({
  protocol: "postgresql",
  hostname: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});
