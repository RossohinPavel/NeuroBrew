import "server-only";

import { redirect } from "next/navigation";
import { get } from "./session";
import type { ReactNode } from "react";


type SessionGuardProps = {
  redirectTo?: string;
  guestOnly?: boolean;
  children?: ReactNode;
};

/** Показывает содержимое при подходящем состоянии сессии или перенаправляет пользователя. */
export async function SessionGuard({
  redirectTo = "/app/login",
  guestOnly = false,
  children,
}: SessionGuardProps) {
  const { payload } = await get();

  if ((payload !== undefined) === guestOnly) {
    redirect(redirectTo);
  }

  return children;
}
