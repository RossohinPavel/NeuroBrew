import { loginAction } from "./action";

export function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  );
}
