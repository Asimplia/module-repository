var Repository = require('../index');
var List = require('../Entity/List');
var Category = require('../Entity/EShop/Category');
var Matrix = require('../Entity/Matrix/Matrix');
var EntityPreparer = require('../Entity/EntityPreparer');

var CategoryLoader = (function () {
    function CategoryLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    CategoryLoader.prototype.getListByEShopIdAndLoadIdInMatrixes = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ') + ' ' + ' FROM ' + Category.TABLE_NAME + ' ' + ' JOIN ' + Matrix.TABLE_NAME + ' ' + ' ON ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' = ' + Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID + ' ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = ' + Category.TABLE_NAME + '.' + Category.COLUMN_E_SHOP_ID + ' ' + ' WHERE ' + Category.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' GROUP BY ' + Category.TABLE_NAME + '.' + Category.COLUMN_E_SHOP_ID + ', ' + Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID + ' ' + ' ORDER BY ' + Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID + ' ';
        this.connection.query(sql, [eShopId, loadId], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    CategoryLoader.prototype.getListCreatedFrom = function (createdDateFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (createdDateFrom) {
            where.push(Category.COLUMN_DATE_CREATED + ' > $1::timestamp');
            parameters.push(createdDateFrom);
        }
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ') + ' ' + ' FROM ' + Category.TABLE_NAME + ' ' + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    CategoryLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = Category.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return CategoryLoader;
})();
module.exports = CategoryLoader;
