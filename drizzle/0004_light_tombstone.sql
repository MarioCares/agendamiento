CREATE TABLE "exam_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"instructions" text DEFAULT '' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "exam_types_name_unique" ON "exam_types" USING btree (lower("name"));