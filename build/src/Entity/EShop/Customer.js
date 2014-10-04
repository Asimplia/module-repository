var EntityPreparer = require('../EntityPreparer');

var Customer = (function () {
    function Customer(id, eShopId, firtname, lastname, email, gender, birthday, anonymous, dateCreated) {
        this.id = id;
        this.eShopId = eShopId;
        this.firtname = firtname;
        this.lastname = lastname;
        this.email = email;
        this.gender = gender;
        this.birthday = birthday;
        this.anonymous = anonymous;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(Customer.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });

    Customer.fromRow = function (r) {
        return new Customer(EntityPreparer.int(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID]), EntityPreparer.int(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID]), EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_FIRSTNAME]), EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_LASTNAME]), EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_EMAIL]), EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_GENDER]), EntityPreparer.dateOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_BIRTHDAY]), EntityPreparer.boolean(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_ANONYMOUS]), EntityPreparer.dateOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_DATE_CREATED]));
    };

    Customer.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            firstname: entity.firtname,
            lastname: entity.lastname,
            email: entity.email,
            gender: entity.gender,
            birthday: entity.birthday,
            anonymous: entity.anonymous,
            dateCreated: entity.dateCreated
        };
    };

    Customer.prototype.toObject = function () {
        return Customer.toObject(this);
    };
    Customer.TABLE_NAME = 'warehouse.customer';
    Customer.COLUMN_CUSTOMER_ID = 'customerid';
    Customer.COLUMN_E_SHOP_ID = 'eshopid';
    Customer.COLUMN_FIRSTNAME = 'firstname';
    Customer.COLUMN_LASTNAME = 'lastname';
    Customer.COLUMN_EMAIL = 'email';
    Customer.COLUMN_GENDER = 'gender';
    Customer.COLUMN_BIRTHDAY = 'birthday';
    Customer.COLUMN_ANONYMOUS = 'flaganonymous';
    Customer.COLUMN_DATE_CREATED = 'dateadded';
    return Customer;
})();
module.exports = Customer;
