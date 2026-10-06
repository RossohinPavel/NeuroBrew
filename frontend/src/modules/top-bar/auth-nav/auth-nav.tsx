import { getSessionUser } from "@/entities/user";
import { LinkButton } from "../link-button";
import styles from "./auth-nav.module.css";


/** Отображает навигацию для авторизованного пользователя. */
export async function AuthenticatedNavigation() {
  const user = await getSessionUser();
  return (
    <nav
      className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-1"
      aria-label="Основная навигация"
    >
      <span className={`${styles.username} col-start-2`}>{user.username}</span>
      <LinkButton className="justify-self-end" href="/logout" title="Log Out" />
    </nav>
  );
}
