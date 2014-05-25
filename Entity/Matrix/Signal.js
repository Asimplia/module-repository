var MatrixProduct = require('./MatrixProduct');

var Signal = (function () {
    function Signal(id, record, dateCreated) {
        this.id = id;
        this.record = record;
        this.dateCreated = dateCreated;
    }
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
            case 'PRO':
                return MatrixProduct.fromRow(o);
            default:
                throw new Error('Not implemented');
        }
    };
    return Signal;
})();
module.exports = Signal;
