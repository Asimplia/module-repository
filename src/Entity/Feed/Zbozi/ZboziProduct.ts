
import IIdentificableEntity = require('../../Common/IIdentificableEntity');
import IZboziProductObject = require('./IZboziProductObject');
import EntityPreparer = require('../../EntityPreparer');

export = ZboziProduct;
class ZboziProduct {
	
	static TABLE_NAME = 'feed.zbozi';
	static COLUMN_ZBOZI_PRODUCT_ID = 'zboziid';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_E_SHOP_ID = 'eshopid';
	static COLUMN_PRODUCT = 'product';
	static COLUMN_PRODUCT_NAME = 'productname';
	static COLUMN_DESCRIPTION = 'description';
	static COLUMN_URL = 'url';
	static COLUMN_IMAGE_URL = 'imgurl';
	static COLUMN_PRICE = 'price';
	static COLUMN_VAT = 'vat';
	static COLUMN_PRICE_VAT = 'price_vat';
	static COLUMN_MAX_CPC = 'max_cpc';
	static COLUMN_MAX_CPCP_SEARCH = 'max_cpc_search';
	static COLUMN_DUES = 'dues';
	static COLUMN_DELIVERY_DATE = 'delivery_date';
	static COLUMN_SHOP_DEPOTS = 'shop_depots';
	static COLUMN_UNFEATURED = 'unfeatured';
	static COLUMN_ITEM_TYPE = 'item_type';
	static COLUMN_EXTRA_MESSAGE = 'extra_message';
	static COLUMN_MANUFACTURER = 'manufacturer';
	static COLUMN_CATEGORY_TEXT = 'categorytext';
	static COLUMN_EAN = 'ean';
	static COLUMN_PRODUCT_NUMBER = 'productno';
	static COLUMN_VARIANT_NAME = 'productnameext';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private feedLoadId: number,
		private eShopId: number,
		private product: string,
		private productName: string,
		private description: string,
		private url: string,
		private imageUrl: string,
		private price: number,
		private vat: number,
		private priceVat: number,
		private maxCpc: number,
		private maxCpcSearch: number,
		private dues: number,
		private deliveryDate: string,
		private shopDepots: string,
		private unfeatured: boolean,
		private itemType: string,
		private extraMessage: string,
		private manufacturer: string,
		private categoryText: string,
		private ean: string,
		private productNumber: string,
		private variantName: string
	) {}

	static fromRow(row: any) {
		return EntityPreparer.fromRow<ZboziProduct>(ZboziProduct, row);
	}

	static fromObject(object: IZboziProductObject) {
		return new ZboziProduct(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.stringOrNull(object.product),
			EntityPreparer.stringOrNull(object.productName),
			EntityPreparer.stringOrNull(object.description),
			EntityPreparer.stringOrNull(object.url),
			EntityPreparer.stringOrNull(object.imageUrl),
			EntityPreparer.floatOrNull(object.price),
			EntityPreparer.floatOrNull(object.vat),
			EntityPreparer.floatOrNull(object.priceVat),
			EntityPreparer.floatOrNull(object.maxCpc),
			EntityPreparer.floatOrNull(object.maxCpcSearch),
			EntityPreparer.floatOrNull(object.dues),
			EntityPreparer.stringOrNull(object.deliveryDate),
			EntityPreparer.stringOrNull(object.shopDepots),
			EntityPreparer.booleanOrNull(object.unfeatured),
			EntityPreparer.stringOrNull(object.itemType),
			EntityPreparer.stringOrNull(object.extraMessage),
			EntityPreparer.stringOrNull(object.manufacturer),
			EntityPreparer.stringOrNull(object.categoryText),
			EntityPreparer.stringOrNull(object.ean),
			EntityPreparer.stringOrNull(object.productNumber),
			EntityPreparer.stringOrNull(object.variantName)
		);
	}

	static toObject(entity: ZboziProduct): IZboziProductObject {
		return EntityPreparer.tableEntityToObject(ZboziProduct, entity);
	}

	toObject(): IZboziProductObject {
		return ZboziProduct.toObject(this);
	}
}
