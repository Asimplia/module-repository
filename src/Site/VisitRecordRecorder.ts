
import Repository = require('../index');
import VisitRecord = require('../Entity/Site/VisitRecord');
import SqlExecutor = require('../Util/SqlExecutor');
import List = require('../Entity/List');

export = VisitRecordRecorder;
class VisitRecordRecorder {

	private connection;
	private sqlExecutor: SqlExecutor;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
			this.sqlExecutor = new SqlExecutor(connection, VisitRecord, VisitRecord.COLUMN_VISIT_RECORD_ID, 'id');
		});
	}
	
	insertList(list: List<VisitRecord>, callback: (e: Error, list?: List<VisitRecord>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
