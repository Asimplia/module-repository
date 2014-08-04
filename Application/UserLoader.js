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

    UserLoader.prototype.getBySessionId = function (sessionId, callback) {
        this.model.findOne({ "authHashes.sessionId": sessionId }, function (e, userObject) {
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

    UserLoader.prototype.getByAuthHash = function (authHash, callback) {
        this.model.findOne({ "authHashes.authHash": authHash }, function (e, userObject) {
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
    return UserLoader;
})();
module.exports = UserLoader;
