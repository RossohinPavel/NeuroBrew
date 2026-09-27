import { createProjectAction } from "./action";


/** Предоставляет форму создания проекта. */
export function CreateProjectForm() {
  return (
    <form action={createProjectAction}>
      <input
        name="name"
        type="text"
        placeholder="Название"
        required
      />
      <button type="submit">Создать проект</button>
    </form>
  );
}
