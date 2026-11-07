import { Suspense } from "react";
import { LogoutForm } from "@/features/logout";
import { SessionGuard } from "@/modules/session-guard";

/** Представляет страницу выхода из аккаунта. */
export default function Logout() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <SessionGuard>
          <LogoutForm />
        </SessionGuard>
      </Suspense>
    </main>
  );
}
