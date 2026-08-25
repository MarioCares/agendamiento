import type { ExamTypeDto } from "@/modules/exams/backend/dto/output-exam-type.dto";
import { api } from "@/shared/http/api-client";
import type { ApiSuccessResponse } from "@/shared/http/api-types";
import type { ExamTypeFormValues } from "../forms/exam-type.schema";

export async function getExamTypes(): Promise<ExamTypeDto[]> {
	const response =
		await api.get<ApiSuccessResponse<ExamTypeDto[]>>("/exam-types");
	return response.data.data;
}

export async function createExamType(
	values: ExamTypeFormValues,
): Promise<ExamTypeDto> {
	const response = await api.post<ApiSuccessResponse<ExamTypeDto>>(
		"/exam-types",
		values,
	);
	return response.data.data;
}

export async function updateExamType(
	id: string,
	values: ExamTypeFormValues,
): Promise<ExamTypeDto> {
	const response = await api.put<ApiSuccessResponse<ExamTypeDto>>(
		`/exam-types/${id}`,
		values,
	);
	return response.data.data;
}

export async function setExamTypeActive(
	id: string,
	active: boolean,
): Promise<ExamTypeDto> {
	const response = await api.patch<ApiSuccessResponse<ExamTypeDto>>(
		`/exam-types/${id}/status`,
		{ active },
	);
	return response.data.data;
}
