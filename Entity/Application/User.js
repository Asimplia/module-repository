var List = require('../List');
var Authenticate = require('./Authenticate');
var AuthHash = require('./AuthHash');

var User = (function () {
    function User(id, firstName, lastName, authenticateList, authHashList, eShopId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authenticateList = authenticateList;
        this.authHashList = authHashList;
        this.eShopId = eShopId;
    }
    Object.defineProperty(User.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "FirstName", {
        get: function () {
            return this.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "LastName", {
        get: function () {
            return this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "AuthenticateList", {
        get: function () {
            return this.authenticateList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "AuthHashList", {
        get: function () {
            return this.authHashList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
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
            eShopId: e.eShopId
        };
    };

    User.fromObject = function (o) {
        return new User(o.id, o.firstName, o.lastName, new List(o.authenticates, Authenticate.fromObject), new List(o.authHashes, AuthHash.fromObject), o.eShopId);
    };

    User.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    return User;
})();
module.exports = User;
