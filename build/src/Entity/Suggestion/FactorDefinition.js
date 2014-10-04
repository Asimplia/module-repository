var Factor = require('../Factor/Factor');
var FactorValue = require('./FactorValue');
var EntityPreparer = require('../EntityPreparer');

var FactorDefinition = (function () {
    function FactorDefinition(value, weight, factor, reverse) {
        this.value = value;
        this.weight = weight;
        this.factor = factor;
        this.reverse = reverse;
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
    Object.defineProperty(FactorDefinition.prototype, "Reverse", {
        get: function () {
            return this.reverse;
        },
        set: function (value) {
            this.reverse = value;
        },
        enumerable: true,
        configurable: true
    });

    FactorDefinition.fromObject = function (o) {
        return new FactorDefinition(new FactorValue(EntityPreparer.stringOrNull(o.value)), EntityPreparer.float(o.weight), Factor.fromObject(o.factor), EntityPreparer.boolean(o.reverse));
    };

    FactorDefinition.toObject = function (entity) {
        return {
            value: entity.value ? entity.value.toString() : null,
            weight: entity.weight,
            factor: entity.factor ? entity.factor.toObject() : null,
            reverse: entity.reverse
        };
    };

    FactorDefinition.prototype.toObject = function () {
        return FactorDefinition.toObject(this);
    };
    return FactorDefinition;
})();
module.exports = FactorDefinition;
