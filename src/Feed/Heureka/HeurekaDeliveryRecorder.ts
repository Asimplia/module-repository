
import HeurekaDelivery = require('../../Entity/Feed/Heureka/HeurekaDelivery');
import IHeurekaDeliveryObject = require('../../Entity/Feed/Heureka/IHeurekaDeliveryObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaDeliveryRecorder;
class HeurekaDeliveryRecorder {

	static $service = 'Feed.Heureka.HeurekaDeliveryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<HeurekaDelivery, IHeurekaDeliveryObject, List<HeurekaDelivery>>(HeurekaDelivery, List, connection)
	) {}

	insertList(heurekaDeliveryList: List<HeurekaDelivery>, callback: (e: Error, heurekaDeliveryList?: List<HeurekaDelivery>) => void) {
		this.manager.insertList(heurekaDeliveryList, callback);
	}

	insert(heurekaDelivery: HeurekaDelivery, callback: (e: Error, heurekaDelivery?: HeurekaDelivery) => void) {
		this.manager.insert(heurekaDelivery, callback);
	}
}
