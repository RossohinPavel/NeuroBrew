import { ProfileNavigation } from "@/modules/profile-navigation";
import { TopBar } from "@/modules/top-bar";


export default function Layout({ children }: LayoutProps<"/[username]">) {
  return (
    <>
      <TopBar>
        <ProfileNavigation />
      </TopBar>
      {children}
    </>
  );
}
