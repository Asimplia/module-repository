var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EShopChannel = require('../EShop/Channel');

var Channel = (function (_super) {
    __extends(Channel, _super);
    function Channel() {
        _super.apply(this, arguments);
    }
    return Channel;
})(EShopChannel);
module.exports = Channel;
