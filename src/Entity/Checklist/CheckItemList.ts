
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import CheckItem = require('./CheckItem');
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemList;
class CheckItemList extends List<CheckItem> {

	areAllDone() {
		return this.all((checkItem: CheckItem) => {
			return checkItem.isDone();
		});
	}

	getCountDone() {
		return this.filterDone().count();
	}

	filterDone() {
		return this.filter((checkItem: CheckItem) => {
			return checkItem.isDone();
		});
	}
}
