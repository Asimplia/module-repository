
import IIdentificableEntity = require('../../Common/IIdentificableEntity');
import IZboziVariantObject = require('./IZboziVariantObject');
import EntityPreparer = require('../../EntityPreparer');

export = ZboziVariant;
class ZboziVariant {
	
	
	static TABLE_NAME = 'feed.zbozi';
	static COLUMN_ZBOZI_VARIANT_ID = 'variantid';
	static COLUMN_ZBOZI_PRODUCT_ID = 'zboziid';
	static COLUMN_FEED_LOAD_ID = 'loadid';
	static COLUMN_PARENT_ZBOZI_PRODUCT_ID = 'variantzboziid';

	get Id() { return this.id; }

	constructor(
		private id: number,
		private zboziProductId: number,
		private feedLoadId: number,
		private parentZboziProductId: number
	) {}

	static fromRow(row: any) {
		return EntityPreparer.fromRow<ZboziVariant>(ZboziVariant, row);
	}

	static fromObject(object: IZboziVariantObject) {
		return new ZboziVariant(
			EntityPreparer.idNumeric(object.id),
			EntityPreparer.int(object.zboziProductId),
			EntityPreparer.int(object.feedLoadId),
			EntityPreparer.int(object.parentZboziProductId)
		);
	}

	static toObject(entity: ZboziVariant): IZboziVariantObject {
		return EntityPreparer.tableEntityToObject(ZboziVariant, entity);
	}

	toObject(): IZboziVariantObject {
		return ZboziVariant.toObject(this);
	}
}
