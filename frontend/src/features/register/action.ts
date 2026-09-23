"use server";

import { hash } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/common/db";
import { Cookies, JWT } from "@/entities/session";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;
  const username = formData.get("username") as string;
  if (password !== passwordConfirmation) {
    throw new Error("Пароли не совпадают");
  }
  const passwordHash = await hash(password);
  const user = await DB.auth.createUser({ email, passwordHash, username });
  if (!user) {
    throw new Error("Не удалось создать пользователя");
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
