var Matrix = (function () {
    function Matrix(id, eShopId, type, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens) {
        this.id = id;
        this.eShopId = eShopId;
        this.type = type;
        this.loadId = loadId;
        this.scoreAbsolute = scoreAbsolute;
        this.scoreRelative = scoreRelative;
        this.scoreWeight = scoreWeight;
        this.changeAbsolute = changeAbsolute;
        this.changeRelative = changeRelative;
        this.changeWeight = changeWeight;
        this.prediction = prediction;
        this.quadrant = quadrant;
        this.dateValid = dateValid;
        this.inputValueX = inputValueX;
        this.inputValueY = inputValueY;
        this.changeValueX = changeValueX;
        this.changeValueY = changeValueY;
        this.tangens = tangens;
        this.changeTangens = changeTangens;
    }
    Object.defineProperty(Matrix.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "Type", {
        get: function () {
            return this.type;
        },
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "Quadrant", {
        get: function () {
            return this.quadrant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeAbsolute", {
        get: function () {
            return this.changeAbsolute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeRelative", {
        get: function () {
            return this.changeRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeWeight", {
        get: function () {
            return this.changeWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ScoreAbsolute", {
        get: function () {
            return this.scoreAbsolute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ScoreRelative", {
        get: function () {
            return this.scoreRelative;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ScoreWeight", {
        get: function () {
            return this.scoreWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "Prediction", {
        get: function () {
            return this.prediction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "InputValueX", {
        get: function () {
            return this.inputValueX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "InputValueY", {
        get: function () {
            return this.inputValueY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeValueX", {
        get: function () {
            return this.changeValueX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeValueY", {
        get: function () {
            return this.changeValueY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "Tangens", {
        get: function () {
            return this.tangens;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChangeTangens", {
        get: function () {
            return this.changeTangens;
        },
        enumerable: true,
        configurable: true
    });

    Matrix.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            type: entity.type
        };
    };

    Matrix.prototype.toObject = function () {
        return Matrix.toObject(this);
    };

    Matrix.prototype.getChange = function () {
        return this.changeWeight;
    };
    Matrix.TABLE_NAME = 'matrix';
    Matrix.COLUMN_MATRIX_ID = 'matrixid';
    Matrix.COLUMN_E_SHOP_ID = 'eshopid';
    Matrix.COLUMN_TYPE = 'matrixtype';
    Matrix.COLUMN_LOAD_ID = 'loadid';
    Matrix.COLUMN_SCORE_ABSOLUTE = 'matrixscoreabs';
    Matrix.COLUMN_SCORE_RELATIVE = 'matrixscorerel';
    Matrix.COLUMN_SCORE_WEIGHT = 'matrixscorewei';
    Matrix.COLUMN_CHANGE_ABSOLUTE = 'matrixchangeabs';
    Matrix.COLUMN_CHANGE_RELATIVE = 'matrixchangerel';
    Matrix.COLUMN_CHANGE_WEIGHT = 'matrixchangewei';
    Matrix.COLUMN_PREDICTION = 'matrixprediction';
    Matrix.COLUMN_QUADRANT = 'matrixquadrant';
    Matrix.COLUMN_DATE_VALID = 'datevalid';
    Matrix.COLUMN_INPUT_VALUE_X = 'inputvaluex';
    Matrix.COLUMN_INPUT_VALUE_Y = 'inputvaluey';
    Matrix.COLUMN_CHANGE_VALUE_X = 'changevaluex';
    Matrix.COLUMN_CHANGE_VALUE_Y = 'changevaluey';
    Matrix.COLUMN_TANGENS = 'tan';
    Matrix.COLUMN_CHANGE_TANGENS = 'changeTan';
    Matrix.COLUMN_PRODUCT_ID = 'productid';
    Matrix.COLUMN_CUSTOMER_ID = 'customerid';
    Matrix.COLUMN_CHANNEL_ID = 'channelid';
    Matrix.COLUMN_ORDER_ID = 'orderid';
    return Matrix;
})();
module.exports = Matrix;
