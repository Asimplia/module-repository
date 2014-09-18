var EntityPreparer = require('../EntityPreparer');

var Channel = (function () {
    function Channel(id, eShopId, customerId, name, paidChannel, refferalOrganic) {
        this.id = id;
        this.eShopId = eShopId;
        this.customerId = customerId;
        this.name = name;
        this.paidChannel = paidChannel;
        this.refferalOrganic = refferalOrganic;
    }
    Object.defineProperty(Channel.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });

    Channel.fromRow = function (r) {
        return new Channel(EntityPreparer.int(r[Channel.COLUMN_CHANNEL_ID]), EntityPreparer.int(r[Channel.COLUMN_E_SHOP_ID]), EntityPreparer.int(r[Channel.COLUMN_CUSTOMER_ID]), EntityPreparer.string(r[Channel.COLUMN_NAME]), EntityPreparer.boolean(r[Channel.COLUMN_PAID_CHANNEL]), EntityPreparer.boolean(r[Channel.COLUMN_REFFERAL_ORGANIC]));
    };

    Channel.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            customerId: entity.customerId,
            name: entity.name,
            paidChannel: entity.paidChannel,
            refferalOrganic: entity.refferalOrganic
        };
    };

    Channel.prototype.toObject = function () {
        return Channel.toObject(this);
    };
    Channel.TABLE_NAME = 'channel';
    Channel.COLUMN_CHANNEL_ID = 'channelid';
    Channel.COLUMN_E_SHOP_ID = 'eshopid';
    Channel.COLUMN_CUSTOMER_ID = 'customerid';
    Channel.COLUMN_NAME = 'channelname';
    Channel.COLUMN_PAID_CHANNEL = 'paidchannel';
    Channel.COLUMN_REFFERAL_ORGANIC = 'flagrefferalorganic';
    return Channel;
})();
module.exports = Channel;
