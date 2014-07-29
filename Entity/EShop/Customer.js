var Customer = (function () {
    function Customer(id, eShopId) {
        this.id = id;
        this.eShopId = eShopId;
    }
    Object.defineProperty(Customer.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });

    Customer.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId
        };
    };

    Customer.prototype.toObject = function () {
        return Customer.toObject(this);
    };
    return Customer;
})();
module.exports = Customer;
