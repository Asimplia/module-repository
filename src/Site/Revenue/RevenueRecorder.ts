
import Revenue = require('../../Entity/Site/Revenue/Revenue');
import RevenueList = require('../../Entity/Site/Revenue/RevenueList');
import IRevenueObject = require('../../Entity/Site/Revenue/IRevenueObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = RevenueRecorder;
class RevenueRecorder {

	static $service = 'Site.Revenue.RevenueRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<Revenue, IRevenueObject, RevenueList>
			= new Manager<Revenue, IRevenueObject, RevenueList>(Revenue, RevenueList, connection)
	) {}

	insertList(revenueList: RevenueList, callback: (e: Error, revenueList?: RevenueList) => void) {
		this.manager.insertList(revenueList, callback);
	}

	insert(revenue: Revenue, callback: (e: Error, revenue?: Revenue) => void) {
		this.manager.insert(revenue, callback);
	}

	removeByReceivedAtBetween(eShopId: number, dateFrom: Date, dateTo: Date, callback: (e: Error) => void): void {
		var conditions = {
			receivedAt: {
				$gte: dateFrom,
				$lte: dateTo
			}
		};
		this.manager.removeBy(conditions, callback);
	}
}
