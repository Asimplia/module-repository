
import ProductTraffic = require('../../../Entity/Feed/Check/Traffic/ProductTraffic');
import ProductTrafficList = require('../../../Entity/Feed/Check/Traffic/ProductTrafficList');
import IProductTrafficObject = require('../../../Entity/Feed/Check/Traffic/IProductTrafficObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = ProductTrafficLoader;
class ProductTrafficLoader {
	
	static $service = 'Feed.Check.Traffic.ProductTrafficLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<ProductTraffic, IProductTrafficObject, ProductTrafficList>(ProductTraffic, ProductTrafficList, connection)
	) {}

	getList(eShopId: number, callback: (e: Error, productTrafficList?: ProductTrafficList) => void) {
		var conditions = {
			eShopId: eShopId
		};
		this.manager.fetchListBy(conditions, callback);
	}
}
