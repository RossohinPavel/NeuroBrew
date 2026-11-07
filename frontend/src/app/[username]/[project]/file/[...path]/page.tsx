import { File } from "@/views/file";


export default function Page(props: PageProps<"/[username]/[project]/file/[...path]">) {
  return <File {...props} />;
}
