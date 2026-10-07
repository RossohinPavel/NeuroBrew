import { Suspense } from "react";
import { LogoutForm } from "@/features/logout";
import { LogoutGuard } from "./logout-guard";


/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <Suspense fallback={null}>
        <LogoutGuard>
          <LogoutForm />
        </LogoutGuard>
      </Suspense>
    </main>
  );
}
