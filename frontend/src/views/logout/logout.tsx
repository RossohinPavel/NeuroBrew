import { redirect } from "next/navigation";
import { Suspense } from "react";
import { canUseBackendAsUser } from "@/entities/session";
import { LogoutForm } from "@/features/logout";


/** Для выхода оптимистично считаем наличие токена достаточным признаком сессии. */
async function Content() {
  const canUseBackend = await canUseBackendAsUser();

  if (!canUseBackend) {
    redirect("/");
  }
  return <LogoutForm />;
}

/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <main className="grid flex-1 place-items-center">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
