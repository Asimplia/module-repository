var Repository = require('../index');

var PlaceholderProductLoader = (function () {
    function PlaceholderProductLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderProductLoader.prototype.getProductName = function (productId, callback) {
        this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
            productId: productId
        }, function (e, productName) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, productName);
        });
    };
    return PlaceholderProductLoader;
})();
module.exports = PlaceholderProductLoader;
