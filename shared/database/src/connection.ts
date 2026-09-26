import { AuthRepository } from "./repo/auth";
import { UtilsRepository } from "./repo/utils";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


export interface Options {
  hostname: string;
  port: string;
  username: string;
  password: string;
  database: string;
  logger?: boolean;
}

/** Создает подключение к базе данных и связанные с ним репозитории. */
export class Connection {
  constructor(public readonly options: Options) {}

  /** Создает подключение и возвращает работающие через него репозитории. */
  build() {
    const client = postgres(this.url);
    const connection = drizzle(client, {
      schema,
      logger: this.options.logger ?? false,
      casing: "snake_case"
    });
    return {
      auth: new AuthRepository(connection),
      utils: new UtilsRepository(connection),
    } as const;
  }

  /** Возвращает URL подключения к PostgreSQL, сформированный из текущих параметров. */
  get url() {
    const url = new URL("postgres://localhost");
    url.hostname = this.options.hostname;
    url.port = this.options.port;
    url.username = this.options.username;
    url.password = this.options.password;
    url.pathname = this.options.database;
    return url.toString();
  }
}
