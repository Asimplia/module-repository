
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = Customer;
class Customer implements IEntity {

	public static TABLE_NAME = 'warehouse.customer';
	public static COLUMN_CUSTOMER_ID = 'customerid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_FIRSTNAME = 'firstname';
	public static COLUMN_LASTNAME = 'lastname';
	public static COLUMN_EMAIL = 'email';
	public static COLUMN_GENDER = 'gender';
	public static COLUMN_BIRTHDAY = 'birthday';
	public static COLUMN_ANONYMOUS = 'flaganonymous';
	public static COLUMN_DATE_CREATED = 'dateadded';

	get Id(): number { return this.id; }
	get EShopId(): number { return this.eShopId; }
	get Name(): string { return this.firstname + ' ' + this.lastname; }

	constructor(
		private id: number,
		private eShopId: number,
		private firstname: string,
		private lastname: string,
		private email: string,
		private gender: string,
		private birthday: Date,
		private anonymous: boolean,
		private dateCreated: Date
	) { }

	static fromRow(r: any) {
		return new Customer(
			EntityPreparer.int(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_CUSTOMER_ID]),
			EntityPreparer.int(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_E_SHOP_ID]),
			EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_FIRSTNAME]),
			EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_LASTNAME]),
			EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_EMAIL]),
			EntityPreparer.stringOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_GENDER]),
			EntityPreparer.dateOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_BIRTHDAY]),
			EntityPreparer.boolean(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_ANONYMOUS]),
			EntityPreparer.dateOrNull(r[Customer.TABLE_NAME + '.' + Customer.COLUMN_DATE_CREATED])
		);
	}

	static toObject(entity: Customer) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			firstname: entity.firstname,
			lastname: entity.lastname,
			email: entity.email,
			gender: entity.gender,
			birthday: entity.birthday,
			anonymous: entity.anonymous,
			dateCreated: entity.dateCreated
		};
	}

	toObject() {
		return Customer.toObject(this);
	}

	static fromObject(object: any) {
		return new Customer(
			EntityPreparer.int(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.stringOrNull(object.firstname),
			EntityPreparer.stringOrNull(object.lastname),
			EntityPreparer.stringOrNull(object.email),
			EntityPreparer.stringOrNull(object.gender),
			EntityPreparer.dateOrNull(object.birthday),
			EntityPreparer.boolean(object.anonymous),
			EntityPreparer.dateOrNull(object.dateCreated)
		);
	}

}
