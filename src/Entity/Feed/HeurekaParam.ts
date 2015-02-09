
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IHeurekaParamObject = require('./IHeurekaParamObject');
import EntityPreparer = require('../EntityPreparer');

export = HeurekaParam;
class HeurekaParam implements IIdentificableEntity {

	static TABLE_NAME = 'feed.heurekaparam';
	static COLUMN_HEUREKA_PARAM_ID = 'paramid';
	static COLUMN_HEUREKA_PRODUCT_ID = 'heurekaid';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_HEUREKA_PRODUCT_EXTERNAL_ID = 'item_id';
	static COLUMN_NAME = 'paramname';
	static COLUMN_VALUE = 'value';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private heurekaProductId: number,
		private feedLoadId: number,
		private heurekaProductExternalId: string,
		private name: string,
		private value: string
	) {}

	static fromRow(row: any) {
		return HeurekaParam.fromObject({
			id: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'id')],
			heurekaProductId: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'heurekaProductId')],
			feedLoadId: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'feedLoadId')],
			heurekaProductExternalId: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'heurekaProductExternalId')],
			name: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'name')],
			value: row[EntityPreparer.getTableColumnByKey(HeurekaParam, 'value')]
		});
	}

	static fromObject(object: IHeurekaParamObject) {
		return new HeurekaParam(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.heurekaProductId),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.stringOrNull(object.heurekaProductExternalId),
			EntityPreparer.stringOrNull(object.name),
			EntityPreparer.stringOrNull(object.value)
		);
	}

	static toObject(entity: HeurekaParam): IHeurekaParamObject {
		return {
			id: entity.id,
			heurekaProductId: entity.heurekaProductId,
			feedLoadId: entity.feedLoadId,
			heurekaProductExternalId: entity.heurekaProductExternalId,
			name: entity.name,
			value: entity.value
		};
	}

	toObject(): IHeurekaParamObject {
		return HeurekaParam.toObject(this);
	}
	
}
