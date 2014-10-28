var EntityPreparer = require('../Entity/EntityPreparer');

var _ = require('underscore');

var SqlExecutor = (function () {
    function SqlExecutor(connection, EntityStatic, idColumnName, idKeyName) {
        this.connection = connection;
        this.EntityStatic = EntityStatic;
        this.idColumnName = idColumnName;
        this.idKeyName = idKeyName;
    }
    SqlExecutor.prototype.insertList = function (list, callback) {
        var _this = this;
        var params = [];
        var placeholderRows = [];
        var placeholderIndex = 0;
        list.forEach(function (entity) {
            var placeholders = [];
            var object = entity.toObject();
            _.each(Object.keys(object), function (key) {
                if (key === _this.idKeyName) {
                    return;
                }
                var value = object[key];
                placeholderIndex++;
                params.push(value);
                placeholders.push('$' + placeholderIndex);
            });
            placeholderRows.push(placeholders.join(','));
        });
        var columns = EntityPreparer.getTablePlainColumns(this.EntityStatic);
        var noIdColumns = _.filter(columns, function (column) {
            return column !== _this.idColumnName;
        });
        var sql = "INSERT INTO " + this.EntityStatic.TABLE_NAME + ' (' + noIdColumns + ') VALUES (' + placeholderRows.join('),(') + ')';
        this.connection.query(sql, params, function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, list);
        });
    };
    return SqlExecutor;
})();
module.exports = SqlExecutor;
