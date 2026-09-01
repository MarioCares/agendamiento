import { InvalidTimeOfDayError } from "../errors/invalid-timeof-day.error";

export class TimeOfDay {
	private constructor(public readonly value: string) {}

	static create(value: string) {
		const normalized = value.trim();

		if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(normalized)) {
			throw new InvalidTimeOfDayError();
		}

		return new TimeOfDay(normalized);
	}
}
