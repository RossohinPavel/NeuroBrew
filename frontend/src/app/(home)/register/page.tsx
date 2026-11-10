import { Suspense } from "react";
import { SessionGuard } from "@/components/session-guard";
import { RegisterForm } from "@/features/register";


/** Представляет страницу регистрации аккаунта. */
export default function Register() {
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
