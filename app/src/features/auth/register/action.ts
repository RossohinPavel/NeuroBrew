"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/settings";
import { SessionCookie } from "../cookie";
import { Token } from "../jwt";
import { hashPassword } from "../password";


/** Создает пользователя и завершает его аутентификацию. */
export const registerAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;
  const username = formData.get("username") as string;
  if (password !== passwordConfirmation) {
    throw new Error("Пароли не совпадают");
  }
  const passwordHash = await hashPassword(password);
  const user = await DB.auth.createUser({ email, passwordHash, username });
  if (!user) {
    throw new Error("Не удалось создать пользователя");
  }
  const payload = { userId: user.id };
  const [accessToken, refreshToken] = await Promise.all([
    new Token("access").create(payload),
    new Token("refresh").create(payload),
  ]);
  const cookieStore = await cookies();
  new SessionCookie(cookieStore)
    .setToken("access-token", accessToken.getToken())
    .setToken("refresh-token", refreshToken.getToken());
  redirect("/");
};
