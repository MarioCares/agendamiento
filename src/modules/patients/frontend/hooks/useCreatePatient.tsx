import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";

export function useCreatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPatient,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: patientQueryKeys.all,
			});
		},
	});
}
