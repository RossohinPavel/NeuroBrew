import "server-only";

import { redirect } from "next/navigation";
import * as Session from "@/entities/session";
import type { ReactNode } from "react";


/** Показывает содержимое страницы регистрации только неавторизованным пользователям. */
export async function RegisterGuard({ children }: { children: ReactNode }) {
  const session = await Session.get();
  if (session) {
    redirect("/");
  }
  return children;
}
