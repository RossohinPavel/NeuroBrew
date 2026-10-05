"use server";

import { createAuthRepository } from "@shared/database";
import { verify } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";


const { findUser } = createAuthRepository(DB);

/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await findUser({ email });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordValid = await verify(user.passwordHash, password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }
  const [accessToken, refreshToken] = await Promise.all([
    Session.createAccessToken({ userId: user.id }),
    Session.createRefreshToken({ userId: user.id }),
  ]);
  const cookieStore = await cookies();
  cookieStore.set({ ...Session.cookies.accessToken, value: accessToken });
  cookieStore.set({ ...Session.cookies.refreshToken, value: refreshToken });
  redirect("/");
};
