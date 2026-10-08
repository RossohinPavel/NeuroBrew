import { createMetadataRepository } from "@shared/database";
import { cacheLife } from "next/cache";
import { DB } from "@/common/db-connection";
import { ChangelogCard } from "./changelog-card";


const { listChangelog } = createMetadataRepository(DB);


/** Представляет журнал изменений пользователя. */
export async function Changelog() {
  "use cache";
  cacheLife("hours");
  
  const entries = await listChangelog();
  return (
    <ChangelogCard>
      <ul className="list-disc space-y-2 pl-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="block">
              {entry.createdAt.toLocaleDateString("ru-RU")}
            </span>
            <span className="block">{entry.title}</span>
          </li>
        ))}
      </ul>
    </ChangelogCard>
  );
}
