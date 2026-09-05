"use server";

import { redirect } from "next/navigation";
import { DB } from "@/settings";
import { verifyPassword } from "../password";
import { createAuthSession } from "../service";


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
  await createAuthSession({ sub: user.id.toString() });
  redirect("/");
};
