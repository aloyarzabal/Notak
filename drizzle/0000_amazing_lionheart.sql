CREATE TABLE "conjugations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid NOT NULL,
	"person" text NOT NULL,
	"tense" text NOT NULL,
	"aspect" text,
	"form" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "declensions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word_id" uuid NOT NULL,
	"case" text NOT NULL,
	"number" text NOT NULL,
	"form" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"base_form" text NOT NULL,
	"type" text NOT NULL,
	"gender" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "conjugations" ADD CONSTRAINT "conjugations_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "declensions" ADD CONSTRAINT "declensions_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;