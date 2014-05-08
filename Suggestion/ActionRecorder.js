/// <refernce path="../../typings/mongoose/mongoose.d.ts" />
var SuggestionAction = require('../Entity/Suggestion/Action');

var ActionRecorder = (function () {
    function ActionRecorder() {
        this.ActionModel = require('./ActionModel');
    }
    ActionRecorder.prototype.insertOrUpdate = function (suggestionAction, callback) {
        var _this = this;
        this.ActionModel.findOne({ id: suggestionAction.Id }, function (e, actionObject) {
            if (e) {
                callback(e);
                return;
            }
            if (!actionObject) {
                actionObject = new _this.ActionModel({});
                _this.getNextId(function (id) {
                    actionObject.set('id', id);
                    _this.update(actionObject, suggestionAction, callback);
                });
                return;
            }
            _this.update(actionObject, suggestionAction, callback);
        });
    };

    ActionRecorder.prototype.update = function (actionObject, suggestionAction, callback) {
        var action = suggestionAction.toObject();
        actionObject.set('name', action.name);
        actionObject.set('text', action.text);
        actionObject.set('section', action.section);
        actionObject.set('factorDefinitions', action.factorDefinitions);
        actionObject.set('placeholders', action.placeholders);

        actionObject.save(function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, SuggestionAction.fromObject(actionObject));
        });
    };

    ActionRecorder.prototype.getNextId = function (callback) {
        this.ActionModel.findOne({}, { 'id': true }, { sort: '-id' }, function (e, action) {
            if (!action) {
                callback(1);
                return;
            }
            callback(1 + parseInt(action.id));
        });
    };
    return ActionRecorder;
})();
module.exports = ActionRecorder;
//# sourceMappingURL=ActionRecorder.js.map
