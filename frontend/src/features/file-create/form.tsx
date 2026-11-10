"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { CreateFileRequestSchema, type CreateFileRequest } from "@shared/contracts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/shadcn/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn/ui/field";
import { Input } from "@/shared/shadcn/ui/input";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { fileCreateAction } from "./action";


type Props = {
  username: string;
  project: string;
};

/** Создает файл в выбранном проекте и возвращает к его странице после сохранения. */
export function FileCreateForm({ username, project }: Props) {
  const router = useRouter();

  const form = useForm<CreateFileRequest>({
    resolver: valibotResolver(CreateFileRequestSchema),
    defaultValues: {
      projectName: project,
      path: "",
      content: "",
    },
  });

  const onSubmit = async (formData: CreateFileRequest) => {
    const { success, error } = await fileCreateAction(formData);

    if (!success) {
      form.setError("root.server", {
        message: error.message,
        type: "server",
      });
      return;
    }

    router.push(`/${encodeURIComponent(username)}/${encodeURIComponent(project)}`);
  };

  return (
    <form
      autoComplete="off"
      className="flex min-h-0 flex-1 flex-col gap-4"
      onChange={() => form.clearErrors("root.server")}
      onSubmit={(event) => {
        void form.handleSubmit(onSubmit)(event);
      }}
    >
      <div className="flex items-center gap-3">
        <Link
          className="max-w-48 truncate font-medium"
          href={`/${encodeURIComponent(username)}/${encodeURIComponent(project)}`}
          title={project}
        >
          {project}
        </Link>
        <Controller
          control={form.control}
          name="path"
          render={({ field, fieldState }) => (
            <Field className="min-w-0 flex-1" data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only" htmlFor="file-create-path">Путь к файлу</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="file-create-path"
                placeholder="Путь к файлу"
                required
                type="text"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
      {form.formState.errors.root?.server && (
        <FieldError errors={[form.formState.errors.root.server]} />
      )}
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Field className="min-h-0 flex-1" data-invalid={fieldState.invalid}>
            <FieldLabel 
              className="sr-only" 
              htmlFor="file-create-content"
            >
              Содержимое файла
            </FieldLabel>
            <Textarea
              {...field}
              aria-invalid={fieldState.invalid}
              className="min-h-0 flex-1 resize-none field-sizing-fixed"
              id="file-create-content"
              placeholder="Содержимое файла"
              required
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </form>
  );
}
