"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionCookie } from "../service";


/** Удаляет токены сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: SessionCookie.accessToken.name,
    path: SessionCookie.accessToken.path,
  });
  cookieStore.delete({
    name: SessionCookie.refreshToken.name,
    path: SessionCookie.refreshToken.path,
  });
  redirect("/");
};
