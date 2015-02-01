
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IFeedLoadObject = require('./IFeedLoadObject');
import EntityPreparer = require('../EntityPreparer');

export = FeedLoad;
class FeedLoad implements IIdentificableEntity {

	static TABLE_NAME = 'feed.feedload';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_E_SHOP_ID = 'eshopid';
	static COLUMN_DATE_LOAD = 'loaddate';
	static COLUMN_FEED_CODE = 'feedcode';
	
	get Id() { return this.id; }

	constructor(
		private id: number,
		private eShopId: number,
		private dateLoad: Date,
		private feedCode: string
	) {}

	toObject(): IFeedLoadObject {
		return FeedLoad.toObject(this);
	}

	static toObject(entity: FeedLoad): IFeedLoadObject {
		return {
			id: EntityPreparer.idNumeric(entity.id),
			eShopId: EntityPreparer.int(entity.eShopId),
			dateLoad: EntityPreparer.date(entity.dateLoad),
			feedCode: EntityPreparer.string(entity.feedCode)
		};
	}

	static fromObject(object: IFeedLoadObject) {
		return new FeedLoad(
			object.id,
			object.eShopId,
			object.dateLoad,
			object.feedCode
		);
	}
}
