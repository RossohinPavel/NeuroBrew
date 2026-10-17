import { cacheLife } from "next/cache";
import { ChangelogCard } from "./changelog-card";


/** Представляет журнал изменений пользователя. */
export async function Changelog() {
  "use cache";
  cacheLife("hours");

  return null;
  
  // const entries = await listChangelog();
  // return (
  //   <ChangelogCard>
  //     <ul className="list-disc space-y-2 pl-4">
  //       {entries.map((entry) => (
  //         <li key={entry.id}>
  //           <span className="block">
  //             {entry.createdAt.toLocaleDateString("ru-RU")}
  //           </span>
  //           <span className="block">{entry.title}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   </ChangelogCard>
  // );
}
