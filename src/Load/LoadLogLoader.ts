
import Repository = require('../index');
import List = require('../Entity/List');
import LoadLog = require('../Entity/Load/LoadLog');
import EntityPreparer = require('../Entity/EntityPreparer');

export = LoadLogLoader;
class LoadLogLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, list: List<LoadLog>) => void) {
		this.connection.query(
			'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(LoadLog).join(', ')+' FROM '+LoadLog.TABLE_NAME
			+' WHERE '+LoadLog.COLUMN_E_SHOP_ID+' = $1', 
			[eShopId], 
			(e, result) => {
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
		result.rows.forEach((row) => {
			list.push(LoadLog.fromRow(row));
		});
		callback(null, list);
	}
}
