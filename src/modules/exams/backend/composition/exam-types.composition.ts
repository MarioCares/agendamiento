import { DrizzleAuditLogRepository } from "@/shared/audit/persistence/drizzle-audit-log.repository";
import type { Database } from "@/shared/database/db";
import { CreateExamTypeUseCase } from "../../domain/application/use-cases/create-exam-type.use-case";
import { ListExamTypesUseCase } from "../../domain/application/use-cases/list-exam-types.use-case";
import { SetExamTypeActiveUseCase } from "../../domain/application/use-cases/set-exam-type-active.use-case";
import { UpdateExamTypeUseCase } from "../../domain/application/use-cases/update-exam-type.use-case";
import { DrizzleExamTypeRepository } from "../../domain/infrastructure/persistence/drizzle-exam-type.repository";

export function examTypeComposition(db: Database) {
	const examTypeRepository = new DrizzleExamTypeRepository(db);
	const auditLogRepository = new DrizzleAuditLogRepository(db);

	return {
		listExamTypesUseCase: new ListExamTypesUseCase(examTypeRepository),
		createExamTypeUseCase: new CreateExamTypeUseCase(
			examTypeRepository,
			auditLogRepository,
		),
		updateExamTypeUseCase: new UpdateExamTypeUseCase(
			examTypeRepository,
			auditLogRepository,
		),
		setExamTypeActiveUseCase: new SetExamTypeActiveUseCase(
			examTypeRepository,
			auditLogRepository,
		),
	};
}
