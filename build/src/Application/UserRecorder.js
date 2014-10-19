var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var User = require('../Entity/Application/User');

var UserModel = require('../Definition/Application/UserModel');

var UserRecorder = (function (_super) {
    __extends(UserRecorder, _super);
    function UserRecorder() {
        _super.call(this);
        this.model = UserModel;
    }
    UserRecorder.prototype.insertOrUpdate = function (user, callback) {
        var _this = this;
        this.model.findOne({ id: user.Id }, function (e, userDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!userDocument) {
                userDocument = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    user.Id = id;
                    _this.update(userDocument, User.fromObject, user, callback);
                });
                return;
            }
            _this.update(userDocument, User.fromObject, user, callback);
        });
    };
    return UserRecorder;
})(AbstractRecorder);
module.exports = UserRecorder;
