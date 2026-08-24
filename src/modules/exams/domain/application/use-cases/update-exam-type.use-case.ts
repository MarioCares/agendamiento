import { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeAlreadyExistsError } from "../../errors/exam-type-already-exists.error";
import { ExamTypeNotFoundError } from "../../errors/exam-type-not-found.error";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeName } from "../../value-objects/exam-name.entity";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { UpdateExamTypeInput } from "../../../backend/dto/input-update-exam-type.dto";

export class UpdateExamTypeUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
		private readonly auditLogRepository: AuditLogRepository
	) {}

	async execute(input: UpdateExamTypeInput): Promise<ExamType> {
		const id = ExamTypeId.create(input.id);
		const examType = await this.examTypeRepository.findById(id);

		if (!examType) {
			throw new ExamTypeNotFoundError();
		}

		const before = {
			name: examType.name.value,
			durationMinutes: examType.durationMinutes,
			description: examType.description,
			instructions: examType.instructions,
			active: examType.active,
		};

		const name = ExamTypeName.create(input.name);
		const existing = await this.examTypeRepository.findByName(name);

		if (existing && existing.id.value !== examType.id.value) {
			throw new ExamTypeAlreadyExistsError();
		}

		examType.rename(name);
		examType.changeDuration(input.durationMinutes);
		examType.changeDescription(input.description);
		examType.changeInstructions(input.instructions);

		await this.examTypeRepository.update(examType);

		await this.auditLogRepository.create({
			entityType: "exam_type",
			entityId: examType.id.value,
			action: "update",
			userId: input.actorId,
			before,
			after: {
				name: examType.name.value,
				durationMinutes: examType.durationMinutes,
				description: examType.description,
				instructions: examType.instructions,
				active: examType.active,
			},
		});
		
		return examType;
	}
}