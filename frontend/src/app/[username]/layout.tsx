import { TopBar } from "@/modules/top-bar";


/** Сохраняет общую верхнюю панель для профиля пользователя и его проектов. */
export default function Layout(props: LayoutProps<"/[username]">) {
  return (
    <>
      <TopBar />
      {props.children}
    </>
  );
}
