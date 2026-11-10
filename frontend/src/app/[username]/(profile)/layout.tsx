import { Suspense } from "react";
import {
  ProfileNavigation,
  ProfileNavigationSkeleton,
} from "@/components/profile-navigation";
import { Separator } from "@/shared/shadcn/ui/separator";


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
