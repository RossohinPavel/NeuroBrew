import "server-only";

import { redirect } from "next/navigation";
import { canUseBackendAsUser } from "@/entities/session";
import type { ReactNode } from "react";


/** Показывает страницу создания проекта, если пользователь может работать с бэкендом от своего имени. */
export async function NewGuard({ children }: { children: ReactNode }) {
  const canUseBackend = await canUseBackendAsUser();

  if (!canUseBackend) {
    redirect("/login");
  }

  return children;
}
