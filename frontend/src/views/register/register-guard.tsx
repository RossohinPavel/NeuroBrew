import "server-only";

import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import * as Session from "@/entities/session";


/** Показывает содержимое страницы регистрации только неавторизованным пользователям. */
export async function RegisterGuard({ children }: { children: ReactNode }) {
  const session = await Session.get();
  if (session) {
    redirect("/");
  }
  return children;
}
