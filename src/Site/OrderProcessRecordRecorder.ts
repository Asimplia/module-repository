
import OrderProcessRecord = require('../Entity/Site/OrderProcessRecord');
import SqlExecutor = require('../Util/SqlExecutor');
import List = require('../Entity/List');

export = OrderProcessRecordRecorder;
class OrderProcessRecordRecorder {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, OrderProcessRecord, OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID, 'id');
	}

	insertList(list: List<OrderProcessRecord>, callback: (e: Error, list?: List<OrderProcessRecord>) => void) {
		this.sqlExecutor.insertList(list, callback);
	}

	removeByDateAndQuery(eShopId: number, dateFrom: Date, dateTo: Date, query: string, callback: (e: Error) => void) {
		this.sqlExecutor.removeBy({ eShopId: eShopId, dateChanged: { $gte: dateFrom, $lte: dateTo }, query: query }, callback);
	}
}
