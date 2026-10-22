import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getAgentsmd } from "@/common/api/generated/endpoints";


/** Возвращает AGENTS.md проекта или показывает страницу 404, если документ не найден. */
export const getAgentsmdOr404 = cache(async (projectId: number) => {
  const response = await getAgentsmd(projectId);

  if (response.status === 404) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error("Failed to load the project's AGENTS.md.");
  }

  return response.data;
});
