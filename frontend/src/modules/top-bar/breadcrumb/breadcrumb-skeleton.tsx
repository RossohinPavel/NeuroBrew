import Link from "next/link";
import type { ReactNode } from "react";
import NeuroBrewLogo from "@/common/assets/NeuroBrew.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/common/shadcn/ui/breadcrumb";


type Props = {
  children?: ReactNode;
};

/** Показывает логотип и переданные элементы хлебных крошек. */
export function TopBarBreadcrumbSkeleton({ children }: Props) {
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
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
