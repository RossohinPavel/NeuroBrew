import { Project } from "@/pages-flat/project";


type Props = PageProps<"/[username]/[project]">;

export default function Route(props: Props) {
  return <Project {...props} />;
}
