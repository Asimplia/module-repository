var AsimpliaRepository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Matrix = require('../Entity/Matrix/Matrix');
var Product = require('../Entity/EShop/Product');
var Customer = require('../Entity/EShop/Customer');
var Channel = require('../Entity/EShop/Channel');
var List = require('../Entity/List');

var SignalLoader = (function () {
    function SignalLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SignalLoader.prototype.getListByEShopId = function (eShopId, callback) {
        this.connection.query('SELECT * FROM analytical.' + Signal.TABLE_NAME + ' ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1', [
            eShopId
        ], function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            var list = new List();
            result.rows.forEach(function (row) {
                var signal = Signal.fromRow(row);
                list.push(signal);
            });
            callback(null, list);
        });
    };

    SignalLoader.prototype.getListWithoutSituation = function (eShopId, callback) {
        this.connection.query('SELECT * FROM analytical.' + Signal.TABLE_NAME + ' ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 AND ' + Signal.COLUMN_SITUATION_ID + ' IS NULL', [
            eShopId
        ], function (e, result) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            var list = new List();
            result.rows.forEach(function (row) {
                var signal = Signal.fromRow(row);
                list.push(signal);
            });
            callback(null, list);
        });
    };

    SignalLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, filter, callback) {
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
        this.connection.query('SELECT * FROM analytical.' + Signal.TABLE_NAME + ' ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + filterWhere + ' LIMIT $3 OFFSET $4 ', [
            eShopId, loadId, limit, offset
        ], function (e, result) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            var list = new List();
            result.rows.forEach(function (row) {
                var signal = Signal.fromRow(row);
                list.push(signal);
            });
            callback(null, list);
        });
    };
    return SignalLoader;
})();
module.exports = SignalLoader;
