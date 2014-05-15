﻿/// <reference path="../../../typings/underscore/underscore.d.ts" />
var LocalizedString = require('../Locale/LocalizedString');
var SectionEnum = require('../Section/SectionEnum');
var List = require('../List');
var FactorDefinition = require('./FactorDefinition');

var ActionPlaceholderEnum = require('./ActionPlaceholderEnum');

var ArrayHelper = require('../../../Util/ArrayHelper');

var Action = (function () {
    function Action(id, name, text, section, factorDefinitionList, placeholders) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.section = section;
        this.factorDefinitionList = factorDefinitionList;
        this.placeholders = placeholders;
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

    Action.fromObject = function (o /*ISuggestionActionObject*/ ) {
        return new Action(o.id, new LocalizedString(o.name), new LocalizedString(o.text), Action.createSectionEnum(o.section), new List().pushArray(o.factorDefinitions, FactorDefinition.fromObject), ArrayHelper.mapFilterNulls(o.placeholders, function (placeholder) {
            return Action.createPlaceholderEnum(placeholder);
        }));
    };

    Action.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            text: entity.text,
            section: SectionEnum[entity.section],
            factorDefinitions: entity.factorDefinitionList.toArray(FactorDefinition.toObject),
            placeholders: ArrayHelper.mapFilterNulls(entity.placeholders, function (placeholder) {
                return ActionPlaceholderEnum[placeholder];
            })
        };
    };

    Action.prototype.toObject = function () {
        return Action.toObject(this);
    };

    Action.createSectionEnum = function (section) {
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
        }
        return null;
    };
    return Action;
})();
module.exports = Action;
