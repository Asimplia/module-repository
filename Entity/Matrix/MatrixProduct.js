var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');

var Product = require('../EShop/Product');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');
var EntityPreparer = require('../EntityPreparer');

var MatrixProduct = (function (_super) {
    __extends(MatrixProduct, _super);
    function MatrixProduct(id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, product) {
        _super.call(this, id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens);
        this.product = product;
    }
    Object.defineProperty(MatrixProduct.prototype, "Product", {
        get: function () {
            return this.product;
        },
        enumerable: true,
        configurable: true
    });

    MatrixProduct.toObject = function (e) {
        var o = Matrix.toObject(e);
        o.product = e.product.toObject();
        return o;
    };

    MatrixProduct.prototype.toObject = function () {
        return MatrixProduct.toObject(this);
    };

    MatrixProduct.fromRow = function (o) {
        return new MatrixProduct(EntityPreparer.int(o[Matrix.COLUMN_MATRIX_ID]), EntityPreparer.int(o[Matrix.COLUMN_E_SHOP_ID]), SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]), EntityPreparer.int(o[Matrix.COLUMN_LOAD_ID]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_ABSOLUTE]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_RELATIVE]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_WEIGHT]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_ABSOLUTE]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_RELATIVE]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_WEIGHT]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_PREDICTION]), QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), EntityPreparer.date(o[Matrix.COLUMN_DATE_VALID]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_TANGENS]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_TANGENS]), Product.fromRow(o));
    };

    MatrixProduct.prototype.isCorresponding = function (matrix) {
        if (matrix instanceof MatrixProduct) {
            return this.Product.Id == matrix.Product.Id;
        }
        return false;
    };
    return MatrixProduct;
})(Matrix);
module.exports = MatrixProduct;
