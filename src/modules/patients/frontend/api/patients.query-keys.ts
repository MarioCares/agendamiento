export const patientQueryKeys = {
	all: ["patients"] as const,

	lists: () => [...patientQueryKeys.all, "list"] as const,

	list: (includeInactive = false) =>
		[...patientQueryKeys.lists(), { includeInactive }] as const,

	searches: () => [...patientQueryKeys.all, "search"] as const,

	search: (query: string, includeInactive = false) =>
		[
			...patientQueryKeys.searches(),
			{
				query,
				includeInactive,
			},
		] as const,

	details: () => [...patientQueryKeys.all, "detail"] as const,

	detail: (id: string) => [...patientQueryKeys.details(), id] as const,

	activeCount: () => [...patientQueryKeys.all, "active-count"] as const,
};
