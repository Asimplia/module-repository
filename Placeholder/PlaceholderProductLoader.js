var Repository = require('../index');

var PlaceholderProductLoader = (function () {
    function PlaceholderProductLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderProductLoader.prototype.getName = function (productId, callback) {
        this.db.query('MATCH (c:Customer {name: "Karel Havlena"}) RETURN c.name;', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['c.name']);
        });
    };

    PlaceholderProductLoader.prototype.getPrice = function (productId, callback) {
        this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
            productId: productId
        }, function (e, price) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, price);
        });
    };

    PlaceholderProductLoader.prototype.getPackageOption = function (productId, callback) {
        this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
            productId: productId
        }, function (e, productNames) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, productNames);
        });
    };

    PlaceholderProductLoader.prototype.getStokingTime = function (productId, callback) {
        this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
            productId: productId
        }, function (e, stokingTime) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, stokingTime);
        });
    };
    return PlaceholderProductLoader;
})();
module.exports = PlaceholderProductLoader;
