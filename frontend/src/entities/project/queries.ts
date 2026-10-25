import "server-only";

import { cache } from "react";
import { getMyProjects } from "@/common/api/generated/endpoints";
import type { GetProjects200Item } from "@/common/api/generated/models";
import { WITH_SESSION } from "@/entities/session";


/** Возвращает проекты текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMyProjectsOrThrow = cache(async () => {
  const response = await getMyProjects(undefined, WITH_SESSION);
  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user's projects.");
  }
  return response.data;
});

/** Возвращает заглушку проекта с указанным названием до восстановления поиска через API. */
export const getProjectByNameOr404 = cache(async (name: string) => {
  console.warn("getProjectByNameOr404: нужно заменить заглушку вызовом API-метода.");

  return {
    id: 0,
    accountId: 0,
    name,
    createdAt: "1970-01-01T00:00:00.000Z",
  };
});

/** Возвращает пустой список до восстановления API поиска проектов по логину. */
export const getProjectsOr404 = cache(async (_username: string): Promise<GetProjects200Item[]> => {
  console.warn("getProjectsOr404: нужно заменить заглушку вызовом API-метода.");

  return [];
});
