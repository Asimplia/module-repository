var QuadrantValueEnum = require('./QuadrantValueEnum');
var QuadrantValueFactory = require('./QuadrantValueFactory');

var QuadrantDescription = (function () {
    function QuadrantDescription(quadrant, description) {
        this.quadrant = quadrant;
        this.description = description;
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

    QuadrantDescription.prototype.toObject = function () {
        return QuadrantDescription.toObject(this);
    };

    QuadrantDescription.toObject = function (entity) {
        return {
            quadrant: QuadrantValueEnum[entity.quadrant],
            description: entity.description
        };
    };

    QuadrantDescription.fromObject = function (object) {
        return new QuadrantDescription(QuadrantValueFactory.createQuadrantValueEnum(object.quadrant), object.description);
    };
    return QuadrantDescription;
})();
module.exports = QuadrantDescription;
