
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = OrderProcessRecord;
class OrderProcessRecord implements IEntity {

	public static TABLE_NAME = 'warehouse.googleanalytics';
	public static COLUMN_ORDER_PROCESS_RECORD_ID = 'gaid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_QUERY = 'gaquery';
	public static COLUMN_DATE_CHANGED = 'datechanged';
	public static COLUMN_SOURCE = 'source';
	public static COLUMN_MEDIUM = 'medium';
	public static COLUMN_CAMPAIGN = 'campaign';
	public static COLUMN_PAGE_PATH = 'pagepath';
	public static COLUMN_PAGE_VIEWS = 'pageviews';
	public static COLUMN_UNIQUE_PAGE_VIEWS = 'uniquepageviews';
	
	constructor(
		private id: number,
		private eShopId: number,
		private query: string,
		private dateChanged: Date,
		private source: string,
		private medium: string,
		private campaign: string,
		private pagePath: number,
		private pageViews: number,
		private uniquePageViews: number
	) { }

	toObject() {
		return OrderProcessRecord.toObject(this);
	}

	static toObject(entity: OrderProcessRecord) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			query: entity.query,
			dateChanged: entity.dateChanged,
			source: entity.source,
			medium: entity.medium,
			campaign: entity.campaign,
			pagePath: entity.pagePath,
			pageViews: entity.pageViews,
			uniquePageViews: entity.uniquePageViews
		};
	}

	static fromObject(object: any) {
		return new OrderProcessRecord(
			EntityPreparer.intOrNull(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.string(object.query),
			EntityPreparer.date(object.dateChanged),
			EntityPreparer.stringOrNull(object.source),
			EntityPreparer.stringOrNull(object.medium),
			EntityPreparer.stringOrNull(object.campaign),
			EntityPreparer.intOrNull(object.pagePath),
			EntityPreparer.intOrNull(object.pageViews),
			EntityPreparer.intOrNull(object.uniquePageViews)
		);
	}

	static fromRow(row: any) {
		return new OrderProcessRecord(
			EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID]),
			EntityPreparer.int(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_E_SHOP_ID]),
			EntityPreparer.string(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_QUERY]),
			EntityPreparer.date(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_DATE_CHANGED]),
			EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_SOURCE]),
			EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_MEDIUM]),
			EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_CAMPAIGN]),
			EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_PAGE_PATH]),
			EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_PAGE_VIEWS]),
			EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_UNIQUE_PAGE_VIEWS])
		);
	}
}
