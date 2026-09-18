"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/common/db";
import { PWD } from "@/common/libs";
import { CookieConf, createToken } from "@/entities/session";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await DB.auth.getUserByEmail(email);
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordValid = await PWD.verify(user.passwordHash, password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }
  const [accessToken, refreshToken] = await Promise.all([
    createToken("access", { userId: user.id }),
    createToken("refresh", { userId: user.id }),
  ]);
  const cookieStore = await cookies();
  cookieStore.set({ ...CookieConf.accessToken, value: accessToken });
  cookieStore.set({ ...CookieConf.refreshToken, value: refreshToken });
  redirect("/");
};
