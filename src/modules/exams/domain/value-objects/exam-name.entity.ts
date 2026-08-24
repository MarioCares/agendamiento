import { InvalidExamTypeNameError } from "../errors/invalid-exam-type-name.error";

export class ExamTypeName {
	private constructor(public readonly value: string) {}

	static create(value: string) {
		const normalized = value.trim();

		if (normalized.length < 2) {
			throw new InvalidExamTypeNameError();
		}

		return new ExamTypeName(normalized);
	}

	get normalizedValue() {
		return this.value.toLocaleLowerCase();
	}
}