type Props = PageProps<"/[username]">;

/** Представляет профиль пользователя из параметров маршрута. */
export async function Profile({ params }: Props) {
  const { username } = await params;

  return <main>{username}</main>;
}
