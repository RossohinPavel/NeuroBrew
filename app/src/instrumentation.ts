import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";


/** Подгружает переменные окружения из локального .env для разработки. */
const loadLocalEnv = () => {
  const localEnvPath = resolve(process.cwd(), "../.env");
  if (existsSync(localEnvPath)) {
    loadEnvFile(localEnvPath);
  }
};

/** Проверяет подключение к базе данных до готовности серверного процесса. */
const checkDatabaseConnection = async () => {
  const { DB } = await import("@/common/config/db");
  await DB.checkConnection();
};

export const register = async () => {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  loadLocalEnv();
  await checkDatabaseConnection();
};
