"use client";

import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/common/shadcn/ui/tabs";


/** Показывает ссылки на разделы проекта и выделяет текущий раздел. */
export function Content() {
  const { username, project } = useParams<{
    username: string;
    project: string;
  }>();
  const activeSegment = useSelectedLayoutSegment() ?? "";
  const projectHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}`;

  return (
    <Tabs value={activeSegment}>
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
          About
        </TabsTrigger>
        <TabsTrigger
          value="agents"
          nativeButton={false}
          render={<Link href={`${projectHref}/agents`} />}
        >
          AGENTS
        </TabsTrigger>
        <TabsTrigger
          value="rules"
          nativeButton={false}
          render={<Link href={`${projectHref}/rules`} />}
        >
          Rules
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          nativeButton={false}
          render={<Link href={`${projectHref}/skills`} />}
        >
          Skills
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
