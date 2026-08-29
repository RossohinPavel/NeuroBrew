type Props = PageProps<"/[username]">;

export async function Profile({ params }: Props) {
  const { username } = await params;

  return <main>{username}</main>;
}
