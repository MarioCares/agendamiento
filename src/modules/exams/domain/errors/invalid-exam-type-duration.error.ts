import { DomainError } from "@/shared/domain/errors/domain-error";

export class InvalidExamTypeDurationError extends DomainError {
	constructor() {
		super("La duración del tipo de examen debe ser un número entero positivo");
	}
}
