var EntityPreparer = require('../EntityPreparer');

var EShop = (function () {
    function EShop(id, countryCode, owner, url, name, dateCreated) {
        this.id = id;
        this.countryCode = countryCode;
        this.owner = owner;
        this.url = url;
        this.name = name;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(EShop.prototype, "Id", {
        get: function () {
            return this.id;
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
            countryCode: e.countryCode,
            owner: e.owner,
            url: e.url,
            name: e.name,
            dateCreated: e.dateCreated
        };
    };

    EShop.fromObject = function (o) {
        return new EShop(EntityPreparer.int(o.id), EntityPreparer.stringOrNull(o.countryCode), EntityPreparer.string(o.owner), EntityPreparer.string(o.url), EntityPreparer.string(o.name), EntityPreparer.date(o.dateCreated));
    };

    EShop.fromRow = function (r) {
        return new EShop(EntityPreparer.int(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_E_SHOP_ID]), EntityPreparer.stringOrNull(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_COUNTRY_CODE]), EntityPreparer.string(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_OWNER]), EntityPreparer.string(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_URL]), EntityPreparer.string(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_NAME]), EntityPreparer.date(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_DATE_CREATED]));
    };
    EShop.TABLE_NAME = 'warehouse.eshop';
    EShop.COLUMN_E_SHOP_ID = 'eshopid';
    EShop.COLUMN_COUNTRY_CODE = 'countryidiso';
    EShop.COLUMN_OWNER = 'eshopowner';
    EShop.COLUMN_URL = 'eshopurl';
    EShop.COLUMN_NAME = 'eshopname';
    EShop.COLUMN_DATE_CREATED = 'datecreated';
    return EShop;
})();
module.exports = EShop;
