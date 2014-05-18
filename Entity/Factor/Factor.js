var FactorTypeEnum = require('./FactorTypeEnum');
var SectionEnum = require('../Section/SectionEnum');

var Factor = (function () {
    function Factor(id, name, description, section, weight, factorType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.factorType = factorType;
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
        return new Factor(o.id, o.name, o.description, Factor.createSectionEnum(o.section), o.weight, Factor.createTypeEnum(o.factorType));
    };

    Factor.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            section: SectionEnum[entity.section],
            weight: entity.weight,
            factorType: FactorTypeEnum[entity.factorType]
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
            case SectionEnum[2 /* CUSTOMER */]:
                return 2 /* CUSTOMER */;
            case SectionEnum[1 /* PRODUCT */]:
                return 1 /* PRODUCT */;
            case SectionEnum[3 /* CHANNEL */]:
                return 3 /* CHANNEL */;
        }
        return 0 /* UNKNOWN */;
    };
    return Factor;
})();
module.exports = Factor;
