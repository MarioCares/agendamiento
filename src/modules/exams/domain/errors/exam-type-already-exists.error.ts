import { ApplicationError } from "@/shared/domain/errors/application-error";

export class ExamTypeAlreadyExistsError extends ApplicationError {
	constructor() {
		super("Exam type already exists");
	}
}
