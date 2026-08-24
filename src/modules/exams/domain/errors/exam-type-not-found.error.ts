import { ApplicationError } from "@/shared/domain/errors/application-error";

export class ExamTypeNotFoundError extends ApplicationError {
	constructor() {
		super("Exam type not found");
	}
}