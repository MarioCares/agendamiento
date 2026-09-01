import { describe, expect, it } from "vitest";
import { ScheduleRule } from "@/modules/scheduling/domain/entities/schedule-rule.entity";
import { InvalidScheduleRangeError } from "@/modules/scheduling/domain/errors/invalid-schedule-range.error";
import { ScheduleRuleId } from "@/modules/scheduling/domain/value-objects/schedule-rule-id.vo";
import { TimeOfDay } from "@/modules/scheduling/domain/value-objects/timeof-day.vo";

function makeScheduleRule() {
	return ScheduleRule.create({
		id: ScheduleRuleId.create("rule-1"),
		dayOfWeek: "monday",
		startTime: TimeOfDay.create("09:00"),
		endTime: TimeOfDay.create("13:00"),
	});
}

describe("ScheduleRule", () => {
	it("should create a schedule rule", () => {
		const rule = makeScheduleRule();

		expect(rule.id.value).toBe("rule-1");
		expect(rule.dayOfWeek).toBe("monday");
		expect(rule.startTime.value).toBe("09:00");
		expect(rule.endTime.value).toBe("13:00");
	});

	it("should be active by default", () => {
		const rule = makeScheduleRule();

		expect(rule.active).toBe(true);
	});

	it("should allow creating an inactive schedule rule", () => {
		const rule = ScheduleRule.create({
			id: ScheduleRuleId.create("rule-1"),
			dayOfWeek: "monday",
			startTime: TimeOfDay.create("09:00"),
			endTime: TimeOfDay.create("13:00"),
			active: false,
		});

		expect(rule.active).toBe(false);
	});

	it("should reject a range where start time equals end time", () => {
		expect(() =>
			ScheduleRule.create({
				id: ScheduleRuleId.create("rule-1"),
				dayOfWeek: "monday",
				startTime: TimeOfDay.create("09:00"),
				endTime: TimeOfDay.create("09:00"),
			}),
		).toThrow(InvalidScheduleRangeError);
	});

	it("should reject a range where start time is after end time", () => {
		expect(() =>
			ScheduleRule.create({
				id: ScheduleRuleId.create("rule-1"),
				dayOfWeek: "monday",
				startTime: TimeOfDay.create("14:00"),
				endTime: TimeOfDay.create("09:00"),
			}),
		).toThrow(InvalidScheduleRangeError);
	});

	it("should change the day of week", () => {
		const rule = makeScheduleRule();

		rule.changeDay("tuesday");

		expect(rule.dayOfWeek).toBe("tuesday");
	});

	it("should change the time range", () => {
		const rule = makeScheduleRule();

		rule.changeRange(TimeOfDay.create("10:00"), TimeOfDay.create("14:00"));

		expect(rule.startTime.value).toBe("10:00");
		expect(rule.endTime.value).toBe("14:00");
	});

	it("should reject an invalid range when changing it", () => {
		const rule = makeScheduleRule();

		expect(() =>
			rule.changeRange(TimeOfDay.create("15:00"), TimeOfDay.create("12:00")),
		).toThrow(InvalidScheduleRangeError);

		// La entidad debe conservar su estado anterior.
		expect(rule.startTime.value).toBe("09:00");
		expect(rule.endTime.value).toBe("13:00");
	});

	it("should deactivate a schedule rule", () => {
		const rule = makeScheduleRule();

		rule.deactivate();

		expect(rule.active).toBe(false);
	});

	it("should activate a schedule rule", () => {
		const rule = ScheduleRule.create({
			id: ScheduleRuleId.create("rule-1"),
			dayOfWeek: "monday",
			startTime: TimeOfDay.create("09:00"),
			endTime: TimeOfDay.create("13:00"),
			active: false,
		});

		rule.activate();

		expect(rule.active).toBe(true);
	});
});
