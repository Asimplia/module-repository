
import HeurekaAccessory = require('../../Entity/Feed/Heureka/HeurekaAccessory');
import IHeurekaAccessoryObject = require('../../Entity/Feed/Heureka/IHeurekaAccessoryObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaAccessoryRecorder;
class HeurekaAccessoryRecorder {

	static $service = 'Feed.Heureka.HeurekaAccessoryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<HeurekaAccessory, IHeurekaAccessoryObject, List<HeurekaAccessory>>
			= new Manager<HeurekaAccessory, IHeurekaAccessoryObject, List<HeurekaAccessory>>(HeurekaAccessory, List, connection)
	) {}

	insertList(heurekaAccessoryList: List<HeurekaAccessory>, callback: (e: Error, heurekaAccessoryList?: List<HeurekaAccessory>) => void) {
		this.manager.insertList(heurekaAccessoryList, callback);
	}

	insert(heurekaAccessory: HeurekaAccessory, callback: (e: Error, heurekaAccessory?: HeurekaAccessory) => void) {
		this.manager.insert(heurekaAccessory, callback);
	}
}
