import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeAlreadyExistsError } from "../../errors/exam-type-already-exists.error";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeName } from "../../value-objects/exam-name.entity";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { type CreateExamTypeInput } from "../dto/input-create-exam-type.dto";

export class CreateExamTypeUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
	) {}

	async execute(input: CreateExamTypeInput): Promise<ExamType> {
		const name = ExamTypeName.create(input.name);
		const existing = await this.examTypeRepository.findByName(name);
		
		if (existing) {
			throw new ExamTypeAlreadyExistsError();
		}

		const examType = ExamType.create({
			id: ExamTypeId.create(crypto.randomUUID()),
			name,
			durationMinutes: input.durationMinutes,
			description: input.description,
			instructions: input.instructions,
		});

		await this.examTypeRepository.create(examType);
		return examType;
	}
}