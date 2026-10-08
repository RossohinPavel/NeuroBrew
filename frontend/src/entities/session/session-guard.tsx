import "server-only";

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { get } from "./session";
import type { SuspenseProps } from "react";


/** Предоставляет границу для содержимого, доступного в рамках пользовательской сессии. */
export function SessionGuard({ children, ...props }: SuspenseProps) {
  return (
    <Suspense {...props}>
      <SessionGuardContent>{children}</SessionGuardContent>
    </Suspense>
  );
}

/** Показывает содержимое только при наличии подтверждённой пользовательской сессии. */
async function SessionGuardContent({ children }: Pick<SuspenseProps, "children">) {
  const session = await get();
  if (!session) {
    redirect("/login");
  }
  return children;
}
