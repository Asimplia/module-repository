
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

	static fromRow(row: any) {
		return FeedLoad.fromObject({
			id: row[EntityPreparer.getTableColumnByKey(FeedLoad, 'id')],
			eShopId: row[EntityPreparer.getTableColumnByKey(FeedLoad, 'eShopId')],
			dateLoad: row[EntityPreparer.getTableColumnByKey(FeedLoad, 'dateLoad')],
			feedCode: row[EntityPreparer.getTableColumnByKey(FeedLoad, 'feedCode')]
		});
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
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.date(object.dateLoad),
			EntityPreparer.string(object.feedCode)
		);
	}
}
