import type { Database } from "@/shared/database/db";
import type {
	AuditLogRepository,
	CreateAuditLogInput,
} from "../audit-log.repository";
import { auditLogs } from "./audit-log.schema";

export class DrizzleAuditLogRepository implements AuditLogRepository {
	constructor(private readonly db: Database) {}

	async create(input: CreateAuditLogInput): Promise<void> {
		await this.db.insert(auditLogs).values({
			id: crypto.randomUUID(),
			entityType: input.entityType,
			entityId: input.entityId,
			action: input.action,
			before: input.before ?? null,
			after: input.after ?? null,
			userId: input.userId ?? null,
			createdAt: new Date(),
		});
	}
}
