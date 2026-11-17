import "server-only";

import { cache } from "react";
import { getSession } from "@/entities/session";
import { me } from "@/shared/api/generated/endpoints";


/** Возвращает текущего пользователя, если он авторизован. */
export const getCurrentUser = cache(async () => {
  const session = await getSession();

  if (session === undefined) {
    return undefined;
  }

  const response = await me(session);

  if (response.status !== 200) {
    return undefined;
  }

  return response.data;
});

/** Возвращает текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getCurrentUserOrThrow = async () => {
  const user = await getCurrentUser();

  if (user === undefined) {
    throw new Error("Failed to load the authenticated user.");
  }

  return user;
};
