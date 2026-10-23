-- Переносим данные для входа и дату регистрации; идентификаторы аккаунтов генерируются автоматически.
INSERT INTO "users"."account" ("email", "password_hash", "created_at")
SELECT "email", "password_hash", "created_at"
FROM "auth"."users";

--> statement-breakpoint
-- Связываем профили с новыми аккаунтами по уникальному email.
INSERT INTO "users"."profile" ("account_id", "username")
SELECT account."id", source."username"
FROM "auth"."users" AS source
JOIN "users"."account" AS account ON account."email" = source."email";
