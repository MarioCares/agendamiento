import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";

export function usePatients(includeInactive = false) {
	return useQuery({
		queryKey: patientQueryKeys.list(includeInactive),
		queryFn: () => getPatients({ includeInactive }),
	});
}
