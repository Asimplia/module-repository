
import Revenue = require('../../Entity/Site/Revenue/Revenue');
import RevenueList = require('../../Entity/Site/Revenue/RevenueList');
import IRevenueObject = require('../../Entity/Site/Revenue/IRevenueObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = RevenueLoader;
class RevenueLoader {
	
	static $service = 'Site.Revenue.RevenueLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<Revenue, IRevenueObject, RevenueList>(Revenue, RevenueList, connection)
	) {}

	getById(id: number, callback: (e: Error, revenue?: Revenue) => void) {
		var conditions = {
			id: id
		};
		this.manager.fetchBy(conditions, callback);
	}
}
