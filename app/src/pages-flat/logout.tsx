import { LogoutButton } from "@/features/auth";


/** Представляет страницу выхода из аккаунта. */
export function Logout() {
  return (
    <main>
      <h1>Выход</h1>
      <LogoutButton />
    </main>
  );
}
