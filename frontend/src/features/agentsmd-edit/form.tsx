type Props = {
  isAuthor: boolean;
  content: string;
};

/** Предоставляет форму редактирования AGENTS.md проекта. */
export function AgentsmdEditForm({ content }: Props) {
  return (
    <pre className="whitespace-pre-wrap break-words font-sans text-sm">
      {content}
    </pre>
  );
}
