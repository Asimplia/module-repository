var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EShopCompany = require('../EShop/Company');

var Company = (function (_super) {
    __extends(Company, _super);
    function Company() {
        _super.apply(this, arguments);
    }
    return Company;
})(EShopCompany);
module.exports = Company;
