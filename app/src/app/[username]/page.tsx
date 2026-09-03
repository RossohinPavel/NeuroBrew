import { Profile } from "@/pages-flat/profile";


type Props = PageProps<"/[username]">;

export default function Route(props: Props) {
  return <Profile {...props} />;
}
