"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionCookie as SC } from "../service";


/** Удаляет токены сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SC.accessToken.name, path: SC.accessToken.path });
  cookieStore.delete({ name: SC.refreshToken.name, path: SC.refreshToken.path });
  redirect("/");
};
