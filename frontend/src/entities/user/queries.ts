import "server-only";

import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";


const { findUser } = createAuthRepository(DB);


export const requireSessionUser = cache(async () => {
  const session = await Session.require();
  const user = await findUser({ id: session.userId });
  if (!user) {
    throw new Error("Internal Server Error");
  }
  return user;
});

export const getUserByNameOr404 = cache(async (username: string) => {
  const user = await findUser({ username });
  if (user) {
    return user;
  }
  notFound();
});
