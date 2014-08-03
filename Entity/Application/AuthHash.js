var moment = require('moment');

var AuthHash = (function () {
    function AuthHash(dateAuthenticated, authHash) {
        this.dateAuthenticated = dateAuthenticated;
        this.authHash = authHash;
    }
    Object.defineProperty(AuthHash.prototype, "DateAuthenticated", {
        get: function () {
            return this.dateAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthHash.prototype, "AuthHash", {
        get: function () {
            return this.authHash;
        },
        enumerable: true,
        configurable: true
    });

    AuthHash.prototype.toObject = function () {
        return AuthHash.toObject(this);
    };

    AuthHash.toObject = function (e) {
        return {
            dateAuthenticated: e.dateAuthenticated,
            authHash: e.authHash
        };
    };

    AuthHash.fromObject = function (o) {
        return new AuthHash(moment(o.dateAuthenticated).toDate(), o.authHash);
    };
    return AuthHash;
})();
module.exports = AuthHash;
