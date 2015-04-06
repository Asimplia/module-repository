
import ValueTypeEnum = require('./ValueTypeEnum');
import IValueObject = require('./IValueObject');
import PriorityTypeEnum = require('../Suggestion/PriorityTypeEnum');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = Value;
class Value {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		valueType: Type.String,
		dateChecked: new Type.Date(true, true),
		priorityType: Type.String
	};
	private static converter = new Converter<Value, IValueObject>(Value);

	get ValueType() { return ValueTypeEnum[this.object.valueType]; }
	get DateChecked() { return this.object.dateChecked; }
	get PriorityType() { return PriorityTypeEnum[this.object.priorityType]; }

	set DateChecked(dateChecked: Date) { this.object.dateChecked = dateChecked; }

	constructor(
		private object: IValueObject
	) {}

	isChecked() {
		return this.DateChecked !== null;
	}

	isGreen() {
		return this.PriorityType == PriorityTypeEnum.GREEN;
	}

	isDone() {
		return this.isGreen() || this.isChecked();
	}

	static fromObject(object: IValueObject) {
		return Value.converter.fromObject(object);
	}

	static toObject(entity: Value): IValueObject {
		return Value.converter.toObject(entity);
	}

	toObject() {
		return Value.toObject(this);
	}
}
