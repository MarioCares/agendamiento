import { describe, expect, it } from "vitest";
import { InvalidExamTypeNameError } from "@/modules/exams/domain/errors/invalid-exam-type-name.error";
import { ExamTypeName } from "@/modules/exams/domain/value-objects/exam-name.entity";

describe("ExamTypeName", () => {
	it("should create a valid exam type name", () => {
		const name = ExamTypeName.create("Campo visual");

		expect(name.value).toBe("Campo visual");
	});

	it("should trim the exam type name", () => {
		const name = ExamTypeName.create("  Campo visual  ");

		expect(name.value).toBe("Campo visual");
	});

	it("should throw when name has less than 2 characters", () => {
		expect(() => ExamTypeName.create("A")).toThrow(InvalidExamTypeNameError);
	});

	it("should throw when name is empty", () => {
		expect(() => ExamTypeName.create("   ")).toThrow(InvalidExamTypeNameError);
	});
});
