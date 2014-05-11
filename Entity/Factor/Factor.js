var ArrayHelper = require('../../../Util/ArrayHelper');

var Factor = (function () {
    function Factor(id, name, description, section, weight, values) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.values = values;
    }
    Object.defineProperty(Factor.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });

    Factor.fromObject = function (o /*FactorObject*/ ) {
        return new Factor(o.id, o.name, o.description, o.section, o.weight, o.values);
    };

    Factor.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            section: entity.section,
            weight: entity.weight,
            values: ArrayHelper.mapFilterEmptys(entity.values, function (value) {
                return value;
            })
        };
    };

    Factor.prototype.toObject = function () {
        return Factor.toObject(this);
    };
    return Factor;
})();
module.exports = Factor;
//# sourceMappingURL=Factor.js.map
