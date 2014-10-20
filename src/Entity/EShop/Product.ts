﻿
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = Product;
class Product implements IEntity {

	public static TABLE_NAME = 'warehouse.product';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_PRODUCT_ID = 'productid';
	public static COLUMN_NAME = 'productname';
	public static COLUMN_BASE_PRICE = 'baseprice';
	public static COLUMN_EAN = 'ean';
	public static COLUMN_DATE_CREATED = 'dateadded';

	get Id(): number { return this.id; }
	get Name(): string { return this.name; }
	get EShopId(): number { return this.eShopId; }

	constructor(
		private id: number,
		private eShopId: number,
		private name: string,
		private basePrice: number,
		private ean: string,
		private dateCreated: Date
	) { }

	static fromRow(r: any) {
		return new Product(
			EntityPreparer.int(r[Product.TABLE_NAME + '.' + Product.COLUMN_PRODUCT_ID]),
			EntityPreparer.int(r[Product.TABLE_NAME + '.' + Product.COLUMN_E_SHOP_ID]),
			EntityPreparer.stringOrNull(r[Product.TABLE_NAME + '.' + Product.COLUMN_NAME]),
			EntityPreparer.float(r[Product.TABLE_NAME + '.' + Product.COLUMN_BASE_PRICE]),
			EntityPreparer.stringOrNull(r[Product.TABLE_NAME + '.' + Product.COLUMN_EAN]),
			EntityPreparer.date(r[Product.TABLE_NAME + '.' + Product.COLUMN_DATE_CREATED])
		);
	}

	static toObject(entity: Product) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			name: entity.name,
			basePrice: entity.basePrice,
			ean: entity.ean,
			dateCreated: entity.dateCreated,
		};
	}

	toObject() {
		return Product.toObject(this);
	}

	static fromObject(object: any) {
		return new Product(
			EntityPreparer.int(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.stringOrNull(object.name),
			EntityPreparer.float(object.basePrice),
			EntityPreparer.stringOrNull(object.ean),
			EntityPreparer.date(object.dateCreated)
		);
	}

}