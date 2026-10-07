"use server";

import { createAuthRepository } from "@shared/database";
import { verify } from "argon2";
import { cookies } from "next/headers";
import * as v from "valibot";
import { DB } from "@/common/db-connection";
import { ExpectedActionError, safeAction } from "@/common/lib/safe-action";
import * as Session from "@/entities/session";
import { LoginFormData, LoginFormSchema } from "./schema";


const { findUser } = createAuthRepository(DB);

/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = safeAction(async (formData: LoginFormData) => {
  const { email, password } = await v.parseAsync(LoginFormSchema, formData);
  const user = await findUser({ email });
  if (!user) {
    throw new ExpectedActionError("Неверный емейл или пароль.");
  }
  const isPasswordValid = await verify(user.passwordHash, password);
  if (!isPasswordValid) {
    throw new ExpectedActionError("Неверный емейл или пароль.");
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
