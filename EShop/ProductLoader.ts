
import Repository = require('../index');
import List = require('../Entity/List');
import Product = require('../Entity/EShop/Product');
import Matrix = require('../Entity/Matrix/Matrix');

export = ProductLoader;
class ProductLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, productList?: List<Product>) => void) {
		var sql = 'SELECT warehouse.'+Product.TABLE_NAME+'.* FROM warehouse.'+Product.TABLE_NAME+' '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' '
			+' ON analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_PRODUCT_ID+' = warehouse.'+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' '
			+' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = warehouse.'+Product.TABLE_NAME+'.'+Product.COLUMN_E_SHOP_ID+' '
			+' WHERE warehouse.'+Product.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' GROUP BY warehouse.'+Product.TABLE_NAME+'.'+Product.COLUMN_E_SHOP_ID+', warehouse.'+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' '
			+' ORDER BY warehouse.'+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' ';
		this.connection.query(sql, 
			[eShopId, loadId], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Product>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Product>();
		result.rows.forEach((row) => {
			var record = Product.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
