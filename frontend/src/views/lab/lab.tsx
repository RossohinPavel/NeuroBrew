import { Suspense } from "react";


/** Показывает лабораторию текущего пользователя. */
export function Lab() {
  return (
    <Suspense fallback={null}>
      <LabContent />
    </Suspense>
  );
}

async function LabContent() {
  return null;
  // const user = await requireCurrentUser();
  // const projects = await listProjects({ userId: user.id });
  // return (
  //   <div className="flex flex-1 flex-col gap-2">
  //     <p>{user.username}/lab</p>
  //     <p>Проекты:</p>
  //     <ul>
  //       {projects.map((project) => (
  //         <li key={project.id}>{project.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
