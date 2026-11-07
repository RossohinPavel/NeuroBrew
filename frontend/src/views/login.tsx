import { Suspense } from "react";
import { LoginForm } from "@/capabilities/login";
import { SessionGuard } from "@/blocks/session-guard";


/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <SessionGuard guestOnly redirectTo="/">
          <LoginForm />
        </SessionGuard>
      </Suspense>
    </main>
  );
}
