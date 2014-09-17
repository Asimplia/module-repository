var Repository = require('../index');

var PlaceholderCategoryLoader = (function () {
    function PlaceholderCategoryLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderCategoryLoader.prototype.getName = function (productId, callback) {
        this.db.query('MATCH (a:CATEGORY) WHERE (a.productId = {productId}) RETURN a.name', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.name']);
        });
    };

    PlaceholderCategoryLoader.prototype.getChangeInSale = function (productId, callback) {
        this.db.query('MATCH (a:CATEGORY) WHERE (a.productId = {productId}) RETURN a.categoryChangeInSale', {
            productId: productId
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
