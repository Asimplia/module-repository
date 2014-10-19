var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Product = require('../Entity/Application/Product');

var ProductModel = require('../Definition/Application/ProductModel');

var ProductRecorder = (function (_super) {
    __extends(ProductRecorder, _super);
    function ProductRecorder() {
        _super.call(this);
        this.model = ProductModel;
    }
    ProductRecorder.prototype.insertOrUpdateList = function (productList, callback) {
        var _this = this;
        productList.createEach().on('item', function (product, next) {
            _this.insertOrUpdate(product, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, productList);
        });
    };

    ProductRecorder.prototype.insertOrUpdate = function (product, callback) {
        var _this = this;
        this.model.findOne({ id: product.Id, eShopId: product.EShopId }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    product.Id = id;
                    _this.update(doc, Product.fromObject, product, callback);
                });
                return;
            }
            _this.update(doc, Product.fromObject, product, callback);
        });
    };
    return ProductRecorder;
})(AbstractRecorder);
module.exports = ProductRecorder;
