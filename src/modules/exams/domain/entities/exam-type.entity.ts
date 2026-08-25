import { InvalidExamTypeDurationError } from "../errors/invalid-exam-type-duration.error";
import type { ExamTypeName } from "../value-objects/exam-name.vo";
import type { ExamTypeId } from "../value-objects/exam-type-id.vo";

export class ExamType {
	private constructor(
		public readonly id: ExamTypeId,
		private _name: ExamTypeName,
		private _durationMinutes: number,
		private _description: string,
		private _instructions: string,
		private _active: boolean,
	) {}

	static create(params: {
		id: ExamTypeId;
		name: ExamTypeName;
		durationMinutes: number;
		description?: string;
		instructions?: string;
		active?: boolean;
	}) {
		if (
			!Number.isInteger(params.durationMinutes) ||
			params.durationMinutes <= 0
		) {
			throw new InvalidExamTypeDurationError();
		}

		return new ExamType(
			params.id,
			params.name,
			params.durationMinutes,
			params.description?.trim() ?? "",
			params.instructions?.trim() ?? "",
			params.active ?? true,
		);
	}

	get name() {
		return this._name;
	}

	get durationMinutes() {
		return this._durationMinutes;
	}

	get description() {
		return this._description;
	}

	get instructions() {
		return this._instructions;
	}

	get active() {
		return this._active;
	}

	rename(name: ExamTypeName) {
		this._name = name;
	}

	changeDuration(durationMinutes: number) {
		if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
			throw new InvalidExamTypeDurationError();
		}

		this._durationMinutes = durationMinutes;
	}

	changeDescription(description?: string) {
		this._description = description?.trim() ?? "";
	}

	changeInstructions(instructions?: string) {
		this._instructions = instructions?.trim() ?? "";
	}

	activate() {
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}
}
