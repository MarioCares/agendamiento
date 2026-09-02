import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { CardSmall } from "@/shared/ui/cards/small-card";
import { useActivePatientsCount } from "../hooks/useCountActivePatient";

export function PatientDashboardCard() {
	const navigate = useNavigate();
	const activePatientsCount = useActivePatientsCount();

	return (
		<CardSmall
			isLoading={activePatientsCount.isPending}
			title="Pacientes"
			description="Gestionar pacientes registrados o ver sus datos/fichas"
			actionText="Gestionar"
			onClick={() => navigate({ to: "/admin/pacientes" })}
		>
			<div className="flex flex-wrap gap-2">
				<Badge variant="outline">
					{activePatientsCount.data} pacientes registrados
				</Badge>
			</div>
		</CardSmall>
	);
}
