import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CardSmall } from "@/shared/ui/cards/small-card";
import { useScheduleRules } from "../hooks/use-schedule-rules";

export function ScheduleRulesDashboardCard() {
	const navigate = useNavigate();
	const scheduleRulesQuery = useScheduleRules();

	return (
		<CardSmall
			isLoading={scheduleRulesQuery.isLoading}
			title="Horarios"
			description="Gestionar horarios de atención"
			actionText="Gestionar"
			onClick={() => navigate({ to: "/admin/horarios" })}
		>
			<div className="flex flex-wrap gap-2">
				<Badge variant="outline">
					{(scheduleRulesQuery.data ?? []).length} horarios configurados
				</Badge>
			</div>
		</CardSmall>
	);
}
