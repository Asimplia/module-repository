var Matrix = require('./Matrix');
var MatrixProduct = require('./MatrixProduct');
var SectionProvider = require('../../Entity/Section/SectionProvider');

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
        var matrix = this.createMatrixFromRow(o);
        return new Signal(o[Signal.COLUMN_SIGNAL_ID], matrix, o[Signal.COLUMN_DATE_CREATED]);
    };

    Signal.createMatrixFromRow = function (row) {
        var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
        var matrix;
        if (SectionProvider.isProduct(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionProvider.isCustomer(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionProvider.isChannel(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else {
            throw new Error('Not implemented');
        }
        return matrix;
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
