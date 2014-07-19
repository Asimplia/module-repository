var QuadrantValueEnum = require('./QuadrantValueEnum');

var Record = (function () {
    function Record(id, type, description, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, group, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens) {
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
        this.tangens = tangens;
        this.changeTangens = changeTangens;
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
    Object.defineProperty(Record.prototype, "ChangeAbsolute", {
        get: function () {
            return this.changeAbsolute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ChangeRelative", {
        get: function () {
            return this.changeRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ChangeWeight", {
        get: function () {
            return this.changeWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ScoreAbsolute", {
        get: function () {
            return this.scoreAbsolute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ScoreRelative", {
        get: function () {
            return this.scoreRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ScoreWeight", {
        get: function () {
            return this.scoreWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Prediction", {
        get: function () {
            return this.prediction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "InputValueX", {
        get: function () {
            return this.inputValueX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "InputValueY", {
        get: function () {
            return this.inputValueY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ChangeValueX", {
        get: function () {
            return this.changeValueX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ChangeValueY", {
        get: function () {
            return this.changeValueY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Tangens", {
        get: function () {
            return this.tangens;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "ChangeTangens", {
        get: function () {
            return this.changeTangens;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Product", {
        get: function () {
            return null;
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
        return this.changeWeight;
    };

    Record.createQuadrantValueEnum = function (quadrant) {
        switch (quadrant) {
            case QuadrantValueEnum[1 /* RIGHT_TOP */]:
            case 1 /* RIGHT_TOP */:
                return 1 /* RIGHT_TOP */;
            case QuadrantValueEnum[2 /* LEFT_TOP */]:
            case 2 /* LEFT_TOP */:
                return 2 /* LEFT_TOP */;
            case QuadrantValueEnum[3 /* RIGHT_BOTTOM */]:
            case 3 /* RIGHT_BOTTOM */:
                return 3 /* RIGHT_BOTTOM */;
            case QuadrantValueEnum[4 /* LEFT_BOTTOM */]:
            case 4 /* LEFT_BOTTOM */:
                return 4 /* LEFT_BOTTOM */;
            case QuadrantValueEnum[6 /* RIGHT */]:
            case 6 /* RIGHT */:
                return 6 /* RIGHT */;
            case QuadrantValueEnum[5 /* LEFT */]:
            case 5 /* LEFT */:
                return 5 /* LEFT */;
            case QuadrantValueEnum[8 /* BOTTOM */]:
            case 8 /* BOTTOM */:
                return 8 /* BOTTOM */;
            case QuadrantValueEnum[7 /* TOP */]:
            case 7 /* TOP */:
                return 7 /* TOP */;
        }
        return 0 /* UNKNOWN */;
    };
    return Record;
})();
module.exports = Record;
