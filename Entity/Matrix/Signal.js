var MatrixProduct = require('./MatrixProduct');

var Signal = (function () {
    function Signal(id, record, dateCreated) {
        this.id = id;
        this.record = record;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(Signal.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Signal.prototype, "Record", {
        get: function () {
            return this.record;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Signal.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });

    Signal.fromRow = function (o) {
        return new Signal(o.SignalID, Signal.createRecordFromRow(o), o.DateCreated);
    };

    Signal.toObject = function (entity) {
    };

    Signal.prototype.toObject = function () {
        return Signal.toObject(this);
    };

    Signal.createRecordFromRow = function (o) {
        switch (o.MatrixType) {
            case 'MP1':
                return MatrixProduct.fromRow(o);
            default:
                throw new Error('Not implemented');
        }
    };
    return Signal;
})();
module.exports = Signal;
