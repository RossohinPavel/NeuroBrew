import Link from "next/link";
import { Button } from "@/common/shadcn/ui/button";


/** Показывает проекты пользователя. */
export function Projects() {
  return (
    <div className="flex items-center justify-between">
      <div>Projects</div>
      <Button nativeButton={false} render={<Link href="/new" />}>
        New
      </Button>
    </div>
  );
}
