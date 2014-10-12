var QuadrantValueEnum = require('./QuadrantValueEnum');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var EntityPreparer = require('../EntityPreparer');
var ColumnEnum = require('../Matrix/ColumnEnum');
var ColumnFactory = require('../Matrix/ColumnFactory');

var SignalThreshold = (function () {
    function SignalThreshold(section, name, column, thresholdValueQ1, thresholdValueQ2, thresholdValueQ3, thresholdValueQ4, priorityQ1, priorityQ2, priorityQ3, priorityQ4, descriptionQ1, descriptionQ2, descriptionQ3, descriptionQ4) {
        this.section = section;
        this.name = name;
        this.column = column;
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

    SignalThreshold.fromObject = function (o) {
        return new SignalThreshold(SectionFactory.createSectionEnum(o.section), EntityPreparer.string(o.name), ColumnFactory.createColumnEnum(o.column), EntityPreparer.float(o.thresholdValue.q1), EntityPreparer.float(o.thresholdValue.q2), EntityPreparer.float(o.thresholdValue.q3), EntityPreparer.float(o.thresholdValue.q4), EntityPreparer.float(o.priority.q1), EntityPreparer.float(o.priority.q2), EntityPreparer.float(o.priority.q3), EntityPreparer.float(o.priority.q4), EntityPreparer.stringOrNull(o.description.q1), EntityPreparer.stringOrNull(o.description.q2), EntityPreparer.stringOrNull(o.description.q3), EntityPreparer.stringOrNull(o.description.q4));
    };

    SignalThreshold.prototype.toObject = function () {
        return SignalThreshold.toObject(this);
    };

    SignalThreshold.toObject = function (e) {
        return {
            section: SectionEnum[e.section],
            name: e.name,
            column: ColumnEnum[e.column],
            thresholdValue: {
                q1: e.thresholdValueQ1,
                q2: e.thresholdValueQ2,
                q3: e.thresholdValueQ3,
                q4: e.thresholdValueQ4
            },
            priority: {
                q1: e.priorityQ1,
                q2: e.priorityQ2,
                q3: e.priorityQ3,
                q4: e.priorityQ4
            },
            description: {
                q1: e.descriptionQ1,
                q2: e.descriptionQ2,
                q3: e.descriptionQ3,
                q4: e.descriptionQ4
            }
        };
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
        throw new Error('Specified quadrant ' + quadrant + ' not supported');
    };

    SignalThreshold.prototype.isSignalInQuadrant = function (matrix) {
        var thresholdValue = this.getThresholdValue(matrix.Quadrant);
        var change = ColumnFactory.getMatrixColumnValue(matrix, this.column);
        return change >= thresholdValue;
    };
    return SignalThreshold;
})();
module.exports = SignalThreshold;
