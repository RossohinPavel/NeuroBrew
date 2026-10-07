import { LogoutForm } from "@/features/logout";


/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <LogoutForm />
    </main>
  );
}
