var AsimpliaRepository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Matrix = require('../Entity/Matrix/Matrix');
var Product = require('../Entity/EShop/Product');
var Customer = require('../Entity/EShop/Customer');
var Channel = require('../Entity/EShop/Channel');
var EShop = require('../Entity/EShop/EShop');
var List = require('../Entity/List');
var Category = require('../Entity/EShop/Category');
var EntityPreparer = require('../Entity/EntityPreparer');
var LoadLog = require('../Entity/Load/LoadLog');

var SignalLoader = (function () {
    function SignalLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SignalLoader.prototype.getListByEShopId = function (eShopId, callback) {
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1';
        this.connection.query(sql, [
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

    SignalLoader.prototype.getListWithoutSituation = function (eShopId, loadId, callback) {
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SITUATION_ID + ' IS NULL';
        this.connection.query(sql, [
            eShopId, loadId
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
            filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IN (' + filter.productIds.join(', ') + ') ';
        }
        if (filter.customerIds && filter.customerIds.length > 0) {
            filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IN (' + filter.customerIds.join(', ') + ') ';
        }
        if (filter.channelIds && filter.channelIds.length > 0) {
            filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IN (' + filter.channelIds.join(', ') + ') ';
        }
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + filterWhere + ' LIMIT $3 OFFSET $4 ';
        this.connection.query(sql, [
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

    SignalLoader.prototype.getDailyCount = function (countDays, callback) {
        var sql = "SELECT DATE_TRUNC('day', " + LoadLog.COLUMN_DATELOADED + ") AS date, " + " COUNT(" + Matrix.COLUMN_MATRIX_ID + ") AS count " + ' FROM ' + Signal.TABLE_NAME + ' ' + ' JOIN ' + Matrix.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' JOIN ' + LoadLog.TABLE_NAME + ' USING (' + Matrix.COLUMN_LOAD_ID + ', ' + Matrix.COLUMN_E_SHOP_ID + ') ' + ' GROUP BY date ' + ' ORDER BY date DESC ' + ' LIMIT $1 ';
        this.connection.query(sql, [
            countDays
        ], function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            var data = [];
            result.rows.forEach(function (row) {
                data.unshift({
                    date: EntityPreparer.date(row.date),
                    count: row.count
                });
            });
            callback(null, data);
        });
    };

    SignalLoader.prototype.getSelect = function () {
        return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ') + ' ';
    };

    SignalLoader.prototype.getFrom = function () {
        return Signal.TABLE_NAME + ' ' + ' JOIN ' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN ' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Category.TABLE_NAME + ' USING (' + Category.COLUMN_CATEGORY_ID + ', ' + Category.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + EShop.TABLE_NAME + ' USING (' + EShop.COLUMN_E_SHOP_ID + ') ';
    };
    return SignalLoader;
})();
module.exports = SignalLoader;
