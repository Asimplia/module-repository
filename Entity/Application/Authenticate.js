var AuthTypeEnum = require('./AuthTypeEnum');

var Authenticate = (function () {
    function Authenticate(identity, verification, authType, salt) {
        this.identity = identity;
        this.verification = verification;
        this.authType = authType;
        this.salt = salt;
    }
    Object.defineProperty(Authenticate.prototype, "Identity", {
        get: function () {
            return this.identity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authenticate.prototype, "Verification", {
        get: function () {
            return this.verification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authenticate.prototype, "AuthType", {
        get: function () {
            return this.authType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authenticate.prototype, "Salt", {
        get: function () {
            return this.salt;
        },
        enumerable: true,
        configurable: true
    });

    Authenticate.prototype.toObject = function () {
        return Authenticate.toObject(this);
    };

    Authenticate.toObject = function (e) {
        return {
            identity: e.identity,
            verification: e.verification,
            authType: AuthTypeEnum[e.authType],
            salt: e.salt
        };
    };

    Authenticate.fromObject = function (o) {
        return new Authenticate(o.identity, o.verification, Authenticate.createAuthTypeEnum(o.authType), o.salt);
    };

    Authenticate.createAuthTypeEnum = function (authType) {
        switch (authType) {
            case AuthTypeEnum[0 /* EMAIL */]:
                return 0 /* EMAIL */;
            case AuthTypeEnum[1 /* USERNAME */]:
                return 1 /* USERNAME */;
            default:
                return null;
        }
    };
    return Authenticate;
})();
module.exports = Authenticate;