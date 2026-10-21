import "server-only";

import { redirect } from "next/navigation";
import { isUserAuthenticated } from "@/entities/session";
import type { ReactNode } from "react";


/** Показывает страницу создания проекта только авторизованным пользователям. */
export async function NewGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = await isUserAuthenticated();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return children;
}
