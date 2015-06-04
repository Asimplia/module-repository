
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = LoadLog;
class LoadLog implements IEntity {

	public static TABLE_NAME = 'warehouse.loadlog';
	public static COLUMN_LOAD_LOG_ID = 'loadid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_DATELOADED = 'period';
	public static COLUMN_CHECKLIST_PROCESSED_AT = 'checklistprocessedat';

	get Id() { return this.id; }
	get EShopId() { return this.eShopId; }
	get DateLoaded() { return this.dateLoaded; }
	get ChecklistProcessedAt() { return this.checklistProcessedAt; }

	constructor(
		private id: number,
		private eShopId: number,
		private dateLoaded: Date,
		private checklistProcessedAt: Date
	) {}

	static toObject(e: LoadLog) {
		return {
			id: e.id,
			eShopId: e.eShopId,
			dateLoaded: e.dateLoaded,
			checklistProcessedAt: e.checklistProcessedAt
		};
	}

	toObject() {
		return LoadLog.toObject(this);
	}

	static fromObject(o: any) {
		return new LoadLog(
			EntityPreparer.int(o.id),
			EntityPreparer.int(o.eShopId),
			EntityPreparer.date(o.dateLoaded),
			EntityPreparer.dateOrNull(o.checklistProcessedAt)
		);
	}

	static fromRow(r: any) {
		return new LoadLog(
			EntityPreparer.int(r[LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_LOAD_LOG_ID]),
			EntityPreparer.int(r[LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_E_SHOP_ID]),
			EntityPreparer.date(r[LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_DATELOADED]),
			EntityPreparer.dateOrNull(r[LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_CHECKLIST_PROCESSED_AT])
		);
	}
}
