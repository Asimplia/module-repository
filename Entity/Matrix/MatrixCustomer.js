﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');
var moment = require('moment');
var Customer = require('../EShop/Customer');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');

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

    MatrixCustomer.fromRow = function (o) {
        return new MatrixCustomer(o[Matrix.COLUMN_MATRIX_ID], o[Matrix.COLUMN_E_SHOP_ID], SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]), o[Matrix.COLUMN_LOAD_ID], o[Matrix.COLUMN_SCORE_ABSOLUTE], o[Matrix.COLUMN_SCORE_RELATIVE], o[Matrix.COLUMN_SCORE_WEIGHT], o[Matrix.COLUMN_CHANGE_ABSOLUTE], o[Matrix.COLUMN_CHANGE_RELATIVE], o[Matrix.COLUMN_CHANGE_WEIGHT], o[Matrix.COLUMN_PREDICTION], QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), moment(o[Matrix.COLUMN_DATE_VALID]).toDate(), o[Matrix.COLUMN_INPUT_VALUE_X], o[Matrix.COLUMN_INPUT_VALUE_Y], o[Matrix.COLUMN_CHANGE_VALUE_X], o[Matrix.COLUMN_CHANGE_VALUE_Y], o[Matrix.COLUMN_TANGENS], o[Matrix.COLUMN_CHANGE_TANGENS], new Customer(o[Matrix.COLUMN_CUSTOMER_ID], o[Matrix.COLUMN_E_SHOP_ID]));
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