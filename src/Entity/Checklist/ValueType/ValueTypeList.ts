
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import ValueType = require('./ValueType');
import ValueTypeEnum = require('../ValueTypeEnum');
/* tslint:disable */
Util;
/* tslint:enable */

export = ValueTypeList;
class ValueTypeList extends List<ValueType> {

	containsValueTypeEnum(valueTypeEnum: ValueTypeEnum) {
		return this.any((valueType: ValueType) => {
			return valueType.Type == valueTypeEnum;
		});
	}
}
