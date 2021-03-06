
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = EShop;
class EShop implements IEntity {

	public static TABLE_NAME = 'warehouse.eshop';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_COUNTRY_CODE = 'countryidiso';
	public static COLUMN_URL = 'eshopurl';
	public static COLUMN_NAME = 'eshopname';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private countryCode: string,
		private url: string,
		private name: string,
		private dateCreated: Date
	) {}

	toObject() {
		return EShop.toObject(this);
	}

	static toObject(e: EShop) {
		return {
			id: e.id,
			countryCode: e.countryCode,
			url: e.url,
			name: e.name,
			dateCreated: e.dateCreated
		};
	}

	static fromObject(o: any) {
		return new EShop(
			EntityPreparer.int(o.id),
			EntityPreparer.stringOrNull(o.countryCode),
			EntityPreparer.string(o.url),
			EntityPreparer.string(o.name),
			EntityPreparer.date(o.dateCreated)
		);
	}

	static fromRow(r: any) {
		return new EShop(
			EntityPreparer.int(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_E_SHOP_ID]),
			EntityPreparer.stringOrNull(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_COUNTRY_CODE]),
			EntityPreparer.string(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_URL]),
			EntityPreparer.string(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_NAME]),
			EntityPreparer.date(r[EShop.TABLE_NAME + '.' + EShop.COLUMN_DATE_CREATED])
		);
	}
}
