var Repository = require('../index');
var List = require('../Entity/List');
var Customer = require('../Entity/EShop/Customer');
var Matrix = require('../Entity/Matrix/Matrix');

var CustomerLoader = (function () {
    function CustomerLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    CustomerLoader.prototype.getListByEShopIdAndLoadIdInMatrixes = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT warehouse.' + Customer.TABLE_NAME + '.* FROM warehouse.' + Customer.TABLE_NAME + ' ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' ' + ' ON analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' = warehouse.' + Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' ' + ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = warehouse.' + Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID + ' ' + ' WHERE warehouse.' + Customer.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' GROUP BY warehouse.' + Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID + ', warehouse.' + Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' ' + ' ORDER BY warehouse.' + Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID + ' ';
        this.connection.query(sql, [eShopId, loadId], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    CustomerLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = Customer.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return CustomerLoader;
})();
module.exports = CustomerLoader;
