var EShop = require('../Entity/Application/EShop');

var EShopModel = require('./EShopModel');

var EShopLoader = (function () {
    function EShopLoader() {
        this.model = EShopModel;
    }
    EShopLoader.prototype.getById = function (id, callback) {
        this.model.findOne({ "id": id }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, EShop.fromObject(object));
        });
    };

    EShopLoader.prototype.getCount = function (callback) {
        this.model.count({}, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };
    return EShopLoader;
})();
module.exports = EShopLoader;
