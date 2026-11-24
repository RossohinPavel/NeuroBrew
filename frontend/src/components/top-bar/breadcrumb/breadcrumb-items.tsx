"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/shadcn/ui/breadcrumb";


/** Показывает первые два уровня текущего пути после ссылки на главную. */
export function BreadcrumbItems() {
  const pathname = usePathname();
  // Намеренно не используем encodeURIComponent и decodeURIComponent:
  // имена профиля и проекта допускают только латинские буквы, цифры и дефис.
  const segments = pathname
    .split("/")
    .filter(s => Boolean(s) && s !== 'app')
    .slice(0, 2);

  const segmentedPath = "/" + segments.join("/");

  return (
    <>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isCurrent = href === segmentedPath;

        return (
          <Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {
                isCurrent
                  ? <BreadcrumbPage>{segment}</BreadcrumbPage>
                  : <BreadcrumbLink render={<Link href={href} />}>{segment}</BreadcrumbLink>
              }
            </BreadcrumbItem>
          </Fragment>
        );
      })}
    </>
  );
}
