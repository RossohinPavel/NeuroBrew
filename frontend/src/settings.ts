import "server-only";

import { Datebase } from "@neurobrew/shared";
import { z } from "zod";


const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
});

export const ENV = envSchema.parse(process.env);

export const DB = new Datebase({
  protocol: "postgresql",
  hostname: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

try {
  await DB.checkConnection();
} catch (error) {
  throw new Error(
    "Не удалось выполнить запрос к БД. Проверьте подключение и параметры доступа.",
    { cause: error },
  );
}
