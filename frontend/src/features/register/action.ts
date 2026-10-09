"use server";

import { createAuthRepository } from "@shared/database";
import { hash } from "argon2";
import { cookies } from "next/headers";
import * as v from "valibot";
import { DB } from "@/common/db-connection";
import { ExpectedActionError, safeAction } from "@/common/safe-action";
import * as Session from "@/entities/session";
import { RegisterDataSchema, type RegisterData } from "./schema";


const { createUser } = createAuthRepository(DB);

/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = safeAction(async (data: RegisterData) => {
  const { email, password, username } = await v.parseAsync(RegisterDataSchema, data);
  const passwordHash = await hash(password);
  const user = await createUser({ email, passwordHash, username });
  if (!user) {
    throw new ExpectedActionError("Не удалось создать пользователя.");
  }
  const [accessToken, refreshToken] = await Promise.all([
    Session.createAccessToken({ userId: user.id }),
    Session.createRefreshToken({ userId: user.id }),
  ]);
  const cookieStore = await cookies();
  cookieStore.set({ ...Session.cookies.accessToken, value: accessToken });
  cookieStore.set({ ...Session.cookies.refreshToken, value: refreshToken });
  return true;
});
