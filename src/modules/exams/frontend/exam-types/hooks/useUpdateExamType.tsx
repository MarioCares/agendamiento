import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamType } from "../api/exam-type.api";
import { examTypesQueryKeys } from "../api/exam-types.query-keys";
import type { ExamTypeFormValues } from "../forms/exam-type.schema";

export function useUpdateExamType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, values }: { id: string; values: ExamTypeFormValues }) =>
			updateExamType(id, values),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: examTypesQueryKeys.all,
			});
		},
	});
}
