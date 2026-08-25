CREATE TABLE "patients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"rut" text,
	"phone" text NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"birth_date" date,
	"notes" text DEFAULT '' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "patients_rut_unique" ON "patients" USING btree ("rut") WHERE "patients"."rut" is not null;