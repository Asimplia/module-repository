var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Channel = require('../Entity/Application/Channel');

var ChannelModel = require('../Definition/Application/ChannelModel');

var ChannelRecorder = (function (_super) {
    __extends(ChannelRecorder, _super);
    function ChannelRecorder() {
        _super.call(this);
        this.model = ChannelModel;
    }
    ChannelRecorder.prototype.insertOrUpdateList = function (channelList, callback) {
        var _this = this;
        channelList.createEach().on('item', function (channel, next) {
            _this.insertOrUpdate(channel, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, channelList);
        });
    };

    ChannelRecorder.prototype.insertOrUpdate = function (channel, callback) {
        var _this = this;
        this.model.findOne({ id: channel.Id, eShopId: channel.EShopId }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    channel.Id = id;
                    _this.update(doc, Channel.fromObject, channel, callback);
                });
                return;
            }
            _this.update(doc, Channel.fromObject, channel, callback);
        });
    };
    return ChannelRecorder;
})(AbstractRecorder);
module.exports = ChannelRecorder;
