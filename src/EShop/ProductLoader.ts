
import Repository = require('../index');
import List = require('../Entity/List');
import Product = require('../Entity/EShop/Product');
import Matrix = require('../Entity/Matrix/Matrix');
import EntityPreparer = require('../Entity/EntityPreparer');

export = ProductLoader;
class ProductLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, productList?: List<Product>) => void) {
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+' FROM '+Product.TABLE_NAME+' '
			+' JOIN '+Matrix.TABLE_NAME+' '
			+' ON '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_PRODUCT_ID+' = '+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = '+Product.TABLE_NAME+'.'+Product.COLUMN_E_SHOP_ID+' '
			+' WHERE '+Product.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' GROUP BY '+Product.TABLE_NAME+'.'+Product.COLUMN_E_SHOP_ID+', '+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' '
			+' ORDER BY '+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' ';
		this.connection.query(sql, 
			[eShopId, loadId], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getById(eShopId: number, productId: number, callback: (e: Error, product?: Product) => void) {
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+' '
			+' FROM '+Product.TABLE_NAME+' '
			+' WHERE '+Product.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Product.TABLE_NAME+'.'+Product.COLUMN_PRODUCT_ID+' = $2 ';
		this.connection.query(sql, 
			[eShopId, productId], (e, result) => {
			this.createListByResult(e, result, (e: Error, productList?: List<Product>) => {
				if (e) {
					callback(e);
					return;
				}
				if (productList.isEmpty()) {
					callback(null, null);
					return;
				}
				callback(null, productList.first());
			});
		});
	}

	searchList(eShopId: number, query: string, callback: (e: Error, productList?: List<Product>) => void) {
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+' '
			+' FROM '+Product.TABLE_NAME+' '
			+' WHERE '+Product.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Product.COLUMN_NAME+' LIKE \'%'+query+'%\' ';
		this.connection.query(sql, 
			[eShopId], (e, result) => {
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
