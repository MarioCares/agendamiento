import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidPatientNameError extends DomainError {
	constructor() {
		super("El nombre del paciente debe tener al menos 2 caracteres.");
	}
}
