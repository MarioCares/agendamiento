import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPatientActive } from "../api/patient.api";
import { patientQueryKeys } from "../api/patients.query-keys";

type SetPatientActiveVariables = {
	id: string;
	active: boolean;
};

export function useSetPatientActive() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, active }: SetPatientActiveVariables) =>
			setPatientActive(id, active),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: patientQueryKeys.all,
			});
		},
	});
}
