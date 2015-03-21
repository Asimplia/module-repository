
import IEntity = require('../IEntity');
import ICheckItemObject = require('./ICheckItemObject');
import LocalizedString = require('../Locale/LocalizedString');
import ValueList = require('./ValueList');
import Value = require('./Value');

export = CheckItem;
class CheckItem implements IEntity {

	get Label() { return this.label; }
	get ValueList() { return this.valueList; }

	constructor(
		private label: LocalizedString,
		private valueList: ValueList
	) {}

	isChecked() {
		return this.valueList.areAllChecked();
	}

	static fromObject(object: ICheckItemObject) {
		return new CheckItem(
			new LocalizedString(object.label),
			new ValueList(object.values, Value.fromObject)
		);
	}

	static toObject(entity: CheckItem): ICheckItemObject {
		return {
			label: entity.label.toObject(),
			values: entity.valueList.toArray(Value.toObject)
		};
	}

	toObject() {
		return CheckItem.toObject(this);
	}
}
