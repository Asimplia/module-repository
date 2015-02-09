
import HeurekaParam = require('../Entity/Feed/HeurekaParam');
import List = require('../Entity/List');
import SqlExecutor = require('../Util/SqlExecutor');

export = HeurekaParamRecorder;
class HeurekaParamRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.HeurekaParamRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, HeurekaParam, HeurekaParam.COLUMN_HEUREKA_PARAM_ID, 'id');
	}

	insert(heurekaParam: HeurekaParam, callback: (e: Error, heurekaParam?: HeurekaParam) => void) {
		this.sqlExecutor.insert(heurekaParam, callback);
	}

	insertList(list: List<HeurekaParam>, callback: (e: Error, list?: List<HeurekaParam>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
