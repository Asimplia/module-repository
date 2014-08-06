var ReasonTypeEnum = require('./ReasonTypeEnum');
var LocalizedString = require('../Locale/LocalizedString');

var Reason = (function () {
    function Reason(label, type) {
        this.label = label;
        this.type = type;
    }
    Object.defineProperty(Reason.prototype, "Label", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reason.prototype, "Type", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });

    Reason.fromObject = function (o) {
        return new Reason(new LocalizedString(o.label), Reason.createReasonTypeEnum(o.type));
    };

    Reason.toObject = function (e) {
        return {
            label: e.label,
            type: ReasonTypeEnum[e.type]
        };
    };

    Reason.prototype.toObject = function () {
        return Reason.toObject(this);
    };

    Reason.createReasonTypeEnum = function (type) {
        switch (type) {
            case ReasonTypeEnum[1 /* FALL */]:
                return 1 /* FALL */;
            case ReasonTypeEnum[0 /* RISE */]:
                return 0 /* RISE */;
            case ReasonTypeEnum[2 /* STAY */]:
                return 2 /* STAY */;
            default:
                return null;
        }
    };
    return Reason;
})();
module.exports = Reason;
