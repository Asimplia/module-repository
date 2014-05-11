
import IEntity = require('../IEntity');

export = Status;
class Status implements IEntity {
	constructor(
		private dateCreated: Date,
		private dateValidTo: Date,
		private state: string, // used, declined, remider
		private dateNextRemind: Date,
		private priorityValue: number, // define number of coins 1-5
		private priorityType: string // define color of coins - green/red
	) { }

	static fromObject(o: any): Status {
		return new Status(o.dateCreated, o.dateValidTo, o.state, o.dateNextRemind, o.priorityValue, o.priorityType);
	}

	static toObject(entity: Status) {
		return {
			dateCreated: entity.dateCreated,
			dateValidTo: entity.dateValidTo,
			state: entity.state,
			dateNextRemind: entity.dateNextRemind,
			priorityValue: entity.priorityValue,
			priorityType: entity.priorityType
		};
	}

	toObject() {
		return Status.toObject(this);
	}
}