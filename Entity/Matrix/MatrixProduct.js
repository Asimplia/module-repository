var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');
var moment = require('moment');
var Product = require('../EShop/Product');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');

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

    MatrixProduct.fromRow = function (o) {
        return new MatrixProduct(o[Matrix.COLUMN_MATRIX_ID], o[Matrix.COLUMN_E_SHOP_ID], SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]), o[Matrix.COLUMN_LOAD_ID], o[Matrix.COLUMN_SCORE_ABSOLUTE], o[Matrix.COLUMN_SCORE_RELATIVE], o[Matrix.COLUMN_SCORE_WEIGHT], o[Matrix.COLUMN_CHANGE_ABSOLUTE], o[Matrix.COLUMN_CHANGE_RELATIVE], o[Matrix.COLUMN_CHANGE_WEIGHT], o[Matrix.COLUMN_PREDICTION], QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), moment(o[Matrix.COLUMN_DATE_VALID]).toDate(), o[Matrix.COLUMN_INPUT_VALUE_X], o[Matrix.COLUMN_INPUT_VALUE_Y], o[Matrix.COLUMN_CHANGE_VALUE_X], o[Matrix.COLUMN_CHANGE_VALUE_Y], o[Matrix.COLUMN_TANGENS], o[Matrix.COLUMN_CHANGE_TANGENS], new Product(o[Matrix.COLUMN_PRODUCT_ID], o[Matrix.COLUMN_E_SHOP_ID], null, null, null));
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
