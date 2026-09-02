import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	dayLabels,
	dayOrder,
	type ScheduleRuleDto,
} from "../../backend/dto/schedule-rule.dto";

type ScheduleRulesTableProps = {
	rules: ScheduleRuleDto[];
	onEdit(rule: ScheduleRuleDto): void;
	onRequestStatusChange(rule: ScheduleRuleDto): void;
};

export function ScheduleRulesTable({
	rules,
	onEdit,
	onRequestStatusChange,
}: ScheduleRulesTableProps) {
	if (rules.length === 0) {
		return (
			<div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
				No hay horarios configurados.
			</div>
		);
	}

	const groupedRules = dayOrder
		.map((day) => ({
			day,
			rules: rules
				.filter((rule) => rule.dayOfWeek === day)
				.sort((a, b) => a.startTime.localeCompare(b.startTime)),
		}))
		.filter((group) => group.rules.length > 0);

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Día</TableHead>
						<TableHead>Horario</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{groupedRules.flatMap((group) =>
						group.rules.map((rule, index) => (
							<TableRow key={rule.id}>
								<TableCell className="font-medium">
									{index === 0 ? dayLabels[group.day] : ""}
								</TableCell>

								<TableCell>
									{rule.startTime} - {rule.endTime}
								</TableCell>

								<TableCell>{rule.active ? "Activo" : "Inactivo"}</TableCell>

								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => onEdit(rule)}
										>
											Editar
										</Button>

										<Button
											variant={rule.active ? "destructive" : "default"}
											size="sm"
											onClick={() => onRequestStatusChange(rule)}
										>
											{rule.active ? "Desactivar" : "Activar"}
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)),
					)}
				</TableBody>
			</Table>
		</div>
	);
}
