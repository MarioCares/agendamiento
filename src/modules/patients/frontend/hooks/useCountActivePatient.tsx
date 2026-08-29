import { useQuery } from "@tanstack/react-query";
import { getActivePatientsCount } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";

export function useActivePatientsCount() {
	return useQuery({
		queryKey: patientQueryKeys.activeCount(),
		queryFn: getActivePatientsCount,
	});
}
