"use server";

import { redirect } from "next/navigation";
import { DB } from "@/settings";
import { verifyPassword } from "../password";


/** Проверяет учетные данные и перенаправляет пользователя на главную страницу. */
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
  redirect("/");
};
