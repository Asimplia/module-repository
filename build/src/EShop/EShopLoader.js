var Repository = require('../index');
var EShop = require('../Entity/EShop/EShop');
var List = require('../Entity/List');
var EntityPreparer = require('../Entity/EntityPreparer');

var EShopLoader = (function () {
    function EShopLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    EShopLoader.prototype.getList = function (callback) {
        var _this = this;
        this.connection.query('SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ') + ' FROM ' + EShop.TABLE_NAME + ' ', [], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    EShopLoader.prototype.getListByNotInIds = function (ids, callback) {
        var _this = this;
        this.connection.query('SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ') + ' ' + ' FROM ' + EShop.TABLE_NAME + ' ' + (ids.length ? ' WHERE ' + EShop.COLUMN_E_SHOP_ID + ' NOT IN (' + ids.join(', ') + ')' : ''), [], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    EShopLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = EShop.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return EShopLoader;
})();
module.exports = EShopLoader;
