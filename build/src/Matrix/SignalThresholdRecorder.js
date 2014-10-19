var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdModel = require('../Definition/Matrix/SignalThresholdModel');

var SignalThresholdRecorder = (function (_super) {
    __extends(SignalThresholdRecorder, _super);
    function SignalThresholdRecorder() {
        _super.call(this);
        this.model = SignalThresholdModel;
    }
    SignalThresholdRecorder.prototype.insertOrUpdateList = function (signalThresholdList, callback) {
        var _this = this;
        signalThresholdList.createEach().on('item', function (signalThreshold, next) {
            _this.insertOrUpdate(signalThreshold, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, signalThresholdList);
        });
    };

    SignalThresholdRecorder.prototype.insertOrUpdate = function (threshold, callback) {
        var _this = this;
        this.model.findOne({ section: SectionEnum[threshold.Section] }, function (e, thresholdDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!thresholdDocument) {
                thresholdDocument = new _this.model({});
            }
            _this.update(thresholdDocument, SignalThreshold.fromObject, threshold, callback);
        });
    };
    return SignalThresholdRecorder;
})(AbstractRecorder);
module.exports = SignalThresholdRecorder;
