import { ApplicationError } from "@/shared/domain/errors/application-error";

export class ScheduleRuleNotFoundError extends ApplicationError {
	constructor() {
		super("Schedule rule not found");
	}
}
