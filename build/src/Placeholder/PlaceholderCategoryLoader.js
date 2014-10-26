var Repository = require('../index');

var PlaceholderCategoryLoader = (function () {
    function PlaceholderCategoryLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderCategoryLoader.prototype.getName = function (categoryId, callback) {
        this.db.query('MATCH (a:CATEGORY) WHERE (a.categoryId = {categoryId} ) RETURN a.name', {
            categoryId: categoryId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.name']);
        });
    };

    PlaceholderCategoryLoader.prototype.getChangeInSale = function (categoryId, callback) {
        this.db.query('MATCH (a:CATEGORY) WHERE (a.categoryId = {categoryId}) RETURN a.categoryChangeInSale', {
            categoryId: categoryId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.categoryChangeInSale']);
        });
    };
    return PlaceholderCategoryLoader;
})();
module.exports = PlaceholderCategoryLoader;
