var Repository = require('asimplia-repository');
var VisitRecord = require('../Entity/Site/VisitRecord');
var EntityPreparer = require('../Entity/EntityPreparer');

var VisitRecordRecorder = (function () {
    function VisitRecordRecorder() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    VisitRecordRecorder.prototype.insertList = function (list, callback) {
        var params = [];
        var placeholders = [];
        var placeholderIndex = 0;
        list.forEach(function (visitRecord) {
            var object = visitRecord.toObject();
            _.each(Object.keys(object), function (key) {
                var value = object[key];
                placeholderIndex++;
                params.push(value);
                placeholders.push('$' + placeholderIndex);
            });
        });
        var sql = "INSERT INTO " + VisitRecord.TABLE_NAME + ' (' + EntityPreparer.getTableColumns(VisitRecord) + ') VALUES (' + placeholders + ')';
        this.connection.query(sql, params, function (e, result) {
            console.log(result);
        });
    };
    return VisitRecordRecorder;
})();
module.exports = VisitRecordRecorder;
