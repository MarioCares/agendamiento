import { useState } from "react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { FormDialog } from "@/shared/ui/dialogs/form-dialog";
import { StatusConfirmationDialog } from "@/shared/ui/dialogs/status-confirmation";
import { EntityPageToolbar } from "@/shared/ui/toolbars/entity-toolbar";
import type { PatientDto } from "../backend/dto/patient.dto";
import { PatientsTable } from "./components/patients.table";
import { PatientSearch } from "./components/patients-search";
import { PatientForm } from "./forms/patient.form";
import type { PatientFormValues } from "./forms/patient.schema";
import { useCreatePatient } from "./hooks/useCreatePatient";
import { usePatients } from "./hooks/usePatients";
import { useSearchPatients } from "./hooks/useSearchPatients";
import { useSetPatientActive } from "./hooks/useSetPatientActive";
import { useUpdatePatient } from "./hooks/useUpdatePatient";

export function PatientsPage() {
	const includeInactive = false;
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState<PatientDto | null>(
		null,
	);
	const [statusPatient, setStatusPatient] = useState<PatientDto | null>(null);
	const [search, setSearch] = useState("");

	const patientsQuery = usePatients(includeInactive);
	const createMutation = useCreatePatient();
	const updateMutation = useUpdatePatient();
	const statusMutation = useSetPatientActive();
	const debouncedSearch = useDebouncedValue(search, 300);
	const searchQuery = useSearchPatients(debouncedSearch, includeInactive);

	async function handleCreate(values: PatientFormValues) {
		await createMutation.mutateAsync(values);
		setCreateOpen(false);
	}

	async function handleUpdate(values: PatientFormValues) {
		if (!selectedPatient) {
			return;
		}

		await updateMutation.mutateAsync({
			id: selectedPatient.id,
			values,
		});

		setSelectedPatient(null);
	}

	async function handleConfirmStatusChange() {
		if (!statusPatient) {
			return;
		}

		await statusMutation.mutateAsync({
			id: statusPatient.id,
			active: !statusPatient.active,
		});

		setStatusPatient(null);
	}

	if (patientsQuery.isLoading) {
		return <p>Cargando...</p>;
	}

	if (patientsQuery.isError) {
		return <p>No se pudieron cargar los pacientes.</p>;
	}

	const isSearching = debouncedSearch.trim().length > 0;
	const patients = isSearching
		? (searchQuery.data ?? [])
		: (patientsQuery.data ?? []);

	return (
		<main className="space-y-6 p-6">
			<EntityPageToolbar
				title="Pacientes"
				description="Administra los pacientes registrados en la consulta."
				actionLabel="Agregar paciente"
				onAction={() => setCreateOpen(true)}
			>
				<PatientSearch value={search} onChange={setSearch} />
			</EntityPageToolbar>
			<PatientsTable
				patients={patients}
				onEdit={setSelectedPatient}
				onRequestStatusChange={setStatusPatient}
			/>
			<FormDialog
				open={createOpen}
				title="Nuevo paciente"
				description="Ingresa los datos del paciente."
				onOpenChange={setCreateOpen}
			>
				<PatientForm
					errorMessage={createMutation.error?.message}
					onSubmit={handleCreate}
					onCancel={() => setCreateOpen(false)}
				/>
			</FormDialog>
			<FormDialog
				open={selectedPatient !== null}
				title="Editar paciente"
				description="Modifica los datos del paciente seleccionado."
				onOpenChange={(open) => {
					if (!open) {
						setSelectedPatient(null);
					}
				}}
			>
				{selectedPatient ? (
					<PatientForm
						key={selectedPatient.id}
						errorMessage={updateMutation.error?.message}
						defaultValues={{
							name: selectedPatient.name,
							phone: selectedPatient.phone,
							birthDate: selectedPatient.birthDate ?? "",
							email: selectedPatient.email,
							notes: selectedPatient.notes,
							rut: selectedPatient.rut ?? "",
						}}
						onSubmit={handleUpdate}
						onCancel={() => setSelectedPatient(null)}
					/>
				) : null}
			</FormDialog>
			<StatusConfirmationDialog
				open={statusPatient !== null}
				item={statusPatient}
				isPending={statusMutation.isPending}
				entityName="paciente"
				getItemLabel={(patient) => patient.name}
				activateDescription="Volverá a estar disponible para nuevas atenciones."
				deactivateDescription="No podrá seleccionarse para nuevas atenciones."
				onOpenChange={(open) => {
					if (!open) {
						setStatusPatient(null);
					}
				}}
				onConfirm={handleConfirmStatusChange}
			/>
		</main>
	);
}
