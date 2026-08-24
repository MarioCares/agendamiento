import type {
	AuditLogRepository,
	CreateAuditLogInput,
} from "@/shared/audit/audit-log.repository";

export class InMemoryAuditLogRepository implements AuditLogRepository {
	items: CreateAuditLogInput[] = [];

	async create(input: CreateAuditLogInput): Promise<void> {
		this.items.push(input);
	}
}
