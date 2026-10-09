import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn/ui/dialog";
import { CreateProjectForm } from "./form";


/** Открывает форму создания проекта в диалоговом окне. */
export function CreateProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Создать проект</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание проекта</DialogTitle>
          <DialogDescription>
            Введите название нового проекта.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm />
        <DialogFooter>
          <DialogClose
            render={<Button type="button" variant="outline">Отмена</Button>}
          />
          <Button type="submit" form="form-create-project">
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
