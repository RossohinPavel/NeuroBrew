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

/** Управляет подключением к базе данных и предоставляет репозитории для работы с ней. */
export class Datebase {
  private readonly connection;
  readonly auth;

  constructor(readonly params: BuildUrlParams) {
    this.connection = this.createPostgresConnection();
    this.auth = new AuthRepository(this.connection);
  }

  /** Возвращает URL подключения к PostgreSQL с закодированными учетными данными. */
  get url() {
    const url = new URL(`${this.params.protocol}://localhost`);
    url.hostname = this.params.hostname;
    url.port = this.params.port;
    url.username = this.params.username;
    url.password = this.params.password;
    url.pathname = this.params.database;
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
