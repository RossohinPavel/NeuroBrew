import { DB } from "@/common/db";


/** Проверяет подключение к базе данных до готовности серверного процесса. */
export const register = async () => {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  await DB.checkConnection();
};
