var QuadrantValueEnum = require('./QuadrantValueEnum');

var moment = require('moment');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');
var QuadrantValueFactory = require('./QuadrantValueFactory');
var EntityPreparer = require('../EntityPreparer');

var Matrix = (function () {
    function Matrix(id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, productId, customerId, channelId, categoryId) {
        this.id = id;
        this.eShopId = eShopId;
        this.section = section;
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
        this.productId = productId;
        this.customerId = customerId;
        this.channelId = channelId;
        this.categoryId = categoryId;
    }
    Object.defineProperty(Matrix.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "LoadId", {
        get: function () {
            return this.loadId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "Section", {
        get: function () {
            return this.section;
        },
        set: function (value) {
            this.section = value;
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
    Object.defineProperty(Matrix.prototype, "ProductId", {
        get: function () {
            return this.productId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "CustomerId", {
        get: function () {
            return this.customerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ChannelId", {
        get: function () {
            return this.channelId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "CategoryId", {
        get: function () {
            return this.categoryId;
        },
        enumerable: true,
        configurable: true
    });

    Matrix.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            section: SectionEnum[entity.section],
            loadId: entity.loadId,
            scoreAbsolute: entity.scoreAbsolute,
            scoreRelative: entity.scoreRelative,
            scoreWeight: entity.scoreWeight,
            changeAbsolute: entity.changeAbsolute,
            changeRelative: entity.changeRelative,
            changeWeight: entity.changeWeight,
            prediction: entity.prediction,
            quadrant: QuadrantValueEnum[entity.quadrant],
            dateValid: entity.dateValid ? moment(entity.dateValid).format('YYYY-MM-DD HH:mm:ss') : null,
            inputValueX: entity.inputValueX,
            inputValueY: entity.inputValueY,
            changeValueX: entity.changeValueX,
            changeValueY: entity.changeValueY,
            tangens: entity.tangens,
            changeTangens: entity.changeTangens,
            productId: entity.productId,
            customerId: entity.customerId,
            channelId: entity.channelId,
            categoryId: entity.categoryId
        };
    };

    Matrix.fromObject = function (object) {
        return new Matrix(EntityPreparer.intOrNull(object.id), EntityPreparer.int(object.eShopId), SectionFactory.createSectionEnum(object.section), EntityPreparer.int(object.loadId), EntityPreparer.float(object.scoreAbsolute), EntityPreparer.float(object.scoreRelative), EntityPreparer.float(object.scoreWeight), EntityPreparer.float(object.changeAbsolute), EntityPreparer.float(object.changeRelative), EntityPreparer.float(object.changeWeight), EntityPreparer.floatOrNull(object.prediction), QuadrantValueFactory.createQuadrantValueEnum(object.quadrant), EntityPreparer.date(object.dateValid), EntityPreparer.floatOrNull(object.inputValueX), EntityPreparer.floatOrNull(object.inputValueY), EntityPreparer.floatOrNull(object.changeValueX), EntityPreparer.floatOrNull(object.changeValueY), EntityPreparer.floatOrNull(object.tangens), EntityPreparer.floatOrNull(object.changeTangens), EntityPreparer.intOrNull(object.productId), EntityPreparer.intOrNull(object.customerId), EntityPreparer.intOrNull(object.channelId), EntityPreparer.intOrNull(object.categoryId));
    };

    Matrix.prototype.toObject = function () {
        return Matrix.toObject(this);
    };

    Matrix.prototype.isCorresponding = function (matrix) {
        throw new Error('Implement this abstract method');
    };
    Matrix.TABLE_NAME = 'analytical.matrix';
    Matrix.COLUMN_MATRIX_ID = 'matrixid';
    Matrix.COLUMN_E_SHOP_ID = 'eshopid';
    Matrix.COLUMN_SECTION = 'matrixtype';
    Matrix.COLUMN_LOAD_ID = 'loadid';
    Matrix.COLUMN_SCORE_ABSOLUTE = 'scoreabs';
    Matrix.COLUMN_SCORE_RELATIVE = 'scorerel';
    Matrix.COLUMN_SCORE_WEIGHT = 'scorewei';
    Matrix.COLUMN_CHANGE_ABSOLUTE = 'changeabs';
    Matrix.COLUMN_CHANGE_RELATIVE = 'changerel';
    Matrix.COLUMN_CHANGE_WEIGHT = 'changewei';
    Matrix.COLUMN_PREDICTION = 'prediction';
    Matrix.COLUMN_QUADRANT = 'quadrant';
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
    Matrix.COLUMN_CATEGORY_ID = 'productcategoryid';
    return Matrix;
})();
module.exports = Matrix;
