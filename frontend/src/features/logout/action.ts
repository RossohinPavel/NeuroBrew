"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as Session from "@/entities/session";


/** Удаляет cookie сессии и перенаправляет пользователя на главную страницу. */
export const logoutAction = async () => {
  const cookieStore = await cookies();
  Session.clear(cookieStore);

  redirect("/");
};
