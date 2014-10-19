var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EShopCategory = require('../EShop/Category');

var Category = (function (_super) {
    __extends(Category, _super);
    function Category() {
        _super.apply(this, arguments);
    }
    return Category;
})(EShopCategory);
module.exports = Category;
