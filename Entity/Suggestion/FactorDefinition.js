var Factor = require('../Factor/Factor');
var FactorValue = require('./FactorValue');

var FactorDefinition = (function () {
    function FactorDefinition(value, weight, factor) {
        this.value = value;
        this.weight = weight;
        this.factor = factor;
    }
    Object.defineProperty(FactorDefinition.prototype, "Value", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactorDefinition.prototype, "Weight", {
        get: function () {
            return this.weight;
        },
        set: function (value) {
            this.weight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactorDefinition.prototype, "Factor", {
        get: function () {
            return this.factor;
        },
        set: function (value) {
            this.factor = value;
        },
        enumerable: true,
        configurable: true
    });

    FactorDefinition.fromObject = function (o /*FactorDefinitionObject*/ ) {
        return new FactorDefinition(new FactorValue(o.value), o.weight, Factor.fromObject(o.factor));
    };

    FactorDefinition.toObject = function (entity) {
        return {
            value: entity.value ? entity.value.toString() : null,
            weight: entity.weight,
            factor: entity.factor ? entity.factor.toObject() : null
        };
    };
    return FactorDefinition;
})();
module.exports = FactorDefinition;
//# sourceMappingURL=FactorDefinition.js.map
