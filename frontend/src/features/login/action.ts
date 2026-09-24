"use server";

import { verify } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/common/db";
import { Cookies, JWT } from "@/entities/session";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await DB.auth.searchUser({ email });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordValid = await verify(user.passwordHash, password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }
  const [accessToken, refreshToken] = await Promise.all([
    JWT.create("access", { userId: user.id }),
    JWT.create("refresh", { userId: user.id }),
  ]);
  const cookieStore = await cookies();
  cookieStore.set({ ...Cookies.accessToken, value: accessToken });
  cookieStore.set({ ...Cookies.refreshToken, value: refreshToken });
  redirect("/");
};
