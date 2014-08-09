var ReasonTypeEnum = require('./ReasonTypeEnum');
var LocalizedString = require('../Locale/LocalizedString');

var Reason = (function () {
    function Reason(label, reasonType) {
        this.label = label;
        this.reasonType = reasonType;
    }
    Object.defineProperty(Reason.prototype, "Label", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reason.prototype, "ReasonType", {
        get: function () {
            return this.reasonType;
        },
        enumerable: true,
        configurable: true
    });

    Reason.fromObject = function (o) {
        return new Reason(new LocalizedString(o.label), Reason.createReasonTypeEnum(o.reasonType));
    };

    Reason.toObject = function (e) {
        return {
            label: e.label.toObject(),
            reasonType: ReasonTypeEnum[e.reasonType]
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

    Reason.prototype.isTypeFall = function () {
        return this.reasonType == 1 /* FALL */;
    };

    Reason.prototype.isTypeRise = function () {
        return this.reasonType == 0 /* RISE */;
    };

    Reason.prototype.isTypeStay = function () {
        return this.reasonType == 2 /* STAY */;
    };
    return Reason;
})();
module.exports = Reason;
