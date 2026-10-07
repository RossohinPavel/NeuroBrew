import { Suspense } from "react";
import { RegisterForm } from "@/features/register";
import { RegisterGuard } from "./register-guard";


/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <Suspense fallback={null}>
        <RegisterGuard>
          <RegisterForm />
        </RegisterGuard>
      </Suspense>
    </main>
  );
}
