
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import ValueTypeGroup = require('./ValueTypeGroup');
import ValueTypeList = require('./ValueTypeList');
/* tslint:disable */
Util;
/* tslint:enable */

export = ValueTypeGroupList;
class ValueTypeGroupList extends List<ValueTypeGroup> {

	containsByType(findGroupType: string) {
		return this.any((group: ValueTypeGroup) => {
			return group.Type == findGroupType;
		});
	}

	findByType(findGroupType: string) {
		return this.find((group: ValueTypeGroup) => {
			return group.Type == findGroupType;
		});
	}

	getValueTypeList() {
		return new ValueTypeList(this.flatMap((group: ValueTypeGroup) => {
			return group.ValueTypeList.toArray();
		}).toArray());
	}
}
