var Signal = require('./Signal');
var MatrixProduct = require('./MatrixProduct');

var Situation = (function () {
    function Situation(id, signalList, dateCreated, dateSuggestionResultCreated) {
        this.id = id;
        this.signalList = signalList;
        this.dateCreated = dateCreated;
        this.dateSuggestionResultCreated = dateSuggestionResultCreated;
    }
    Object.defineProperty(Situation.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "SignalList", {
        get: function () {
            return this.signalList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "DateSuggestionResultCreated", {
        get: function () {
            return this.dateSuggestionResultCreated;
        },
        set: function (value) {
            this.dateSuggestionResultCreated = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "EShopId", {
        get: function () {
            return this.signalList.first().Matrix.EShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "ProductId", {
        get: function () {
            if (!(this.signalList.first().Matrix instanceof MatrixProduct)) {
                return null;
            }
            var productMatrix = this.signalList.first().Matrix;
            return productMatrix.Product.Id;
        },
        enumerable: true,
        configurable: true
    });

    Situation.toObject = function (entity) {
        return {
            id: entity.id,
            dateCreated: entity.dateCreated,
            dateSuggestionResultCreated: entity.dateSuggestionResultCreated,
            signals: entity.signalList.toArray(Signal.toObject)
        };
    };

    Situation.prototype.toObject = function () {
        return Situation.toObject(this);
    };
    Situation.TABLE_NAME = 'situation';
    Situation.COLUMN_SITUATION_ID = 'situationid';
    Situation.COLUMN_DATE_CREATED = 'datecreated';
    Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED = 'datesuggestionresultcreated';
    return Situation;
})();
module.exports = Situation;