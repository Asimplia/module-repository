var Channel = require('../Entity/Application/Channel');
var List = require('../Entity/List');

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

    ChannelLoader.prototype.searchList = function (eShopId, query, filter, callback) {
        this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } }).limit(filter.limit).skip(filter.offset).exec(function (e, objects) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, new List(objects, Channel.fromObject));
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
