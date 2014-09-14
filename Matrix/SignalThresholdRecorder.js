var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdModel = require('./SignalThresholdModel');

var SignalThresholdRecorder = (function (_super) {
    __extends(SignalThresholdRecorder, _super);
    function SignalThresholdRecorder() {
        _super.call(this);
        this.SignalThresholdModel = SignalThresholdModel;
    }
    SignalThresholdRecorder.prototype.insertOrUpdate = function (threshold, callback) {
        var _this = this;
        this.SignalThresholdModel.findOne({ section: SectionEnum[threshold.Section] }, function (e, thresholdDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!thresholdDocument) {
                thresholdDocument = new _this.SignalThresholdModel({});
            }
            _this.update(thresholdDocument, SignalThreshold.fromObject, threshold, callback);
        });
    };
    return SignalThresholdRecorder;
})(AbstractRecorder);
module.exports = SignalThresholdRecorder;
