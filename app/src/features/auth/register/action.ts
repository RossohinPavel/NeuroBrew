"use server";

import { redirect } from "next/navigation";
import { DB } from "@/common/db";
import { PWD } from "@/common/libs";
import { createSession } from "../service";


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
  await createSession({ userId: user.id });
  redirect("/");
};
