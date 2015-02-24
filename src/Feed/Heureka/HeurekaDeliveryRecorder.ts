
import HeurekaDelivery = require('../../Entity/Feed/Heureka/HeurekaDelivery');
import IHeurekaDeliveryObject = require('../../Entity/Feed/Heureka/IHeurekaDeliveryObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaDeliveryRecorder;
class HeurekaDeliveryRecorder {
	
	private manager: Manager<HeurekaDelivery, IHeurekaDeliveryObject>;

	static $service = 'Feed.Heureka.HeurekaDeliveryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<HeurekaDelivery, IHeurekaDeliveryObject>(HeurekaDelivery, connection);
	}

	insertList(heurekaDeliveryList: List<HeurekaDelivery>, callback: (e: Error, heurekaDeliveryList?: List<HeurekaDelivery>) => void) {
		this.manager.insertList(heurekaDeliveryList, callback);
	}

	insert(heurekaDelivery: HeurekaDelivery, callback: (e: Error, heurekaDelivery?: HeurekaDelivery) => void) {
		this.manager.insert(heurekaDelivery, callback);
	}
}
