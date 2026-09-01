import { ApplicationError } from "@/shared/domain/errors/application-error";

export class ScheduleRuleOverlapError extends ApplicationError {
	constructor() {
		super("Schedule rule overlaps with an existing schedule");
	}
}
