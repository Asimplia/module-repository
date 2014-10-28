
import Repository = require('../index');
import OrderProcessRecord = require('../Entity/Site/OrderProcessRecord');
import SqlExecutor = require('../Util/SqlExecutor');
import List = require('../Entity/List');

export = OrderProcessRecordRecorder;
class OrderProcessRecordRecorder {

	private connection;
	private sqlExecutor: SqlExecutor;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
			this.sqlExecutor = new SqlExecutor(connection, OrderProcessRecord, OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID, 'id');
		});
	}
	
	insertList(list: List<OrderProcessRecord>, callback: (e: Error, list?: List<OrderProcessRecord>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}
}
