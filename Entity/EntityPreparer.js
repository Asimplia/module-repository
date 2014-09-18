var TypeEnum = require('./Error/TypeEnum');
var NotAllowedNull = require('./Error/NotAllowedNull');

var EntityPreparer = (function () {
    function EntityPreparer() {
    }
    EntityPreparer.string = function (value) {
        if (EntityPreparer.isNull(value)) {
            throw new NotAllowedNull(2 /* STRING */);
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
            throw new NotAllowedNull(3 /* DATE */);
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
            throw new NotAllowedNull(4 /* BOOLEAN */);
        }
        return !!value;
    };

    EntityPreparer.int = function (value) {
        if (EntityPreparer.isNull(value)) {
            throw new NotAllowedNull(0 /* INT */);
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
            throw new NotAllowedNull(1 /* FLOAT */);
        }
        return parseFloat(value);
    };

    EntityPreparer.floatOrNull = function (value) {
        if (EntityPreparer.isNull(value)) {
            return null;
        }
        return EntityPreparer.float(value);
    };

    EntityPreparer.now = function () {
        return moment().toDate();
    };

    EntityPreparer.isNull = function (value) {
        return value === null || typeof value === 'undefined';
    };
    return EntityPreparer;
})();
module.exports = EntityPreparer;
