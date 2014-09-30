var ScriptTypeEnum = require('./Error/ScriptTypeEnum');
var NotAllowedNull = require('./Error/NotAllowedNull');
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
        var prefix = this.getTypeName(EntityStatic);
        var columns = _.map(EntityStatic, function (columnName, keyName) {
            return keyName.substring(0, 7) === 'COLUMN_' ? columnName : null;
        });
        return _.filter(columns, function (column) {
            return column !== null;
        });
    };

    EntityPreparer.getTypeName = function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
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
