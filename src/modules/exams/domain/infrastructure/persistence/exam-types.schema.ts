import { sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const examTypes = pgTable(
	"exam_types",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		durationMinutes: integer("duration_minutes").notNull(),
		description: text("description").notNull().default(""),
		instructions: text("instructions").notNull().default(""),
		active: boolean("active").notNull().default(true),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		uniqueIndex("exam_types_name_unique").on(sql`lower(${table.name})`),
	],
);
