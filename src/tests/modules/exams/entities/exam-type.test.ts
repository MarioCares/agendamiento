import { describe, expect, it } from "vitest";
import { ExamType } from "@/modules/exams/domain/entities/exam-type.entity";
import { InvalidExamTypeDurationError } from "@/modules/exams/domain/errors/invalid-exam-type-duration.error";
import { ExamTypeName } from "@/modules/exams/domain/value-objects/exam-name.vo";
import { ExamTypeId } from "@/modules/exams/domain/value-objects/exam-type-id.vo";

function makeExamType() {
	return ExamType.create({
		id: ExamTypeId.create("exam-1"),
		name: ExamTypeName.create("Campo visual"),
		durationMinutes: 30,
	});
}

describe("ExamType", () => {
	it("should create an active exam type by default", () => {
		const examType = makeExamType();

		expect(examType.active).toBe(true);
	});

	it("should normalize optional text fields", () => {
		const examType = ExamType.create({
			id: ExamTypeId.create("exam-1"),
			name: ExamTypeName.create("Campo visual"),
			durationMinutes: 30,
			description: "  Descripción  ",
			instructions: "  Traer lentes  ",
		});

		expect(examType.description).toBe("Descripción");
		expect(examType.instructions).toBe("Traer lentes");
	});

	it("should reject a zero duration", () => {
		expect(() =>
			ExamType.create({
				id: ExamTypeId.create("exam-1"),
				name: ExamTypeName.create("Campo visual"),
				durationMinutes: 0,
			}),
		).toThrow(InvalidExamTypeDurationError);
	});

	it("should reject a negative duration", () => {
		expect(() =>
			ExamType.create({
				id: ExamTypeId.create("exam-1"),
				name: ExamTypeName.create("Campo visual"),
				durationMinutes: -10,
			}),
		).toThrow(InvalidExamTypeDurationError);
	});

	it("should reject a non integer duration", () => {
		expect(() =>
			ExamType.create({
				id: ExamTypeId.create("exam-1"),
				name: ExamTypeName.create("Campo visual"),
				durationMinutes: 10.5,
			}),
		).toThrow(InvalidExamTypeDurationError);
	});

	it("should change duration", () => {
		const examType = makeExamType();

		examType.changeDuration(45);

		expect(examType.durationMinutes).toBe(45);
	});

	it("should deactivate an exam type", () => {
		const examType = makeExamType();

		examType.deactivate();

		expect(examType.active).toBe(false);
	});

	it("should activate an exam type", () => {
		const examType = ExamType.create({
			id: ExamTypeId.create("exam-1"),
			name: ExamTypeName.create("Campo visual"),
			durationMinutes: 30,
			active: false,
		});

		examType.activate();

		expect(examType.active).toBe(true);
	});
});
