
import IEntity = require('../IEntity');

export = Product;
class Product implements IEntity {

	public static TABLE_NAME = 'product';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_PRODUCT_ID = 'productid';
	public static COLUMN_NAME = 'productname';
	public static COLUMN_BASE_PRICE = 'baseprice';
	public static COLUMN_EAN = 'ean';

	get Id(): number { return this.id; }
	get Name(): string { return this.name; }

	constructor(
		private id: number,
		private eShopId: number,
		private name: string,
		private basePrice: number,
		private ean: string
		) { }

	static fromRow(r: any) {
		return new Product(
			parseInt(r[Product.COLUMN_PRODUCT_ID]),
			parseInt(r[Product.COLUMN_E_SHOP_ID]),
			r[Product.COLUMN_NAME],
			parseInt(r[Product.COLUMN_BASE_PRICE]),
			r[Product.COLUMN_EAN]
		);
	}

	static toObject(entity: Product) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			name: entity.name,
			basePrice: entity.basePrice,
			ean: entity.ean
		};
	}

	toObject() {
		return Product.toObject(this);
	}

}
