
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Checklist = require('./Checklist');
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistList;
class ChecklistList extends List<Checklist> {

	isAllDone() {
		return this.all((checklist: Checklist) => {
			return checklist.CheckItemList.isAllDone();
		});
	}
}
