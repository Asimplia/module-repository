
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IHeurekaProductObject = require('./IHeurekaProductObject');
import EntityPreparer = require('../EntityPreparer');

export = HeurekaProduct;
class HeurekaProduct implements IIdentificableEntity {

	static TABLE_NAME = 'feed.heureka';
	static COLUMN_HEUREKA_PRODUCT_ID = 'heurekaid';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private feedLoadId: number,
		private eShopId: number,
		private externalId: string,
		private productName: string,
		private product: string,
		private description: string,
		private url: string,
		private imageUrl: string,
		private imageUrlAlternative: string,
		private videoUrl: string,
		private priceVat: number,
		private itemType: string,
		private manufacturer: string,
		private categoryText: string,
		private ean: string,
		private isbn: string,
		private heurekaCpc: number,
		private deliveryDate: string,
		private itemGroupId: string
	) {}

	static fromRow(row: any) {
		return HeurekaProduct.fromObject({
			id: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'id')],
			feedLoadId: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'feedLoadId')],
			eShopId: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'eShopId')],
			externalId: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'externalId')],
			productName: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'productName')],
			product: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'product')],
			description: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'description')],
			url: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'url')],
			imageUrl: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'imageUrl')],
			imageUrlAlternative: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'imageUrlAlternative')],
			videoUrl: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'videoUrl')],
			priceVat: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'priceVat')],
			itemType: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'itemType')],
			manufacturer: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'manufacturer')],
			categoryText: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'categoryText')],
			ean: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'ean')],
			isbn: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'isbn')],
			heurekaCpc: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'heurekaCpc')],
			deliveryDate: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'deliveryDate')],
			itemGroupId: row[EntityPreparer.getTableColumnByKey(HeurekaProduct, 'itemGroupId')]
		});
	}

	static fromObject(object: IHeurekaProductObject) {
		return new HeurekaProduct(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.stringOrNull(object.externalId),
			EntityPreparer.stringOrNull(object.productName),
			EntityPreparer.stringOrNull(object.product),
			EntityPreparer.stringOrNull(object.description),
			EntityPreparer.stringOrNull(object.url),
			EntityPreparer.stringOrNull(object.imageUrl),
			EntityPreparer.stringOrNull(object.imageUrlAlternative),
			EntityPreparer.stringOrNull(object.videoUrl),
			EntityPreparer.intOrNull(object.priceVat),
			EntityPreparer.stringOrNull(object.itemType),
			EntityPreparer.stringOrNull(object.manufacturer),
			EntityPreparer.stringOrNull(object.categoryText),
			EntityPreparer.stringOrNull(object.ean),
			EntityPreparer.stringOrNull(object.isbn),
			EntityPreparer.intOrNull(object.heurekaCpc),
			EntityPreparer.stringOrNull(object.deliveryDate),
			EntityPreparer.stringOrNull(object.itemGroupId)
		);
	}

	static toObject(entity: HeurekaProduct): IHeurekaProductObject {
		return {
			id: entity.id,
			feedLoadId: entity.feedLoadId,
			eShopId: entity.eShopId,
			externalId: entity.externalId,
			productName: entity.productName,
			product: entity.product,
			description: entity.description,
			url: entity.url,
			imageUrl: entity.imageUrl,
			imageUrlAlternative: entity.imageUrlAlternative,
			videoUrl: entity.videoUrl,
			priceVat: entity.priceVat,
			itemType: entity.itemType,
			manufacturer: entity.manufacturer,
			categoryText: entity.categoryText,
			ean: entity.ean,
			isbn: entity.isbn,
			heurekaCpc: entity.heurekaCpc,
			deliveryDate: entity.deliveryDate,
			itemGroupId: entity.itemGroupId
		};
	}

	toObject(): IHeurekaProductObject {
		return HeurekaProduct.toObject(this);
	}
	
}
