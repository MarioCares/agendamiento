import { api } from "@/shared/http/api-client";
import type { ApiSuccessResponse } from "@/shared/http/api-types";
import type { ScheduleRuleDto } from "../../backend/dto/schedule-rule.dto";
import type { ScheduleRuleFormValues } from "../forms/schedule-rules.schema";

export async function getScheduleRules(): Promise<ScheduleRuleDto[]> {
	const response =
		await api.get<ApiSuccessResponse<ScheduleRuleDto[]>>("/schedule-rules");

	return response.data.data;
}

export async function createScheduleRule(
	values: ScheduleRuleFormValues,
): Promise<ScheduleRuleDto> {
	const response = await api.post<ApiSuccessResponse<ScheduleRuleDto>>(
		"/schedule-rules",
		values,
	);

	return response.data.data;
}

export async function updateScheduleRule(
	id: string,
	values: ScheduleRuleFormValues,
): Promise<ScheduleRuleDto> {
	const response = await api.put<ApiSuccessResponse<ScheduleRuleDto>>(
		`/schedule-rules/${id}`,
		values,
	);

	return response.data.data;
}

export async function setScheduleRuleActive(
	id: string,
	active: boolean,
): Promise<ScheduleRuleDto> {
	const response = await api.patch<ApiSuccessResponse<ScheduleRuleDto>>(
		`/schedule-rules/${id}/status`,
		{ active },
	);

	return response.data.data;
}
