import type { DayOfWeek } from "../../domain/entities/dayof-week.vo";
import type { ScheduleRule } from "../../domain/entities/schedule-rule.entity";

export type ScheduleRuleDto = {
	id: string;
	dayOfWeek: DayOfWeek;
	startTime: string;
	endTime: string;
	active: boolean;
};

export function toScheduleRuleDto(rule: ScheduleRule): ScheduleRuleDto {
	return {
		id: rule.id.value,
		dayOfWeek: rule.dayOfWeek,
		startTime: rule.startTime.value,
		endTime: rule.endTime.value,
		active: rule.active,
	};
}

export const dayLabels: Record<ScheduleRuleDto["dayOfWeek"], string> = {
	monday: "Lunes",
	tuesday: "Martes",
	wednesday: "Miércoles",
	thursday: "Jueves",
	friday: "Viernes",
	saturday: "Sábado",
	sunday: "Domingo",
};

export const dayOrder: ScheduleRuleDto["dayOfWeek"][] = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
