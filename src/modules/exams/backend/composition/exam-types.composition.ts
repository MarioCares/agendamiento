import { Database } from "@/shared/database/db";
import { DrizzleExamTypeRepository } from "../repositories/drizzle-exam-type.repository";
import { ListExamTypesUseCase } from "../../domain/application/use-cases/list-exam-types.use-case";
import { CreateExamTypeUseCase } from "../../domain/application/use-cases/create-exam-type.use-case";
import { DrizzleAuditLogRepository } from "@/shared/audit/persistence/drizzle-audit-log.repository";
import { UpdateExamTypeUseCase } from "../../domain/application/use-cases/update-exam-type.use-case";
import { SetExamTypeActiveUseCase } from "../../domain/application/use-cases/set-exam-type-active.use-case";

export function examTypeComposition(db: Database) {
    const examTypeRepository = new DrizzleExamTypeRepository(db);
    const auditLogRepository = new DrizzleAuditLogRepository(db);

    return {
        listExamTypesUseCase: new ListExamTypesUseCase(examTypeRepository),
        createExamTypeUseCase: new CreateExamTypeUseCase(examTypeRepository, auditLogRepository),
        updateExamTypeUseCase: new UpdateExamTypeUseCase(examTypeRepository, auditLogRepository),
        setExamTypeActiveUseCase: new SetExamTypeActiveUseCase(examTypeRepository, auditLogRepository)
    }
}