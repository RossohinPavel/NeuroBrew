-- Связываем проекты с аккаунтами по email исходных владельцев.
UPDATE "registry"."project" AS project
SET "account_id" = account."id"
FROM "auth"."users" AS source
JOIN "users"."account" AS account ON account."email" = source."email"
WHERE project."user_id" = source."id";
