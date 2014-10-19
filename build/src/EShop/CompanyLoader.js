var Repository = require('../index');
var Company = require('../Entity/EShop/Company');
var List = require('../Entity/List');
var EntityPreparer = require('../Entity/EntityPreparer');

var CompanyLoader = (function () {
    function CompanyLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    CompanyLoader.prototype.getList = function (callback) {
        var _this = this;
        this.connection.query('SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Company).join(', ') + ' FROM ' + Company.TABLE_NAME + ' ', [], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    CompanyLoader.prototype.getListCreatedFrom = function (createdDateFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (createdDateFrom) {
            where.push(Company.COLUMN_DATE_CREATED + ' > $1::timestamp');
            parameters.push(createdDateFrom);
        }
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Company).join(', ') + ' ' + ' FROM ' + Company.TABLE_NAME + ' ' + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    CompanyLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = Company.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return CompanyLoader;
})();
module.exports = CompanyLoader;
