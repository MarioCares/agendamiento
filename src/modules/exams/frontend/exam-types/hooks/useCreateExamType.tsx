import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExamType } from "../api/exam-type.api";
import { examTypesQueryKeys } from "../api/exam-types.query-keys";

export function useCreateExamType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createExamType,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: examTypesQueryKeys.all,
			});
		},
	});
}
