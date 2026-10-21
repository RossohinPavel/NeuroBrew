import { Separator } from "@/common/shadcn/ui/separator";
import { ProfileNavigation } from "@/modules/profile-navigation";


export default function Layout(props: LayoutProps<"/[username]">) {
  return (
    <>
      <ProfileNavigation />
      <Separator />
      {props.children}
    </>
  );
}
