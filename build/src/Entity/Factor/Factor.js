var FactorTypeEnum = require('./FactorTypeEnum');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var ColumnEnum = require('../Matrix/ColumnEnum');
var ColumnFactory = require('../Matrix/ColumnFactory');
var ShiftValueEnum = require('../Factor/ShiftValueEnum');
var LocalizedString = require('../Locale/LocalizedString');
var EntityPreparer = require('../EntityPreparer');

var Factor = (function () {
    function Factor(id, name, description, section, weight, factorType, column, label) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.factorType = factorType;
        this.column = column;
        this.label = label;
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
    Object.defineProperty(Factor.prototype, "FactorType", {
        get: function () {
            return this.factorType;
        },
        set: function (value) {
            this.factorType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Factor.prototype, "Column", {
        get: function () {
            return this.column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Factor.prototype, "Section", {
        get: function () {
            return this.section;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Factor.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Factor.prototype, "Label", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });

    Factor.fromObject = function (o) {
        return new Factor(EntityPreparer.intOrNull(o.id), EntityPreparer.stringOrNull(o.name), EntityPreparer.stringOrNull(o.description), SectionFactory.createSectionEnum(o.section), EntityPreparer.floatOrNull(o.weight), Factor.createTypeEnum(o.factorType), ColumnFactory.createColumnEnum(o.column), new LocalizedString(o.label));
    };

    Factor.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            section: SectionEnum[entity.section],
            weight: entity.weight,
            factorType: FactorTypeEnum[entity.factorType],
            column: ColumnEnum[entity.column],
            label: entity.label.toObject()
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

    Factor.createShiftValueEnum = function (shiftValue) {
        switch (shiftValue) {
            case ShiftValueEnum[0 /* FALL */]:
                return 0 /* FALL */;
            case ShiftValueEnum[1 /* STAY */]:
                return 1 /* STAY */;
            case ShiftValueEnum[2 /* RISE */]:
                return 2 /* RISE */;
        }
        return null;
    };
    return Factor;
})();
module.exports = Factor;
