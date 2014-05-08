var LocalizedString = require('../Locale/LocalizedString');
var List = require('../List');
var Status = require('./Status');
var Graph = require('./Graph');

var Result = (function () {
    function Result(id, title, shortTitle, label, text, statusList, graphList) {
        this.id = id;
        this.title = title;
        this.shortTitle = shortTitle;
        this.label = label;
        this.text = text;
        this.statusList = statusList;
        this.graphList = graphList;
    }
    Result.fromObject = function (o) {
        return new Result(o.id, new LocalizedString(o.title), new LocalizedString(o.shortTitle), new LocalizedString(o.label), new LocalizedString(o.text), new List().pushArray(o.statuses, Status.fromObject), new List().pushArray(o.graphs, Graph.fromObject));
    };
    return Result;
})();
module.exports = Result;
//# sourceMappingURL=Result.js.map
