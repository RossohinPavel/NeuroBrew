import "server-only";

import { hash, verify } from "argon2";


/** Вычисляет безопасный хеш пароля для хранения в базе данных. */
export const hashPassword = (pwd: string) => hash(pwd);

/** Проверяет, соответствует ли пароль сохраненному хешу. */
export const verifyPassword = (hash: string, pwd: string) => verify(hash, pwd);
