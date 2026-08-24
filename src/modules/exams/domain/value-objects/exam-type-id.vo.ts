import { EntityId } from "@/shared/domain/entity-id";

export class ExamTypeId extends EntityId {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		return new ExamTypeId(value);
	}
}
