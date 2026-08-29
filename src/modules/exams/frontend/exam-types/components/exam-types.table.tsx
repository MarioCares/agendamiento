import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ExamTypeDto } from "@/modules/exams/backend/dto/output-exam-type.dto";
import { EmptyTableState } from "@/shared/ui/tables/empty-table-state";
import { EntityRowActions } from "@/shared/ui/tables/entity-row-actions";

type ExamTypesTableProps = {
	examTypes: ExamTypeDto[];
	onEdit(examType: ExamTypeDto): void;
	onRequestStatusChange(examType: ExamTypeDto): void;
};

export function ExamTypesTable({
	examTypes,
	onEdit,
	onRequestStatusChange,
}: ExamTypesTableProps) {
	if (examTypes.length === 0) {
		return <EmptyTableState message="No hay tipos de exámenes para mostrar." />;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Duración</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead className="text-right">Acciones</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{examTypes.map((examType) => (
					<TableRow key={examType.id}>
						<TableCell className="font-medium">{examType.name}</TableCell>
						<TableCell>{examType.durationMinutes} min</TableCell>
						<TableCell>{examType.active ? "Activo" : "Inactivo"}</TableCell>
						<EntityRowActions
							item={examType}
							isActive={examType.active}
							onEdit={onEdit}
							onRequestStatusChange={onRequestStatusChange}
						/>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
