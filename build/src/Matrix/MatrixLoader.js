var Repository = require('../index');
var List = require('../Entity/List');
var Matrix = require('../Entity/Matrix/Matrix');
var Signal = require('../Entity/Matrix/Signal');
var Product = require('../Entity/EShop/Product');
var Customer = require('../Entity/EShop/Customer');
var Channel = require('../Entity/EShop/Channel');
var Category = require('../Entity/EShop/Category');
var EShop = require('../Entity/EShop/EShop');

var MatrixFactory = require('../Entity/Matrix/MatrixFactory');
var EntityPreparer = require('../Entity/EntityPreparer');
var LoadLog = require('../Entity/Load/LoadLog');

var MatrixLoader = (function () {
    function MatrixLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    MatrixLoader.prototype.getListNotSignal = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL';
        this.connection.query(sql, [
            eShopId, loadId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndProductIdForLoad = function (eShopId, productId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' = $3 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
        this.connection.query(sql, [
            eShopId, loadId, productId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndCustomerIdForLoad = function (eShopId, customerId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' = $3 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
        this.connection.query(sql, [
            eShopId, loadId, customerId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndChannelIdForLoad = function (eShopId, channelId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' = $3 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
        this.connection.query(sql, [
            eShopId, loadId, channelId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndCategoryIdForLoad = function (eShopId, categoryId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' = $3 ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
        this.connection.query(sql, [
            eShopId, loadId, categoryId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndOtherNullForLoad = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IS NULL ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IS NULL ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' IS NULL ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IS NULL ' + ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
        this.connection.query(sql, [
            eShopId, loadId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, filter, callback) {
        var _this = this;
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
        if (filter.categoryIds && filter.categoryIds.length > 0) {
            filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' IN (' + filter.categoryIds.join(', ') + ') ';
        }
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + filterWhere + ' LIMIT $3 OFFSET $4 ';
        this.connection.query(sql, [
            eShopId, loadId, limit, offset
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getDailyCount = function (countDays, callback) {
        var sql = "SELECT DATE_TRUNC('day', " + LoadLog.COLUMN_DATELOADED + ") AS date, " + " COUNT(" + Matrix.COLUMN_MATRIX_ID + ") AS count " + ' FROM ' + Matrix.TABLE_NAME + ' ' + ' JOIN ' + LoadLog.TABLE_NAME + ' USING (' + Matrix.COLUMN_LOAD_ID + ', ' + Matrix.COLUMN_E_SHOP_ID + ') ' + ' GROUP BY date ' + ' ORDER BY date DESC ' + ' LIMIT $1 ';
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

    MatrixLoader.prototype.getListValidFrom = function (validFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (validFrom) {
            where.push(Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID + ' > $1::timestamp');
            parameters.push(validFrom);
        }
        var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom() + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixLoader.prototype.getSelect = function () {
        return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ') + ', ' + EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ') + ' ';
    };

    MatrixLoader.prototype.getFrom = function () {
        return '' + Matrix.TABLE_NAME + ' ' + ' LEFT JOIN ' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN ' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + Category.TABLE_NAME + ' USING (' + Category.COLUMN_CATEGORY_ID + ', ' + Category.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN ' + EShop.TABLE_NAME + ' USING (' + EShop.COLUMN_E_SHOP_ID + ') ';
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
