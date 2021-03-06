
import IHeurekaAccessoryObject = require('./IHeurekaAccessoryObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaAccessory;
class HeurekaAccessory {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.heurekaaccessory',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'accessoryid' },
		heurekaProductId: { $type: Type.Integer, $name: 'heurekaid' },
		feedLoadId: { $type: Type.Integer, $name: 'loadid' },
		accessoryHeurekaProductExternalId: { $type: new Type.String(36), $name: 'accessory' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IHeurekaAccessoryObject
	) {}
}
