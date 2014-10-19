var Customer = require('../Entity/Application/Customer');

var CustomerModel = require('../Definition/Application/CustomerModel');

var CustomerLoader = (function () {
    function CustomerLoader() {
        this.model = CustomerModel;
    }
    CustomerLoader.prototype.getById = function (eShopId, id, callback) {
        this.model.findOne({ "id": id, "eShopId": eShopId }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, Customer.fromObject(object));
        });
    };

    CustomerLoader.prototype.getCount = function (eShopId, callback) {
        this.model.count({ "eShopId": eShopId }, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    CustomerLoader.prototype.getMaxDateCreated = function (callback) {
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
    return CustomerLoader;
})();
module.exports = CustomerLoader;
