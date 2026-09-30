import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


/** Описывает реквизиты доступа к базе данных. */
export interface DatabaseCredentials {
  hostname: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

/** Описывает реквизиты базы данных и настройки Drizzle-подключения. */
export interface ConnectionOptions {
  credentials: DatabaseCredentials;
  logger?: boolean;
}

export type DatabaseConnection = ReturnType<typeof createConnection>;

/** Возвращает URL подключения к PostgreSQL, сформированный из переданных параметров. */
export function buildConnectionUrl(creds: DatabaseCredentials) {
  const url = new URL("postgres://localhost");
  url.hostname = creds.hostname;
  url.port = creds.port;
  url.username = creds.username;
  url.password = creds.password;
  url.pathname = creds.database;
  return url.toString();
}

/** Создает и возвращает Drizzle-подключение к базе данных. */
export function createConnection(options: ConnectionOptions) {
  const url = buildConnectionUrl(options.credentials);
  const client = postgres(url);
  return drizzle(client, {
    schema,
    logger: options.logger ?? false,
    casing: "snake_case",
  });
}
