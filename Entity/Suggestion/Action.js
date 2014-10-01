var LocalizedString = require('../Locale/LocalizedString');
var SectionEnum = require('../Section/SectionEnum');
var List = require('../List');
var FactorDefinition = require('./FactorDefinition');

var ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
var AsimpliaUtil = require('asimplia-util');
var PriorityTypeEnum = require('./PriorityTypeEnum');
var EntityPreparer = require('../EntityPreparer');

var Action = (function () {
    function Action(id, name, shortName, text, section, factorDefinitionList, placeholders, priorityType, main) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.text = text;
        this.section = section;
        this.factorDefinitionList = factorDefinitionList;
        this.placeholders = placeholders;
        this.priorityType = priorityType;
        this.main = main;
    }
    Object.defineProperty(Action.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "ShortName", {
        get: function () {
            return this.shortName;
        },
        set: function (value) {
            this.shortName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "Section", {
        get: function () {
            return this.section;
        },
        set: function (value) {
            this.section = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "FactorDefinitionList", {
        get: function () {
            return this.factorDefinitionList;
        },
        set: function (value) {
            this.factorDefinitionList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "Placeholders", {
        get: function () {
            return this.placeholders;
        },
        set: function (value) {
            this.placeholders = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "PriorityType", {
        get: function () {
            return this.priorityType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "Main", {
        get: function () {
            return this.main;
        },
        enumerable: true,
        configurable: true
    });

    Action.fromObject = function (o) {
        return new Action(EntityPreparer.intOrNull(o.id), new LocalizedString(o.name), new LocalizedString(o.shortName), new LocalizedString(o.text), Action.createSectionEnum(o.section), new List().pushArray(o.factorDefinitions, FactorDefinition.fromObject), AsimpliaUtil.ArrayHelper.mapFilterNulls(o.placeholders, function (placeholder) {
            return Action.createPlaceholderEnum(placeholder);
        }), Action.createPriorityTypeEnum(o.priorityType), EntityPreparer.boolean(o.main));
    };

    Action.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name.toObject(),
            shortName: entity.shortName.toObject(),
            text: entity.text.toObject(),
            section: SectionEnum[entity.section],
            factorDefinitions: entity.factorDefinitionList.toArray(FactorDefinition.toObject),
            placeholders: AsimpliaUtil.ArrayHelper.mapFilterNulls(entity.placeholders, function (placeholder) {
                return ActionPlaceholderEnum[placeholder];
            }),
            priorityType: PriorityTypeEnum[entity.priorityType],
            main: entity.main
        };
    };

    Action.prototype.toObject = function () {
        return Action.toObject(this);
    };

    Action.createSectionEnum = function (section) {
        switch (section) {
            case SectionEnum[33 /* CUSTOMER */]:
                return 33 /* CUSTOMER */;
            case SectionEnum[1 /* PRODUCT */]:
                return 1 /* PRODUCT */;
            case SectionEnum[54 /* CHANNEL */]:
                return 54 /* CHANNEL */;
        }
        return 0 /* UNKNOWN */;
    };

    Action.createPriorityTypeEnum = function (priorityType) {
        switch (priorityType) {
            case PriorityTypeEnum[1 /* RED */]:
                return 1 /* RED */;
            case PriorityTypeEnum[2 /* GREEN */]:
                return 2 /* GREEN */;
        }
        return 0 /* UNKNOWN */;
    };

    Action.createPlaceholderEnum = function (placeholder) {
        switch (placeholder) {
            case ActionPlaceholderEnum[0 /* PRODUCT_NAME */]:
                return 0 /* PRODUCT_NAME */;
            case ActionPlaceholderEnum[1 /* DISCOUNT_VALUE */]:
                return 1 /* DISCOUNT_VALUE */;
            case ActionPlaceholderEnum[2 /* COMMERCIAL_CHANELS */]:
                return 2 /* COMMERCIAL_CHANELS */;
            case ActionPlaceholderEnum[3 /* PRODUCT_PRICE */]:
                return 3 /* PRODUCT_PRICE */;
            case ActionPlaceholderEnum[4 /* PRICE_CHANGE */]:
                return 4 /* PRICE_CHANGE */;
            case ActionPlaceholderEnum[5 /* PRODUCT_PACKAGE_OPTION */]:
                return 5 /* PRODUCT_PACKAGE_OPTION */;
            case ActionPlaceholderEnum[6 /* PRODUCT_SKU */]:
                return 6 /* PRODUCT_SKU */;
            case ActionPlaceholderEnum[7 /* PRODUCT_STOCKING_TIME */]:
                return 7 /* PRODUCT_STOCKING_TIME */;
            case ActionPlaceholderEnum[8 /* CUSTOMERS_FOR_PRODUCT */]:
                return 8 /* CUSTOMERS_FOR_PRODUCT */;
            case ActionPlaceholderEnum[9 /* PRODUCT_MARGIN_RATE */]:
                return 9 /* PRODUCT_MARGIN_RATE */;
            case ActionPlaceholderEnum[10 /* PRODUCT_CONVERSION_RATE */]:
                return 10 /* PRODUCT_CONVERSION_RATE */;
            case ActionPlaceholderEnum[11 /* CATEGORY_NAME */]:
                return 11 /* CATEGORY_NAME */;
            case ActionPlaceholderEnum[12 /* CATEGORY_CHANGE_IN_SALE */]:
                return 12 /* CATEGORY_CHANGE_IN_SALE */;
            case ActionPlaceholderEnum[13 /* BENEFITS */]:
                return 13 /* BENEFITS */;
        }
        return null;
    };
    return Action;
})();
module.exports = Action;
