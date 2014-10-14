var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var EShop = require('../Entity/Application/EShop');

var EShopRecorder = (function (_super) {
    __extends(EShopRecorder, _super);
    function EShopRecorder() {
        _super.call(this);
        this.model = require('./EShopModel');
    }
    EShopRecorder.prototype.insertOrUpdateList = function (eShopList, callback) {
        var _this = this;
        eShopList.createEach().on('item', function (eShop, next) {
            _this.insertOrUpdate(eShop, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, eShopList);
        });
    };

    EShopRecorder.prototype.insertOrUpdate = function (eShop, callback) {
        var _this = this;
        this.model.findOne({ id: eShop.Id }, function (e, eShopDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!eShopDocument) {
                eShopDocument = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    eShop.Id = id;
                    _this.update(eShopDocument, EShop.fromObject, eShop, callback);
                });
                return;
            }
            _this.update(eShopDocument, EShop.fromObject, eShop, callback);
        });
    };
    return EShopRecorder;
})(AbstractRecorder);
module.exports = EShopRecorder;
