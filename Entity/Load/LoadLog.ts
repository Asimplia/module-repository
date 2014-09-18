
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = LoadLog;
class LoadLog implements IEntity {

	public static TABLE_NAME = 'loadlog';
	public static COLUMN_LOAD_LOG_ID = 'loadid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_DATELOADED = 'loaddate';
	public static COLUMN_RESULT = 'result';

	get Id() { return this.id; }
	get EShopId() { return this.eShopId; }
	get DateLoaded() { return this.dateLoaded; }
	get Result() { return this.result; }
	
	constructor(
		private id: number,
		private eShopId: number,
		private dateLoaded: Date,
		private result: number
	) {}

	static toObject(e: LoadLog) {
		return {
			id: e.id,
			eShopId: e.eShopId,
			dateLoaded: e.dateLoaded,
			result: e.result
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
			EntityPreparer.int(o.result)
		);
	}

	static fromRow(r: any) {
		return new LoadLog(
			EntityPreparer.int(r[LoadLog.COLUMN_LOAD_LOG_ID]),
			EntityPreparer.int(r[LoadLog.COLUMN_E_SHOP_ID]),
			EntityPreparer.date(r[LoadLog.COLUMN_DATELOADED]),
			EntityPreparer.int(r[LoadLog.COLUMN_RESULT])
		);
	}
}
