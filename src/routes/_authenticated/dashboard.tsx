import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { ExamTypesDashboardCard } from "@/modules/exams/frontend/exam-types/components/exam-types-dashboard-card";
import { PatientDashboardCard } from "@/modules/patients/frontend/components/patients-dashboard-card";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<div className="p-8 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<p>Acceso directo a módulos.</p>
			<Separator />
			<div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
				<ExamTypesDashboardCard />
				<PatientDashboardCard />
			</div>
		</div>
	);
}
