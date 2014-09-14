var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var SuggestionAction = require('../Entity/Suggestion/Action');

var ActionModel = require('./ActionModel');

var ActionRecorder = (function (_super) {
    __extends(ActionRecorder, _super);
    function ActionRecorder() {
        _super.call(this);
        this.model = ActionModel;
    }
    ActionRecorder.prototype.insertOrUpdate = function (suggestionAction, callback) {
        var _this = this;
        this.model.findOne({ id: suggestionAction.Id }, function (e, actionDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!actionDocument) {
                actionDocument = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    suggestionAction.Id = id;
                    _this.update(actionDocument, SuggestionAction.fromObject, suggestionAction, callback);
                });
                return;
            }
            _this.update(actionDocument, SuggestionAction.fromObject, suggestionAction, callback);
        });
    };

    ActionRecorder.prototype.remove = function (id, callback) {
        this.model.findOneAndRemove({ id: id }, function (e) {
            callback(e);
        });
    };
    return ActionRecorder;
})(AbstractRecorder);
module.exports = ActionRecorder;
