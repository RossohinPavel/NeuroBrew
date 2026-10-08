import { Suspense } from "react";
import { LogoutForm } from "@/features/logout";
import { LogoutGuard } from "./logout-guard";


/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <div className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <LogoutGuard>
          <LogoutForm />
        </LogoutGuard>
      </Suspense>
    </div>
  );
}
