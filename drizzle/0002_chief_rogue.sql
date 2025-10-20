ALTER TABLE "users" RENAME COLUMN "age" TO "active";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "points" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "photo" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordConfirm" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordChangedAt" date;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordResetToken" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordResetTokenExpires" date;--> statement-breakpoint
ALTER TABLE "words" ADD CONSTRAINT "words_base_form_unique" UNIQUE("base_form");