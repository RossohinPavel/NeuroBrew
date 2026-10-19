import { Separator } from "@/common/shadcn/ui/separator";
import { ProfileNavigation } from "@/modules/profile-navigation";
import { TopBar } from "@/modules/top-bar";


export default function Layout(props: LayoutProps<"/[username]">) {
  return (
    <>
      <TopBar />
      <ProfileNavigation />
      <Separator />
      {props.children}
    </>
  );
}
