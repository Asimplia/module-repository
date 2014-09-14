var FactorTypeEnum = require('./FactorTypeEnum');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var ColumnEnum = require('../Matrix/ColumnEnum');
var ShiftValueEnum = require('../Factor/ShiftValueEnum');
var LocalizedString = require('../Locale/LocalizedString');

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

    Factor.fromObject = function (o) {
        return new Factor(o.id, o.name, o.description, SectionFactory.createSectionEnum(o.section), o.weight, Factor.createTypeEnum(o.factorType), Factor.createColumnEnum(o.column), new LocalizedString(o.label));
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

    Factor.createColumnEnum = function (column) {
        switch (column) {
            case ColumnEnum[1 /* SCORE_ABSOLUTE */]:
                return 1 /* SCORE_ABSOLUTE */;
            case ColumnEnum[2 /* SCORE_RELATIVE */]:
                return 2 /* SCORE_RELATIVE */;
            case ColumnEnum[3 /* SCORE_WEIGHT */]:
                return 3 /* SCORE_WEIGHT */;
            case ColumnEnum[4 /* CHANGE_ABSOLUTE */]:
                return 4 /* CHANGE_ABSOLUTE */;
            case ColumnEnum[5 /* CHANGE_RELATIVE */]:
                return 5 /* CHANGE_RELATIVE */;
            case ColumnEnum[6 /* CHANGE_WEIGHT */]:
                return 6 /* CHANGE_WEIGHT */;
            case ColumnEnum[7 /* PREDICTION */]:
                return 7 /* PREDICTION */;
            case ColumnEnum[8 /* INPUT_VALUE_X */]:
                return 8 /* INPUT_VALUE_X */;
            case ColumnEnum[9 /* INPUT_VALUE_Y */]:
                return 9 /* INPUT_VALUE_Y */;
            case ColumnEnum[10 /* CHANGE_VALUE_X */]:
                return 10 /* CHANGE_VALUE_X */;
            case ColumnEnum[11 /* CHANGE_VALUE_Y */]:
                return 11 /* CHANGE_VALUE_Y */;
            case ColumnEnum[12 /* TANGENS */]:
                return 12 /* TANGENS */;
            case ColumnEnum[13 /* CHANGE_TANGENS */]:
                return 13 /* CHANGE_TANGENS */;
        }
        return 0 /* UNKNOWN */;
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
