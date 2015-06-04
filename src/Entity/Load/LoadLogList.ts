
import Util = require('asimplia-util');
import LoadLog = require('./LoadLog');
import List = Util.ODBM.Entity.List;
/* tslint:disable */
Util;
/* tslint:enable */

export = LoadLogList;
class LoadLogList extends List<LoadLog> {

	getEShopIdList() {
		return this.map((loadLog: LoadLog) => loadLog.EShopId)
		.unique();
	}
}
