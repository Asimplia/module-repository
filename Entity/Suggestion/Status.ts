
import IEntity = require('../IEntity');

export = Status;
class Status implements IEntity {

	get DateCreated() { return this.dateCreated; }
	set DateCreated(value: Date) { this.dateCreated = value; }
	get DateValidTo() { return this.dateCreated; }
	set DateValidTo(value: Date) { this.dateCreated = value; }
	get State() { return this.state; }
	set State(value: string) { this.state = value; }
	get DateNextRemind() { return this.dateNextRemind; }
	set DateNextRemind(value: Date) { this.dateNextRemind = value; }
	get PriorityValue() { return this.priorityValue; }
	set PriorityValue(value: number) { this.priorityValue = value; }
	get PriorityType() { return this.priorityType; }
	set PriorityType(value: string) { this.priorityType = value; }

	constructor(
		private dateCreated: Date,
		private dateValidTo: Date,
		private state: string, // USED, DECLINED, REMINDER
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