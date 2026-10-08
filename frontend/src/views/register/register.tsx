import { Suspense } from "react";
import { RegisterForm } from "@/features/register";
import { RegisterGuard } from "./register-guard";


/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <div className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <RegisterGuard>
          <RegisterForm />
        </RegisterGuard>
      </Suspense>
    </div>
  );
}
