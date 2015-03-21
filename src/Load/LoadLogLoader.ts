
import List = require('../Entity/List');
import LoadLog = require('../Entity/Load/LoadLog');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = LoadLogLoader;
class LoadLogLoader {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, LoadLog, LoadLog.COLUMN_LOAD_LOG_ID, 'id');
	}

	getListByEShopId(eShopId: number, callback: (e: Error, list: List<LoadLog>) => void) {
		this.connection.query(
			'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(LoadLog).join(', ') + ' FROM ' + LoadLog.TABLE_NAME
			+ ' WHERE ' + LoadLog.COLUMN_E_SHOP_ID + ' = $1',
			[eShopId],
			(e: Error, result: any) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListLoadedFrom(loadedDateFrom: Date, callback: (e: Error, loadLogList: List<LoadLog>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (loadedDateFrom) {
			where.push(LoadLog.COLUMN_DATELOADED + ' > $1::timestamp');
			parameters.push(loadedDateFrom);
		}
		var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(LoadLog).join(', ') + ' '
			+ ' FROM ' + LoadLog.TABLE_NAME + ' '
			+ ' WHERE ' + where.join(' AND ');
		this.connection.query(sql, parameters, (e: Error, result: any) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, list?: List<LoadLog>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<LoadLog>();
		result.rows.forEach((row: any) => {
			list.push(LoadLog.fromRow(row));
		});
		callback(null, list);
	}
}
