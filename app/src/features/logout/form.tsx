import { logoutAction } from "./action";


/** Предоставляет элемент управления выходом из аккаунта. */
export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">Выйти</button>
    </form>
  );
}
