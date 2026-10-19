import { Suspense } from "react";
import { Content } from "./content";
import { Skeleton } from "./skeleton";


/** Отображает навигацию по обзору профиля и проектам в виде вкладок. */
export function ProfileNavigation() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Content />
    </Suspense>
  );
}
