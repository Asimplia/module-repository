var Category = require('../Entity/Application/Category');

var CategoryModel = require('../Definition/Application/CategoryModel');

var CategoryLoader = (function () {
    function CategoryLoader() {
        this.model = CategoryModel;
    }
    CategoryLoader.prototype.getById = function (id, callback) {
        this.model.findOne({ "id": id }, function (e, object) {
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

    CategoryLoader.prototype.getCount = function (callback) {
        this.model.count({}, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
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
