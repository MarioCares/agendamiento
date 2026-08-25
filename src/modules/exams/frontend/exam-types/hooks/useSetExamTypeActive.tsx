import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setExamTypeActive } from "../api/exam-type.api";
import { examTypesQueryKeys } from "../api/exam-types.query-keys";

export function useSetExamTypeActive() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, active }: { id: string; active: boolean }) =>
			setExamTypeActive(id, active),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: examTypesQueryKeys.all,
			});
		},
	});
}
