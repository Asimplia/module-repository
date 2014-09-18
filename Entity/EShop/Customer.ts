﻿
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

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
			EntityPreparer.int(r[Customer.COLUMN_CUSTOMER_ID]),
			EntityPreparer.int(r[Customer.COLUMN_E_SHOP_ID]),
			EntityPreparer.stringOrNull(r[Customer.COLUMN_FIRSTNAME]),
			EntityPreparer.stringOrNull(r[Customer.COLUMN_LASTNAME]),
			EntityPreparer.stringOrNull(r[Customer.COLUMN_EMAIL]),
			EntityPreparer.stringOrNull(r[Customer.COLUMN_GENDER]),
			EntityPreparer.dateOrNull(r[Customer.COLUMN_BIRTHDAY]),
			EntityPreparer.boolean(r[Customer.COLUMN_ANONYMOUS]),
			EntityPreparer.dateOrNull(r[Customer.COLUMN_DATE_CREATED])
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
