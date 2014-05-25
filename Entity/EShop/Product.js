var Product = (function () {
    function Product(id, eShopId, name, fixPrice, inEshop) {
        this.id = id;
        this.eShopId = eShopId;
        this.name = name;
        this.fixPrice = fixPrice;
        this.inEshop = inEshop;
    }
    Product.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            name: entity.name,
            fixPrice: entity.fixPrice,
            inEshop: entity.inEshop
        };
    };

    Product.prototype.toObject = function () {
        return Product.toObject(this);
    };
    return Product;
})();
module.exports = Product;
