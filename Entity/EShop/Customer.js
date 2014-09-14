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
        return new Customer(parseInt(r[Customer.COLUMN_CUSTOMER_ID]), parseInt(r[Customer.COLUMN_E_SHOP_ID]), r[Customer.COLUMN_FIRSTNAME], r[Customer.COLUMN_LASTNAME], r[Customer.COLUMN_EMAIL], r[Customer.COLUMN_GENDER], r[Customer.COLUMN_BIRTHDAY] ? moment(r[Customer.COLUMN_BIRTHDAY]).toDate() : null, !!r[Customer.COLUMN_ANONYMOUS], r[Customer.COLUMN_DATE_CREATED] ? moment(r[Customer.COLUMN_DATE_CREATED]).toDate() : null);
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
    Customer.TABLE_NAME = 'customer';
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
