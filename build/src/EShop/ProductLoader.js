var Repository = require('../index');
var List = require('../Entity/List');
var Product = require('../Entity/EShop/Product');
var Matrix = require('../Entity/Matrix/Matrix');
var EntityPreparer = require('../Entity/EntityPreparer');

var ProductLoader = (function () {
    function ProductLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    ProductLoader.prototype.getListByEShopIdAndLoadIdInMatrixes = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ' FROM ' + Product.TABLE_NAME + ' ' + ' JOIN ' + Matrix.TABLE_NAME + ' ' + ' ON ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' = ' + Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID + ' ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = ' + Product.TABLE_NAME + '.' + Product.COLUMN_E_SHOP_ID + ' ' + ' WHERE ' + Product.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' GROUP BY ' + Product.TABLE_NAME + '.' + Product.COLUMN_E_SHOP_ID + ', ' + Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID + ' ' + ' ORDER BY ' + Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID + ' ';
        this.connection.query(sql, [eShopId, loadId], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    ProductLoader.prototype.getListCreatedFrom = function (createdDateFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (createdDateFrom) {
            where.push(Product.COLUMN_DATE_CREATED + ' > $1::timestamp');
            parameters.push(createdDateFrom);
        }
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ' ' + ' FROM ' + Product.TABLE_NAME + ' ' + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    ProductLoader.prototype.getById = function (eShopId, productId, callback) {
        var _this = this;
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ' ' + ' FROM ' + Product.TABLE_NAME + ' ' + ' WHERE ' + Product.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID + ' = $2 ';
        this.connection.query(sql, [eShopId, productId], function (e, result) {
            _this.createListByResult(e, result, function (e, productList) {
                if (e) {
                    callback(e);
                    return;
                }
                if (productList.isEmpty()) {
                    callback(null, null);
                    return;
                }
                callback(null, productList.first());
            });
        });
    };

    ProductLoader.prototype.searchList = function (eShopId, query, callback) {
        var _this = this;
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ' ' + ' FROM ' + Product.TABLE_NAME + ' ' + ' WHERE ' + Product.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Product.COLUMN_NAME + ' LIKE \'%' + query + '%\' ';
        this.connection.query(sql, [eShopId], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    ProductLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = Product.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return ProductLoader;
})();
module.exports = ProductLoader;
