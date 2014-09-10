var AsimpliaRepository = require('../index');
var List = require('../Entity/List');
var Matrix = require('../Entity/Matrix/Matrix');
var Signal = require('../Entity/Matrix/Signal');

var MatrixFactory = require('../Entity/Matrix/MatrixFactory');

var MatrixLoader = (function () {
    function MatrixLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    MatrixLoader.prototype.getListByEShopId = function (eShopId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + 'WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL', [
            eShopId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndProductIdForLoad = function (eShopId, productId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_PRODUCT_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, productId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndCustomerIdForLoad = function (eShopId, customerId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_CUSTOMER_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, customerId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndChannelIdForLoad = function (eShopId, channelId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_CHANNEL_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, channelId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' LIMIT $3 OFFSET $4 ', [
            eShopId, loadId, limit, offset
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = MatrixFactory.createMatrixFromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return MatrixLoader;
})();
module.exports = MatrixLoader;
