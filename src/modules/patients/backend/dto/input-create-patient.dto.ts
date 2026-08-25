export type CreatePatientInput = {
	name: string;
	rut?: string;
	phone: string;
	email?: string;
	birthDate?: Date;
	notes?: string;
	actorId: string;
};
