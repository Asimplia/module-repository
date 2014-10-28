var Repository = require('../index');
var VisitRecord = require('../Entity/Site/VisitRecord');
var SqlExecutor = require('../Util/SqlExecutor');

var VisitRecordRecorder = (function () {
    function VisitRecordRecorder() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
            _this.sqlExecutor = new SqlExecutor(connection, VisitRecord, VisitRecord.COLUMN_VISIT_RECORD_ID, 'id');
        });
    }
    VisitRecordRecorder.prototype.insertList = function (list, callback) {
        this.sqlExecutor.insertList(list, callback);
    };
    return VisitRecordRecorder;
})();
module.exports = VisitRecordRecorder;
