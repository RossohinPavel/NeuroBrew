"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DB } from "@/settings";
import { SessionCookie } from "../cookie";
import { Token } from "../jwt";
import { verifyPassword } from "../password";


/** Проверяет учетные данные и завершает аутентификацию пользователя. */
export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await DB.auth.getUserByEmail(email);
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordValid = await verifyPassword(user.passwordHash, password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
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
