import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScheduleRule } from "../api/schedule-rules.api";
import { scheduleRuleQueryKeys } from "../api/schedule-rules.query-keys";

export function useCreateScheduleRule() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createScheduleRule,

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: scheduleRuleQueryKeys.all,
			});
		},
	});
}
