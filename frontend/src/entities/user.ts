import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getUser } from "@/shared/api/generated/endpoints";


/** Возвращает пользователя по логину или показывает страницу 404, если он не найден. */
export const getUserOr404 = cache(async (username: string) => {
  const response = await getUser({ username });

  if (response.status !== 200) {
    return notFound();
  }

  return response.data;
});
