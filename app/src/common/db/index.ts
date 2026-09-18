import "server-only";

import { Datebase } from "@neurobrew/shared";
import { ENV } from "@/common/config";


/** Предоставляет общее подключение к базе данных для серверного кода фронтенда. */
export const DB = new Datebase({
  protocol: "postgresql",
  hostname: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});
