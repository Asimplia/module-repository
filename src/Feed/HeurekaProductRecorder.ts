
import HeurekaProduct = require('../Entity/Feed/HeurekaProduct');
import IHeurekaProductObject = require('../Entity/Feed/IHeurekaProductObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaProductRecorder;
class HeurekaProductRecorder {
	
	private manager: Manager<HeurekaProduct, IHeurekaProductObject>;

	static $service = 'Feed.HeurekaProductRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<HeurekaProduct, IHeurekaProductObject>(HeurekaProduct, connection);
	}

	insertList(heurekaProductList: List<HeurekaProduct>, callback: (e: Error, heurekaProductList?: List<HeurekaProduct>) => void) {
		this.manager.insertList(heurekaProductList, callback);
	}
}
