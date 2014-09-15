var moment = require('moment');

var AuthHash = (function () {
    function AuthHash(dateAuthenticated, authHash, sessionId, active) {
        this.dateAuthenticated = dateAuthenticated;
        this.authHash = authHash;
        this.sessionId = sessionId;
        this.active = active;
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
    Object.defineProperty(AuthHash.prototype, "Active", {
        get: function () {
            return this.active;
        },
        set: function (value) {
            this.active = value;
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
            sessionId: e.sessionId,
            active: e.active
        };
    };

    AuthHash.fromObject = function (o) {
        return new AuthHash(moment(o.dateAuthenticated).toDate(), o.authHash, o.sessionId, !!o.active);
    };
    return AuthHash;
})();
module.exports = AuthHash;
