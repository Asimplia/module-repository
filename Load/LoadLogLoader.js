var Repository = require('../index');
var List = Repository.Entity.List;
var LoadLog = Repository.Entity.Load.LoadLog;
Repository;

var LoadLogLoader = (function () {
    function LoadLogLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    LoadLogLoader.prototype.getList = function (callback) {
        var _this = this;
        this.connection.query('SELECT * FROM warehouse.' + LoadLog.TABLE_NAME + ' ', [], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    LoadLogLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            list.push(LoadLog.fromRow(row));
        });
        callback(null, list);
    };
    return LoadLogLoader;
})();
module.exports = LoadLogLoader;
