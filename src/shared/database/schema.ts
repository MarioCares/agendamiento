import * as authSchema from "@modules/identity/backend/database/schema/auth.schema";
import * as examTypeSchema from "@/modules/exams/domain/infrastructure/persistence/exam-types.schema";
import * as auditSchema from "@/shared/audit/persistence/audit-log.schema";

export const schema = {
	...authSchema,
	...examTypeSchema,
	...auditSchema
};
