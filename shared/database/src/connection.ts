import {
  createAuthRepository,
  createRegistryRepository,
  createUtilsRepository,
} from "./repo";
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

/** Возвращает URL подключения к PostgreSQL, сформированный из переданных параметров. */
export function buildConnectionUrl(credentials: DatabaseCredentials) {
  const url = new URL("postgres://localhost");
  url.hostname = credentials.hostname;
  url.port = credentials.port;
  url.username = credentials.username;
  url.password = credentials.password;
  url.pathname = credentials.database;
  return url.toString();
}

/** Создает подключение к базе данных и работающие через него репозитории. */
export function createConnection(options: ConnectionOptions) {
  const client = postgres(buildConnectionUrl(options.credentials));
  const connection = drizzle(client, {
    schema,
    logger: options.logger ?? false,
    casing: "snake_case",
  });
  return {
    auth: createAuthRepository(connection),
    registry: createRegistryRepository(connection),
    utils: createUtilsRepository(connection),
  } as const;
}
