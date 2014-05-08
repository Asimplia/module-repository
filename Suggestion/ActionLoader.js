/// <refernce path="../../typings/mongoose/mongoose.d.ts" />
var SuggestionAction = require('../Entity/Suggestion/Action');
var List = require('../Entity/List');

var ActionLoader = (function () {
    function ActionLoader() {
        this.ActionModel = require('./ActionModel');
    }
    ActionLoader.prototype.getList = function (callback) {
        this.ActionModel.find({}, null, { sort: 'id' }, function (e, actions) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(actions, SuggestionAction.fromObject);
            callback(e, list);
        });
    };
    return ActionLoader;
})();
module.exports = ActionLoader;
//# sourceMappingURL=ActionLoader.js.map
