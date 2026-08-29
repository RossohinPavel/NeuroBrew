import { Profile } from "@/pages/profile";


type Props = PageProps<"/[username]">;

export default function Route(props: Props) {
  return <Profile {...props} />;
}
