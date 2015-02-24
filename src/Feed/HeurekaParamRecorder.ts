
import HeurekaParam = require('../Entity/Feed/HeurekaParam');
import IHeurekaParamObject = require('../Entity/Feed/IHeurekaParamObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = HeurekaParamRecorder;
class HeurekaParamRecorder {
	
	private manager: Manager<HeurekaParam, IHeurekaParamObject>;

	static $service = 'Feed.HeurekaParamRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<HeurekaParam, IHeurekaParamObject>(HeurekaParam, connection);
	}

	insertList(heurekaParamList: List<HeurekaParam>, callback: (e: Error, heurekaParamList?: List<HeurekaParam>) => void) {
		this.manager.insertList(heurekaParamList, callback);
	}

	insert(heurekaParam: HeurekaParam, callback: (e: Error, heurekaParam?: HeurekaParam) => void) {
		this.manager.insert(heurekaParam, callback);
	}
}
