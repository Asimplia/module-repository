var LocalizedString = require('../Locale/LocalizedString');
var List = require('../List');
var Status = require('./Status');
var Graph = require('./Graph');

var Reason = require('./Reason');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var moment = require('moment');

var Result = (function () {
    function Result(id, title, shortTitle, label, text, activeStatus, statusList, graphList, eShopId, reasonList, section, main, situationId) {
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
        set: function (value) {
            this.title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "ShortTitle", {
        get: function () {
            return this.shortTitle;
        },
        set: function (value) {
            this.shortTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Label", {
        get: function () {
            return this.label;
        },
        set: function (value) {
            this.label = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
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
        set: function (value) {
            this.statusList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "GraphList", {
        get: function () {
            return this.graphList;
        },
        set: function (value) {
            this.graphList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        set: function (value) {
            this.eShopId = value;
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

    Result.fromObject = function (o) {
        return new Result(parseInt(o.id), new LocalizedString(o.title), new LocalizedString(o.shortTitle), new LocalizedString(o.label), new LocalizedString(o.text), Status.fromObject(o.activeStatus), new List().pushArray(o.statuses, Status.fromObject), new List().pushArray(o.graphs, Graph.fromObject), parseInt(o.eShopId), new List().pushArray(o.reasons, Reason.fromObject), SectionFactory.createSectionEnum(o.section), !!o.main, parseInt(o.situationId));
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
            situationId: entity.situationId
        };
    };

    Result.prototype.toObject = function () {
        return Result.toObject(this);
    };

    Result.prototype.getMainReason = function () {
        return this.reasonList.first();
    };

    Result.prototype.isExpired = function () {
        return moment() > moment(this.activeStatus.DateValidTo);
    };

    Result.prototype.isSectionProduct = function () {
        return this.section == 1 /* PRODUCT */;
    };

    Result.prototype.isSectionCustomer = function () {
        return this.section == 32 /* CUSTOMER */;
    };

    Result.prototype.isSectionChannel = function () {
        return this.section == 53 /* CHANNEL */;
    };
    return Result;
})();
module.exports = Result;
