var Repository = require('../index');
var List = require('../Entity/List');
var MatrixType = require('../Entity/Section/MatrixType');
var EntityPreparer = require('../Entity/EntityPreparer');

var MatrixTypeLoader = (function () {
    function MatrixTypeLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    MatrixTypeLoader.prototype.getListCreatedFrom = function (createdDateFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (createdDateFrom) {
            where.push(MatrixType.COLUMN_DATE_CREATED + ' > $1::timestamp');
            parameters.push(createdDateFrom);
        }
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(MatrixType).join(', ') + ' ' + ' FROM ' + MatrixType.TABLE_NAME + ' ' + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    MatrixTypeLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            list.push(MatrixType.fromRow(row));
        });
        callback(null, list);
    };
    return MatrixTypeLoader;
})();
module.exports = MatrixTypeLoader;
