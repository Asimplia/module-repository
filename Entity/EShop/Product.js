var Product = (function () {
    function Product(id, eShopId, name, fixPrice, inEshop) {
        this.id = id;
        this.eShopId = eShopId;
        this.name = name;
        this.fixPrice = fixPrice;
        this.inEshop = inEshop;
    }
    Object.defineProperty(Product.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });

    Product.fromRow = function (r) {
        return new Product(r[Product.COLUMN_PRODUCT_ID], r[Product.COLUMN_E_SHOP_ID], r[Product.COLUMN_NAME], r[Product.COLUMN_FIX_PRICE], r[Product.COLUMN_IN_SHOP]);
    };

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
    Product.TABLE_NAME = 'product';
    Product.COLUMN_E_SHOP_ID = 'eshopid';
    Product.COLUMN_PRODUCT_ID = 'productid';
    Product.COLUMN_NAME = 'productname';
    Product.COLUMN_FIX_PRICE = 'fixprice';
    Product.COLUMN_IN_SHOP = 'flaginshop';
    return Product;
})();
module.exports = Product;
