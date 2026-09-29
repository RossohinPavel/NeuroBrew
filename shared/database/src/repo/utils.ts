import type { DatabaseConnection } from "./types";
import { sql } from "drizzle-orm";


/** Создает служебный репозиторий для работы с базой данных. */
export function createUtilsRepository(connection: DatabaseConnection) {

  /** Проверяет готовность базы данных принять запрос. */
  const checkConnection = () => connection.execute(sql`select 1`);

  return {
    checkConnection,
  };
}
