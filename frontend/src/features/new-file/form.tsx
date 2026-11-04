type Props = {
  username: string;
  project: string;
};

/** Принимает владельца и проект для формы создания файла. */
export function NewFileForm(_props: Props) {
  return (
    <form>
      <p>Здесь будет форма создания файла.</p>
    </form>
  );
}
