import { LogoutForm } from "@/features/logout";


/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <main>
      <h1>Выход</h1>
      <LogoutForm />
    </main>
  );
}
