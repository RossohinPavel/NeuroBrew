type Props = PageProps<"/[username]">;

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  return <main>{username}</main>;
}
