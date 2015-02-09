
import HeurekaDelivery = require('../Entity/Feed/HeurekaDelivery');
import List = require('../Entity/List');
import SqlExecutor = require('../Util/SqlExecutor');

export = HeurekaDeliveryRecorder;
class HeurekaDeliveryRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.HeurekaDeliveryRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, HeurekaDelivery, HeurekaDelivery.COLUMN_HEUREKA_DELIVERY_ID, 'id');
	}

	insert(heurekaDelivery: HeurekaDelivery, callback: (e: Error, heurekaDelivery?: HeurekaDelivery) => void) {
		this.sqlExecutor.insert(heurekaDelivery, callback);
	}

	insertList(list: List<HeurekaDelivery>, callback: (e: Error, list?: List<HeurekaDelivery>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
