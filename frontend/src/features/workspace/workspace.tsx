import { Bookmarks } from "@/features/bookmarks";
import { Editor } from "@/features/editor";
import { FileTree } from "@/features/file-tree";

export function Workspace() {
  return (
    <main>
      <FileTree />
      <Bookmarks />
      <Editor />
    </main>
  );
}
