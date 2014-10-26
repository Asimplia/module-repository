var LocalizedString = require('../Locale/LocalizedString');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var List = require('../List');
var FactorDefinition = require('./FactorDefinition');

var ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
var ActionPlaceholderFactory = require('./ActionPlaceholderFactory');
var ArrayHelper = require('../Util/ArrayHelper');
var PriorityTypeEnum = require('./PriorityTypeEnum');
var PriorityTypeFactory = require('./PriorityTypeFactory');
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
        return new Action(EntityPreparer.intOrNull(o.id), new LocalizedString(o.name), new LocalizedString(o.shortName), new LocalizedString(o.text), SectionFactory.getGroupSection(SectionFactory.createSectionEnum(o.section)), new List().pushArray(o.factorDefinitions, FactorDefinition.fromObject), ArrayHelper.mapFilterNulls(o.placeholders, function (placeholder) {
            return ActionPlaceholderFactory.createActionPlaceholderEnum(placeholder);
        }), PriorityTypeFactory.createPriorityTypeEnum(o.priorityType), EntityPreparer.boolean(o.main));
    };

    Action.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name.toObject(),
            shortName: entity.shortName.toObject(),
            text: entity.text.toObject(),
            section: SectionEnum[entity.section],
            factorDefinitions: entity.factorDefinitionList.toArray(FactorDefinition.toObject),
            placeholders: ArrayHelper.mapFilterNulls(entity.placeholders, function (placeholder) {
                return ActionPlaceholderEnum[placeholder];
            }),
            priorityType: PriorityTypeEnum[entity.priorityType],
            main: entity.main
        };
    };

    Action.prototype.toObject = function () {
        return Action.toObject(this);
    };
    return Action;
})();
module.exports = Action;
