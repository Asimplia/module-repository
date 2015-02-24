
import IZboziVariantObject = require('./IZboziVariantObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;

export = ZboziVariant;
class ZboziVariant {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.zbozi_variant',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'variantid' },
		feedLoadId: { $type: new Type.Integer(8), $name: 'loadid' },
		zboziProductId: { $type: new Type.Integer(8, true), $name: 'zboziid' },
		parentZboziProductId: { $type: new Type.Integer(8, true), $name: 'variantzboziid' }
	};
	
	get Id() { return this.object.id; }

	constructor(
		private object: IZboziVariantObject
	) {}
}
