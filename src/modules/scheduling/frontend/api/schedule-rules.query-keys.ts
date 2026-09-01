export const scheduleRuleQueryKeys = {
	all: ["schedule-rules"] as const,

	lists: () => [...scheduleRuleQueryKeys.all, "list"] as const,

	list: () => [...scheduleRuleQueryKeys.lists()] as const,
};
