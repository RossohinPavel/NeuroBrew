import { redirect } from "next/navigation";


/** Перенаправляет посетителя из раздела приложения на главную страницу. */
export default function App() {
  redirect("/");
}
