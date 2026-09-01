import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidTimeOfDayError extends DomainError {
	constructor() {
		super("El tiempo debe usar el formato HH:mm");
	}
}
