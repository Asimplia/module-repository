
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IHeurekaAccessoryObject = require('./IHeurekaAccessoryObject');
import EntityPreparer = require('../EntityPreparer');

export = HeurekaAccessory;
class HeurekaAccessory implements IIdentificableEntity {

	static TABLE_NAME = 'feed.heureka_accessory';
	static COLUMN_HEUREKA_ACCESSORY_ID = 'accessoryid';
	static COLUMN_HEUREKA_PRODUCT_ID = 'heurekaid';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_ACCESSORY_HEUREKA_PRODUCT_EXTERNAL_ID = 'accessory';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private heurekaProductId: number,
		private feedLoadId: number,
		private accessoryHeurekaProductExternalId: string
	) {}

	static fromRow(row: any) {
		return HeurekaAccessory.fromObject({
			id: row[EntityPreparer.getTableColumnByKey(HeurekaAccessory, 'id')],
			heurekaProductId: row[EntityPreparer.getTableColumnByKey(HeurekaAccessory, 'heurekaProductId')],
			feedLoadId: row[EntityPreparer.getTableColumnByKey(HeurekaAccessory, 'feedLoadId')],
			accessoryHeurekaProductExternalId: row[EntityPreparer.getTableColumnByKey(HeurekaAccessory, 'accessoryHeurekaProductExternalId')]
		});
	}

	static fromObject(object: IHeurekaAccessoryObject) {
		return new HeurekaAccessory(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.heurekaProductId),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.stringOrNull(object.accessoryHeurekaProductExternalId)
		);
	}

	static toObject(entity: HeurekaAccessory): IHeurekaAccessoryObject {
		return {
			id: entity.id,
			heurekaProductId: entity.heurekaProductId,
			feedLoadId: entity.feedLoadId,
			accessoryHeurekaProductExternalId: entity.accessoryHeurekaProductExternalId
		};
	}

	toObject(): IHeurekaAccessoryObject {
		return HeurekaAccessory.toObject(this);
	}
	
}
