
import IEntity = require('../IEntity');
import ICheckItemObject = require('./ICheckItemObject');
import LocalizedString = require('../Locale/LocalizedString');
import ValueList = require('./ValueList');
import Value = require('./Value');
import ICheckItemId = require('./ICheckItemId');

export = CheckItem;
class CheckItem implements IEntity {

	get Id() { return this.checkItemId; }
	get Label() { return this.label; }
	get ValueList() { return this.valueList; }

	constructor(
		private label: LocalizedString,
		private valueList: ValueList,
		private checkItemId: ICheckItemId
	) {}

	isChecked() {
		return this.valueList.areAllChecked();
	}

	isDone() {
		return this.valueList.areAllDone();
	}

	isIdEqual(checkItemId: ICheckItemId) {
		return checkItemId.productId == this.checkItemId.productId;
	}

	static fromObject(object: ICheckItemObject) {
		return new CheckItem(
			new LocalizedString(object.label),
			new ValueList(object.values, Value.fromObject),
			object.checkItemId
		);
	}

	static toObject(entity: CheckItem): ICheckItemObject {
		return {
			label: entity.label.toObject(),
			values: entity.valueList.toArray(Value.toObject),
			checkItemId: entity.checkItemId
		};
	}

	toObject() {
		return CheckItem.toObject(this);
	}
}
