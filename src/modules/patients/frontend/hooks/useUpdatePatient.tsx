import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";
import type { PatientFormValues } from "../forms/patient.schema";

type UpdatePatientVariables = {
	id: string;
	values: PatientFormValues;
};

export function useUpdatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, values }: UpdatePatientVariables) =>
			updatePatient(id, values),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: patientQueryKeys.all,
			});
		},
	});
}
