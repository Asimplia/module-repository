var Repository = require('../index');
var List = Repository.Entity.List;
var LoadLog = Repository.Entity.Load.LoadLog;
var EntityPreparer = require('../Entity/EntityPreparer');
Repository;

var LoadLogLoader = (function () {
    function LoadLogLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    LoadLogLoader.prototype.getListByEShopId = function (eShopId, callback) {
        var _this = this;
        this.connection.query('SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(LoadLog).join(', ') + ' FROM ' + LoadLog.TABLE_NAME + ' WHERE ' + LoadLog.COLUMN_E_SHOP_ID + ' = $1', [eShopId], function (e, result) {
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
