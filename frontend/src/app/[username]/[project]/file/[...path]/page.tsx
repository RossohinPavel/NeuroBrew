import { FilePage } from "@/views/file-page";


export default function Page(props: PageProps<"/[username]/[project]/file/[...path]">) {
  return <FilePage {...props} />;
}
