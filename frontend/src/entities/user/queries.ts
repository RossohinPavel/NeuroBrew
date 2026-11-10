import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";
import { getSession } from "@/entities/session";
import { me, getUser } from "@/shared/api/generated/endpoints";


/** Возвращает текущего пользователя, если он авторизован. */
export const getMe = cache(async () => {
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
export const getMeOrThrow = async () => {
  const user = await getMe();

  if (user === undefined) {
    throw new Error("Failed to load the authenticated user.");
  }
  return user;
};

/** Возвращает пользователя по логину или показывает страницу 404, если он не найден. */
export const getUserOr404 = cache(async (username: string) => {
  const response = await getUser({ username });
  if (response.status !== 200) {
    return notFound();
  }
  return response.data;
});
