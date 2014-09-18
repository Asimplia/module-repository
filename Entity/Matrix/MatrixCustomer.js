var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');

var Customer = require('../EShop/Customer');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');
var EntityPreparer = require('../EntityPreparer');

var MatrixCustomer = (function (_super) {
    __extends(MatrixCustomer, _super);
    function MatrixCustomer(id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, customer) {
        _super.call(this, id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens);
        this.customer = customer;
    }
    Object.defineProperty(MatrixCustomer.prototype, "Customer", {
        get: function () {
            return this.customer;
        },
        enumerable: true,
        configurable: true
    });

    MatrixCustomer.toObject = function (e) {
        var o = Matrix.toObject(e);
        o.customer = e.customer.toObject();
        return o;
    };

    MatrixCustomer.prototype.toObject = function () {
        return MatrixCustomer.toObject(this);
    };

    MatrixCustomer.fromRow = function (o) {
        return new MatrixCustomer(EntityPreparer.int(o[Matrix.COLUMN_MATRIX_ID]), EntityPreparer.int(o[Matrix.COLUMN_E_SHOP_ID]), SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]), EntityPreparer.int(o[Matrix.COLUMN_LOAD_ID]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_ABSOLUTE]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_RELATIVE]), EntityPreparer.float(o[Matrix.COLUMN_SCORE_WEIGHT]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_ABSOLUTE]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_RELATIVE]), EntityPreparer.float(o[Matrix.COLUMN_CHANGE_WEIGHT]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_PREDICTION]), QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), EntityPreparer.date(o[Matrix.COLUMN_DATE_VALID]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_TANGENS]), EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_TANGENS]), Customer.fromRow(o));
    };

    MatrixCustomer.prototype.isCorresponding = function (matrix) {
        if (matrix instanceof MatrixCustomer) {
            return this.Customer.Id == matrix.Customer.Id;
        }
        return false;
    };
    return MatrixCustomer;
})(Matrix);
module.exports = MatrixCustomer;
