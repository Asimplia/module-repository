
import Repository = require('../index');
import Company = require('../Entity/EShop/Company');
import List = require('../Entity/List');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = CompanyLoader;
class CompanyLoader {
	
	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Company, Company.COLUMN_COMPANY_ID, 'id');
	}

	getList(callback: (e: Error, eShopList: List<Company>) => void) {
		this.connection.query(
			'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Company).join(', ')+' FROM '+Company.TABLE_NAME+' ', 
			[], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, eShopList: List<Company>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (createdDateFrom) {
			where.push(Company.COLUMN_DATE_CREATED+' > $1::timestamp');
			parameters.push(createdDateFrom);
		}
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Company).join(', ')+' '
			+' FROM '+Company.TABLE_NAME+' '
			+' WHERE '+where.join(' AND ');
		this.connection.query(sql, parameters, (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Company>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Company>();
		result.rows.forEach((row) => {
			var record = Company.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
