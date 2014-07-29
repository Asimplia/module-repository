var SignalThreshold = require('../Entity/Matrix/SignalThreshold');

var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.SignalThresholdModel = require('./SignalThresholdModel');
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
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
