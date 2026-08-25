import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidPatientPhoneError extends DomainError {
	constructor() {
		super("El teléfono del paciente es necesario");
	}
}
