import "server-only";

import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";


const { findUser } = createAuthRepository(DB);


export const getSessionUser = cache(async () => {
  const session = await Session.get();
  if (session) {
    const user = await findUser({ id: session.userId });
    if (user) {
      return user;
    }
  }
  notFound();
});

export const getUserByNameOr404 = cache(async (username: string) => {
  const user = await findUser({ username });
  if (user) {
    return user;
  }
  notFound();
});
