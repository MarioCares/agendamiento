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
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => onEdit(examType)}
								>
									Editar
								</Button>
								<Button
									variant={examType.active ? "destructive" : "default"}
									size="sm"
									onClick={() => onRequestStatusChange(examType)}
								>
									{examType.active ? "Desactivar" : "Activar"}
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
