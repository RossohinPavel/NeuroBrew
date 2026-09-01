"use server";

import { redirect } from "next/navigation";
import { DB } from "@/settings";
import { hashPassword } from "../password";


/** Создает пользователя и перенаправляет его на главную страницу. */
export const registerAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;
  const username = formData.get("username") as string;
  if (password !== passwordConfirmation) {
    throw new Error("Пароли не совпадают");
  }
  const passwordHash = await hashPassword(password);
  await DB.auth.createUser({ email, passwordHash, username });
  redirect("/");
};
