export type AuditAction = "create" | "update" | "delete";

export type CreateAuditLogInput = {
	entityType: string;
	entityId: string;
	action: AuditAction;
	before?: unknown;
	after?: unknown;
	userId?: string;
};

export interface AuditLogRepository {
	create(input: CreateAuditLogInput): Promise<void>;
}
