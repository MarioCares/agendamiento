import { useQuery } from "@tanstack/react-query";
import { getScheduleRules } from "../api/schedule-rules.api";
import { scheduleRuleQueryKeys } from "../api/schedule-rules.query-keys";

export function useScheduleRules() {
	return useQuery({
		queryKey: scheduleRuleQueryKeys.list(),
		queryFn: getScheduleRules,
	});
}
