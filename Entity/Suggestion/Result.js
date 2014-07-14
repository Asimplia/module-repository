var LocalizedString = require('../Locale/LocalizedString');
var List = require('../List');
var Status = require('./Status');
var Graph = require('./Graph');

var Result = (function () {
    function Result(id, title, shortTitle, label, text, activeStatus, statusList, graphList, clientId) {
        this.id = id;
        this.title = title;
        this.shortTitle = shortTitle;
        this.label = label;
        this.text = text;
        this.activeStatus = activeStatus;
        this.statusList = statusList;
        this.graphList = graphList;
        this.clientId = clientId;
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
    Object.defineProperty(Result.prototype, "ClientId", {
        get: function () {
            return this.clientId;
        },
        set: function (value) {
            this.clientId = value;
        },
        enumerable: true,
        configurable: true
    });

    Result.fromObject = function (o) {
        return new Result(o.id, new LocalizedString(o.title), new LocalizedString(o.shortTitle), new LocalizedString(o.label), new LocalizedString(o.text), Status.fromObject(o.activeStatus), new List().pushArray(o.statuses, Status.fromObject), new List().pushArray(o.graphs, Graph.fromObject), o.clientId);
    };

    Result.toObject = function (entity) {
        return {
            id: entity.id,
            title: entity.title,
            shortTitle: entity.shortTitle,
            label: entity.label,
            text: entity.text,
            activeStatus: entity.activeStatus ? entity.activeStatus.toObject() : null,
            statuses: entity.statusList.toArray(Status.toObject),
            graphs: entity.graphList.toArray(Graph.toObject),
            clientId: entity.clientId
        };
    };

    Result.prototype.toObject = function () {
        return Result.toObject(this);
    };
    return Result;
})();
module.exports = Result;
