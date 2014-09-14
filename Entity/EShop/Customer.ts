
import IEntity = require('../IEntity');

export = Customer;
class Customer implements IEntity {

	public static TABLE_NAME = 'customer';
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

	constructor(
		private id: number,
		private eShopId: number,
		private firtname: string,
		private lastname: string,
		private email: string,
		private gender: string,
		private birthday: Date,
		private anonymous: boolean,
		private dateCreated: Date
	) { }

	static fromRow(r: any) {
		return new Customer(
			parseInt(r[Customer.COLUMN_CUSTOMER_ID]),
			parseInt(r[Customer.COLUMN_E_SHOP_ID]),
			r[Customer.COLUMN_FIRSTNAME],
			r[Customer.COLUMN_LASTNAME],
			r[Customer.COLUMN_EMAIL],
			r[Customer.COLUMN_GENDER],
			r[Customer.COLUMN_BIRTHDAY] ? moment(r[Customer.COLUMN_BIRTHDAY]).toDate() : null,
			!!r[Customer.COLUMN_ANONYMOUS],
			r[Customer.COLUMN_DATE_CREATED] ? moment(r[Customer.COLUMN_DATE_CREATED]).toDate() : null
		);
	}

	static toObject(entity: Customer) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			firstname: entity.firtname,
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

}
