export type UpdateExamTypeInput = {
	id: string;
	name: string;
	durationMinutes: number;
	description?: string;
	instructions?: string;
	actorId: string;
};