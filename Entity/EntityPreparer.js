var ScriptTypeEnum = require('./Error/ScriptTypeEnum');
var NotAllowedNull = require('./Error/NotAllowedNull');
var ColumnNotExistsInEntityError = require('./Error/Error/ColumnNotExistsInEntityError');
var moment = require('moment');
var _ = require('underscore');

var EntityPreparer = (function () {
    function EntityPreparer() {
    }
    EntityPreparer.string = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNull(2 /* STRING */));
            return null;
        }
        return "" + value;
    };

    EntityPreparer.stringOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.string(value);
    };

    EntityPreparer.date = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNull(3 /* DATE */));
            return null;
        }
        return moment(value).toDate();
    };

    EntityPreparer.dateOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.date(value);
    };

    EntityPreparer.boolean = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNull(4 /* BOOLEAN */));
            return null;
        }
        return !!value;
    };

    EntityPreparer.booleanOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.boolean(value);
    };

    EntityPreparer.int = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNull(0 /* INT */));
            return null;
        }
        return parseInt(value);
    };

    EntityPreparer.intOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.int(value);
    };

    EntityPreparer.float = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNull(1 /* FLOAT */));
            return null;
        }
        return parseFloat(value);
    };

    EntityPreparer.floatOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.float(value);
    };

    EntityPreparer.getPrefixedColumns = function (EntityStatic) {
        var prefix = EntityStatic.name;
        var columns = [];
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                columns.push(prefix + '_' + EntityStatic[keyName]);
            }
        }
        return columns;
    };

    EntityPreparer.getColumnsAsPrefixedAlias = function (EntityStatic) {
        var prefix = EntityStatic.name;
        var columns = [];
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                columns.push(EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName] + ' AS ' + EntityPreparer.getPrefixedColumn(EntityStatic, EntityStatic[keyName]));
            }
        }
        return columns;
    };

    EntityPreparer.getTableColumns = function (EntityStatic) {
        var columns = [];
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                columns.push(EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName]);
            }
        }
        return columns;
    };

    EntityPreparer.getPrefixedColumn = function (EntityStatic, column) {
        var prefix = EntityStatic.name;
        var prefixedColumn = prefix + '_' + column;
        if (!_.contains(EntityPreparer.getPrefixedColumns(EntityStatic), prefixedColumn)) {
            throw new ColumnNotExistsInEntityError('Column "' + column + '" not exists in Entity "' + prefix + '"');
        }
        return prefixedColumn;
    };

    EntityPreparer.now = function () {
        return moment().toDate();
    };

    EntityPreparer.isNull = function (value) {
        return value === null || typeof value === 'undefined';
    };

    EntityPreparer.fromDate = function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
    };
    return EntityPreparer;
})();
module.exports = EntityPreparer;
