
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import CheckItem = require('./CheckItem');
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemList;
class CheckItemList extends List<CheckItem> {

	isAllDone() {
		return this.all((checkItem: CheckItem) => {
			return checkItem.isDone();
		});
	}
}
