import { InvalidScheduleRangeError } from "../errors/invalid-schedule-range.error";
import type { ScheduleRuleId } from "../value-objects/schedule-rule-id.vo";
import type { TimeOfDay } from "../value-objects/timeof-day.vo";
import type { DayOfWeek } from "./dayof-week.vo";

export class ScheduleRule {
	private constructor(
		public readonly id: ScheduleRuleId,
		private _dayOfWeek: DayOfWeek,
		private _startTime: TimeOfDay,
		private _endTime: TimeOfDay,
		private _active: boolean,
	) {}

	static create(params: {
		id: ScheduleRuleId;
		dayOfWeek: DayOfWeek;
		startTime: TimeOfDay;
		endTime: TimeOfDay;
		active?: boolean;
	}) {
		if (params.startTime.value >= params.endTime.value) {
			throw new InvalidScheduleRangeError();
		}

		return new ScheduleRule(
			params.id,
			params.dayOfWeek,
			params.startTime,
			params.endTime,
			params.active ?? true,
		);
	}

	get dayOfWeek() {
		return this._dayOfWeek;
	}

	get startTime() {
		return this._startTime;
	}

	get endTime() {
		return this._endTime;
	}

	get active() {
		return this._active;
	}

	changeDay(dayOfWeek: DayOfWeek) {
		this._dayOfWeek = dayOfWeek;
	}

	changeRange(startTime: TimeOfDay, endTime: TimeOfDay) {
		if (startTime.value >= endTime.value) {
			throw new InvalidScheduleRangeError();
		}

		this._startTime = startTime;
		this._endTime = endTime;
	}

	activate() {
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}
}
