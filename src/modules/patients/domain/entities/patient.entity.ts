import { InvalidPatientPhoneError } from "../errors/invalid-patient-phone.error";
import type { PatientId } from "../value-objects/patient-id.vo";
import type { PatientName } from "../value-objects/patient-name.vo";
import type { PatientRut } from "../value-objects/patient-rut.vo";

export class Patient {
	private constructor(
		public readonly id: PatientId,
		private _name: PatientName,
		private _rut: PatientRut | null,
		private _phone: string,
		private _email: string,
		private _birthDate: Date | null,
		private _notes: string,
		private _active: boolean,
	) {}

	static create(params: {
		id: PatientId;
		name: PatientName;
		rut?: PatientRut;
		phone: string;
		email?: string;
		birthDate?: Date;
		notes?: string;
		active?: boolean;
	}) {
		const phone = Patient.normalizePhone(params.phone);

		if (!phone) {
			throw new InvalidPatientPhoneError();
		}

		return new Patient(
			params.id,
			params.name,
			params.rut ?? null,
			phone,
			params.email?.trim().toLowerCase() ?? "",
			params.birthDate ?? null,
			params.notes?.trim() ?? "",
			params.active ?? true,
		);
	}

	get name() {
		return this._name;
	}

	get rut() {
		return this._rut;
	}

	get phone() {
		return this._phone;
	}

	get email() {
		return this._email;
	}

	get birthDate() {
		return this._birthDate;
	}

	get notes() {
		return this._notes;
	}

	get active() {
		return this._active;
	}

	rename(name: PatientName) {
		this._name = name;
	}

	changeRut(rut?: PatientRut) {
		this._rut = rut ?? null;
	}

	changePhone(phone: string) {
		const normalized = Patient.normalizePhone(phone);

		if (!normalized) {
			throw new InvalidPatientPhoneError();
		}

		this._phone = normalized;
	}

	changeEmail(email?: string) {
		this._email = email?.trim().toLowerCase() ?? "";
	}

	changeBirthDate(birthDate?: Date) {
		this._birthDate = birthDate ?? null;
	}

	changeNotes(notes?: string) {
		this._notes = notes?.trim() ?? "";
	}

	activate() {
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	private static normalizePhone(value: string) {
		return value.trim();
	}
}
