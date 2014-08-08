var EShop = (function () {
    function EShop(id, name) {
        this.id = id;
        this.name = name;
    }
    Object.defineProperty(EShop.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EShop.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });

    EShop.prototype.toObject = function () {
        return EShop.toObject(this);
    };

    EShop.toObject = function (e) {
        return {
            id: e.id,
            name: e.name
        };
    };

    EShop.fromObject = function (o) {
        return new EShop(o.id, o.name);
    };
    return EShop;
})();
module.exports = EShop;
