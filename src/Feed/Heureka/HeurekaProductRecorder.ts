
import HeurekaProduct = require('../../Entity/Feed/Heureka/HeurekaProduct');
import IHeurekaProductObject = require('../../Entity/Feed/Heureka/IHeurekaProductObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaProductRecorder;
class HeurekaProductRecorder {

	static $service = 'Feed.Heureka.HeurekaProductRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<HeurekaProduct, IHeurekaProductObject, List<HeurekaProduct>>(HeurekaProduct, List, connection)
	) {}

	insertList(heurekaProductList: List<HeurekaProduct>, callback: (e: Error, heurekaProductList?: List<HeurekaProduct>) => void) {
		this.manager.insertList(heurekaProductList, callback);
	}
}
