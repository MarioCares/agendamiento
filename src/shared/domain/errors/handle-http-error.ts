import type { Context } from "hono";
import { DomainError } from "@/shared/domain/errors/domain-error";
import { ExamTypeNotFoundError } from "@/modules/exams/domain/errors/exam-type-not-found.error";
import { ExamTypeAlreadyExistsError } from "@/modules/exams/domain/errors/exam-type-already-exists.error";

export function handleHttpError(error: unknown, c: Context) {
	if (error instanceof ExamTypeNotFoundError) {
		return c.json(
			{
				success: false,
				error: {
					code: "EXAM_TYPE_NOT_FOUND",
					message: error.message,
				},
			},
			404,
		);
	}

	if (error instanceof ExamTypeAlreadyExistsError) {
		return c.json(
			{
				success: false,
				error: {
					code: "EXAM_TYPE_ALREADY_EXISTS",
					message: error.message,
				},
			},
			409,
		);
	}

	if (error instanceof DomainError) {
		return c.json(
			{
				success: false,
				error: {
					code: "DOMAIN_ERROR",
					message: error.message,
				},
			},
			400,
		);
	}

	console.error(error);

	return c.json(
		{
			success: false,
			error: {
				code: "INTERNAL_SERVER_ERROR",
				message: "Internal server error",
			},
		},
		500,
	);
}