
import Repository = require('../index');
import VisitRecord = require('../Entity/Site/VisitRecord');
import SqlExecutor = require('../Util/SqlExecutor');
import List = require('../Entity/List');

export = VisitRecordRecorder;
class VisitRecordRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, VisitRecord, VisitRecord.COLUMN_VISIT_RECORD_ID, 'id');
	}
	
	insertList(list: List<VisitRecord>, callback: (e: Error, list?: List<VisitRecord>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}

	removeByDateAndQuery(eShopId: number, dateFrom: Date, dateTo: Date, query: string, callback: (e: Error) => void) {
		this.sqlExecutor.removeBy({ eShopId: eShopId, dateChanged: { $gte: dateFrom, $lte: dateTo }, query: query }, callback);
	}
}
