
import HeurekaAccessory = require('../../Entity/Feed/Heureka/HeurekaAccessory');
import IHeurekaAccessoryObject = require('../../Entity/Feed/Heureka/IHeurekaAccessoryObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaAccessoryRecorder;
class HeurekaAccessoryRecorder {
	
	private manager: Manager<HeurekaAccessory, IHeurekaAccessoryObject>;

	static $service = 'Feed.Heureka.HeurekaAccessoryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<HeurekaAccessory, IHeurekaAccessoryObject>(HeurekaAccessory, connection);
	}

	insertList(heurekaAccessoryList: List<HeurekaAccessory>, callback: (e: Error, heurekaAccessoryList?: List<HeurekaAccessory>) => void) {
		this.manager.insertList(heurekaAccessoryList, callback);
	}

	insert(heurekaAccessory: HeurekaAccessory, callback: (e: Error, heurekaAccessory?: HeurekaAccessory) => void) {
		this.manager.insert(heurekaAccessory, callback);
	}
}
