import { RegisterForm } from "@/features/register";


/** Представляет страницу регистрации аккаунта. */
export function Register() {
  return (
    <main className="grid min-h-[calc(100svh-49px)] place-items-center">
      <RegisterForm />
    </main>
  );
}
