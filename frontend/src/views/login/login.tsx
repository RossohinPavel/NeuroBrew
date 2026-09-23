import { LoginForm } from "@/features/login";

import styles from "./login.module.css";


/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Вход</h1>
        <LoginForm />
      </div>
    </main>
  );
}
