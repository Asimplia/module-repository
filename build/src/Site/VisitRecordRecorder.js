var Repository = require('../index');
var VisitRecord = require('../Entity/Site/VisitRecord');
var EntityPreparer = require('../Entity/EntityPreparer');

var _ = require('underscore');

var VisitRecordRecorder = (function () {
    function VisitRecordRecorder() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    VisitRecordRecorder.prototype.insertList = function (list, callback) {
        var params = [];
        var placeholderRows = [];
        var placeholderIndex = 0;
        list.forEach(function (visitRecord) {
            var placeholders = [];
            var object = visitRecord.toObject();
            _.each(Object.keys(object), function (key) {
                if (key === 'id') {
                    return;
                }
                var value = object[key];
                placeholderIndex++;
                params.push(value);
                placeholders.push('$' + placeholderIndex);
            });
            placeholderRows.push(placeholders.join(','));
        });
        var columns = EntityPreparer.getTablePlainColumns(VisitRecord);
        var sql = "INSERT INTO " + VisitRecord.TABLE_NAME + ' (' + _.filter(columns, function (column) {
            return column !== VisitRecord.COLUMN_VISIT_RECORD_ID;
        }) + ') VALUES (' + placeholderRows.join('),(') + ')';
        this.connection.query(sql, params, function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, list);
        });
    };
    return VisitRecordRecorder;
})();
module.exports = VisitRecordRecorder;
