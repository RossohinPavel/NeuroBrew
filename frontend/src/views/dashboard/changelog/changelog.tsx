import { listChangelog } from "@/common/api/generated/endpoints";
import { ChangelogCard } from "./changelog-card";


/** Представляет журнал изменений пользователя. */
export async function Changelog() {
  const response = await listChangelog();

  if (response.status !== 200) {
    throw new Error("Failed to load the changelog.");
  }

  return (
    <ChangelogCard>
      <ul className="list-disc space-y-2 pl-4">
        {response.data.map((entry) => (
          <li key={entry.id}>
            <span className="block">
              {new Date(entry.createdAt).toLocaleDateString("ru-RU")}
            </span>
            <span className="block">{entry.title}</span>
          </li>
        ))}
      </ul>
    </ChangelogCard>
  );
}
