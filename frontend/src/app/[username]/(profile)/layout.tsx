import { Suspense } from "react";
import { Separator } from "@/common/shadcn/ui/separator";
import {
  ProfileNavigation,
  ProfileNavigationSkeleton,
} from "@/modules/profile-navigation";


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
