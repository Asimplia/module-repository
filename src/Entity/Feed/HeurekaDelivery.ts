
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IHeurekaDeliveryObject = require('./IHeurekaDeliveryObject');
import EntityPreparer = require('../EntityPreparer');

export = HeurekaDelivery;
class HeurekaDelivery implements IIdentificableEntity {

	static TABLE_NAME = 'feed.heureka_delivery';
	static COLUMN_HEUREKA_DELIVERY_ID = 'heurekadeliveryid';
	static COLUMN_HEUREKA_PRODUCT_ID = 'heurekaid';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_HEUREKA_PRODUCT_EXTERNAL_ID = 'item_id';
	static COLUMN_EXTERNAL_ID = 'deliveryid';
	static COLUMN_PRICE = 'deliveryprice';
	static COLUMN_PRICE_COD = 'deliverypricecod';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private heurekaProductId: number,
		private feedLoadId: number,
		private heurekaProductExternalId: string,
		private externalId: string,
		private price: number,
		private priceCod: number
	) {}

	static fromRow(row: any) {
		return HeurekaDelivery.fromObject({
			id: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'id')],
			heurekaProductId: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'heurekaProductId')],
			feedLoadId: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'feedLoadId')],
			heurekaProductExternalId: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'heurekaProductExternalId')],
			externalId: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'externalId')],
			price: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'price')],
			priceCod: row[EntityPreparer.getTableColumnByKey(HeurekaDelivery, 'priceCod')]
		});
	}

	static fromObject(object: IHeurekaDeliveryObject) {
		return new HeurekaDelivery(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.heurekaProductId),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.stringOrNull(object.heurekaProductExternalId),
			EntityPreparer.stringOrNull(object.externalId),
			EntityPreparer.floatOrNull(object.price),
			EntityPreparer.floatOrNull(object.priceCod)
		);
	}

	static toObject(entity: HeurekaDelivery): IHeurekaDeliveryObject {
		return {
			id: entity.id,
			heurekaProductId: entity.heurekaProductId,
			feedLoadId: entity.feedLoadId,
			heurekaProductExternalId: entity.heurekaProductExternalId,
			externalId: entity.externalId,
			price: entity.price,
			priceCod: entity.priceCod
		};
	}

	toObject(): IHeurekaDeliveryObject {
		return HeurekaDelivery.toObject(this);
	}
	
}
