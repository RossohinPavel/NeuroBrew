import "server-only";

import { createAuthRepository } from "@shared/database";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";


const { findUser, findUserId } = createAuthRepository(DB);

/** Возвращает пользователя с указанным идентификатором, если он существует. */
const getUserById = async (id: number) => {
  "use cache";
  cacheTag(`user:${id}`);
  cacheLife("hours");
  return findUser({ id });
};

/** Возвращает идентификатор пользователя с указанным именем, если он существует. */
const getUserIdByUsername = async (username: string) => {
  "use cache";
  cacheTag(`user:${username}`);
  cacheLife("hours");
  return findUserId({ username });
};

export const requireCurrentUser = cache(async () => {
  const session = await Session.require();
  const user = await getUserById(session.userId);
  if (!user) {
    throw new Error("Internal Server Error");
  }
  return user;
});

/** Возвращает пользователя с указанным именем или отвечает страницей 404. */
export const requireUser = cache(async (username: string) => {
  const userId = await getUserIdByUsername(username);
  if (userId === undefined) {
    notFound();
  }
  const user = await getUserById(userId);
  if (user === undefined) {
    notFound();
  }
  return user;
});
