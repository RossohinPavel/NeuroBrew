import Link from "next/link";


/** Отображает навигацию для неавторизованного пользователя. */
export function UnauthenticatedTopBar() {
  return (
    <nav className="flex gap-4" aria-label="Основная навигация">
      <Link href="/login">Sign In</Link>
      <Link href="/register">Sign Up</Link>
    </nav>
  );
}
