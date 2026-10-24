import "server-only";

import { cache } from "react";


/** Возвращает заглушку AGENTS.md проекта до восстановления API загрузки документа. */
export const getAgentsmdOr404 = cache(async (projectId: number) => {
  console.warn("getAgentsmdOr404: нужно заменить заглушку вызовом API-метода.");

  return {
    id: 0,
    projectId,
    content: "Загрузка AGENTS.md временно недоступна.",
  };
});
