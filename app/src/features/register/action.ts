"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/common/db";
import { PWD } from "@/common/libs";
import { CookieConf, createToken } from "@/entities/session";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;
  const username = formData.get("username") as string;
  if (password !== passwordConfirmation) {
    throw new Error("Пароли не совпадают");
  }
  const passwordHash = await PWD.hash(password);
  const user = await DB.auth.createUser({ email, passwordHash, username });
  if (!user) {
    throw new Error("Не удалось создать пользователя");
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
