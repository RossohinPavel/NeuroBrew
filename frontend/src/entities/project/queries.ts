import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getSessionOrThrow } from "@/entities/session";
import { getProject, listProjects } from "@/shared/api/generated/endpoints";


/** Возвращает проекты текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMyProjectsOrThrow = cache(async () => {
  const session = await getSessionOrThrow();
  const response = await listProjects({ mine: true }, session);
  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user's projects.");
  }
  return response.data;
});

/** Возвращает проект пользователя по логину и названию или показывает страницу 404. */
export const getProjectByNameOr404 = cache(async (username: string, projectName: string) => {
  const response = await getProject({ username, name: projectName });
  if (response.status !== 200) {
    return notFound();
  }
  return response.data;
});

/** Возвращает проекты пользователя по логину или показывает страницу 404 при неудачном запросе. */
export const getProjectsOr404 = cache(async (username: string) => {
  const response = await listProjects({ username });
  if (response.status !== 200) {
    return notFound();
  }
  return response.data;
});
