import Link from "next/link";
import styles from "./link-button.module.css";


type Props = {
  title: string;
  href: string;
  className?: string;
  isCurrent?: boolean;
};

/** Отображает ссылку, оформленную как кнопка верхней панели. */
export function LinkButton({ title, href, className, isCurrent }: Props) {
  return (
    <Link
      href={href}
      className={`${styles.link} rounded-control text-text-muted ${className ?? ""}`}
      aria-current={isCurrent ? "page" : undefined}
    >
      <span className="select-none">{title}</span>
    </Link>
  );
}
