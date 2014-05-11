var LocalizedString = require('../Locale/LocalizedString');
var List = require('../List');
var Status = require('./Status');
var Graph = require('./Graph');

var Result = (function () {
    function Result(id, title, shortTitle, label, text, activeStatus, statusList, graphList) {
        this.id = id;
        this.title = title;
        this.shortTitle = shortTitle;
        this.label = label;
        this.text = text;
        this.activeStatus = activeStatus;
        this.statusList = statusList;
        this.graphList = graphList;
    }
    Result.fromObject = function (o /*ISuggestionResultObject*/ ) {
        return new Result(o.id, new LocalizedString(o.title), new LocalizedString(o.shortTitle), new LocalizedString(o.label), new LocalizedString(o.text), Status.fromObject(o.activeStatus), new List().pushArray(o.statuses, Status.fromObject), new List().pushArray(o.graphs, Graph.fromObject));
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
            graphs: entity.graphList.toArray(Graph.toObject)
        };
    };

    Result.prototype.toObject = function () {
        return Result.toObject(this);
    };
    return Result;
})();
module.exports = Result;
