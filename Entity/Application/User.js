var List = require('../List');
var Authenticate = require('./Authenticate');
var AuthTypeEnum = require('./AuthTypeEnum');
var AuthHash = require('./AuthHash');

var User = (function () {
    function User(id, firstName, lastName, authenticateList, authHashList, eShopId, companyId, email, phoneNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authenticateList = authenticateList;
        this.authHashList = authHashList;
        this.eShopId = eShopId;
        this.companyId = companyId;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    Object.defineProperty(User.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "FirstName", {
        get: function () {
            return this.firstName;
        },
        set: function (value) {
            this.firstName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "LastName", {
        get: function () {
            return this.lastName;
        },
        set: function (value) {
            this.lastName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "AuthenticateList", {
        get: function () {
            return this.authenticateList;
        },
        set: function (value) {
            this.authenticateList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "AuthHashList", {
        get: function () {
            return this.authHashList;
        },
        set: function (value) {
            this.authHashList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        set: function (value) {
            this.eShopId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "CompanyId", {
        get: function () {
            return this.companyId;
        },
        set: function (value) {
            this.companyId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Email", {
        get: function () {
            return this.email;
        },
        set: function (value) {
            this.email = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "PhoneNumber", {
        get: function () {
            return this.phoneNumber;
        },
        set: function (value) {
            this.phoneNumber = value;
        },
        enumerable: true,
        configurable: true
    });

    User.prototype.toObject = function () {
        return User.toObject(this);
    };

    User.toObject = function (e) {
        return {
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            authenticates: e.authenticateList.toArray(Authenticate.toObject),
            authHashes: e.authHashList.toArray(AuthHash.toObject),
            eShopId: e.eShopId,
            companyId: e.companyId,
            email: e.email,
            phoneNumber: e.phoneNumber
        };
    };

    User.prototype.toSafeObject = function () {
        var object = this.toObject();
        object.authenticates = null;
        object.authHashes = null;
        return object;
    };

    User.fromObject = function (o) {
        return new User(o.id, o.firstName, o.lastName, new List(o.authenticates, Authenticate.fromObject), new List(o.authHashes, AuthHash.fromObject), o.eShopId, o.companyId, o.email, o.phoneNumber);
    };

    User.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    User.prototype.getUsernameAuthenticate = function () {
        return this.authenticateList.findOneOnly(function (authenticate) {
            return authenticate.AuthType == 1 /* USERNAME */;
        });
    };

    User.prototype.getEmailAuthenticate = function () {
        return this.authenticateList.findOneOnly(function (authenticate) {
            return authenticate.AuthType == 0 /* EMAIL */;
        });
    };

    User.prototype.hasValidEmail = function () {
        return (new RegExp(User.EMAIL_PATTERN)).test(this.email);
    };
    User.EMAIL_PATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    return User;
})();
module.exports = User;
