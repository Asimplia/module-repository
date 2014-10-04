var Repository = require('../index');

var PlaceholderCategoryLoader = (function () {
    function PlaceholderCategoryLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderCategoryLoader.prototype.getName = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT)-->(b:CATEGORY) WHERE (a.productId = {productId}) RETURN b.name limit 1', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['b.name']);
        });
    };

    PlaceholderCategoryLoader.prototype.getChangeInSale = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT)-->(b:CATEGORY) WHERE (a.productId = {productId}) RETURN b.categoryChangeInSale', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['b.categoryChangeInSale']);
        });
    };
    return PlaceholderCategoryLoader;
})();
module.exports = PlaceholderCategoryLoader;
