"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as session from "@/entities/session";


/** Завершает сессию и возвращает пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  session.clear(cookieStore);

  redirect("/");
};
