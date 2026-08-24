import { describe, expect, it } from "vitest";
import { InMemoryExamTypeRepository } from "../../repositories/in-memory-exam-type.repository";
import { CreateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/create-exam-type.use-case";
import { ListExamTypesUseCase } from "@/modules/exams/domain/application/use-cases/list-exam-types.use-case";

describe("ListExamTypesUseCase", () => {
	it("should list exam types", async () => {
		const repository = new InMemoryExamTypeRepository();

		const createUseCase = new CreateExamTypeUseCase(repository);

		await createUseCase.execute({
			name: "Campo visual",
			durationMinutes: 30,
		});

		await createUseCase.execute({
			name: "OCT",
			durationMinutes: 20,
		});

		const useCase = new ListExamTypesUseCase(repository);

		const result = await useCase.execute();

		expect(result).toHaveLength(2);
	});
});
