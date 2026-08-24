import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const auditLogs = pgTable("audit_logs", {
	id: text("id").primaryKey(),
	entityType: text("entity_type").notNull(),
	entityId: text("entity_id").notNull(),
	action: text("action").notNull(),
	before: jsonb("before"),
	after: jsonb("after"),
	userId: text("user_id"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
