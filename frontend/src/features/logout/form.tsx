import { logoutAction } from "./action";


/** Предоставляет форму выхода из аккаунта. */
export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <button type="submit">Выйти</button>
    </form>
  );
}
