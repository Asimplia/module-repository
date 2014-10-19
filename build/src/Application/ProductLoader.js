var Product = require('../Entity/Application/Product');

var ProductModel = require('../Definition/Application/ProductModel');

var ProductLoader = (function () {
    function ProductLoader() {
        this.model = ProductModel;
    }
    ProductLoader.prototype.getById = function (id, callback) {
        this.model.findOne({ "id": id }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, Product.fromObject(object));
        });
    };

    ProductLoader.prototype.getCount = function (callback) {
        this.model.count({}, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    ProductLoader.prototype.getMaxDateCreated = function (callback) {
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
    return ProductLoader;
})();
module.exports = ProductLoader;
