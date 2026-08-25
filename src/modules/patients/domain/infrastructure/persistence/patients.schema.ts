import { sql } from "drizzle-orm";
import {
	boolean,
	date,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const patients = pgTable(
	"patients",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		rut: text("rut"),
		phone: text("phone").notNull(),
		email: text("email").notNull().default(""),
		birthDate: date("birth_date", { mode: "date" }),
		notes: text("notes").notNull().default(""),
		active: boolean("active").notNull().default(true),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		uniqueIndex("patients_rut_unique")
			.on(table.rut)
			.where(sql`${table.rut} is not null`),
	],
);
