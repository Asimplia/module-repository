
import Repository = require('../index');
import List = require('../Entity/List');
import Category = require('../Entity/EShop/Category');
import Matrix = require('../Entity/Matrix/Matrix');
import EntityPreparer = require('../Entity/EntityPreparer');

export = CategoryLoader;
class CategoryLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, categoryList?: List<Category>) => void) {
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ')+' '
			+' FROM '+Category.TABLE_NAME+' '
			+' JOIN '+Matrix.TABLE_NAME+' '
			+' ON '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CATEGORY_ID+' = '+Category.TABLE_NAME+'.'+Category.COLUMN_CATEGORY_ID+' '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = '+Category.TABLE_NAME+'.'+Category.COLUMN_E_SHOP_ID+' '
			+' WHERE '+Category.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' GROUP BY '+Category.TABLE_NAME+'.'+Category.COLUMN_E_SHOP_ID+', '+Category.TABLE_NAME+'.'+Category.COLUMN_CATEGORY_ID+' '
			+' ORDER BY '+Category.TABLE_NAME+'.'+Category.COLUMN_CATEGORY_ID+' ';
		this.connection.query(sql, 
			[eShopId, loadId], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, categoryList: List<Category>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (createdDateFrom) {
			where.push(Category.COLUMN_DATE_CREATED+' > $1::timestamp');
			parameters.push(createdDateFrom);
		}
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ')+' '
			+' FROM '+Category.TABLE_NAME+' '
			+' WHERE '+where.join(' AND ');
		this.connection.query(sql, parameters, (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Category>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Category>();
		result.rows.forEach((row) => {
			var record = Category.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
