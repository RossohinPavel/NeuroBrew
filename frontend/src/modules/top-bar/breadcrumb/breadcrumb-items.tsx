"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/shadcn/ui/breadcrumb";


/** Показывает первые два уровня текущего пути после ссылки на главную. */
export function BreadcrumbItems() {
  const pathname = usePathname();
  // Намеренно не используем encodeURIComponent и decodeURIComponent:
  // имена профиля и проекта допускают только латинские буквы, цифры и дефис.
  const segments = pathname.split("/").filter(Boolean).slice(0, 2);
  const segmentedPath = "/" + segments.join("/");

  return (
    <>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        return (
          <Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Item
                href={href}
                label={segment}
                isCurrent={href === segmentedPath}
              />
            </BreadcrumbItem>
          </Fragment>
        );
      })}
    </>
  );
}


/** Показывает текущий уровень текстом, а остальные уровни — ссылками. */
function Item(props: { href: string; label: string; isCurrent: boolean }) {
  if (props.isCurrent) {
    return <BreadcrumbPage>{props.label}</BreadcrumbPage>;
  }

  return (
    <BreadcrumbLink render={<Link href={props.href} />}>
      {props.label}
    </BreadcrumbLink>
  );
}
