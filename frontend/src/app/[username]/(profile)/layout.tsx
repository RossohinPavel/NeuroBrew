import { Suspense } from "react";
import { Separator } from "@/shared/shadcn/ui/separator";
import {
  ProfileNavigation,
  ProfileNavigationSkeleton,
} from "@/blocks/profile-navigation";


export default function Layout(props: LayoutProps<"/[username]">) {
  return (
    <>
      <Suspense fallback={<ProfileNavigationSkeleton />}>
        <ProfileNavigation />
      </Suspense>
      <Separator />
      {props.children}
    </>
  );
}
