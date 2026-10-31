import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { me, getUser } from "@/common/api/generated/endpoints";
import { WITH_SESSION } from "@/entities/session";


/** Возвращает текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMeOrThrow = cache(async () => {
  const response = await me(WITH_SESSION);
  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user.");
  }
  return response.data;
});

/** Возвращает пользователя по логину или показывает страницу 404, если он не найден. */
export const getUserOr404 = cache(async (username: string) => {
  const response = await getUser({ username });
  if (response.status !== 200) {
    return notFound();
  }
  return response.data;
});
