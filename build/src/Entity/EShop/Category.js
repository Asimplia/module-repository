var EntityPreparer = require('../EntityPreparer');

var Category = (function () {
    function Category(id, eShopId, parentCategoryId, name, dateCreated) {
        this.id = id;
        this.eShopId = eShopId;
        this.parentCategoryId = parentCategoryId;
        this.name = name;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(Category.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });

    Category.fromRow = function (r) {
        return new Category(EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID]), EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_E_SHOP_ID]), EntityPreparer.intOrNull(r[Category.TABLE_NAME + '.' + Category.COLUMN_PARENT_CATEGORY_ID]), EntityPreparer.string(r[Category.TABLE_NAME + '.' + Category.COLUMN_NAME]), EntityPreparer.date(r[Category.TABLE_NAME + '.' + Category.COLUMN_DATE_CREATED]));
    };

    Category.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            parentCategoryId: entity.parentCategoryId,
            name: entity.name,
            dateCreated: entity.dateCreated
        };
    };

    Category.prototype.toObject = function () {
        return Category.toObject(this);
    };

    Category.fromObject = function (object) {
        return new Category(EntityPreparer.int(object.id), EntityPreparer.int(object.eShopId), EntityPreparer.intOrNull(object.productcategoryid), EntityPreparer.string(object.name), EntityPreparer.date(object.dateCreated));
    };
    Category.TABLE_NAME = 'warehouse.productcategory';
    Category.COLUMN_CATEGORY_ID = 'productcategoryid';
    Category.COLUMN_E_SHOP_ID = 'eshopid';
    Category.COLUMN_PARENT_CATEGORY_ID = 'parentcategory';
    Category.COLUMN_NAME = 'categoryname';
    Category.COLUMN_DATE_CREATED = 'datecreated';
    return Category;
})();
module.exports = Category;
