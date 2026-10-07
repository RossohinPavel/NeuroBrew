import { Suspense } from "react";
import { LoginForm } from "@/features/login";
import { LoginGuard } from "./login-guard";


/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <Suspense fallback={null}>
        <LoginGuard>
          <LoginForm />
        </LoginGuard>
      </Suspense>
    </main>
  );
}
