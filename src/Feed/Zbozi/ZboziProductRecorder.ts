
import ZboziProduct = require('../../Entity/Feed/Zbozi/ZboziProduct');
import List = require('../../Entity/List');
import SqlExecutor = require('../../Util/SqlExecutor');

export = ZboziProductRecorder;
class ZboziProductRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.Zbozi.ZboziProductRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, ZboziProduct, ZboziProduct.COLUMN_ZBOZI_PRODUCT_ID, 'id');
	}

	insert(zboziProduct: ZboziProduct, callback: (e: Error, zboziProduct?: ZboziProduct) => void) {
		this.sqlExecutor.insert(zboziProduct, callback);
	}

	insertList(list: List<ZboziProduct>, callback: (e: Error, list?: List<ZboziProduct>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
