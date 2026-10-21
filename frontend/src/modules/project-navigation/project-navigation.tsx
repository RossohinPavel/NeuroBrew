import { Suspense } from "react";
import { Content } from "./content";
import { Skeleton } from "./skeleton";


/** Отображает навигацию проекта. */
export function ProjectNavigation() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Content />
    </Suspense>
  );
}
