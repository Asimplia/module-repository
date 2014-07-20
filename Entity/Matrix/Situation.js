var Signal = require('./Signal');

var Situation = (function () {
    function Situation(id, signalList) {
        this.id = id;
        this.signalList = signalList;
    }
    Object.defineProperty(Situation.prototype, "Id", {
        get: function () {
            return this.id;
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

    Situation.prototype.toObject = function () {
        return {
            id: this.id,
            signals: this.signalList.toArray(Signal.toObject)
        };
    };
    return Situation;
})();
module.exports = Situation;
