var SuggestionAction = require('../Entity/Suggestion/Action');
var List = require('../Entity/List');

var ActionModel = require('./ActionModel');

var ActionLoader = (function () {
    function ActionLoader() {
        this.model = ActionModel;
    }
    ActionLoader.prototype.getList = function (callback) {
        this.model.find({}, null, { sort: 'id' }, function (e, actions) {
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
