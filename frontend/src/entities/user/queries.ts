import "server-only";

import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";


const { findUser } = createAuthRepository(DB);


/** Возвращает найденного пользователя или отвечает страницей 404. */
export const getUserOr404 = cache(async (username: string) => {
  const user = await findUser({ username });
  if (user === undefined) {
    notFound();
  }
  return user;
});
