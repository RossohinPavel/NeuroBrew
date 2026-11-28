import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "@/entities/session";
import { LogoutForm } from "@/features/logout";


export const instant = false;

/** Показывает подтверждение выхода пользователям с сессией. */
export default async function Page() {
  const cookieStore = await cookies();
  const payload = getPayload(cookieStore);

  if (payload === undefined) {
    redirect("/app/login");
  }

  return (
    <main className="grid flex-1 place-items-center">
      <LogoutForm />
    </main>
  );
}
