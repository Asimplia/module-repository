var Channel = (function () {
    function Channel(id, eShopId) {
        this.id = id;
        this.eShopId = eShopId;
    }
    Object.defineProperty(Channel.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });

    Channel.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId
        };
    };

    Channel.prototype.toObject = function () {
        return Channel.toObject(this);
    };
    return Channel;
})();
module.exports = Channel;
