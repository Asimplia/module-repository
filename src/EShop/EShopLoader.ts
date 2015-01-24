
import Repository = require('../index');
import EShop = require('../Entity/EShop/EShop');
import List = require('../Entity/List');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = EShopLoader;
class EShopLoader {
	
	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, EShop, EShop.COLUMN_E_SHOP_ID, 'id');
	}

	getList(callback: (e: Error, eShopList: List<EShop>) => void) {
		this.connection.query(
			'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' FROM '+EShop.TABLE_NAME+' ', 
			[], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, eShopList: List<EShop>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (createdDateFrom) {
			where.push(EShop.COLUMN_DATE_CREATED+' > $1::timestamp');
			parameters.push(createdDateFrom);
		}
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' '
			+' FROM '+EShop.TABLE_NAME+' '
			+' WHERE '+where.join(' AND ');
		this.connection.query(sql, parameters, (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<EShop>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<EShop>();
		result.rows.forEach((row) => {
			var record = EShop.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
