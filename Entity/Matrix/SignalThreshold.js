var QuadrantValueEnum = require('./QuadrantValueEnum');

var SignalThreshold = (function () {
    function SignalThreshold(section, name, thresholdValueQ1, thresholdValueQ2, thresholdValueQ3, thresholdValueQ4, priorityQ1, priorityQ2, priorityQ3, priorityQ4, descriptionQ1, descriptionQ2, descriptionQ3, descriptionQ4) {
        this.section = section;
        this.name = name;
        this.thresholdValueQ1 = thresholdValueQ1;
        this.thresholdValueQ2 = thresholdValueQ2;
        this.thresholdValueQ3 = thresholdValueQ3;
        this.thresholdValueQ4 = thresholdValueQ4;
        this.priorityQ1 = priorityQ1;
        this.priorityQ2 = priorityQ2;
        this.priorityQ3 = priorityQ3;
        this.priorityQ4 = priorityQ4;
        this.descriptionQ1 = descriptionQ1;
        this.descriptionQ2 = descriptionQ2;
        this.descriptionQ3 = descriptionQ3;
        this.descriptionQ4 = descriptionQ4;
    }
    Object.defineProperty(SignalThreshold.prototype, "Section", {
        get: function () {
            return this.section;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalThreshold.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });

    SignalThreshold.prototype.toObject = function () {
        return {};
    };

    SignalThreshold.prototype.getThresholdValue = function (quadrant) {
        switch (quadrant) {
            case 1 /* RIGHT_TOP */:
                return this.thresholdValueQ1;
            case 2 /* LEFT_TOP */:
                return this.thresholdValueQ2;
            case 3 /* RIGHT_BOTTOM */:
                return this.thresholdValueQ3;
            case 4 /* LEFT_BOTTOM */:
                return this.thresholdValueQ4;
        }
        throw new Error('Specified quadrant not supported');
    };

    SignalThreshold.prototype.isSignalInQuadrant = function (record) {
        var thresholdValue = this.getThresholdValue(record.Quadrant);
        var change = record.getChange();
        return change >= thresholdValue;
    };
    return SignalThreshold;
})();
module.exports = SignalThreshold;
