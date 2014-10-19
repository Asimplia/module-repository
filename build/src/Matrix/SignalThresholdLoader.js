var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var List = require('../Entity/List');
var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdModel = require('../Definition/Matrix/SignalThresholdModel');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.model = SignalThresholdModel;
    }
    SignalThresholdLoader.prototype.getByMatrixType = function (section, callback) {
        this.model.findOne({ section: SectionEnum[section] }, function (e, signalThresholdObject) {
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
        this.model.find({}, null, { sort: 'section' }, function (e, thresholds) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(thresholds, SignalThreshold.fromObject);
            callback(null, list);
        });
    };

    SignalThresholdLoader.prototype.getMaxDateValid = function (callback) {
        this.model.findOne({}).sort({ 'dateValid': -1 }).exec(function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, object.dateValid);
        });
    };
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
