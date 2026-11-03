import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/entities/session";
import { LoginForm } from "@/features/login";


/** Для входа оптимистично считаем наличие токена поводом для перенаправления. */
async function Content() {
  const session = await getSession();
  if (session !== undefined) {
    redirect("/");
  }
  return <LoginForm />;
}

/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
