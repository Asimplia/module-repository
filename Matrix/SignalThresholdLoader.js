var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var List = require('../Entity/List');
var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdModel = require('./SignalThresholdModel');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.SignalThresholdModel = SignalThresholdModel;
    }
    SignalThresholdLoader.prototype.getByMatrixType = function (section, callback) {
        this.SignalThresholdModel.findOne({ section: SectionEnum[section] }, function (e, signalThresholdObject) {
            if (e) {
                callback(e);
                return;
            }
            if (!signalThresholdObject) {
                callback(null);
                return;
            }
            var signalThreshold = SignalThreshold.fromObject(signalThresholdObject);
            callback(null, signalThreshold);
        });
    };

    SignalThresholdLoader.prototype.getList = function (callback) {
        this.SignalThresholdModel.find({}, null, { sort: 'section' }, function (e, thresholds) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(thresholds, SignalThreshold.fromObject);
            callback(null, list);
        });
    };
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
