
import Repository = require('../index');
import EShop = require('../Entity/EShop/EShop');
import List = require('../Entity/List');
import EntityPreparer = require('../Entity/EntityPreparer');

export = EShopLoader;
class EShopLoader {
	

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getList(callback: (e: Error, eShopList: List<EShop>) => void) {
		this.connection.query(
			'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' FROM '+EShop.TABLE_NAME+' ', 
			[], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListByNotInIds(ids: number[], callback: (e: Error, eShopList: List<EShop>) => void) {
		this.connection.query('SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' '
			+' FROM '+EShop.TABLE_NAME+' '
			+(ids.length ? ' WHERE '+EShop.COLUMN_E_SHOP_ID+' NOT IN ('+ids.join(', ')+')' : ''), 
			[], (e, result) => {
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
