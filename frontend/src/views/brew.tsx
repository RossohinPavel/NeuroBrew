type Props = PageProps<"/[username]/brew">;

/** Показывает раздел Brew пользователя. */
export async function Brew({ params }: Props) {
  const { username } = await params;
  return <main>{username}/brew</main>;
}
