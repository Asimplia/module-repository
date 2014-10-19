
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = Company;
class Company implements IEntity {

	public static TABLE_NAME = 'warehouse.company';
	public static COLUMN_COMPANY_ID = 'companyid';
	public static COLUMN_NAME = 'name';
	public static COLUMN_VAT_NUMBER = 'vatnumber';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Id() { return this.id; }
	get Name() { return this.name; }
	get VATNumber() { return this.vatNumber; }

	constructor(
		private id: number,
		private name: string,
		private vatNumber: string,
		private dateCreated: Date
	) {}

	toObject() {
		return Company.toObject(this);
	}

	static toObject(e: Company) {
		return {
			id: e.id,
			name: e.name,
			vatNumber: e.vatNumber,
			dateCreated: e.dateCreated
		};
	}

	static fromObject(o: any) {
		return new Company(
			EntityPreparer.int(o.id),
			EntityPreparer.stringOrNull(o.name),
			EntityPreparer.stringOrNull(o.vatNumber),
			EntityPreparer.date(o.dateCreated)
		);
	}

	static fromRow(r: any) {
		return new Company(
			EntityPreparer.int(r[Company.TABLE_NAME + '.' + Company.COLUMN_COMPANY_ID]),
			EntityPreparer.stringOrNull(r[Company.TABLE_NAME + '.' + Company.COLUMN_NAME]),
			EntityPreparer.stringOrNull(r[Company.TABLE_NAME + '.' + Company.COLUMN_VAT_NUMBER]),
			EntityPreparer.date(r[Company.TABLE_NAME + '.' + Company.COLUMN_DATE_CREATED])
		);
	}
}
