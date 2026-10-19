import { Suspense } from "react";
import { getUserOr404 } from "@/entities/user";


type Props = {
  username: string;
};

/** Показывает обзор профиля после загрузки данных. */
export function Overview(props: Props) {
  return (
    <Suspense fallback={null}>
      <Content {...props} />
    </Suspense>
  );
}

/** Загружает и показывает сведения о пользователе. */
async function Content({ username }: Props) {
  const user = await getUserOr404(username);

  return (
    <dl className="space-y-4 p-6 text-sm">
      <div>
        <dt className="text-muted-foreground">Логин</dt>
        <dd className="break-words">{user.username}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Email</dt>
        <dd className="break-words">{user.email}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Дата создания</dt>
        <dd>
          <time dateTime={user.createdAt}>
            {new Date(user.createdAt).toLocaleDateString("ru-RU")}
          </time>
        </dd>
      </div>
    </dl>
  );
}
