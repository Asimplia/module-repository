
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = VisitRecord;
class VisitRecord implements IEntity {

	public static TABLE_NAME = 'warehouse.googleanalytics';
	public static COLUMN_VISIT_RECORD_ID = 'gaid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_QUERY = 'gaquery';
	public static COLUMN_DATE_CHANGED = 'datechanged';
	public static COLUMN_SOURCE = 'source';
	public static COLUMN_MEDIUM = 'medium';
	public static COLUMN_CAMPAIGN = 'campaign';
	public static COLUMN_AD_CONTENT = 'adcontent';
	public static COLUMN_KEYWORD = 'keyword';
	public static COLUMN_SESSIONS = 'sessions';
	public static COLUMN_TRANSACTIONS = 'transactions';
	public static COLUMN_TRANSACTION_REVENUE = 'transactionrevenue';
	public static COLUMN_ITEM_QUANTITY = 'itemquantity';
	public static COLUMN_BOUNCES = 'bounces';
	public static COLUMN_NEW_USERS = 'newusers';
	public static COLUMN_LANDING_PAGE_PATH = 'landingpagepath';
	public static COLUMN_COUNTRY = 'country';
	
	constructor(
		private id: number,
		private eShopId: number,
		private query: string,
		private dateChanged: Date,
		private source: string,
		private medium: string,
		private campaign: string,
		private adContent: string,
		private keyword: string,
		private sessions: number,
		private transactions: number,
		private transactionRevenue: number,
		private itemQuantity: number,
		private bounces: number,
		private newUsers: number,
		private landingPagePath: string,
		private country: string
	) { }

	toObject() {
		return VisitRecord.toObject(this);
	}

	static toObject(entity: VisitRecord) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			query: entity.query,
			dateChanged: entity.dateChanged,
			source: entity.source,
			medium: entity.medium,
			campaign: entity.campaign,
			adContent: entity.adContent,
			keyword: entity.keyword,
			sessions: entity.sessions,
			transactions: entity.transactions,
			transactionRevenue: entity.transactionRevenue,
			itemQuantity: entity.itemQuantity,
			bounces: entity.bounces,
			newUsers: entity.newUsers,
			landingPagePath: entity.landingPagePath,
			country: entity.country
		};
	}

	static fromObject(object: any) {
		return new VisitRecord(
			EntityPreparer.intOrNull(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.string(object.query),
			EntityPreparer.date(object.dateChanged),
			EntityPreparer.stringOrNull(object.source),
			EntityPreparer.stringOrNull(object.medium),
			EntityPreparer.stringOrNull(object.campaign),
			EntityPreparer.stringOrNull(object.adContent),
			EntityPreparer.stringOrNull(object.keyword),
			EntityPreparer.intOrNull(object.sessions),
			EntityPreparer.floatOrNull(object.transactions),
			EntityPreparer.floatOrNull(object.transactionRevenue),
			EntityPreparer.intOrNull(object.itemQuantity),
			EntityPreparer.intOrNull(object.bounces),
			EntityPreparer.intOrNull(object.newUsers),
			EntityPreparer.stringOrNull(object.landingPagePath),
			EntityPreparer.stringOrNull(object.country)
		);
	}

	static fromRow(row: any) {
		return new VisitRecord(
			EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_VISIT_RECORD_ID]),
			EntityPreparer.int(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_E_SHOP_ID]),
			EntityPreparer.string(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_QUERY]),
			EntityPreparer.date(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_DATE_CHANGED]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SOURCE]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_MEDIUM]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_CAMPAIGN]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_AD_CONTENT]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_KEYWORD]),
			EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SESSIONS]),
			EntityPreparer.floatOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTIONS]),
			EntityPreparer.floatOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTION_REVENUE]),
			EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ITEM_QUANTITY]),
			EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_BOUNCES]),
			EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_NEW_USERS]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_LANDING_PAGE_PATH]),
			EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_COUNTRY])
		);
	}
}
