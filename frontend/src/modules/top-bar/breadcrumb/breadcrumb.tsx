import Link from "next/link";
import { Suspense } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/common/shadcn/ui/breadcrumb";
import { BreadcrumbItems } from "./breadcrumb-items";


/** Показывает логотип и загружает элементы навигации по текущему пути. */
export function TopBarBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>
            <NeuroBrewLogo
              width={188}
              height={28}
              aria-label="NeuroBrew"
            />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <Suspense fallback={null}>
          <BreadcrumbItems />
        </Suspense>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
