var LocalizedString = require('../Locale/LocalizedString');
var List = require('../List');
var Status = require('./Status');
var Graph = require('./Graph');

var Reason = require('./Reason');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');

var EntityPreparer = require('../EntityPreparer');
var PlaceholderValue = require('./PlaceholderValue');
var PriorityTypeEnum = require('./PriorityTypeEnum');
var PriorityTypeFactory = require('./PriorityTypeFactory');

var Result = (function () {
    function Result(id, title, shortTitle, label, text, activeStatus, statusList, graphList, eShopId, reasonList, section, main, situationId, actionId, dateCreated, priorityValue, priorityType, productIds, customerIds, categoryIds, channelIds, placeholderValueList) {
        this.id = id;
        this.title = title;
        this.shortTitle = shortTitle;
        this.label = label;
        this.text = text;
        this.activeStatus = activeStatus;
        this.statusList = statusList;
        this.graphList = graphList;
        this.eShopId = eShopId;
        this.reasonList = reasonList;
        this.section = section;
        this.main = main;
        this.situationId = situationId;
        this.actionId = actionId;
        this.dateCreated = dateCreated;
        this.priorityValue = priorityValue;
        this.priorityType = priorityType;
        this.productIds = productIds;
        this.customerIds = customerIds;
        this.categoryIds = categoryIds;
        this.channelIds = channelIds;
        this.placeholderValueList = placeholderValueList;
    }
    Object.defineProperty(Result.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Title", {
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "ShortTitle", {
        get: function () {
            return this.shortTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Label", {
        get: function () {
            return this.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Text", {
        get: function () {
            return this.text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "ActiveStatus", {
        get: function () {
            return this.activeStatus;
        },
        set: function (value) {
            this.statusList.push(value);
            this.activeStatus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "StatusList", {
        get: function () {
            return this.statusList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "GraphList", {
        get: function () {
            return this.graphList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "ReasonList", {
        get: function () {
            return this.reasonList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Section", {
        get: function () {
            return this.section;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Main", {
        get: function () {
            return this.main;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "SituationId", {
        get: function () {
            return this.situationId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "ActionId", {
        get: function () {
            return this.actionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "PriorityValue", {
        get: function () {
            return this.priorityValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "PriorityType", {
        get: function () {
            return this.priorityType;
        },
        enumerable: true,
        configurable: true
    });


    Result.fromObject = function (o) {
        return new Result(EntityPreparer.intOrNull(o.id), new LocalizedString(o.title), new LocalizedString(o.shortTitle), new LocalizedString(o.label), new LocalizedString(o.text), Status.fromObject(o.activeStatus), new List().pushArray(o.statuses, Status.fromObject), new List().pushArray(o.graphs, Graph.fromObject), EntityPreparer.int(o.eShopId), new List().pushArray(o.reasons, Reason.fromObject), SectionFactory.createSectionEnum(o.section), EntityPreparer.boolean(o.main), EntityPreparer.int(o.situationId), EntityPreparer.int(o.actionId), EntityPreparer.date(o.dateCreated), EntityPreparer.intOrNull(o.priorityValue), PriorityTypeFactory.createPriorityTypeEnum(o.priorityType), o.productIds, o.customerIds, o.categoryIds, o.channelIds, new List(o.placeholderValues, PlaceholderValue.fromObject));
    };

    Result.toObject = function (entity) {
        return {
            id: entity.id,
            title: entity.title ? entity.title.toObject() : null,
            shortTitle: entity.shortTitle ? entity.shortTitle.toObject() : null,
            label: entity.label ? entity.label.toObject() : null,
            text: entity.text ? entity.text.toObject() : null,
            activeStatus: entity.activeStatus ? entity.activeStatus.toObject() : null,
            statuses: entity.statusList.toArray(Status.toObject),
            graphs: entity.graphList.toArray(Graph.toObject),
            eShopId: entity.eShopId,
            reasons: entity.reasonList.toArray(Reason.toObject),
            section: SectionEnum[entity.section],
            main: entity.main,
            situationId: entity.situationId,
            actionId: entity.actionId,
            dateCreated: entity.dateCreated,
            priorityValue: entity.priorityValue,
            priorityType: PriorityTypeEnum[entity.priorityType],
            productIds: entity.productIds,
            customerIds: entity.customerIds,
            categoryIds: entity.categoryIds,
            channelIds: entity.channelIds,
            placeholderValues: entity.placeholderValueList.toArray(PlaceholderValue.toObject)
        };
    };

    Result.prototype.toObject = function () {
        return Result.toObject(this);
    };

    Result.prototype.getMainReason = function () {
        return this.reasonList.first();
    };

    Result.prototype.isExpired = function () {
        return this.activeStatus.isStateExpired();
    };

    Result.prototype.isSectionProduct = function () {
        return this.section == 1 /* PRODUCT */;
    };

    Result.prototype.isSectionCustomer = function () {
        return this.section == 33 /* CUSTOMER */;
    };

    Result.prototype.isSectionChannel = function () {
        return this.section == 54 /* CHANNEL */;
    };
    return Result;
})();
module.exports = Result;
