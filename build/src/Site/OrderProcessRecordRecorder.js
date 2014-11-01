var Repository = require('../index');
var OrderProcessRecord = require('../Entity/Site/OrderProcessRecord');
var SqlExecutor = require('../Util/SqlExecutor');

var OrderProcessRecordRecorder = (function () {
    function OrderProcessRecordRecorder() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
            _this.sqlExecutor = new SqlExecutor(connection, OrderProcessRecord, OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID, 'id');
        });
    }
    OrderProcessRecordRecorder.prototype.insertList = function (list, callback) {
        this.sqlExecutor.insertList(list, callback);
    };

    OrderProcessRecordRecorder.prototype.removeByDateAndQuery = function (eShopId, dateFrom, dateTo, query, callback) {
        this.sqlExecutor.removeBy({ eShopId: eShopId, dateChanged: { $gte: dateFrom, $lte: dateTo }, query: query }, callback);
    };
    return OrderProcessRecordRecorder;
})();
module.exports = OrderProcessRecordRecorder;