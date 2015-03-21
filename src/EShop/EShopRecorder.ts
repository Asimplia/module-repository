
import EShop = require('../Entity/EShop/EShop');
import SqlExecutor = require('../Util/SqlExecutor');

export = EShopRecorder;
class EShopRecorder {

	private sqlExecutor: SqlExecutor;

	static $service = 'EShop.EShopRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, EShop, EShop.COLUMN_E_SHOP_ID, 'id');
	}

	insert(eShop: EShop, callback: (e: Error, eShop?: EShop) => void) {
		this.sqlExecutor.insert(eShop, callback);
	}
}
