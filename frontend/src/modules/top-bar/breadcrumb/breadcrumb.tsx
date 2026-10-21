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
import { TopBarBreadcrumbSkeleton } from "./breadcrumb-skeleton";


/** Показывает ссылку на главную и первые два уровня текущего пути. */
export function TopBarBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(0, 2);

  return (
    <TopBarBreadcrumbSkeleton>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = decodeURIComponent(segment);

        return (
          <Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {href === pathname ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={href} />}>
                  {label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        );
      })}
    </TopBarBreadcrumbSkeleton>
  );
}
