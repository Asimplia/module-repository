var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Record = require('./Record');
var moment = require('moment');
var Product = require('../EShop/Product');

var MatrixProduct = (function (_super) {
    __extends(MatrixProduct, _super);
    function MatrixProduct(id, type, description, product, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, group, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY) {
        _super.call(this, id, type, description, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, group, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY);
        this.product = product;
    }
    MatrixProduct.fromRow = function (o) {
        return new MatrixProduct(o.MatrixID, o.MatrixType, o.Description, new Product(o.ProductID, o.EShopID, o.ProductName, o.FixPrice, o.FlagInShop), o.MatrixScoreAbs, o.MatrixScoreRel, o.MatrixScoreWei, o.MatrixChangeAbs, o.MatrixChangeRel, o.MatrixChangeWei, o.MatrixPrediction, o.MatrixGroup, Record.createQuadrantValueEnum(o.MatrixQuadrant), moment(o.DateValid).toDate(), o.InputValueX, o.InputValueY, o.ChangeValueX, o.ChangeValueY);
    };

    MatrixProduct.toObject = function (entity) {
        return {
            type: entity.Type,
            description: entity.Description,
            product: entity.product.toObject()
        };
    };

    MatrixProduct.prototype.toObject = function () {
        return MatrixProduct.toObject(this);
    };
    return MatrixProduct;
})(Record);
module.exports = MatrixProduct;
