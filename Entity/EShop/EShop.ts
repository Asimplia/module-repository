
import IEntity = require('../IEntity');

export = EShop;
class EShop implements IEntity {

	public static TABLE_NAME = 'eshop';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_COUNTRY_CODE = 'countryidiso';
	public static COLUMN_OWNER = 'eshopowner';
	public static COLUMN_URL = 'eshopurl';
	public static COLUMN_NAME = 'eshopname';

	constructor(
		private id: number,
		private countryCode: string,
		private owner: string,
		private url: string,
		private name: string
	) {}

	toObject() {
		return EShop.toObject(this);
	}

	static toObject(e: EShop) {
		return {
			id: e.id,
			countryCode: e.countryCode,
			owner: e.owner,
			url: e.url,
			name: e.name
		};
	}

	static fromObject(o: any) {
		return new EShop(
			parseInt(o.id),
			o.countryCode,
			o.owner,
			o.url,
			o.name
		);
	}

	static fromRow(r: any) {
		return new EShop(
			r[EShop.COLUMN_E_SHOP_ID],
			r[EShop.COLUMN_COUNTRY_CODE],
			r[EShop.COLUMN_OWNER],
			r[EShop.COLUMN_URL],
			r[EShop.COLUMN_NAME]
		);
	}
}
