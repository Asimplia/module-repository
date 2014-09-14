
import Repository = require('../index');
import List = require('../Entity/List');
import Customer = require('../Entity/EShop/Customer');
import Matrix = require('../Entity/Matrix/Matrix');

export = CustomerLoader;
class CustomerLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, customerList?: List<Customer>) => void) {
		var sql = 'SELECT warehouse.'+Customer.TABLE_NAME+'.* FROM warehouse.'+Customer.TABLE_NAME+' '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' '
			+' ON analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CUSTOMER_ID+' = warehouse.'+Customer.TABLE_NAME+'.'+Customer.COLUMN_CUSTOMER_ID+' '
			+' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = warehouse.'+Customer.TABLE_NAME+'.'+Customer.COLUMN_E_SHOP_ID+' '
			+' WHERE warehouse.'+Customer.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' GROUP BY warehouse.'+Customer.TABLE_NAME+'.'+Customer.COLUMN_E_SHOP_ID+', warehouse.'+Customer.TABLE_NAME+'.'+Customer.COLUMN_CUSTOMER_ID+' '
			+' ORDER BY warehouse.'+Customer.TABLE_NAME+'.'+Customer.COLUMN_CUSTOMER_ID+' ';
		this.connection.query(sql, 
			[eShopId, loadId], (e, result) => {
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
		result.rows.forEach((row) => {
			var record = Customer.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
