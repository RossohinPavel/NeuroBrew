import { createProjectAction } from "./action";

/** Предоставляет форму создания проекта. */
export function CreateProjectForm() {
  return (
    <form id="form-create-project" action={createProjectAction}>
      <input
        name="name"
        type="text"
        placeholder="Название"
        required
      />
    </form>
  );
}
