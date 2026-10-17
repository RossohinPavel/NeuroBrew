import "server-only";

import { cache } from "react";
import { me } from "@/common/api/generated/endpoints";
import { withSession } from "@/entities/session";


const getMe = withSession(me);


/** Возвращает текущего пользователя или выбрасывает ошибку при неудачном запросе. */
export const getMeOrThrow = cache(async () => {
  const response = await getMe();

  if (response.status !== 200) {
    throw new Error("Failed to load the authenticated user.");
  }

  return response.data;
});
