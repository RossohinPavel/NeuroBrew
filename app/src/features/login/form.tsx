import { loginAction } from "./action";
import styles from "./form.module.css";


/** Предоставляет форму входа в аккаунт по электронной почте и паролю. */
export function LoginForm() {
  return (
    <form action={loginAction} className={styles.form}>
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
