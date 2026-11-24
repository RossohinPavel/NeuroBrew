import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getOrThrow } from "@/entities/session";
import { getProject, listProjects } from "@/shared/api/generated/endpoints";


/** Возвращает проекты текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMyProjectsOrThrow = cache(async () => {
  const { apiOptions } = await getOrThrow();
  const response = await listProjects({ mine: true }, apiOptions);
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
