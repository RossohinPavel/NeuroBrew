export const register = async () => {
  // Выполняет инициализацию только в среде Node.js.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  // Проверяет подключение к базе данных до готовности серверного процесса.
  const { DB } = await import("@/settings");
  await DB.checkConnection();
};
