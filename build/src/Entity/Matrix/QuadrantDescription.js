var QuadrantValueEnum = require('./QuadrantValueEnum');
var QuadrantValueFactory = require('./QuadrantValueFactory');
var LocalizedString = require('../Locale/LocalizedString');

var QuadrantDescription = (function () {
    function QuadrantDescription(quadrant, description, icon) {
        this.quadrant = quadrant;
        this.description = description;
        this.icon = icon;
    }
    Object.defineProperty(QuadrantDescription.prototype, "Quadrant", {
        get: function () {
            return this.quadrant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadrantDescription.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadrantDescription.prototype, "Icon", {
        get: function () {
            return this.icon;
        },
        enumerable: true,
        configurable: true
    });

    QuadrantDescription.prototype.toObject = function () {
        return QuadrantDescription.toObject(this);
    };

    QuadrantDescription.toObject = function (entity) {
        return {
            quadrant: QuadrantValueEnum[entity.quadrant],
            description: entity.description.toObject(),
            icon: entity.icon
        };
    };

    QuadrantDescription.fromObject = function (object) {
        return new QuadrantDescription(QuadrantValueFactory.createQuadrantValueEnum(object.quadrant), new LocalizedString(object.description), object.icon);
    };
    return QuadrantDescription;
})();
module.exports = QuadrantDescription;
