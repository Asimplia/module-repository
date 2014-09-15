var MatrixFactory = require('./MatrixFactory');
var moment = require('moment');

var Signal = (function () {
    function Signal(id, matrix, dateCreated, situationId) {
        this.id = id;
        this.matrix = matrix;
        this.dateCreated = dateCreated;
        this.situationId = situationId;
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
    Object.defineProperty(Signal.prototype, "SituationId", {
        get: function () {
            return this.situationId;
        },
        set: function (value) {
            this.situationId = value;
        },
        enumerable: true,
        configurable: true
    });

    Signal.fromRow = function (o) {
        return new Signal(parseInt(o[Signal.COLUMN_SIGNAL_ID]), MatrixFactory.createMatrixFromRow(o), moment(o[Signal.COLUMN_DATE_CREATED]).toDate(), parseInt(o[Signal.COLUMN_SITUATION_ID]));
    };

    Signal.toObject = function (entity) {
        return {
            id: entity.id,
            matrix: entity.Matrix.toObject(),
            dateCreated: moment(entity.dateCreated).format('YYYY-MM-DD HH:mm:ss'),
            situationId: entity.situationId
        };
    };

    Signal.prototype.toObject = function () {
        return Signal.toObject(this);
    };
    Signal.TABLE_NAME = 'signal';
    Signal.COLUMN_SIGNAL_ID = 'signalid';
    Signal.COLUMN_MATRIX_ID = 'matrixid';
    Signal.COLUMN_DATE_CREATED = 'datecreated';
    Signal.COLUMN_SITUATION_ID = 'situationid';
    return Signal;
})();
module.exports = Signal;
