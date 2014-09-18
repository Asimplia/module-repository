var EntityPreparer = require('../EntityPreparer');

var EShop = (function () {
    function EShop(id, countryCode, owner, url, name) {
        this.id = id;
        this.countryCode = countryCode;
        this.owner = owner;
        this.url = url;
        this.name = name;
    }
    EShop.prototype.toObject = function () {
        return EShop.toObject(this);
    };

    EShop.toObject = function (e) {
        return {
            id: e.id,
            countryCode: e.countryCode,
            owner: e.owner,
            url: e.url,
            name: e.name
        };
    };

    EShop.fromObject = function (o) {
        return new EShop(EntityPreparer.int(o.id), EntityPreparer.stringOrNull(o.countryCode), EntityPreparer.string(o.owner), EntityPreparer.string(o.url), EntityPreparer.string(o.name));
    };

    EShop.fromRow = function (r) {
        return new EShop(EntityPreparer.int(r[EShop.COLUMN_E_SHOP_ID]), EntityPreparer.stringOrNull(r[EShop.COLUMN_COUNTRY_CODE]), EntityPreparer.string(r[EShop.COLUMN_OWNER]), EntityPreparer.string(r[EShop.COLUMN_URL]), EntityPreparer.string(r[EShop.COLUMN_NAME]));
    };
    EShop.TABLE_NAME = 'eshop';
    EShop.COLUMN_E_SHOP_ID = 'eshopid';
    EShop.COLUMN_COUNTRY_CODE = 'countryidiso';
    EShop.COLUMN_OWNER = 'eshopowner';
    EShop.COLUMN_URL = 'eshopurl';
    EShop.COLUMN_NAME = 'eshopname';
    return EShop;
})();
module.exports = EShop;
