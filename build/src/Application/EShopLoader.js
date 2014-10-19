var EShop = require('../Entity/Application/EShop');

var EShopModel = require('../Definition/Application/EShopModel');

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

    EShopLoader.prototype.getMaxDateCreated = function (callback) {
        this.model.findOne({}).sort({ 'dateCreated': -1 }).exec(function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, object.dateCreated);
        });
    };
    return EShopLoader;
})();
module.exports = EShopLoader;
