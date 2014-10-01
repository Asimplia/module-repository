var EntityPreparer = require('../EntityPreparer');

var Category = (function () {
    function Category(id, eShopId, parentCategoryId, name) {
        this.id = id;
        this.eShopId = eShopId;
        this.parentCategoryId = parentCategoryId;
        this.name = name;
    }
    Object.defineProperty(Category.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });

    Category.fromRow = function (r) {
        return new Category(EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID]), EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_E_SHOP_ID]), EntityPreparer.intOrNull(r[Category.TABLE_NAME + '.' + Category.COLUMN_PARENT_CATEGORY_ID]), EntityPreparer.string(r[Category.TABLE_NAME + '.' + Category.COLUMN_NAME]));
    };

    Category.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            parentCategoryId: entity.parentCategoryId,
            name: entity.name
        };
    };

    Category.prototype.toObject = function () {
        return Category.toObject(this);
    };
    Category.TABLE_NAME = 'warehouse.productcategory';
    Category.COLUMN_CATEGORY_ID = 'productcategoryid';
    Category.COLUMN_E_SHOP_ID = 'eshopid';
    Category.COLUMN_PARENT_CATEGORY_ID = 'parentcategory';
    Category.COLUMN_NAME = 'categoryname';
    return Category;
})();
module.exports = Category;
