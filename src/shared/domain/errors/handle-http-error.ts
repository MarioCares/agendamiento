import type { Context } from "hono";
import { ExamTypeAlreadyExistsError } from "@/modules/exams/domain/errors/exam-type-already-exists.error";
import { ExamTypeNotFoundError } from "@/modules/exams/domain/errors/exam-type-not-found.error";
import { PatientAlreadyExistsError } from "@/modules/patients/domain/errors/patient-already-exists.error";
import { PatientNotFoundError } from "@/modules/patients/domain/errors/patient-not-found.error";
import { ScheduleRuleNotFoundError } from "@/modules/scheduling/domain/errors/schedule-rule-not-found.error";
import { ScheduleRuleOverlapError } from "@/modules/scheduling/domain/errors/schedule-rule-overlap.error";
import { DomainError } from "@/shared/domain/errors/domain-error";

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

	if (error instanceof PatientNotFoundError) {
		return c.json(
			{
				success: false,
				error: {
					code: "PATIENT_NOT_FOUNT",
					message: error.message,
				},
			},
			409,
		);
	}

	if (error instanceof PatientAlreadyExistsError) {
		return c.json(
			{
				success: false,
				error: {
					code: "PATIENT_ALREADY_EXISTS",
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

	if (error instanceof ScheduleRuleNotFoundError) {
		return c.json(
			{
				success: false,
				error: {
					code: "SCHEDULE_RULE_NOT_FOUND",
					message: error.message,
				},
			},
			404,
		);
	}

	if (error instanceof ScheduleRuleOverlapError) {
		return c.json(
			{
				success: false,
				error: {
					code: "SCHEDULE_RULE_OVERLAP",
					message: error.message,
				},
			},
			409,
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
