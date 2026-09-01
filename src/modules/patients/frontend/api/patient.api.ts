import { api } from "@/shared/http/api-client";
import type { ApiSuccessResponse } from "@/shared/http/api-types";
import type { PatientDto } from "../../backend/dto/patient.dto";
import type { PatientFormValues } from "../forms/patient.schema";

type GetPatientsParams = {
	includeInactive?: boolean;
};

type SearchPatientsParams = {
	query: string;
	includeInactive?: boolean;
};

export async function getActivePatientsCount(): Promise<PatientDto[]> {
	const response = await api.get<ApiSuccessResponse<PatientDto[]>>(
		"/patients/active-count",
	);

	return response.data.data;
}

export async function getPatients(
	params: GetPatientsParams = {},
): Promise<PatientDto[]> {
	const searchParams = new URLSearchParams();

	if (params.includeInactive) {
		searchParams.set("includeInactive", "true");
	}

	const query = searchParams.toString();
	const response = await api.get<ApiSuccessResponse<PatientDto[]>>(
		`/patients${query ? `?${query}` : ""}`,
	);

	return response.data.data;
}

export async function searchPatients(
	params: SearchPatientsParams,
): Promise<PatientDto[]> {
	const searchParams = new URLSearchParams({
		q: params.query,
	});

	if (params.includeInactive) {
		searchParams.set("includeInactive", "true");
	}

	const response = await api.get<ApiSuccessResponse<PatientDto[]>>(
		`/patients/search?${searchParams.toString()}`,
	);

	return response.data.data;
}

export async function createPatient(
	values: PatientFormValues,
): Promise<PatientDto> {
	const response = await api.post<ApiSuccessResponse<PatientDto>>(
		"/patients",
		values,
	);

	return response.data.data;
}

export async function updatePatient(
	id: string,
	values: PatientFormValues,
): Promise<PatientDto> {
	const response = await api.put<ApiSuccessResponse<PatientDto>>(
		`/patients/${id}`,
		values,
	);

	return response.data.data;
}

export async function setPatientActive(
	id: string,
	active: boolean,
): Promise<PatientDto> {
	const response = await api.patch<ApiSuccessResponse<PatientDto>>(
		`/patients/${id}/status`,
		{ active },
	);

	return response.data.data;
}
