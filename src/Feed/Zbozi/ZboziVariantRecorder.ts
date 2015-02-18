
import ZboziVariant = require('../../Entity/Feed/Zbozi/ZboziVariant');
import List = require('../../Entity/List');
import SqlExecutor = require('../../Util/SqlExecutor');

export = ZboziVariantRecorder;
class ZboziVariantRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.Zbozi.ZboziVariantRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, ZboziVariant, ZboziVariant.COLUMN_ZBOZI_VARIANT_ID, 'id');
	}

	insert(zboziVariant: ZboziVariant, callback: (e: Error, zboziVariant?: ZboziVariant) => void) {
		this.sqlExecutor.insert(zboziVariant, callback);
	}

	insertList(list: List<ZboziVariant>, callback: (e: Error, list?: List<ZboziVariant>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
