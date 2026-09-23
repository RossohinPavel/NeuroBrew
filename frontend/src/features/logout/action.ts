"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Cookies } from "@/entities/session";


/** Удаляет токены сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(Cookies.accessToken);
  cookieStore.delete(Cookies.refreshToken);
  redirect("/");
};
