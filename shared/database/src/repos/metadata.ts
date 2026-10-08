import type { DatabaseConnection } from "../connection";
import { changelog } from "../schema";


/** Создает репозиторий для запросов к метаданным приложения. */
export function createMetadataRepository(connection: DatabaseConnection) {
  
  /** Возвращает все записи журнала изменений. */
  const listChangelog = async () => {
    const entries = await connection
      .select()
      .from(changelog);
    return entries;
  };

  return {
    listChangelog,
  };
}
