/// <reference path="../typings/mongoose/mongoose.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Result = require('../Entity/Suggestion/Result');

var ActionRecorder = (function (_super) {
    __extends(ActionRecorder, _super);
    function ActionRecorder() {
        _super.call(this);
        this.ResultModel = require('./ResultModel');
    }
    ActionRecorder.prototype.insertOrUpdate = function (result, callback) {
        var _this = this;
        this.ResultModel.findOne({ id: result.Id }, function (e, resultDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!resultDocument) {
                resultDocument = new _this.ResultModel({});
                _this.getNextId(_this.ResultModel, function (id) {
                    result.Id = id;
                    _this.update(resultDocument, Result.fromObject, result, callback);
                });
                return;
            }
            _this.update(resultDocument, Result.fromObject, result, callback);
        });
    };
    return ActionRecorder;
})(AbstractRecorder);
module.exports = ActionRecorder;
