import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "@/entities/session";
import { LoginForm } from "@/features/login";


export const instant = false;

/** Показывает форму входа гостям и перенаправляет пользователей с сессией. */
export default async function Page() {
  const cookieStore = await cookies();
  const payload = getPayload(cookieStore);

  if (payload !== undefined) {
    redirect("/");
  }

  return (
    <main className="grid flex-1 place-items-center">
      <LoginForm />
    </main>
  );
}
