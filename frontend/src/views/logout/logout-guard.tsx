import "server-only";

import { redirect } from "next/navigation";
import { isUserAuthenticated } from "@/entities/session";
import type { ReactNode } from "react";


/** Показывает содержимое страницы выхода только авторизованным пользователям. */
export async function LogoutGuard({ children }: { children: ReactNode }) {
  const session = await isUserAuthenticated();
  if (!session) {
    redirect("/");
  }
  return children;
}
