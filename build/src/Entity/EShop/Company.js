var EntityPreparer = require('../EntityPreparer');

var Company = (function () {
    function Company(id, name, vatNumber, dateCreated) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(Company.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "VATNumber", {
        get: function () {
            return this.vatNumber;
        },
        enumerable: true,
        configurable: true
    });

    Company.prototype.toObject = function () {
        return Company.toObject(this);
    };

    Company.toObject = function (e) {
        return {
            id: e.id,
            name: e.name,
            vatNumber: e.vatNumber,
            dateCreated: e.dateCreated
        };
    };

    Company.fromObject = function (o) {
        return new Company(EntityPreparer.int(o.id), EntityPreparer.stringOrNull(o.name), EntityPreparer.stringOrNull(o.vatNumber), EntityPreparer.date(o.dateCreated));
    };

    Company.fromRow = function (r) {
        return new Company(EntityPreparer.int(r[Company.TABLE_NAME + '.' + Company.COLUMN_COMPANY_ID]), EntityPreparer.stringOrNull(r[Company.TABLE_NAME + '.' + Company.COLUMN_NAME]), EntityPreparer.stringOrNull(r[Company.TABLE_NAME + '.' + Company.COLUMN_VAT_NUMBER]), EntityPreparer.date(r[Company.TABLE_NAME + '.' + Company.COLUMN_DATE_CREATED]));
    };
    Company.TABLE_NAME = 'warehouse.company';
    Company.COLUMN_COMPANY_ID = 'companyid';
    Company.COLUMN_NAME = 'name';
    Company.COLUMN_VAT_NUMBER = 'vatnumber';
    Company.COLUMN_DATE_CREATED = 'datecreated';
    return Company;
})();
module.exports = Company;
