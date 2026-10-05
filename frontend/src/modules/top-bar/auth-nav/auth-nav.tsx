import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { DB } from "@/common/db-connection";
import { LinkButton } from "../link-button";
import styles from "./auth-nav.module.css";


const { findUser } = createAuthRepository(DB);


type Props = {
  userId: number;
};

/** Отображает навигацию для авторизованного пользователя. */
export async function AuthenticatedNavigation({ userId }: Props) {
  const user = await findUser({ id: userId });
  if (user === undefined) {
    notFound();
  }
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
