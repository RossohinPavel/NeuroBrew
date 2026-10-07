import { LoginForm } from "@/features/login";


/** Представляет страницу входа в аккаунт. */
export function Login() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <LoginForm />
    </main>
  );
}
