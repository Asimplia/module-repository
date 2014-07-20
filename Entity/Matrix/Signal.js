var MatrixFactory = require('./MatrixFactory');

var Signal = (function () {
    function Signal(id, matrix, dateCreated) {
        this.id = id;
        this.matrix = matrix;
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
    Object.defineProperty(Signal.prototype, "Matrix", {
        get: function () {
            return this.matrix;
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
        var matrix = MatrixFactory.createMatrixFromRow(o);
        return new Signal(o[Signal.COLUMN_SIGNAL_ID], matrix, o[Signal.COLUMN_DATE_CREATED]);
    };

    Signal.toObject = function (entity) {
    };

    Signal.prototype.toObject = function () {
        return Signal.toObject(this);
    };
    Signal.TABLE_NAME = 'signal';
    Signal.COLUMN_SIGNAL_ID = 'signalid';
    Signal.COLUMN_MATRIX_ID = 'matrixid';
    Signal.COLUMN_DATE_CREATED = 'datecreated';
    return Signal;
})();
module.exports = Signal;
