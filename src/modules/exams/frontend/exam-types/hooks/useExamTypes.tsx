import { useQuery } from "@tanstack/react-query";
import { getExamTypes } from "../api/exam-type.api";
import { examTypesQueryKeys } from "../api/exam-types.query-keys";

export function useExamTypes() {
	return useQuery({
		queryKey: examTypesQueryKeys.all,
		queryFn: getExamTypes,
	});
}
