var QuadrantValueEnum = require('./QuadrantValueEnum');

var Record = (function () {
    function Record(id, type, description, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, group, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.scoreAbsolute = scoreAbsolute;
        this.scoreRelative = scoreRelative;
        this.scoreWeight = scoreWeight;
        this.changeAbsolute = changeAbsolute;
        this.changeRelative = changeRelative;
        this.changeWeight = changeWeight;
        this.prediction = prediction;
        this.group = group;
        this.quadrant = quadrant;
        this.dateValid = dateValid;
        this.inputValueX = inputValueX;
        this.inputValueY = inputValueY;
        this.changeValueX = changeValueX;
        this.changeValueY = changeValueY;
    }
    Object.defineProperty(Record.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Type", {
        get: function () {
            return this.type;
        },
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Description", {
        get: function () {
            return this.description;
        },
        set: function (value) {
            this.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Quadrant", {
        get: function () {
            return this.quadrant;
        },
        enumerable: true,
        configurable: true
    });

    Record.prototype.toObject = function () {
        return {
            type: this.Type,
            description: this.Description
        };
    };

    Record.prototype.getChange = function () {
        var x = this.inputValueX - this.changeValueX;
        var y = this.inputValueX - this.changeValueY;
        return Math.sqrt(x * x + y * y);
    };

    Record.createQuadrantValueEnum = function (quadrant) {
        switch (quadrant) {
            case QuadrantValueEnum[1 /* RIGHT_TOP */]:
                return 1 /* RIGHT_TOP */;
            case QuadrantValueEnum[2 /* LEFT_TOP */]:
                return 2 /* LEFT_TOP */;
            case QuadrantValueEnum[3 /* RIGHT_BOTTOM */]:
                return 3 /* RIGHT_BOTTOM */;
            case QuadrantValueEnum[4 /* LEFT_BOTTOM */]:
                return 4 /* LEFT_BOTTOM */;
        }
        return 0 /* UNKNOWN */;
    };
    return Record;
})();
module.exports = Record;
