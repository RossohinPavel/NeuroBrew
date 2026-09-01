import { registerAction } from "./action";


/** Предоставляет форму создания нового аккаунта. */
export function RegisterForm() {
  return (
    <form action={registerAction} style={{ display: "grid", justifyItems: "start" }}>
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
      <label htmlFor="passwordConfirmation">Повторите пароль</label>
      <input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        placeholder="Повторите пароль"
        required
      />
      <label htmlFor="username">Имя пользователя</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Имя пользователя"
        required
      />
      <button type="submit">Создать аккаунт</button>
    </form>
  );
}
