
import IEntity = require('../IEntity');

export = Product;
class Product implements IEntity {

	public static TABLE_NAME = 'product';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_PRODUCT_ID = 'productid';
	public static COLUMN_NAME = 'productname';
	public static COLUMN_FIX_PRICE = 'fixprice';
	public static COLUMN_IN_SHOP = 'flaginshop';

	get Id(): number { return this.id; }
	get Name(): string { return this.name; }

	constructor(
		private id: number,
		private eShopId: number,
		private name: string,
		private fixPrice: number,
		private inEshop: boolean
		) { }

	static fromRow(r: any) {
		return new Product(
			r[Product.COLUMN_PRODUCT_ID],
			r[Product.COLUMN_E_SHOP_ID],
			r[Product.COLUMN_NAME],
			r[Product.COLUMN_FIX_PRICE],
			r[Product.COLUMN_IN_SHOP]
		);
	}

	static toObject(entity: Product) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			name: entity.name,
			fixPrice: entity.fixPrice,
			inEshop: entity.inEshop
		};
	}

	toObject() {
		return Product.toObject(this);
	}

}
