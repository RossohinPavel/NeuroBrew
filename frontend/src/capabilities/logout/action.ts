"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as Session from "@/entities/session";


/** Удаляет токены сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(Session.Cookies.accessToken);
  cookieStore.delete(Session.Cookies.refreshToken);
  
  redirect("/");
};
