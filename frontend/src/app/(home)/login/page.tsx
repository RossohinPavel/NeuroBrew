import { Suspense } from "react";
import { LoginForm } from "@/features/login";
import { SessionGuard } from "@/modules/session-guard";

/** Представляет страницу входа в аккаунт. */
export default function Login() {
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
