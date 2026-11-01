import { redirect } from "next/navigation";
import { Suspense } from "react";
import { canUseBackendAsUser } from "@/entities/session";
import { RegisterForm } from "@/features/register";


/** Для регистрации оптимистично считаем наличие токена поводом для перенаправления. */
async function Content() {
  const canUseBackend = await canUseBackendAsUser();

  if (canUseBackend) {
    redirect("/");
  }

  return <RegisterForm />;
}

/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
