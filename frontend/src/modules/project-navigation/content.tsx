"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/common/shadcn/ui/tabs";


/** Показывает ссылки на разделы проекта и выделяет текущий раздел. */
export function Content() {
  const { username, project } = useParams<{
    username: string;
    project: string;
  }>();
  const projectHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}`;

  return (
    <Tabs value={""}>
      <TabsList
        variant="line"
        aria-label="Навигация проекта"
        render={<nav />}
      >
        <TabsTrigger
          value=""
          nativeButton={false}
          render={<Link href={projectHref} />}
        >
          Files
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
