var EntityPreparer = require('../EntityPreparer');

var Product = (function () {
    function Product(id, eShopId, name, basePrice, ean, dateCreated) {
        this.id = id;
        this.eShopId = eShopId;
        this.name = name;
        this.basePrice = basePrice;
        this.ean = ean;
        this.dateCreated = dateCreated;
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
        return new Product(EntityPreparer.int(r[Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID]), EntityPreparer.int(r[Product.TABLE_NAME + '.' + Product.COLUMN_E_SHOP_ID]), EntityPreparer.stringOrNull(r[Product.TABLE_NAME + '.' + Product.COLUMN_NAME]), EntityPreparer.float(r[Product.TABLE_NAME + '.' + Product.COLUMN_BASE_PRICE]), EntityPreparer.stringOrNull(r[Product.TABLE_NAME + '.' + Product.COLUMN_EAN]), EntityPreparer.date(r[Product.TABLE_NAME + '.' + Product.COLUMN_DATE_CREATED]));
    };

    Product.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            name: entity.name,
            basePrice: entity.basePrice,
            ean: entity.ean,
            dateCreated: entity.dateCreated
        };
    };

    Product.prototype.toObject = function () {
        return Product.toObject(this);
    };

    Product.fromObject = function (object) {
        return new Product(EntityPreparer.int(object.id), EntityPreparer.int(object.eShopId), EntityPreparer.stringOrNull(object.name), EntityPreparer.float(object.basePrice), EntityPreparer.stringOrNull(object.ean), EntityPreparer.date(object.dateCreated));
    };
    Product.TABLE_NAME = 'warehouse.product';
    Product.COLUMN_E_SHOP_ID = 'eshopid';
    Product.COLUMN_PRODUCT_ID = 'productid';
    Product.COLUMN_NAME = 'productname';
    Product.COLUMN_BASE_PRICE = 'baseprice';
    Product.COLUMN_EAN = 'ean';
    Product.COLUMN_DATE_CREATED = 'dateadded';
    return Product;
})();
module.exports = Product;
