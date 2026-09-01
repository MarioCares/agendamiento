import type { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, time, timestamp } from "drizzle-orm/pg-core";

export const scheduleRules = pgTable("schedule_rules", {
	id: text("id").primaryKey(),
	dayOfWeek: text("day_of_week").notNull(),
	startTime: time("start_time", { withTimezone: false }).notNull(),
	endTime: time("end_time", { withTimezone: false }).notNull(),
	active: boolean("active").notNull().default(true),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export type ScheduleRuleRow = InferSelectModel<typeof scheduleRules>;
