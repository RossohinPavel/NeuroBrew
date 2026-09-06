"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionCookie } from "../cookie";


/** Удаляет токены сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  new SessionCookie(cookieStore)
    .clearToken("access-token")
    .clearToken("refresh-token");
  redirect("/");
};
