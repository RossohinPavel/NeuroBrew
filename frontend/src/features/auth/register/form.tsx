import { registerAction } from "./action";


/** Предоставляет форму создания нового аккаунта. */
export function RegisterForm() {
  return (
    <form action={registerAction}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Пароль" required />
      <input name="username" type="text" placeholder="Имя пользователя" required />
      <button type="submit">Создать аккаунт</button>
    </form>
  );
}
