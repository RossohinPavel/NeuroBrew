import { RiStarLine } from "@remixicon/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProjects } from "@/shared/api/generated/endpoints";
import { Button } from "@/shared/shadcn/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/shared/shadcn/ui/item";
import { buildUriPath } from "@/shared/utils";
import type { ComponentProps } from "react";


/** Загружает проекты пользователя и показывает ссылки на них. */
export async function UserProjects({
  username,
  ...props
}: ComponentProps<typeof ItemGroup> & {
  username: string;
}) {
  "use cache: remote";

  const response = await listProjects({ username });

  if (response.status !== 200) {
    return notFound();
  }

  return (
    <ItemGroup {...props}>
      {response.data.map((project) => (
        <Item
          key={project.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start py-0"
        >
          <ItemContent className="min-w-0">
            <ItemTitle className="text-xl font-bold">
              <Link href={buildUriPath(username, project.name)}>
                {project.name}
              </Link>
            </ItemTitle>
            {project.description && (
              <ItemDescription className="text-base">
                {project.description}
              </ItemDescription>
            )}
            <time className="mt-1 text-muted-foreground text-sm" dateTime={project.updatedAt}>
              Обновлено: {new Date(project.updatedAt).toLocaleDateString("ru-RU")}
            </time>
          </ItemContent>
          <ItemActions className="self-start">
            <Button disabled type="button" variant="outline">
              <RiStarLine aria-hidden="true" />
              Star
            </Button>
          </ItemActions>
          <ItemSeparator className="col-span-full mt-3 mb-1.5" />
        </Item>
      ))}
    </ItemGroup>
  );
}
