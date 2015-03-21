
import List = require('../Entity/List');
import MatrixType = require('../Entity/Section/MatrixType');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');

export = MatrixTypeLoader;
class MatrixTypeLoader {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, MatrixType, null, null); //TODO
	}

	getListCreatedFrom(createdDateFrom: Date, callback: (e: Error, matrixTypeList: List<MatrixType>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (createdDateFrom) {
			where.push(MatrixType.COLUMN_DATE_CREATED + ' > $1::timestamp');
			parameters.push(createdDateFrom);
		}
		var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(MatrixType).join(', ') + ' '
			+ ' FROM ' + MatrixType.TABLE_NAME + ' '
			+ ' WHERE ' + where.join(' AND ');
		this.connection.query(sql, parameters, (e: Error, result: any) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, list?: List<MatrixType>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<MatrixType>();
		result.rows.forEach((row: any) => {
			list.push(MatrixType.fromRow(row));
		});
		callback(null, list);
	}
}
