import { Payload } from "@/entities/session";
import { Dashboard } from "@/views/dashboard";
import { Landing } from "@/views/landing";


/** Показывает посадочную страницу гостю и дашборд авторизованному пользователю. */
export default async function Page() {
  const payload = await Payload.readFromHeaders();
  if (payload === null) {
    return <Landing />;
  }
  return <Dashboard />;
}
