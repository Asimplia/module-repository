
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');
import ValueTypeEnum = require('./ValueTypeEnum');
import IValueObject = require('./IValueObject');
import PriorityTypeEnum = require('../Suggestion/PriorityTypeEnum');

export = Value;
class Value implements IEntity {

	get ValueType() { return this.valueType; }
	get DateChecked() { return this.dateChecked; }
	get PriorityType() { return this.priorityType; }

	set DateChecked(dateChecked: Date) { this.dateChecked = dateChecked; }

	constructor(
		private valueType: ValueTypeEnum,
		private dateChecked: Date,
		private priorityType: PriorityTypeEnum
	) {}

	isChecked() {
		return this.dateChecked !== null;
	}

	isGreen() {
		return this.priorityType == PriorityTypeEnum.GREEN;
	}

	isDone() {
		return this.isGreen() || this.isChecked();
	}

	static fromObject(object: IValueObject) {
		return new Value(
			EntityPreparer.enum<ValueTypeEnum>(ValueTypeEnum, object.valueType),
			EntityPreparer.dateOrNull(object.dateChecked),
			EntityPreparer.enum<PriorityTypeEnum>(PriorityTypeEnum, object.priorityType)
		);
	}

	static toObject(entity: Value): IValueObject {
		return {
			valueType: ValueTypeEnum[entity.valueType],
			dateChecked: entity.dateChecked,
			priorityType: PriorityTypeEnum[entity.priorityType]
		};
	}

	toObject() {
		return Value.toObject(this);
	}
}
