var ScriptTypeEnum = require('./Error/ScriptTypeEnum');
var NotAllowedNullError = require('./Error/Error/NotAllowedNullError');
var ColumnNotExistsInEntityError = require('./Error/Error/ColumnNotExistsInEntityError');

var moment = require('moment');

var EntityPreparer = (function () {
    function EntityPreparer() {
    }
    EntityPreparer.string = function (value) {
        if (EntityPreparer.isNull(value)) {
            console.warn(new NotAllowedNullError(2 /* STRING */));
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
            console.warn(new NotAllowedNullError(3 /* DATE */));
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
            console.warn(new NotAllowedNullError(4 /* BOOLEAN */));
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
            console.warn(new NotAllowedNullError(0 /* INT */));
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
            console.warn(new NotAllowedNullError(1 /* FLOAT */));
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

    EntityPreparer.getColumnsAsPrefixedAlias = function (EntityStatic) {
        var columns = [];
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                columns.push(EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName] + ' AS "' + EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName] + '"');
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

    EntityPreparer.getTablePlainColumns = function (EntityStatic) {
        var columns = [];
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                columns.push(EntityStatic[keyName]);
            }
        }
        return columns;
    };

    EntityPreparer.getTableColumnByKey = function (EntityStatic, key) {
        for (var i in Object.keys(EntityStatic)) {
            var keyName = Object.keys(EntityStatic)[i];
            if (keyName.substring(0, 7) === 'COLUMN_') {
                var underscoredKeyName = keyName.substring(7);
                var cammeledKeyName = EntityPreparer.getCammelCaseByUnderscore(underscoredKeyName);
                if (cammeledKeyName == key || (key == 'id' && cammeledKeyName.substring(EntityStatic.name.length).toLowerCase() == 'id')) {
                    return EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName];
                }
            }
        }
        throw new ColumnNotExistsInEntityError('Column with associated key ' + key + ' not exists' + EntityStatic);
    };

    EntityPreparer.getCammelCaseByUnderscore = function (underscored) {
        return underscored.toLowerCase().replace(/[_]([a-z0-9])/g, function (g) {
            return g[1].toUpperCase();
        });
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
