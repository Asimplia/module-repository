
import HeurekaParam = require('../../Entity/Feed/Heureka/HeurekaParam');
import IHeurekaParamObject = require('../../Entity/Feed/Heureka/IHeurekaParamObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaParamRecorder;
class HeurekaParamRecorder {

	static $service = 'Feed.Heureka.HeurekaParamRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<HeurekaParam, IHeurekaParamObject, List<HeurekaParam>>
			= new Manager<HeurekaParam, IHeurekaParamObject, List<HeurekaParam>>(HeurekaParam, List, connection)
	) {}

	insertList(heurekaParamList: List<HeurekaParam>, callback: (e: Error, heurekaParamList?: List<HeurekaParam>) => void) {
		this.manager.insertList(heurekaParamList, callback);
	}

	insert(heurekaParam: HeurekaParam, callback: (e: Error, heurekaParam?: HeurekaParam) => void) {
		this.manager.insert(heurekaParam, callback);
	}
}
