import { Suspense } from "react";
import { SessionGuard } from "@/entities/session";
import { LogoutForm } from "@/features/logout";


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
