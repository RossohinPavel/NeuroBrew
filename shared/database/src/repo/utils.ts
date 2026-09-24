import { Repository } from "./abstract-repository";
import { sql } from "drizzle-orm";


/** Предоставляет служебные операции для работы с базой данных. */
export class UtilsRepository extends Repository {

  /** Проверяет готовность базы данных принять запрос. */
  checkConnection() {
    return this.connection.execute(sql`select 1`);
  }
}
