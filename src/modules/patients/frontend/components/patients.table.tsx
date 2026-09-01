import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { EmptyTableState } from "@/shared/ui/tables/empty-table-state";
import { EntityRowActions } from "@/shared/ui/tables/entity-row-actions";
import type { PatientDto } from "../../backend/dto/patient.dto";

type PatientsTableProps = {
	patients: PatientDto[];
	onEdit(patient: PatientDto): void;
	onRequestStatusChange(patient: PatientDto): void;
};

export function PatientsTable({
	patients,
	onEdit,
	onRequestStatusChange,
}: PatientsTableProps) {
	if (patients.length === 0) {
		return <EmptyTableState message="No hay pacientes para mostrar." />;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>RUT</TableHead>
					<TableHead>Teléfono</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead className="text-right">Acciones</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{patients.map((patient) => (
					<TableRow key={patient.id}>
						<TableCell className="font-medium">{patient.name}</TableCell>

						<TableCell>{patient.rut || "—"}</TableCell>

						<TableCell>{patient.phone}</TableCell>

						<TableCell>{patient.email || "—"}</TableCell>

						<TableCell>{patient.active ? "Activo" : "Inactivo"}</TableCell>

						<EntityRowActions
							item={patient}
							isActive={patient.active}
							onEdit={onEdit}
							onRequestStatusChange={onRequestStatusChange}
						/>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
