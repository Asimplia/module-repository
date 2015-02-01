
import HeurekaProduct = require('../Entity/Feed/HeurekaProduct');
import SqlExecutor = require('../Util/SqlExecutor');
import List = require('../Entity/List');

export = HeurekaProductRecorder;
class HeurekaProductRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.HeurekaProductRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, HeurekaProduct, HeurekaProduct.COLUMN_HEUREKA_PRODUCT_ID, 'id');
	}

	insertList(heurekaProductList: List<HeurekaProduct>, callback: (e: Error, heurekaProductList?: List<HeurekaProduct>) => void) {
		this.sqlExecutor.insertList(heurekaProductList, callback);
	}
}
