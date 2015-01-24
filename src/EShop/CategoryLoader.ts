
import Repository = require('../index');
import List = require('../Entity/List');
import Category = require('../Entity/EShop/Category');
import Matrix = require('../Entity/Matrix/Matrix');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = CategoryLoader;
class CategoryLoader {
	
	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Category, Category.COLUMN_CATEGORY_ID, 'id');
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
			this.sqlExecutor.createListByResult(e, result, callback);
		});
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, categoryList: List<Category>) => void) {
		this.sqlExecutor.getListBy({ dateCreated: { $gt: createdDateFrom } }, callback);
	}
}
