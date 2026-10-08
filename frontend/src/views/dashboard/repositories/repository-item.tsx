import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/common/components/ui/item";


interface Props {
  projectName: string;
  username: string;
}

/** Предоставляет ссылку на репозиторий пользователя. */
export function RepositoryItem({ projectName, username }: Props) {
  const href = `/${encodeURIComponent(username)}/${encodeURIComponent(projectName)}`;
  return (
    <Item
      render={(
        <Link href={href} />
      )}
      size="sm"
      variant="outline"
    >
      <ItemContent>
        <ItemTitle>{projectName}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <RiArrowRightSLine aria-hidden="true" className="size-4" />
      </ItemActions>
    </Item>
  );
}
