import "server-only";

import { Connection } from "@shared/database";
import { ENV } from "@/common/config";


/** Предоставляет общее подключение к базе данных для серверного кода фронтенда. */
export const DB = new Connection({
  protocol: "postgresql",
  hostname: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});
