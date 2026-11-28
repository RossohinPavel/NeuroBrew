import { redirect } from "next/navigation";


export const instant = false;

/** Перенаправляет посетителя из раздела приложения на главную страницу. */
export default function App() {
  redirect("/");
}
