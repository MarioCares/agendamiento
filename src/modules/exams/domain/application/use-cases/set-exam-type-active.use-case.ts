import { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeNotFoundError } from "../../errors/exam-type-not-found.error";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { SetExamTypeActiveInput } from "../../../backend/dto/input-set-exam-type-active.dto";

export class SetExamTypeActiveUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
		private readonly auditLogRepository: AuditLogRepository
	) {}

	async execute(input: SetExamTypeActiveInput): Promise<ExamType> {
		const id = ExamTypeId.create(input.id);
		const examType = await this.examTypeRepository.findById(id);

		if (!examType) {
			throw new ExamTypeNotFoundError();
		}

		const before = {
			active: examType.active,
		};

		if (input.active) {
			examType.activate();
		} else {
			examType.deactivate();
		}

		await this.examTypeRepository.update(examType);

		await this.auditLogRepository.create({
			entityType: "exam_type",
			entityId: examType.id.value,
			action: "update",
			userId: input.actorId,
			before,
			after: {
				active: examType.active,
			},
		});
		return examType;
	}
}