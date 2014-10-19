var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EShopProduct = require('../EShop/Product');

var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        _super.apply(this, arguments);
    }
    return Product;
})(EShopProduct);
module.exports = Product;
