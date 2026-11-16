import { cacheLife } from "next/cache";
import { listChangelog } from "@/shared/api/generated/endpoints";
import type { ComponentProps } from "react";


/** Представляет список записей журнала изменений. */
export async function ChangelogList(props: ComponentProps<"ul">) {
  "use cache";

  cacheLife("hours");

  const response = await listChangelog();

  if (response.status !== 200) {
    throw new Error("Failed to load the changelog.");
  }

  return (
    <ul {...props}>
      {response.data.map((entry) => (
        <li key={entry.id}>
          <span className="block">
            {new Date(entry.createdAt).toLocaleDateString("ru-RU")}
          </span>
          <span className="block">{entry.title}</span>
        </li>
      ))}
    </ul>
  );
}
