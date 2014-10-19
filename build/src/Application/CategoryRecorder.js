var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Category = require('../Entity/Application/Category');

var CategoryModel = require('../Definition/Application/CategoryModel');

var CategoryRecorder = (function (_super) {
    __extends(CategoryRecorder, _super);
    function CategoryRecorder() {
        _super.call(this);
        this.model = CategoryModel;
    }
    CategoryRecorder.prototype.insertOrUpdateList = function (categoryList, callback) {
        var _this = this;
        categoryList.createEach().on('item', function (category, next) {
            _this.insertOrUpdate(category, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, categoryList);
        });
    };

    CategoryRecorder.prototype.insertOrUpdate = function (category, callback) {
        var _this = this;
        this.model.findOne({ id: category.Id, eShopId: category.EShopId }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    category.Id = id;
                    _this.update(doc, Category.fromObject, category, callback);
                });
                return;
            }
            _this.update(doc, Category.fromObject, category, callback);
        });
    };
    return CategoryRecorder;
})(AbstractRecorder);
module.exports = CategoryRecorder;
