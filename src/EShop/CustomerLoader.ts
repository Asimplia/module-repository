
import List = require('../Entity/List');
import Customer = require('../Entity/EShop/Customer');
import Matrix = require('../Entity/Matrix/Matrix');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = CustomerLoader;
class CustomerLoader {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Customer, Customer.COLUMN_CUSTOMER_ID, 'id');
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, customerList?: List<Customer>) => void) {
		var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ') + ' FROM ' + Customer.TABLE_NAME + ' '
			+ ' JOIN ' + Matrix.TABLE_NAME + ' '
			+ ' ON ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' = ' + Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = ' + Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID + ' '
			+ ' WHERE ' + Customer.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' GROUP BY ' + Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID + ', '
			+ Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' '
			+ ' ORDER BY ' + Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' ';
		this.connection.query(sql,
			[eShopId, loadId], (e: Error, result: any) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, customerList: List<Customer>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (createdDateFrom) {
			where.push(Customer.COLUMN_DATE_CREATED + ' > $1::timestamp');
			parameters.push(createdDateFrom);
		}
		var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ') + ' '
			+ ' FROM ' + Customer.TABLE_NAME + ' '
			+ ' WHERE ' + where.join(' AND ');
		this.connection.query(sql, parameters, (e: Error, result: any) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Customer>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Customer>();
		result.rows.forEach((row: any) => {
			var record = Customer.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
