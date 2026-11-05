import "server-only";

import { Collapsible } from "@base-ui/react/collapsible";
import { RiArrowRightSLine, RiFileLine, RiFolderLine } from "@remixicon/react";
import { listFiles } from "@/common/api/generated/endpoints";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/common/shadcn/ui/sidebar";
import type { FileSidebarParams } from "./types";


interface FileTree {
  [name: string]: FileTree | undefined;
}

/** Отображает файл или папку вместе с вложенными элементами. */
function Tree({ name, children }: { name: string; children?: FileTree }) {
  if (children === undefined) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton>
          <RiFileLine />
          {name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible.Root className="group/collapsible">
        <Collapsible.Trigger
          render={(
            <SidebarMenuButton>
              <RiArrowRightSLine 
                className="transition-transform group-data-open/collapsible:rotate-90" 
              />
              <RiFolderLine />
              {name}
            </SidebarMenuButton>
          )}
        />
        <Collapsible.Panel>
          <SidebarMenuSub className="mr-0 pr-0">
            {Object.entries(children).map(([childName, child]) => (
              <Tree key={childName} name={childName}>{child}</Tree>
            ))}
          </SidebarMenuSub>
        </Collapsible.Panel>
      </Collapsible.Root>
    </SidebarMenuItem>
  );
}

/** Загружает файлы проекта и отображает их как дерево папок и файлов. */
export async function FileSidebarContent({ params }: { params: FileSidebarParams }) {
  const { username, project: projectName } = await params;
  const { data, status } = await listFiles({ username, projectName });

  if (status !== 200) {
    throw new Error("Failed to load the project's files.");
  }

  const tree: FileTree = {};

  data
    .map(({ path }) => path.split("/"))
    .sort((left, right) => right.length - left.length)
    .forEach((dirs) => {
      const file = dirs.pop()!;
      let branch = tree;

      for (const name of dirs) {
        const folder = branch[name] ??= {};
        branch = folder;
      }

      branch[file] = undefined;
    });

  return (
    <SidebarMenu>
      {Object.entries(tree).map(([name, children]) => (
        <Tree key={name} name={name}>{children}</Tree>
      ))}
    </SidebarMenu>
  );
}
