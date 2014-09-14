
import IEntity = require('../IEntity');

export = Channel;
class Channel implements IEntity {

	public static TABLE_NAME = 'channel';
	public static COLUMN_CHANNEL_ID = 'channelid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_CUSTOMER_ID = 'customerid';
	public static COLUMN_NAME = 'channelname';
	public static COLUMN_PAID_CHANNEL = 'paidchannel';
	public static COLUMN_REFFERAL_ORGANIC = 'flagrefferalorganic';

	get Id(): number { return this.id; }

	constructor(
		private id: number,
		private eShopId: number,
		private customerId: number,
		private name: string,
		private paidChannel: boolean,
		private refferalOrganic: boolean
	) { }

	static fromRow(r: any) {
		return new Channel(
			parseInt(r[Channel.COLUMN_CHANNEL_ID]),
			parseInt(r[Channel.COLUMN_E_SHOP_ID]),
			parseInt(r[Channel.COLUMN_CUSTOMER_ID]),
			r[Channel.COLUMN_NAME],
			!!r[Channel.COLUMN_PAID_CHANNEL],
			!!r[Channel.COLUMN_REFFERAL_ORGANIC]
		);
	}

	static toObject(entity: Channel) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			customerId: entity.customerId,
			name: entity.name,
			paidChannel: entity.paidChannel,
			refferalOrganic: entity.refferalOrganic
		};
	}

	toObject() {
		return Channel.toObject(this);
	}

}
