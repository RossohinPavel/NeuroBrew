"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { RiArrowRightSLine, RiFileTextLine, RiFolderLine } from "@remixicon/react";
import Link from "next/link";
import type { ListFiles200Item } from "@/shared/api/generated/models";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/shadcn/ui/sidebar";


/** Показывает файлы одного типа в раскрывающейся папке сайдбара. */
function FileFolder({ title, files, projectHref }: {
  title: string;
  files: ListFiles200Item[];
  projectHref: string;
}) {
  return (
    <Collapsible.Root className="group/collapsible" render={<SidebarMenuItem />}>
      <Collapsible.Trigger render={<SidebarMenuButton />}>
        <RiFolderLine aria-hidden="true" />
        <span>{title}</span>
        <RiArrowRightSLine
          aria-hidden="true"
          className="ml-auto transition-transform duration-20 group-data-open/collapsible:rotate-90"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <SidebarMenuSub>
          {files.map((file) => (
            <SidebarMenuSubItem key={file.id}>
              <SidebarMenuSubButton
                render={<Link href={`${projectHref}/file/${encodeURIComponent(file.name)}`} />}
              >
                <RiFileTextLine aria-hidden="true" />
                <span>{file.name}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

/** Распределяет плоский список файлов по типам и показывает папки правил и скилов. */
export function FileSidebarContent({ files, username, project }: {
  files: ListFiles200Item[];
  username: string;
  project: string;
}) {
  const projectHref = `/${encodeURIComponent(username)}/${encodeURIComponent(project)}`;
  const filesByType: Record<ListFiles200Item["type"], ListFiles200Item[]> = {
    agentsmd: [],
    rule: [],
    skill: [],
  };

  for (const file of files) {
    filesByType[file.type].push(file);
  }

  return (
    <>
      {filesByType.rule.length > 0 && (
        <FileFolder
          files={filesByType.rule}
          title="Правила"
          projectHref={projectHref}
        />
      )}
      {filesByType.skill.length > 0 && (
        <FileFolder
          files={filesByType.skill}
          title="Скилы"
          projectHref={projectHref}
        />
      )}
      {filesByType.agentsmd.map((file) => (
        <SidebarMenuItem key={file.id}>
          <SidebarMenuButton
            render={<Link href={`${projectHref}/file/${encodeURIComponent(file.name)}`} />}
          >
            <RiFileTextLine aria-hidden="true" />
            <span>{file.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
