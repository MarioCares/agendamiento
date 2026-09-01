import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setScheduleRuleActive } from "../api/schedule-rules.api";
import { scheduleRuleQueryKeys } from "../api/schedule-rules.query-keys";

type SetScheduleRuleActiveVariables = {
	id: string;
	active: boolean;
};

export function useSetScheduleRuleActive() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, active }: SetScheduleRuleActiveVariables) =>
			setScheduleRuleActive(id, active),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: scheduleRuleQueryKeys.all,
			});
		},
	});
}
