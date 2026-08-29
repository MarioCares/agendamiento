import { createFileRoute } from "@tanstack/react-router";
import { PatientsPage } from "@/modules/patients/frontend/patients-page";

export const Route = createFileRoute("/_authenticated/admin/pacientes")({
	component: PatientsPage,
});
