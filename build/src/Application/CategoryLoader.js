var Category = require('../Entity/Application/Category');
var List = require('../Entity/List');

var CategoryModel = require('../Definition/Application/CategoryModel');

var CategoryLoader = (function () {
    function CategoryLoader() {
        this.model = CategoryModel;
    }
    CategoryLoader.prototype.getById = function (eShopId, id, callback) {
        this.model.findOne({ "id": id, "eShopId": eShopId }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, Category.fromObject(object));
        });
    };

    CategoryLoader.prototype.getCount = function (eShopId, callback) {
        this.model.count({ "eShopId": eShopId }, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    CategoryLoader.prototype.searchList = function (eShopId, query, filter, callback) {
        this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } }).limit(filter.limit).skip(filter.offset).exec(function (e, objects) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, new List(objects, Category.fromObject));
        });
    };

    CategoryLoader.prototype.getMaxDateCreated = function (callback) {
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
    return CategoryLoader;
})();
module.exports = CategoryLoader;
