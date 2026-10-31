import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getAgentsmd } from "@/common/api/generated/endpoints";


/** Возвращает AGENTS.md проекта по логину и названию или показывает страницу 404. */
export const getAgentsmdOr404 = cache(async (username: string, projectName: string) => {
  const response = await getAgentsmd({
    username,
    projectName,
  });
  if (response.status !== 200) {
    return notFound();
  }

  return response.data;
});
