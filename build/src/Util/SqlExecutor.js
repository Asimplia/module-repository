var EntityPreparer = require('../Entity/EntityPreparer');

var _ = require('underscore');
var moment = require('moment');

var SqlExecutor = (function () {
    function SqlExecutor(connection, EntityStatic, idColumnName, idKeyName) {
        this.connection = connection;
        this.EntityStatic = EntityStatic;
        this.idColumnName = idColumnName;
        this.idKeyName = idKeyName;
    }
    SqlExecutor.prototype.insertList = function (list, callback) {
        var _this = this;
        if (list.isEmpty()) {
            callback(null, list);
            return;
        }
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

    SqlExecutor.prototype.removeBy = function (conditions, callback) {
        var where = this.getWhereByConditions(conditions);
        var sql = 'DELETE FROM ' + this.EntityStatic.TABLE_NAME + ' ' + ' WHERE ' + where.sql;
        this.connection.query(sql, where.params, function (e) {
            if (e) {
                callback(e);
                return;
            }
            callback(null);
        });
    };

    SqlExecutor.prototype.getWhereByConditions = function (conditions) {
        var _this = this;
        var params = [];
        var whereParts = [];
        var placeholderIndex = 0;
        _.each(Object.keys(conditions), function (key) {
            var value = conditions[key];
            var column = EntityPreparer.getTableColumnByKey(_this.EntityStatic, key);
            if (typeof value === 'object') {
                if (typeof value.$gt !== 'undefined') {
                    placeholderIndex++;
                    whereParts.push(' ' + column + ' > $' + placeholderIndex) + ' ';
                    params.push(_this.prepareValue(value.$gt));
                }
                if (typeof value.$lt !== 'undefined') {
                    placeholderIndex++;
                    whereParts.push(' ' + column + ' < $' + placeholderIndex) + ' ';
                    params.push(_this.prepareValue(value.$lt));
                }
                if (typeof value.$gte !== 'undefined') {
                    placeholderIndex++;
                    whereParts.push(' ' + column + ' >= $' + placeholderIndex) + ' ';
                    params.push(_this.prepareValue(value.$gte));
                }
                if (typeof value.$lte !== 'undefined') {
                    placeholderIndex++;
                    whereParts.push(' ' + column + ' <= $' + placeholderIndex) + ' ';
                    params.push(_this.prepareValue(value.$lte));
                }
            } else {
                placeholderIndex++;
                whereParts.push(' ' + column + ' = $' + placeholderIndex) + ' ';
                params.push(_this.prepareValue(value));
            }
        });
        return {
            sql: whereParts.join(' AND '),
            params: params
        };
    };

    SqlExecutor.prototype.prepareValue = function (value) {
        if (value instanceof Date) {
            return moment(value).add(value.getTimezoneOffset(), 'minutes').toDate();
        }
        return value;
    };
    return SqlExecutor;
})();
module.exports = SqlExecutor;
