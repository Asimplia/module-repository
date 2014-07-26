var Signal = require('./Signal');

var Situation = (function () {
    function Situation(id, signalList, dateCreated) {
        this.id = id;
        this.signalList = signalList;
        this.dateCreated = dateCreated;
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
    Object.defineProperty(Situation.prototype, "EShopId", {
        get: function () {
            return this.signalList.first().Matrix.EShopId;
        },
        enumerable: true,
        configurable: true
    });

    Situation.toObject = function (entity) {
        return {
            id: entity.id,
            dateCreated: entity.dateCreated,
            signals: entity.signalList.toArray(Signal.toObject)
        };
    };

    Situation.prototype.toObject = function () {
        return Situation.toObject(this);
    };
    Situation.TABLE_NAME = 'situation';
    Situation.COLUMN_SITUATION_ID = 'situationid';
    Situation.COLUMN_DATE_CREATED = 'datecreated';
    return Situation;
})();
module.exports = Situation;
