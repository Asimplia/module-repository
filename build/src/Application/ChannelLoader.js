var Channel = require('../Entity/Application/Channel');

var ChannelModel = require('../Definition/Application/ChannelModel');

var ChannelLoader = (function () {
    function ChannelLoader() {
        this.model = ChannelModel;
    }
    ChannelLoader.prototype.getById = function (eShopId, id, callback) {
        this.model.findOne({ "id": id, "eShopId": eShopId }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, Channel.fromObject(object));
        });
    };

    ChannelLoader.prototype.getCount = function (eShopId, callback) {
        this.model.count({ "eShopId": eShopId }, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    ChannelLoader.prototype.getMaxDateCreated = function (callback) {
        this.model.findOne({}).sort({ 'dateCreated': -1 }).exec(function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, object.dateCreated);
        });
    };
    return ChannelLoader;
})();
module.exports = ChannelLoader;
