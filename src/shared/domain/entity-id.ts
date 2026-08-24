export abstract class EntityId {
	protected constructor(public readonly value: string) {
		if (!value.trim()) {
			throw new Error("Entity id cannot be empty");
		}
	}

	toString() {
		return this.value;
	}
}
