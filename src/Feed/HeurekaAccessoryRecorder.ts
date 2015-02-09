
import HeurekaAccessory = require('../Entity/Feed/HeurekaAccessory');
import List = require('../Entity/List');
import SqlExecutor = require('../Util/SqlExecutor');

export = HeurekaAccessoryRecorder;
class HeurekaAccessoryRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.HeurekaAccessoryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, HeurekaAccessory, HeurekaAccessory.COLUMN_HEUREKA_ACCESSORY_ID, 'id');
	}

	insert(heurekaAccessory: HeurekaAccessory, callback: (e: Error, heurekaAccessory?: HeurekaAccessory) => void) {
		this.sqlExecutor.insert(heurekaAccessory, callback);
	}

	insertList(list: List<HeurekaAccessory>, callback: (e: Error, list?: List<HeurekaAccessory>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
