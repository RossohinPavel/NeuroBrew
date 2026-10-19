"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/common/shadcn/ui/tabs";


const tabs = ["projects"];


export function Content() {
  const { username } = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tab && tabs.includes(tab) ? tab : "overview";

  return (
    <Tabs value={activeTab}>
      <TabsList
        variant="line"
        aria-label="Навигация профиля"
        render={<nav />}
      >
        <TabsTrigger
          value="overview"
          nativeButton={false}
          render={<Link href={`/${encodeURIComponent(username)}`} />}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          nativeButton={false}
          render={<Link href="?tab=projects" />}
        >
          Projects
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
