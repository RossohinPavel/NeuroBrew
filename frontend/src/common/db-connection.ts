import "server-only";

import { createConnection } from "@shared/database";
import { ENV } from "@/common/env";


/** Предоставляет общее подключение к базе данных для серверного кода фронтенда. */
export const DB = createConnection({
  credentials: {
    hostname: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
  },
});
