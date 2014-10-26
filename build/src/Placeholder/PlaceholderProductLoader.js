var Repository = require('../index');
var _ = require('underscore');

var PlaceholderProductLoader = (function () {
    function PlaceholderProductLoader() {
        var _this = this;
        Repository.getGraphDatabase(function (db) {
            _this.db = db;
        });
    }
    PlaceholderProductLoader.prototype.getName = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.name', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.name']);
        });
    };

    PlaceholderProductLoader.prototype.getPrice = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPrice', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.productPrice']);
        });
    };

    PlaceholderProductLoader.prototype.getPriceChange = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPriceChange', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.productPriceChange']);
        });
    };

    PlaceholderProductLoader.prototype.getPackageOption = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT)-->(b:ORDER_ITEM)-->(c:ORDER)<--(d:ORDER_ITEM)--(e:PRODUCT) WHERE (a.productId = {productId}) RETURN e.name', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            var productNames = _.map(res, function (row) {
                return row['e.name'];
            });
            callback(null, productNames);
        });
    };

    PlaceholderProductLoader.prototype.getSku = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productSku', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.productSku']);
        });
    };

    PlaceholderProductLoader.prototype.getMarginRate = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productMarginRate', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.productMarginRate']);
        });
    };

    PlaceholderProductLoader.prototype.getCustomersForProduct = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT {productId: {productId} })-[*2]->(c:ORDER)<-[*2]-(e:PRODUCT) WITH e MATCH (x:CUSTOMER)<--(c:ORDER)<-[*2]-(e) WHERE NOT (e.productId = {productId} ) RETURN DISTINCT x.firstname, x.lastname, x.email LIMIT 50', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            var customers = _.map(res, function (row) {
                return { firstname: row['x.firstname'], lastname: row['x.lastname'], email: row['x.email'] };
            });
            callback(null, customers);
        });
    };

    PlaceholderProductLoader.prototype.getConversionRate = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.conversionRate', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.conversionRate']);
        });
    };

    PlaceholderProductLoader.prototype.getDiscountValue = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.discount', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.discount']);
        });
    };

    PlaceholderProductLoader.prototype.getStockingTime = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productStockingTime', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, res.pop()['a.productStockingTime']);
        });
    };

    PlaceholderProductLoader.prototype.getCategoryName = function (productId, callback) {
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

    PlaceholderProductLoader.prototype.getCommercialChannels = function (productId, callback) {
        this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.name', {
            productId: productId
        }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            var channelNames = _.map(res, function (row) {
                return row['a.name'];
            });
            callback(null, channelNames);
        });
    };
    return PlaceholderProductLoader;
})();
module.exports = PlaceholderProductLoader;
