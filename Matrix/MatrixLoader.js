var AsimpliaRepository = require('../index');
var List = require('../Entity/List');
var Matrix = require('../Entity/Matrix/Matrix');
var Signal = require('../Entity/Matrix/Signal');
var Product = require('../Entity/EShop/Product');
var Customer = require('../Entity/EShop/Customer');
var Channel = require('../Entity/EShop/Channel');

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
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL', [
            eShopId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndProductIdForLoad = function (eShopId, productId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_PRODUCT_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, productId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndCustomerIdForLoad = function (eShopId, customerId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_CUSTOMER_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, customerId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndChannelIdForLoad = function (eShopId, channelId, loadId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.COLUMN_CHANNEL_ID + ' = $3 ' + ' AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ', [
            eShopId, loadId, channelId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, filter, callback) {
        var _this = this;
        var filterWhere = '';
        if (filter.productIds && filter.productIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IN (' + filter.productIds.join(', ') + ') ';
        }
        if (filter.customerIds && filter.customerIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IN (' + filter.customerIds.join(', ') + ') ';
        }
        if (filter.channelIds && filter.channelIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IN (' + filter.channelIds.join(', ') + ') ';
        }
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + filterWhere + ' LIMIT $3 OFFSET $4 ', [
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
