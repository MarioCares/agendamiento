import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidPatientRutError extends DomainError {
	constructor() {
		super("RUT del paciente inválido.");
	}
}
