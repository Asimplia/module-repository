
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = VisitRecord;
class VisitRecord implements IEntity {

	public static TABLE_NAME = 'googleanalytics';
	public static COLUMN_ID = 'gaid';
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
		private newUsers: number
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
			newUsers: entity.newUsers
		};
	}

	static fromObject(object: any) {
		return new VisitRecord(
			object.id,
			object.eShopId,
			object.query,
			object.dateChanged,
			object.source,
			object.medium,
			object.campaign,
			object.adContent,
			object.keyword,
			object.sessions,
			object.transactions,
			object.transactionRevenue,
			object.itemQuantity,
			object.bounces,
			object.newUsers
		);
	}

	static fromRow(row: any) {
		return new VisitRecord(
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ID],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_E_SHOP_ID],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_QUERY],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_DATE_CHANGED],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SOURCE],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_MEDIUM],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_CAMPAIGN],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_AD_CONTENT],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_KEYWORD],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SESSIONS],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTIONS],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTION_REVENUE],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ITEM_QUANTITY],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_BOUNCES],
			row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_NEW_USERS]
		);
	}
}
