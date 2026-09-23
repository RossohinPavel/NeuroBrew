import { Profile } from "@/views/profile";


type Props = PageProps<"/[username]">;

export default function Route(props: Props) {
  return <Profile {...props} />;
}
