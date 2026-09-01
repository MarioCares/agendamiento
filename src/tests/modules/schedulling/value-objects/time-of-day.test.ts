import { describe, expect, it } from "vitest";
import { InvalidTimeOfDayError } from "@/modules/scheduling/domain/errors/invalid-timeof-day.error";
import { TimeOfDay } from "@/modules/scheduling/domain/value-objects/timeof-day.vo";

describe("TimeOfDay", () => {
	it("should create a valid time", () => {
		const time = TimeOfDay.create("08:30");

		expect(time.value).toBe("08:30");
	});

	it("should create the latest valid time", () => {
		const time = TimeOfDay.create("23:59");

		expect(time.value).toBe("23:59");
	});

	it("should trim the value", () => {
		const time = TimeOfDay.create(" 09:15 ");

		expect(time.value).toBe("09:15");
	});

	it("should reject hour 24", () => {
		expect(() => TimeOfDay.create("24:00")).toThrow(InvalidTimeOfDayError);
	});

	it("should reject invalid minutes", () => {
		expect(() => TimeOfDay.create("09:60")).toThrow(InvalidTimeOfDayError);
	});

	it("should reject time without leading zero", () => {
		expect(() => TimeOfDay.create("9:00")).toThrow(InvalidTimeOfDayError);
	});

	it("should reject an invalid format", () => {
		expect(() => TimeOfDay.create("09.00")).toThrow(InvalidTimeOfDayError);
	});

	it("should reject an empty value", () => {
		expect(() => TimeOfDay.create("")).toThrow(InvalidTimeOfDayError);
	});
});
