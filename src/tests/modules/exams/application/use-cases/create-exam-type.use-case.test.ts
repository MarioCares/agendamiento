import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryExamTypeRepository } from "../../repositories/in-memory-exam-type.repository";
import { CreateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/create-exam-type.use-case";
import { ExamTypeAlreadyExistsError } from "@/modules/exams/domain/errors/exam-type-already-exists.error";

describe("CreateExamTypeUseCase", () => {
	let repository: InMemoryExamTypeRepository;
	let useCase: CreateExamTypeUseCase;

	beforeEach(() => {
		repository = new InMemoryExamTypeRepository();
		useCase = new CreateExamTypeUseCase(repository);
	});

	it("should create an exam type", async () => {
		const result = await useCase.execute({
			name: "Campo visual",
			durationMinutes: 30,
			description: "Evaluación del campo visual",
		});

		expect(repository.items).toHaveLength(1);
		expect(result.name.value).toBe("Campo visual");
		expect(result.durationMinutes).toBe(30);
		expect(result.active).toBe(true);
	});

	it("should not create duplicated exam type names", async () => {
		await useCase.execute({
			name: "Campo visual",
			durationMinutes: 30,
		});

		await expect(
			useCase.execute({
				name: "Campo visual",
				durationMinutes: 45,
			}),
		).rejects.toBeInstanceOf(ExamTypeAlreadyExistsError);

		expect(repository.items).toHaveLength(1);
	});
});