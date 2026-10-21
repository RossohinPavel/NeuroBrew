import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getMyProjects, getProjects } from "@/common/api/generated/endpoints";
import { withSession } from "@/entities/session";


const getMyProjectsWithSession = withSession(getMyProjects);


/** Возвращает проекты текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMyProjectsOrThrow = cache(async () => {
  const response = await getMyProjectsWithSession();

  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user's projects.");
  }

  return response.data;
});

/** Возвращает проекты пользователя по логину или показывает страницу 404 при неудачном запросе. */
export const getProjectsOrThrow = cache(async (username: string) => {
  const response = await getProjects({ username });

  if (response.status !== 200) {
    notFound();
  }

  return response.data;
});
