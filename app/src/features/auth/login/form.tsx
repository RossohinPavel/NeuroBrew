import { loginAction } from "./action";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {
  return (
    <form action={loginAction} style={{ display: "grid", justifyItems: "start" }}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <label htmlFor="password">Пароль</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        required
      />
      <button type="submit">Войти</button>
    </form>
  );
}
