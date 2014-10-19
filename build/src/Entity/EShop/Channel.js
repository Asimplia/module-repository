var EntityPreparer = require('../EntityPreparer');

var Channel = (function () {
    function Channel(id, eShopId, customerId, name, paidChannel, refferalOrganic, dateCreated) {
        this.id = id;
        this.eShopId = eShopId;
        this.customerId = customerId;
        this.name = name;
        this.paidChannel = paidChannel;
        this.refferalOrganic = refferalOrganic;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(Channel.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Channel.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        enumerable: true,
        configurable: true
    });

    Channel.fromRow = function (r) {
        return new Channel(EntityPreparer.int(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_CHANNEL_ID]), EntityPreparer.int(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_E_SHOP_ID]), EntityPreparer.int(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_CUSTOMER_ID]), EntityPreparer.string(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_NAME]), EntityPreparer.boolean(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_PAID_CHANNEL]), EntityPreparer.boolean(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_REFFERAL_ORGANIC]), EntityPreparer.date(r[Channel.TABLE_NAME + '.' + Channel.COLUMN_DATE_CREATED]));
    };

    Channel.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            customerId: entity.customerId,
            name: entity.name,
            paidChannel: entity.paidChannel,
            refferalOrganic: entity.refferalOrganic,
            dateCreated: entity.dateCreated
        };
    };

    Channel.prototype.toObject = function () {
        return Channel.toObject(this);
    };

    Channel.fromObject = function (object) {
        return new Channel(EntityPreparer.int(object.id), EntityPreparer.int(object.eShopId), EntityPreparer.int(object.customerId), EntityPreparer.string(object.name), EntityPreparer.boolean(object.paidChannel), EntityPreparer.boolean(object.refferalOrganic), EntityPreparer.date(object.dateCreated));
    };
    Channel.TABLE_NAME = 'warehouse.channel';
    Channel.COLUMN_CHANNEL_ID = 'channelid';
    Channel.COLUMN_E_SHOP_ID = 'eshopid';
    Channel.COLUMN_CUSTOMER_ID = 'customerid';
    Channel.COLUMN_NAME = 'channelname';
    Channel.COLUMN_PAID_CHANNEL = 'paidchannel';
    Channel.COLUMN_REFFERAL_ORGANIC = 'flagrefferalorganic';
    Channel.COLUMN_DATE_CREATED = 'datecreated';
    return Channel;
})();
module.exports = Channel;
