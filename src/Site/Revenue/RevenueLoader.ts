
import Revenue = require('../../Entity/Site/Revenue/Revenue');
import RevenueList = require('../../Entity/Site/Revenue/RevenueList');
import IRevenueObject = require('../../Entity/Site/Revenue/IRevenueObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = RevenueLoader;
class RevenueLoader {

	static $service = 'Site.Revenue.RevenueLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<Revenue, IRevenueObject, RevenueList>
			= new Manager<Revenue, IRevenueObject, RevenueList>(Revenue, RevenueList, connection)
	) {}

	getById(id: number, callback: (e: Error, revenue?: Revenue) => void) {
		var conditions = {
			id: id
		};
		this.manager.fetchBy(conditions, callback);
	}
}
