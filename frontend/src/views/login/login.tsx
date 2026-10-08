import { Suspense } from "react";
import { LoginForm } from "@/features/login";
import { LoginGuard } from "./login-guard";


/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <div className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <LoginGuard>
          <LoginForm />
        </LoginGuard>
      </Suspense>
    </div>
  );
}
