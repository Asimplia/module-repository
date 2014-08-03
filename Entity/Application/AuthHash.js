var moment = require('moment');

var AuthHash = (function () {
    function AuthHash(dateAuthenticated, authHash, sessionId) {
        this.dateAuthenticated = dateAuthenticated;
        this.authHash = authHash;
        this.sessionId = sessionId;
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
    Object.defineProperty(AuthHash.prototype, "SessionId", {
        get: function () {
            return this.sessionId;
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
            authHash: e.authHash,
            sessionId: e.sessionId
        };
    };

    AuthHash.fromObject = function (o) {
        return new AuthHash(moment(o.dateAuthenticated).toDate(), o.authHash, o.sessionId);
    };
    return AuthHash;
})();
module.exports = AuthHash;
