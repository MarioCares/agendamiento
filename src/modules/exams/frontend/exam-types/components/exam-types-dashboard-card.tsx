import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CardSmall } from "@/shared/ui/cards/small-card";
import { useExamTypes } from "../hooks/useExamTypes";

export function ExamTypesDashboardCard() {
	const navigate = useNavigate();
	const examTypes = useExamTypes();

	return (
		<CardSmall
			isLoading={examTypes.isPending}
			title="Tipos de Exámenes"
			description="Gestionar tipos de exámenes aplicados a pacientes"
			actionText="Administrar T.E."
			onClick={() => navigate({ to: "/admin/tipos-examenes" })}
		>
			<div className="flex flex-wrap gap-2">
				<Badge variant="outline">
					{(examTypes.data ?? []).length} exámenes registrados
				</Badge>
			</div>
		</CardSmall>
	);
}
