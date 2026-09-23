import { AuthRepository } from "./repo/auth";
import * as schema from "./schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


export interface BuildUrlParams {
  protocol: string;
  hostname: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

/** Хранит URL и клиент подключения к базе данных и предоставляет связанные репозитории. */
export class Connection {
  readonly url;
  private readonly connection;
  readonly auth;

  constructor(readonly params: BuildUrlParams) {
    this.url = Connection.buildUrl(params);
    this.connection = this.createPostgresConnection();
    this.auth = new AuthRepository(this.connection);
  }

  /** Формирует строку URL подключения к PostgreSQL из переданных параметров. */
  static buildUrl(params: BuildUrlParams) {
    const url = new URL(`${params.protocol}://localhost`);
    url.hostname = params.hostname;
    url.port = params.port;
    url.username = params.username;
    url.password = params.password;
    url.pathname = params.database;
    return url.toString();
  }

  /** Создает клиент Drizzle, общий для всех репозиториев этого экземпляра. */
  createPostgresConnection() {
    const client = postgres(this.url);
    return drizzle(client, { schema });
  }

  /** Проверяет готовность базы данных принять запрос. */
  checkConnection() {
    return this.connection.execute(sql`select 1`);
  }
}
