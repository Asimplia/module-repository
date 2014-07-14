var FactorTypeEnum = require('./FactorTypeEnum');
var SectionEnum = require('../Section/SectionEnum');
var ColumnEnum = require('../Matrix/ColumnEnum');
var ShiftValueEnum = require('../Factor/ShiftValueEnum');

var Factor = (function () {
    function Factor(id, name, description, section, weight, factorType, column) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.factorType = factorType;
        this.column = column;
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

    Factor.fromObject = function (o) {
        return new Factor(o.id, o.name, o.description, Factor.createSectionEnum(o.section), o.weight, Factor.createTypeEnum(o.factorType), Factor.createColumnEnum(o.column));
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
            case SectionEnum[12 /* CUSTOMER */]:
                return 12 /* CUSTOMER */;
            case SectionEnum[13 /* MC1 */]:
                return 13 /* MC1 */;
            case SectionEnum[14 /* MC2 */]:
                return 14 /* MC2 */;
            case SectionEnum[15 /* MC3 */]:
                return 15 /* MC3 */;
            case SectionEnum[1 /* PRODUCT */]:
                return 1 /* PRODUCT */;
            case SectionEnum[2 /* MP1 */]:
                return 2 /* MP1 */;
            case SectionEnum[3 /* MP2 */]:
                return 3 /* MP2 */;
            case SectionEnum[4 /* MP3 */]:
                return 4 /* MP3 */;
            case SectionEnum[5 /* MP4 */]:
                return 5 /* MP4 */;
            case SectionEnum[6 /* MP5 */]:
                return 6 /* MP5 */;
            case SectionEnum[7 /* MP6 */]:
                return 7 /* MP6 */;
            case SectionEnum[8 /* MP7 */]:
                return 8 /* MP7 */;
            case SectionEnum[9 /* MP8 */]:
                return 9 /* MP8 */;
            case SectionEnum[10 /* MP9 */]:
                return 10 /* MP9 */;
            case SectionEnum[11 /* MP10 */]:
                return 11 /* MP10 */;
            case SectionEnum[16 /* CHANNEL */]:
                return 16 /* CHANNEL */;
            case SectionEnum[17 /* MM1 */]:
                return 17 /* MM1 */;
            case SectionEnum[18 /* MM2 */]:
                return 18 /* MM2 */;
        }
        return 0 /* UNKNOWN */;
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
