export type UpdatePatientInput = {
	id: string;
	name: string;
	rut?: string;
	phone: string;
	email?: string;
	birthDate?: Date;
	notes?: string;
	actorId: string;
};
