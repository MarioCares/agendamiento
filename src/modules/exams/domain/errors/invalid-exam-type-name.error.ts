import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidExamTypeNameError extends DomainError {
	constructor() {
		super("El nombre del tipo de examen debe tener al menos 2 caracteres");
	}
}
