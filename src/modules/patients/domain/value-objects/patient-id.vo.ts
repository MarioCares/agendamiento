import { EntityId } from "@/shared/domain/entity-id";

export class PatientId extends EntityId {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		return new PatientId(value);
	}
}
