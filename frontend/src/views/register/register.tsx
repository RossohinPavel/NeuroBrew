import { RegisterForm } from "@/features/register";

import styles from "./register.module.css";

/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Регистрация</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
