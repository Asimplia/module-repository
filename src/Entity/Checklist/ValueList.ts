
import List = require('../List');
import Value = require('./Value');
import ValueTypeEnum = require('./ValueTypeEnum');


export = ValueList;
class ValueList extends List<Value> {
	
	areAllChecked() {
		return this.all((value: Value) => {
			return value.isChecked();
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
