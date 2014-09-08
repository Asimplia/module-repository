var Repository = require('../index');
var EShop = require('../Entity/EShop/EShop');
var List = require('../Entity/List');

var EShopLoader = (function () {
    function EShopLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    EShopLoader.prototype.getList = function (callback) {
        var _this = this;
        this.connection.query('SELECT * FROM warehouse.' + EShop.TABLE_NAME + ' ', [], function (e, result) {
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
