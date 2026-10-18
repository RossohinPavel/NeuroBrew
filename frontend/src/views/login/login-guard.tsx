import "server-only";

import { redirect } from "next/navigation";
import { isUserAuthenticated } from "@/entities/session";
import type { ReactNode } from "react";


/** Показывает содержимое страницы входа только неавторизованным пользователям. */
export async function LoginGuard({ children }: { children: ReactNode }) {
  const session = await isUserAuthenticated();
  if (session) {
    redirect("/");
  }
  return children;
}
