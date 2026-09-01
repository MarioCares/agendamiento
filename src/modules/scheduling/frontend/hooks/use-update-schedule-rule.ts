import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheduleRule } from "../api/schedule-rules.api";
import { scheduleRuleQueryKeys } from "../api/schedule-rules.query-keys";
import type { ScheduleRuleFormValues } from "../forms/schedule-rules.schema";

type UpdateScheduleRuleVariables = {
	id: string;
	values: ScheduleRuleFormValues;
};

export function useUpdateScheduleRule() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, values }: UpdateScheduleRuleVariables) =>
			updateScheduleRule(id, values),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: scheduleRuleQueryKeys.all,
			});
		},
	});
}
