import { useQuery } from "@tanstack/react-query";
import { searchPatients } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";

export function useSearchPatients(query: string, includeInactive = false) {
	return useQuery({
		queryKey: patientQueryKeys.search(query, includeInactive),
		queryFn: () =>
			searchPatients({
				query,
				includeInactive,
			}),
		enabled: query.trim().length > 0,
	});
}
