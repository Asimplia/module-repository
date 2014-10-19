var Product = require('../Entity/Application/Product');
var List = require('../Entity/List');

var ProductModel = require('../Definition/Application/ProductModel');

var ProductLoader = (function () {
    function ProductLoader() {
        this.model = ProductModel;
    }
    ProductLoader.prototype.getById = function (eShopId, id, callback) {
        this.model.findOne({ "id": id, "eShopId": eShopId }, function (e, object) {
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

    ProductLoader.prototype.getCount = function (eShopId, callback) {
        this.model.count({ "eShopId": eShopId }, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    ProductLoader.prototype.searchList = function (eShopId, query, filter, callback) {
        this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } }).limit(filter.limit).skip(filter.offset).exec(function (e, objects) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, new List(objects, Product.fromObject));
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
