import "server-only";

import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";


const { findUser } = createAuthRepository(DB);


/** Возвращает пользователя по идентификатору. */
export const getUserById = cache((id: number) => findUser({ id }));


/** Возвращает пользователя по идентификатору или отвечает страницей 404. */
export const getUserByIdOr404 = cache(async (id: number) => {
  const user = await getUserById(id);
  if (user === undefined) {
    notFound();
  }
  return user;
});


/** Возвращает найденного пользователя или отвечает страницей 404. */
export const getUserOr404 = cache(async (username: string) => {
  const user = await findUser({ username });
  if (user === undefined) {
    notFound();
  }
  return user;
});
