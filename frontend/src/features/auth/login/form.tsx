import { loginAction } from "./action";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  );
}
