import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "@/entities/session";
import { RegisterForm } from "@/features/register";


export const instant = false;

/** Показывает форму регистрации гостям и перенаправляет пользователей с сессией. */
export default async function Page() {
  const cookieStore = await cookies();
  const payload = getPayload(cookieStore);

  if (payload !== undefined) {
    redirect("/");
  }

  return (
    <main className="grid flex-1 place-items-center">
      <RegisterForm />
    </main>
  );
}
