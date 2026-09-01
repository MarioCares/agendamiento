import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidScheduleRangeError extends DomainError {
	constructor() {
		super("La agenda debe tener un inicio y término");
	}
}
