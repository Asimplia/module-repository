var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EShopCustomer = require('../EShop/Customer');

var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        _super.apply(this, arguments);
    }
    return Customer;
})(EShopCustomer);
module.exports = Customer;
