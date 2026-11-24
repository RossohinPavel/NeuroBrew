import "server-only";

import { cache } from "react";
import * as session from "@/entities/session";
import { me } from "@/shared/api/generated/endpoints";


/** Возвращает текущего пользователя, если он авторизован. */
export const getCurrentUser = cache(async () => {
  const { payload, apiOptions } = await session.get();

  if (payload === undefined) {
    return undefined;
  }

  const response = await me(apiOptions);

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
