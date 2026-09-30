import { createUtilsRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { checkConnection } = createUtilsRepository(DB);

/** Проверяет подключение к базе данных до готовности серверного процесса. */
export const register = async () => {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  await checkConnection();
};
