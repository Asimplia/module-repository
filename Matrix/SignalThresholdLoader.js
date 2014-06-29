var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var List = require('../Entity/List');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.thresholds = new List([
            new SignalThreshold('MP2', 'Produktová marže', 3, 5, 5, 11, 1, 2, 3, 4, 'Má vysokou marži a prodává se hodně', 'Má vysokou marži a prodává se málo', 'Má nízkou marži a prodává se hodně', 'Má nízkou marži a prodává se málo')
        ]);
    }
    SignalThresholdLoader.prototype.getByMatrixType = function (type) {
        return this.thresholds.find(function (threshold) {
            return threshold.Type === type;
        });
    };
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
