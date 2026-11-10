import { Suspense } from "react";
import { SessionGuard } from "@/components/session-guard";
import { LoginForm } from "@/features/login";


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
