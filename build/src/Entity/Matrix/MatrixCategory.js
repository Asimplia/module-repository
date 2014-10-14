var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');

var Category = require('../EShop/Category');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');
var EntityPreparer = require('../EntityPreparer');

var MatrixCategory = (function (_super) {
    __extends(MatrixCategory, _super);
    function MatrixCategory(id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, category) {
        _super.call(this, id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, null, null, null, category.Id);
        this.category = category;
    }
    Object.defineProperty(MatrixCategory.prototype, "Category", {
        get: function () {
            return this.category;
        },
        enumerable: true,
        configurable: true
    });

    MatrixCategory.toObject = function (e) {
        var o = Matrix.toObject(e);
        o.category = e.category.toObject();
        return o;
    };

    MatrixCategory.prototype.toObject = function () {
        return MatrixCategory.toObject(this);
    };

    MatrixCategory.fromRow = function (o) {
        return new MatrixCategory(EntityPreparer.intOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_MATRIX_ID]), EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID]), SectionFactory.createSectionEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]), EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_ABSOLUTE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_RELATIVE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_WEIGHT]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_ABSOLUTE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_RELATIVE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_WEIGHT]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PREDICTION]), QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_QUADRANT]), EntityPreparer.date(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_TANGENS]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_TANGENS]), Category.fromRow(o));
    };

    MatrixCategory.prototype.isCorresponding = function (matrix) {
        if (matrix instanceof MatrixCategory) {
            return this.Category.Id == matrix.Category.Id;
        }
        return false;
    };
    return MatrixCategory;
})(Matrix);
module.exports = MatrixCategory;
