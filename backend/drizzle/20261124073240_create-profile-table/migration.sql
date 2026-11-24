CREATE TABLE "users"."profile" (
	"user_id" integer PRIMARY KEY,
	"username" varchar(64) NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "users"."profile" ADD CONSTRAINT "profile_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE CASCADE;