import { createFileRoute } from "@tanstack/react-router";
import { ScheduleRulePage } from "@/modules/scheduling/frontend/schedule-rules-page";

export const Route = createFileRoute("/_authenticated/admin/horarios")({
	component: ScheduleRulePage,
});
