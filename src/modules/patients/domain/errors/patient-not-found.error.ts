import { ApplicationError } from "@/shared/domain/errors/application-error";

export class PatientNotFoundError extends ApplicationError {
	constructor() {
		super("Paciente no existe");
	}
}
