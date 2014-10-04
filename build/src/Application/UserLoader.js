var User = require('../Entity/Application/User');
var AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
var UserModel = require('./UserModel');

var UserLoader = (function () {
    function UserLoader() {
        this.model = UserModel;
    }
    UserLoader.prototype.getByCredentials = function (identity, authType, callback) {
        this.model.findOne({ "authenticates.identity": identity, "authenticates.authType": AuthTypeEnum[authType] }, function (e, userObject) {
            if (e) {
                callback(e);
                return;
            }
            if (!userObject) {
                callback(null, null);
                return;
            }
            callback(null, User.fromObject(userObject));
        });
    };

    UserLoader.prototype.getActiveBySessionId = function (sessionId, callback) {
        this.model.findOne({ "authHashes.sessionId": sessionId, "authHashes.active": true }, function (e, userObject) {
            if (e) {
                callback(e);
                return;
            }
            if (!userObject) {
                callback(null, null);
                return;
            }
            callback(null, User.fromObject(userObject));
        });
    };

    UserLoader.prototype.getActiveByAuthHash = function (authHash, callback) {
        this.model.findOne({ "authHashes.authHash": authHash, "authHashes.active": true }, function (e, userObject) {
            if (e) {
                callback(e);
                return;
            }
            if (!userObject) {
                callback(null, null);
                return;
            }
            callback(null, User.fromObject(userObject));
        });
    };

    UserLoader.prototype.getCount = function (callback) {
        this.model.count({}, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };
    return UserLoader;
})();
module.exports = UserLoader;
