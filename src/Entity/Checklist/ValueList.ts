
import List = require('../List');
import Value = require('./Value');
import ValueTypeEnum = require('./ValueTypeEnum');
import ValueTypeGroupList = require('./ValueType/ValueTypeGroupList');

export = ValueList;
class ValueList extends List<Value> {

	areAllChecked() {
		return this.all((value: Value) => {
			return value.isChecked();
		});
	}

	areAllGreen() {
		return this.all((value: Value) => {
			return value.isGreen();
		});
	}

	areAllDone() {
		return this.all((value: Value) => {
			return value.isDone();
		});
	}

	hasRedOfValueTypeGroupList(groupList: ValueTypeGroupList) {
		return this.any((value: Value) => {
			return value.isRed() && groupList.getValueTypeList().containsValueTypeEnum(value.ValueType);
		});
	}

	getByType(valueType: ValueTypeEnum) {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == valueType;
		});
	}

	getByTypeEan() {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == ValueTypeEnum.EAN;
		});
	}

	getByTypeDescription() {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == ValueTypeEnum.DESCRIPTION;
		});
	}

	getByTypePrice() {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == ValueTypeEnum.PRICE;
		});
	}

	getByTypeTrafic() {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == ValueTypeEnum.TRAFIC;
		});
	}

	getByTypeMainImage() {
		return this.findOneOnly((entity: Value) => {
			return entity.ValueType == ValueTypeEnum.MAIN_IMAGE;
		});
	}
}
