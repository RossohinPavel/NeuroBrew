import { Suspense } from "react";
import { RegisterForm } from "@/capabilities/register";
import { SessionGuard } from "@/blocks/session-guard";


/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <SessionGuard guestOnly redirectTo="/">
          <RegisterForm />
        </SessionGuard>
      </Suspense>
    </main>
  );
}
