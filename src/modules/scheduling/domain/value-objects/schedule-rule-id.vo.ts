import { EntityId } from "@/shared/domain/entity-id";

export class ScheduleRuleId extends EntityId {
	private constructor(value: string) {
		super(value);
	}

	static create(value: string) {
		return new ScheduleRuleId(value);
	}
}
