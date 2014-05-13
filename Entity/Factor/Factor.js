var ArrayHelper = require('../../../Util/ArrayHelper');
var FactorTypeEnum = require('./FactorTypeEnum');
var SectionEnum = require('../Section/SectionEnum');

var Factor = (function () {
    function Factor(id, name, description, section, weight, type, values) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.type = type;
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
        return new Factor(o.id, o.name, o.description, Factor.createSectionEnum(o.section), o.weight, Factor.createTypeEnum(o.type), o.values);
    };

    Factor.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            section: SectionEnum[entity.section],
            weight: entity.weight,
            type: FactorTypeEnum[entity.type],
            values: ArrayHelper.mapFilterEmptys(entity.values, function (value) {
                return value;
            })
        };
    };

    Factor.prototype.toObject = function () {
        return Factor.toObject(this);
    };

    Factor.createTypeEnum = function (type) {
        switch (type) {
            case FactorTypeEnum[0 /* QUADRANT */]:
                return 0 /* QUADRANT */;
            case FactorTypeEnum[1 /* SHIFT */]:
                return 1 /* SHIFT */;
        }
        return null;
    };

    Factor.createSectionEnum = function (section) {
        switch (section) {
            case SectionEnum[1 /* CUSTOMER */]:
                return 1 /* CUSTOMER */;
            case SectionEnum[0 /* PRODUCT */]:
                return 0 /* PRODUCT */;
            case SectionEnum[2 /* CHANNEL */]:
                return 2 /* CHANNEL */;
        }
        return 3 /* UNKNOWN */;
    };
    return Factor;
})();
module.exports = Factor;
//# sourceMappingURL=Factor.js.map
