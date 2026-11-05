import "server-only";

import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";
import type { ReactNode } from "react";


type SessionGuardProps = {
  redirectTo?: string;
  guestOnly?: boolean;
  children?: ReactNode;
};

/** Показывает содержимое при подходящем состоянии сессии или перенаправляет пользователя. */
export async function SessionGuard({
  redirectTo = "/login",
  guestOnly = false,
  children,
}: SessionGuardProps) {
  const session = await getSession();
  
  if (Boolean(session) === guestOnly) {
    redirect(redirectTo);
  }
  return children;
}
