import { ApplicationError } from "@/shared/domain/errors/application-error";

export class PatientAlreadyExistsError extends ApplicationError {
	constructor() {
		super("El paciente ya existe");
	}
}
