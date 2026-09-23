import "server-only";

import { hash as argonHash, verify as argonVerify } from "argon2";


/** Создаёт хеш переданного пароля. */
export const hash = (password: string) => argonHash(password);

/** Проверяет соответствие пароля сохранённому хешу. */
export const verify = (hash: string, password: string) => argonVerify(hash, password);
